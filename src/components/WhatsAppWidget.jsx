import React, { useState } from 'react';
import { MessageCircle, Phone, FileText, X } from 'lucide-react';
import { websiteData } from '../data/websiteData';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { company } = websiteData;

  return (
    <div className="whatsapp-floating-widget">
      {isOpen && (
        <div className="whatsapp-popup-box">
          <div className="popup-header">
            <div className="popup-agent">
              <span className="online-indicator" />
              <div>
                <strong>Apex Marble Concierge</strong>
                <p>San Jose Showroom Specialist</p>
              </div>
            </div>
            <button
              type="button"
              className="popup-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close Concierge Chat"
            >
              <X size={16} />
            </button>
          </div>

          <div className="popup-body">
            <p>
              Welcome to Apex Marble! How can we assist you with natural stone slabs, marble,
              quartzite, or custom countertops today?
            </p>

            <div className="popup-actions">
              <a
                href="#main-site-footer"
                onClick={() => setIsOpen(false)}
                className="popup-btn whatsapp-action-btn"
              >
                <MessageCircle size={16} />
                <span>Chat on WhatsApp</span>
              </a>

              <a href={`tel:${company.phonePlain}`} className="popup-btn phone-action-btn">
                <Phone size={16} />
                <span>Call {company.phone}</span>
              </a>

              <a
                href={company.quoteUrl}
                onClick={() => setIsOpen(false)}
                className="popup-btn quote-action-btn"
              >
                <FileText size={16} />
                <span>Request Slab Quote</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        className="whats-app-bubble"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact Apex Marble Concierge"
        title="Chat with Apex Marble"
      >
        <MessageCircle size={26} color="#FAF7F2" />
      </button>
    </div>
  );
}
