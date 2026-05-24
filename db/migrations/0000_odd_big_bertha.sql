CREATE TABLE "blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"category" text NOT NULL,
	"difficulty" text NOT NULL,
	"read_time" text NOT NULL,
	"date" date NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"views" integer DEFAULT 0 NOT NULL,
	"likes" integer DEFAULT 0 NOT NULL,
	"comments" integer DEFAULT 0 NOT NULL,
	"tags" text[] DEFAULT '{}' NOT NULL,
	"hero_image" text,
	"title" jsonb NOT NULL,
	"excerpt" jsonb NOT NULL,
	"content" jsonb NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blog_posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "case_studies" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"category" text NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"timeline_start" text NOT NULL,
	"timeline_end" text NOT NULL,
	"timeline_duration" text NOT NULL,
	"technologies" text[] DEFAULT '{}' NOT NULL,
	"impact_metrics" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"architecture_components" text[] DEFAULT '{}' NOT NULL,
	"title" jsonb NOT NULL,
	"subtitle" jsonb NOT NULL,
	"challenge" jsonb NOT NULL,
	"solution" jsonb NOT NULL,
	"impact" jsonb NOT NULL,
	"architecture_pattern" jsonb NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "case_studies_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"image" text,
	"technologies" text[] DEFAULT '{}' NOT NULL,
	"category" text NOT NULL,
	"github_link" text,
	"website_link" text,
	"title" jsonb NOT NULL,
	"description" jsonb NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"icon" text NOT NULL,
	"category" text NOT NULL,
	"level" integer NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
