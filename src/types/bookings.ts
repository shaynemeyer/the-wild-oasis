export interface bookingItem {
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

export interface bookingApiResult {
  id: number;
  created_at?: string;
  startDate: string;
  endDate: string;
  numNights?: number;
  numGuests?: number;
  totalPrice?: number;
  hasBreakfast?: boolean;
  isPaid?: boolean;
  status?: string;
  cabins: { name: string };
  guests: { fullName: string; email: string };
}
