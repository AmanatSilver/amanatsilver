import { WHATSAPP_CONFIG } from '../config';

interface WhatsAppMessageData {
  name: string;
  email: string;
  message: string;
}

interface WhatsAppApiResponse {
  messaging_product: string;
  contacts?: Array<{
    input: string;
    wa_id: string;
  }>;
  messages?: Array<{
    id: string;
  }>;
  error?: {
    message: string;
    type: string;
    code: number;
    error_subcode: number;
    fbtrace_id: string;
  };
}

/**
 * WhatsApp Business API Service
 * Handles sending messages via WhatsApp Cloud API
 */
class WhatsAppService {
  private readonly baseUrl: string;
  private readonly phoneNumberId: string;
  private readonly accessToken: string;
  private readonly businessNumber: string;

  constructor() {
    this.baseUrl = `${WHATSAPP_CONFIG.apiBaseUrl}/${WHATSAPP_CONFIG.apiVersion}`;
    this.phoneNumberId = WHATSAPP_CONFIG.phoneNumberId;
    this.accessToken = WHATSAPP_CONFIG.accessToken;
    this.businessNumber = WHATSAPP_CONFIG.businessNumber;
  }

  /**
   * Format contact form data into a WhatsApp message
   */
  private formatContactMessage(data: WhatsAppMessageData): string {
    return `*New Contact Form Submission*\n\n` +
      `*Name:* ${data.name}\n` +
      `*Email:* ${data.email}\n\n` +
      `*Message:*\n${data.message}\n\n` +
      `_Sent via Amanat Silver Website_`;
  }

  /**
   * Send a contact form message via WhatsApp
   */
  async sendContactMessage(data: WhatsAppMessageData): Promise<{
    success: boolean;
    messageId?: string;
    error?: string;
  }> {
    try {
      // Format the message
      const messageText = this.formatContactMessage(data);

      // Prepare the API request
      const url = `${this.baseUrl}/${this.phoneNumberId}/messages`;
      
      // Format phone number: remove all non-numeric, ensure country code
      let phoneNumber = this.businessNumber.replace(/[^0-9]/g, '');
      // If doesn't start with country code and has 10 digits, add India code
      if (phoneNumber.length === 10) {
        phoneNumber = '91' + phoneNumber;
      }

      const payload = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: phoneNumber,
        type: 'text',
        text: {
          preview_url: false,
          body: messageText
        }
      };

      // Make the API request
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result: WhatsAppApiResponse = await response.json();

      // Log full response for debugging
      if (!response.ok) {
        console.error('WhatsApp API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          result
        });
      }

      // Check for errors in response
      if (result.error) {
        console.error('WhatsApp API Error:', result.error);
        return {
          success: false,
          error: result.error.message || 'Failed to send WhatsApp message'
        };
      }

      // Check if message was sent successfully
      if (result.messages && result.messages.length > 0) {
        return {
          success: true,
          messageId: result.messages[0].id
        };
      }

      return {
        success: false,
        error: 'No message ID received from WhatsApp API'
      };

    } catch (error) {
      console.error('WhatsApp Service Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Validate WhatsApp configuration
   */
  isConfigured(): boolean {
    return (
      this.phoneNumberId !== 'DEMO_PHONE_NUMBER_ID' &&
      this.accessToken !== 'DEMO_ACCESS_TOKEN' &&
      this.businessNumber !== ''
    );
  }

  /**
   * Check if using demo credentials
   */
  isDemo(): boolean {
    return !this.isConfigured();
  }
}

// Export singleton instance
export const whatsappService = new WhatsAppService();
