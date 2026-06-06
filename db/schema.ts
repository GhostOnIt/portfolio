import { pgTable, serial, text, integer, boolean, timestamp, jsonb, date } from 'drizzle-orm/pg-core';

// Translatable text: author fills `en` (the fallback); fr/ja optional.
export type Localized = { en: string; fr?: string; ja?: string };
// Translatable list of strings (e.g. case-study bullet lists).
export type LocalizedList = { en: string[]; fr?: string[]; ja?: string[] };

export const blogPosts = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  category: text('category').notNull(),
  difficulty: text('difficulty').notNull(),
  readTime: text('read_time').notNull(),
  date: date('date').notNull(),
  featured: boolean('featured').notNull().default(false),
  views: integer('views').notNull().default(0),
  likes: integer('likes').notNull().default(0),
  comments: integer('comments').notNull().default(0),
  tags: text('tags').array().notNull().default([]),
  heroImage: text('hero_image'),
  title: jsonb('title').$type<Localized>().notNull(),
  excerpt: jsonb('excerpt').$type<Localized>().notNull(),
  content: jsonb('content').$type<Localized>().notNull(),
  published: boolean('published').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const caseStudies = pgTable('case_studies', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  category: text('category').notNull(),
  featured: boolean('featured').notNull().default(false),
  timelineStart: text('timeline_start').notNull(),
  timelineEnd: text('timeline_end').notNull(),
  timelineDuration: text('timeline_duration').notNull(),
  technologies: text('technologies').array().notNull().default([]),
  impactMetrics: jsonb('impact_metrics').$type<Record<string, Record<string, string>>>().notNull().default({}),
  architectureComponents: text('architecture_components').array().notNull().default([]),
  title: jsonb('title').$type<Localized>().notNull(),
  subtitle: jsonb('subtitle').$type<Localized>().notNull(),
  challenge: jsonb('challenge').$type<Localized>().notNull(),
  solution: jsonb('solution').$type<LocalizedList>().notNull(),
  impact: jsonb('impact').$type<LocalizedList>().notNull(),
  architecturePattern: jsonb('architecture_pattern').$type<Localized>().notNull(),
  published: boolean('published').notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  image: text('image'),
  technologies: text('technologies').array().notNull().default([]),
  category: text('category').notNull(),
  githubLink: text('github_link'),
  websiteLink: text('website_link'),
  title: jsonb('title').$type<Localized>().notNull(),
  description: jsonb('description').$type<Localized>().notNull(),
  published: boolean('published').notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  icon: text('icon').notNull(),
  category: text('category').notNull(),
  level: integer('level').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
});

export const skillCategories = pgTable('skill_categories', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  label: text('label').notNull(),
  icon: text('icon'),
  color: text('color').notNull().default('text-primary-500'),
  visible: boolean('visible').notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;
export type CaseStudy = typeof caseStudies.$inferSelect;
export type NewCaseStudy = typeof caseStudies.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Skill = typeof skills.$inferSelect;
export type NewSkill = typeof skills.$inferInsert;
export type SkillCategory = typeof skillCategories.$inferSelect;
export type NewSkillCategory = typeof skillCategories.$inferInsert;
