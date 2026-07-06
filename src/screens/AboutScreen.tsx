import { Link,useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function AboutScreen() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto  px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
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
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">About Manasile</h1>
          </div>
          <div className="px-6 py-6 text-gray-700 leading-relaxed">
            <p className="mb-4">
              Manasile is a free, privacy-first platform that provides psychological assessments. Our goal is to make tools such as the Big Five personality test accessible to everyone without sign-ups, paywalls, or hidden data collection. 
            </p>

            <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Privacy by Design</h2>
            <p className="mb-4">
              Manasile runs entirely on your device. Your answers and results are stored locally on your device and are never transmitted to a server. Nothing about you or your responses is collected, tracked, or sold.
            </p>

            <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Open Source</h2>
            <p className="mb-4">
              Manasile is open source. You can review the code, suggest improvements, or
              contribute on{' '}
              <a
                href="https://github.com/sajeevonweb/manasile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-600 hover:text-cyan-700 underline"
              >
                GitHub
              </a>.
            </p>

            <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">More to Come</h2>
            <p>
              More assessments and improvements are on the way. We're continuously working to enhance the quality, usability, and reliability of the platform. Have an idea, suggestion, or feedback? Visit our{' '}
              <Link to="/feedback" className="text-cyan-600 hover:text-cyan-700 underline">
                Feedback page
              </Link>{' '}
              and let us know...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}