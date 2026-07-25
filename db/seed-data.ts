import type { NewBlogPost, NewCaseStudy, NewProject, NewSkill, NewSkillCategory } from './schema';

export const seedSkillCategories: NewSkillCategory[] = [
  { slug: 'cloud', label: 'Cloud', icon: 'Cloud', color: 'text-blue-500', sortOrder: 0 },
  { slug: 'containers', label: 'Containers', icon: 'Container', color: 'text-blue-400', sortOrder: 1 },
  { slug: 'infrastructure', label: 'Infrastructure as Code', icon: 'Terminal', color: 'text-purple-500', sortOrder: 2 },
  { slug: 'os', label: 'Operating Systems', icon: 'Server', color: 'text-yellow-500', sortOrder: 3 },
  { slug: 'devops', label: 'DevOps', icon: 'Code', color: 'text-green-500', sortOrder: 4 },
  { slug: 'development', label: 'Development', icon: 'Code', color: 'text-orange-500', sortOrder: 5 },
  { slug: 'database', label: 'Databases', icon: 'Database', color: 'text-red-500', sortOrder: 6 },
];

export const seedBlogPosts: NewBlogPost[] = [
  {
    slug: 'building-finops-visibility-with-aws-cur-athena-grafana',
    category: 'Cloud Infrastructure',
    difficulty: 'Advanced',
    readTime: '12 min read',
    date: '2026-07-24',
    featured: true,
    views: 860,
    likes: 69,
    comments: 8,
    tags: ['AWS CUR', 'Athena', 'Grafana', 'FinOps', 'AWS Organizations', 'Cost Allocation'],
    heroImage: '/assets/projects/aws-cur-athena-grafana-finops.svg',
    title: {
      en: 'Building FinOps Visibility with AWS CUR, Athena, and Grafana',
    },
    excerpt: {
      en: 'How I used AWS Cost and Usage Reports, S3, Athena, and Grafana to make costs readable by project and client inside a shared AWS infrastructure.',
    },
    content: {
      en: `
# Building FinOps Visibility with AWS CUR, Athena, and Grafana

At some point, a shared cloud platform stops having a simple billing story. The AWS invoice says what the organization spent, but it does not always explain why the bill moved, which client drove the change, or which project needs attention.

I ran into this problem in an AWS environment where multiple applications, projects, and client resources lived inside the same infrastructure perimeter. The teams could see the total spend, but the useful questions were harder to answer:

- How much does each project cost?
- Which client is consuming the most?
- What is production costing compared with staging or dev?
- Which services are growing fastest?
- Which resources are not tagged correctly?
- Which shared costs should be allocated back to project owners?

The real problem was not knowing how much AWS cost. The real problem was knowing why, for whom, and where.

## Why Native AWS Billing Was Not Enough

AWS Cost Explorer is useful for quick exploration, but I needed a more flexible operating view. The infrastructure was shared, and the cost model had to follow the way the business and engineering teams actually worked.

That meant slicing spend by:

- AWS account
- project
- client
- environment
- service
- region
- resource tags
- shared platform components

Cost Explorer could answer some of those questions, but it was not the dashboarding and reporting layer I wanted for repeated analysis. I needed something queryable, versionable, and easy to expose to teams.

## The Architecture

The platform I implemented used four main pieces:

- AWS Cost and Usage Report as the detailed billing source
- S3 as the storage layer
- Athena as the SQL query engine
- Grafana as the dashboarding and alerting interface

The flow looked like this:

- AWS Organizations centralizes billing in the payer account
- CUR exports detailed cost and usage data to S3
- Glue catalogs the CUR files
- Athena queries the report with SQL
- Grafana reads from Athena and displays dashboards

This setup kept the solution close to AWS native services, avoided introducing a paid FinOps platform, and gave enough flexibility to build exactly the cost views the organization needed.

## CUR As The Source Of Truth

AWS Cost and Usage Report is the lowest-level billing dataset I usually want before introducing a dedicated FinOps product. It gives enough granularity to analyze usage by account, service, usage type, operation, region, pricing model, tags, and commitment discounts.

For this use case, the important choices were:

- export from the payer account so linked accounts were included
- use Parquet to reduce query cost and improve Athena performance
- include resource IDs when deeper investigation was needed
- include cost allocation tags
- partition by billing period so queries could stay focused

CUR is not a dashboard. It is a dataset. Its value appears when the tagging model and query layer are clean enough to turn raw billing lines into decisions.

## The Tagging Model

The hardest part was not connecting Grafana to Athena. The hardest part was making the cost data trustworthy.

In a shared environment, tags become a financial contract. If a resource is missing a project or client tag, the cost can exist but become invisible to the right owner.

The key tags I pushed toward were:

- Project
- Client
- Environment
- Owner
- CostCenter
- Application
- ManagedBy

The goal was to make every significant resource answer a few simple questions: who owns me, what project do I support, what environment am I part of, and should this cost be allocated directly or treated as shared platform spend?

## Enforcing Tag Hygiene

Tagging cannot depend only on goodwill. People forget. Infrastructure grows. Emergency changes happen.

The better approach is to push tags into the delivery path:

- Terraform modules receive standard tags by default
- CI checks reject missing mandatory tags where possible
- shared modules normalize tag names and values
- dashboards expose untagged spend as a visible hygiene metric
- teams review unallocated cost regularly

This changed the conversation. Instead of arguing about a vague monthly bill, teams could see where the data was clean and where it needed correction.

## Athena As The Analysis Layer

Athena made the CUR data useful because it allowed cost questions to become SQL queries.

Some of the most useful queries were:

- monthly cost by project
- daily cost by client
- cost by AWS linked account
- cost by service and environment
- top services by monthly increase
- untagged or badly tagged spend
- shared platform cost separated from project cost
- production versus non-production spend

I preferred building reusable SQL views for the repeated questions. Grafana panels could then query a cleaner abstraction instead of embedding complicated billing logic everywhere.

## Grafana As The FinOps Interface

Grafana turned the query layer into something teams could actually use.

The dashboards were organized around a few views:

- Executive view: monthly spend, trend, and top cost drivers
- Project view: cost by project, environment, and service
- Client view: spend per client and allocation quality
- Engineering view: service-level breakdown and resource hot spots
- Hygiene view: untagged spend, missing tags, and allocation gaps

This gave different audiences the same source of truth without forcing everyone to read CUR columns directly.

## What The Dashboards Made Visible

The biggest win was clarity. Once the dashboards were in place, the team could answer questions that used to require manual billing exploration.

The platform made it easier to see:

- which projects were growing month over month
- which clients were driving infrastructure usage
- which environments were costing too much for their purpose
- which AWS services needed optimization work
- which teams needed to fix missing tags
- how much cost was shared platform overhead

That visibility is what makes FinOps practical. Optimization starts after ownership becomes visible.

## Lessons Learned

The first lesson is that cost visibility is a data quality problem before it is a dashboard problem. A beautiful Grafana dashboard is not useful if half of the spend is untagged or mislabeled.

The second lesson is that CUR is powerful but not friendly by default. You need naming conventions, reusable queries, and a clear model for amortized cost, shared cost, and tag-based allocation.

The third lesson is that the best FinOps dashboards do not only show money. They show accountability. They make ownership visible enough for engineering teams to act.

## Final Takeaway

AWS CUR, Athena, and Grafana gave me a low-cost and flexible FinOps stack for a shared AWS infrastructure where multiple client applications lived together.

The value was not only in seeing the AWS bill. The value was in transforming one global invoice into project-level and client-level visibility, backed by SQL, tags, dashboards, and repeatable operating habits.

That is the difference between billing and FinOps: billing tells you what happened; FinOps helps teams understand it, own it, and improve it.
    `,
    },
  },
  {
    slug: 'inside-sfec-devsecops-national-e-invoicing-platform',
    category: 'Cloud Infrastructure',
    difficulty: 'Advanced',
    readTime: '13 min read',
    date: '2026-07-24',
    featured: true,
    views: 980,
    likes: 76,
    comments: 9,
    tags: ['SFEC', 'Kubernetes', 'GitOps', 'DevSecOps', 'mTLS', 'Vault'],
    heroImage: '/assets/projects/sfec-devsecops.svg',
    title: {
      en: 'Inside SFEC: Building DevSecOps Infrastructure for a National E-Invoicing Platform',
    },
    excerpt: {
      en: "How I helped design and operate the infrastructure behind SFEC, Congo's national certified e-invoicing platform, across AWS, Kubernetes, GitOps, mTLS, Vault, monitoring, backups, and disaster recovery.",
    },
    content: {
      en: `
# Inside SFEC: Building DevSecOps Infrastructure for a National E-Invoicing Platform

SFEC is the national certified electronic invoicing platform of the Republic of Congo. It is the kind of system where infrastructure is not just hosting. It becomes part of the trust model: invoices need to be certified, APIs need to respond under load, terminals need reliable health checks, and sensitive communications need to remain protected from the first request to the final certificate.

I joined the project as a Senior DevOps engineer in a two-person infrastructure team, and I was involved from the earliest design discussions through deployment, optimization, security hardening, and production operations.

## The Mission

The project covered several public and internal surfaces:

- the public institutional site at sfec.gouv.cg
- the technical documentation at docs.sfec.gouv.cg
- the API and backend services
- the cloud infrastructure
- the CI/CD and GitOps delivery model
- the security perimeter
- monitoring, logs, backup, and disaster recovery

The platform had to serve a national use case, so the expectations were high from day one: confidentiality, resilience, robustness, short delivery deadlines, and capacity to absorb significant traffic without downtime or data loss.

## The Infrastructure Path

The first version of the infrastructure was deployed on AWS. That gave us managed building blocks and enough speed to move quickly while the platform was still evolving.

Key components included:

- Global Accelerator for resilient entry points
- Load Balancers for traffic distribution
- AWS Shield and WAF controls for protection
- Route53 for DNS, later complemented by Cloudflare
- S3 for storage needs
- database topology with reader and writer separation
- CDN and caching layers where they made sense
- EKS for the initial Kubernetes runtime

Later, the target shifted toward a government datacenter. That changed the operating model: instead of relying only on managed services, we had to reproduce part of the platform discipline ourselves. The Kubernetes layer moved from EKS to a cluster built from scratch, keeping the same operational mindset: declarative deployments, controlled rollouts, observability, and security by default.

## Kubernetes As The Runtime Contract

Kubernetes became the stable contract between development and operations. It gave us a consistent way to package, deploy, isolate, scale, and observe services across dev, staging, and production.

The goal was not to make developers learn every cluster detail. The goal was to give them a platform where a service could move from code to production through a predictable path.

That meant standardizing:

- namespace organization
- environment variables
- service exposure
- health checks
- deployment strategies
- resource requests and limits
- secrets injection
- operational conventions around logs and metrics

This was one of the most important parts of the work: making the deployment platform understandable enough for developers to use without turning every release into an infrastructure meeting.

## GitOps Delivery

The delivery flow was built around GitOps with ArgoCD. A new version goes through validation before the cluster state changes.

The release path looks like this:

- code is pushed
- release notes are prepared
- CI validates the change
- images are built and published
- deployment manifests are updated
- ArgoCD reconciles the desired state into the cluster
- rollouts happen without downtime when checks pass

This made deployments faster, more auditable, and easier for developers to operate themselves. Instead of depending on manual actions, the deployment process became a reviewed, repeatable workflow.

## Security Was The Hard Part

The hardest part of the project was communication security, especially mTLS.

In a national invoicing platform, not every route has the same trust level. Some surfaces are public. Some are private. Some are internal. Some endpoints exist mostly to allow terminals and infrastructure components to prove that they are healthy.

We had to separate those concerns carefully:

- public routes for user-facing and terminal-facing flows
- private routes requiring authentication
- internal routes protected behind the platform boundary
- health check routes that expose enough signal without exposing sensitive behavior
- rate limiting to reduce API saturation risk
- WAF rules against common attack classes
- DDoS protection through AWS Shield and Cloudflare

Certificates were managed with Vault acting as a certificate authority. Vault also handled secrets, while Kubernetes handled environment configuration injected into workloads before deployment.

## Observability And Operations

For production operations, we needed to know what the platform was doing before users reported problems. Logs were collected with Grafana Alloy as part of the LGMT observability stack.

The operational layer covered:

- application logs
- cluster signals
- API saturation indicators
- rollout health
- resource consumption
- backup status
- disaster recovery readiness

This mattered because the system had to avoid three major risks: downtime, data loss, and API overload.

## Backup And Disaster Recovery

Backup was not treated as a checkbox. The platform needed a recovery posture that could support real incidents, not just happy-path restores.

The infrastructure included backup and disaster recovery planning around the database, persistent components, and the operational state needed to rebuild or recover services.

For a system tied to certified invoices, recovery is part of the product promise. Losing infrastructure state is not acceptable when the business object is legally and operationally sensitive.

## Performance And Capacity

The strongest result so far is that the platform can process more than 50,000 invoices in one hour while using only about 8% of available resources.

That tells two useful stories at the same time:

- the platform has room to scale
- the infrastructure is not oversized beyond reason

The observed SLA so far is 99.73%, with the platform online for around eight months. Rolling updates have been effective, allowing releases without downtime.

## What This Changed For The Team

The biggest product of the infrastructure work was not only the cluster. It was developer autonomy.

Before a platform is mature, every deployment can become a negotiation between developers and operations. After the GitOps flow and Kubernetes conventions were in place, developers could ship more confidently and manage deployments through the platform itself.

That reduced friction, shortened release cycles, and made the system easier to operate with a small team.

## Key Decisions I Owned

The work that best represents my DevOps level on this project sits around orchestration and GitOps:

- designing the deployment flow around ArgoCD
- helping move from managed EKS to Kubernetes from scratch
- shaping how services are exposed and separated
- securing sensitive communications with mTLS
- using Vault for secrets and certificate management
- keeping public health check routes useful but limited
- building the operational model around monitoring, logs, backups, and recovery

## What I Would Revisit

The infrastructure is ready for scale, but part of the application stack may eventually need to evolve. Some services are heavy in JavaScript for the kind of workload the platform expects. A future technical direction could be moving selected backend components toward Go or Rust, depending on the final performance and maintainability trade-offs.

That is a good kind of next step: the infrastructure gives the team enough stability to make application-level improvements deliberately.

## Final Takeaway

SFEC is one of the projects where my DevSecOps work had to balance speed, security, resilience, and public-sector reliability at the same time.

The result is a production platform capable of processing national-scale certified invoices, with GitOps delivery, Kubernetes orchestration, mTLS communications, Vault-managed secrets, disaster recovery planning, and zero-downtime rolling updates.

This is the kind of infrastructure I like building: not only servers and pipelines, but an operating model that lets a critical platform keep moving safely.
    `,
    },
  },
  {
    slug: 'migrating-230-nodejs-instances-to-aws',
    category: 'DevOps',
    difficulty: 'Intermediate',
    readTime: '9 min read',
    date: '2025-11-12',
    featured: true,
    views: 2100,
    likes: 142,
    comments: 21,
    tags: ['AWS', 'Migration', 'Cost Optimization', 'EC2', 'CloudFormation'],
    title: {
      en: 'Migrating 230+ NodeJS Instances to AWS: A 40% Cost Reduction Story',
    },
    excerpt: {
      en: 'How we migrated 230+ NodeJS and React application instances from on-premise to AWS at Ginov Digital Congo, and the right-sizing and reserved-instance choices that cut our cloud bill by 40%.',
    },
    content: {
      en: `
# Migrating 230+ NodeJS Instances to AWS: A 40% Cost Reduction Story

When I joined Ginov Digital Congo as DevOps Engineer Team Lead, the platform was running 230+ NodeJS and React application instances across a mix of on-premise and lightly-tuned AWS resources. The cloud bill was growing fast and visibility was low. Over the following months we drove that bill down by 40% while improving reliability.

## The Starting Point

- 230+ workloads, mostly NodeJS APIs and React front-ends
- No consistent tagging strategy
- On-demand EC2 everywhere, sized "just in case"
- Minimal use of S3 lifecycle rules or EBS snapshot retention

## What Moved the Needle

### 1. Right-sizing with real metrics

We instrumented CloudWatch, exported two weeks of CPU/memory data, and discovered that the median instance was using less than 15% of its allocated CPU. Moving to smaller t3/m6i families for stateless workloads was the single biggest win.

### 2. Reserved Instances and Savings Plans

Once a steady-state footprint emerged, we committed 60% of compute to 1-year Savings Plans. Predictable workloads do not need on-demand pricing.

### 3. CloudFormation for everything

We ported the inventory to CloudFormation modules so any new environment was reproducible. This killed the "snowflake server" pattern that had quietly inflated costs for years.

### 4. S3 lifecycle and EBS snapshot hygiene

Old build artifacts moved to S3 Glacier. EBS snapshots older than 30 days were pruned automatically by a small Lambda.

## Lessons

- You can't optimize what you can't measure. Tag everything, export metrics, then act.
- Reserved capacity only pays off once steady-state is real — don't lock in too early.
- Right-sizing beats every other optimization combined for over-provisioned fleets.

## What's Next

The next chapter is GitOps with ArgoCD — covered in another post.
    `,
    },
  },
  {
    slug: 'gitops-in-production-argocd-kubernetes',
    category: 'DevOps',
    difficulty: 'Advanced',
    readTime: '11 min read',
    date: '2025-09-04',
    featured: true,
    views: 1700,
    likes: 118,
    comments: 17,
    tags: ['ArgoCD', 'GitOps', 'Kubernetes', 'Terraform', 'AWS'],
    title: {
      en: 'GitOps in Production with ArgoCD and Kubernetes',
    },
    excerpt: {
      en: "How we rolled out a declarative, audit-friendly GitOps platform at Akieni using ArgoCD and Terraform — and the production guardrails we wish we'd set up on day one.",
    },
    content: {
      en: `
# GitOps in Production with ArgoCD and Kubernetes

At Akieni, our deployment story used to be: SSH to a box, pull a branch, restart a service, hope for the best. This post is about what replaced it.

## Why GitOps

A declarative state in Git gives you three things that ad-hoc deploys never do:

1. **Auditability** — every change is a commit, signed and reviewed.
2. **Reproducibility** — the cluster's desired state lives in a repo, not in someone's terminal history.
3. **Rollback in seconds** — git revert + sync, no scripts to write at 2am.

## Our Stack

- AWS EKS clusters provisioned via Terraform
- ArgoCD as the GitOps controller
- Helm + Kustomize for application packaging
- A central "platform" repo holding the desired state of every environment

## Guardrails We Set Up

### Branch protection on the platform repo

The platform repo is the source of truth. Direct pushes to main are blocked. Every change goes through a PR with at least one reviewer and CI checks.

### Sync waves

ArgoCD sync waves let us order resource application. Namespaces and CRDs first, then operators, then workloads. Without this, race conditions are inevitable.

### Sealed Secrets

Secrets in Git are a no-go in plaintext. We use Sealed Secrets so encrypted manifests can live alongside the rest of the configuration.

### Notifications

ArgoCD's notification controller pings our team channel on sync failures and out-of-sync drift. Silence is the enemy of GitOps.

## What I'd Do Differently

Start with one application end-to-end before onboarding the whole fleet. We learned more from the first service than from the next ten.

## Closing

GitOps isn't magic — it's discipline encoded in tooling. Done well, it makes the platform boring in the best way.
    `,
    },
  },
  {
    slug: 'linux-trainer-to-devops-engineer',
    category: 'DevOps',
    difficulty: 'Beginner',
    readTime: '6 min read',
    date: '2025-06-18',
    featured: false,
    views: 2400,
    likes: 187,
    comments: 32,
    tags: ['Career', 'Linux', 'Mentoring', 'Teaching', 'LPIC'],
    title: {
      en: 'From Linux Trainer to DevOps Engineer: Knowledge Sharing as a Career Multiplier',
    },
    excerpt: {
      en: 'A year teaching Linux administration at NGO YEKOLAB taught me more about engineering than any single technical role since. Here\'s why I think every engineer should teach.',
    },
    content: {
      en: `
# From Linux Trainer to DevOps Engineer: Knowledge Sharing as a Career Multiplier

In 2018, after four years as a self-taught Linux admin, I spent a year delivering LPIC 1 & 2 courses at NGO YEKOLAB. It looked like a detour from my path toward DevOps. In retrospect, it was the most useful detour I've taken.

## What Teaching Actually Teaches You

### You learn what you actually know

Until you have to explain why \`chmod 755\` does what it does to a room of 15 people, you don't know if you know it. Teaching is a brutal but fair audit of your own understanding.

### You build communication muscles

DevOps lives at the seam between teams. Engineers who can explain why a deployment failed to a product manager — without jargon and without being condescending — are rare. Teaching builds that muscle.

### You learn to design for the learner

The skills that make a good Linux course (clear progression, working examples, predictable feedback loops) are the same skills that make good runbooks, onboarding docs, and post-mortems.

## How It Showed Up at Ginov and Akieni

Documentation became my reflex, not my chore. When I built 40+ DevOps tools at Ginov, each one had a one-page README that an intern could follow. When I joined Akieni, the first thing I did was a platform onboarding doc.

That's a direct line from a YEKOLAB classroom to a DevOps platform — knowledge sharing as compound interest.

## If You're Considering Teaching

Don't wait until you feel "expert enough." You learn it by doing it.
    `,
    },
  },
  {
    slug: 'securing-aws-with-terraform',
    category: 'Cloud Infrastructure',
    difficulty: 'Advanced',
    readTime: '10 min read',
    date: '2026-02-08',
    featured: false,
    views: 1300,
    likes: 94,
    comments: 12,
    tags: ['Terraform', 'AWS', 'Security', 'IaC', 'IAM'],
    title: {
      en: 'Securing AWS Infrastructures with Terraform: Patterns We Use at Akieni',
    },
    excerpt: {
      en: 'The Terraform patterns we rely on at Akieni to keep AWS infrastructure auditable and secure: remote state with locking, least-privilege IAM, encrypted defaults, and policy-as-code checks.',
    },
    content: {
      en: `
# Securing AWS Infrastructures with Terraform: Patterns We Use at Akieni

Terraform is everywhere, but "we use Terraform" doesn't say much about security posture. Here are the concrete patterns we lean on at Akieni.

## Remote State with Locking

State files leak more than they should. We:

- Store state in an S3 bucket with versioning and server-side encryption
- Lock with DynamoDB
- Restrict access via dedicated IAM roles, not user keys

\`\`\`hcl
terraform {
  backend "s3" {
    bucket         = "akieni-tf-state"
    key            = "platform/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "tf-state-lock"
  }
}
\`\`\`

## Least-Privilege IAM by Default

Every module ships with the smallest IAM policy that works. We refuse \`*\` actions in production unless a code reviewer signs off in writing. AWS Access Analyzer runs as part of the CI pipeline.

## Encrypted Defaults

- EBS volumes default to encrypted with a customer-managed KMS key
- RDS, S3 buckets, and SNS topics same story
- TLS-only bucket policies enforced via SCP

## Policy-as-Code

We pair Terraform with \`tflint\` and \`checkov\` in CI. PRs that introduce open security groups, public S3 buckets, or non-encrypted resources are blocked before merge.

## Drift Detection

\`terraform plan\` runs nightly against production. Any drift posts to our team channel. The goal is to know about manual changes before they become incidents.

## Takeaway

Security with Terraform is less about clever tricks and more about making the safe choice the default — in modules, in CI, in code review.
    `,
    },
  },
];

export const seedCaseStudies: NewCaseStudy[] = [
  {
    slug: 'aws-cloud-migration-ginov',
    category: 'Cloud Infrastructure',
    featured: true,
    timelineStart: 'Mar 2022',
    timelineEnd: 'Aug 2024',
    timelineDuration: '~2 years',
    technologies: ['AWS EC2', 'AWS S3', 'AWS EBS', 'Route 53', 'CodeCommit', 'CloudFormation', 'Python', 'Bash', 'Jenkins'],
    impactMetrics: {
      cost: { before: 'Baseline', after: '-40%', reduction: '40%' },
      scalability: { capacity: '230+ workloads', improvement: 'Standardized' },
    },
    architectureComponents: ['EC2 Fleet', 'S3 Storage', 'Route 53', 'CodeCommit', 'CloudFormation Stacks', 'Python Tooling'],
    title: {
      en: 'AWS Cloud Migration @ Ginov Digital Congo',
    },
    subtitle: {
      en: '230+ instances migrated, 40% cost reduction',
    },
    challenge: {
      en: 'Ginov Digital Congo operated 230+ NodeJS and React application instances across a mix of on-premise and lightly-tuned AWS resources. Costs were growing fast, environments were inconsistent, and there was no central visibility on workloads or tagging. The task: consolidate everything onto AWS, rationalize the architecture, and cut the cloud bill without sacrificing reliability.',
    },
    solution: {
      en: [
        'Audited 230+ workloads, established a tagging strategy, and exported two weeks of CloudWatch metrics to surface real CPU/memory usage',
        'Right-sized stateless workloads to smaller t3/m6i instance families based on measured utilization',
        'Committed steady-state compute to 1-year Savings Plans (~60% of fleet) once usage patterns were proven',
        'Codified the inventory in CloudFormation modules, eliminating snowflake servers and making new environments reproducible',
        'Implemented S3 lifecycle rules and an EBS snapshot retention Lambda to cut storage waste',
        'Built and shipped 40+ Python/Bash automation tools for deployment, administration, and monitoring',
      ],
    },
    impact: {
      en: [
        'Reduced cloud service expenses by 40%',
        'Migrated 230+ NodeJS/React application instances to AWS',
        'Eliminated snowflake servers via CloudFormation as source of truth',
        'Shortened onboarding for new engineers thanks to standardized tooling and documentation',
        'Established baseline observability and tagging across the fleet',
      ],
    },
    architecturePattern: {
      en: 'Cloud Migration with IaC and Right-Sizing',
    },
    sortOrder: 0,
  },
  {
    slug: 'gitops-adoption-akieni',
    category: 'DevOps',
    featured: true,
    timelineStart: 'Sep 2024',
    timelineEnd: 'Present',
    timelineDuration: 'Ongoing',
    technologies: ['Terraform', 'Kubernetes', 'ArgoCD', 'AWS EKS', 'Helm', 'Kustomize', 'Sealed Secrets', 'Git'],
    impactMetrics: {
      deploymentTime: { before: 'Manual SSH', after: 'Git push', improvement: 'Declarative' },
      availability: { uptime: 'Improved', improvement: 'Auditable rollbacks' },
    },
    architectureComponents: ['EKS Cluster', 'ArgoCD', 'Helm Charts', 'Sealed Secrets', 'Terraform State (S3 + DynamoDB)'],
    title: {
      en: 'GitOps Adoption @ Akieni',
    },
    subtitle: {
      en: 'Terraform + ArgoCD + Kubernetes platform',
    },
    challenge: {
      en: "Akieni's deployment workflow relied on manual SSH-based releases, with configuration drift between environments and limited audit trail. The mission: stand up a GitOps platform on Kubernetes where every change is a reviewed commit, every environment is reproducible, and rollback is a git revert away.",
    },
    solution: {
      en: [
        'Provisioned AWS EKS clusters via modular Terraform with remote state, locking, and encrypted defaults',
        'Deployed ArgoCD as the GitOps controller with sync waves for ordered resource application',
        'Standardized application packaging with Helm and Kustomize, hosted in a single platform repository',
        'Locked down the platform repo with branch protection, required reviews, and CI checks (tflint, checkov)',
        'Added Sealed Secrets so encrypted manifests live alongside the rest of the configuration',
        'Wired ArgoCD notifications to the team channel on sync failures and drift',
        'Wrote onboarding documentation and platform-access guides so new engineers ramp up in days, not weeks',
      ],
    },
    impact: {
      en: [
        'Manual SSH deploys replaced by declarative, reviewed GitOps flow',
        'Rollback time reduced from minutes-to-hours of manual work to a git revert + sync (~seconds)',
        'Configuration drift between environments effectively eliminated',
        'Full audit trail of every infrastructure and application change via Git history',
        'Improved AWS security posture (IAM least-privilege, encrypted state, drift detection)',
      ],
    },
    architecturePattern: {
      en: 'GitOps with Declarative Platform Repo',
    },
    sortOrder: 1,
  },
  {
    slug: 'linux-training-yekolab',
    category: 'DevOps',
    featured: false,
    timelineStart: '2018',
    timelineEnd: '2019',
    timelineDuration: '1 year',
    technologies: ['Linux', 'LPIC 1 & 2', 'Bash Scripting', 'Networking', 'IT Security'],
    impactMetrics: {
      performance: { improvement: 'Learner autonomy on Linux ops' },
      scalability: { capacity: 'Multiple cohorts', improvement: 'Across orgs' },
    },
    architectureComponents: ['Curriculum Design', 'Hands-on Labs', 'Reference Material', 'Mentoring'],
    title: {
      en: 'Linux Training Program @ NGO YEKOLAB',
    },
    subtitle: {
      en: 'LPIC 1 & 2 curriculum delivered to working IT professionals',
    },
    challenge: {
      en: 'NGO YEKOLAB needed to upskill working IT professionals on Linux system administration — from system and network configuration to service management and IT security — with limited classroom time and learners holding day jobs.',
    },
    solution: {
      en: [
        'Designed an LPIC 1 & 2-aligned curriculum split between theory and hands-on labs',
        'Built progressive lab exercises so each session reinforced the previous one',
        'Adapted teaching pace and depth to varied learner backgrounds (junior admins, network engineers, support staff)',
        'Created take-home cheat sheets and reference material that learners could use back at work',
        'Mentored learners on real workplace incidents they brought to class',
      ],
    },
    impact: {
      en: [
        'Multiple promotions of IT professionals trained on Linux fundamentals and advanced administration',
        'Positive learner feedback on autonomy and confidence post-training',
        'Built foundational communication and documentation habits that carried into my later DevOps roles',
        'Established a peer network of Linux operators across multiple Congolese organizations',
      ],
    },
    architecturePattern: {
      en: 'Theory + Practice + Mentoring',
    },
    sortOrder: 2,
  },
];

export const seedProjects: NewProject[] = [
  {
    slug: 'sfec-national-e-invoicing-infrastructure',
    image: '/assets/projects/sfec-devsecops.svg',
    technologies: ['AWS', 'Kubernetes', 'ArgoCD', 'Jenkins', 'Vault', 'Cloudflare', 'Kafka', 'Redis'],
    category: 'devops',
    githubLink: null,
    websiteLink: 'https://sfec.gouv.cg',
    title: {
      en: 'SFEC National E-Invoicing Infrastructure',
      fr: 'SFEC - Infrastructure nationale de facturation électronique',
      ja: 'SFEC 全国電子インボイス基盤',
    },
    description: {
      en: "Designed, deployed, and operated the DevSecOps infrastructure for SFEC, Congo's national certified electronic invoicing platform. Built the cloud architecture, Kubernetes orchestration, GitOps delivery, mTLS communications, secrets management, monitoring, backups, and disaster recovery across AWS and a government datacenter. The platform has processed 50K+ invoices/hour with zero-downtime rolling updates and 99.73% observed SLA.",
      fr: "Conception, déploiement et exploitation de l'infrastructure DevSecOps du SFEC, le système national de facturation électronique certifiée du Congo. Mise en place de l'architecture cloud, de l'orchestration Kubernetes, du GitOps, des communications mTLS, de la gestion des secrets, du monitoring, des backups et de la reprise après sinistre entre AWS et un datacenter gouvernemental. La plateforme a validé plus de 50 000 factures par heure avec des rolling updates sans downtime et un SLA observé de 99,73 %.",
      ja: 'コンゴ共和国の全国認証電子インボイス基盤である SFEC の DevSecOps インフラを設計、デプロイ、運用。クラウドアーキテクチャ、Kubernetes オーケストレーション、GitOps、mTLS 通信、シークレット管理、監視、バックアップ、災害復旧を AWS と政府系データセンターの両方で整備しました。プラットフォームは 1 時間あたり 50,000 件以上の請求書処理、ゼロダウンタイムの rolling update、99.73% の観測 SLA を達成しています。',
    },
    sortOrder: 0,
  },
  {
    slug: 'aws-cloud-migration',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    technologies: ['AWS EC2', 'AWS S3', 'AWS EBS', 'Route 53', 'CodeCommit', 'CloudFormation', 'Python'],
    category: 'devops',
    githubLink: 'https://github.com/GhostOnIt',
    websiteLink: null,
    title: {
      en: 'AWS Cloud Migration & Cost Optimization',
      fr: 'Migration Cloud AWS & optimisation des coûts',
      ja: 'AWS クラウド移行とコスト最適化',
    },
    description: {
      en: 'Led the migration of 230+ NodeJS and React application instances from on-premise infrastructure to AWS Cloud at Ginov Digital Congo. Reduced cloud service expenses by 40% through right-sizing, reserved instances, and architecture rationalization. Worked across EC2, S3, EBS, CodeCommit, Route 53, and CloudFormation.',
      fr: "Pilotage de la migration de plus de 230 instances d'applications NodeJS et React, d'une infrastructure on-premise vers le Cloud AWS chez Ginov Digital Congo. Réduction des dépenses cloud de 40 % grâce au right-sizing, aux instances réservées et à la rationalisation de l'architecture. Travail sur EC2, S3, EBS, CodeCommit, Route 53 et CloudFormation.",
      ja: 'Ginov Digital Congo にて、230 以上の NodeJS および React アプリケーションインスタンスをオンプレミス環境から AWS クラウドへ移行するプロジェクトを主導。right-sizing、リザーブドインスタンス、アーキテクチャの合理化により、クラウドコストを 40% 削減。EC2、S3、EBS、CodeCommit、Route 53、CloudFormation を横断的に活用。',
    },
    sortOrder: 1,
  },
  {
    slug: 'gitops-platform',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    technologies: ['Kubernetes', 'ArgoCD', 'Terraform', 'AWS', 'Docker', 'Git'],
    category: 'devops',
    githubLink: 'https://github.com/GhostOnIt',
    websiteLink: null,
    title: {
      en: 'GitOps Platform with ArgoCD & Kubernetes',
      fr: 'Plateforme GitOps avec ArgoCD & Kubernetes',
      ja: 'ArgoCD と Kubernetes による GitOps プラットフォーム',
    },
    description: {
      en: 'Production-grade GitOps platform at Akieni deploying microservices to Kubernetes via ArgoCD, with declarative configuration, automated sync, and audit-friendly rollbacks. Pipelines provision and update infrastructure through Terraform plan/apply workflows triggered from Git.',
      fr: "Plateforme GitOps de qualité production chez Akieni, déployant des microservices sur Kubernetes via ArgoCD, avec configuration déclarative, synchronisation automatisée et rollbacks auditables. Les pipelines provisionnent et mettent à jour l'infrastructure via des workflows Terraform plan/apply déclenchés depuis Git.",
      ja: 'Akieni における本番品質の GitOps プラットフォーム。ArgoCD を介して Kubernetes にマイクロサービスをデプロイし、宣言的な構成、自動同期、監査可能なロールバックを実現。パイプラインは Git から起動される Terraform plan/apply ワークフローでインフラをプロビジョニング・更新します。',
    },
    sortOrder: 2,
  },
  {
    slug: 'terraform-iac',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    technologies: ['Terraform', 'AWS', 'CI/CD', 'IAM', 'VPC'],
    category: 'devops',
    githubLink: 'https://github.com/GhostOnIt',
    websiteLink: null,
    title: {
      en: 'Terraform Infrastructure as Code',
      fr: 'Infrastructure as Code avec Terraform',
      ja: 'Terraform による Infrastructure as Code',
    },
    description: {
      en: 'Modular Terraform codebase provisioning multi-environment AWS infrastructure with reusable modules, remote state, and CI-driven plan/apply workflows. Designed to keep dev, staging, and production environments consistent and auditable.',
      fr: "Base de code Terraform modulaire provisionnant une infrastructure AWS multi-environnements avec des modules réutilisables, un état distant et des workflows plan/apply pilotés par la CI. Conçue pour garder les environnements dev, staging et production cohérents et auditables.",
      ja: '再利用可能なモジュール、リモートステート、CI 駆動の plan/apply ワークフローを備え、マルチ環境の AWS インフラをプロビジョニングするモジュール式 Terraform コードベース。dev、staging、production の各環境を一貫性のある監査可能な状態に保つよう設計。',
    },
    sortOrder: 3,
  },
  {
    slug: 'devops-automation-toolkit',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    technologies: ['Python', 'Bash', 'AWS CLI', 'Jenkins', 'Linux'],
    category: 'devops',
    githubLink: 'https://github.com/GhostOnIt',
    websiteLink: null,
    title: {
      en: 'DevOps Automation Toolkit',
      fr: "Boîte à outils d'automatisation DevOps",
      ja: 'DevOps 自動化ツールキット',
    },
    description: {
      en: 'Suite of 40+ Python and Bash tools built at Ginov to automate deployment, administration, and monitoring of web services on AWS. Reduced operational toil and shortened onboarding time for new engineers joining the platform.',
      fr: "Suite de plus de 40 outils Python et Bash développés chez Ginov pour automatiser le déploiement, l'administration et le monitoring de services web sur AWS. Réduction du travail opérationnel répétitif et raccourcissement du temps d'onboarding des nouveaux ingénieurs rejoignant la plateforme.",
      ja: 'AWS 上の Web サービスのデプロイ・管理・モニタリングを自動化するために Ginov で構築した 40 以上の Python・Bash ツール群。運用上の手作業を削減し、プラットフォームに参加する新規エンジニアのオンボーディング時間を短縮しました。',
    },
    sortOrder: 4,
  },
];

export const seedSkills: NewSkill[] = [
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', category: 'cloud', level: 95, sortOrder: 0 },
  { name: 'GCP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg', category: 'cloud', level: 10, sortOrder: 1 },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', category: 'containers', level: 90, sortOrder: 2 },
  { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', category: 'containers', level: 85, sortOrder: 3 },
  { name: 'ArgoCD', icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/argo.svg', category: 'containers', level: 80, sortOrder: 4 },
  { name: 'Terraform', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg', category: 'infrastructure', level: 90, sortOrder: 5 },
  { name: 'CloudFormation', icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/awscloudformation.svg', category: 'infrastructure', level: 80, sortOrder: 6 },
  { name: 'Ansible', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg', category: 'infrastructure', level: 75, sortOrder: 7 },
  { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-plain.svg', category: 'os', level: 95, sortOrder: 8 },
  { name: 'Windows Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg', category: 'os', level: 70, sortOrder: 9 },
  { name: 'Jenkins', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-plain.svg', category: 'devops', level: 85, sortOrder: 10 },
  { name: 'AWS CodePipeline', icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/awscodepipeline.svg', category: 'devops', level: 80, sortOrder: 11 },
  { name: 'GitLab CI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg', category: 'devops', level: 75, sortOrder: 12 },
  { name: 'Bitbucket', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bitbucket/bitbucket-original.svg', category: 'devops', level: 70, sortOrder: 13 },
  { name: 'AWS CLI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg', category: 'devops', level: 90, sortOrder: 14 },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', category: 'devops', level: 90, sortOrder: 15 },
  { name: 'Bash', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg', category: 'devops', level: 85, sortOrder: 16 },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', category: 'development', level: 80, sortOrder: 17 },
  { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', category: 'development', level: 70, sortOrder: 18 },
  { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg', category: 'development', level: 75, sortOrder: 19 },
  { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg', category: 'development', level: 75, sortOrder: 20 },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', category: 'database', level: 85, sortOrder: 21 },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', category: 'database', level: 85, sortOrder: 22 },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', category: 'database', level: 80, sortOrder: 23 },
  { name: 'Oracle', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg', category: 'database', level: 75, sortOrder: 24 },
  { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', category: 'database', level: 75, sortOrder: 25 },
  { name: 'Apache Cassandra', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachecassandra/apachecassandra-original.svg', category: 'database', level: 70, sortOrder: 26 },
];
