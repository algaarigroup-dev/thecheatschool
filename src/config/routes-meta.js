import { FRENCH_FAQ } from "../content/french-faq.js";

// Per route SEO metadata. Used by pages at runtime and by
// scripts/prerender-meta.mjs at build time to write static HTML per route.
export const ROUTES_META = {
  "/": {
    title: "The Cheat School | Live Bootcamps for Engineers and NCLC 7 French",
    description:
      "Live online programs with real deliverables: the Civil Cheatcamp, a 90 day civil engineering bootcamp, and the NCLC 7 Fast Track, French for Express Entry candidates.",
  },
  "/civil-engineering": {
    title: "Civil Cheatcamp | 90 Day Civil Engineering Bootcamp | The Cheat School",
    description:
      "Go from beginner to job ready civil engineer in 90 days: AutoCAD, Revit, BIM, quantity surveying, project management, AI in construction, and internship documentation.",
  },
  "/ai-engineering": {
    title: "AI Engineering Bootcamp (Coming Soon) | The Cheat School",
    description:
      "Our AI Engineering bootcamp is launching soon. Get notified when admissions open.",
    noindex: true,
  },
  "/french-nclc-7": {
    title: "NCLC 7 in 7 Months | French for Express Entry | The Cheat School",
    description:
      "The NCLC 7 Fast Track: a live online French program that prepares Express Entry candidates for NCLC 7 on the TCF Canada, on a 7 month plan. Join from the UAE, India or anywhere.",
    keywords: ["NCLC 7 French course", "TCF Canada preparation", "French for Express Entry", "NCLC 7 online", "TCF Canada Dubai", "French classes UAE Express Entry"],
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Course",
          "@id": "https://thecheatschool.in/french-nclc-7#course",
          name: "NCLC 7 Fast Track",
          description:
            "Live, instructor led online French program that prepares Express Entry candidates to reach NCLC 7 in all four TCF Canada skills: listening, reading, speaking and writing.",
          url: "https://thecheatschool.in/french-nclc-7",
          inLanguage: "fr",
          educationalLevel: "NCLC 7 (TCF Canada)",
          teaches: ["French listening", "French reading", "French speaking", "French writing", "TCF Canada exam strategy"],
          timeRequired: "P7M",
          provider: {
            "@type": "EducationalOrganization",
            name: "The Cheat School",
            url: "https://thecheatschool.in",
          },
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "Online",
            courseWorkload: "Live instructor led classes on a fixed weekly schedule",
          },
        },
        {
          "@type": "FAQPage",
          mainEntity: FRENCH_FAQ.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        },
      ],
    },
  },
  "/blogs": {
    title: "Cheat Sheets for Engineering Students & French Learners | The Cheat School",
    description:
      "Free cheat sheets: AutoCAD and Revit shortcuts, BOQ formulas, CPM scheduling, interview questions, resume and LinkedIn checklists, TCF Canada and Express Entry French points.",
  },
  "/events": {
    title: "Events & Webinars | The Cheat School",
    description: "Industry webinars and live events for engineering students.",
  },
  "/contact-us": {
    title: "Contact & Register | The Cheat School",
    description:
      "Register for the Civil Cheatcamp or the NCLC 7 Fast Track French program, or reach The Cheat School team in Hyderabad by phone, WhatsApp or email.",
  },
  "/terms": {
    title: "Terms of Service | The Cheat School",
    description: "Terms governing enrolment in The Cheat School programs.",
    legal: true,
  },
  "/privacy": {
    title: "Privacy Policy | The Cheat School",
    description: "How The Cheat School collects and uses your personal information.",
    legal: true,
  },
  "/refund-policy": {
    title: "Refund Policy | The Cheat School",
    description: "The Cheat School refund policy: program fees are non refundable once the enrolment agreement is signed.",
    legal: true,
  },
};
