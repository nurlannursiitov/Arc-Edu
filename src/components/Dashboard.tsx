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
  const [quickBalanceVisible, setQuickBalanceVisible] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Freedom VIP Navigation Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatarBorder}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {student.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </Text>
              </View>
            </View>
            <View>
              <View style={styles.greetingRow}>
                <Text style={styles.greeting}>ДОБРО ПОЖАЛОВАТЬ</Text>
                <View style={styles.vipStatusBadge}>
                  <Text style={styles.vipStatusText}>VIP PASS</Text>
                </View>
              </View>
              <Text style={styles.userName}>{student.fullName}</Text>
              <Text style={styles.userRole}>
                {student.group} • {student.major}
              </Text>
            </View>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.headerIconBtn}
              onPress={() => onNavigate("chat")}
            >
              <Text style={styles.headerIcon}>💬</Text>
              <View style={styles.iconDot} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.headerIconBtn}
              onPress={() => onNavigate("settings")}
            >
              <Text style={styles.headerIcon}>⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Freedom Finance VIP Luxury Metal Obsidian Card */}
        <TouchableOpacity
          activeOpacity={0.94}
          style={styles.cardContainer}
          onPress={() => setCardFlipped(!cardFlipped)}
        >
          <View style={[styles.vipCard, cardFlipped && styles.vipCardBack]}>
            {/* Ambient Multi-layer Glow */}
            <View style={styles.metalGlowTopRight} />
            <View style={styles.emeraldGlowBottomLeft} />
            <View style={styles.metalBorderGleam} />

            {/* Header: Freedom Brand & NFC Hologram */}
            <View style={styles.cardHeader}>
              <View>
                <View style={styles.brandRow}>
                  <View style={styles.freedomEmeraldDot} />
                  <Text style={styles.bankName}>FREEDOM BANK</Text>
                  <Text style={styles.brandDivider}>|</Text>
                  <Text style={styles.univBrand}>ASTANA IT</Text>
                </View>
                <Text style={styles.cardTier}>STUDENT OBSIDIAN VIP</Text>
              </View>

              <View style={styles.hologramPill}>
                <Text style={styles.hologramText}>📶 CONTACTLESS</Text>
              </View>
            </View>

            {!cardFlipped ? (
              /* CARD FRONT */
              <>
                <View style={styles.chipAndContactless}>
                  <View style={styles.goldChip}>
                    <View style={styles.chipGridHorizontal} />
                    <View style={styles.chipGridVertical} />
                    <View style={styles.chipCore} />
                  </View>
                  <View style={styles.freedomLogoBadge}>
                    <Text style={styles.freedomSymbol}>F</Text>
                  </View>
                </View>

                <View style={styles.cardBody}>
                  <Text style={styles.cardNumber}>
                    {quickBalanceVisible
                      ? student.cardDetails.cardNumber
                      : "•••• •••• •••• 9842"}
                  </Text>

                  <View style={styles.cardStatsGrid}>
                    <View style={styles.statCol}>
                      <Text style={styles.statLabel}>БАЛАНС КАРТЫ</Text>
                      <Text style={styles.statValueEmerald}>
                        {quickBalanceVisible
                          ? `${student.cardDetails.balance.toLocaleString("ru-RU")} ₸`
                          : "•••••• ₸"}
                      </Text>
                    </View>

                    <View style={styles.statCol}>
                      <Text style={styles.statLabel}>СТИПЕНДИЯ</Text>
                      <Text style={styles.statValue}>
                        +{student.cardDetails.scholarshipAmount.toLocaleString("ru-RU")} ₸
                      </Text>
                    </View>

                    <View style={styles.statCol}>
                      <Text style={styles.statLabel}>РЕЙТИНГ GPA</Text>
                      <View style={styles.gpaPill}>
                        <Text style={styles.gpaStar}>★</Text>
                        <Text style={styles.gpaText}>{student.gpa.toFixed(2)}</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <View>
                    <Text style={styles.cardHolderLabel}>CARDHOLDER</Text>
                    <Text style={styles.cardHolder}>{student.fullName.toUpperCase()}</Text>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={styles.cardHolderLabel}>EXPIRES</Text>
                    <Text style={styles.cardExpires}>{student.cardDetails.expiresMonthYear}</Text>
                  </View>
                </View>
              </>
            ) : (
              /* CARD BACK */
              <View style={styles.cardBackBody}>
                <View style={styles.magneticStrip} />
                <View style={styles.signatureAndCvv}>
                  <View style={styles.signatureBox}>
                    <Text style={styles.signatureText}>{student.fullName}</Text>
                  </View>
                  <View style={styles.cvvBox}>
                    <Text style={styles.cvvLabel}>CVV</Text>
                    <Text style={styles.cvvText}>784</Text>
                  </View>
                </View>

                <View style={styles.barcodeArea}>
                  <Text style={styles.barcodeLines}>|||| | ||| |||||| | |||| ||| ||||||</Text>
                  <Text style={styles.barcodeLabel}>
                    AITU BARCODE ID: {student.studentId}
                  </Text>
                </View>
                <Text style={styles.flipBackHint}>Нажмите для возврата на лицевую сторону</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        {/* Quick Balance Actions Bar (Freedom App style) */}
        <View style={styles.quickBar}>
          <TouchableOpacity
            style={styles.quickBarItem}
            onPress={() => setQuickBalanceVisible(!quickBalanceVisible)}
          >
            <Text style={styles.quickBarIcon}>{quickBalanceVisible ? "👁️" : "🙈"}</Text>
            <Text style={styles.quickBarLabel}>
              {quickBalanceVisible ? "Скрыть баланс" : "Показать"}
            </Text>
          </TouchableOpacity>

          <View style={styles.quickBarDivider} />

          <TouchableOpacity
            style={styles.quickBarItem}
            onPress={() => onNavigate("digital-id")}
          >
            <Text style={styles.quickBarIcon}>🪪</Text>
            <Text style={styles.quickBarLabel}>eGov Пропуск</Text>
          </TouchableOpacity>

          <View style={styles.quickBarDivider} />

          <TouchableOpacity
            style={styles.quickBarItem}
            onPress={() => onNavigate("perks")}
          >
            <Text style={styles.quickBarIcon}>🎁</Text>
            <Text style={styles.quickBarLabel}>Бонусы & Кешбэк</Text>
          </TouchableOpacity>
        </View>

        {/* Live Classroom / Lecture Notification Banner */}
        <View style={styles.activeLectureCard}>
          <View style={styles.lectureHeader}>
            <View style={styles.liveIndicator}>
              <View style={styles.pulsingDot} />
              <Text style={styles.liveText}>ТЕКУЩЕЕ ЗАНЯТИЕ В КАМПУСЕ</Text>
            </View>
            <View style={styles.auditoriumPill}>
              <Text style={styles.auditoriumText}>Каб. {activeClassroom.number}</Text>
            </View>
          </View>

          <Text style={styles.lectureSubject}>{activeClassroom.currentSubject}</Text>
          <Text style={styles.lectureProfessor}>
            Преподаватель: {activeClassroom.professor}
          </Text>

          <View style={styles.lectureFooter}>
            <View style={styles.timeTag}>
              <Text style={styles.timeTagText}>⏰ {activeClassroom.timeSlot}</Text>
            </View>
            <TouchableOpacity
              style={styles.quickCheckInBtn}
              onPress={() => onNavigate("attendance")}
            >
              <Text style={styles.quickCheckInText}>Radar Check-In ➔</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* BankApp Grid Menu */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Сервисы экосистемы Arc Edu</Text>
          <Text style={styles.sectionCounter}>9 сервисов</Text>
        </View>

        <View style={styles.gridMenu}>
          {/* Digital ID */}
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => onNavigate("digital-id")}
          >
            <View style={[styles.iconCircle, { backgroundColor: "rgba(0, 209, 116, 0.12)", borderColor: "rgba(0, 209, 116, 0.3)" }]}>
              <Text style={styles.gridIcon}>🪪</Text>
            </View>
            <Text style={styles.gridItemTitle}>Digital ID</Text>
            <Text style={styles.gridItemSub}>eGov & Пропуск</Text>
          </TouchableOpacity>

          {/* Attendance Radar */}
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => onNavigate("attendance")}
          >
            <View style={[styles.iconCircle, { backgroundColor: "rgba(16, 185, 129, 0.12)", borderColor: "rgba(16, 185, 129, 0.3)" }]}>
              <Text style={styles.gridIcon}>📡</Text>
            </View>
            <Text style={styles.gridItemTitle}>Radar Check-In</Text>
            <Text style={styles.gridItemSub}>BLE 60м Геофенс</Text>
          </TouchableOpacity>

          {/* Grades / Platonus Journal */}
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => onNavigate("grades")}
          >
            <View style={[styles.iconCircle, { backgroundColor: "rgba(245, 158, 11, 0.12)", borderColor: "rgba(245, 158, 11, 0.3)" }]}>
              <Text style={styles.gridIcon}>📊</Text>
            </View>
            <Text style={styles.gridItemTitle}>Журнал & GPA</Text>
            <Text style={styles.gridItemSub}>РК-1, РК-2, Сессия</Text>
          </TouchableOpacity>

          {/* Schedule */}
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => onNavigate("schedule")}
          >
            <View style={[styles.iconCircle, { backgroundColor: "rgba(99, 102, 241, 0.12)", borderColor: "rgba(99, 102, 241, 0.3)" }]}>
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
            <View style={[styles.iconCircle, { backgroundColor: "rgba(236, 72, 153, 0.12)", borderColor: "rgba(236, 72, 153, 0.3)" }]}>
              <Text style={styles.gridIcon}>📚</Text>
            </View>
            <Text style={styles.gridItemTitle}>Силлабус</Text>
            <Text style={styles.gridItemSub}>Wiki Конспекты</Text>
          </TouchableOpacity>

          {/* Teacher Cockpit */}
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => onNavigate("teacher")}
          >
            <View style={[styles.iconCircle, { backgroundColor: "rgba(168, 85, 247, 0.12)", borderColor: "rgba(168, 85, 247, 0.3)" }]}>
              <Text style={styles.gridIcon}>👨‍🏫</Text>
            </View>
            <Text style={styles.gridItemTitle}>Кабинет Препода</Text>
            <Text style={styles.gridItemSub}>Перенос пар</Text>
          </TouchableOpacity>

          {/* Freedom Student Perks */}
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => onNavigate("perks")}
          >
            <View style={[styles.iconCircle, { backgroundColor: "rgba(0, 209, 116, 0.16)", borderColor: "#00D174" }]}>
              <Text style={styles.gridIcon}>🎁</Text>
            </View>
            <Text style={[styles.gridItemTitle, { color: "#00D174" }]}>Freedom Perks</Text>
            <Text style={styles.gridItemSub}>Скидки & Кешбэк</Text>
          </TouchableOpacity>

          {/* Certificates */}
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => onNavigate("certificates")}
          >
            <View style={[styles.iconCircle, { backgroundColor: "rgba(20, 184, 166, 0.12)", borderColor: "rgba(20, 184, 166, 0.3)" }]}>
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
            <View style={[styles.iconCircle, { backgroundColor: "rgba(244, 63, 94, 0.12)", borderColor: "rgba(244, 63, 94, 0.3)" }]}>
              <Text style={styles.gridIcon}>💬</Text>
            </View>
            <Text style={styles.gridItemTitle}>Деканат & Эдвайзер</Text>
            <Text style={styles.gridItemSub}>Онлайн поддержка</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions Footer */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
            <Text style={styles.logoutBtnText}>Выйти из профиля Arc Edu</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#070A0F",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: Platform.OS === "android" ? 10 : 0,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarBorder: {
    width: 52,
    height: 52,
    borderRadius: 26,
    padding: 2,
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#00D174",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#121A24",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#00D174",
    fontSize: 16,
    fontWeight: "900",
  },
  greetingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  greeting: {
    fontSize: 10,
    color: "#64748B",
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  vipStatusBadge: {
    backgroundColor: "rgba(0, 209, 116, 0.15)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  vipStatusText: {
    color: "#00D174",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  userName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 2,
  },
  userRole: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 1,
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
  },
  headerIconBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#121A24",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  headerIcon: {
    fontSize: 17,
  },
  iconDot: {
    position: "absolute",
    top: 9,
    right: 9,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#00D174",
  },

  /* Card Container */
  cardContainer: {
    marginBottom: 16,
  },
  vipCard: {
    borderRadius: 24,
    backgroundColor: "#0D131B",
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(0, 209, 116, 0.35)",
    overflow: "hidden",
    minHeight: 225,
    justifyContent: "space-between",
    shadowColor: "#00D174",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 10,
  },
  vipCardBack: {
    backgroundColor: "#090E15",
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  metalGlowTopRight: {
    position: "absolute",
    right: -70,
    top: -70,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(0, 209, 116, 0.12)",
  },
  emeraldGlowBottomLeft: {
    position: "absolute",
    left: -50,
    bottom: -50,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(14, 165, 233, 0.08)",
  },
  metalBorderGleam: {
    position: "absolute",
    top: 0,
    left: "15%",
    right: "15%",
    height: 1,
    backgroundColor: "rgba(0, 209, 116, 0.6)",
  },

  /* Card Header */
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  freedomEmeraldDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#00D174",
  },
  bankName: {
    fontSize: 11,
    fontWeight: "900",
    color: "#00D174",
    letterSpacing: 1.5,
  },
  brandDivider: {
    fontSize: 10,
    color: "rgba(255,255,255,0.2)",
  },
  univBrand: {
    fontSize: 10,
    fontWeight: "800",
    color: "#CBD5E1",
    letterSpacing: 1,
  },
  cardTier: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.8,
    marginTop: 3,
  },
  hologramPill: {
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  hologramText: {
    color: "#E2E8F0",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  /* Chip */
  chipAndContactless: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  goldChip: {
    width: 44,
    height: 32,
    borderRadius: 7,
    backgroundColor: "#E5A83B",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  chipGridHorizontal: {
    position: "absolute",
    width: "100%",
    height: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  chipGridVertical: {
    position: "absolute",
    width: 1,
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  chipCore: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  freedomLogoBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0, 209, 116, 0.15)",
    borderWidth: 1,
    borderColor: "#00D174",
    justifyContent: "center",
    alignItems: "center",
  },
  freedomSymbol: {
    color: "#00D174",
    fontSize: 15,
    fontWeight: "900",
  },

  /* Card Body */
  cardBody: {
    marginVertical: 10,
  },
  cardNumber: {
    fontSize: 18,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    color: "#FFFFFF",
    letterSpacing: 2.5,
    marginBottom: 12,
    fontWeight: "700",
  },
  cardStatsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  statCol: {},
  statLabel: {
    fontSize: 9,
    color: "#64748B",
    fontWeight: "800",
    letterSpacing: 0.8,
    marginBottom: 3,
  },
  statValueEmerald: {
    fontSize: 17,
    fontWeight: "900",
    color: "#00D174",
  },
  statValue: {
    fontSize: 14,
    fontWeight: "800",
    color: "#E2E8F0",
  },
  gpaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(0, 209, 116, 0.15)",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  gpaStar: {
    color: "#00D174",
    fontSize: 11,
  },
  gpaText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },

  /* Card Footer */
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
    paddingTop: 10,
  },
  cardHolderLabel: {
    fontSize: 8,
    color: "#64748B",
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  cardHolder: {
    fontSize: 12,
    color: "#E2E8F0",
    fontWeight: "800",
    letterSpacing: 1,
    marginTop: 2,
  },
  cardExpires: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "700",
    marginTop: 2,
  },

  /* Card Back */
  cardBackBody: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
  },
  magneticStrip: {
    width: "120%",
    height: 40,
    backgroundColor: "#000000",
    marginBottom: 14,
  },
  signatureAndCvv: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  signatureBox: {
    flex: 1,
    height: 32,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  signatureText: {
    color: "#0F172A",
    fontSize: 12,
    fontStyle: "italic",
    fontWeight: "700",
  },
  cvvBox: {
    width: 60,
    height: 32,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  cvvLabel: {
    fontSize: 8,
    color: "#64748B",
  },
  cvvText: {
    fontSize: 11,
    color: "#FFFFFF",
    fontWeight: "800",
  },
  barcodeArea: {
    alignItems: "center",
    marginVertical: 6,
  },
  barcodeLines: {
    fontSize: 20,
    color: "#FFFFFF",
    letterSpacing: 4,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  barcodeLabel: {
    fontSize: 10,
    color: "#94A3B8",
    fontWeight: "700",
    marginTop: 4,
  },
  flipBackHint: {
    fontSize: 10,
    color: "#00D174",
    marginTop: 6,
  },

  /* Quick Bar */
  quickBar: {
    flexDirection: "row",
    backgroundColor: "#121A24",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    marginBottom: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  quickBarItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  quickBarIcon: {
    fontSize: 14,
  },
  quickBarLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#CBD5E1",
  },
  quickBarDivider: {
    width: 1,
    height: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
  },

  /* Lecture Banner */
  activeLectureCard: {
    backgroundColor: "rgba(18, 26, 36, 0.95)",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(0, 209, 116, 0.3)",
    marginBottom: 24,
  },
  lectureHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  pulsingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00D174",
  },
  liveText: {
    color: "#00D174",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  auditoriumPill: {
    backgroundColor: "rgba(0, 209, 116, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  auditoriumText: {
    color: "#00D174",
    fontSize: 11,
    fontWeight: "800",
  },
  lectureSubject: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 3,
  },
  lectureProfessor: {
    color: "#94A3B8",
    fontSize: 12,
    marginBottom: 12,
  },
  lectureFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
    paddingTop: 10,
  },
  timeTag: {
    backgroundColor: "rgba(255,255,255,0.04)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  timeTagText: {
    color: "#CBD5E1",
    fontSize: 11,
    fontWeight: "600",
  },
  quickCheckInBtn: {
    backgroundColor: "#00D174",
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  quickCheckInText: {
    color: "#070A0F",
    fontSize: 12,
    fontWeight: "900",
  },

  /* Section Header */
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.2,
  },
  sectionCounter: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "700",
  },

  /* Grid Menu */
  gridMenu: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
    marginBottom: 24,
  },
  gridItem: {
    width: "31%",
    backgroundColor: "#121A24",
    borderRadius: 18,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
  },
  gridIcon: {
    fontSize: 22,
  },
  gridItemTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
  },
  gridItemSub: {
    fontSize: 9,
    color: "#64748B",
    textAlign: "center",
    marginTop: 2,
    fontWeight: "600",
  },

  /* Quick Actions */
  quickActions: {
    marginTop: 4,
  },
  logoutBtn: {
    paddingVertical: 14,
    backgroundColor: "rgba(239, 68, 68, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.25)",
    borderRadius: 14,
    alignItems: "center",
  },
  logoutBtnText: {
    color: "#EF4444",
    fontSize: 13,
    fontWeight: "800",
  },
});
