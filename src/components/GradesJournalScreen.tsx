import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { SubjectGrade } from "../types";

interface GradesJournalScreenProps {
  grades: SubjectGrade[];
  gpa: number;
  onBack: () => void;
}

export const GradesJournalScreen: React.FC<GradesJournalScreenProps> = ({
  grades,
  gpa,
  onBack,
}) => {
  const [selectedSemester, setSelectedSemester] = useState<number>(3); // 3rd semester (2nd year)

  const totalCredits = grades.reduce((acc, curr) => acc + curr.credits, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Академический журнал</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* GPA Summary Card */}
        <View style={styles.gpaHeroCard}>
          <View>
            <Text style={styles.gpaHeroSubtitle}>ТРАНСКРИПТ AITU / PLATONUS</Text>
            <Text style={styles.gpaHeroValue}>★ {gpa.toFixed(2)}</Text>
            <Text style={styles.gpaHeroHint}>
              Отличная академическая успеваемость • Повышенная стипендия
            </Text>
          </View>
          <View style={styles.creditsPill}>
            <Text style={styles.creditsNum}>{totalCredits}</Text>
            <Text style={styles.creditsLabel}>ECTS КРЕДИТОВ</Text>
          </View>
        </View>

        {/* Semester Filter Tabs */}
        <View style={styles.semesterRow}>
          {[1, 2, 3, 4].map((sem) => (
            <TouchableOpacity
              key={sem}
              style={[
                styles.semTab,
                selectedSemester === sem && styles.semTabActive,
              ]}
              onPress={() => setSelectedSemester(sem)}
            >
              <Text
                style={[
                  styles.semTabText,
                  selectedSemester === sem && styles.semTabTextActive,
                ]}
              >
                Семестр {sem}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Subject Grades List */}
        <Text style={styles.sectionTitle}>Дисциплины семестра</Text>

        {grades.map((item) => (
          <View key={item.id} style={styles.gradeCard}>
            <View style={styles.gradeHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.subjectCode}>{item.code} • {item.credits} ECTS</Text>
                <Text style={styles.subjectName}>{item.subject}</Text>
                <Text style={styles.profName}>{item.professor}</Text>
              </View>
              <View style={styles.letterBadge}>
                <Text style={styles.letterGrade}>{item.letterGrade}</Text>
                <Text style={styles.totalScore}>{item.total}/100</Text>
              </View>
            </View>

            {/* Assessment Breakdown: РК-1, РК-2, Сессия */}
            <View style={styles.breakdownRow}>
              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownLabel}>РК-1 (30%)</Text>
                <Text style={styles.breakdownScore}>{item.rk1}</Text>
              </View>
              <View style={styles.breakdownDivider} />
              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownLabel}>РК-2 (30%)</Text>
                <Text style={styles.breakdownScore}>{item.rk2}</Text>
              </View>
              <View style={styles.breakdownDivider} />
              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownLabel}>Экзамен (40%)</Text>
                <Text style={styles.breakdownScore}>{item.exam}</Text>
              </View>
              <View style={styles.breakdownDivider} />
              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownLabel}>Посещаемость</Text>
                <Text style={[styles.breakdownScore, { color: "#10B981" }]}>
                  {item.attendanceRate}%
                </Text>
              </View>
            </View>

            {/* Progress bar */}
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${Math.min(item.total, 100)}%`,
                    backgroundColor:
                      item.total >= 90
                        ? "#10B981"
                        : item.total >= 75
                        ? "#00E5FF"
                        : item.total >= 50
                        ? "#F59E0B"
                        : "#EF4444",
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#070A11",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 8,
  },
  backButtonText: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "600",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  headerSpacer: {
    width: 50,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  gpaHeroCard: {
    backgroundColor: "#111827",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 229, 255, 0.3)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  gpaHeroSubtitle: {
    fontSize: 10,
    fontWeight: "800",
    color: "#00E5FF",
    letterSpacing: 1,
  },
  gpaHeroValue: {
    fontSize: 34,
    fontWeight: "900",
    color: "#FFFFFF",
    marginVertical: 4,
  },
  gpaHeroHint: {
    fontSize: 11,
    color: "#94A3B8",
    maxWidth: 200,
  },
  creditsPill: {
    backgroundColor: "rgba(0, 229, 255, 0.1)",
    borderWidth: 1,
    borderColor: "#00E5FF",
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
  },
  creditsNum: {
    fontSize: 22,
    fontWeight: "900",
    color: "#00E5FF",
  },
  creditsLabel: {
    fontSize: 9,
    fontWeight: "700",
    color: "#CBD5E1",
    marginTop: 2,
  },
  semesterRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  semTab: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#111827",
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  semTabActive: {
    backgroundColor: "rgba(0, 229, 255, 0.15)",
    borderColor: "#00E5FF",
  },
  semTabText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
  },
  semTabTextActive: {
    color: "#00E5FF",
    fontWeight: "700",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  gradeCard: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    marginBottom: 14,
  },
  gradeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  subjectCode: {
    fontSize: 10,
    fontWeight: "700",
    color: "#64748B",
    letterSpacing: 0.5,
  },
  subjectName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 2,
  },
  profName: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 2,
  },
  letterBadge: {
    alignItems: "flex-end",
  },
  letterGrade: {
    fontSize: 22,
    fontWeight: "900",
    color: "#00E5FF",
  },
  totalScore: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "600",
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  breakdownItem: {
    alignItems: "center",
    flex: 1,
  },
  breakdownLabel: {
    fontSize: 10,
    color: "#64748B",
    marginBottom: 2,
  },
  breakdownScore: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  breakdownDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  progressBarBg: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.06)",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
  },
});
