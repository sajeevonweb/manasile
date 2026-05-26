import Dexie, { type Table } from 'dexie';
import type { Language } from '../types/language.types';

export interface UserProfile {
  id?: number;
  name: string;
  age?: number;
  createdAt: Date;
}

export interface BigFiveScores {
  extraversion: number; // 0-100
  agreeableness: number; // 0-100
  conscientiousness: number; // 0-100
  neuroticism: number; // 0-100
  openness: number; // 0-100
}

export type AssessmentScores = BigFiveScores;

export interface Assessment {
  id?: number;
  userId: number;
  assessmentType: 'big-five-standard' | 'big-five-comprehensive'|'big-five-short';
  language: Language; 
  subjectName?: string;
  responses: Record<string, number>;
  /** Maps question id → facet key for the question set used in this assessment */
  questionFacets?: Record<string, string>;
  scores?: AssessmentScores;
  completedAt?: Date;
  createdAt: Date;
}

export class ManasileDB extends Dexie {
  userProfiles!: Table<UserProfile>;
  assessments!: Table<Assessment>;

  constructor() {
    super('ManasileDB');
    
    // Updated schema to version 2 to add language field
    this.version(2).stores({
      userProfiles: '++id, name, createdAt',
      assessments: '++id, userId, assessmentType, language, completedAt, createdAt'
    }).upgrade(tx => {
      // Migration: Set default language 'en' for existing assessments
      return tx.table<Assessment, number>('assessments').toCollection().modify((assessment) => {
        if (!assessment.language) {
          assessment.language = 'en';
        }
      });
    });
    
    // Keep old version for backward compatibility
    this.version(1).stores({
      userProfiles: '++id, name, createdAt',
      assessments: '++id, userId, assessmentType, completedAt, createdAt'
    });
  }
}

export const db = new ManasileDB();