import React, { useState } from 'react';
import { MessageCircle, Phone, FileText, X } from 'lucide-react';
import { websiteData } from '../data/websiteData';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { company } = websiteData;

  return (
    <div className="apx-concierge-wrap">
      {isOpen && (
        <div className="apx-concierge-card" role="dialog" aria-label="Apex Marble Showroom Concierge">
          <div className="apx-concierge-top">
            <div className="apx-concierge-agent-info">
              <span className="apx-agent-dot" />
              <div>
                <strong className="apx-agent-name">Apex Marble Concierge</strong>
                <p className="apx-agent-role">San Jose Showroom Specialist</p>
              </div>
            </div>
            <button
              type="button"
              className="apx-concierge-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close Concierge"
            >
              <X size={15} />
            </button>
          </div>

          <div className="apx-concierge-content">
            <p className="apx-concierge-message">
              Welcome to Apex Marble! How can we assist you with natural stone slabs, exotic quartzite, or custom countertop fabrication today?
            </p>

            <div className="apx-concierge-actions">
              <a
                href="#main-site-footer"
                onClick={() => {
                  setIsOpen(false);
                  const el = document.getElementById('main-site-footer');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="apx-concierge-btn apx-btn-inquiry"
              >
                <MessageCircle size={15} />
                <span>Showroom Consultation</span>
              </a>

              <a
                href={`tel:${company.phonePlain}`}
                className="apx-concierge-btn apx-btn-call"
              >
                <Phone size={15} />
                <span>Call {company.phone}</span>
              </a>

              <a
                href="#materials-showcase-section"
                onClick={() => {
                  setIsOpen(false);
                  const el = document.getElementById('materials-showcase-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="apx-concierge-btn apx-btn-view"
              >
                <FileText size={15} />
                <span>Browse Slab Inventory</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        className="apx-concierge-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact Apex Marble Concierge"
        title="Chat with Apex Marble Concierge"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
