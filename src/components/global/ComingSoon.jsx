import { motion } from "framer-motion";
import { Mail, Zap, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Loader from "./Loader";
import { notifyMeSchema, useSubmitNotifyMe } from "../../services/useNotifyMeMutations";

export default function ComingSoon() {
  const { mutate, isPending: isSubmitting } = useSubmitNotifyMe();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(notifyMeSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: ""
    }
  });

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        setSubmitted(true);
        const msg = res?.channel === "whatsapp"
          ? "WhatsApp opened with your details. Press send there and we'll notify you at launch."
          : "Thanks! We'll notify you when new courses launch.";
        toast.success(msg, {
          duration: 5000,
          style: {
            background: "#10B981",
            color: "#fff",
            fontWeight: "600"
          }
        });
        reset();
        setTimeout(() => setSubmitted(false), 3000);
      },
      onError: (error) => {
        if (error?.message?.toLowerCase?.().includes("timeout")) {
          toast.error("Request timeout. Please try again.", { duration: 6000 });
        } else {
          toast.error(error?.message || "Failed to submit. Please try again.", {
            duration: 5000
          });
        }
        console.error("Notify-me error:", error);
      }
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -30, 0],
      transition: {
        duration: 5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut"
      }
    }
  };

  const rotatingVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear"
      }
    }
  };

  const counterRotatingVariants = {
    animate: {
      rotate: -360,
      transition: {
        duration: 25,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear"
      }
    }
  };

  return (
    <div className="min-h-screen mt-20 w-full overflow-hidden bg-background text-foreground relative">
      <Toaster position="top-right" />
      <div className="fixed inset-0 pointer-events-none z-0">
        {}
        <motion.div
          className="absolute top-20 left-10 w-48 h-48 rounded-full border-2 border-primary/20"
          variants={floatingVariants}
          animate="animate" />
        

        {}
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full border border-primary/10"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 0.3 }} />
        

        {}
        <motion.div
          className="absolute top-1/4 right-1/3 w-32 h-32 rounded-lg border-2 border-primary/15"
          variants={rotatingVariants}
          animate="animate" />
        

        {}
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-40 h-40 rounded-full border-2 border-primary/20"
          variants={counterRotatingVariants}
          animate="animate" />
        

        {}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut"
          }} />
        
      </div>

      {}
      <motion.div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible">
        
        {}

        {}
        <motion.div
          variants={itemVariants}
          className="max-w-4xl mb-6 text-center">
          
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-primary font-bold leading-tight text-balance">
            <span
              style={{
                backgroundImage:
                "linear-gradient(135deg, #e83f25 0%, #ff6b4a 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
              
              Coming Soon
            </span>
          </h1>
        </motion.div>

        {}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-2 mb-12">
          
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
          <p className="text-center text-base md:text-lg text-muted-foreground max-w-2xl font-secondary">
            Join thousands waiting for the next game-changing experience
          </p>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
        </motion.div>

        {}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md mb-16">
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300" />
            <div className="relative flex flex-col gap-3 bg-background p-1 rounded-lg">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-4 bg-light-grey dark:bg-dark-grey text-foreground placeholder:text-muted-foreground rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 font-secondary"
                  {...register("name")}
                  disabled={isSubmitting}
                  required />
                
                {errors?.name &&
                <p className="mt-1 text-xs text-red-500 font-secondary">{errors.name.message}</p>
                }
              </div>

              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary pointer-events-none" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-4 bg-light-grey dark:bg-dark-grey text-foreground placeholder:text-muted-foreground rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 font-secondary"
                  {...register("email")}
                  disabled={isSubmitting}
                  required />
                
                {errors?.email &&
                <p className="mt-1 text-xs text-red-500 font-secondary">{errors.email.message}</p>
                }
              </div>

              <div className="flex-1 relative">
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="Phone Number (10 digits)"
                  className="w-full px-4 py-4 bg-light-grey dark:bg-dark-grey text-foreground placeholder:text-muted-foreground rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 font-secondary"
                  {...register("phoneNumber")}
                  disabled={isSubmitting}
                  required />
                
                {errors?.phoneNumber &&
                <p className="mt-1 text-xs text-red-500 font-secondary">{errors.phoneNumber.message}</p>
                }
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="px-8 py-4 bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-primary-foreground font-bold rounded-md transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap font-secondary shadow-lg hover:shadow-xl">
                
                {isSubmitting ?
                <Loader /> :
                submitted ?
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}>
                  
                    Subscribed!
                  </motion.span> :

                <>
                    Notify Me
                    <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY
                    }}>
                    
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </>
                }
              </motion.button>
            </div>
          </div>
        </motion.form>

        {}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          
          {[
          {
            icon: Zap,
            title: "Revolutionary",
            description: "Built on cutting-edge technology"
          },
          {
            icon: Sparkles,
            title: "Next-Gen",
            description: "The future starts here"
          },
          {
            icon: Mail,
            title: "Exclusive",
            description: "Early access for subscribers"
          }].
          map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                whileHover={{
                  y: -12,
                  boxShadow: "0 20px 40px rgba(232, 63, 37, 0.1)"
                }}
                className="p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 cursor-default">
                
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  className="mb-4 w-fit">
                  
                  <Icon className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="text-lg font-bold font-secondary mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground font-secondary">
                  {feature.description}
                </p>
              </motion.div>);

          })}
        </motion.div>

        {}
        <motion.p
          variants={itemVariants}
          className="mt-16 text-center text-xs md:text-sm text-muted-foreground font-secondary uppercase tracking-wider">
          
          No spam. Unsubscribe anytime.
        </motion.p>
      </motion.div>

      {}
      <motion.div
        className="fixed top-8 right-8 w-24 h-24 rounded-full border-2 border-primary/20 pointer-events-none z-0"
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear"
        }} />
      

      <motion.div
        className="fixed bottom-8 left-8 w-20 h-20 rounded-lg border-2 border-primary/30 pointer-events-none z-0"
        animate={{ rotate: -360 }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear"
        }} />
      
    </div>);

}