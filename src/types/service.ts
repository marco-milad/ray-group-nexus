/**
 * Ray Lab Group — Service / Category / Pathway types
 */

export type ServiceCategoryId =
  | "imaging"
  | "ultrasound"
  | "womens"
  | "cardiology"
  | "advanced"
  | "lab"
  | "teleradiology";

export type ServicePriority = "high" | "medium" | "low";

export interface ServiceCategory {
  id: ServiceCategoryId;
  label: string;
  description: string;
  /** lucide icon name */
  icon: string;
  order: number;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  categoryId: ServiceCategoryId;
  /** brand slugs — refs to Brand.slug */
  availableAt: string[];
  /** lucide icon name */
  icon: string;
  highlight: string;
  priority: ServicePriority;
  order: number;
  featured?: boolean;
}

export interface ClinicalPathway {
  id: string;
  name: string;
  description: string;
  icon: string;
  /** refs to ServiceItem.id */
  serviceIds: string[];
  order: number;
}
