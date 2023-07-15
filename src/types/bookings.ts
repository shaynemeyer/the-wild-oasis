import { guestItem } from "./guests";

interface bookingItem {
  id: number;
  startDate: string;
  endDate: string;
  created_at?: string;
  numNights?: number;
  numGuests?: number;
  cabinPrice?: number;
  extraPrice?: number;
  totalPrice?: number;
  status?: string;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations?: string;
  cabinId?: number;
  guestId?: number;
}

export interface bookingApiResult extends bookingItem {
  cabins: {name: string };
  guests: {fullName: string, email:string};
}