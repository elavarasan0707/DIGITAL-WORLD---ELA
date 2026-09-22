/**
 * ELA Digital World - Official WhatsApp Integration Helper
 * Official Number: 8667618925
 * International Format: +918667618925
 */

export const OFFICIAL_WHATSAPP_NUMBER = '8667618925';
export const OFFICIAL_WHATSAPP_INTL = '+918667618925';
export const OFFICIAL_WHATSAPP_CLEAN = '918667618925';

export interface WhatsAppFormPayload {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  topic?: string;
  budget?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
}

export interface WhatsAppConsultationPayload {
  name: string;
  email: string;
  phone: string;
  service: string;
  topic: string;
  date: string;
  time: string;
  message?: string;
}

/**
 * Creates standard direct WhatsApp chat link
 */
export function getWhatsAppDirectUrl(customText?: string): string {
  const defaultText = 'Hi ELA Digital World, I am interested in your digital marketing and technology services. I would like to discuss my project.';
  const text = customText || defaultText;
  return `https://wa.me/${OFFICIAL_WHATSAPP_CLEAN}?text=${encodeURIComponent(text)}`;
}

/**
 * Creates dynamic WhatsApp message from contact form submission
 */
export function getWhatsAppFormUrl(payload: WhatsAppFormPayload): string {
  const message = `Hi ELA Digital World,

I would like to discuss a project.

Name: ${payload.name || 'Not provided'}
Email: ${payload.email || 'Not provided'}
Phone: ${payload.phone || 'Not provided'}
Company: ${payload.company || 'Not provided'}
Service: ${payload.service || 'General Inquiry'}
Topic: ${payload.topic || 'Digital Growth'}
Budget: ${payload.budget || 'To be discussed'}
Preferred Date: ${payload.preferredDate || 'Flexible'}
Preferred Time: ${payload.preferredTime || 'Flexible'}

Project Details:
${payload.message || 'I would like to scale my business with ELA Digital World.'}

Please contact me regarding this project.`;

  return `https://wa.me/${OFFICIAL_WHATSAPP_CLEAN}?text=${encodeURIComponent(message)}`;
}

/**
 * Creates dynamic WhatsApp message from Consultation Booking
 */
export function getWhatsAppConsultationUrl(payload: WhatsAppConsultationPayload): string {
  const message = `Hi ELA Digital World,

I have scheduled a Free Consultation with your team.

Name: ${payload.name}
Email: ${payload.email}
Phone: ${payload.phone}
Service: ${payload.service}
Topic: ${payload.topic}
Scheduled Date: ${payload.date}
Scheduled Time: ${payload.time}

Notes:
${payload.message || 'Looking forward to reviewing our growth strategy.'}

Please confirm our consultation slot. Thank you!`;

  return `https://wa.me/${OFFICIAL_WHATSAPP_CLEAN}?text=${encodeURIComponent(message)}`;
}

/**
 * Accurately cleans and formats client phone numbers for WhatsApp API.
 * Ensures country code is present (defaults to 91 for 10-digit Indian numbers).
 */
export function formatClientWhatsAppPhone(rawPhone: string): string {
  if (!rawPhone) return '';
  const digits = rawPhone.replace(/[^0-9]/g, '');
  if (!digits) return '';
  // 10 digits -> Indian mobile number
  if (digits.length === 10) {
    return `91${digits}`;
  }
  // 11 digits starting with 0 -> Indian mobile with leading 0
  if (digits.length === 11 && digits.startsWith('0')) {
    return `91${digits.slice(1)}`;
  }
  return digits;
}

/**
 * Creates dynamic WhatsApp URL directed to the SPECIFIC CLIENT's phone number.
 */
export function getClientWhatsAppUrl(clientPhone: string, messageText: string): string {
  const formattedPhone = formatClientWhatsAppPhone(clientPhone);
  return `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodeURIComponent(messageText)}`;
}

/**
 * Creates direct SMS URL targeting the specific client phone.
 */
export function getClientSmsUrl(clientPhone: string, messageText: string): string {
  const cleanPhone = (clientPhone || '').replace(/[^0-9+]/g, '');
  return `sms:${cleanPhone}?body=${encodeURIComponent(messageText)}`;
}

