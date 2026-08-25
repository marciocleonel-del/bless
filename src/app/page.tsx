'use client';

import React, { useState } from 'react';
import { Hero } from '@/components/home/Hero';
import { ProductCatalog } from '@/components/catalog/ProductCatalog';
import { TechComparison } from '@/components/home/TechComparison';
import { HowItWorks } from '@/components/home/HowItWorks';
import { ShowcaseGallery } from '@/components/home/ShowcaseGallery';
import { B2BQuoteSection } from '@/components/home/B2BQuoteSection';
import { Testimonials } from '@/components/home/Testimonials';
import { FAQSection } from '@/components/home/FAQSection';
import { OrderTrackerModal } from '@/components/layout/OrderTrackerModal';

export default function HomePage() {
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Official Bless Logo & CTAs */}
      <Hero />

      {/* Dynamic Filterable Catalog with Volume Calculator */}
      <ProductCatalog />

      {/* Technological Analysis: Sublimação HD vs Laser Fibra/CO2 */}
      <TechComparison />

      {/* Step-by-Step Workflow */}
      <HowItWorks />

      {/* Finished Works Showcase / Portfolio */}
      <ShowcaseGallery />

      {/* Corporate B2B Quote Section */}
      <B2BQuoteSection />

      {/* Testimonials & Social Proof */}
      <Testimonials />

      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* Order Status Simulation Modal */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
      />
    </div>
  );
}
