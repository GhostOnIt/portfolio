import { useState } from 'react';
import { motion } from 'framer-motion';
import { TerminalHeader } from '../components/TerminalHeader';
import { Typewriter } from '../components/Typewriter';
import { Cloud, Container, Code, Database, Terminal as TerminalIcon, Server } from 'lucide-react';
import { SKILLS, SKILLS_BY_CATEGORY, CONTACT } from '../data/portfolio';

export const Skills = () => {
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const categories = [
    {
      id: 'cloud',
      title: 'Cloud Platforms',
      icon: Cloud,
      skills: SKILLS_BY_CATEGORY.cloud,
      color: 'text-blue-500',
    },
    {
      id: 'containers',
      title: 'Container & Orchestration',
      icon: Container,
      skills: SKILLS_BY_CATEGORY.containers,
      color: 'text-blue-400',
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure as Code',
      icon: TerminalIcon,
      skills: SKILLS_BY_CATEGORY.infrastructure,
      color: 'text-purple-500',
    },
    {
      id: 'os',
      title: 'Operating Systems',
      icon: Server,
      skills: SKILLS_BY_CATEGORY.os,
      color: 'text-yellow-500',
    },
    {
      id: 'devops',
      title: 'DevOps & Automation',
      icon: Code,
      skills: SKILLS_BY_CATEGORY.devops,
      color: 'text-green-500',
    },
    {
      id: 'development',
      title: 'Development Stack',
      icon: Code,
      skills: SKILLS_BY_CATEGORY.development,
      color: 'text-orange-500',
    },
    {
      id: 'database',
      title: 'Databases',
      icon: Database,
      skills: SKILLS_BY_CATEGORY.database,
      color: 'text-red-500',
    },
  ];

  const helpLines = [
    'Available commands:',
    '  help                Show this list of commands',
    '  man <command>       Show detailed manual for a command',
    '  whoami              Print portfolio owner identity',
    '  ls [category]       List skills in a category (or list categories)',
    '  cat <skill>         Show details for a specific skill',
    '  top [n]             Show top N skills by proficiency (default: 5)',
    '  find <keyword>      Search skills by name or category',
    '  stats               Show overall skill statistics',
    '  tree                Show category tree of all skills',
    '  levels              Show the proficiency level scale',
    '  contact             Show contact information',
    '  history             Show recent commands',
    '  echo <text>         Print text back to the terminal',
    '  clear               Clear the terminal screen',
    '',
    'Examples:',
    '  ls cloud            List cloud skills',
    '  cat AWS             Show AWS details',
    '  top 3               Show top 3 skills',
    '  find docker         Search for "docker"',
    '  man tree            Read the manual for tree',
  ];

  const levelsLines = [
    'Proficiency Levels:',
    '  Beginner     (0-39%)   Familiar, learning in progress',
    '  Intermediate (40-69%)  Practical experience on real tasks',
    '  Advanced     (70-89%)  Production usage, can mentor others',
    '  Expert       (90-100%) Deep expertise, design-level decisions',
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
          output = helpLines;
          break;

        case 'man': {
          const target = args[1];
          if (!target) {
            output = ['Usage: man <command>', 'Type "help" to list available commands.'];
          } else if (manPages[target]) {
            output = manPages[target];
          } else {
            output = [`No manual entry for "${target}".`, 'Type "help" to list available commands.'];
          }
          break;
        }

        case 'whoami':
          output = [
            'Alexandre Sonicka Gomah',
            'AWS DevOps Engineer @ Akieni',
            'Pointe-Noire / Brazzaville, Republic of Congo',
            'Status: Available for new opportunities',
            '',
            'Tip: run "contact" for details, "stats" for a skill summary.',
          ];
          break;

        case 'ls': {
          const category = args[1];
          if (category && categories.find(c => c.id === category)) {
            const cat = categories.find(c => c.id === category)!;
            output = [
              `${cat.title} (${cat.skills.length}):`,
              ...cat.skills.map(s => formatSkillLine(s.name, s.level)),
            ];
          } else if (category) {
            output = [
              `Unknown category: "${category}"`,
              '',
              'Available categories:',
              ...categories.map(c => `  ${c.id.padEnd(16)} ${c.title}`),
            ];
          } else {
            output = [
              'Available categories:',
              ...categories.map(c => `  ${c.id.padEnd(16)} ${c.title} (${c.skills.length})`),
              '',
              'Tip: run "ls <category>" to list its skills.',
            ];
          }
          break;
        }

        case 'cat': {
          const skillName = args.slice(1).join(' ');
          if (!skillName) {
            output = ['Usage: cat <skill>', 'Tip: run "tree" or "ls" to discover skill names.'];
            break;
          }
          const skill = SKILLS.find(s => s.name.toLowerCase() === skillName);
          if (skill) {
            output = [
              `Skill:        ${skill.name}`,
              `Category:     ${skill.category}`,
              `Proficiency:  ${skill.level}%`,
              `Icon:         ${skill.icon}`,
            ];
          } else {
            output = [
              `Skill "${skillName}" not found.`,
              'Tip: run "find ' + skillName + '" to search by substring.',
            ];
          }
          break;
        }

        case 'top': {
          const requested = parseInt(args[1], 10);
          const n = Number.isFinite(requested) && requested > 0 ? requested : 5;
          const sorted = [...SKILLS].sort((a, b) => b.level - a.level).slice(0, n);
          output = [
            `Top ${sorted.length} skills by proficiency:`,
            '',
            ...sorted.map((s, i) => `  ${String(i + 1).padStart(2)}. ${formatSkillLine(s.name, s.level, s.category).trim()}`),
          ];
          break;
        }

        case 'find':
        case 'grep': {
          const query = args.slice(1).join(' ');
          if (!query) {
            output = ['Usage: find <keyword>', 'Searches skills by name or category (case-insensitive).'];
            break;
          }
          const matches = SKILLS.filter(s =>
            s.name.toLowerCase().includes(query) || s.category.toLowerCase().includes(query)
          );
          output = matches.length
            ? [`Matches for "${query}" (${matches.length}):`, '', ...matches.map(s => formatSkillLine(s.name, s.level, s.category))]
            : [`No skill matches "${query}".`];
          break;
        }

        case 'stats': {
          const total = SKILLS.length;
          const avg = Math.round(SKILLS.reduce((acc, s) => acc + s.level, 0) / total);
          const highest = [...SKILLS].sort((a, b) => b.level - a.level)[0];
          output = [
            'Skill statistics:',
            `  Total skills:       ${total}`,
            `  Categories:         ${categories.length}`,
            `  Average level:      ${avg}%`,
            `  Highest:            ${highest.name} (${highest.level}%)`,
            '',
            'By category:',
            ...categories.map(c => `  ${c.id.padEnd(16)} ${String(c.skills.length).padStart(2)} skills`),
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
          output = levelsLines;
          break;

        case 'contact':
          output = [
            'Contact:',
            `  Email:      ${CONTACT.email}`,
            `  Phone:      ${CONTACT.phoneNo}`,
            `  Location:   ${CONTACT.address}`,
            '',
            'Social:',
            `  GitHub:     ${CONTACT.social.github}`,
            `  LinkedIn:   ${CONTACT.social.linkedin}`,
          ];
          break;

        case 'history': {
          const recent = history.slice(-10);
          output = recent.length
            ? ['Recent commands:', ...recent.map((h, i) => `  ${String(i + 1).padStart(2)}  ${h}`)]
            : ['No history yet — start typing commands.'];
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
          output = [`Command not found: ${cmd}`, 'Type "help" to list available commands.'];
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
        command="ls -la skills/"
        description="Exploring technical expertise across cloud, development, and DevOps domains"
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
              Technical Expertise
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Comprehensive skill set spanning cloud infrastructure, development, and DevOps practices
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
                          <div className="flex items-center space-x-3 mb-3">
                            <img
                              src={skill.icon}
                              alt={skill.name}
                              className="w-8 h-8 filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
                            />
                            <span className="font-mono font-medium text-neutral-200">
                              {skill.name}
                            </span>
                          </div>
                          
                          {/* Proficiency Bar */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-neutral-400">Proficiency</span>
                              <span className="text-primary-500 font-mono">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-neutral-700 rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) + 0.3, duration: 0.8 }}
                                viewport={{ once: true }}
                                className="h-2 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full"
                              />
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
              Interactive Skill Explorer
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Use terminal commands to explore my skills in detail
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
                      text="Skills Explorer ready. Type 'help' to list commands, or 'man <command>' for details."
                      delay={30}
                      className="block"
                    />
                    <div className="mt-4">
                      <span className="text-accent-500">$</span>
                      <span className="text-neutral-400 ml-2">ready for input...</span>
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
                    placeholder={isProcessing ? "processing..." : "enter command..."}
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
                { cmd: 'whoami', desc: 'Who am I?' },
                { cmd: 'top 5', desc: 'Top skills' },
                { cmd: 'tree', desc: 'Category tree' },
                { cmd: 'stats', desc: 'Skills summary' },
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
