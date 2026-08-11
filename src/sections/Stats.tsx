import { motion } from 'framer-motion';

export const Stats = () => {
  const stats = [
    { number: '50+', label: 'Startups Incubated' },
    { number: '$2M+', label: 'Funding Raised' },
    { number: '10K+', label: 'Community Members' },
    { number: '100+', label: 'Events Hosted' },
  ];

  return (
    <section className="py-20 px-6 bg-white/5 border-y border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center px-4"
            >
              <div className="text-4xl md:text-5xl font-display font-bold text-accent-green mb-2">
                {stat.number}
              </div>
              <div className="text-xs md:text-sm uppercase tracking-widest font-semibold text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
