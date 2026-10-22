import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast, { Toaster } from 'react-hot-toast';
import { Mail, Phone, ExternalLink } from 'lucide-react';
import { GOOGLE_FORM_URL, CONTACT } from '@/config/site';
import { contactSchema, useSubmitContact } from '../services/useContactMutations';
import Loader from '../components/global/Loader';

const ContactUsPage = () => {
  const { mutate, isPending: isSubmitting } = useSubmitContact();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      college: '',
      yearOfStudy: '',
      branch: '',
      hearAboutUs: '',
      hearAboutUsOther: ''
    }
  });

  const hearAboutUsValue = watch('hearAboutUs');

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        const msg = res?.channel === 'whatsapp'
          ? 'WhatsApp opened with your details. Press send there to complete your registration.'
          : "Registration received! We'll get back to you soon.";
        toast.success(msg, {
          duration: 5000,
          style: {
            background: '#10B981',
            color: '#fff',
            fontWeight: '600'
          }
        });
        reset();
      },
      onError: (error) => {
        if (error?.message?.toLowerCase?.().includes('timeout')) {
          toast.error('Request timeout. Please try again or contact us directly.', { duration: 6000 });
        } else {
          toast.error(error?.message || 'Failed to send message. Please try again.', { duration: 5000 });
        }
        console.error('Contact form error:', error);
      }
    });
  };

  return (
    <>
      <Toaster position="top-center" />
      
      <div className="max-w-6xl mx-auto p-6 mt-24 grid grid-cols-1 md:grid-cols-2 gap-[90px]">
        
        {}
        <div>
          {}
          <div className="mb-8">
            <a
              href={`${GOOGLE_FORM_URL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-white border-2 border-black shadow-md hover:shadow-xl transition-all duration-300 rounded-sm p-4 group">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-primary text-secondary mb-1">
                    Register via Google Forms
                  </h3>
                  <p className="text-sm font-secondary text-gray-600">
                    Quick registration (opens in new tab)
                  </p>
                </div>
                <ExternalLink className="text-primary group-hover:translate-x-1 transition-transform" size={24} />
              </div>
            </a>
          </div>

          {}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-muted-foreground font-secondary font-semibold">OR</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          {}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white/30 backdrop-blur-lg p-6 shadow-md rounded-sm border border-black">
            
            <h2 className="text-center text-primary text-3xl font-primary mb-6">
              REGISTER HERE
            </h2>

            {}
            <div className="mb-5">
              <input
                type="text"
                placeholder="Full Name *"
                {...register('fullName')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              
              {errors.fullName &&
              <p className="text-red-500 text-sm mt-1 font-secondary">{errors.fullName.message}</p>
              }
            </div>

            {}
            <div className="mb-5">
              <input
                type="email"
                placeholder="Email ID *"
                {...register('email')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              
              {errors.email &&
              <p className="text-red-500 text-sm mt-1 font-secondary">{errors.email.message}</p>
              }
            </div>

            {}
            <div className="mb-5">
              <input
                type="tel"
                placeholder="Phone Number (WhatsApp Preferred) *"
                {...register('phoneNumber')}
                maxLength={20}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              
              {errors.phoneNumber &&
              <p className="text-red-500 text-sm mt-1 font-secondary">{errors.phoneNumber.message}</p>
              }
            </div>

            {}
            <div className="mb-5">
              <input
                type="text"
                placeholder="College/University *"
                {...register('college')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              
              {errors.college &&
              <p className="text-red-500 text-sm mt-1 font-secondary">{errors.college.message}</p>
              }
            </div>

            {}
            <div className="mb-5">
              <select
                {...register('yearOfStudy')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-black bg-white/30">
                
                <option value="">Year Of Study *</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
              {errors.yearOfStudy &&
              <p className="text-red-500 text-sm mt-1 font-secondary">{errors.yearOfStudy.message}</p>
              }
            </div>

            {}
            <div className="mb-5">
              <select
                {...register('branch')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-black dark:text-white dark:bg-black bg-white">
                
                <option value="">Branch *</option>
                <option value="Civil">Civil</option>
                <option value="Mechanical">Mechanical</option>
                <option value="EEE">EEE</option>
                <option value="ECE">ECE</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="AI ML/DS">AI ML/DS</option>
              </select>
              {errors.branch &&
              <p className="text-red-500 text-sm mt-1 font-secondary">{errors.branch.message}</p>
              }
            </div>

            {}
            <div className="mb-5">
              <select
                {...register('hearAboutUs')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary  text-black dark:text-white dark:bg-black bg-white">
                
                <option value="">How did you hear about us? *</option>
                <option value="WhatsApp Group">WhatsApp Group</option>
                <option value="College">College</option>
                <option value="Social Media">Social Media</option>
                <option value="Friend / Referral">Friend / Referral</option>
                <option value="Other">Other</option>
              </select>
              {errors.hearAboutUs &&
              <p className="text-red-500 text-sm mt-1 font-secondary">{errors.hearAboutUs.message}</p>
              }
            </div>

            {}
            {hearAboutUsValue === 'Other' &&
            <div className="mb-5">
                <input
                type="text"
                placeholder="Please specify..."
                {...register('hearAboutUsOther')}
                className="w-full px-4 py-2 border border-gray-300 dark:bg-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              
              </div>
            }

            {}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white border font-primary border-black px-5 py-3 rounded-xl hover:-translate-y-1 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2">
              
              {isSubmitting ?
              <>
                  <div className="w-5">
                    <Loader />
                  </div>
                  Sending...
                </> :

              'Submit'
              }
            </button>
          </form>
        </div>

        {}
        <div className="flex flex-col gap-6">
          
          {}
          <div className="bg-white/30 backdrop-blur-lg p-6 rounded-sm border border-black shadow-md">
            <h3 className="font-primary text-primary text-2xl flex items-center gap-2 mb-3">
              <Phone size={24} /> Phone
            </h3>
            <p className="text-lg font-teritiary mb-6">
              <a href={`tel:+${CONTACT.phoneE164}`} className="hover:text-primary">{CONTACT.phoneDisplay}</a>
            </p>
            
            <h3 className="font-primary text-primary text-2xl flex items-center gap-2 mb-3">
              <Mail size={24} /> Email
            </h3>
            <p className="text-lg font-teritiary">
              <a href={`mailto:${CONTACT.email}`} className="hover:text-primary">{CONTACT.email}</a>
            </p>
          </div>
        </div>
      </div>
    </>);

};

export default ContactUsPage;