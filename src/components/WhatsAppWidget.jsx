import React, { useState } from 'react';
import { MessageCircle, Phone, FileText, X } from 'lucide-react';
import { websiteData } from '../data/websiteData';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const company = websiteData.company;

  return (
    <div className="whatsapp-floating-widget">
      {isOpen && (
        <div className="whatsapp-popup-box">
          <div className="popup-header">
            <div className="popup-agent">
              <span className="online-indicator" />
              <div>
                <strong>Apex Marble Concierge</strong>
                <p>Typically replies in minutes</p>
              </div>
            </div>
            <button
              type="button"
              className="popup-close-btn"
              onClick={() => setIsOpen(false)}
            >
              <X size={16} />
            </button>
          </div>

          <div className="popup-body">
            <p>
              Hi there! 👋 How can we help you with natural stone slabs, marble, or prefab countertops today?
            </p>

            <div className="popup-actions">
              <a
                href={`https://wa.me/14082781300?text=${encodeURIComponent('Hello Apex Marble, I would like to inquire about slabs and pricing.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="popup-btn whatsapp-action-btn"
              >
                <MessageCircle size={16} />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${company.phonePlain}`}
                className="popup-btn phone-action-btn"
              >
                <Phone size={16} />
                <span>Call (408) 278-1300</span>
              </a>

              <a
                href={company.quoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="popup-btn quote-action-btn"
              >
                <FileText size={16} />
                <span>Request Slab Quote</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bubble Button */}
      <button
        type="button"
        className="whats-app-bubble"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact Apex Marble on WhatsApp"
        title="Chat with Apex Marble"
      >
        <MessageCircle size={28} color="#ffffff" />
      </button>
    </div>
  );
}
