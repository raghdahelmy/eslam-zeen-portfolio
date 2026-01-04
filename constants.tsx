import React from 'react';
import { 
  ShoppingBag, 
  Facebook, 
  Instagram, 
  Video,
  MessageCircle,
  Phone
} from 'lucide-react';
import { SocialLink } from './types';

export const SOCIAL_LINKS: SocialLink[] = [

  {
    id: 'store',
    title: 'المتجر الإلكتروني',
    description: 'تسوق من المتجر الإلكتروني',
    url: 'https://www.ek-original.com',
    icon: <ShoppingBag className="w-6 h-6" />,
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'facebook',
    title: 'فيسبوك',
    description: 'تابعني على فيسبوك',
    url: 'https://www.facebook.com/share/1WfYwyWZKw/?mibextid=wwXIfr',
    icon: <Facebook className="w-6 h-6" />,
    color: 'from-blue-600 to-blue-800'
  },
  {
    id: 'instagram',
    title: 'انستجرام',
    description: 'تابعني على انستجرام',
    url: 'https://www.instagram.com/eslam.zeeen',
    icon: <Instagram className="w-6 h-6" />,
    color: 'from-pink-500 via-red-500 to-yellow-500'
  },
  {
    id: 'tiktok',
    title: 'تيك توك',
    description: 'تابعني على تيك توك',
    url: 'https://www.tiktok.com/@eslamzeen1?_r=1&_t=ZS-92la897JOKX',
    icon: <Video className="w-6 h-6" />,
    color: 'from-gray-900 to-black border border-white/20'
  },
  {
    id: 'call',
    title: 'اتصال هاتفي',
    description: 'تواصل مباشر عبر الهاتف',
    url: 'tel:01090305065',
    icon: <Phone className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-600'
  }
];

export const PROFILE = {
  name: 'إسلام ياسين زين',
  handle: '@eslam.zeeen',
  bio: 'مؤسس ورئيس مجلس إدارة EK Original للهواتف الذكية',
  avatar: 'avatar.jpg'
};