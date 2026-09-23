import { useEffect, useRef, useState, useCallback } from 'react'
import { FOOTER_FACES, type FooterFaceItem } from '@/content/footer-faces'
import { cn } from '@/lib/utils'
import { PaperTearBottom } from './PaperTearBottom'

interface ActiveFace {
  readonly instanceId: string
  readonly member: FooterFaceItem
  readonly x: number
  readonly y: number
  readonly rotation: number
  readonly scale: number
  isExiting: boolean
}

const MAX_ACTIVE_FACES = 23
const MIN_SPAWN_DISTANCE = 55
const MIN_SCROLL_STEP = 28

export interface FooterFaceCanvasProps {
  showPaperTear?: boolean
}

export function FooterFaceCanvas({ showPaperTear = true }: FooterFaceCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeFaces, setActiveFaces] = useState<ActiveFace[]>([])
  const nextMemberIndex = useRef(0)
  const lastSpawnPos = useRef<{ x: number; y: number } | null>(null)
  const lastScrollY = useRef(0)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Spawn next face cutout at (x, y) with FIFO removal once MAX_ACTIVE_FACES is reached
  const spawnFace = useCallback((rawX: number, rawY: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()

    // Clamp coordinates so images bleed only slightly (~25-35px) past the top and bottom
    const x = Math.max(35, Math.min(rect.width - 35, rawX))
    const y = Math.max(25, Math.min(rect.height - 25, rawY))

    const member = FOOTER_FACES[nextMemberIndex.current % FOOTER_FACES.length]
    nextMemberIndex.current += 1

    const rotation = (Math.random() - 0.5) * 24 // -12deg to +12deg
    const scale = 0.96 + Math.random() * 0.14 // slight organic variation

    const newFace: ActiveFace = {
      instanceId: `${member.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      member,
      x,
      y,
      rotation,
      scale,
      isExiting: false,
    }

    setActiveFaces((prev) => {
      const alive = prev.filter((f) => !f.isExiting)
      const exiting = prev.filter((f) => f.isExiting)

      // Once we reach 23 images, simultaneously animate out and remove the oldest (first-in) image
      if (alive.length >= MAX_ACTIVE_FACES) {
        const oldest = alive[0]
        const exitingOldest: ActiveFace = { ...oldest, isExiting: true }

        // Remove from DOM once exit shrink transition finishes (300ms)
        setTimeout(() => {
          setActiveFaces((curr) => curr.filter((f) => f.instanceId !== oldest.instanceId))
        }, 300)

        return [...exiting, exitingOldest, ...alive.slice(1), newFace]
      }

      return [...prev, newFace]
    })

    setHasInteracted(true)
  }, [])

  // Mouse move handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (!lastSpawnPos.current) {
      lastSpawnPos.current = { x, y }
      spawnFace(x, y)
      return
    }

    const dist = Math.hypot(x - lastSpawnPos.current.x, y - lastSpawnPos.current.y)
    if (dist >= MIN_SPAWN_DISTANCE) {
      lastSpawnPos.current = { x, y }
      spawnFace(x, y)
    }
  }

  // Touch move handler for mobile
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return
    const touch = e.touches[0]
    const rect = containerRef.current.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top

    if (!lastSpawnPos.current) {
      lastSpawnPos.current = { x, y }
      spawnFace(x, y)
      return
    }

    const dist = Math.hypot(x - lastSpawnPos.current.x, y - lastSpawnPos.current.y)
    if (dist >= 45) {
      lastSpawnPos.current = { x, y }
      spawnFace(x, y)
    }
  }

  // Scroll listener: removes oldest (first-in) images as user scrolls
  useEffect(() => {
    lastScrollY.current = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const delta = Math.abs(currentScrollY - lastScrollY.current)

      if (delta >= MIN_SCROLL_STEP) {
        lastScrollY.current = currentScrollY

        setActiveFaces((prev) => {
          if (prev.length === 0) return prev

          // Find the oldest face that is not yet exiting
          const firstAliveIndex = prev.findIndex((f) => !f.isExiting)
          if (firstAliveIndex === -1) return prev

          const updated = [...prev]
          const targetId = updated[firstAliveIndex].instanceId
          updated[firstAliveIndex] = { ...updated[firstAliveIndex], isExiting: true }

          // Clean up DOM after transition finishes
          setTimeout(() => {
            setActiveFaces((curr) => curr.filter((f) => f.instanceId !== targetId))
          }, 300)

          return updated
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onClick={(e) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        spawnFace(e.clientX - rect.left, e.clientY - rect.top)
      }}
      className="relative w-full min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] cursor-crosshair select-none overflow-visible"
      aria-label="Interactive team face cutout playground"
    >
      {/* 1. Paper Cutout Transition at the top of the canvas (allows hover and natural face overlay) */}
      {showPaperTear && <PaperTearBottom />}

      {/* Background hint message (fades out after first interaction) */}
      <div
        className={cn(
          'absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-700 select-none z-0',
          hasInteracted ? 'opacity-0' : 'opacity-65',
        )}
      >
        <p className="font-sans text-xs sm:text-sm font-semibold tracking-[0.2em] text-cream/70 uppercase">
          Hover or tap anywhere to reveal the collective
        </p>
        <span className="mt-1.5 text-[11px] font-sans text-cream/40">
          Scroll down to clear face stickers
        </span>
      </div>

      {/* Rendered Face Cutouts: z-30 allows natural gentle overlap onto paper cutout and seam line */}
      {activeFaces.map((face) => (
        <div
          key={face.instanceId}
          style={{
            left: `${face.x}px`,
            top: `${face.y}px`,
          }}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 z-30 will-change-transform"
        >
          {/* Animated inner item: spring pop in, smooth shrink out on exit */}
          <div
            style={{
              transform: `rotate(${face.rotation}deg) scale(${face.isExiting ? 0 : face.scale})`,
              opacity: face.isExiting ? 0 : 1,
              transition: 'transform 280ms cubic-bezier(0.34, 1.4, 0.64, 1), opacity 240ms ease-out',
            }}
            className="flex items-center justify-center animate-sticker-pop"
          >
            <img
              src={face.member.image}
              alt=""
              className="h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40 object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.65)]"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
