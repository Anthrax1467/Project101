
export enum Category {
  RENTAL = 'Rental',
  EVENT = 'Events',
  CONCERT = 'Concerts',
  MARKETPLACE = 'Marketplace',
  JOBS = 'Jobs',
  BLOG = 'Blog',
  SERVICES = 'Services',
  COMMUNITY = 'Community',
  BUSINESS = 'Business' 
}

export enum ServiceSubCategory {
  PLUMBER = 'Plumber',
  ELECTRICIAN = 'Electrician',
  CARPENTER = 'Carpenter',
  HANDYMAN = 'Handyman',
  CLEANER = 'Cleaner',
  PAINTER = 'Painter',
  IT_SUPPORT = 'IT Support',
  LEGAL = 'Legal & Admin'
}

export enum BusinessDomain {
  TRAVEL = 'Travel Agency',
  HOMESTAY = 'Homestay / Hotel',
  EVENTS = 'Event Organizer',
  TOURS = 'Tour Packages',
  SERVICES = 'Professional Services',
  RETAIL = 'Marketplace Seller'
}

export enum BusinessNature {
  PRODUCT = 'Products',
  SERVICE = 'Services',
  BOTH = 'Both'
}

export enum BlogCategory {
  TRAVEL = 'Travel',
  FOOD = 'Food',
  ENTERTAINMENT = 'Entertainment',
  LIFESTYLE = 'Lifestyle',
  STUDENT_LIFE = 'Student Life'
}

export type ContributorTier = 'Yatri' | 'Sathi' | 'Guru' | 'Samajsewi';

export enum RentalType {
  SINGLE_ROOM = 'Single Room',
  DOUBLE_ROOM = 'Double Room',
  APARTMENT = 'Apartment',
  HOMESTAY = 'Homestay',
  STUDENT_ACCOM = 'Student Accom.'
}

export enum Region {
  USA = 'USA',
  UK = 'UK',
  EUROPE = 'Europe',
  MIDDLE_EAST = 'Middle East',
  AUSTRALIA = 'Australia',
  NEPAL = 'Nepal',
  GLOBAL = 'Global'
}

export type Currency = {
  code: string;
  symbol: string;
  rateToUSD: number;
};

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface UserNotification {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'system' | 'alert' | 'reward';
  date: string;
  read: boolean;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price?: string;
  imageUrl?: string;
  category?: string;
  type?: 'Product' | 'Service';
  // Domain specific fields
  duration?: string; // For Tours
  venue?: string; // For Events
  eventDate?: string; // For Events
  amenities?: string[]; // For Stays
  isAvailable?: boolean;
}

export interface BusinessProfile {
  businessName: string;
  tagline: string;
  description: string;
  domain: BusinessDomain;
  nature?: BusinessNature;
  logoUrl?: string;
  coverUrl?: string;
  services: ServiceItem[];
  viberNumber?: string;
  whatsappNumber?: string;
  address?: string;
  category: string;
  cardMode: 'digital' | 'physical';
  physicalCardUrl?: string;
  isRegistered?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  city: string;
  photoURL?: string;
  isVerified: boolean; // Email verification
  isPhoneVerified?: boolean;
  isBusinessVerified?: boolean;
  isNagritaVerified?: boolean;
  businessDocs?: string[];
  businessProfile?: BusinessProfile;
  verificationMethod?: 'gmail' | 'facebook' | 'instagram' | 'phone' | 'email';
  trustScore?: number;
  credits: number;
  contributorTier: ContributorTier;
  notifications: UserNotification[];
}

export interface SafetyFeedback {
  helpful: number;
  misleading: number;
  scam: number;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  category: Category;
  serviceSubCategory?: ServiceSubCategory;
  region: Region;
  city: string;
  price?: string;
  priceValue?: number;
  location: string;
  author: string;
  authorId: string;
  isAuthorVerified: boolean; // Email
  isPhoneVerified?: boolean;
  isNagritaVerified?: boolean;
  date: string;
  lastActiveDate: string; 
  expiresAt: string; 
  imageUrl?: string;
  tags?: string[];
  status: 'pending' | 'approved' | 'rejected';
  speaksNepali?: boolean;
  languages?: string[]; 
  phoneNumber?: string;
  whatsappNumber?: string;
  viberNumber?: string;
  isAvailableToday?: boolean; 
  safetyFeedback: SafetyFeedback; 
  isFeatured?: boolean; 
  rating?: number;
  reviews?: Review[];
  
  // Category-specific
  isFurnished?: boolean;
  isShared?: boolean;
  rentalType?: RentalType;
  vehicleSpecialties?: string[];
  
  // Concert specific
  eventDate?: string;
  ticketType?: 'GA' | 'VIP' | 'Early Bird';
}

export interface TourPackage {
  id: string;
  title: string;
  duration: string;
  price: number;
  description: string;
  highlights: string[];
}

export interface PartneredStay {
  id: string;
  name: string;
  type: string;
  location: string;
  pricePerNight: number;
  currency: string;
  rating: number;
  imageUrl: string;
  description: string;
  amenities: string[];
  // Enhanced Fields
  hasBreakfast: boolean;
  viewType: string;
  bedType: string;
  allowsDayStay: boolean;
  dayStayPrice?: number;
}

export interface PartneredAgency {
  id: string;
  name: string;
  location: string;
  specialty: string;
  rating: number;
  verifiedYear: number;
  imageUrl: string;
  description: string;
  contactNumber: string;
  packages: TourPackage[];
}

export interface CommunityAnswer {
  id: string;
  text: string;
  author: string;
  date: string;
}

export interface CommunityQuestion {
  id: string;
  question: string;
  city: string;
  author: string;
  date: string;
  answers: CommunityAnswer[];
}

export interface BlogEntry {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  date: string;
  category: BlogCategory;
  imageUrl: string;
  readTime: string;
}

export interface FlightDeal {
  airline: string;
  price: string;
  class: string;
  url: string;
  origin: string;
  destination: string;
}
