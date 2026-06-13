/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  titleEn: string;
  category: string; // e.g. "فلل فاخرة", "شقق ذكية", "أبراج تجارية"
  city: string;
  district: string;
  type: 'residential' | 'commercial' | 'mixed';
  status: 'available' | 'sold-out' | 'under-construction' | 'launching-soon';
  price: number; // in SAR
  area: number; // sqm
  rooms: number;
  bathrooms: number;
  images: string[];
  videoUrl?: string;
  description: string;
  briefDescription: string;
  features: string[];
  deliveryYear: string;
  lat: number;
  lng: number;
  floorPlans: FloorPlan[];
  amenities: Amenity[];
}

export interface FloorPlan {
  id: string;
  title: string;
  area: number;
  rooms: number;
  bathrooms: number;
  imageUrl: string;
}

export interface Amenity {
  name: string;
  type: 'school' | 'hospital' | 'mall' | 'mosque' | 'park' | 'road';
  distance: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  projectBought: string;
  avatar: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  publishDate: string;
  readTime: string;
  excerpt: string;
  content: string;
  image: string;
}

export interface MaintenanceTicket {
  id: string;
  project: string;
  unit: string;
  category: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'submitted' | 'assigned' | 'in-progress' | 'completed';
  createdAt: string;
  imageUrl?: string;
}
