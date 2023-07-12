interface cabinItem {
  created_at?: string;
  description?: string;
  discount?: number;
  id: number;
  image?: string | null | File;
  maxCapacity?: number;
  name: string;
  regularPrice?: number;
}
