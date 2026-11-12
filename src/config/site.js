// Single source of truth for contact details, links and legal info.
// Edit values here; every page reads from this file.

export const SITE = {
  name: "The Cheat School",
  url: "https://thecheatschool.in",
  defaultTitle: "The Cheat School | Live Bootcamps for Engineers and NCLC 7 French",
  defaultDescription:
    "Live online programs with real deliverables: the Civil Cheatcamp, a 90 day civil engineering bootcamp, and the NCLC 7 Fast Track, French for Express Entry candidates.",
  ogImage: "/og-image.png",
};

export const CONTACT = {
  phoneDisplay: "+91 99895 20942",
  phoneE164: "919989520942", // used for WhatsApp links (country code, no plus)
  email: "help@thecheatschool.in",
  whatsappCommunity: "https://chat.whatsapp.com/G3T2EfQN9pAJ3yGwsRBXcD",
  instagram: "https://www.instagram.com/thecheatschool/",
  linkedin: "https://www.linkedin.com/company/the-cheat-school/",
};

export const whatsappLink = (message = "") =>
  `https://wa.me/${CONTACT.phoneE164}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

// Public registration form (plain viewform link, no edit or responses view).
export const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/1scvsMHo5aHqM4sqUaatsb0cxmCEqV179kPoi2OvpkW8/viewform";

// French NCLC 7 program. Edit contact and batch info here.
export const FRENCH = {
  programName: "NCLC 7 Fast Track",
  // WhatsApp number for French enquiries (country code, no plus).
  // Defaults to the main number; set your own if UAE clients should reach you directly.
  whatsappE164: "919989520942",
  nextBatch: "", // e.g. "1 December 2026"; empty shows "Enrolling now"
  factsCheckedOn: "October 2026",
};

// Next batch start date shown on the course page, e.g. "5 January 2027".
// Leave empty to show "Admissions open".
export const NEXT_BATCH_DATE = "";

// Legal details. Terms and Privacy pages stay hidden until legalName and
// address are filled in. The Refund page shows as soon as refundPolicy is set.
export const LEGAL = {
  legalName: "Emiratiyo Estates Private Limited",
  address: "Rd Number 3, Sri Nagar Colony, Venkateshwara Hills, Banjara Hills, Hyderabad, Telangana 500073, India",
  jurisdictionCity: "Hyderabad",
  // Refund rule. "none" = no refunds once the enrolment agreement is signed.
  refundPolicy: "none",
  lastUpdated: "12 November 2026",
};

export const LEGAL_READY = Boolean(LEGAL.legalName && LEGAL.address);
export const REFUND_READY = Boolean(LEGAL.refundPolicy);

// Which legal pages are live.
export const legalPageReady = (doc) =>
  doc === "refund-policy" ? REFUND_READY : LEGAL_READY;
