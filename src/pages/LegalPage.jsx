import React from "react";
import { Link } from "react-router-dom";
import { LEGAL, LEGAL_READY, CONTACT, SITE } from "@/config/site";
import NotFound from "./not-found";

// Starter legal text. Have it reviewed by a lawyer before relying on it.
const docs = {
  terms: {
    title: "Terms of Service",
    sections: [
      ["Who we are", `${SITE.name} is operated by ${LEGAL.legalName}, ${LEGAL.address} ("we", "us"). These terms apply to anyone who registers for or attends one of our programs.`],
      ["Enrolment", "Your seat in a batch is confirmed once we receive full payment of the program fee and send you a written confirmation. Fees, batch dates and inclusions are those stated on the course page or in your enrolment confirmation at the time you pay."],
      ["Program delivery", "Programs are delivered live online on the published schedule. We may reschedule individual sessions for reasons beyond our control and will offer a replacement session or recording when we do."],
      ["Your responsibilities", "You agree to attend sessions, submit assignments honestly and treat mentors and other students with respect. Sharing paid course material outside the program is not permitted. We may remove a student for serious misconduct without refund."],
      ["Certificate", "A certificate of completion is issued only when all required assignments and deliverables are submitted by their deadlines. It certifies completion of our program and is not a university degree or government accreditation."],
      ["Internships and outcomes", "Internship documentation and project work are part of the program. We do not guarantee a job, placement, salary or specific result."],
      ["Refunds", "Refunds are governed by our Refund Policy."],
      ["Liability", "To the extent permitted by law, our total liability to you for any claim relating to a program is limited to the fee you paid for that program."],
      ["Governing law", `These terms are governed by the laws of India, and the courts of ${LEGAL.jurisdictionCity || "our registered city"} have jurisdiction.`],
      ["Contact", `Questions about these terms: ${CONTACT.email} or ${CONTACT.phoneDisplay}.`],
    ],
  },
  privacy: {
    title: "Privacy Policy",
    sections: [
      ["Who is responsible", `${LEGAL.legalName}, ${LEGAL.address}, is responsible for personal data collected through ${SITE.url}.`],
      ["What we collect", "When you register or contact us we collect your name, email address, phone number, college, year of study, branch and how you heard about us. When you take a program we also keep your attendance, submissions and certificate records."],
      ["Why we use it", "To respond to your enquiry, enrol you in a program, deliver classes, issue certificates, and tell you about upcoming batches and events. We do not sell your personal data."],
      ["Who we share it with", "Only with service providers we use to run the program (for example video, form, messaging and content hosting tools), and where required by law."],
      ["How long we keep it", "Enquiry data is kept for up to 2 years. Student records are kept for as long as needed to verify certificates."],
      ["Your rights", "You can ask us to access, correct or delete your personal data, or withdraw consent to marketing messages, by writing to us. We will respond within 30 days."],
      ["Contact", `${CONTACT.email}`],
    ],
  },
  "refund-policy": {
    title: "Refund Policy",
    sections: [
      ["Full refund window", `You can request a full refund within ${LEGAL.refundWindowDays} days of your batch start date by writing to ${CONTACT.email} from the email address you registered with.`],
      ["After the window", `After ${LEGAL.refundWindowDays} days from batch start, fees are not refundable. If you cannot continue for a genuine reason, we may offer a transfer to a later batch at our discretion.`],
      ["If we cancel", "If we cancel or postpone a batch and you do not want to move to the new dates, you will receive a full refund."],
      ["How refunds are paid", "Approved refunds are paid to the original payment method within 7 working days of approval. Bank or currency conversion charges, if any, are not refundable."],
      ["Contact", `${CONTACT.email} or ${CONTACT.phoneDisplay}`],
    ],
  },
};

const LegalPage = ({ doc }) => {
  const content = docs[doc];
  if (!LEGAL_READY || !content) return <NotFound />;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-36 pb-20">
      <h1 className="font-primary text-4xl md:text-5xl font-bold mb-2">{content.title}</h1>
      <p className="text-sm text-muted-foreground mb-10 font-secondary">Last updated {LEGAL.lastUpdated}</p>
      <div className="space-y-8">
        {content.sections.map(([heading, body]) => (
          <section key={heading}>
            <h2 className="font-primary text-2xl font-bold mb-2">{heading}</h2>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 font-secondary">{body}</p>
          </section>
        ))}
      </div>
      <p className="mt-12 text-sm font-secondary">
        <Link to="/" className="text-primary hover:underline">Back to home</Link>
      </p>
    </div>
  );
};

export default LegalPage;
