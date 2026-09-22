export type UserRole = 'user' | 'admin';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  createdAt: string;
  lastLogin: string;
  role: UserRole;
  phone?: string;
  company?: string;
}

export type LeadStatus = 'New' | 'Contacted' | 'In Discussion' | 'Proposal Sent' | 'Converted' | 'Closed';
export type ProjectStatus = 'New' | 'Contacted' | 'In Discussion' | 'Proposal' | 'In Progress' | 'Completed';

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  keyBenefits: string[];
  deliverables: string[];
  resultsTarget: string;
  technologies: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  category: 'Websites' | 'Marketing' | 'Branding' | 'AI' | 'Automation';
  technologies: string[];
  description: string;
  results: string;
  image: string;
  client: string;
  featured?: boolean;
  statNumber?: string;
  statLabel?: string;
}

export interface ContactRequest {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  topic: string;
  budget: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  status: ProjectStatus;
  createdAt: string;
}

export interface ConsultationBooking {
  id?: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  topic: string;
  date: string;
  time: string;
  message: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Digital Marketing' | 'AI' | 'Web Development' | 'SEO' | 'Business Growth' | 'Technology' | 'WhatsApp Automation' | string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  company: string;
  role: string;
  profileImage: string;
  rating: number;
  testimonial: string;
  isDemo?: boolean;
}

export interface NewsletterSubscriber {
  id?: string;
  name: string;
  email: string;
  subscribedAt: string;
}
