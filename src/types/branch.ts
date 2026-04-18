/**
 * Ray Lab Group — Branch / location types
 */

import type { BrandId, CountryCode } from "./brand";

export type ServiceCategory =
  | "mri"
  | "ct"
  | "pet-ct"
  | "mammography"
  | "ultrasound"
  | "x-ray"
  | "lab"
  | "clinic"
  | "teleradiology";

export interface Branch {
  id: string;
  name: string;
  brand: BrandId;
  country: CountryCode;
  city: string;
  address?: string;
  phone?: string;
  email?: string;
  /** Optional [lat, lng] — populated in Phase 2 for the interactive map */
  coordinates?: [number, number];
  services: ServiceCategory[];
  /** Operating hours, e.g. "24/7" or "Sat-Thu 9:00-21:00" */
  hours?: string;
}
