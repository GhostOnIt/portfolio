export const HERO_CONTENT = "Building scalable AWS infrastructures from code to cloud. DevOps Engineer specializing in Terraform IaC, Kubernetes orchestration with ArgoCD, and CI/CD automation — turning complex, high-availability requirements into reliable production systems.";

export const ABOUT_TEXT = "I'm a DevOps engineer with a Platform Engineering lens. My job isn't to wire up pipelines for their own sake — it's to build the systems and conventions that make the developers around me faster, more autonomous, and more confident in production. At Akieni, that means a self-service GitOps platform on Kubernetes (Terraform + ArgoCD) that turns a git push into a reviewed, audited deploy, with cost-efficiency and security baked into the modules every team consumes. Before that at Ginov, the same instinct showed up as a 40% cloud bill reduction across 230+ instances and a 40-tool automation suite that shortened onboarding from weeks to days. My background — Linux sysadmin, DBA intern, full-stack PHP developer, network engineer, Linux trainer — taught me that the leverage isn't in any single tool. It's in the standards: how environments are shaped, how secrets are handled, how a new service gets from git init to production on day one rather than week six. Engineers who work with my platforms ship faster, debug faster, and pick up cleaner habits along the way. That's the metric I optimize for — not how many YAML files I wrote, but how much friction I removed from somebody else's day.";

export const SKILLS = [
  // Cloud
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', category: 'cloud', level: 95 },
  { name: 'GCP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg', category: 'cloud', level: 10 },

  // Containers & Orchestration
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', category: 'containers', level: 90 },
  { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', category: 'containers', level: 85 },
  { name: 'ArgoCD', icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/argo.svg', category: 'containers', level: 80 },

  // Infrastructure as Code
  { name: 'Terraform', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg', category: 'infrastructure', level: 90 },
  { name: 'CloudFormation', icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/awscloudformation.svg', category: 'infrastructure', level: 80 },
  { name: 'Ansible', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg', category: 'infrastructure', level: 75 },

  // Operating Systems
  { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-plain.svg', category: 'os', level: 95 },
  { name: 'Windows Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg', category: 'os', level: 70 },

  // DevOps / Automation
  { name: 'Jenkins', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-plain.svg', category: 'devops', level: 85 },
  { name: 'AWS CodePipeline', icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/awscodepipeline.svg', category: 'devops', level: 80 },
  { name: 'GitLab CI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg', category: 'devops', level: 75 },
  { name: 'Bitbucket', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bitbucket/bitbucket-original.svg', category: 'devops', level: 70 },
  { name: 'AWS CLI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg', category: 'devops', level: 90 },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', category: 'devops', level: 90 },
  { name: 'Bash', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg', category: 'devops', level: 85 },

  // Development
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', category: 'development', level: 80 },
  { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', category: 'development', level: 70 },
  { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg', category: 'development', level: 75 },
  { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg', category: 'development', level: 75 },

  // Databases
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', category: 'database', level: 85 },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', category: 'database', level: 85 },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', category: 'database', level: 80 },
  { name: 'Oracle', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg', category: 'database', level: 75 },
  { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', category: 'database', level: 75 },
  { name: 'Apache Cassandra', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachecassandra/apachecassandra-original.svg', category: 'database', level: 70 },
];

export const PROJECTS = [
  {
    title: 'AWS Cloud Migration & Cost Optimization',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Led the migration of 230+ NodeJS and React application instances from on-premise infrastructure to AWS Cloud at Ginov Digital Congo. Reduced cloud service expenses by 40% through right-sizing, reserved instances, and architecture rationalization. Worked across EC2, S3, EBS, CodeCommit, Route 53, and CloudFormation.',
    technologies: ['AWS EC2', 'AWS S3', 'AWS EBS', 'Route 53', 'CodeCommit', 'CloudFormation', 'Python'],
    category: 'devops',
    githubLink: 'https://github.com/GhostOnIt',
    websiteLink: '',
  },
  {
    title: 'GitOps Platform with ArgoCD & Kubernetes',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Production-grade GitOps platform at Akieni deploying microservices to Kubernetes via ArgoCD, with declarative configuration, automated sync, and audit-friendly rollbacks. Pipelines provision and update infrastructure through Terraform plan/apply workflows triggered from Git.',
    technologies: ['Kubernetes', 'ArgoCD', 'Terraform', 'AWS', 'Docker', 'Git'],
    category: 'devops',
    githubLink: 'https://github.com/GhostOnIt',
    websiteLink: '',
  },
  {
    title: 'Terraform Infrastructure as Code',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Modular Terraform codebase provisioning multi-environment AWS infrastructure with reusable modules, remote state, and CI-driven plan/apply workflows. Designed to keep dev, staging, and production environments consistent and auditable.',
    technologies: ['Terraform', 'AWS', 'CI/CD', 'IAM', 'VPC'],
    category: 'devops',
    githubLink: 'https://github.com/GhostOnIt',
    websiteLink: '',
  },
  {
    title: 'DevOps Automation Toolkit',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Suite of 40+ Python and Bash tools built at Ginov to automate deployment, administration, and monitoring of web services on AWS. Reduced operational toil and shortened onboarding time for new engineers joining the platform.',
    technologies: ['Python', 'Bash', 'AWS CLI', 'Jenkins', 'Linux'],
    category: 'devops',
    githubLink: 'https://github.com/GhostOnIt',
    websiteLink: '',
  },
];

export const CONTACT = {
  address: 'Brazzaville, Republic of Congo',
  phoneNo: '+242 06 674 00 21',
  email: 'alexsonicka11@gmail.com',
  social: {
    github: 'https://github.com/GhostOnIt',
    linkedin: 'https://www.linkedin.com/in/alexandre-gomah',
    twitter: '',
  }
};

export const SKILLS_BY_CATEGORY = {
  cloud: SKILLS.filter(skill => skill.category === 'cloud'),
  containers: SKILLS.filter(skill => skill.category === 'containers'),
  infrastructure: SKILLS.filter(skill => skill.category === 'infrastructure'),
  os: SKILLS.filter(skill => skill.category === 'os'),
  devops: SKILLS.filter(skill => skill.category === 'devops'),
  development: SKILLS.filter(skill => skill.category === 'development'),
  database: SKILLS.filter(skill => skill.category === 'database'),
};

export const PROJECTS_BY_CATEGORY = {
  all: PROJECTS,
  devops: PROJECTS.filter(project => project.category === 'devops'),
  fullstack: PROJECTS.filter(project => project.category === 'fullstack'),
};
