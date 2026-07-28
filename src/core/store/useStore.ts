import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AssessmentCategory } from '../types/assessment.types';

interface AssessmentConfigModalState {
  isOpen: boolean;
  category?: AssessmentCategory;
}

interface AppState {
  currentUserId: number | null;
  setCurrentUserId: (id: number | null) => void;
  currentAssessment: string | null;
  setCurrentAssessment: (assessment: string | null) => void;
  assessmentConfigModal: AssessmentConfigModalState;
  setAssessmentConfigModal: (state: AssessmentConfigModalState) => void;
  closeAssessmentConfigModal: () => void;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      currentUserId: null,
      setCurrentUserId: (id) => set({ currentUserId: id }),
      currentAssessment: null,
      setCurrentAssessment: (assessment) => set({ currentAssessment: assessment }),
      assessmentConfigModal: { isOpen: false },
      setAssessmentConfigModal: (state) => set({ assessmentConfigModal: state }),
      closeAssessmentConfigModal: () => set({ assessmentConfigModal: { isOpen: false } }),
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: 'app-storage',
      // Don't persist modal state or hydration flag
      partialize: (state) => ({
        currentUserId: state.currentUserId,
        currentAssessment: state.currentAssessment,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);