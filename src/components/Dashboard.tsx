import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { StudentProfile, Classroom } from "../types";

interface DashboardProps {
  student: StudentProfile;
  activeClassroom: Classroom;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  student,
  activeClassroom,
  onNavigate,
  onLogout,
}) => {
  const [cardFlipped, setCardFlipped] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {student.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </Text>
            </View>
            <View>
              <Text style={styles.greeting}>С возвращением,</Text>
              <Text style={styles.userName}>{student.fullName}</Text>
              <Text style={styles.userRole}>
                {student.group} • {student.major}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.headerIconBtn}
            onPress={() => onNavigate("settings")}
          >
            <Text style={styles.headerIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Freedom VIP Student Card Widget */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.cardContainer}
          onPress={() => setCardFlipped(!cardFlipped)}
        >
          <View style={[styles.vipCard, cardFlipped ? styles.vipCardBack : {}]}>
            <View style={styles.cardGlowOverlay} />
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.bankName}>FREEDOM BANK × AITU</Text>
                <Text style={styles.cardTier}>STUDENT BLACK VIP PASS</Text>
              </View>
              <View style={styles.nfcPill}>
                <Text style={styles.nfcText}>📶 NFC & EMV</Text>
              </View>
            </View>

            {!cardFlipped ? (
              <>
                <View style={styles.cardBody}>
                  <Text style={styles.cardNumber}>{student.cardDetails.cardNumber}</Text>
                  <View style={styles.cardMetaRow}>
                    <View>
                      <Text style={styles.metaLabel}>БАЛАНС КАРТЫ</Text>
                      <Text style={styles.metaValue}>
                        {student.cardDetails.balance.toLocaleString("ru-RU")} ₸
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.metaLabel}>СТИПЕНДИЯ</Text>
                      <Text style={[styles.metaValue, { color: "#10B981" }]}>
                        +{student.cardDetails.scholarshipAmount.toLocaleString("ru-RU")} ₸
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.metaLabel}>ТЕКУЩИЙ GPA</Text>
                      <Text style={[styles.metaValue, { color: "#00E5FF" }]}>
                        ★ {student.gpa.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <Text style={styles.cardHolder}>{student.fullName.toUpperCase()}</Text>
                  <Text style={styles.cardExpires}>{student.cardDetails.expiresMonthYear}</Text>
                </View>
              </>
            ) : (
              <View style={styles.cardBackBody}>
                <View style={styles.magneticStrip} />
                <View style={styles.barcodeArea}>
                  <Text style={styles.barcodeText}>||| | |||| | ||| |||||| | |||| |</Text>
                  <Text style={styles.barcodeLabel}>BARCODE ID: {student.studentId}</Text>
                </View>
                <Text style={styles.cardHint}>Нажмите, чтобы перевернуть на лицевую сторону</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        {/* Live Classroom / Lecture Notification Banner */}
        <View style={styles.activeLectureCard}>
          <View style={styles.lectureStatusRow}>
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>ИДЕТ ПАРА ПРЯМО СЕЙЧАС</Text>
            </View>
            <Text style={styles.auditoriumBadge}>Каб. {activeClassroom.number}</Text>
          </View>
          <Text style={styles.lectureSubject}>{activeClassroom.currentSubject}</Text>
          <Text style={styles.lectureProfessor}>Преподаватель: {activeClassroom.professor}</Text>
          <View style={styles.lectureMetaRow}>
            <Text style={styles.lectureTime}>⏰ {activeClassroom.timeSlot}</Text>
            <TouchableOpacity
              style={styles.quickCheckInBtn}
              onPress={() => onNavigate("attendance")}
            >
              <Text style={styles.quickCheckInBtnText}>Отметиться через Radar →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* BankApp Grid Menu */}
        <Text style={styles.sectionTitle}>Учебные сервисы & Сервисы Кампуса</Text>
        <View style={styles.gridMenu}>
          {/* Digital ID */}
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => onNavigate("digital-id")}
          >
            <View style={[styles.iconCircle, { backgroundColor: "rgba(0, 229, 255, 0.15)" }]}>
              <Text style={styles.gridIcon}>🪪</Text>
            </View>
            <Text style={styles.gridItemTitle}>Digital ID</Text>
            <Text style={styles.gridItemSub}>Пропуск и eGov</Text>
          </TouchableOpacity>

          {/* Attendance Radar */}
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => onNavigate("attendance")}
          >
            <View style={[styles.iconCircle, { backgroundColor: "rgba(16, 185, 129, 0.15)" }]}>
              <Text style={styles.gridIcon}>📡</Text>
            </View>
            <Text style={styles.gridItemTitle}>Radar Check-in</Text>
            <Text style={styles.gridItemSub}>60m Geofence</Text>
          </TouchableOpacity>

          {/* Grades / Platonus Journal */}
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => onNavigate("grades")}
          >
            <View style={[styles.iconCircle, { backgroundColor: "rgba(245, 158, 11, 0.15)" }]}>
              <Text style={styles.gridIcon}>📊</Text>
            </View>
            <Text style={styles.gridItemTitle}>Журнал & GPA</Text>
            <Text style={styles.gridItemSub}>РК-1, РК-2, Экзамен</Text>
          </TouchableOpacity>

          {/* Schedule */}
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => onNavigate("schedule")}
          >
            <View style={[styles.iconCircle, { backgroundColor: "rgba(99, 102, 241, 0.15)" }]}>
              <Text style={styles.gridIcon}>📅</Text>
            </View>
            <Text style={styles.gridItemTitle}>Расписание</Text>
            <Text style={styles.gridItemSub}>ПН - СБ пары</Text>
          </TouchableOpacity>

          {/* Syllabus & Wiki Search */}
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => onNavigate("syllabus")}
          >
            <View style={[styles.iconCircle, { backgroundColor: "rgba(236, 72, 153, 0.15)" }]}>
              <Text style={styles.gridIcon}>📚</Text>
            </View>
            <Text style={styles.gridItemTitle}>Силлабус & Wiki</Text>
            <Text style={styles.gridItemSub}>AI Конспекты</Text>
          </TouchableOpacity>

          {/* Teacher Cockpit */}
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => onNavigate("teacher")}
          >
            <View style={[styles.iconCircle, { backgroundColor: "rgba(168, 85, 247, 0.15)" }]}>
              <Text style={styles.gridIcon}>👨‍🏫</Text>
            </View>
            <Text style={styles.gridItemTitle}>Teacher Control</Text>
            <Text style={styles.gridItemSub}>Перенос аудитории</Text>
          </TouchableOpacity>

          {/* Freedom Student Perks */}
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => onNavigate("perks")}
          >
            <View style={[styles.iconCircle, { backgroundColor: "rgba(14, 165, 233, 0.15)" }]}>
              <Text style={styles.gridIcon}>🎁</Text>
            </View>
            <Text style={styles.gridItemTitle}>Freedom Perks</Text>
            <Text style={styles.gridItemSub}>Скидки & Кешбэк</Text>
          </TouchableOpacity>

          {/* Certificates */}
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => onNavigate("certificates")}
          >
            <View style={[styles.iconCircle, { backgroundColor: "rgba(20, 184, 166, 0.15)" }]}>
              <Text style={styles.gridIcon}>📜</Text>
            </View>
            <Text style={styles.gridItemTitle}>Справки eGov</Text>
            <Text style={styles.gridItemSub}>Заказ документов</Text>
          </TouchableOpacity>

          {/* Advisor Chat */}
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => onNavigate("chat")}
          >
            <View style={[styles.iconCircle, { backgroundColor: "rgba(244, 63, 94, 0.15)" }]}>
              <Text style={styles.gridIcon}>💬</Text>
            </View>
            <Text style={styles.gridItemTitle}>Эдвайзер & Деканат</Text>
            <Text style={styles.gridItemSub}>Чат поддержки</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions Footer */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={onLogout}
          >
            <Text style={styles.logoutBtnText}>Выйти из аккаунта</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#070A11",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0, 229, 255, 0.15)",
    borderWidth: 1.5,
    borderColor: "#00E5FF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#00E5FF",
    fontSize: 16,
    fontWeight: "800",
  },
  greeting: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
  },
  userName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  userRole: {
    fontSize: 12,
    color: "#94A3B8",
  },
  headerIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.05)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  headerIcon: {
    fontSize: 18,
  },
  cardContainer: {
    marginBottom: 20,
  },
  vipCard: {
    borderRadius: 22,
    backgroundColor: "#111827",
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(0, 229, 255, 0.3)",
    overflow: "hidden",
    minHeight: 200,
    justifyContent: "space-between",
    shadowColor: "#00E5FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  vipCardBack: {
    borderColor: "rgba(255, 255, 255, 0.2)",
    backgroundColor: "#0F172A",
  },
  cardGlowOverlay: {
    position: "absolute",
    right: -60,
    top: -60,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(0, 229, 255, 0.1)",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  bankName: {
    fontSize: 11,
    fontWeight: "800",
    color: "#00E5FF",
    letterSpacing: 1.5,
  },
  cardTier: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    marginTop: 2,
  },
  nfcPill: {
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  nfcText: {
    color: "#E2E8F0",
    fontSize: 11,
    fontWeight: "600",
  },
  cardBody: {
    marginVertical: 12,
  },
  cardNumber: {
    fontSize: 19,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    color: "#FFFFFF",
    letterSpacing: 3,
    marginBottom: 14,
    fontWeight: "600",
  },
  cardMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaLabel: {
    fontSize: 9,
    color: "#64748B",
    fontWeight: "700",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  metaValue: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
    paddingTop: 10,
  },
  cardHolder: {
    fontSize: 12,
    color: "#CBD5E1",
    fontWeight: "700",
    letterSpacing: 1,
  },
  cardExpires: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "600",
  },
  cardBackBody: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  magneticStrip: {
    width: "120%",
    height: 36,
    backgroundColor: "#000000",
    marginBottom: 16,
  },
  barcodeArea: {
    alignItems: "center",
    marginVertical: 8,
  },
  barcodeText: {
    fontSize: 22,
    color: "#FFFFFF",
    letterSpacing: 4,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  barcodeLabel: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "700",
    marginTop: 4,
  },
  cardHint: {
    fontSize: 11,
    color: "#00E5FF",
    marginTop: 8,
  },
  activeLectureCard: {
    backgroundColor: "rgba(15, 23, 42, 0.9)",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 229, 255, 0.25)",
    marginBottom: 24,
  },
  lectureStatusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
  },
  liveText: {
    color: "#10B981",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  auditoriumBadge: {
    backgroundColor: "rgba(0, 229, 255, 0.15)",
    color: "#00E5FF",
    fontSize: 12,
    fontWeight: "800",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  lectureSubject: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  lectureProfessor: {
    color: "#94A3B8",
    fontSize: 13,
    marginBottom: 10,
  },
  lectureMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
    paddingTop: 10,
  },
  lectureTime: {
    color: "#CBD5E1",
    fontSize: 12,
    fontWeight: "600",
  },
  quickCheckInBtn: {
    backgroundColor: "rgba(0, 229, 255, 0.1)",
    borderWidth: 1,
    borderColor: "#00E5FF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  quickCheckInBtnText: {
    color: "#00E5FF",
    fontSize: 12,
    fontWeight: "700",
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 14,
    letterSpacing: 0.2,
  },
  gridMenu: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
    marginBottom: 24,
  },
  gridItem: {
    width: "31%",
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  gridIcon: {
    fontSize: 22,
  },
  gridItemTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },
  gridItemSub: {
    fontSize: 10,
    color: "#64748B",
    textAlign: "center",
    marginTop: 2,
  },
  quickActions: {
    marginTop: 10,
  },
  logoutBtn: {
    paddingVertical: 14,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.3)",
    borderRadius: 14,
    alignItems: "center",
  },
  logoutBtnText: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "700",
  },
});
