import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Github, Code2 } from 'lucide-react';
import { Typewriter } from '../components/Typewriter';
import { SKILLS } from '../data/portfolio';
import { useLocalizedPath } from '../i18n/useLocalizedPath';

const GridGuides = () => (
  <div className="mb-guides" aria-hidden="true">
    {Array.from({ length: 12 }, (_, index) => (
      <span key={index} className="mb-guide-col" />
    ))}
  </div>
);

export const Home = () => {
  const { t } = useTranslation('home');
  const { t: tCommon } = useTranslation('common');
  const localized = useLocalizedPath();
  const [gridVisible, setGridVisible] = useState(false);

  const stats = [
    { label: t('stats.yearsExperience'), value: '9+' },
    { label: t('stats.serversMigrated'), value: '230+' },
    { label: t('stats.costReduction'), value: '40%' },
    { label: t('stats.technologies'), value: '20+' },
  ];

  const featuredSkills = SKILLS.slice(0, 6);

  useEffect(() => {
    document.body.classList.toggle('mb-grid-on', gridVisible);
    return () => document.body.classList.remove('mb-grid-on');
  }, [gridVisible]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'g' && !event.metaKey && !event.ctrlKey && !event.altKey) {
        setGridVisible((value) => !value);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const alignDisplayInk = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return;

      document.querySelectorAll<HTMLElement>('.mb-display, .mb-numeral').forEach((element) => {
        element.style.marginLeft = '0px';
        const styles = window.getComputedStyle(element);
        const firstChar = (element.textContent || '').trim()[0];
        if (!firstChar) return;
        context.font = `${styles.fontStyle} ${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`;
        const left = context.measureText(firstChar).actualBoundingBoxLeft;
        if (Number.isFinite(left)) {
          element.style.marginLeft = `${left.toFixed(2)}px`;
        }
      });
    };

    document.fonts?.ready.then(alignDisplayInk).catch(alignDisplayInk);
    window.addEventListener('resize', alignDisplayInk);
    return () => window.removeEventListener('resize', alignDisplayInk);
  }, []);

  return (
    <div className="mb-page min-h-screen relative overflow-hidden">
      <button
        type="button"
        onClick={() => setGridVisible((value) => !value)}
        className="mb-toggle"
        aria-pressed={gridVisible}
      >
        Grid {gridVisible ? 'on' : 'off'} / G
      </button>

      <section className="relative py-24">
        <div className="mb-wrap min-h-[calc(100vh-18rem)]">
          <GridGuides />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-band relative z-10"
          >
            <div className="col-span-6 col-start-1 max-md:col-span-6">
              <p className="mb-kicker text-[color:var(--mb-accent)]">{t('terminal.prompt')}</p>
              <h1 className="mb-display mt-6 max-w-[9ch] uppercase">
                <Typewriter
                  text={t('typewriter')}
                  texts={['DevOps Engineer', t('typewriter')]}
                  delay={80}
                  deleteDelay={36}
                  pauseDelay={900}
                  cursorClassName="mb-type-cursor ml-2 bg-[color:var(--mb-accent)]"
                />
              </h1>
            </div>

            <div className="col-span-4 col-start-8 mt-24 max-md:col-span-6 max-md:col-start-1 max-md:mt-12">
              <div className="mb-rule mb-6" />
              <p className="mb-body">
                {t('subtitle')}
              </p>
              <div className="mt-12 flex flex-col gap-4">
                <Link
                  to={localized('/projects')}
                  className="inline-flex h-12 items-center justify-between border border-white/20 bg-white/[0.02] px-4 text-sm font-bold uppercase text-[color:var(--mb-ink)] transition hover:border-[color:var(--mb-accent)] hover:bg-[color:var(--mb-accent)] hover:text-black"
                >
                  <span>{tCommon('ctas.viewProjects')}</span>
                  <Code2 className="h-4 w-4" />
                </Link>
                <Link
                  to={localized('/contact')}
                  className="inline-flex h-12 items-center justify-between bg-[color:var(--mb-accent)] px-4 text-sm font-bold uppercase text-black transition hover:bg-[color:var(--mb-accent-strong)]"
                >
                  <span>{tCommon('ctas.contactMe')}</span>
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 py-10">
        <div className="mb-wrap">
          <GridGuides />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-band relative z-10"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="col-span-3 border-t border-white/10 pt-6 max-md:col-span-3"
              >
                <div className="mb-numeral">
                  {stat.value}
                </div>
                <div className="mb-kicker mt-2 text-[color:var(--mb-muted)]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 py-20">
        <div className="mb-wrap">
          <GridGuides />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-band relative z-10 mb-16"
          >
            <h2 className="col-span-4 mb-kicker text-[color:var(--mb-accent)]">
              {t('featuredTechs.title')}
            </h2>
            <p className="col-span-5 col-start-7 mb-body max-md:col-span-6 max-md:col-start-1 max-md:mt-6">
              {t('featuredTechs.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            viewport={{ once: true }}
            className="mb-band relative z-10 gap-y-8"
          >
            {featuredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
                className="col-span-2 border-t border-white/10 pt-4 max-md:col-span-3"
              >
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="mb-6 h-8 w-8 grayscale invert opacity-85"
                />
                <div className={`mb-kicker text-[color:var(--mb-muted)] ${skill.name === 'GCP' ? 'line-through decoration-[color:var(--mb-accent-strong)] decoration-2 opacity-60' : ''}`}>
                  {skill.name}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mb-band relative z-10 mt-16"
          >
            <Link
              to={localized('/skills')}
              className="col-span-3 col-start-10 inline-flex h-12 items-center justify-between border border-white/20 bg-white/[0.02] px-4 text-sm font-bold uppercase text-[color:var(--mb-ink)] transition hover:border-[color:var(--mb-accent)] hover:bg-[color:var(--mb-accent)] hover:text-black max-md:col-span-6 max-md:col-start-1"
            >
              <span>{tCommon('ctas.viewAllSkills')}</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 py-20">
        <div className="mb-wrap">
          <GridGuides />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-band relative z-10"
          >
            <h2 className="col-span-5 text-5xl font-extrabold uppercase leading-[56px] max-md:col-span-6">
              {t('cta.title')}
            </h2>
            <div className="col-span-5 col-start-8 max-md:col-span-6 max-md:col-start-1 max-md:mt-8">
              <p className="mb-body mb-12">
                {t('cta.body')}
              </p>
              <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                <Link
                  to={localized('/contact')}
                  className="inline-flex h-12 items-center justify-center bg-[color:var(--mb-accent)] px-4 text-sm font-bold uppercase text-black transition hover:bg-[color:var(--mb-accent-strong)]"
                >
                  {tCommon('ctas.startProject')}
                </Link>
                <a
                  href="https://github.com/GhostOnIt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 border border-white/20 bg-white/[0.02] px-4 text-sm font-bold uppercase text-[color:var(--mb-ink)] transition hover:border-[color:var(--mb-accent)] hover:bg-[color:var(--mb-accent)] hover:text-black"
                >
                  <Github className="h-4 w-4" />
                  {tCommon('ctas.viewCode')}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
