
import React from 'react';

export interface SocialLink {
  id: string;
  title: string;
  description: string;
  url?: string; // جعل الرابط اختيارياً
  icon: React.ReactNode;
  color: string;
}
