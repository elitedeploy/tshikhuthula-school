import { defineCollection, z } from 'astro:content';

const academicsCollection = defineCollection({
  schema: z.object({
    subject: z.string(),
    grade_level: z.string(),
    description: z.string(),
    learning_outcomes: z.array(z.string()),
    assessment_methods: z.array(z.string()),
    resources: z.array(z.string()),
    weekly_hours: z.number(),
    curriculum_framework: z.string(),
    language_of_instruction: z.string(),
    prerequisites: z.array(z.string()).optional(),
    career_pathways: z.array(z.string()).optional(),
    is_core_subject: z.boolean(),
    image: z.string(),
  }),
});

const eventsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    time: z.string(),
    location: z.string(),
    category: z.string(),
    image: z.string(),
    is_featured: z.boolean(),
    registration_required: z.boolean(),
  }),
});

const newsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.string(),
    author: z.string(),
    category: z.string(),
    image: z.string(),
    is_featured: z.boolean(),
    tags: z.array(z.string()),
  }),
});

const pagesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heroTitle: z.string().optional(),
    heroSubtitle: z.string().optional(),
    heroDescription: z.string().optional(),
    aboutTitle: z.string().optional(),
    aboutDescription: z.string().optional(),
    aboutImage: z.string().optional(),
    mission: z.string().optional(),
    vision: z.string().optional(),
    values: z.array(z.string()).optional(),
  }),
});

const settingsCollection = defineCollection({
  schema: z.object({
    site_name: z.string(),
    site_description: z.string(),
    contact_email: z.string(),
    contact_phone: z.string(),
    address: z.string(),
    social_media: z.object({
      facebook: z.string(),
      twitter: z.string(),
      instagram: z.string(),
      linkedin: z.string(),
    }),
  }),
});

const sponsorsCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    description: z.string(),
    category: z.string(),
    website: z.string(),
    email: z.string(),
    phone: z.string(),
    logo: z.string(),
    contribution_type: z.array(z.string()),
    partnership_since: z.string(),
    is_featured: z.boolean(),
    social_media: z.object({
      facebook: z.string(),
      twitter: z.string(),
      linkedin: z.string().optional(),
    }),
  }),
});

const staffCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    position: z.string(),
    department: z.string(),
    email: z.string(),
    phone: z.string(),
    bio: z.string(),
    image: z.string(),
    qualifications: z.array(z.string()),
    is_featured: z.boolean(),
  }),
});

const teamCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    position: z.string(),
    bio: z.string(),
    image: z.string(),
    facebook: z.string(),
    twitter: z.string(),
    instagram: z.string(),
    linkedin: z.string(),
  }),
});

const testimonialsCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    position: z.string(),
    company: z.string(),
    testimonial: z.string(),
    image: z.string(),
    rating: z.number(),
  }),
});

export const collections = {
  academics: academicsCollection,
  events: eventsCollection,
  news: newsCollection,
  pages: pagesCollection,
  settings: settingsCollection,
  sponsors: sponsorsCollection,
  staff: staffCollection,
  team: teamCollection,
  testimonials: testimonialsCollection,
};