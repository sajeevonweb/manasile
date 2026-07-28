import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import { faqItems } from '@/shared/data/faqData';
import SEO from '@/shared/components/SEO';

export default function FaqScreen() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO title="Frequently Asked Questions | Manasile" description="Find answers to common questions about Manasile assessments, privacy, pricing, and more." />
      <div className="mx-auto px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-700 mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Frequently Asked Questions</h1>
          </div>

          <div className="divide-y divide-gray-100">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={item.q} className="px-6">
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between gap-4 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-gray-900">{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''
                        }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="pb-4 text-gray-600 leading-relaxed">{item.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}