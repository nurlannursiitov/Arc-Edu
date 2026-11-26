import { SubjectGrade } from '../types';

/**
 * Academic GPA & Grade Evaluation Engine
 * Standards based on Astana IT University (AITU) / Platonus ECTS grading scale.
 */

export interface GpaCalculationResult {
  gpa: number;
  totalCredits: number;
  earnedCredits: number;
  honorsEligible: boolean;
  academicStanding: 'Excellent' | 'Good' | 'Satisfactory' | 'Probation';
}

export class AcademicService {
  /**
   * Convert 100-point total score into letter grade and GPA point
   */
  static evaluateScore(score: number): { letter: string; gpaPoint: number } {
    if (score >= 95) return { letter: 'A', gpaPoint: 4.0 };
    if (score >= 90) return { letter: 'A-', gpaPoint: 3.67 };
    if (score >= 85) return { letter: 'B+', gpaPoint: 3.33 };
    if (score >= 80) return { letter: 'B', gpaPoint: 3.0 };
    if (score >= 75) return { letter: 'B-', gpaPoint: 2.67 };
    if (score >= 70) return { letter: 'C+', gpaPoint: 2.33 };
    if (score >= 65) return { letter: 'C', gpaPoint: 2.0 };
    if (score >= 60) return { letter: 'C-', gpaPoint: 1.67 };
    if (score >= 55) return { letter: 'D+', gpaPoint: 1.33 };
    if (score >= 50) return { letter: 'D', gpaPoint: 1.0 };
    return { letter: 'F', gpaPoint: 0.0 };
  }

  /**
   * Calculate cumulative GPA according to ECTS weighted formula:
   * GPA = Sum(Credits * GradePoints) / Sum(Credits)
   */
  static calculateCumulativeGpa(grades: SubjectGrade[]): GpaCalculationResult {
    let totalWeightedPoints = 0;
    let totalCredits = 0;
    let earnedCredits = 0;

    for (const item of grades) {
      totalCredits += item.credits;
      const { gpaPoint } = this.evaluateScore(item.total);
      totalWeightedPoints += item.credits * gpaPoint;

      if (item.total >= 50) {
        earnedCredits += item.credits;
      }
    }

    const gpa = totalCredits > 0 ? parseFloat((totalWeightedPoints / totalCredits).toFixed(2)) : 0;

    let academicStanding: 'Excellent' | 'Good' | 'Satisfactory' | 'Probation' = 'Satisfactory';
    if (gpa >= 3.67) academicStanding = 'Excellent';
    else if (gpa >= 3.0) academicStanding = 'Good';
    else if (gpa < 2.0) academicStanding = 'Probation';

    return {
      gpa,
      totalCredits,
      earnedCredits,
      honorsEligible: gpa >= 3.8 && earnedCredits === totalCredits,
      academicStanding,
    };
  }

  /**
   * Determine scholarship qualification (grant holders)
   */
  static isScholarshipQualified(grades: SubjectGrade[]): { qualified: boolean; reason: string } {
    for (const g of grades) {
      if (g.total < 70) {
        return {
          qualified: false,
          reason: `Оценка по дисциплине "${g.subject || g.title}" ниже порога (C+)`,
        };
      }
    }
    return {
      qualified: true,
      reason: 'Все дисциплины сданы на "хорошо" и "отлично"',
    };
  }
}
