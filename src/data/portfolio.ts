export const HERO_CONTENT = "Building scalable AWS infrastructures from code to cloud. DevOps Engineer specializing in Terraform IaC, Kubernetes orchestration with ArgoCD, and CI/CD automation — turning complex, high-availability requirements into reliable production systems.";

export const ABOUT_TEXT = "I'm an experienced cloud solutions architect and DevOps engineer with a solid background in IT and Linux system administration. My expertise lies in designing and implementing scalable AWS DevOps infrastructures that support complex, high-availability environments — from cost-optimized migrations to GitOps-driven Kubernetes platforms. Currently at Akieni, I automate and optimize cloud infrastructure with Terraform, ship production workloads to Kubernetes via ArgoCD, and own AWS security and cost-efficiency for the platform. Before that, as Team Lead at Ginov Digital Congo, I led the migration of 230+ NodeJS and React application instances to AWS — reducing cloud service expenses by 40% — and built a suite of 40+ tools automating deployment, administration, and monitoring. My journey started in the trenches of Linux administration and database management, then expanded through full-stack PHP development and network engineering before settling on cloud and DevOps. I also spent a year as a Linux trainer (LPIC 1 & 2) at NGO YEKOLAB, an experience that shaped how I document, mentor, and onboard teams today. For me, DevOps isn't just about speed — it's about precision, repeatability, and creating systems that empower developers to ship confidently and innovate faster.";

export const SKILLS = [
  // Cloud
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', category: 'cloud', level: 95 },

  // Containers & Orchestration
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', category: 'containers', level: 90 },
  { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', category: 'containers', level: 85 },
  { name: 'ArgoCD', icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/argo.svg', category: 'containers', level: 80 },

  // Infrastructure as Code
  { name: 'Terraform', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg', category: 'infrastructure', level: 90 },
  { name: 'CloudFormation', icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/awscloudformation.svg', category: 'infrastructure', level: 80 },

  // DevOps / Automation
  { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-plain.svg', category: 'devops', level: 95 },
  { name: 'Jenkins', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-plain.svg', category: 'devops', level: 85 },
  { name: 'AWS CodePipeline', icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/awscodepipeline.svg', category: 'devops', level: 80 },
  { name: 'AWS CLI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg', category: 'devops', level: 90 },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', category: 'devops', level: 90 },
  { name: 'Bash', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg', category: 'devops', level: 85 },

  // Development
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', category: 'development', level: 80 },
  { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', category: 'development', level: 70 },
  { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg', category: 'development', level: 75 },

  // Databases
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', category: 'database', level: 85 },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', category: 'database', level: 85 },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', category: 'database', level: 80 },
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
  address: 'Pointe-Noire, Republic of Congo',
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
  devops: SKILLS.filter(skill => skill.category === 'devops'),
  development: SKILLS.filter(skill => skill.category === 'development'),
  database: SKILLS.filter(skill => skill.category === 'database'),
};

export const PROJECTS_BY_CATEGORY = {
  all: PROJECTS,
  devops: PROJECTS.filter(project => project.category === 'devops'),
  fullstack: PROJECTS.filter(project => project.category === 'fullstack'),
};
