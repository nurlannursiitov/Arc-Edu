import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const STUDENT_PROFILE = {
  id: 'arc-230107042',
  name: 'Нурсиитов Нурлан',
  student_id: '230107042',
  group: 'ВТИП-23-2к',
  faculty: 'Информационные технологии',
  specialty: '6B06101 Software Engineering',
  course_year: 2,
  gpa: 3.87,
  max_gpa: 4.00,
  attendance_rate: '96.4%',
  credits_earned: '58 / 240 ECTS',
  freedom_card_number: '5412 •••• •••• 9842',
  freedom_card_type: 'FREEDOM BLACK STUDENT VIP',
  freedom_bonus_balance: 6250,
  status: 'ACTIVE_STUDENT'
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'id' | 'attendance' | 'syllabus' | 'teacher' | 'perks'>('id');
  const [cardFlipped, setCardFlipped] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerBrandRow}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoBadgeLetter}>Δ</Text>
          </View>
          <View>
            <View style={styles.headerTitleRow}>
              <Text style={styles.brandTitle}>ARC EDU</Text>
              <View style={styles.proPill}>
                <Text style={styles.proPillText}>2.0 PRO</Text>
              </View>
            </View>
            <Text style={styles.brandSubtitle}>Astana IT University • Smart Campus</Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <View style={styles.liveIndicator}>
            <View style={styles.liveGreenDot} />
            <Text style={styles.liveText}>ONLINE</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* ==================== TAB 1: DIGITAL STUDENT ID ==================== */}
        {activeTab === 'id' && (
          <View>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionTitle}>Digital Student Pass</Text>
              <TouchableOpacity onPress={() => setCardFlipped(!cardFlipped)} style={styles.flipBtn}>
                <Text style={styles.flipBtnText}>{cardFlipped ? 'Лицевая' : 'Штрихкод'} ↺</Text>
              </TouchableOpacity>
            </View>

            {/* Premium Freedom Co-Brand Black Card */}
            <TouchableOpacity
              activeOpacity={0.92}
              onPress={() => setCardFlipped(!cardFlipped)}
              style={styles.cardContainer}
            >
              {!cardFlipped ? (
                // FRONT SIDE: Premium Metallic VIP Card
                <View style={styles.cardFront}>
                  <View style={styles.cardHeader}>
                    <View>
                      <Text style={styles.cardUni}>ASTANA IT UNIVERSITY</Text>
                      <Text style={styles.cardTier}>{STUDENT_PROFILE.freedom_card_type}</Text>
                    </View>
                    <View style={styles.cardFreedomLogo}>
                      <Text style={styles.freedomLogoText}>FREEDOM</Text>
                      <Text style={styles.freedomLogoSub}>BANK</Text>
                    </View>
                  </View>

                  <View style={styles.chipRow}>
                    <View style={styles.emvChip}>
                      <View style={styles.chipLine1} />
                      <View style={styles.chipLine2} />
                    </View>
                    <Text style={styles.contactlessWave}>(( • ))</Text>
                  </View>

                  <View style={styles.cardMiddle}>
                    <View style={styles.avatarGlow}>
                      <Text style={styles.avatarInitials}>НН</Text>
                    </View>
                    <View style={styles.cardStudentInfo}>
                      <Text style={styles.studentName}>{STUDENT_PROFILE.name}</Text>
                      <Text style={styles.studentSpecialty}>{STUDENT_PROFILE.specialty}</Text>
                      <Text style={styles.studentMeta}>
                        Группа: {STUDENT_PROFILE.group} • {STUDENT_PROFILE.course_year} курс
                      </Text>
                    </View>
                  </View>

                  <View style={styles.cardFooter}>
                    <View>
                      <Text style={styles.cardNumber}>{STUDENT_PROFILE.freedom_card_number}</Text>
                      <Text style={styles.cardStudentId}>ID: {STUDENT_PROFILE.student_id}</Text>
                    </View>
                    <View style={styles.cardBonusBox}>
                      <Text style={styles.bonusLabel}>FREEDOM CASHBACK</Text>
                      <Text style={styles.bonusValue}>+{STUDENT_PROFILE.freedom_bonus_balance} ₸</Text>
                    </View>
                  </View>
                </View>
              ) : (
                // BACK SIDE: Barcode Pass
                <View style={styles.cardBack}>
                  <View style={styles.magneticStripe} />
                  <View style={styles.barcodeBox}>
                    <View style={styles.barcodeLines}>
                      {Array.from({ length: 42 }).map((_, i) => (
                        <View
                          key={i}
                          style={[
                            styles.barcodeBar,
                            {
                              width: (i % 4 === 0 ? 3.5 : (i % 2 === 0 ? 1.5 : 2)),
                              opacity: (i % 7 === 0 ? 0.3 : 1)
                            }
                          ]}
                        />
                      ))}
                    </View>
                    <Text style={styles.barcodeNumber}>* 2 3 0 1 0 7 0 4 2 *</Text>
                  </View>
                  <Text style={styles.cardSecurityNotice}>
                    Пропуск авторизован через систему Arc Edu Core. Действителен до 07/2027.
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Quick Metrics Grid */}
            <View style={styles.kpiGrid}>
              <View style={styles.kpiCard}>
                <Text style={styles.kpiValue}>{STUDENT_PROFILE.gpa} ⭐</Text>
                <Text style={styles.kpiLabel}>Cumulative GPA</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '96%' }]} />
                </View>
              </View>

              <View style={styles.kpiCard}>
                <Text style={[styles.kpiValue, { color: '#00E676' }]}>{STUDENT_PROFILE.attendance_rate}</Text>
                <Text style={styles.kpiLabel}>Посещаемость</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '96.4%', backgroundColor: '#00E676' }]} />
                </View>
              </View>

              <View style={styles.kpiCard}>
                <Text style={[styles.kpiValue, { color: '#38BDF8' }]}>58 ECTS</Text>
                <Text style={styles.kpiLabel}>Кредиты</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '25%', backgroundColor: '#38BDF8' }]} />
                </View>
              </View>
            </View>

            {/* Quick Actions */}
            <View style={styles.quickActionsRow}>
              <TouchableOpacity style={styles.actionPill}>
                <Text style={styles.actionPillIcon}>📄</Text>
                <Text style={styles.actionPillText}>eGov Справка</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionPill}>
                <Text style={styles.actionPillIcon}>⚡</Text>
                <Text style={styles.actionPillText}>Пополнить карту</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionPill} onPress={() => setActiveTab('attendance')}>
                <Text style={styles.actionPillIcon}>📍</Text>
                <Text style={styles.actionPillText}>На пару</Text>
              </TouchableOpacity>
            </View>

            {/* Live Session Banner */}
            <View style={styles.liveSessionCard}>
              <View style={styles.liveSessionHeader}>
                <View style={styles.liveBlinkingTag}>
                  <View style={styles.liveGreenDot} />
                  <Text style={styles.liveBlinkingText}>ТЕКУЩАЯ ПАРА • АУДИТОРИЯ #304</Text>
                </View>
                <Text style={styles.liveRoomFloor}>3 этаж</Text>
              </View>
              <Text style={styles.liveSubjectName}>Архитектура вычислительных систем</Text>
              <Text style={styles.liveTeacher}>доц. Ахметов С.К. • Лекция (10:00 - 11:30)</Text>
            </View>
          </View>
        )}

        {/* ==================== OTHER TABS: IN PROGRESS ==================== */}
        {activeTab !== 'id' && (
          <View style={styles.placeholderTab}>
            <Text style={styles.placeholderEmoji}>
              {activeTab === 'attendance' ? '📍' : activeTab === 'syllabus' ? '📚' : activeTab === 'teacher' ? '👨‍🏫' : '🎁'}
            </Text>
            <Text style={styles.placeholderTitle}>
              {activeTab === 'attendance'
                ? 'Модуль отметки присутствия (NFC & Geofencing)'
                : activeTab === 'syllabus'
                ? 'Силлабус и Вики-конспекты'
                : activeTab === 'teacher'
                ? 'Панель преподавателя (Dynamic Room Switch)'
                : 'Партнерские скидки Freedom Ecosystem'}
            </Text>
            <Text style={styles.placeholderSub}>
              В активной разработке. Следующий этап в плане проекта Arc Edu.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('id')}>
          <Text style={[styles.navIcon, activeTab === 'id' && styles.navIconActive]}>🪪</Text>
          <Text style={[styles.navText, activeTab === 'id' && styles.navTextActive]}>Студбилет</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('attendance')}>
          <Text style={[styles.navIcon, activeTab === 'attendance' && styles.navIconActive]}>📍</Text>
          <Text style={[styles.navText, activeTab === 'attendance' && styles.navTextActive]}>Чекин</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('syllabus')}>
          <Text style={[styles.navIcon, activeTab === 'syllabus' && styles.navIconActive]}>📚</Text>
          <Text style={[styles.navText, activeTab === 'syllabus' && styles.navTextActive]}>Силлабус</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('teacher')}>
          <Text style={[styles.navIcon, activeTab === 'teacher' && styles.navIconActive]}>👨‍🏫</Text>
          <Text style={[styles.navText, activeTab === 'teacher' && styles.navTextActive]}>Кафедра</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('perks')}>
          <Text style={[styles.navIcon, activeTab === 'perks' && styles.navIconActive]}>🎁</Text>
          <Text style={[styles.navText, activeTab === 'perks' && styles.navTextActive]}>Freedom</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070B14',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#151D2E',
    backgroundColor: '#0A0F1D',
  },
  headerBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#0284C7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#38BDF8',
  },
  logoBadgeLetter: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  brandTitle: {
    color: '#F8FAFC',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  proPill: {
    backgroundColor: '#059669',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  proPillText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '800',
  },
  brandSubtitle: {
    color: '#64748B',
    fontSize: 10,
    marginTop: 2,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(5, 150, 105, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(5, 150, 105, 0.3)',
    gap: 5,
  },
  liveGreenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00E676',
  },
  liveText: {
    color: '#00E676',
    fontSize: 9,
    fontWeight: '800',
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 40,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  flipBtn: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#334155',
  },
  flipBtnText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '700',
  },

  // Card Front
  cardContainer: {
    width: '100%',
    height: 220,
    borderRadius: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
  },
  cardFront: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 18,
    padding: 18,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#26334D',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardUni: {
    color: '#CBD5E1',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  cardTier: {
    color: '#38BDF8',
    fontSize: 9,
    fontWeight: '700',
    marginTop: 2,
  },
  cardFreedomLogo: {
    alignItems: 'flex-end',
  },
  freedomLogoText: {
    color: '#00D084',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },
  freedomLogoSub: {
    color: '#94A3B8',
    fontSize: 8,
    fontWeight: '700',
  },
  chipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  emvChip: {
    width: 38,
    height: 28,
    backgroundColor: '#D97706',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FBBF24',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipLine1: {
    width: '80%',
    height: 1,
    backgroundColor: '#B45309',
    marginBottom: 4,
  },
  chipLine2: {
    width: '80%',
    height: 1,
    backgroundColor: '#B45309',
  },
  contactlessWave: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '800',
  },
  cardMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatarGlow: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#0284C7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#38BDF8',
  },
  avatarInitials: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  cardStudentInfo: {
    flex: 1,
  },
  studentName: {
    color: '#F8FAFC',
    fontSize: 17,
    fontWeight: '800',
  },
  studentSpecialty: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 1,
  },
  studentMeta: {
    color: '#94A3B8',
    fontSize: 10,
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    paddingTop: 10,
  },
  cardNumber: {
    color: '#E2E8F0',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
  },
  cardStudentId: {
    color: '#64748B',
    fontSize: 10,
    marginTop: 2,
  },
  cardBonusBox: {
    alignItems: 'flex-end',
  },
  bonusLabel: {
    color: '#64748B',
    fontSize: 8,
    fontWeight: '700',
  },
  bonusValue: {
    color: '#00D084',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 1,
  },

  // Back of card
  cardBack: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 18,
    padding: 16,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#26334D',
  },
  magneticStripe: {
    height: 36,
    backgroundColor: '#030712',
    marginHorizontal: -16,
    marginTop: 6,
  },
  barcodeBox: {
    alignItems: 'center',
    backgroundColor: '#0B1120',
    padding: 10,
    borderRadius: 8,
  },
  barcodeLines: {
    flexDirection: 'row',
    height: 36,
    alignItems: 'center',
    gap: 3,
  },
  barcodeBar: {
    height: '100%',
    backgroundColor: '#F8FAFC',
  },
  barcodeNumber: {
    color: '#94A3B8',
    fontSize: 10,
    letterSpacing: 4,
    marginTop: 6,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  cardSecurityNotice: {
    color: '#475569',
    fontSize: 9,
    textAlign: 'center',
  },

  // KPI Grid
  kpiGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  kpiValue: {
    color: '#FBBF24',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 2,
  },
  kpiLabel: {
    color: '#94A3B8',
    fontSize: 10,
    marginBottom: 6,
  },
  progressBar: {
    height: 3,
    backgroundColor: '#1E293B',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FBBF24',
  },

  quickActionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  actionPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#131D30',
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#24324D',
    gap: 6,
  },
  actionPillIcon: {
    fontSize: 13,
  },
  actionPillText: {
    color: '#E2E8F0',
    fontSize: 11,
    fontWeight: '700',
  },

  liveSessionCard: {
    backgroundColor: '#0E1729',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1D4ED8',
  },
  liveSessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  liveBlinkingTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveBlinkingText: {
    color: '#00E676',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  liveRoomFloor: {
    color: '#64748B',
    fontSize: 10,
  },
  liveSubjectName: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '800',
    marginTop: 2,
  },
  liveTeacher: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 2,
  },

  placeholderTab: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#0F172A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
    marginTop: 20,
  },
  placeholderEmoji: {
    fontSize: 48,
    marginBottom: 14,
  },
  placeholderTitle: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  placeholderSub: {
    color: '#64748B',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },

  navBar: {
    flexDirection: 'row',
    backgroundColor: '#070B14',
    borderTopWidth: 1,
    borderTopColor: '#151D2E',
    paddingVertical: 8,
    paddingBottom: Platform.OS === 'ios' ? 22 : 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 18,
    marginBottom: 2,
    opacity: 0.5,
  },
  navIconActive: {
    opacity: 1,
  },
  navText: {
    color: '#64748B',
    fontSize: 9,
    fontWeight: '700',
  },
  navTextActive: {
    color: '#38BDF8',
    fontWeight: '800',
  },
});
