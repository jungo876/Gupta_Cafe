/**
 * Application Configuration
 * 
 * This file contains configuration settings for the application.
 * Values can be overridden by environment variables.
 */

// WhatsApp configuration
export const whatsappConfig = {
  // Default phone number for WhatsApp (can be overridden by VITE_WHATSAPP_PHONE environment variable)
  // Format: country code + number, no spaces or special characters (e.g., 911234567890)
  phoneNumber: import.meta.env.VITE_WHATSAPP_PHONE || "918170947914",
};

// Other application settings can be added here in the future