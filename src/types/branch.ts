/**
 * Ray Lab Group — Branch / location types
 */

export interface Branch {
  id: string;
  brandId: string;
  name: string;
  city: string;
  country: "egypt" | "ksa" | "jordan";
  coordinates: { lat: number; lng: number };
  /** refs to ServiceItem.id */
  serviceIds: string[];
}
