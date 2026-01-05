/**
 * Centralized Zod Schemas
 *
 * This file contains reusable validation schemas for forms and API requests.
 * Schemas that require dynamic translations should be created inside components.
 */

import { z } from 'zod'

// ============================================
// BASE SCHEMAS (without i18n)
// ============================================

/**
 * Email validation schema (reusable)
 */
export const emailSchema = z.string().trim().email().max(255)

/**
 * Name validation schema (reusable)
 */
export const nameSchema = z.string().trim().min(1).max(100)

/**
 * URL validation schema (reusable)
 */
export const urlSchema = z.string().url().or(z.literal(''))

/**
 * Phone number validation (Brazilian format)
 */
export const phoneSchema = z
  .string()
  .regex(/^(\+55\s?)?(\d{2}\s?)?\d{4,5}[-\s]?\d{4}$/, 'Invalid phone number format')
  .or(z.literal(''))

// ============================================
// PROJECT SCHEMAS
// ============================================

/**
 * Project category enum
 */
export const projectCategorySchema = z.enum(['all', 'exteriors', 'interiors', 'animation'])

/**
 * Project size enum
 */
export const projectSizeSchema = z.enum(['default', 'wide', 'tall'])

/**
 * Project specification schema
 */
export const projectSpecsSchema = z.object({
  year: z.string().optional(),
  location: z.string().optional(),
  client: z.string().optional(),
  status: z.string().optional(),
})

/**
 * Project phase schema
 */
export const projectPhaseSchema = z.object({
  label: z.string(),
  title: z.string(),
  description: z.string(),
  badge: z.string().optional(),
  image: z.string().optional(),
  images: z.array(z.string()).optional(),
  video: z.string().optional(),
  videoImage: z.string().optional(),
  stats: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      }),
    )
    .optional(),
})

// ============================================
// API SCHEMAS
// ============================================

/**
 * Contact form submission schema (for API validation)
 * Note: This is a stricter version without i18n for server-side validation
 */
export const contactApiSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  projectType: z.string().min(1),
  details: z.string().trim().min(1).max(2000),
  website: z.string().optional(), // Honeypot field
  formLoadedAt: z.number().optional(), // Anti-bot timing
})

export type ContactApiInput = z.infer<typeof contactApiSchema>

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Create a schema with custom error messages
 * Useful for creating i18n-aware schemas inside components
 */
export function createContactSchema(t: (key: string) => string) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, t('contactPage.form.errors.nameRequired'))
      .max(100, t('contactPage.form.errors.nameMax')),
    email: z
      .string()
      .trim()
      .email(t('contactPage.form.errors.invalidEmail'))
      .max(255, t('contactPage.form.errors.emailMax')),
    projectType: z.string().min(1, t('contactPage.form.errors.selectProjectType')),
    details: z
      .string()
      .trim()
      .min(1, t('contactPage.form.errors.detailsRequired'))
      .max(2000, t('contactPage.form.errors.detailsMax')),
  })
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>
