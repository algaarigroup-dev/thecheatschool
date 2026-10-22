import React from "react";
import { ArrowRight } from "lucide-react";
import { CONTACT } from "@/config/site";

const CTA = () => {
  return (
    <>
      <section className="py-12 md:py-24">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative">
          <div className="shadow-xl rounded-xl">
            <div className="grid overflow-hidden text-white shadow-2xl md:grid-cols-2 bg-[#e83f25] rounded-xl">
              <aside className="p-8 space-y-4 md:p-16">
                <h2 className="text-2xl font-bold tracking-tight md:text-4xl" style={{ fontFamily: 'Antonio, sans-serif' }}>
                  Want to See How It Works?
                </h2>

                <p className="font-medium text-white/90 md:text-xl" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Join our WhatsApp community. See what students are building, ask questions, and hear first when new programs open.
                </p>

                <div className="pt-2">
                  <a
                    href={CONTACT.whatsappCommunity}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-[#e83f25] px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif' }}>
                    
                    Join our Community
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </aside>

              <aside className="relative hidden md:block">
                <img
                  className="absolute inset-0 object-cover object-center w-full h-full mt-16 -mr-16 rounded-tl-xl"
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80"
                  alt="Students working on a real engineering project" />
                
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>);

};

export default CTA;