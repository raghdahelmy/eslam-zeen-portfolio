
import React from 'react';
import { 
  ShoppingBag, 
  Facebook, 
  Instagram, 
  Phone,
  MapPin
} from 'lucide-react';
import { SocialLink } from './types';

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'store',
    title: 'المتجر الإلكتروني',
    description: 'تسوق أحدث الهواتف والإكسسوارات أونلاين',
    url: 'https://www.ek-original.com',
    icon: <ShoppingBag className="w-6 h-6" />,
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'facebook',
    title: 'فيسبوك',
    description: 'تابع عروضنا اليومية على فيسبوك',
    url: 'https://www.facebook.com/share/1WfYwyWZKw/?mibextid=wwXIfr',
    icon: <Facebook className="w-6 h-6" />,
    color: 'from-blue-600 to-blue-800'
  },
  {
    id: 'instagram',
    title: 'انستجرام',
    description: 'استمتع بمشاهدة أحدث المنتجات',
    url: 'https://www.instagram.com/eslam.zeeen',
    icon: <Instagram className="w-6 h-6" />,
    color: 'from-pink-500 via-red-500 to-yellow-500'
  },
  {
    id: 'tiktok',
    title: 'تيك توك',
    description: 'فيديوهات تقنية ومراجعات سريعة',
    url: 'https://www.tiktok.com/@eslamzeen1?_r=1&_t=ZS-92la897JOKX',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.39-.15-.1-.3-.21-.45-.32V16.7c.01 1.76-.55 3.53-1.66 4.88-1.58 1.93-4.18 2.8-6.62 2.31-2.43-.46-4.57-2.31-5.18-4.7-.66-2.58.11-5.57 2.05-7.39 1.51-1.41 3.59-2.07 5.66-1.92v4.03c-1.11-.12-2.28.18-3.13.91-.94.79-1.31 2.1-1.04 3.29.3 1.29 1.5 2.27 2.82 2.31 1.39.04 2.71-.81 3.21-2.11.21-.55.26-1.15.25-1.74l-.01-16.51Z"/>
      </svg>
    ),
    color: 'from-gray-800 to-black'
  },
  {
    id: 'call',
    title: 'اتصال هاتفي',
    description: 'تواصل مباشر للاستفسارات: 01090305065',
    url: 'tel:01090305065',
    icon: <Phone className="w-6 h-6" />,
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'branch-alex',
    title: 'فرع شارع إسكندرية (الرئيسي)',
    description: 'الإسماعيلية - وسط البلد',
    url: 'https://maps.app.goo.gl/FzxyxdSxPR6eS6ws5',
    icon: <MapPin className="w-6 h-6" />,
    color: 'from-amber-400 via-amber-500 to-orange-500'
  },
  {
    id: 'branch-carrefour',
    title: 'فرع كارفور الإسماعيلية',
    description: 'داخل مول كارفور - الطريق الدائري',
    url: 'https://maps.google.com/?q=Carrefour+Ismailia',
    icon: <MapPin className="w-6 h-6" />,
    color: 'from-amber-400 to-amber-600'
  },
  {
    id: 'branch-7th',
    title: 'فرع المرحلة السابعة',
    description: 'الإسماعيلية - حي ثالث',
    icon: <MapPin className="w-6 h-6" />,
    color: 'from-amber-400 to-amber-600'
  },
  {
    id: 'branch-sarabium',
    title: 'فرع سرابيوم',
    description: 'الإسماعيلية - مركز فايد',
    icon: <MapPin className="w-6 h-6" />,
    color: 'from-amber-400 to-amber-600'
  }
];

export const PROFILE = {
  name: 'إسلام ياسين زين',
  handle: '@eslam.zeeen',
  bio: 'Founder EK Original',
  avatar: 'avatar.jpg'
};
