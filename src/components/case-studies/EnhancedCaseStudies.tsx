import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FileText, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Target, 
  Users, 
  Code, 
  Database, 
  Cloud,
  Shield,
  Zap,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  BarChart3,
  Settings,
  GitBranch,
  Container,
  Globe,
  Server,
  Lock,
  Cpu,
  Network,
  Monitor
} from 'lucide-react';
import { 
  AnimatedBackground, 
  TechBadge, 
  StatsCard, 
  ProgressBar, 
  TimelineItem, 
  InteractiveButton,
  categoryColors,
  statusColors,
  difficultyColors
} from '../visual/VisualComponents';

interface CaseStudy {
  id: number;
  title: string;
  subtitle: string;
  category: keyof typeof categoryColors;
  featured: boolean;
  timeline: {
    start: string;
    end: string;
    duration: string;
  };
  challenge: string;
  solution: string[];
  impact: string[];
  technologies: string[];
  impactMetrics: {
    deploymentTime?: { before: string; after: string; improvement: string };
    cost?: { before: string; after: string; reduction: string };
    performance?: { improvement: string };
    availability?: { uptime: string; improvement: string };
    scalability?: { capacity: string; improvement: string };
  };
  architecture?: {
    components: string[];
    pattern: string;
  };
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "AWS Cloud Migration @ Ginov Digital Congo",
    subtitle: "230+ instances migrated, 40% cost reduction",
    category: "Cloud Infrastructure",
    featured: true,
    timeline: {
      start: "Mar 2022",
      end: "Aug 2024",
      duration: "~2 years"
    },
    challenge: "Ginov Digital Congo operated 230+ NodeJS and React application instances across a mix of on-premise and lightly-tuned AWS resources. Costs were growing fast, environments were inconsistent, and there was no central visibility on workloads or tagging. The task: consolidate everything onto AWS, rationalize the architecture, and cut the cloud bill without sacrificing reliability.",
    solution: [
      "Audited 230+ workloads, established a tagging strategy, and exported two weeks of CloudWatch metrics to surface real CPU/memory usage",
      "Right-sized stateless workloads to smaller t3/m6i instance families based on measured utilization",
      "Committed steady-state compute to 1-year Savings Plans (~60% of fleet) once usage patterns were proven",
      "Codified the inventory in CloudFormation modules, eliminating snowflake servers and making new environments reproducible",
      "Implemented S3 lifecycle rules and an EBS snapshot retention Lambda to cut storage waste",
      "Built and shipped 40+ Python/Bash automation tools for deployment, administration, and monitoring"
    ],
    impact: [
      "Reduced cloud service expenses by 40%",
      "Migrated 230+ NodeJS/React application instances to AWS",
      "Eliminated snowflake servers via CloudFormation as source of truth",
      "Shortened onboarding for new engineers thanks to standardized tooling and documentation",
      "Established baseline observability and tagging across the fleet"
    ],
    technologies: ["AWS EC2", "AWS S3", "AWS EBS", "Route 53", "CodeCommit", "CloudFormation", "Python", "Bash", "Jenkins"],
    impactMetrics: {
      cost: { before: "Baseline", after: "-40%", reduction: "40%" },
      scalability: { capacity: "230+ workloads", improvement: "Standardized" }
    },
    architecture: {
      components: ["EC2 Fleet", "S3 Storage", "Route 53", "CodeCommit", "CloudFormation Stacks", "Python Tooling"],
      pattern: "Cloud Migration with IaC and Right-Sizing"
    }
  },
  {
    id: 2,
    title: "GitOps Adoption @ Akieni",
    subtitle: "Terraform + ArgoCD + Kubernetes platform",
    category: "DevOps",
    featured: true,
    timeline: {
      start: "Sep 2024",
      end: "Present",
      duration: "Ongoing"
    },
    challenge: "Akieni's deployment workflow relied on manual SSH-based releases, with configuration drift between environments and limited audit trail. The mission: stand up a GitOps platform on Kubernetes where every change is a reviewed commit, every environment is reproducible, and rollback is a git revert away.",
    solution: [
      "Provisioned AWS EKS clusters via modular Terraform with remote state, locking, and encrypted defaults",
      "Deployed ArgoCD as the GitOps controller with sync waves for ordered resource application",
      "Standardized application packaging with Helm and Kustomize, hosted in a single platform repository",
      "Locked down the platform repo with branch protection, required reviews, and CI checks (tflint, checkov)",
      "Added Sealed Secrets so encrypted manifests live alongside the rest of the configuration",
      "Wired ArgoCD notifications to the team channel on sync failures and drift",
      "Wrote onboarding documentation and platform-access guides so new engineers ramp up in days, not weeks"
    ],
    impact: [
      "Manual SSH deploys replaced by declarative, reviewed GitOps flow",
      "Rollback time reduced from minutes-to-hours of manual work to a git revert + sync (~seconds)",
      "Configuration drift between environments effectively eliminated",
      "Full audit trail of every infrastructure and application change via Git history",
      "Improved AWS security posture (IAM least-privilege, encrypted state, drift detection)"
    ],
    technologies: ["Terraform", "Kubernetes", "ArgoCD", "AWS EKS", "Helm", "Kustomize", "Sealed Secrets", "Git"],
    impactMetrics: {
      deploymentTime: { before: "Manual SSH", after: "Git push", improvement: "Declarative" },
      availability: { uptime: "Improved", improvement: "Auditable rollbacks" }
    },
    architecture: {
      components: ["EKS Cluster", "ArgoCD", "Helm Charts", "Sealed Secrets", "Terraform State (S3 + DynamoDB)"],
      pattern: "GitOps with Declarative Platform Repo"
    }
  },
  {
    id: 3,
    title: "Linux Training Program @ NGO YEKOLAB",
    subtitle: "LPIC 1 & 2 curriculum delivered to working IT professionals",
    category: "DevOps",
    featured: false,
    timeline: {
      start: "2018",
      end: "2019",
      duration: "1 year"
    },
    challenge: "NGO YEKOLAB needed to upskill working IT professionals on Linux system administration — from system and network configuration to service management and IT security — with limited classroom time and learners holding day jobs.",
    solution: [
      "Designed an LPIC 1 & 2-aligned curriculum split between theory and hands-on labs",
      "Built progressive lab exercises so each session reinforced the previous one",
      "Adapted teaching pace and depth to varied learner backgrounds (junior admins, network engineers, support staff)",
      "Created take-home cheat sheets and reference material that learners could use back at work",
      "Mentored learners on real workplace incidents they brought to class"
    ],
    impact: [
      "Multiple promotions of IT professionals trained on Linux fundamentals and advanced administration",
      "Positive learner feedback on autonomy and confidence post-training",
      "Built foundational communication and documentation habits that carried into my later DevOps roles",
      "Established a peer network of Linux operators across multiple Congolese organizations"
    ],
    technologies: ["Linux", "LPIC 1 & 2", "Bash Scripting", "Networking", "IT Security"],
    impactMetrics: {
      performance: { improvement: "Learner autonomy on Linux ops" },
      scalability: { capacity: "Multiple cohorts", improvement: "Across orgs" }
    },
    architecture: {
      components: ["Curriculum Design", "Hands-on Labs", "Reference Material", "Mentoring"],
      pattern: "Theory + Practice + Mentoring"
    }
  }
];

const EnhancedCaseStudies: React.FC = () => {
  const { t } = useTranslation('caseStudies');
  const [selectedStudy, setSelectedStudy] = useState<number | null>(caseStudies[0]?.id || null);
  const [activeTab, setActiveTab] = useState<'overview' | 'solution' | 'results'>('overview');

  const selectedStudyData = caseStudies.find(study => study.id === selectedStudy);

  const categories = ['All', 'DevOps', 'Cloud Infrastructure'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredStudies = selectedCategory === 'All' 
    ? caseStudies 
    : caseStudies.filter(study => study.category === selectedCategory);

  const getIconForMetric = (metric: string) => {
    switch (metric) {
      case 'deploymentTime': return <Zap className="w-5 h-5" />;
      case 'cost': return <TrendingUp className="w-5 h-5" />;
      case 'performance': return <BarChart3 className="w-5 h-5" />;
      case 'availability': return <Target className="w-5 h-5" />;
      case 'scalability': return <TrendingUp className="w-5 h-5" />;
      default: return <BarChart3 className="w-5 h-5" />;
    }
  };

  return (
    <AnimatedBackground>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
            CASE_STUDIES.EXE
          </h1>
          <p className="text-green-200 text-lg max-w-3xl mx-auto">
            {t('header.subtitle')}
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
        >
          <StatsCard
            title={t('stats.completed')}
            value="3"
            icon={<FileText className="w-6 h-6" />}
            color="completed"
          />
          <StatsCard
            title={t('stats.costReduction')}
            value="40%"
            change={t('stats.costReductionChange')}
            icon={<TrendingUp className="w-6 h-6" />}
            color="completed"
            trend="up"
          />
          <StatsCard
            title={t('stats.serversMigrated')}
            value="230+"
            change={t('stats.serversMigratedChange')}
            icon={<Target className="w-6 h-6" />}
            color="completed"
            trend="up"
          />
        </motion.div>

        {/* Study Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-green-400 text-black'
                    : 'bg-gray-800 text-green-400 border border-gray-600 hover:border-green-400'
                }`}
              >
                {category === 'All' ? t('filters.all') : category}
              </motion.button>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {filteredStudies.map((study) => (
              <motion.div
                key={study.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedStudy(study.id)}
                className={`cursor-pointer p-4 rounded-lg border transition-all duration-300 ${
                  selectedStudy === study.id
                    ? 'bg-green-400/10 border-green-400'
                    : 'bg-gray-900/50 border-gray-700 hover:border-green-400/50'
                } ${study.featured ? 'ring-2 ring-yellow-400/50' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <TechBadge name={study.category} category={study.category} size="sm" />
                  {study.featured && (
                    <span className="text-xs text-yellow-400 font-medium">⭐ {t('featured')}</span>
                  )}
                </div>
                
                <h3 className="text-white font-bold mb-1 text-sm line-clamp-2">
                  {study.title}
                </h3>
                
                <p className="text-gray-400 text-xs mb-3 line-clamp-2">
                  {study.subtitle}
                </p>
                
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{study.timeline.duration}</span>
                  <span>•</span>
                  <span>{study.timeline.start} - {study.timeline.end}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Selected Study Details */}
        <AnimatePresence mode="wait">
          {selectedStudyData && (
            <motion.div
              key={selectedStudyData.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gray-900/50 border border-gray-700 rounded-lg overflow-hidden"
            >
              {/* Study Header */}
              <div className="p-6 border-b border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <TechBadge name={selectedStudyData.category} category={selectedStudyData.category} />
                      {selectedStudyData.featured && (
                        <span className="text-xs text-yellow-400 font-medium">⭐ {t('featuredProject')}</span>
                      )}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {selectedStudyData.title}
                    </h2>
                    <p className="text-green-400 text-lg">
                      {selectedStudyData.subtitle}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="text-center">
                      <Calendar className="w-5 h-5 mx-auto mb-1 text-green-400" />
                      <p className="font-medium">{selectedStudyData.timeline.start}</p>
                      <p className="text-xs">{t('timeline.startDate')}</p>
                    </div>
                    <div className="text-center">
                      <Clock className="w-5 h-5 mx-auto mb-1 text-green-400" />
                      <p className="font-medium">{selectedStudyData.timeline.duration}</p>
                      <p className="text-xs">{t('timeline.duration')}</p>
                    </div>
                    <div className="text-center">
                      <CheckCircle className="w-5 h-5 mx-auto mb-1 text-green-400" />
                      <p className="font-medium">{selectedStudyData.timeline.end}</p>
                      <p className="text-xs">{t('timeline.completion')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex border-b border-gray-700">
                {[
                  { id: 'overview', label: t('tabs.overview'), icon: <FileText className="w-4 h-4" /> },
                  { id: 'solution', label: t('tabs.solution'), icon: <Code className="w-4 h-4" /> },
                  { id: 'results', label: t('tabs.results'), icon: <BarChart3 className="w-4 h-4" /> }
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ y: -2 }}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'text-green-400 border-b-2 border-green-400'
                        : 'text-gray-400 hover:text-green-400'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </motion.button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === 'overview' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" />
                            {t('sections.challenge')}
                          </h3>
                          <p className="text-gray-300 leading-relaxed">
                            {selectedStudyData.challenge}
                          </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                              <Settings className="w-5 h-5" />
                              {t('sections.technologies')}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedStudyData.technologies.map((tech) => (
                                <TechBadge key={tech} name={tech} category={selectedStudyData.category} size="sm" />
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                              <GitBranch className="w-5 h-5" />
                              {t('sections.architecture')}
                            </h3>
                            <p className="text-gray-300 mb-2 font-medium">
                              {selectedStudyData.architecture?.pattern}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {selectedStudyData.architecture?.components.map((component) => (
                                <span key={component} className="px-2 py-1 bg-gray-800 text-green-400 text-xs rounded">
                                  {component}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'solution' && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                          <Code className="w-5 h-5" />
                          {t('sections.solutionApproach')}
                        </h3>
                        <div className="space-y-4">
                          {selectedStudyData.solution.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex gap-4 p-4 bg-gray-800/50 rounded-lg"
                            >
                              <div className="flex-shrink-0 w-8 h-8 bg-green-400 text-black rounded-full flex items-center justify-center font-bold text-sm">
                                {index + 1}
                              </div>
                              <p className="text-gray-300 leading-relaxed flex-1">
                                {item}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'results' && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                          <BarChart3 className="w-5 h-5" />
                          {t('sections.impactResults')}
                        </h3>

                        {/* Impact Metrics */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                          {Object.entries(selectedStudyData.impactMetrics).map(([key, metrics]) => (
                            <div key={key} className="bg-gray-800/50 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-3">
                                {getIconForMetric(key)}
                                <h4 className="font-bold text-white">
                                  {t(`metrics.${key}`)}
                                </h4>
                              </div>
                              
                              {key === 'deploymentTime' && metrics && (metrics as any).before && (metrics as any).after && (metrics as any).improvement && (
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">{t('metrics.before')}</span>
                                    <span className="text-red-400">{(metrics as any).before}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">{t('metrics.after')}</span>
                                    <span className="text-green-400">{(metrics as any).after}</span>
                                  </div>
                                  <div className="flex justify-between text-sm font-bold">
                                    <span className="text-gray-400">{t('metrics.improvement')}</span>
                                    <span className="text-green-400">-{(metrics as any).improvement}</span>
                                  </div>
                                </div>
                              )}

                              {key === 'cost' && metrics && (metrics as any).before && (metrics as any).after && (metrics as any).reduction && (
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">{t('metrics.before')}</span>
                                    <span className="text-red-400">{(metrics as any).before}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">{t('metrics.after')}</span>
                                    <span className="text-green-400">{(metrics as any).after}</span>
                                  </div>
                                  <div className="flex justify-between text-sm font-bold">
                                    <span className="text-gray-400">{t('metrics.reduction')}</span>
                                    <span className="text-green-400">-{(metrics as any).reduction}</span>
                                  </div>
                                </div>
                              )}

                              {key === 'availability' && metrics && 'uptime' in metrics && (
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">{t('metrics.uptime')}</span>
                                    <span className="text-green-400">{(metrics as any).uptime}</span>
                                  </div>
                                  <div className="flex justify-between text-sm font-bold">
                                    <span className="text-gray-400">{t('metrics.improvement')}</span>
                                    <span className="text-green-400">+{(metrics as any).improvement}</span>
                                  </div>
                                </div>
                              )}

                              {key === 'scalability' && metrics && 'capacity' in metrics && (
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">{t('metrics.capacity')}</span>
                                    <span className="text-green-400">{(metrics as any).capacity}</span>
                                  </div>
                                  <div className="flex justify-between text-sm font-bold">
                                    <span className="text-gray-400">{t('metrics.improvement')}</span>
                                    <span className="text-green-400">+{(metrics as any).improvement}</span>
                                  </div>
                                </div>
                              )}

                              {key === 'performance' && metrics && 'improvement' in metrics && (
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm font-bold">
                                    <span className="text-gray-400">{t('metrics.performanceGain')}</span>
                                    <span className="text-green-400">+{(metrics as any).improvement}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Impact List */}
                        <div className="space-y-3">
                          {selectedStudyData.impact.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg"
                            >
                              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <p className="text-gray-300 leading-relaxed">{item}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-400/30 rounded-lg p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-green-400 mb-4">
            INTERESTED_IN_A_SIMILAR_PROJECT?
          </h2>
          <p className="text-green-200 mb-6 max-w-2xl mx-auto">
            {t('cta.body')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <InteractiveButton variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
              {t('cta.start')}
            </InteractiveButton>

            <InteractiveButton variant="outline" icon={<FileText className="w-4 h-4" />}>
              {t('cta.downloadPdf')}
            </InteractiveButton>
          </div>
        </motion.section>
      </div>
    </AnimatedBackground>
  );
};

export default EnhancedCaseStudies;