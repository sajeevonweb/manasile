import { Shield, DollarSign } from 'lucide-react';
import logo from "../assets/images/logo.svg";
import StartAssessmentButton from '@/shared/components/assessment/StartAssessmentButton';

export default function LandingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center justify-center">
              <img
                src={logo}
                alt="Manasile Logo"
                className="w-48 h-auto"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center max-w-xl mx-auto">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Shield className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-900">Private</span>
            </div>
            
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-900">Free</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {/* <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Available Assessments</h2>
              <p className="text-gray-600">Click on any assessment to get started</p>
            </div> */}
            
            {/* Assessment Cards */}
            <div className="grid gap-4">
              <StartAssessmentButton category="big-five" variant="card" />

              {/* Placeholder for future tests */}
              {/* <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-5 text-center">
                <p className="text-sm text-gray-500">More assessments coming soon...</p>
              </div> */}
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-gray-500 mt-8 pt-4 border-t border-gray-200">
              All your data is stored locally on your device
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}