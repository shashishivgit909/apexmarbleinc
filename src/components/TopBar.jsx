import React from 'react';
import { websiteData } from '../data/websiteData';
import { Phone, MapPin, FileText, Clock, ArrowUpRight } from 'lucide-react';

export default function TopBar() {
  const { company } = websiteData;

  return (
    <div id="top-contact-bar" className="top-bar-container">
      <div className="top-bar-inner">
        <div className="top-bar-left">
          <a href={`tel:+1${company.phonePlain}`} className="topbar-item">
            <Phone size={14} className="topbar-icon" />
            <span>{company.phone}</span>
          </a>
          <span className="topbar-divider" aria-hidden="true" />
          <a
            href={company.mapsUrl}
            className="topbar-item"
          >
            <MapPin size={14} className="topbar-icon" />
            <span>{company.address}</span>
          </a>
        </div>

        <div className="top-bar-right">
          <span className="topbar-hours">
            <Clock size={13} className="topbar-icon" />
            <span>San Jose Slab Showroom &amp; Warehouse</span>
          </span>
          <a
            href={company.quoteUrl}
            className="topbar-quote-pill"
          >
            <FileText size={13} />
            <span>Get a Free Quote</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
