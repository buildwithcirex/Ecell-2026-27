import { motion } from 'framer-motion';

export const BadgeEyebrow: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-1 bg-accent-green rounded-sm"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
      <span className="text-accent-green font-display text-sm uppercase tracking-wider font-bold">
        {text}
      </span>
    </div>
  );
};
