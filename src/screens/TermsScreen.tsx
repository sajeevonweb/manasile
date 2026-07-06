import { Link,useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function TermsScreen() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
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
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Terms and Conditions</h1>
          </div>
          <div className="px-6 py-6 text-gray-700 leading-relaxed">
            <p className="mb-4 text-sm text-gray-500">Last updated: June 14, 2026</p>

            <p className="mb-4">
              Please read these Terms and Conditions ("Terms") carefully before using
              Manasile (the "Service"). By accessing or using the Service, you agree to be
              bound by these Terms. If you do not agree, please do not use the Service.
            </p>

            <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">1. Not Medical or Professional Advice</h2>
            <p className="mb-4">
              Manasile provides self-assessment tools based on general psychological
              frameworks (such as the Big Five personality model) for informational and
              educational purposes only. The Service is not a substitute for professional
              psychological, psychiatric, medical, or other licensed advice, diagnosis, or
              treatment. Results should not be relied upon as a clinical assessment of any
              kind. Always seek the advice of a qualified mental health professional with
              any questions you may have regarding a medical or psychological condition.
            </p>

            <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">2. No Warranties</h2>
            <p className="mb-4">
              The Service is provided "as is" and "as available" without warranties of any
              kind, whether express or implied, including but not limited to warranties of
              accuracy, reliability, fitness for a particular purpose, or
              non-infringement. We do not guarantee that the Service will be uninterrupted or
              error-free.
            </p>

            <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">3. Your Data and Storage</h2>
            <p className="mb-4">
              Manasile stores all data locally on your device. You are solely responsible
              for managing, backing up, and securing your own data. We are not responsible
              for any loss of data resulting from clearing browser storage, browser
              updates, device changes, or any other cause.
            </p>

            <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">4. Limitation of Liability</h2>
            <p className="mb-4">
              To the fullest extent permitted by applicable law, in no event shall
              Manasile, its creators, or contributors be liable for any indirect,
              incidental, special, consequential, or punitive damages, or any loss of
              data, arising out of or related to your use of, or inability to use, the
              Service, even if advised of the possibility of such damages.
            </p>

            <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">5. Acceptable Use</h2>
            <p className="mb-4">
              You agree to use the Service only for lawful purposes and in a way that does
              not infringe the rights of, restrict, or inhibit anyone else's use and
              enjoyment of the Service. You agree not to attempt to interfere with the
              proper functioning of the Service in any way.
            </p>

            <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">6. Intellectual Property</h2>
            <p className="mb-4">
              Manasile is open-source software made available under the license included
              in its{' '}
              <a
                href="https://github.com/sajeevonweb/manasile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-600 hover:text-cyan-700 underline"
              >
                source code repository
              </a>. All trademarks, logos, and brand names used on the Service belong to
              their respective owners.
            </p>

            <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">7. Changes to the Service and Terms</h2>
            <p className="mb-4">
              We may update, modify, or discontinue the Service, or update these Terms, at
              any time without prior notice. Continued use of the Service after any such
              changes constitutes your acceptance of the new Terms.
            </p>

            <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">8. Contact</h2>
            <p>
              If you have any questions about these Terms, please reach out via the{' '}
              <Link to="/feedback" className="text-cyan-600 hover:text-cyan-700 underline">
                Feedback page
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}