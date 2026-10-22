import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL, HAS_BACKEND } from './api';
import { whatsappLink } from '@/config/site';
import { phoneSchema } from './useContactMutations';
import { z } from 'zod';

export const notifyMeSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: phoneSchema
});

export const submitNotifyMe = async (payload) => {
  if (!HAS_BACKEND) {
    const msg = [
      'Hi The Cheat School, please notify me when the AI Engineering bootcamp launches.',
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phoneNumber}`
    ].join('\n');
    window.open(whatsappLink(msg), '_blank', 'noopener');
    return { channel: 'whatsapp' };
  }
  try {
    const response = await axios.post(`${API_BASE_URL}/api/notify-me`, payload, {
      timeout: 60000
    });
    return { channel: 'backend', ...response.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to submit';
    throw new Error(errorMessage);
  }
};

export const useSubmitNotifyMe = () => {
  return useMutation({
    mutationFn: submitNotifyMe,
    retry: HAS_BACKEND ? 1 : 0
  });
};
