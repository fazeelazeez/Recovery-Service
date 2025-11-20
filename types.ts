import React from 'react';

export interface RecoveryFormData {
  fullName: string;
  email: string;
  whatsapp?: string;
  channelUrl: string;
  channelHandle: string;
  accountEmail: string;
  recoveryEmail: string;
  videoLinks: string;
  signingDevice: string;
  ipAddress: string;
  hijackDateTime: string;
  hijackLocation: string;
  lastLogin: string;
  linkedPhone: string;
  backupCodes: string;
  previousAttempts: string;
  country: string;
  currentLocation: string;
  consent: boolean;
}

export interface Testimonial {
  id: number;
  initials: string;
  text: string;
  service: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ElementType;
}