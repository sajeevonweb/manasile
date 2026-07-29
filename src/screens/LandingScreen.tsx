import { useState } from 'react';
import { Brain, Lock, Layers, Heart, ChevronDown } from 'lucide-react';
import logo from "../assets/images/logo.svg";
import StartAssessmentButton from '@/shared/components/assessment/StartAssessmentButton';
import { BIG_FIVE_TRAITS } from '../features/assessments/big-five/data/bigFiveTraits';
import { faqItems } from '@/shared/data/faqData';
import { Link } from 'react-router-dom';
import heroImage from "../assets/images/hero-image.webp";
import SEO from '@/shared/components/SEO';

const traits = [
  { label: 'Openness', value: 78, key: 'openness' },
  { label: 'Conscientiousness', value: 62, key: 'conscientiousness' },
  { label: 'Extraversion', value: 45, key: 'extraversion' },
  { label: 'Agreeableness', value: 83, key: 'agreeableness' },
  { label: 'Neuroticism', value: 31, key: 'neuroticism' },
] as const;

const features = [
  {
    icon: Lock,
    title: 'Fully private',
    desc: 'No sign-up, no tracking. Results stay on your device forever.',
    bg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
  },
  {
    icon: Heart,
    title: 'Completely free',
    desc: 'Every assessment, every variant, every result. No paywall, no premium tier.',
    bg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
  },
  {
    icon: Layers,
    title: 'Three depths',
    desc: (
      <>
        The Big Five test comes in three lengths —{' '}
        <span className="font-medium text-gray-700">Short</span> (25 q's) for a quick snapshot,{' '}
        <span className="font-medium text-gray-700">Standard</span> (50 q's) for a balanced read, or{' '}
        <span className="font-medium text-gray-700">Comprehensive</span> (120 q's) for the full picture.
      </>
    ),
    bg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-sm font-medium text-gray-900">{question}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-3">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function LandingScreen() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SEO
        title="Private Big Five Personality Test (No Sign-Up) | Manasile"
        description="Take a 100% private Big Five personality test with no sign-up or email required. Your responses and results stay locally on your device for absolute privacy."
      />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm px-6 py-3 flex flex-wrap items-center justify-between">
        <Link to="/landing" className="flex items-center">
          <img src={logo} alt="Manasile Logo" className="w-36 h-auto" />
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-cyan-600 transition-colors">About</Link>
          <Link to="/faq" className="text-sm font-medium text-gray-600 hover:text-cyan-600 transition-colors">FAQ</Link>
        </nav>
      </header>

      {/* Page body */}
      <div className="flex-1 flex flex-col items-center p-4 sm:p-8 pt-10">
        <div className="w-full max-w-5xl">

          {/* Hero */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center mb-8">

            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-cyan-600 bg-cyan-50 px-3 py-1.5 rounded-full mb-4">
                <Brain className="w-3.5 h-3.5" /> Psychology-Backed Assessments
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-3">
                Understand yourself<br />
                <span className="text-cyan-600">better than ever</span>
              </h1>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                A growing collection of psychology-based assessments to help you explore your
                personality, behaviour, and mental patterns. Private, free, and built with care.
              </p>
            </div>

            {/* Hero image */}
            <div className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden bg-gray-100 aspect-[16/9]">
              <img
                src={heroImage}
                alt="Person sitting on rocks watching the sunset over the ocean"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Available now + Sample Result */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-cyan-600">Available now</h2>
              <span className="text-xs text-gray-400">More coming soon</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
              {/* Big Five card */}
              <StartAssessmentButton category="big-five" variant="minimalist" className="h-full" />

              {/* Sample Result */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col justify-center">
                <div className="mb-4">
                  <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-0.5">
                    Sample result
                  </p>
                  <p className="text-xs text-gray-400">Big Five Personality Test</p>
                </div>
                <div className="space-y-3">
                  {traits.map(({ label, value, key }) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <span className="text-sm text-gray-500 sm:w-36 sm:shrink-0">{label}</span>
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${value}%`, backgroundColor: BIG_FIVE_TRAITS[key].color }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700 w-7 text-right">{value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-14">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Why Manasile</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map(({ icon: Icon, title, desc, bg, iconColor }) => (
                <div key={title} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                  <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center mb-3`}>
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">{title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-10">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Frequently asked questions</h2>
            <div className="space-y-2">
              {faqItems.slice(0, 6).map(({ q, a }) => (
                <FaqItem key={q} question={q} answer={a} />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-400">
              All your data is stored locally on your device
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Link to="/about" className="text-xs text-gray-400 hover:text-cyan-600 underline">
                About
              </Link>
              <Link to="/faq" className="text-xs text-gray-400 hover:text-cyan-600 underline">
                FAQ
              </Link>
              <Link to="/terms" className="text-xs text-gray-400 hover:text-cyan-600 underline">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}