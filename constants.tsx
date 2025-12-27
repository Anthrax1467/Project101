
import { Post, Category, Region, RentalType, BlogEntry, BlogCategory, PartneredStay, CommunityQuestion, PartneredAgency, User, ServiceSubCategory } from './types';

const now = new Date();
const daysAgo = (days: number) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();
const daysFromNow = (days: number) => new Date(now.getTime() + days * 24 * 60 * 60 * 1000).toISOString();

export const COMMUNITY_HEROES: (Partial<User> & { specialty: string })[] = [
  { id: 'h1', name: 'Bibek Thapa', credits: 1250, contributorTier: 'Samajsewi', photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bibek', city: 'London', specialty: 'Rental Guru' },
  { id: 'h2', name: 'Pranisha KC', credits: 840, contributorTier: 'Guru', photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pranisha', city: 'Sydney', specialty: 'Foodie Explorer' },
  { id: 'h3', name: 'Suman Gurung', credits: 420, contributorTier: 'Sathi', photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Suman', city: 'Dallas', specialty: 'Student Guide' },
];

export const POPULAR_CITIES = [
  { name: 'London', region: Region.UK },
  { name: 'Aldershot', region: Region.UK },
  { name: 'New York', region: Region.USA },
  { name: 'Dallas', region: Region.USA },
  { name: 'Sydney', region: Region.AUSTRALIA },
  { name: 'Melbourne', region: Region.AUSTRALIA },
  { name: 'Dubai', region: Region.MIDDLE_EAST },
  { name: 'Doha', region: Region.MIDDLE_EAST },
  { name: 'Lisbon', region: Region.EUROPE },
  { name: 'Kathmandu', region: Region.NEPAL },
];

export const MOCK_AGENCIES: PartneredAgency[] = [
  {
    id: 'a1',
    name: 'Sajha Travels London',
    location: 'Aldershot, UK',
    specialty: 'Ticketing',
    rating: 4.9,
    verifiedYear: 2021,
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?q=80&w=2070',
    description: 'Specializing in diaspora flight routing and multi-city tickets. Authorized IATA agent.',
    contactNumber: '+44 7000 000000',
    packages: [
      {
        id: 'p1',
        title: 'Festival Group Flight: London - KTM',
        duration: 'Economy Return',
        price: 850,
        description: 'Dashain/Tihar special group booking with extra 10kg baggage.',
        highlights: ['Extra Baggage', 'Nepali Meal Onboard', 'Flexible Dates']
      }
    ]
  }
];

export const MOCK_STAYS: PartneredStay[] = [
  {
    id: 's1',
    name: 'Sajha Homestay London',
    type: 'Homestay',
    location: 'Wembley, London',
    pricePerNight: 58, 
    currency: 'USD',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070',
    description: 'A cozy Nepali-run homestay near Wembley Stadium. authentic Dal-Bhat served daily.',
    amenities: ['Wifi', 'Kitchen Access', 'Laundry'],
    hasBreakfast: true,
    viewType: 'City Garden View',
    bedType: 'Double Bed',
    allowsDayStay: true,
    dayStayPrice: 35
  },
  {
    id: 's2',
    name: 'Himalayan Boutique Hotel',
    type: 'Hotel',
    location: 'Queens, NYC',
    pricePerNight: 145,
    currency: 'USD',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070',
    description: 'Luxury hotel focused on serving the Himalayan diaspora with premium service.',
    amenities: ['Spa', 'Gym', 'Business Center', 'Free Parking'],
    hasBreakfast: true,
    viewType: 'Manhattan Skyline View',
    bedType: 'King Size Bed',
    allowsDayStay: false
  },
  {
    id: 's3',
    name: 'Sydney Nepal Guesthouse',
    type: 'Homestay',
    location: 'Parramatta, Sydney',
    pricePerNight: 45,
    currency: 'USD',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071',
    description: 'Simple and affordable stay for students and newcomers. Very close to local markets.',
    amenities: ['Wifi', 'Shared Kitchen', 'Library'],
    hasBreakfast: false,
    viewType: 'Quiet Residential View',
    bedType: 'Single/Twin Beds',
    allowsDayStay: true,
    dayStayPrice: 20
  }
];

export const MOCK_QUESTIONS: CommunityQuestion[] = [
  {
    id: 'q1',
    question: 'Any trusted Nepali-speaking mechanic in Parramatta area?',
    city: 'Sydney',
    author: 'Sunil K.',
    date: daysAgo(1),
    answers: [
      { id: 'a1', text: 'Arjun Electricals is good.', author: 'Bipin', date: daysAgo(0) }
    ]
  }
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'c1',
    title: 'Nepathya Live in London - 2x VIP Tickets',
    description: 'Selling 2 VIP tickets for the upcoming Nepathya concert at O2 Arena. Original price, just can’t make it due to travel.',
    category: Category.CONCERT,
    region: Region.UK,
    city: 'London',
    priceValue: 120,
    location: 'Wembley',
    author: 'Ramesh Thapa',
    authorId: 'pro_c1',
    isAuthorVerified: true,
    isPhoneVerified: true,
    isNagritaVerified: true,
    date: daysAgo(0),
    lastActiveDate: daysAgo(0),
    expiresAt: daysFromNow(10),
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070',
    status: 'approved',
    speaksNepali: true,
    eventDate: '2024-10-15',
    ticketType: 'VIP',
    phoneNumber: '+44 7000 000001',
    whatsappNumber: '+44 7000 000001',
    safetyFeedback: { helpful: 24, misleading: 0, scam: 0 },
    isFeatured: true
  },
  {
    id: 's-p1',
    title: 'Expert Plumber & Handyman - 15 Yrs Exp',
    description: 'Reliable plumbing services. Leaks, tap repairs, bathroom fittings. Available 24/7 for the Nepali community in Aldershot.',
    category: Category.SERVICES,
    serviceSubCategory: ServiceSubCategory.PLUMBER,
    region: Region.UK,
    city: 'Aldershot',
    priceValue: 40,
    location: 'Town Centre',
    author: 'Krishna Gurung',
    authorId: 'auth_kg',
    isAuthorVerified: true,
    isPhoneVerified: true,
    isNagritaVerified: true,
    date: daysAgo(2),
    lastActiveDate: daysAgo(0),
    expiresAt: daysFromNow(30),
    imageUrl: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=2070',
    status: 'approved',
    speaksNepali: true,
    phoneNumber: '+44 7000 111222',
    safetyFeedback: { helpful: 45, misleading: 0, scam: 0 },
    rating: 4.9
  },
  {
    id: 's-e1',
    title: 'Safe Electrical Installations & Repairs',
    description: 'NICEIC registered electrician. Rewiring, socket repairs, LED upgrades. Special rates for students.',
    category: Category.SERVICES,
    serviceSubCategory: ServiceSubCategory.ELECTRICIAN,
    region: Region.UK,
    city: 'London',
    priceValue: 50,
    location: 'Plumstead',
    author: 'Sameer Shrestha',
    authorId: 'auth_ss',
    isAuthorVerified: true,
    isPhoneVerified: true,
    isNagritaVerified: false,
    date: daysAgo(1),
    lastActiveDate: daysAgo(0),
    expiresAt: daysFromNow(20),
    imageUrl: 'https://images.unsplash.com/photo-1621905252507-b354bcadcabc?q=80&w=2070',
    status: 'approved',
    speaksNepali: true,
    phoneNumber: '+44 7000 333444',
    safetyFeedback: { helpful: 12, misleading: 1, scam: 0 },
    rating: 4.7
  },
  {
    id: 's-h1',
    title: 'Affordable Handyman - No Job Too Small',
    description: 'Assembling IKEA furniture, wall mounting TVs, general maintenance. Honest work.',
    category: Category.SERVICES,
    serviceSubCategory: ServiceSubCategory.HANDYMAN,
    region: Region.USA,
    city: 'Dallas',
    priceValue: 25,
    location: 'Irving',
    author: 'Pujan Rai',
    authorId: 'u_pujan',
    isAuthorVerified: true,
    isPhoneVerified: false,
    isNagritaVerified: false,
    date: daysAgo(5),
    lastActiveDate: daysAgo(2),
    expiresAt: daysFromNow(15),
    imageUrl: 'https://images.unsplash.com/photo-1581578731522-745d05ad9a2d?q=80&w=2070',
    status: 'approved',
    speaksNepali: true,
    phoneNumber: '+1 214 000 9999',
    safetyFeedback: { helpful: 3, misleading: 0, scam: 0 },
    rating: 4.2
  }
];

export const MOCK_BLOGS: BlogEntry[] = [
  {
    id: 'b1',
    title: 'Finding Authentic Momo in New York City',
    content: 'After months of searching across Queens and Manhattan, I finally found the one. Jackson Heights remains the king of authentic taste...',
    author: 'Sunita Sharma',
    authorId: 'u1',
    date: '2024-05-12',
    category: BlogCategory.FOOD,
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c170db76?q=80&w=2070',
    readTime: '4 min read'
  },
  {
    id: 'b2',
    title: 'A Trek Through Memory: Returning to Annapurna',
    content: 'Returning to my home district after 10 years abroad felt like a dream. The mountains havent changed, but the roads certainly have...',
    author: 'Arjun Adhikari',
    authorId: 'u2',
    date: '2024-05-10',
    category: BlogCategory.TRAVEL,
    imageUrl: 'https://images.unsplash.com/photo-1544735032-6a71dd6414fe?q=80&w=2070',
    readTime: '7 min read'
  }
];
