import React from 'react';

export interface SocialLink {
  id: string;
  title: string;
  description: string;
  url: string;
  // Fix: Added React import to provide access to the React namespace for ReactNode
  icon: React.ReactNode;
  color: string;
}