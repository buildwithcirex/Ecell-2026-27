/**
 * Team roster for the 2026-27 cohort.
 *
 * Single source of truth for every person on the /team page. The component reads
 * from this file and renders one card per entry. To replace a placeholder
 * portrait, drop a real image into `src/assets/team/`, import it here, and set
 * `photo: { src, alt, width, height }`. The card keeps its size either way, so
 * dropping a real image in later never shifts the layout.
 *
 * Copy voice follows the brief: short, specific, a little cynical, genz. No em
 * dashes, no motivational tone. Key phrases are bolded with <strong> tags
 * to match FlowFest's graphic style.
 */

import secretaryImg from '@/assets/team/secretary.png'
import webDevHeadImg from '@/assets/team/web-dev-head.png'

export interface TeamPhoto {
  readonly src: string
  readonly alt: string
  readonly width: number
  readonly height: number
}

export interface TeamMember {
  readonly id: string
  readonly name: string
  readonly role: string
  /** Top pill tag label (e.g. "Keynote", "Leadership", "Development"). Defaults to role. */
  readonly tag?: string
  /** Label on the multiplayer cursor pill. Defaults to name. */
  readonly cursorText?: string
  /** Background color for the cursor pill. Defaults to FlowFest orange (#f97028). */
  readonly cursorColor?: string
  /** Custom background color for placeholder cards. */
  readonly placeholderColor?: string
  /** Card bio with <strong> tag support for keyword highlights. */
  readonly description: string
  /** Optional portrait. Omit to render the FlowFest illustrated placeholder. */
  readonly photo?: TeamPhoto
}

export interface TeamStrip {
  readonly id: string
  readonly title: string
  readonly members: readonly TeamMember[]
  /**
   * Responsive layout grid. Each key is a Tailwind breakpoint prefix.
   */
  readonly layout: {
    readonly base?: string
    readonly sm?: string
    readonly md?: string
    readonly lg?: string
  }
}

/* ------------------------------------------------------------------ */
/* Faculty coordinator                                                */
/* ------------------------------------------------------------------ */

const faculty: TeamMember[] = [
  {
    id: 'faculty-1',
    name: 'Prof. Yogesh Karunakar',
    role: 'Faculty Coordinator',
    tag: 'Keynote',
    cursorText: 'Prof. Yogesh Karunakar',
    cursorColor: '#f0bb0d',
    placeholderColor: '#f0bb0d',
    description:
      'Approves <strong>everything</strong>. Reads every <strong>proposal</strong>. Still replies at <strong>11pm</strong>, which is either dedication or insomnia.',
  },
]

/* ------------------------------------------------------------------ */
/* Leadership                                                         */
/* ------------------------------------------------------------------ */

const leadership: TeamMember[] = [
  {
    id: 'president',
    name: 'Raaj Patkar',
    role: 'President',
    tag: 'President',
    cursorText: 'Raaj Patkar',
    cursorColor: '#f0bb0d',
    placeholderColor: '#f0bb0d',
    description:
      'Runs the <strong>show</strong>, calls the meetings <strong>nobody asked for</strong>, and somehow still finds time to <strong>sleep</strong>. Probably.',
  },
  {
    id: 'vice-president',
    name: 'Daivik Pawar',
    role: 'Vice President',
    tag: 'Vice-President',
    cursorText: 'Daivik Pawar',
    cursorColor: '#38bdf8',
    placeholderColor: '#38bdf8',
    description:
      'The <strong>president</strong> when the president is busy. Knows where <strong>every document</strong> is, including the one you <strong>lost</strong>.',
  },
  {
    id: 'secretary',
    name: 'Subhra Parijha',
    role: 'Secretary',
    tag: 'Secretary',
    cursorText: 'Subhra Parijha',
    cursorColor: '#ea5283',
    description:
      'Writes the <strong>minutes</strong> no one reads, sends the <strong>emails</strong> no one answers, and keeps the <strong>calendar honest</strong>.',
    photo: {
      src: secretaryImg,
      alt: 'Secretary',
      width: 1149,
      height: 1369,
    },
  },
  {
    id: 'treasurer',
    name: 'Krishna Mundhara',
    role: 'Treasurer',
    tag: 'Treasurer',
    cursorText: 'Krishna Mundhara',
    cursorColor: '#34d399',
    placeholderColor: '#34d399',
    description:
      'Counting <strong>money</strong> that does not exist yet, chasing <strong>invoices</strong> that do, and explaining <strong>budgets</strong>.',
  },
]

/* ------------------------------------------------------------------ */
/* Technical                                                          */
/* ------------------------------------------------------------------ */

const technical: TeamMember[] = [
  {
    id: 'cybersec-head',
    name: 'Aryan Wesavkar',
    role: 'Cybersecurity Head',
    tag: 'CyberSecurity Head',
    cursorText: 'Aryan Wesavkar',
    cursorColor: '#a855f7',
    placeholderColor: '#a855f7',
    description:
      'Breaks things <strong>on purpose</strong> so the rest of us do not have to. Will find the <strong>bug</strong>. Will not tell you first.',
  },
  {
    id: 'cybersec-cohead',
    name: 'Amey Thanekar',
    role: 'Cybersecurity Co-Head',
    tag: 'CyberSecurity Co-Head',
    cursorText: 'Amey Thanekar',
    cursorColor: '#818cf8',
    placeholderColor: '#818cf8',
    description:
      'Backup <strong>paranoia</strong>. Runs the <strong>CTFs</strong> and reads postmortems. Knows your <strong>password</strong> was in a dump.',
  },
  {
    id: 'aiml-head',
    name: 'Sachman Chadha',
    role: 'AI/ML Head',
    tag: 'Ai/Ml Head',
    cursorText: 'Sachman Chadha',
    cursorColor: '#38bdf8',
    placeholderColor: '#38bdf8',
    description:
      'Trains <strong>models</strong> on data we should not have. Writes <strong>prompts</strong> like spells. Hallucinates, but <strong>on purpose</strong>.',
  },
  {
    id: 'aiml-cohead',
    name: 'Sanchita Pawar',
    role: 'AI/ML Co-Head',
    tag: 'Ai/Ml Co-Head',
    cursorText: 'Sanchita Pawar',
    cursorColor: '#60a5fa',
    placeholderColor: '#60a5fa',
    description:
      'Tames the <strong>GPU bill</strong> and reads the <strong>arXiv</strong> so the rest of the team can pretend they did. Fair trade.',
  },
  {
    id: 'iot-head',
    name: 'Siddhi Pandey',
    role: 'IoT Head',
    tag: 'Iot Head',
    cursorText: 'Siddhi Pandey',
    cursorColor: '#fb7185',
    placeholderColor: '#fb7185',
    description:
      'Solders <strong>things</strong> to other things, then wonders why the <strong>lights flicker</strong>. Owns at least four broken Arduinos.',
  },
  {
    id: 'iot-cohead',
    name: 'IoT Co-Head',
    role: 'IoT Co-Head',
    tag: 'Iot Co-Head',
    cursorText: 'IoT Co-Head',
    cursorColor: '#f97028',
    placeholderColor: '#f97028',
    description:
      'Keeps the <strong>wiring safe</strong> and the demos on time. Has a <strong>favourite sensor</strong>. Will not admit which.',
  },
  {
    id: 'webdev-head',
    name: 'Ishwar Suthar',
    role: 'Web Dev Head',
    tag: 'Web Dev Head',
    cursorText: 'Ishwar Suthar',
    cursorColor: '#f0bb0d',
    description:
      'Ships the <strong>site</strong>, breaks the <strong>site</strong>, fixes the site. Lives in <strong>dev tools</strong> and argues about <strong>semicolons</strong>.',
    photo: {
      src: webDevHeadImg,
      alt: 'Web Dev Head',
      width: 1346,
      height: 1169,
    },
  },
  {
    id: 'webdev-cohead',
    name: 'Rushabh Makwana',
    role: 'Web Dev Co-Head',
    tag: 'Web Dev Co-Head',
    cursorText: 'Rushabh Makwana',
    cursorColor: '#ea5283',
    placeholderColor: '#ea5283',
    description:
      'Reviews the <strong>PRs</strong> the head rubber-stamped. Writes the <strong>tests</strong> nobody asked for. Always right.',
  },
  {
    id: 'devops-head',
    name: 'Vaishnav Yewale',
    role: 'DevOps Head',
    tag: 'DevOps Head',
    cursorText: 'Vaishnav Yewale',
    cursorColor: '#34d399',
    placeholderColor: '#34d399',
    description:
      'Pipes <strong>data</strong> from here to there. The <strong>deploy</strong> works on their machine, which is the only machine that matters.',
  },
  {
    id: 'devops-cohead',
    name: 'Jeeval Patil',
    role: 'DevOps Co-Head',
    tag: 'DevOps Co-Head',
    cursorText: 'Jeeval Patil',
    cursorColor: '#818cf8',
    placeholderColor: '#818cf8',
    description:
      'Pages the team at <strong>3am</strong> when the cluster sneezes. Has a sticker on the laptop: <strong>"it works on my box"</strong>.',
  },
]

/* ------------------------------------------------------------------ */
/* Events and Operations                                              */
/* ------------------------------------------------------------------ */

const events: TeamMember[] = [
  {
    id: 'event-head',
    name: 'Piyush Singh',
    role: 'Event Head',
    tag: 'Event Head',
    cursorText: 'Piyush Singh',
    cursorColor: '#ea5283',
    placeholderColor: '#ea5283',
    description:
      'Says <strong>yes</strong> to every event idea, then figures out how. Has a <strong>calendar</strong> that would break a normal human.',
  },
  {
    id: 'event-cohead-l',
    name: 'Sahil Madiwala',
    role: 'Event Co-Head',
    tag: 'Event Co-Head',
    cursorText: 'Sahil Madiwala',
    cursorColor: '#f97028',
    placeholderColor: '#f97028',
    description:
      'Books the <strong>room</strong>, books the <strong>mic</strong>, books the panic attack. Brings the <strong>clipboard</strong> to every meeting.',
  },
  {
    id: 'event-cohead-r',
    name: 'Siddhesh Pawar',
    role: 'Event Co-Head',
    tag: 'Event Co-Head',
    cursorText: 'Siddhesh Pawar',
    cursorColor: '#f0bb0d',
    placeholderColor: '#f0bb0d',
    description:
      'The <strong>second clipboard</strong>. The second coffee. The reason <strong>nothing catches fire</strong>. Quietly indispensable.',
  },
  {
    id: 'hospitality-head',
    name: 'Krupa Marakal',
    role: 'Hospitality Head',
    tag: 'Hospitality Head',
    cursorText: 'Krupa Marakal',
    cursorColor: '#38bdf8',
    placeholderColor: '#38bdf8',
    description:
      'Feeds the <strong>team</strong>. Feeds the <strong>speakers</strong>. Knows which canteen is open on <strong>Sundays</strong>.',
  },
  {
    id: 'volunteering-head',
    name: 'Jimeet Trivedi',
    role: 'Volunteering Head',
    tag: 'Volunteering Head',
    cursorText: 'Jimeet Trivedi',
    cursorColor: '#a855f7',
    placeholderColor: '#a855f7',
    description:
      'Herds the <strong>volunteers</strong>, who are mostly freshmen. Has a group chat that <strong>pings constantly</strong> and a patient face.',
  },
]

/* ------------------------------------------------------------------ */
/* Media and Communications                                           */
/* ------------------------------------------------------------------ */

const media: TeamMember[] = [
  {
    id: 'social-head',
    name: 'Disha Suthar',
    role: 'Social Media Head',
    tag: 'Social Media Head',
    cursorText: 'Disha Suthar',
    cursorColor: '#ea5283',
    placeholderColor: '#ea5283',
    description:
      'Posts at the <strong>worst hours</strong> for the algorithm. Knows which <strong>trend</strong> to skip and which one to hijack.',
  },
  {
    id: 'social-cohead',
    name: 'Devyani Palaye',
    role: 'Social Media Co-Head',
    tag: 'Social Media Co-Head',
    cursorText: 'Devyani Palaye',
    cursorColor: '#f97028',
    placeholderColor: '#f97028',
    description:
      'Drafts the <strong>captions</strong> the head edits. Holds the <strong>brand voice</strong> together when everyone wants to be funny.',
  },
  {
    id: 'editor',
    name: 'Maahi Nagdeote',
    role: 'Editor',
    tag: 'Editor',
    cursorText: 'Maahi Nagdeote',
    cursorColor: '#34d399',
    placeholderColor: '#34d399',
    description:
      'Reads the writing <strong>twice</strong>, fixes it <strong>once</strong>, and is the reason the posts sound <strong>human</strong>.',
  },
]

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export interface TeamPageData {
  readonly cohort: string
  readonly strips: readonly TeamStrip[]
}

export const team2026: TeamPageData = {
  cohort: '2026-27',
  strips: [
    {
      id: 'faculty',
      title: 'Faculty',
      members: faculty,
      layout: { base: 'grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:max-w-md lg:mx-auto' },
    },
    {
      id: 'leadership',
      title: 'Leadership',
      members: leadership,
      layout: { base: 'grid-cols-1', sm: 'sm:grid-cols-2', md: 'md:grid-cols-2', lg: 'lg:grid-cols-4' },
    },
    {
      id: 'technical',
      title: 'Technical',
      members: technical,
      layout: { base: 'grid-cols-1', sm: 'sm:grid-cols-2', md: 'md:grid-cols-3', lg: 'lg:grid-cols-4' },
    },
    {
      id: 'events',
      title: 'Events and Operations',
      members: events,
      layout: { base: 'grid-cols-1', sm: 'sm:grid-cols-2', md: 'md:grid-cols-3', lg: 'lg:grid-cols-3' },
    },
    {
      id: 'media',
      title: 'Media and Communications',
      members: media,
      layout: { base: 'grid-cols-1', sm: 'sm:grid-cols-2', md: 'md:grid-cols-3', lg: 'lg:grid-cols-3' },
    },
  ],
}