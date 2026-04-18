/**
 * Ray Lab Group — Brand types
 */

export interface Brand {
  id: string;
  slug: string;
  name: string;
  country: "egypt" | "ksa" | "jordan" | "malta";
  color: string;
  founded: number;
  branches: number;
  /** refs to ServiceItem.id — NOT inline strings */
  serviceIds: string[];
  description: string;
  logo: {
    light: string;
    dark: string;
  };
}
