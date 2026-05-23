import { motion } from 'framer-motion';
import { TerminalHeader } from '../components/TerminalHeader';
import { Typewriter } from '../components/Typewriter';
import { Calendar, MapPin, Code, Zap } from 'lucide-react';

export const About = () => {
  const timeline = [
    {
      year: '2024 - Present',
      title: 'DevOps Engineer',
      company: 'Akieni — Brazzaville, Congo',
      description:
        'Automating and optimizing cloud infrastructure with Terraform, CI/CD pipelines, and Kubernetes deployments via ArgoCD. Enhancing security and managing AWS cost-efficiency for the platform.',
      icon: Zap,
    },
    {
      year: '2022 - 2024',
      title: 'AWS DevOps Engineer — Team Lead',
      company: 'Ginov Digital Congo — Pointe-Noire',
      description:
        'Led migration of 230+ NodeJS/React instances to AWS, reducing cloud expenses by 40%. Built 40+ tools to automate deployment, administration, and monitoring across EC2, S3, EBS, CodeCommit, and Route 53.',
      icon: Code,
    },
    {
      year: '2020 - 2022',
      title: 'Technical Manager',
      company: 'OCSNETWORK — Pointe-Noire',
      description:
        'Designed, implemented, and maintained network infrastructures. Supervised technical teams, coordinated deployments, and ensured operational continuity through proactive monitoring and incident response.',
      icon: MapPin,
    },
    {
      year: '2018 - 2019',
      title: 'Trainer — Linux System Administration',
      company: 'NGO YEKOLAB — Pointe-Noire',
      description:
        'Designed and delivered LPIC 1 & 2 courses covering system and network configuration, service management, and IT security. Mentored professionals toward autonomy in Linux operations.',
      icon: Code,
    },
    {
      year: '2016 - 2018',
      title: 'Full Stack PHP Developer',
      company: 'KS Programming — Pointe-Noire',
      description:
        'Built and maintained dynamic web applications using the CakePHP framework, mentored by a senior PHP developer. Focused on best development practices and database management.',
      icon: Code,
    },
    {
      year: '2013 - 2016',
      title: 'License — Networking & Telecommunications',
      company: "Ecole Africain de Développement — Pointe-Noire",
      description:
        'Bachelor\'s degree in computer networking and telecommunications, foundation for a career spanning sysadmin, full-stack, and cloud DevOps.',
      icon: Calendar,
    },
  ];

  const philosophyPoints = [
    {
      icon: Zap,
      title: 'Developer Experience First',
      description: 'A platform is judged by how much friction it removes, not by how much YAML it contains. Optimize for the engineer using it.',
    },
    {
      icon: Code,
      title: 'Standards over Tools',
      description: 'Tools come and go — conventions, contracts, and reusable modules are what keep teams shipping consistently.',
    },
    {
      icon: MapPin,
      title: 'Automation as a Product',
      description: 'Every pipeline, module, and runbook is a product with users. Treat onboarding, docs, and feedback loops accordingly.',
    },
  ];

  return (
    <div className="min-h-screen bg-bg-page">
      {/* Terminal Header */}
      <TerminalHeader
        command="cat about.txt"
        description="Displaying professional background and technical philosophy"
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
                  <span className="text-neutral-400"> bio.txt</span>
                </div>
                <div className="space-y-4 text-neutral-200 leading-relaxed">
                  <Typewriter
                    text="Hello, I'm Alexandre Sonicka Gomah — AWS DevOps Engineer based in Brazzaville, Congo."
                    delay={30}
                    className="text-primary-500 font-semibold block mb-4"
                  />
                  <p>
                    I'm an AWS DevOps engineer with a Platform Engineering lens. My job isn't to wire up pipelines
                    for their own sake — it's to build the systems and conventions that make the developers around
                    me faster, more autonomous, and more confident in production.
                  </p>
                  <p>
                    At Akieni, that means a self-service GitOps platform on Kubernetes (Terraform + ArgoCD) that
                    turns a <span className="font-mono text-primary-500">git push</span> into a reviewed, audited
                    deploy. It means cost-efficiency and security baked into the modules every team consumes,
                    not bolted on later. Before that at Ginov, the same instinct showed up as a 40% cloud bill
                    reduction across 230+ instances and a 40-tool automation suite that shortened onboarding from
                    weeks to days.
                  </p>
                  <p>
                    My background — Linux sysadmin, DBA intern, full-stack PHP developer, network engineer,
                    Linux trainer — taught me that the leverage isn't in any single tool. It's in the standards:
                    how environments are shaped, how secrets are handled, how a new service gets from
                    <span className="font-mono text-primary-500"> git init </span>
                    to production on day one instead of week six. That's the layer I work on.
                  </p>
                  <p className="text-primary-500 font-medium">
                    Engineers who work with my platforms ship faster, debug faster, and pick up cleaner habits
                    along the way. That's the metric I optimize for — not how many YAML files I wrote, but how
                    much friction I removed from somebody else's day.
                  </p>
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
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Experience</span>
                    <span className="text-primary-500 font-mono">9+ years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Cloud Platform</span>
                    <span className="text-primary-500 font-mono">AWS</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Servers Migrated</span>
                    <span className="text-primary-500 font-mono">230+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Technologies</span>
                    <span className="text-primary-500 font-mono">20+ mastered</span>
                  </div>
                </div>
              </div>

              <div className="bg-bg-elevated border border-neutral-700 rounded-xl p-6">
                <h3 className="font-mono text-primary-500 font-semibold mb-4 text-lg">
                  Specializations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Platform Engineering', 'Developer Experience', 'AWS Cloud Architecture', 'GitOps with ArgoCD', 'Terraform IaC', 'Kubernetes Operations', 'Cost Optimization', 'Linux Administration'].map((skill) => (
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
              Career Timeline
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              From Linux sysadmin and full-stack development to AWS DevOps and platform engineering
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
                    key={item.year}
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
              Tech Philosophy
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Core principles that guide how I build platforms and the developer experience around them
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
