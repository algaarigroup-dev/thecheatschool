import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL, HAS_BACKEND } from './api';
import { whatsappLink } from '@/config/site';
import { z } from 'zod';

// Accepts Indian and international numbers: optional +, 7 to 15 digits,
// spaces and dashes ignored.
export const phoneSchema = z
  .string()
  .transform((v) => v.replace(/[\s-]/g, ''))
  .pipe(z.string().regex(/^\+?[0-9]{7,15}$/, 'Enter a valid phone number with country code if outside India'));

export const contactSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: phoneSchema,
  college: z.string().min(2, 'College/University is required'),
  yearOfStudy: z.string().min(1, 'Please select your year of study'),
  branch: z.string().min(1, 'Please select your branch'),
  hearAboutUs: z.string().min(1, 'Please tell us how you heard about us'),
  hearAboutUsOther: z.string().optional()
});

export const contactWhatsappMessage = (d) =>
  [
    'Hi The Cheat School, I would like to register.',
    `Name: ${d.fullName}`,
    `Email: ${d.email}`,
    `Phone: ${d.phoneNumber}`,
    `College: ${d.college}`,
    `Year: ${d.yearOfStudy}`,
    `Branch: ${d.branch}`,
    `Heard about you via: ${d.hearAboutUs}${d.hearAboutUs === 'Other' && d.hearAboutUsOther ? ` (${d.hearAboutUsOther})` : ''}`
  ].join('\n');

// When no backend is configured, the registration is handed to WhatsApp
// instead of being posted to a server that does not exist.
export const openContactOnWhatsapp = (payload) => {
  window.open(whatsappLink(contactWhatsappMessage(payload)), '_blank', 'noopener');
};

export const submitContact = async (payload) => {
  if (!HAS_BACKEND) {
    openContactOnWhatsapp(payload);
    return { channel: 'whatsapp' };
  }
  try {
    const response = await axios.post(`${API_BASE_URL}/api/contact`, payload, {
      timeout: 60000
    });
    return { channel: 'backend', ...response.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to send message';
    throw new Error(errorMessage);
  }
};

export const useSubmitContact = () => {
  return useMutation({
    mutationFn: submitContact,
    retry: HAS_BACKEND ? 1 : 0
  });
};
