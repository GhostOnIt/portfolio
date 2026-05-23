import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { TerminalHeader } from '../components/TerminalHeader';
import { Typewriter } from '../components/Typewriter';
import { Calendar, MapPin, Code, Zap } from 'lucide-react';

const timelineIcons = [Zap, Code, MapPin, Code, Code, Calendar];
const philosophyIcons = [Zap, Code, MapPin];

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
}

interface PhilosophyItem {
  title: string;
  description: string;
}

export const About = () => {
  const { t } = useTranslation('about');

  const timelineData = t('timeline.items', { returnObjects: true }) as TimelineItem[];
  const timeline = timelineData.map((item, i) => ({
    ...item,
    icon: timelineIcons[i] || Code,
  }));

  const philosophyData = t('philosophy.items', { returnObjects: true }) as PhilosophyItem[];
  const philosophyPoints = philosophyData.map((item, i) => ({
    ...item,
    icon: philosophyIcons[i] || Zap,
  }));

  const specializations = t('specializations.items', { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen bg-bg-page">
      {/* Terminal Header */}
      <TerminalHeader
        command={t('terminal.command')}
        description={t('terminal.description')}
      />

      {/* Bio Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Bio Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="bg-bg-surface border border-neutral-700 rounded-xl p-8 shadow-card">
                <div className="font-mono text-lg mb-6">
                  <span className="text-accent-500">$</span>
                  <span className="text-primary-500"> cat</span>
                  <span className="text-neutral-400"> {t('bio.filename')}</span>
                </div>
                <div className="space-y-4 text-neutral-200 leading-relaxed">
                  <Typewriter
                    text={t('bio.greeting')}
                    delay={30}
                    className="text-primary-500 font-semibold block mb-4"
                  />
                  <p>{t('bio.p1')}</p>
                  <p>
                    <Trans
                      i18nKey="bio.p2"
                      ns="about"
                      components={{ code: <span className="font-mono text-primary-500" /> }}
                    />
                  </p>
                  <p>
                    <Trans
                      i18nKey="bio.p3"
                      ns="about"
                      components={{ code: <span className="font-mono text-primary-500" /> }}
                    />
                  </p>
                  <p className="text-primary-500 font-medium">{t('bio.p4')}</p>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-6"
            >
              <div className="bg-bg-elevated border border-neutral-700 rounded-xl p-6">
                <h3 className="font-mono text-primary-500 font-semibold mb-4 text-lg">
                  {t('stats.title')}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">{t('stats.experienceLabel')}</span>
                    <span className="text-primary-500 font-mono">{t('stats.experienceValue')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">{t('stats.cloudPlatformLabel')}</span>
                    <span className="text-primary-500 font-mono">{t('stats.cloudPlatformValue')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">{t('stats.serversMigratedLabel')}</span>
                    <span className="text-primary-500 font-mono">{t('stats.serversMigratedValue')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">{t('stats.technologiesLabel')}</span>
                    <span className="text-primary-500 font-mono">{t('stats.technologiesValue')}</span>
                  </div>
                </div>
              </div>

              <div className="bg-bg-elevated border border-neutral-700 rounded-xl p-6">
                <h3 className="font-mono text-primary-500 font-semibold mb-4 text-lg">
                  {t('specializations.title')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {specializations.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-neutral-800 text-neutral-200 text-sm rounded-md border border-neutral-700 hover:border-primary-500/50 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-mono text-3xl md:text-4xl font-bold text-primary-500 mb-4">
              {t('timeline.title')}
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              {t('timeline.subtitle')}
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-primary-700 to-transparent" />

            <div className="space-y-12">
              {timeline.map((item, index) => {
                const IconComponent = item.icon;
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={item.year + item.title}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className={`relative flex items-center ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center border-4 border-bg-page shadow-glow z-10">
                      <IconComponent size={16} className="text-bg-surface" />
                    </div>

                    {/* Content */}
                    <div className={`ml-16 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                      <div className="bg-bg-elevated border border-neutral-700 rounded-lg p-6 hover:border-primary-500/50 transition-colors shadow-card">
                        <div className="font-mono text-accent-500 text-sm mb-2">{item.year}</div>
                        <h3 className="font-semibold text-xl text-neutral-200 mb-1">{item.title}</h3>
                        <div className="text-primary-500 font-medium mb-3">{item.company}</div>
                        <p className="text-neutral-400 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-mono text-3xl md:text-4xl font-bold text-primary-500 mb-4">
              {t('philosophy.title')}
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              {t('philosophy.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {philosophyPoints.map((point, index) => {
              const IconComponent = point.icon;
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-bg-elevated border border-neutral-700 rounded-xl p-8 text-center hover:border-primary-500/50 transition-all duration-300 group"
                >
                  <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-500/20 transition-colors">
                    <IconComponent size={32} className="text-primary-500" />
                  </div>
                  <h3 className="font-semibold text-xl text-neutral-200 mb-4">{point.title}</h3>
                  <p className="text-neutral-400 leading-relaxed">{point.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
