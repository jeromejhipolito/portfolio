import { z } from 'zod';

const stripHtml = (str: string) => str.replace(/<[^>]*>/g, '');

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters')
    .transform(stripHtml),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address'),
  subject: z.enum(
    ['Job Opportunity', 'Freelance Project', 'Collaboration', 'Other'],
    { error: 'Please select a subject' },
  ),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be under 2000 characters')
    .transform(stripHtml),
  website: z.string().optional(), // honeypot field
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type ContactSubject = ContactFormData['subject'];
