// Single source of truth for contact details, links and legal info.
// Edit values here; every page reads from this file.

export const SITE = {
  name: "The Cheat School",
  url: "https://thecheatschool.in",
  defaultTitle: "The Cheat School | Real Projects, Not Lectures",
  defaultDescription:
    "Not another online course. Live classes, a real project deliverable every month, a public track record, daily accountability and 1:1 communication coaching for engineering students.",
  ogImage: "/the-cheat-school.png",
};

export const CONTACT = {
  phoneDisplay: "+91 99895 20942",
  phoneE164: "919989520942", // used for WhatsApp links (country code, no plus)
  email: "team@thecheatschool.com",
  whatsappCommunity: "https://chat.whatsapp.com/G3T2EfQN9pAJ3yGwsRBXcD",
  instagram: "https://www.instagram.com/thecheatschool/",
  linkedin: "https://www.linkedin.com/company/the-cheat-school/",
};

export const whatsappLink = (message = "") =>
  `https://wa.me/${CONTACT.phoneE164}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

// Public registration form (plain viewform link, no edit or responses view).
export const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/1scvsMHo5aHqM4sqUaatsb0cxmCEqV179kPoi2OvpkW8/viewform";

// Next batch start date shown on the course page, e.g. "5 January 2027".
// Leave empty to show "Admissions open".
export const NEXT_BATCH_DATE = "";

// Legal details. The Terms, Privacy and Refund pages and their footer links
// stay hidden until legalName, address and refundWindowDays are filled in.
export const LEGAL = {
  legalName: "", // e.g. "The Cheat School Private Limited"
  address: "", // registered address in India
  jurisdictionCity: "", // e.g. "Hyderabad"
  refundWindowDays: null, // e.g. 7  (full refund if requested within N days of batch start)
  lastUpdated: "22 October 2026",
};

export const LEGAL_READY = Boolean(
  LEGAL.legalName && LEGAL.address && LEGAL.refundWindowDays !== null
);
