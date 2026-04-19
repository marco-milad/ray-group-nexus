/**
 * EN copy — single entry point.
 *
 * COPY_VERSION enables A/B testing and analytics tagging in the future.
 *
 * IMPORTANT: keys here MUST match those used by getCopy() paths.
 *   getCopy('home.hero.headline')          -> home.hero.headline
 *   getCopy('global.cta.contactUs')        -> global.cta.contactUs
 *   getCopy('sections.ecosystem.headline') -> sections.ecosystem.headline
 *   getCopy('investors.hero.headline')     -> investors.hero.headline
 */

export const COPY_VERSION = "v1" as const;
export type CopyVersion = typeof COPY_VERSION;

import { globalCopy } from "./global";
import { homeCopy } from "./home";
import { aboutCopy } from "./about";
import { investorsCopy } from "./investors";
import { contactCopy } from "./contact";
import { platformsCopy } from "./platforms";
import { servicesCopy } from "./servicesPage";
import { networkCopy } from "./network";

import { ecosystemCopy } from "./sections/ecosystem";
import { statsCopy } from "./sections/stats";
import { physiciansCopy } from "./sections/physicians";
import { networkPreviewCopy } from "./sections/networkPreview";
import { contactCtaCopy } from "./sections/contactCta";

// Top-level page copy
export const global = globalCopy;
export const home = homeCopy;
export const about = aboutCopy;
export const investors = investorsCopy;
export const contact = contactCopy;
export const platforms = platformsCopy;
export const services = servicesCopy;
export const network = networkCopy;

// Reusable sections — namespaced under `sections.*`
export const sections = {
  ecosystem: ecosystemCopy,
  stats: statsCopy,
  physicians: physiciansCopy,
  networkPreview: networkPreviewCopy,
  contactCta: contactCtaCopy,
} as const;

// Re-export raw modules so consumers can import directly:
//   import { homeCopy } from '@/data/en/home'
export {
  globalCopy,
  homeCopy,
  aboutCopy,
  investorsCopy,
  contactCopy,
  platformsCopy,
  servicesCopy,
  networkCopy,
};
export { ecosystemCopy, statsCopy, physiciansCopy, networkPreviewCopy, contactCtaCopy };
