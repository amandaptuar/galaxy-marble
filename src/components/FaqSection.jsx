import React, { useState } from 'react';
import { ChevronDown, MessageCircle, ShieldCheck } from 'lucide-react';
import { FAQS } from '../data/siteData';

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="faqs-section" id="faqs">
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-tag">Help & Information</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about our marble purity, customization, and worldwide crating.
          </p>
        </div>

        <div className="faqs-container">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const questionText = faq.question || faq.q || `Question ${idx + 1}`;
            const answerText = faq.answer || faq.a || '';

            return (
              <div key={idx} className={`faq-item ${isOpen ? 'active' : ''}`}>
                <button 
                  className="faq-question-btn" 
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  type="button"
                >
                  <span className="faq-question-text">{questionText}</span>
                  <span className="faq-icon-toggle">
                    <ChevronDown size={18} />
                  </span>
                </button>

                {isOpen && (
                  <div className="faq-answer">
                    <p>{answerText}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="faq-contact-card">
          <div className="faq-contact-info">
            <div className="faq-contact-icon">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="faq-contact-title">Have a specific architectural or custom stone inquiry?</h4>
              <p className="faq-contact-subtitle">Speak directly with our senior stone artisans and CAD designers.</p>
            </div>
          </div>
          <a
            href="https://wa.me/919414000000?text=Hello%20Galaxy%20Marble,%20I%20have%20a%20question%20regarding%20marble%20customization%20and%20crating."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm faq-contact-btn"
          >
            <MessageCircle size={16} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};

