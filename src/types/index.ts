export type ProductCategory = 'interior' | 'exterior' | 'specialist' | 'equipment';
export type ProductFinish = 'matt' | 'silk' | 'gloss' | 'eggshell' | 'suede';
export type ColourFamily = 'warm' | 'cool' | 'neutral' | 'bold' | 'earth';
export type RoomType = 'living-room' | 'bedroom' | 'kitchen' | 'bathroom' | 'kids-room' | 'outdoor';

export type ColourSwatch = {
  id: string;
  name: string;
  hex: string;
  family: ColourFamily;
  collection?: string;
};

export type ProductSize = {
  label: string;
  ml: number;
  price: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: ProductCategory;
  finish?: ProductFinish;
  sizes: ProductSize[];
  colours: ColourSwatch[];
  images: string[];
  featured: boolean;
  badge?: 'bestseller' | 'new';
  rating?: { score: number; count: number };
};

export type Collection = {
  id: string;
  slug: string;
  name: string;
  description: string;
  coverImage: string;
  colours: ColourSwatch[];
  rooms: RoomInspiration[];
  year: number;
};

export type RoomInspiration = {
  id: string;
  title: string;
  roomType: RoomType;
  images: { before?: string; after: string };
  coloursUsed: ColourSwatch[];
  designer?: string;
};

export type CartItem = {
  productId: string;
  productName: string;
  colourId: string;
  colourName: string;
  sizeLabel: string;
  qty: number;
  price: number;
  image: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
};

export type StoreLocation = {
  id: string;
  name: string;
  address?: string;
  city: string;
  province: string;
  postalCode?: string;
  phone: string;
  email: string;
  coordinates: { lat: number; lng: number };
  hours?: { day: string; open: string; close: string }[];
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};
