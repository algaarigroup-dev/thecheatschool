import {
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  RectangleGogglesIcon,
  Quote,
  MessageCircle } from
"lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
import { CONTACT, whatsappLink, LEGAL_READY } from "@/config/site";

const Footer = () => {
  return (
    <footer className="w-full bottom-0 pb-30 bg-black text-white px-6 py-10 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
        <div>
          <h1 className="text-3xl font-primary font-bold text-primary mb-3">
            THE CHEAT SCHOOL
          </h1>
          <p className="text-gray-300 font-teritiary text-[15px] leading-relaxed">
            Empowering students with the right resources and a community that
            grows together. Learn smarter, collaborate better, and achieve more
            with The Cheat School.
          </p>

          <div className="flex gap-4 mt-4">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white hover:text-primary transition-colors">
              
              <Instagram size={24} />
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white hover:text-primary transition-colors">
              
              <Linkedin size={24} />
            </a>
            <a
              href={whatsappLink("Hi The Cheat School, I have a question about the bootcamp.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              className="text-white hover:text-primary transition-colors">
              
              <MessageCircle size={24} />
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-primary text-primary text-2xl mb-3">
            Quick Links
          </h2>
          <ul className="space-y-2 font-primary">
            {[
            { name: "Home", path: "/" },
            { name: "Civil Cheatcamp", path: "/civil-engineering" },
            { name: "French (NCLC 7)", path: "/french-nclc-7" },
            { name: "Blogs", path: "/blogs" },
            { name: "Events", path: "/events" },
            { name: "Contact Us", path: "/contact-us" },
            ...(LEGAL_READY ? [
              { name: "Terms of Service", path: "/terms" },
              { name: "Privacy Policy", path: "/privacy" },
              { name: "Refund Policy", path: "/refund-policy" }] :
            [])].
            map((link) =>
            <li key={link.name}>
                <NavLink
                to={link.path}
                className="hover:text-primary transition duration-300">
                
                  {link.name}
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h2 className="font-primary text-primary text-2xl mb-3">
            Contact Us
          </h2>

          <div className="flex items-center gap-2 mb-2">
            <Phone className="text-primary w-5 h-5" />
            <a href={`tel:+${CONTACT.phoneE164}`} className="text-gray-300 text-[15px] font-teritiary hover:text-primary">
              {CONTACT.phoneDisplay}
            </a>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Mail className="text-primary w-5 h-5" />
            <a href={`mailto:${CONTACT.email}`} className="text-gray-300 text-[15px] font-teritiary hover:text-primary">
              {CONTACT.email}
            </a>
          </div>

          <p className="text-gray-400 text-sm font-teritiary">
            © {new Date().getFullYear()} The Cheat School. All rights reserved.
          </p>
        </div>
      </div>
    </footer>);

};

export default Footer;