export const contactCopy = {
  seo: {
    title: "Contact Us — Ray Lab Group",
    description:
      "Get in touch with Ray Lab Group for investor relations, physician partnerships, media enquiries, or general questions.",
  },
  hero: {
    eyebrow: "Get in Touch",
    headline: "Let's Start a",
    headlineAccent: "Conversation.",
    subheadline:
      "Whether you're an investor, a referring physician, a potential partner, or a member of the press — we'd love to hear from you.",
  },
  form: {
    title: "Send a Message",
    fields: {
      firstName: { label: "First Name", placeholder: "First Name" },
      lastName: { label: "Last Name", placeholder: "Last Name" },
      email: { label: "Email Address", placeholder: "your@email.com" },
      organisation: { label: "Organisation", placeholder: "Company / Hospital" },
      inquiryType: {
        label: "Inquiry Type",
        placeholder: "Select a topic",
        options: [
          "Investor Relations",
          "Physician / Referral Partnership",
          "Media & Press",
          "Business Partnership",
          "General Inquiry",
        ],
      },
      message: { label: "Message", placeholder: "Tell us how we can help..." },
    },
    submit: "Send Message",
    submitting: "Sending...",
    successTitle: "Message Received",
    successBody:
      "Thank you for reaching out. A member of our team will be in touch within 1 : 2 business days.",
    errorMessage: "Something went wrong. Please try again.",
  },
  offices: {
    title: "Our Offices",
    primary: {
      label: "Malta HQ (Registered)",
      address: "B2, Industry Street, Zone 5\nCentral Business District, Qormi\nCBD 5030, Malta",
    },
    secondary: {
      label: "Ta' Xbiex Office",
      address: "Whitehall Mansions — Level 2\nTa' Xbiex Wharf\nTa' Xbiex XBX 1026, Malta",
    },
  },
  inquiryTypes: {
    investor: {
      title: "Investor Relations",
      body: "For financial data, board enquiries, or partnership discussions.",
      cta: "Submit Investor Inquiry",
    },
    physician: {
      title: "Physician Enquiries",
      body: "For referral partnerships, subspecialty access, or diagnostic service enquiries.",
      cta: "Submit Physician Inquiry",
    },
    media: {
      title: "Media & Press",
      body: "For press enquiries, interview requests, or media asset downloads.",
      cta: "Contact Press Team",
    },
  },
} as const;

export type ContactCopy = typeof contactCopy;
