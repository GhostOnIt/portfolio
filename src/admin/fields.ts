import type { ResourceKey } from './api';

export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'boolean'
  | 'date'
  | 'tags'
  | 'localized'
  | 'localizedTextarea'
  | 'localizedList'
  | 'json';

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  rows?: number;
  hint?: string;
};

export type Column = { name: string; label: string };

export const RESOURCE_LABELS: Record<ResourceKey, string> = {
  blog: 'Blog posts',
  caseStudies: 'Case studies',
  projects: 'Projects',
  skills: 'Skills',
};

export const FIELDS: Record<ResourceKey, Field[]> = {
  blog: [
    { name: 'slug', label: 'Slug', type: 'text', required: true },
    { name: 'category', label: 'Category', type: 'text', required: true },
    { name: 'difficulty', label: 'Difficulty', type: 'text', required: true, hint: 'e.g. Beginner / Intermediate / Advanced' },
    { name: 'readTime', label: 'Read time', type: 'text', required: true, hint: 'e.g. "9 min read"' },
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'featured', label: 'Featured', type: 'boolean' },
    { name: 'published', label: 'Published', type: 'boolean' },
    { name: 'views', label: 'Views', type: 'number' },
    { name: 'likes', label: 'Likes', type: 'number' },
    { name: 'comments', label: 'Comments', type: 'number' },
    { name: 'tags', label: 'Tags', type: 'tags', hint: 'comma-separated' },
    { name: 'heroImage', label: 'Hero image URL', type: 'text' },
    { name: 'title', label: 'Title', type: 'localized', required: true },
    { name: 'excerpt', label: 'Excerpt', type: 'localizedTextarea', required: true, rows: 3 },
    { name: 'content', label: 'Content (Markdown)', type: 'localizedTextarea', required: true, rows: 18 },
  ],
  caseStudies: [
    { name: 'slug', label: 'Slug', type: 'text', required: true },
    { name: 'category', label: 'Category', type: 'text', required: true },
    { name: 'featured', label: 'Featured', type: 'boolean' },
    { name: 'published', label: 'Published', type: 'boolean' },
    { name: 'sortOrder', label: 'Sort order', type: 'number' },
    { name: 'timelineStart', label: 'Timeline start', type: 'text', required: true },
    { name: 'timelineEnd', label: 'Timeline end', type: 'text', required: true },
    { name: 'timelineDuration', label: 'Timeline duration', type: 'text', required: true },
    { name: 'technologies', label: 'Technologies', type: 'tags', hint: 'comma-separated' },
    { name: 'architectureComponents', label: 'Architecture components', type: 'tags', hint: 'comma-separated' },
    { name: 'impactMetrics', label: 'Impact metrics', type: 'json', hint: 'JSON object, e.g. {"cost":{"before":"...","after":"..."}}' },
    { name: 'title', label: 'Title', type: 'localized', required: true },
    { name: 'subtitle', label: 'Subtitle', type: 'localized', required: true },
    { name: 'challenge', label: 'Challenge', type: 'localizedTextarea', required: true, rows: 5 },
    { name: 'solution', label: 'Solution (one item per line)', type: 'localizedList', required: true, rows: 6 },
    { name: 'impact', label: 'Impact (one item per line)', type: 'localizedList', required: true, rows: 6 },
    { name: 'architecturePattern', label: 'Architecture pattern', type: 'localized', required: true },
  ],
  projects: [
    { name: 'slug', label: 'Slug', type: 'text', required: true },
    { name: 'category', label: 'Category', type: 'text', required: true },
    { name: 'published', label: 'Published', type: 'boolean' },
    { name: 'sortOrder', label: 'Sort order', type: 'number' },
    { name: 'image', label: 'Image URL', type: 'text' },
    { name: 'githubLink', label: 'GitHub link', type: 'text' },
    { name: 'websiteLink', label: 'Website link', type: 'text' },
    { name: 'technologies', label: 'Technologies', type: 'tags', hint: 'comma-separated' },
    { name: 'title', label: 'Title', type: 'localized', required: true },
    { name: 'description', label: 'Description', type: 'localizedTextarea', required: true, rows: 6 },
  ],
  skills: [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'icon', label: 'Icon URL', type: 'text', required: true },
    { name: 'category', label: 'Category', type: 'text', required: true },
    { name: 'level', label: 'Level (0-100)', type: 'number', required: true },
    { name: 'sortOrder', label: 'Sort order', type: 'number' },
  ],
};

export const DEFAULTS: Record<ResourceKey, () => Record<string, any>> = {
  blog: () => ({
    slug: '', category: 'DevOps', difficulty: 'Intermediate', readTime: '', date: '',
    featured: false, published: true, views: 0, likes: 0, comments: 0,
    tags: [], heroImage: '', title: { en: '' }, excerpt: { en: '' }, content: { en: '' },
  }),
  caseStudies: () => ({
    slug: '', category: '', featured: false, published: true, sortOrder: 0,
    timelineStart: '', timelineEnd: '', timelineDuration: '',
    technologies: [], architectureComponents: [], impactMetrics: {},
    title: { en: '' }, subtitle: { en: '' }, challenge: { en: '' },
    solution: { en: [] }, impact: { en: [] }, architecturePattern: { en: '' },
  }),
  projects: () => ({
    slug: '', category: 'devops', published: true, sortOrder: 0,
    image: '', githubLink: '', websiteLink: '',
    technologies: [], title: { en: '' }, description: { en: '' },
  }),
  skills: () => ({ name: '', icon: '', category: '', level: 50, sortOrder: 0 }),
};

export const COLUMNS: Record<ResourceKey, Column[]> = {
  blog: [
    { name: 'title', label: 'Title' },
    { name: 'category', label: 'Category' },
    { name: 'date', label: 'Date' },
    { name: 'published', label: 'Published' },
  ],
  caseStudies: [
    { name: 'title', label: 'Title' },
    { name: 'category', label: 'Category' },
    { name: 'sortOrder', label: 'Order' },
    { name: 'published', label: 'Published' },
  ],
  projects: [
    { name: 'title', label: 'Title' },
    { name: 'category', label: 'Category' },
    { name: 'sortOrder', label: 'Order' },
    { name: 'published', label: 'Published' },
  ],
  skills: [
    { name: 'name', label: 'Name' },
    { name: 'category', label: 'Category' },
    { name: 'level', label: 'Level' },
    { name: 'sortOrder', label: 'Order' },
  ],
};
