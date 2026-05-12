/**
 * Legal copy — Privacy Policy & Terms and Conditions.
 *
 * Section bodies support three node types:
 *   - { type: 'p', text }          → paragraph
 *   - { type: 'ul', items }        → bullet list
 *   - { type: 'h', text }          → inline subheading
 */

export type LegalNode =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "ul"; items: ReadonlyArray<string> };

export type LegalSection = {
  id: string;
  title: string;
  body: ReadonlyArray<LegalNode>;
};

export type LegalCopy = {
  seo: { title: string; description: string };
  hero: { eyebrow: string; headline: string; subheadline: string };
  lastUpdated: string;
  intro: ReadonlyArray<LegalNode>;
  sections: ReadonlyArray<LegalSection>;
};

const sharedAddress = [
  "Ray Lab Group",
  "B2, Industry Street, Zone 5",
  "Central Business District",
  "Qormi CBD 5030, Malta",
  "Email: info@raylabgroup.com",
];

export const privacyCopy: LegalCopy = {
  seo: {
    title: "Privacy Policy — Ray Lab Group",
    description:
      "How Ray Lab Group collects, uses, shares, protects, and retains personal data through our website and online inquiries.",
  },
  hero: {
    eyebrow: "Legal",
    headline: "Privacy Policy",
    subheadline:
      "How Ray Lab Group collects, uses, shares, protects, and retains personal data when you use our website, contact us, submit an inquiry, or interact with our online content.",
  },
  lastUpdated: "May 11, 2026",
  intro: [
    {
      type: "p",
      text: 'This Privacy Policy explains how Ray Lab Group collects, uses, shares, protects, and retains personal data when you use our website, contact us, submit an inquiry, or interact with our online content (the "Website").',
    },
    {
      type: "p",
      text: 'Ray Lab Group is a Malta-headquartered diagnostic healthcare group with affiliated diagnostic, clinical, laboratory, and teleradiology platforms operating across Egypt, Saudi Arabia, and Jordan, including Cairo Scan, TechnoScan, CRC, MedRay, Cairo Scan Polyclinics, TechnoScan Polyclinics, Specialized Clinics, and Ray Medical (together, "Ray Lab Group", "we", "us", or "our").',
    },
    {
      type: "p",
      text: "This Privacy Policy applies to Website use and general online inquiries. It does not replace patient consent forms, branch-specific notices, medical record notices, clinical service agreements, referral agreements, employment privacy notices, investor confidentiality agreements, or other specific notices that may apply in particular circumstances.",
    },
  ],
  sections: [
    {
      id: "responsible",
      title: "1. Who Is Responsible for Your Personal Data",
      body: [
        { type: "p", text: "For Website-related personal data, the responsible organization is:" },
        { type: "ul", items: sharedAddress },
        {
          type: "p",
          text: "If your inquiry relates to a specific Ray Lab Group platform, branch, country, clinical service, patient referral, investor matter, or partnership, your personal data may also be handled by the relevant affiliated entity or regional team.",
        },
      ],
    },
    {
      id: "data-we-collect",
      title: "2. Personal Data We Collect",
      body: [
        {
          type: "p",
          text: "We may collect the following categories of personal data through the Website:",
        },
        { type: "h", text: "Information you provide" },
        {
          type: "ul",
          items: [
            "first name and last name;",
            "email address;",
            "organization, company, hospital, clinic, or professional affiliation;",
            "inquiry type, such as investor relations, physician inquiry, media inquiry, partnership, or general contact;",
            "message content submitted through forms or email;",
            "information you choose to include in correspondence with us; and",
            "any additional information needed to respond to your request.",
          ],
        },
        { type: "h", text: "Professional and business information" },
        {
          type: "p",
          text: "If you contact us as a physician, healthcare provider, investor, partner, supplier, journalist, or institutional stakeholder, we may process information about your role, organization, country, area of interest, and relationship with Ray Lab Group.",
        },
        { type: "h", text: "Health or referral-related information" },
        {
          type: "p",
          text: "The Website is not intended for the submission of detailed medical information through general contact forms. However, if you choose to include patient, clinical, referral, diagnostic, or health-related information in an inquiry, we may process that information to review, route, and respond to the inquiry.",
        },
        {
          type: "p",
          text: "Health information is sensitive. Please submit it only through approved and secure channels provided by the relevant Ray Lab Group platform, branch, or authorized representative.",
        },
        { type: "h", text: "Technical and usage data" },
        {
          type: "p",
          text: "When you visit the Website, we or our service providers may collect technical information, such as:",
        },
        {
          type: "ul",
          items: [
            "IP address;",
            "browser type and version;",
            "device type;",
            "operating system;",
            "pages visited;",
            "referral URL;",
            "approximate location derived from technical data;",
            "date and time of visits;",
            "interaction and performance data; and",
            "security logs.",
          ],
        },
        { type: "h", text: "Third-party or public information" },
        {
          type: "p",
          text: "Where appropriate, we may receive information from business contacts, professional networks, referral partners, event participants, investors, media representatives, healthcare providers, or publicly available sources in order to respond to inquiries and manage professional relationships.",
        },
      ],
    },
    {
      id: "how-we-use",
      title: "3. How We Use Personal Data",
      body: [
        { type: "p", text: "We may use personal data for the following purposes:" },
        {
          type: "ul",
          items: [
            "to operate, maintain, secure, and improve the Website;",
            "to respond to contact form submissions, emails, and inquiries;",
            "to route messages to the appropriate Ray Lab Group platform, regional team, branch, or department;",
            "to manage investor relations, partnership discussions, media inquiries, and physician inquiries;",
            "to support referral coordination and service-related communications where requested;",
            "to provide information about Ray Lab Group, its platforms, services, network, and operations;",
            "to manage professional, institutional, supplier, and stakeholder relationships;",
            "to protect the security, integrity, and availability of our Website and systems;",
            "to comply with legal, regulatory, healthcare, tax, accounting, corporate governance, and reporting obligations;",
            "to establish, exercise, or defend legal claims; and",
            "where permitted, to send relevant updates or communications that you have requested or that relate to an existing professional relationship.",
          ],
        },
        {
          type: "p",
          text: "We do not use the Website to make automated clinical decisions about patients.",
        },
      ],
    },
    {
      id: "legal-bases",
      title: "4. Legal Bases for Processing",
      body: [
        {
          type: "p",
          text: "Where the EU General Data Protection Regulation (GDPR) or similar laws apply, we rely on one or more of the following legal bases:",
        },
        {
          type: "ul",
          items: [
            "consent, where you have given consent for a specific purpose;",
            "performance of a contract or steps taken before entering into a contract;",
            "compliance with legal obligations;",
            "legitimate interests, such as responding to inquiries, maintaining business relationships, protecting systems, improving the Website, and managing corporate communications;",
            "protection of vital interests, where necessary in exceptional health or safety situations; and",
            "healthcare-related bases or other lawful bases permitted by applicable law when sensitive health information is processed by authorized healthcare professionals or relevant entities.",
          ],
        },
        {
          type: "p",
          text: "When we process sensitive personal data, such as health information, we do so only where we have a lawful basis and an applicable condition under relevant data protection, healthcare, professional secrecy, or medical confidentiality laws.",
        },
      ],
    },
    {
      id: "sharing",
      title: "5. Sharing Personal Data",
      body: [
        { type: "p", text: "We may share personal data with:" },
        {
          type: "ul",
          items: [
            "Ray Lab Group affiliated companies, platforms, branches, and regional teams;",
            "authorized healthcare professionals, operational teams, and administrative staff where needed to respond to a referral or service inquiry;",
            "investor relations, legal, finance, compliance, governance, and corporate teams;",
            "IT, website hosting, email, cloud, security, analytics, and communications service providers;",
            "professional advisers, auditors, insurers, banks, and consultants;",
            "regulators, courts, authorities, law enforcement, or government bodies where required by law;",
            "counterparties and advisers in connection with investments, financing, acquisitions, restructuring, or corporate transactions; and",
            "other third parties where you ask us to share information or where sharing is legally permitted.",
          ],
        },
        {
          type: "p",
          text: "We require service providers to protect personal data and use it only for authorized purposes.",
        },
      ],
    },
    {
      id: "international",
      title: "6. International Transfers",
      body: [
        {
          type: "p",
          text: "Ray Lab Group operates across multiple jurisdictions, including Malta, Egypt, Saudi Arabia, and Jordan. Your personal data may be accessed, processed, or stored in countries other than the country where you are located.",
        },
        {
          type: "p",
          text: "Where personal data is transferred internationally, we take steps designed to protect it in accordance with applicable law. These steps may include contractual safeguards, access controls, data minimization, internal policies, and other appropriate measures.",
        },
      ],
    },
    {
      id: "cookies",
      title: "7. Cookies and Similar Technologies",
      body: [
        {
          type: "p",
          text: "The Website may use cookies, pixels, logs, or similar technologies for essential operation, security, performance, analytics, and user experience purposes.",
        },
        { type: "p", text: "Cookies may help us:" },
        {
          type: "ul",
          items: [
            "keep the Website functioning correctly;",
            "understand how visitors use the Website;",
            "measure performance and improve content;",
            "protect the Website from misuse; and",
            "remember certain technical preferences.",
          ],
        },
        {
          type: "p",
          text: "You can control cookies through your browser settings. If you block some cookies, parts of the Website may not function as intended.",
        },
      ],
    },
    {
      id: "third-party",
      title: "8. Third-Party Websites and Platforms",
      body: [
        {
          type: "p",
          text: "The Website may link to or embed third-party services, such as maps, social media platforms, video platforms, image hosting, or external partner pages. These third parties may collect personal data according to their own privacy policies.",
        },
        {
          type: "p",
          text: "Ray Lab Group is not responsible for the privacy practices of third-party websites or platforms. Please review their privacy notices before using them.",
        },
      ],
    },
    {
      id: "retention",
      title: "9. How Long We Keep Personal Data",
      body: [
        {
          type: "p",
          text: "We retain personal data only for as long as reasonably necessary for the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law.",
        },
        { type: "p", text: "Retention periods may depend on:" },
        {
          type: "ul",
          items: [
            "the type of inquiry;",
            "whether the inquiry relates to a patient, physician, investor, partner, supplier, media request, or legal matter;",
            "applicable healthcare, medical record, corporate, tax, accounting, regulatory, or limitation period requirements;",
            "the need to resolve disputes or enforce rights; and",
            "whether you have asked us to delete information where deletion is legally available.",
          ],
        },
      ],
    },
    {
      id: "security",
      title: "10. Security",
      body: [
        {
          type: "p",
          text: "We use technical and organizational measures designed to protect personal data against unauthorized access, disclosure, alteration, loss, misuse, or destruction.",
        },
        {
          type: "p",
          text: "These measures may include access controls, secure communications, system monitoring, staff confidentiality duties, vendor controls, and internal policies.",
        },
        {
          type: "p",
          text: "No website, email, or internet transmission is completely secure. Please avoid sending sensitive health information, diagnostic images, identification documents, or confidential material through general contact forms unless you have been directed to an approved secure channel.",
        },
      ],
    },
    {
      id: "rights",
      title: "11. Your Rights",
      body: [
        {
          type: "p",
          text: "Depending on where you are located and which laws apply, you may have rights to:",
        },
        {
          type: "ul",
          items: [
            "request access to your personal data;",
            "request correction of inaccurate or incomplete data;",
            "request deletion of personal data;",
            "request restriction of processing;",
            "object to certain processing;",
            "withdraw consent where processing is based on consent;",
            "request data portability;",
            "object to direct marketing;",
            "request information about international transfers; and",
            "lodge a complaint with a data protection authority.",
          ],
        },
        {
          type: "p",
          text: "These rights may be limited in some cases, including where we must retain information for legal, healthcare, medical confidentiality, regulatory, contractual, or legitimate business reasons.",
        },
        {
          type: "p",
          text: "To exercise your rights, contact us at info@raylabgroup.com. We may need to verify your identity before responding.",
        },
        {
          type: "p",
          text: "If the GDPR applies to your personal data, you may also have the right to lodge a complaint with the Malta Information and Data Protection Commissioner or another competent supervisory authority.",
        },
      ],
    },
    {
      id: "children",
      title: "12. Children's Privacy",
      body: [
        {
          type: "p",
          text: "The Website is intended for adults, healthcare professionals, investors, partners, media representatives, and general business contacts. It is not directed to children.",
        },
        {
          type: "p",
          text: "If a child or minor's personal data is submitted in connection with a patient inquiry or clinical matter, it should be provided only by a parent, guardian, physician, or other authorized person through the appropriate secure and approved channel.",
        },
      ],
    },
    {
      id: "marketing",
      title: "13. Marketing Communications",
      body: [
        {
          type: "p",
          text: "We may send updates, announcements, or professional communications where permitted by law and relevant to your relationship with us. You may opt out of marketing communications at any time by using the unsubscribe instructions in the message or contacting us.",
        },
        {
          type: "p",
          text: "We may still send non-marketing communications, such as responses to inquiries, service-related messages, legal notices, or administrative communications.",
        },
      ],
    },
    {
      id: "automated",
      title: "14. Automated Decision-Making",
      body: [
        {
          type: "p",
          text: "We do not use Website data for automated decision-making that produces legal or similarly significant effects about you.",
        },
        {
          type: "p",
          text: "Any clinical, diagnostic, reporting, or patient care decisions are handled through appropriate healthcare workflows and professional review, not through general Website interactions.",
        },
      ],
    },
    {
      id: "changes",
      title: "15. Changes to This Privacy Policy",
      body: [
        {
          type: "p",
          text: 'We may update this Privacy Policy from time to time. The "Last updated" date at the top of this page shows when it was last revised.',
        },
        {
          type: "p",
          text: "Material changes will be posted on the Website or communicated where required by law.",
        },
      ],
    },
    {
      id: "contact",
      title: "16. Contact Us",
      body: [
        {
          type: "p",
          text: "For questions about this Privacy Policy or to exercise privacy rights, please contact:",
        },
        { type: "ul", items: sharedAddress },
        {
          type: "p",
          text: "Regional contact channels may also be available through the Website for Egypt, Saudi Arabia, and Jordan operations.",
        },
      ],
    },
  ],
};

export const termsCopy: LegalCopy = {
  seo: {
    title: "Terms and Conditions — Ray Lab Group",
    description:
      "Terms governing access to and use of the Ray Lab Group website, including content disclaimers, contact forms, intellectual property, and liability.",
  },
  hero: {
    eyebrow: "Legal",
    headline: "Terms and Conditions",
    subheadline:
      "These Terms govern your access to and use of the Ray Lab Group website and any pages, content, contact forms, downloadable materials, or digital features made available through it.",
  },
  lastUpdated: "May 11, 2026",
  intro: [
    {
      type: "p",
      text: 'These Terms and Conditions ("Terms") govern your access to and use of the Ray Lab Group website and any pages, content, contact forms, downloadable materials, or digital features made available through it (the "Website").',
    },
    {
      type: "p",
      text: 'The Website is operated by Ray Lab Group, a Malta-headquartered diagnostic healthcare group with regional operations and affiliated platforms in Egypt, Saudi Arabia, and Jordan, including Cairo Scan, TechnoScan, CRC, MedRay, Cairo Scan Polyclinics, TechnoScan Polyclinics, Specialized Clinics, and Ray Medical (together, "Ray Lab Group", "we", "us", or "our").',
    },
    {
      type: "p",
      text: "Please read these Terms carefully. By using the Website, you agree to these Terms. If you do not agree, please do not use the Website.",
    },
  ],
  sections: [
    {
      id: "about",
      title: "1. About Ray Lab Group",
      body: [
        {
          type: "p",
          text: "Ray Lab Group provides diagnostic healthcare information through the Website, including information about our group, diagnostic platforms, branch network, services, teleradiology capabilities, investor relations, and contact channels.",
        },
        {
          type: "p",
          text: "The Website is intended for general informational, investor relations, physician referral, partnership, media, and contact purposes. It is not intended to replace direct communication with a licensed healthcare professional or the relevant Ray Lab Group platform.",
        },
      ],
    },
    {
      id: "medical-disclaimer",
      title: "2. Medical Information Disclaimer",
      body: [
        {
          type: "p",
          text: "The Website may describe diagnostic imaging, laboratory, clinical, teleradiology, and related healthcare services. This information is provided for general awareness only and does not constitute:",
        },
        {
          type: "ul",
          items: [
            "medical advice, diagnosis, or treatment;",
            "a doctor-patient relationship;",
            "a guarantee that a service is clinically appropriate for any person;",
            "emergency medical support; or",
            "a substitute for consultation with a qualified healthcare professional.",
          ],
        },
        {
          type: "p",
          text: "If you have a medical emergency, seek urgent medical assistance from local emergency services or the nearest appropriate medical provider. Do not rely on the Website for emergency care.",
        },
        {
          type: "p",
          text: "Patients should consult their physician or the relevant Ray Lab Group platform before making clinical decisions, booking a diagnostic test, interpreting results, or changing any treatment plan.",
        },
      ],
    },
    {
      id: "content",
      title: "3. Website Content",
      body: [
        {
          type: "p",
          text: "We aim to keep Website content accurate, current, and useful. However, healthcare services, branch availability, equipment, operating hours, physicians, turnaround times, investor information, and regional operations may change over time.",
        },
        {
          type: "p",
          text: "Unless expressly confirmed in writing by Ray Lab Group or the relevant affiliated platform:",
        },
        {
          type: "ul",
          items: [
            "Website content is provided for general information only;",
            "branch, service, and platform details may be subject to local availability;",
            "turnaround times, including teleradiology timelines, are indicative and may vary;",
            "investor and financial information is not an offer, solicitation, or investment recommendation; and",
            "content may be updated, corrected, suspended, or removed without prior notice.",
          ],
        },
      ],
    },
    {
      id: "contact-forms",
      title: "4. Contact Forms and Inquiries",
      body: [
        {
          type: "p",
          text: "The Website may allow you to submit inquiries, including investor, physician, partner, media, or general messages. When using any form or email channel, you agree to provide information that is accurate, lawful, and not misleading.",
        },
        {
          type: "p",
          text: "Please do not submit sensitive medical information, diagnostic images, reports, national ID numbers, payment details, or confidential third-party information through a general contact form unless specifically requested through an approved secure channel.",
        },
        {
          type: "p",
          text: "Submitting a message through the Website does not guarantee acceptance of a referral, appointment, partnership request, media request, investment discussion, or other engagement. We may route your inquiry to the appropriate group, platform, regional, or professional team for response.",
        },
      ],
    },
    {
      id: "referrals",
      title: "5. Physician Referrals and Clinical Pathways",
      body: [
        {
          type: "p",
          text: "Any references to patient referrals, clinical pathways, diagnostic categories, or reporting services are intended to help physicians, partners, and patients understand available capabilities within the Ray Lab Group ecosystem.",
        },
        { type: "p", text: "Clinical referrals and diagnostic services are subject to:" },
        {
          type: "ul",
          items: [
            "medical appropriateness and physician assessment;",
            "local laws, licensing rules, healthcare regulations, and professional standards;",
            "patient eligibility, consent, and required documentation;",
            "branch or service availability; and",
            "the policies of the relevant affiliated platform or medical facility.",
          ],
        },
        {
          type: "p",
          text: "Ray Lab Group does not guarantee that a specific diagnostic service, physician, consultant, report, appointment, or branch will be available at any particular time.",
        },
      ],
    },
    {
      id: "investor-content",
      title: "6. Investor Relations Content",
      body: [
        {
          type: "p",
          text: "The Website may include investor relations content, growth information, financial highlights, shareholder references, press content, governance information, or market commentary.",
        },
        {
          type: "p",
          text: "This content is provided for general corporate information only. It does not constitute financial advice, legal advice, investment advice, an offer to sell securities, a solicitation to buy securities, or a basis for making an investment decision.",
        },
        {
          type: "p",
          text: "Any investment, partnership, acquisition, financing, or strategic transaction discussion must be conducted through authorized Ray Lab Group representatives and appropriate professional advisers.",
        },
      ],
    },
    {
      id: "ip",
      title: "7. Intellectual Property",
      body: [
        {
          type: "p",
          text: "All Website content, including text, graphics, logos, icons, images, videos, layout, design elements, service descriptions, platform names, and other materials, is owned by or licensed to Ray Lab Group or its affiliates, unless otherwise stated.",
        },
        {
          type: "p",
          text: "You may view and use the Website for lawful personal, professional, informational, or internal business purposes. You may not, without our prior written permission:",
        },
        {
          type: "ul",
          items: [
            "copy, reproduce, publish, modify, distribute, sell, or exploit Website content;",
            "use Ray Lab Group or affiliated platform names, logos, or branding in a way that suggests endorsement or affiliation;",
            "remove copyright, trademark, or other proprietary notices;",
            "scrape, harvest, or bulk download Website content; or",
            "use Website content for unlawful, misleading, defamatory, or harmful purposes.",
          ],
        },
      ],
    },
    {
      id: "acceptable-use",
      title: "8. Acceptable Use",
      body: [
        { type: "p", text: "You agree not to:" },
        {
          type: "ul",
          items: [
            "use the Website in violation of any applicable law or regulation;",
            "interfere with, disrupt, damage, or overload the Website or its security features;",
            "attempt unauthorized access to any system, form, database, server, or account;",
            "upload or transmit malware, spam, or harmful code;",
            "impersonate another person or organization;",
            "submit false, offensive, unlawful, or confidential information; or",
            "use automated tools to access, scrape, index, or test the Website without authorization.",
          ],
        },
        {
          type: "p",
          text: "We may restrict, suspend, or block access to the Website if we believe these Terms have been breached or if needed to protect the Website, our users, patients, teams, partners, or systems.",
        },
      ],
    },
    {
      id: "third-party-links",
      title: "9. Third-Party Links and Services",
      body: [
        {
          type: "p",
          text: "The Website may link to third-party websites or services, including maps, social media pages, investor resources, media channels, or external partner platforms. These third-party services are not controlled by Ray Lab Group.",
        },
        {
          type: "p",
          text: "We are not responsible for third-party websites, content, privacy practices, security, availability, or accuracy. Your use of third-party websites is subject to their own terms and policies.",
        },
      ],
    },
    {
      id: "no-warranties",
      title: "10. No Warranties",
      body: [
        {
          type: "p",
          text: 'The Website is provided on an "as is" and "as available" basis. To the fullest extent permitted by law, Ray Lab Group makes no warranties, express or implied, about the Website, including warranties of accuracy, completeness, availability, fitness for a particular purpose, non-infringement, or uninterrupted operation.',
        },
        {
          type: "p",
          text: "We do not guarantee that the Website will be error-free, secure, continuously available, or free from harmful components.",
        },
      ],
    },
    {
      id: "liability",
      title: "11. Limitation of Liability",
      body: [
        {
          type: "p",
          text: "To the fullest extent permitted by applicable law, Ray Lab Group, its affiliates, directors, officers, employees, consultants, shareholders, partners, and service providers will not be liable for any indirect, incidental, consequential, special, punitive, or exemplary loss or damage arising from or related to your use of the Website.",
        },
        {
          type: "p",
          text: "This includes, without limitation, loss of data, loss of opportunity, business interruption, reputational harm, or reliance on Website content.",
        },
        {
          type: "p",
          text: "Nothing in these Terms excludes or limits liability that cannot be excluded or limited under applicable law, including liability for fraud, intentional misconduct, or rights that apply to patients or consumers under mandatory local law.",
        },
      ],
    },
    {
      id: "privacy",
      title: "12. Privacy",
      body: [
        {
          type: "p",
          text: "Our collection and use of personal data through the Website is described in our Privacy Policy. By using the Website or submitting information through it, you acknowledge that your information may be processed as described in that Privacy Policy.",
        },
      ],
    },
    {
      id: "changes",
      title: "13. Changes to the Website or Terms",
      body: [
        {
          type: "p",
          text: 'We may update the Website and these Terms from time to time. The "Last updated" date at the top of this page indicates when these Terms were last revised.',
        },
        {
          type: "p",
          text: "Your continued use of the Website after changes are posted means you accept the updated Terms.",
        },
      ],
    },
    {
      id: "governing-law",
      title: "14. Governing Law",
      body: [
        {
          type: "p",
          text: "These Terms are governed by the laws of Malta, unless mandatory laws in another jurisdiction apply to a particular user, patient, service, or dispute.",
        },
        {
          type: "p",
          text: "Where local healthcare, consumer, privacy, professional, or patient rights laws apply in Egypt, Saudi Arabia, Jordan, Malta, or another relevant jurisdiction, those mandatory rights are not affected by these Terms.",
        },
      ],
    },
    {
      id: "contact",
      title: "15. Contact Us",
      body: [
        { type: "p", text: "For questions about these Terms or the Website, please contact:" },
        { type: "ul", items: sharedAddress },
        {
          type: "p",
          text: "Regional contact channels may also be available through the Website for Egypt, Saudi Arabia, and Jordan operations.",
        },
      ],
    },
  ],
};
