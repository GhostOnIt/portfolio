import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TerminalHeader } from '../components/TerminalHeader';
import { Typewriter } from '../components/Typewriter';
import { Cloud, Container, Code, Database, Terminal as TerminalIcon, Server } from 'lucide-react';
import { SKILLS, SKILLS_BY_CATEGORY, CONTACT } from '../data/portfolio';

export const Skills = () => {
  const { t } = useTranslation('skills');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const categories = [
    {
      id: 'cloud',
      title: t('categories.cloud'),
      icon: Cloud,
      skills: SKILLS_BY_CATEGORY.cloud,
      color: 'text-blue-500',
    },
    {
      id: 'containers',
      title: t('categories.containers'),
      icon: Container,
      skills: SKILLS_BY_CATEGORY.containers,
      color: 'text-blue-400',
    },
    {
      id: 'infrastructure',
      title: t('categories.infrastructure'),
      icon: TerminalIcon,
      skills: SKILLS_BY_CATEGORY.infrastructure,
      color: 'text-purple-500',
    },
    {
      id: 'os',
      title: t('categories.os'),
      icon: Server,
      skills: SKILLS_BY_CATEGORY.os,
      color: 'text-yellow-500',
    },
    {
      id: 'devops',
      title: t('categories.devops'),
      icon: Code,
      skills: SKILLS_BY_CATEGORY.devops,
      color: 'text-green-500',
    },
    {
      id: 'development',
      title: t('categories.development'),
      icon: Code,
      skills: SKILLS_BY_CATEGORY.development,
      color: 'text-orange-500',
    },
    {
      id: 'database',
      title: t('categories.database'),
      icon: Database,
      skills: SKILLS_BY_CATEGORY.database,
      color: 'text-red-500',
    },
  ];

  const manPages: Record<string, string[]> = {
    help: [
      'NAME',
      '    help — list available commands',
      '',
      'SYNOPSIS',
      '    help',
      '',
      'DESCRIPTION',
      '    Prints a one-line summary of every command. Use `man <command>`',
      '    for detailed documentation of a specific command.',
    ],
    man: [
      'NAME',
      '    man — show detailed manual for a command',
      '',
      'SYNOPSIS',
      '    man <command>',
      '',
      'DESCRIPTION',
      '    Displays a manual page for the given command, with synopsis,',
      '    description, and examples.',
      '',
      'EXAMPLES',
      '    man cat',
      '    man find',
    ],
    whoami: [
      'NAME',
      '    whoami — print portfolio owner identity',
      '',
      'SYNOPSIS',
      '    whoami',
      '',
      'DESCRIPTION',
      '    Prints the current role, employer, location, and availability',
      '    of the portfolio owner.',
    ],
    ls: [
      'NAME',
      '    ls — list skills in a category',
      '',
      'SYNOPSIS',
      '    ls [category]',
      '',
      'DESCRIPTION',
      '    Lists skills within a given category. When called without',
      '    arguments, lists all available skill categories.',
      '',
      'EXAMPLES',
      '    ls',
      '    ls cloud',
      '    ls os',
    ],
    cat: [
      'NAME',
      '    cat — show details for a specific skill',
      '',
      'SYNOPSIS',
      '    cat <skill>',
      '',
      'DESCRIPTION',
      '    Displays category, proficiency level, and icon URL for the',
      '    given skill. Matching is case-insensitive.',
      '',
      'EXAMPLES',
      '    cat AWS',
      '    cat terraform',
      '    cat aws cli',
    ],
    top: [
      'NAME',
      '    top — show top N skills by proficiency',
      '',
      'SYNOPSIS',
      '    top [n]',
      '',
      'DESCRIPTION',
      '    Sorts all skills by proficiency (descending) and prints the',
      '    top N entries. Defaults to 5 when no count is given.',
      '',
      'EXAMPLES',
      '    top',
      '    top 10',
    ],
    find: [
      'NAME',
      '    find — search skills by keyword',
      '',
      'SYNOPSIS',
      '    find <keyword>',
      '',
      'DESCRIPTION',
      '    Returns every skill whose name or category contains the given',
      '    keyword (case-insensitive substring match).',
      '',
      'EXAMPLES',
      '    find aws',
      '    find database',
    ],
    stats: [
      'NAME',
      '    stats — show overall skill statistics',
      '',
      'SYNOPSIS',
      '    stats',
      '',
      'DESCRIPTION',
      '    Prints total skill count, number of categories, average',
      '    proficiency, highest-ranked skill, and per-category counts.',
    ],
    tree: [
      'NAME',
      '    tree — show category tree of all skills',
      '',
      'SYNOPSIS',
      '    tree',
      '',
      'DESCRIPTION',
      '    Displays a hierarchical ASCII view of every category and the',
      '    skills it contains, with proficiency levels.',
    ],
    levels: [
      'NAME',
      '    levels — show the proficiency level scale',
      '',
      'SYNOPSIS',
      '    levels',
      '',
      'DESCRIPTION',
      '    Prints the proficiency legend (Beginner, Intermediate,',
      '    Advanced, Expert) used by every skill.',
    ],
    contact: [
      'NAME',
      '    contact — show contact information',
      '',
      'SYNOPSIS',
      '    contact',
      '',
      'DESCRIPTION',
      '    Displays email, phone, location, and social profile URLs.',
    ],
    history: [
      'NAME',
      '    history — show recent commands',
      '',
      'SYNOPSIS',
      '    history',
      '',
      'DESCRIPTION',
      '    Prints the last 10 commands typed during this session.',
    ],
    echo: [
      'NAME',
      '    echo — print text',
      '',
      'SYNOPSIS',
      '    echo <text>',
      '',
      'DESCRIPTION',
      '    Prints the arguments back to the terminal verbatim.',
      '',
      'EXAMPLES',
      '    echo Hello, world!',
    ],
    clear: [
      'NAME',
      '    clear — clear the terminal screen',
      '',
      'SYNOPSIS',
      '    clear',
      '',
      'DESCRIPTION',
      '    Clears all previous terminal output.',
    ],
  };

  const formatSkillLine = (name: string, level: number, category?: string) => {
    const padded = name.length >= 20 ? `${name} ` : name.padEnd(20);
    return category ? `  ${padded} ${level}% (${category})` : `  ${padded} ${level}%`;
  };

  const executeCommand = (input: string) => {
    setIsProcessing(true);
    setHistory(prev => [...prev, input]);

    const cmd = input.toLowerCase().trim();
    const args = cmd.split(' ').filter(Boolean);
    const mainCmd = args[0];

    setTimeout(() => {
      let output: string[] = [];

      switch (mainCmd) {
        case 'help':
          output = t('help', { returnObjects: true }) as string[];
          break;

        case 'man': {
          const target = args[1];
          if (!target) {
            output = [t('output.manUsage'), t('output.typeHelp')];
          } else if (manPages[target]) {
            output = manPages[target];
          } else {
            output = [t('output.noManual', { target }), t('output.typeHelp')];
          }
          break;
        }

        case 'whoami':
          output = [
            'Alexandre Sonicka Gomah',
            t('whoami.role'),
            t('whoami.location'),
            t('whoami.status'),
            '',
            t('whoami.tip'),
          ];
          break;

        case 'ls': {
          const category = args[1];
          if (category && categories.find(c => c.id === category)) {
            const cat = categories.find(c => c.id === category)!;
            output = [
              t('output.categoryHeading', { title: cat.title, count: cat.skills.length }),
              ...cat.skills.map(s => formatSkillLine(s.name, s.level)),
            ];
          } else if (category) {
            output = [
              t('output.unknownCategory', { category }),
              '',
              t('output.availableCategories'),
              ...categories.map(c => `  ${c.id.padEnd(16)} ${c.title}`),
            ];
          } else {
            output = [
              t('output.availableCategories'),
              ...categories.map(c => `  ${c.id.padEnd(16)} ${c.title} (${c.skills.length})`),
              '',
              t('output.lsTip'),
            ];
          }
          break;
        }

        case 'cat': {
          const skillName = args.slice(1).join(' ');
          if (!skillName) {
            output = [t('output.catUsage'), t('output.catTip')];
            break;
          }
          const skill = SKILLS.find(s => s.name.toLowerCase() === skillName);
          if (skill) {
            output = [
              `${t('output.skillLabel')} ${skill.name}`,
              `${t('output.categoryLabel')} ${t(`categories.${skill.category}`)}`,
              `${t('output.proficiencyLabel')} ${skill.level}%`,
              `${t('output.iconLabel')} ${skill.icon}`,
            ];
          } else {
            output = [
              t('output.skillNotFound', { name: skillName }),
              t('output.findTip', { name: skillName }),
            ];
          }
          break;
        }

        case 'top': {
          const requested = parseInt(args[1], 10);
          const n = Number.isFinite(requested) && requested > 0 ? requested : 5;
          const sorted = [...SKILLS].sort((a, b) => b.level - a.level).slice(0, n);
          output = [
            t('output.topHeading', { count: sorted.length }),
            '',
            ...sorted.map((s, i) => `  ${String(i + 1).padStart(2)}. ${formatSkillLine(s.name, s.level, s.category).trim()}`),
          ];
          break;
        }

        case 'find':
        case 'grep': {
          const query = args.slice(1).join(' ');
          if (!query) {
            output = [t('output.findUsage'), t('output.findDesc')];
            break;
          }
          const matches = SKILLS.filter(s =>
            s.name.toLowerCase().includes(query) || s.category.toLowerCase().includes(query)
          );
          output = matches.length
            ? [t('output.matchesHeading', { query, count: matches.length }), '', ...matches.map(s => formatSkillLine(s.name, s.level, s.category))]
            : [t('output.noMatches', { query })];
          break;
        }

        case 'stats': {
          const total = SKILLS.length;
          const avg = Math.round(SKILLS.reduce((acc, s) => acc + s.level, 0) / total);
          const highest = [...SKILLS].sort((a, b) => b.level - a.level)[0];
          output = [
            t('output.statsHeading'),
            `  ${t('output.statsTotal')} ${total}`,
            `  ${t('output.statsCategories')} ${categories.length}`,
            `  ${t('output.statsAverage')} ${avg}%`,
            `  ${t('output.statsHighest')} ${highest.name} (${highest.level}%)`,
            '',
            t('output.statsByCategory'),
            ...categories.map(c => `  ${c.id.padEnd(16)} ${String(c.skills.length).padStart(2)} ${t('output.skillsSuffix')}`),
          ];
          break;
        }

        case 'tree': {
          const lines: string[] = ['skills/'];
          categories.forEach((c, i) => {
            const isLastCat = i === categories.length - 1;
            const catBranch = isLastCat ? '└── ' : '├── ';
            const childIndent = isLastCat ? '    ' : '│   ';
            lines.push(`${catBranch}${c.title}/  (${c.skills.length})`);
            c.skills.forEach((s, j) => {
              const isLastSkill = j === c.skills.length - 1;
              const skillBranch = isLastSkill ? '└── ' : '├── ';
              lines.push(`${childIndent}${skillBranch}${s.name} (${s.level}%)`);
            });
          });
          output = lines;
          break;
        }

        case 'levels':
          output = t('levels', { returnObjects: true }) as string[];
          break;

        case 'contact':
          output = [
            t('output.contactHeading'),
            `  ${t('output.contactEmail')} ${CONTACT.email}`,
            `  ${t('output.contactPhone')} ${CONTACT.phoneNo}`,
            `  ${t('output.contactLocation')} ${CONTACT.address}`,
            '',
            t('output.socialHeading'),
            `  GitHub:     ${CONTACT.social.github}`,
            `  LinkedIn:   ${CONTACT.social.linkedin}`,
          ];
          break;

        case 'history': {
          const recent = history.slice(-10);
          output = recent.length
            ? [t('output.historyHeading'), ...recent.map((h, i) => `  ${String(i + 1).padStart(2)}  ${h}`)]
            : [t('output.historyEmpty')];
          break;
        }

        case 'echo':
          output = [args.slice(1).join(' ')];
          break;

        case 'clear':
          setTerminalOutput([]);
          setCurrentInput('');
          setIsProcessing(false);
          return;

        default:
          output = [t('output.commandNotFound', { cmd }), t('output.typeHelp')];
      }

      setTerminalOutput(prev => [...prev, `$ ${input}`, ...output, '']);
      setCurrentInput('');
      setIsProcessing(false);
    }, 400);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentInput.trim() && !isProcessing) {
      executeCommand(currentInput);
    }
  };

  return (
    <div className="min-h-screen bg-bg-page">
      {/* Terminal Header */}
      <TerminalHeader
        command={t('terminal.command')}
        description={t('terminal.description')}
      />

      {/* Skills Categories */}
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
              {t('expertise.title')}
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              {t('expertise.subtitle')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {categories.map((category, categoryIndex) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-bg-surface border border-neutral-700 rounded-xl overflow-hidden"
                >
                  {/* Category Header */}
                  <div className="bg-bg-elevated border-b border-neutral-700 p-6">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-neutral-800 ${category.color}`}>
                        <IconComponent size={24} />
                      </div>
                      <h3 className="font-mono text-xl font-semibold text-primary-500">
                        {category.title}
                      </h3>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05), duration: 0.4 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.02 }}
                          className="bg-bg-elevated border border-neutral-700 p-4 rounded-lg hover:border-primary-500/50 transition-all duration-300 group"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <img
                                src={skill.icon}
                                alt={skill.name}
                                className="w-8 h-8 filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
                              />
                              <span className="font-mono font-medium text-neutral-200">
                                {skill.name}
                              </span>
                            </div>
                            <div>
                              <div className="mb-1 flex items-center justify-between text-xs font-mono">
                                <span className="text-neutral-500">{t('output.proficiencyLabel')}</span>
                                <span className="text-primary-500">{skill.level}%</span>
                              </div>
                              <div className="h-1.5 overflow-hidden rounded-full bg-neutral-800">
                                <div
                                  className="h-full rounded-full bg-primary-500/80 transition-all duration-500 group-hover:bg-primary-500"
                                  style={{ width: `${Math.max(0, Math.min(skill.level, 100))}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Terminal */}
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
              {t('explorer.title')}
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              {t('explorer.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-bg-elevated border border-neutral-700 rounded-xl overflow-hidden shadow-card">
              {/* Terminal Header */}
              <div className="bg-bg-surface border-b border-neutral-700 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-primary-500" />
                </div>
                <span className="font-mono text-sm text-neutral-400">skills-terminal</span>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm bg-bg-page h-96 overflow-y-auto">
                {terminalOutput.length === 0 && (
                  <div className="text-neutral-400">
                    <Typewriter
                      text={t('explorer.ready')}
                      delay={30}
                      className="block"
                    />
                    <div className="mt-4">
                      <span className="text-accent-500">$</span>
                      <span className="text-neutral-400 ml-2">{t('explorer.readyInput')}</span>
                    </div>
                  </div>
                )}

                {terminalOutput.map((line, index) => (
                  <div
                    key={index}
                    className={`${
                      line.startsWith('$') ? 'text-accent-500' : 
                      line.includes('Command not found') ? 'text-red-500' :
                      'text-neutral-200'
                    }`}
                  >
                    {line}
                  </div>
                ))}

                {isProcessing && (
                  <div className="flex items-center space-x-2">
                    <span className="text-accent-500">$</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                )}

                {/* Input Line */}
                <div className="flex items-center">
                  <span className="text-accent-500 mr-2">$</span>
                  <input
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 bg-transparent text-primary-500 outline-none placeholder-neutral-600 font-mono"
                    placeholder={isProcessing ? t('explorer.processing') : t('explorer.placeholder')}
                    disabled={isProcessing}
                  />
                  {!isProcessing && (
                    <div className="w-2 h-5 bg-primary-500 animate-pulse ml-1" />
                  )}
                </div>
              </div>
            </div>

            {/* Quick Commands */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { cmd: 'whoami', desc: t('quickCommands.whoami') },
                { cmd: 'top 5', desc: t('quickCommands.top') },
                { cmd: 'tree', desc: t('quickCommands.tree') },
                { cmd: 'stats', desc: t('quickCommands.stats') },
              ].map((item) => (
                <button
                  key={item.cmd}
                  onClick={() => setCurrentInput(item.cmd)}
                  className="p-3 bg-bg-elevated border border-neutral-700 rounded-lg text-left hover:border-primary-500/50 transition-colors group"
                >
                  <div className="font-mono text-sm text-primary-500 group-hover:text-primary-400">
                    $ {item.cmd}
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">{item.desc}</div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
