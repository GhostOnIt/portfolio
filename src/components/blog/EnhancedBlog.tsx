import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Search, 
  Tag,
  ArrowRight,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Star,
  Filter,
  Grid3X3,
  List,
  Zap,
  Target,
  Award,
  Code,
  Database,
  Cloud,
  Shield
} from 'lucide-react';
import { 
  AnimatedBackground, 
  TechBadge, 
  LoadingSkeleton, 
  StatsCard, 
  InteractiveButton, 
  CategoryFilter, 
  ViewToggle, 
  EngagementMetrics,
  categoryColors
} from '../visual/VisualComponents';

interface BlogPost {
  id: number;
  title: string;
  category: keyof typeof categoryColors;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: string;
  date: string;
  featured: boolean;
  views: string;
  likes: string;
  comments: string;
  excerpt: string;
  tags: string[];
  heroImage?: string;
  content: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Migrating 230+ NodeJS Instances to AWS: A 40% Cost Reduction Story",
    category: "DevOps",
    difficulty: "Intermediate",
    readTime: "9 min read",
    date: "2025-11-12",
    featured: true,
    views: "2.1k",
    likes: "142",
    comments: "21",
    excerpt: "How we migrated 230+ NodeJS and React application instances from on-premise to AWS at Ginov Digital Congo, and the right-sizing and reserved-instance choices that cut our cloud bill by 40%.",
    tags: ["AWS", "Migration", "Cost Optimization", "EC2", "CloudFormation"],
    content: `
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
    `
  },
  {
    id: 2,
    title: "GitOps in Production with ArgoCD and Kubernetes",
    category: "DevOps",
    difficulty: "Advanced",
    readTime: "11 min read",
    date: "2025-09-04",
    featured: true,
    views: "1.7k",
    likes: "118",
    comments: "17",
    excerpt: "How we rolled out a declarative, audit-friendly GitOps platform at Akieni using ArgoCD and Terraform — and the production guardrails we wish we'd set up on day one.",
    tags: ["ArgoCD", "GitOps", "Kubernetes", "Terraform", "AWS"],
    content: `
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
    `
  },
  {
    id: 3,
    title: "From Linux Trainer to DevOps Engineer: Knowledge Sharing as a Career Multiplier",
    category: "DevOps",
    difficulty: "Beginner",
    readTime: "6 min read",
    date: "2025-06-18",
    featured: false,
    views: "2.4k",
    likes: "187",
    comments: "32",
    excerpt: "A year teaching Linux administration at NGO YEKOLAB taught me more about engineering than any single technical role since. Here's why I think every engineer should teach.",
    tags: ["Career", "Linux", "Mentoring", "Teaching", "LPIC"],
    content: `
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
    `
  },
  {
    id: 4,
    title: "Securing AWS Infrastructures with Terraform: Patterns We Use at Akieni",
    category: "Cloud Infrastructure",
    difficulty: "Advanced",
    readTime: "10 min read",
    date: "2026-02-08",
    featured: false,
    views: "1.3k",
    likes: "94",
    comments: "12",
    excerpt: "The Terraform patterns we rely on at Akieni to keep AWS infrastructure auditable and secure: remote state with locking, least-privilege IAM, encrypted defaults, and policy-as-code checks.",
    tags: ["Terraform", "AWS", "Security", "IaC", "IAM"],
    content: `
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
    `
  }
];

const categories = ['All', 'DevOps', 'Cloud Infrastructure'];

const EnhancedBlog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'views' | 'likes'>('date');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [blogViews, setBlogViews] = useState<{[key: number]: number}>({});

  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'views':
          return parseInt(b.views.replace('k', '000')) - parseInt(a.views.replace('k', '000'));
        case 'likes':
          return parseInt(b.likes) - parseInt(a.likes);
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    return filtered;
  }, [selectedCategory, searchTerm, sortBy]);

  const featuredPosts = blogPosts.filter(post => post.featured);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    // Simulate real-time view increment
    setBlogViews(prev => ({
      ...prev,
      [post.id]: (prev[post.id] || parseInt(post.views.replace('k', '000'))) + 1
    }));
  };

  const getPostViews = (post: BlogPost) => {
    const views = blogViews[post.id] || parseInt(post.views.replace('k', '000'));
    return views > 1000 ? `${(views / 1000).toFixed(1)}k` : views.toString();
  };

  const getTotalViews = () => {
    return blogPosts.reduce((total, post) => {
      return total + (blogViews[post.id] || parseInt(post.views.replace('k', '000')));
    }, 0);
  };

  const totalViews = getTotalViews();
  const totalViewsFormatted = totalViews > 1000 ? `${(totalViews / 1000).toFixed(1)}k` : totalViews.toString();

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
            TECH_BLOG.EXE
          </h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Insights, tutorials, and best practices from the world of DevOps, Cloud Infrastructure, and Full-Stack Development
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <StatsCard
            title="Total Articles"
            value="4"
            icon={<BookOpen className="w-6 h-6" />}
            color="completed"
          />
          <StatsCard
            title="Total Views"
            value={totalViewsFormatted}
            change="Real-time tracking"
            icon={<Eye className="w-6 h-6" />}
            color="completed"
            trend="up"
          />
          <StatsCard
            title="Engagement Rate"
            value="72%"
            change="Active readership"
            icon={<Heart className="w-6 h-6" />}
            color="completed"
            trend="up"
          />
          <StatsCard
            title="Avg. Read Time"
            value="8 min"
            change="Industry average: 7 min"
            icon={<Clock className="w-6 h-6" />}
            color="completed"
            trend="up"
          />
        </motion.div>

        {/* Featured Posts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-green-400 flex items-center gap-2">
            <Star className="w-6 h-6" />
            Featured Articles
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <motion.article
                key={post.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => handlePostClick(post)}
                className="bg-gray-900/50 border border-gray-700 rounded-lg overflow-hidden cursor-pointer group"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <TechBadge name={post.category} category={post.category} size="sm" />
                    <span className="text-xs text-yellow-400 font-medium">⭐ Featured</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <EngagementMetrics
                      views={getPostViews(post)}
                      likes={post.likes}
                      comments={post.comments}
                      featured={post.featured}
                    />
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{post.readTime}</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-800 text-green-400 text-xs rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
            />
          </div>
          
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          
          <ViewToggle view={view} onViewChange={setView} />
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'views' | 'likes')}
            className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-400"
          >
            <option value="date">Latest</option>
            <option value="views">Most Viewed</option>
            <option value="likes">Most Liked</option>
          </select>
        </motion.div>

        {/* Blog Posts Grid/List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${searchTerm}-${view}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={view === 'grid' 
              ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-6'
            }
          >
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handlePostClick(post)}
                className="bg-gray-900/50 border border-gray-700 rounded-lg overflow-hidden cursor-pointer group hover:border-green-400 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <TechBadge name={post.category} category={post.category} size="sm" />
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded ${
                        post.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                        post.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {post.difficulty}
                      </span>
                      {post.featured && (
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-green-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <EngagementMetrics
                    views={getPostViews(post)}
                    likes={post.likes}
                    comments={post.comments}
                    featured={post.featured}
                  />
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-800 text-green-400 text-xs rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{post.readTime}</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No articles found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}

        {/* Newsletter Signup */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-400/30 rounded-lg p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-green-400 mb-4">
            STAY_UPDATED.EXE
          </h2>
          <p className="text-green-200 mb-6 max-w-2xl mx-auto">
            Subscribe to get the latest DevOps insights, tutorials, and best practices delivered to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
            />
            <InteractiveButton variant="primary">
              Subscribe
            </InteractiveButton>
          </div>
          
          <p className="text-xs text-gray-400 mt-3">
            No spam, unsubscribe at any time.
          </p>
        </motion.section>

        {/* Blog Post Modal */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedPost(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gray-900 border border-gray-700 rounded-lg max-w-4xl max-h-[90vh] overflow-hidden"
              >
                <div className="p-6 border-b border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <TechBadge name={selectedPost.category} category={selectedPost.category} size="sm" />
                      <span className={`px-2 py-1 text-xs rounded ${
                        selectedPost.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                        selectedPost.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {selectedPost.difficulty}
                      </span>
                      {selectedPost.featured && (
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      )}
                    </div>
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {selectedPost.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(selectedPost.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{selectedPost.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{getPostViews(selectedPost)} views</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                  <div className="prose prose-invert prose-green max-w-none">
                    {selectedPost.content.split('\n').map((paragraph, index) => {
                      if (paragraph.startsWith('# ')) {
                        return <h1 key={index} className="text-3xl font-bold text-green-400 mb-4">{paragraph.substring(2)}</h1>;
                      } else if (paragraph.startsWith('## ')) {
                        return <h2 key={index} className="text-2xl font-bold text-green-400 mb-3 mt-6">{paragraph.substring(3)}</h2>;
                      } else if (paragraph.startsWith('### ')) {
                        return <h3 key={index} className="text-xl font-bold text-green-400 mb-2 mt-4">{paragraph.substring(4)}</h3>;
                      } else if (paragraph.startsWith('```')) {
                        const isClosing = paragraph === '```';
                        if (isClosing) {
                          return <div key={index}></div>;
                        }
                        const nextParagraph = selectedPost.content.split('\n')[index + 1];
                        return (
                          <pre key={index} className="bg-gray-800 p-4 rounded-lg mb-4 overflow-x-auto">
                            <code className="text-green-400">{nextParagraph}</code>
                          </pre>
                        );
                      } else if (paragraph.trim()) {
                        return <p key={index} className="text-gray-300 leading-relaxed mb-4">{paragraph}</p>;
                      }
                      return <br key={index} />;
                    })}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <div className="flex flex-wrap gap-2">
                      {selectedPost.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-gray-800 text-green-400 text-sm rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedBackground>
  );
};

export default EnhancedBlog;