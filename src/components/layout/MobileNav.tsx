'use client'
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './mobile-nav.module.css'

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Get booking data from localStorage
  const getBookingData = () => {
    try {
      const service = JSON.parse(localStorage.getItem('selectedService') || '{}');
      return {
        price: service.price || 0,
      };
    } catch {
      return { price: 0 };
    }
  };

  const { price } = getBookingData();

  const steps = [
    { id: 'location', label: 'Location' },
    { id: 'service', label: 'Service' },
    { id: 'details', label: 'Details' },
    { id: 'confirmation', label: 'Confirmation' }
  ];

  const currentStepIndex = steps.findIndex(step => pathname.includes(step.id));

  return (
    <div className={styles.mobileNav}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.priceButton}>
        <span className={styles.priceText}>${price}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      <div className={styles.progressBar}>
        <div className={styles.progressTrack}>
          <div 
            className={styles.progressFill}
            style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
          />
        </div>
        <div className={styles.progressText}>
          Step {currentStepIndex + 1} of {steps.length}: {steps[currentStepIndex]?.label}
        </div>
      </div>

      {isOpen && (
        <div className={styles.summary}>
          <div className={styles.summaryContent}>
            {localStorage.getItem('selectedSuburb') && (
              <div className={styles.summarySection}>
                <h3 className={styles.sectionTitle}>Location</h3>
                <p className={styles.sectionText}>
                  {JSON.parse(localStorage.getItem('selectedSuburb') || '{}').name}
                </p>
              </div>
            )}
            {/* Similar pattern for Service and Date/Time sections */}
          </div>
        </div>
      )}
    </div>
  );
}
