import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './shared/components/layout/AppLayout';
import LandingScreen from './screens/LandingScreen';
import HomeScreen from './screens/HomeScreen';
import AssessmentsScreen from './screens/AssessmentsScreen';
import StandardAssessment from './features/assessments/big-five/components/StandardAssessment';
import AllResultsScreen from './screens/AllResultsScreen';
import ComprehensiveAssessment from './features/assessments/big-five/components/ComprehensiveAssessment';
import ResultsRouter from './screens/ResultsRouter';
import AssessmentConfigModal from './shared/components/assessment/AssessmentConfigModal';
import { useStore } from './core/store/useStore';
import ShortAssessment from './features/assessments/big-five/components/ShortAssessment';

function App() {
  const { currentUserId, assessmentConfigModal, closeAssessmentConfigModal } = useStore();
  
  return (
    <>
      <Routes>
        <Route
          path="/landing"
          element={currentUserId ? <Navigate to="/" replace /> : <LandingScreen />}
        />
        <Route
          path="/"
          element={
            <AppLayout>
              {currentUserId ? <HomeScreen /> : <Navigate to="/landing" replace />}
            </AppLayout>
          }
        />
        <Route
          path="/assessments"
          element={
            <AppLayout>
              {currentUserId ? <AssessmentsScreen /> : <Navigate to="/landing" replace />}
            </AppLayout>
          }
        />
        <Route
          path="/results"
          element={
            <AppLayout>
              {currentUserId ? <AllResultsScreen /> : <Navigate to="/landing" replace />}
            </AppLayout>
          }
        />
        <Route path="/big-five-standard/:assessmentId" element={<StandardAssessment />} />
        <Route path="/big-five-short/:assessmentId" element={<ShortAssessment />} />
        <Route path="/big-five-comprehensive/:assessmentId" element={<ComprehensiveAssessment />} />
        <Route
          path="/results/:assessmentId"
          element={
            <AppLayout>
              {currentUserId ? <ResultsRouter /> : <Navigate to="/landing" replace />}
            </AppLayout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Assessment Config Modal */}
      <AssessmentConfigModal 
        isOpen={assessmentConfigModal.isOpen}
        onClose={closeAssessmentConfigModal}
        category={assessmentConfigModal.category}
      />
    </>
  );
}

export default App;