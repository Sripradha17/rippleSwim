import { Injectable } from '@angular/core';

export interface ContactInquiryPayload {
  name: string;
  email: string;
  phone: string;
  lane: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  draftInquiryEmail(payload: ContactInquiryPayload, recipient: string): void {
    const subject = encodeURIComponent(`Lesson inquiry from ${payload.name}`);
    const body = encodeURIComponent(
      [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Phone: ${payload.phone}`,
        `Lane of interest: ${payload.lane}`,
        '',
        'Message:',
        payload.message,
      ].join('\n')
    );

    const recipientPath = recipient.trim();
    window.location.href = recipientPath
      ? `mailto:${recipientPath}?subject=${subject}&body=${body}`
      : `mailto:?subject=${subject}&body=${body}`;
  }
}