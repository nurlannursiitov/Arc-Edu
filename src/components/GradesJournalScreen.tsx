import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useResponsive } from '../hooks/useResponsive';
import Svg, { Circle } from 'react-native-svg';
import { Award, CheckCircle2 } from 'lucide-react-native';
import { StudentProfile, SubjectGrade } from '../types';
import { COLORS, FONT_FAMILY, RADIUS } from '../theme/tokens';
import { AppShell } from './ui/AppShell';
import { AcademicService } from '../services/academicService';

interface GradesJournalScreenProps {
  student: StudentProfile;
  grades: SubjectGrade[];
  gpa: number;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onBack: () => void;
}

export const GradesJournalScreen: React.FC<GradesJournalScreenProps> = ({
  student,
  grades,
  gpa,
  currentPage,
  onNavigate,
  onLogout,
  onBack,
}) => {
  const { isDesktop } = useResponsive();
  const [selectedSemester, setSelectedSemester] = useState<number>(3);

  const summary = AcademicService.calculateCumulativeGpa(grades);
  const scholarship = AcademicService.isScholarshipQualified(grades);
  const displayGpa = gpa || summary.gpa;

  // SVG Ring progress
  const size = 86;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(Math.max(displayGpa / 4.0, 0), 1);
  const strokeDashoffset = circumference * (1 - pct);

  return (
    <AppShell
      currentPage={currentPage}
      onNavigate={onNavigate}
      onLogout={onLogout}
      student={student}
      title="Академический журнал"
      subtitle="Транскрипт AITU, рубежный контроль и расчёт GPA"
      onBack={onBack}
    >
      {/* Hero GPA Card */}
      <View style={styles.heroCard}>
        <View style={styles.ringWrap}>
          <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={stroke}
              fill="none"
            />
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={COLORS.accent}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              fill="none"
            />
          </Svg>
          <View style={styles.ringCenter}>
            <Text style={styles.ringValue}>{displayGpa.toFixed(2)}</Text>
            <Text style={styles.ringMax}>/ 4.0</Text>
          </View>
        </View>

        <View style={styles.heroBody}>
          <View style={styles.heroTagRow}>
            <Award size={13} color={COLORS.accent} strokeWidth={2} />
            <Text style={styles.heroTagText}>ТРАНСКРИПТ PLATONUS</Text>
          </View>
          <Text style={styles.heroHeading}>
            {scholarship.qualified ? 'Повышенная стипендия · Грант' : 'Базовый статус'}
          </Text>
          <Text style={styles.heroSub}>{scholarship.reason}</Text>
        </View>

        <View style={styles.creditsBox}>
          <Text style={styles.creditsNum}>{summary.totalCredits}</Text>
          <Text style={styles.creditsLabel}>ECTS кредитов</Text>
        </View>
      </View>

      {/* Semester Filter */}
      <View style={styles.semesterRow}>
        {[1, 2, 3, 4].map((sem) => {
          const active = selectedSemester === sem;
          return (
            <TouchableOpacity
              key={sem}
              style={[styles.semTab, active && styles.semTabActive]}
              onPress={() => setSelectedSemester(sem)}
              activeOpacity={0.78}
            >
              <Text style={[styles.semTabText, active && styles.semTabTextActive]}>
                Семестр {sem}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Subjects Grid */}
      <View style={styles.subjectsGrid}>
        {grades.map((item) => {
          const evalGrade = AcademicService.evaluateScore(item.total);
          const barColor =
            item.total >= 90
              ? COLORS.accent
              : item.total >= 75
              ? COLORS.info
              : COLORS.warning;

          return (
            <View
              key={item.id}
              style={[styles.gradeCard, isDesktop && styles.gradeCardDesktop]}
            >
              <View style={styles.gradeHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subjectCode}>
                    {item.code} · {item.credits} ECTS
                  </Text>
                  <Text style={styles.subjectName}>{item.subject}</Text>
                  <Text style={styles.profName}>{item.professor}</Text>
                </View>

                <View style={styles.letterPill}>
                  <Text style={styles.letterGrade}>{item.letterGrade || evalGrade.letter}</Text>
                  <Text style={styles.totalScore}>{item.total}/100</Text>
                </View>
              </View>

              <View style={styles.breakdownRow}>
                <View style={styles.breakdownCell}>
                  <Text style={styles.breakdownLabel}>РК-1</Text>
                  <Text style={styles.breakdownScore}>{item.rk1}</Text>
                </View>
                <View style={styles.breakdownDiv} />
                <View style={styles.breakdownCell}>
                  <Text style={styles.breakdownLabel}>РК-2</Text>
                  <Text style={styles.breakdownScore}>{item.rk2}</Text>
                </View>
                <View style={styles.breakdownDiv} />
                <View style={styles.breakdownCell}>
                  <Text style={styles.breakdownLabel}>Экзамен</Text>
                  <Text style={styles.breakdownScore}>{item.exam}</Text>
                </View>
                <View style={styles.breakdownDiv} />
                <View style={styles.breakdownCell}>
                  <Text style={styles.breakdownLabel}>Посещ.</Text>
                  <View style={styles.attRow}>
                    <CheckCircle2 size={11} color={COLORS.accent} strokeWidth={2} />
                    <Text style={[styles.breakdownScore, { color: COLORS.accentBright }]}>
                      {item.attendanceRate}%
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${Math.min(item.total, 100)}%`, backgroundColor: barColor },
                  ]}
                />
              </View>
            </View>
          );
        })}
      </View>
    </AppShell>
  );
};

const styles = StyleSheet.create({
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    gap: 18,
    marginBottom: 18,
    flexWrap: 'wrap',
  },
  ringWrap: {
    width: 86,
    height: 86,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringCenter: {
    position: 'absolute',
    alignItems: 'center',
  },
  ringValue: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.mono,
  },
  ringMax: {
    color: COLORS.textTertiary,
    fontSize: 10,
    fontFamily: FONT_FAMILY.mono,
  },
  heroBody: {
    flex: 1,
    minWidth: 180,
    gap: 4,
  },
  heroTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heroTagText: {
    color: COLORS.accentBright,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    fontFamily: FONT_FAMILY.sans,
  },
  heroHeading: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  heroSub: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontFamily: FONT_FAMILY.sans,
  },
  creditsBox: {
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  creditsNum: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.mono,
  },
  creditsLabel: {
    color: COLORS.textTertiary,
    fontSize: 10,
    marginTop: 2,
    fontFamily: FONT_FAMILY.sans,
  },

  semesterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },
  semTab: {
    flex: 1,
    paddingVertical: 9,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  semTabActive: {
    backgroundColor: COLORS.surfaceElevated,
    borderColor: COLORS.borderAccent,
  },
  semTabText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.sans,
  },
  semTabTextActive: {
    color: COLORS.accentBright,
    fontWeight: '600',
  },

  subjectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
  },
  gradeCard: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    gap: 14,
  },
  gradeCardDesktop: {
    width: '49%',
  },
  gradeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  subjectCode: {
    color: COLORS.textTertiary,
    fontSize: 11,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.mono,
  },
  subjectName: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    marginTop: 3,
    fontFamily: FONT_FAMILY.sans,
  },
  profName: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 3,
    fontFamily: FONT_FAMILY.sans,
  },
  letterPill: {
    backgroundColor: COLORS.accentSoft,
    borderWidth: 1,
    borderColor: COLORS.borderAccent,
    borderRadius: RADIUS.md,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    minWidth: 54,
  },
  letterGrade: {
    color: COLORS.accentBright,
    fontSize: 17,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.sans,
  },
  totalScore: {
    color: COLORS.textSecondary,
    fontSize: 10,
    fontFamily: FONT_FAMILY.mono,
  },
  breakdownRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.bg,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  breakdownCell: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  breakdownLabel: {
    color: COLORS.textTertiary,
    fontSize: 10,
    fontFamily: FONT_FAMILY.sans,
  },
  breakdownScore: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.mono,
  },
  attRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  breakdownDiv: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
});
