import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  variant?: 'olive' | 'mid' | 'dark';
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, variant = 'dark', className = '' }) => {
  const bgColors = {
    olive: 'bg-card-olive text-bg-base',
    mid: 'bg-card-mid text-bg-base',
    dark: 'bg-[#151518] text-white',
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className={`group relative overflow-hidden rounded-shield border border-white/10 hover:border-accent-green hover:shadow-[0_8px_30px_rgb(57,255,20,0.15)] transition-colors duration-300 flex flex-col ${bgColors[variant]} ${className}`}
    >
      {children}
    </motion.div>
  );
};
