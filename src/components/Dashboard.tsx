import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useResponsive } from '../hooks/useResponsive';
import {
  Eye,
  EyeOff,
  CreditCard,
  Radio,
  GraduationCap,
  Calendar,
  BookOpen,
  SlidersHorizontal,
  Sparkles,
  FileCheck2,
  MessageSquare,
  ArrowRight,
  ChevronRight,
  Clock,
  MapPin,
  Settings,
} from 'lucide-react-native';
import { StudentProfile, Classroom } from '../types';
import { COLORS, FONT_FAMILY, RADIUS } from '../theme/tokens';
import { AppShell } from './ui/AppShell';
import { FreedomCard } from './ui/FreedomCard';

interface DashboardProps {
  student: StudentProfile;
  activeClassroom: Classroom;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const SERVICES = [
  {
    id: 'digital-id',
    title: 'Digital ID',
    subtitle: 'Пропуск и eGov',
    icon: CreditCard,
    accent: true,
  },
  {
    id: 'attendance',
    title: 'Radar Check-In',
    subtitle: 'Геофенс 60 м',
    icon: Radio,
    accent: true,
  },
  {
    id: 'grades',
    title: 'Журнал и GPA',
    subtitle: 'РК-1, РК-2, Сессия',
    icon: GraduationCap,
  },
  {
    id: 'schedule',
    title: 'Расписание',
    subtitle: 'ПН – СБ пары',
    icon: Calendar,
  },
  {
    id: 'syllabus',
    title: 'Силлабус и Wiki',
    subtitle: 'Материалы курса',
    icon: BookOpen,
  },
  {
    id: 'teacher',
    title: 'Кабинет препода',
    subtitle: 'Перенос аудиторий',
    icon: SlidersHorizontal,
  },
  {
    id: 'perks',
    title: 'Freedom Perks',
    subtitle: 'Скидки и кешбэк',
    icon: Sparkles,
    accent: true,
  },
  {
    id: 'certificates',
    title: 'Справки eGov',
    subtitle: 'ЦОС с ЭЦП',
    icon: FileCheck2,
  },
  {
    id: 'chat',
    title: 'Эдвайзер',
    subtitle: 'Чат деканата',
    icon: MessageSquare,
  },
];

export const Dashboard: React.FC<DashboardProps> = ({
  student,
  activeClassroom,
  onNavigate,
  onLogout,
}) => {
  const { isDesktop } = useResponsive();
  const [balanceVisible, setBalanceVisible] = useState(true);

  const firstName = student.fullName.split(' ')[1] || student.fullName;

  return (
    <AppShell
      currentPage="dashboard"
      onNavigate={onNavigate}
      onLogout={onLogout}
      student={student}
    >
      {/* Clean Greeting Header */}
      <View style={styles.greetingBar}>
        <View style={{ flex: 1 }}>
          <View style={styles.termRow}>
            <Text style={styles.termText}>ОСЕНЬ 2026</Text>
            <View style={styles.dotSep} />
            <Text style={styles.termText}>
              {student.group} · {student.major}
            </Text>
          </View>
          <Text style={styles.greetingTitle}>Добрый день, {firstName}</Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => setBalanceVisible(!balanceVisible)}
            activeOpacity={0.75}
          >
            {balanceVisible ? (
              <Eye size={17} color={COLORS.textSecondary} strokeWidth={1.75} />
            ) : (
              <EyeOff size={17} color={COLORS.textSecondary} strokeWidth={1.75} />
            )}
          </TouchableOpacity>
          {!isDesktop && (
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => onNavigate('settings')}
              activeOpacity={0.75}
            >
              <Settings size={17} color={COLORS.textSecondary} strokeWidth={1.75} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Bento Hero Grid */}
      <View style={[styles.bentoTop, isDesktop && styles.bentoTopDesktop]}>
        {/* Left Column: Freedom Metal Card + Quick Action Strip */}
        <View style={[styles.leftCol, isDesktop && { flex: 1.05 }]}>
          <FreedomCard student={student} balanceVisible={balanceVisible} />

          <View style={styles.quickStrip}>
            <TouchableOpacity
              style={styles.quickStripItem}
              onPress={() => onNavigate('digital-id')}
              activeOpacity={0.75}
            >
              <CreditCard size={14} color={COLORS.accent} strokeWidth={1.75} />
              <Text style={styles.quickStripText}>Пропуск ID</Text>
            </TouchableOpacity>

            <View style={styles.quickDivider} />

            <TouchableOpacity
              style={styles.quickStripItem}
              onPress={() => onNavigate('perks')}
              activeOpacity={0.75}
            >
              <Sparkles size={14} color={COLORS.accent} strokeWidth={1.75} />
              <Text style={styles.quickStripText} numberOfLines={1}>
                {student.freedom_bonus_balance.toLocaleString('ru-RU')} ₸
              </Text>
            </TouchableOpacity>

            <View style={styles.quickDivider} />

            <TouchableOpacity
              style={styles.quickStripItem}
              onPress={() => setBalanceVisible(!balanceVisible)}
              activeOpacity={0.75}
            >
              {balanceVisible ? (
                <EyeOff size={14} color={COLORS.textSecondary} strokeWidth={1.75} />
              ) : (
                <Eye size={14} color={COLORS.textSecondary} strokeWidth={1.75} />
              )}
              <Text style={styles.quickStripText}>
                {balanceVisible ? 'Скрыть' : 'Показать'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Right Column: 3 KPI Tiles + Active Class Bento Card */}
        <View style={[styles.rightCol, isDesktop && { flex: 1 }]}>
          <View style={styles.kpiRow}>
            <TouchableOpacity
              style={styles.kpiTile}
              onPress={() => onNavigate('grades')}
              activeOpacity={0.8}
            >
              <Text style={styles.kpiLabel}>GPA</Text>
              <Text style={[styles.kpiValue, { color: COLORS.accentBright }]}>
                {student.gpa.toFixed(2)}
              </Text>
              <Text style={styles.kpiSub}>из {student.max_gpa.toFixed(1)}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.kpiTile}
              onPress={() => onNavigate('attendance')}
              activeOpacity={0.8}
            >
              <Text style={styles.kpiLabel}>Посещение</Text>
              <Text style={styles.kpiValue}>{student.attendance_rate}</Text>
              <Text style={styles.kpiSub}>в этом семестре</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.kpiTile}
              onPress={() => onNavigate('grades')}
              activeOpacity={0.8}
            >
              <Text style={styles.kpiLabel}>Кредиты</Text>
              <Text style={styles.kpiValue}>58</Text>
              <Text style={styles.kpiSub}>из 240 ECTS</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.liveCard}>
            <View style={styles.liveCardTop}>
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveBadgeText}>Идёт пара</Text>
              </View>
              <View style={styles.roomBadge}>
                <MapPin size={12} color={COLORS.textSecondary} strokeWidth={1.75} />
                <Text style={styles.roomBadgeText}>Ауд. {activeClassroom.number}</Text>
              </View>
            </View>

            <View style={styles.liveBody}>
              <Text style={styles.liveSubject}>{activeClassroom.currentSubject}</Text>
              <Text style={styles.liveMeta}>
                {activeClassroom.professor} · {activeClassroom.building}
              </Text>
            </View>

            <View style={styles.liveFooter}>
              <View style={styles.timeInfo}>
                <Clock size={13} color={COLORS.textTertiary} strokeWidth={1.75} />
                <Text style={styles.timeInfoText}>{activeClassroom.timeSlot}</Text>
              </View>

              <TouchableOpacity
                style={styles.ctaButton}
                onPress={() => onNavigate('attendance')}
                activeOpacity={0.85}
              >
                <Text style={styles.ctaButtonText}>Отметиться</Text>
                <ArrowRight size={15} color={COLORS.textInverse} strokeWidth={2.2} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Services Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Сервисы кампуса</Text>
        <Text style={styles.sectionCount}>9 модулей</Text>
      </View>

      <View style={styles.servicesGrid}>
        {SERVICES.map((service) => {
          const IconComponent = service.icon;
          return (
            <TouchableOpacity
              key={service.id}
              style={[
                styles.serviceCard,
                isDesktop ? styles.serviceCardDesktop : styles.serviceCardMobile,
              ]}
              onPress={() => onNavigate(service.id)}
              activeOpacity={0.78}
            >
              <View style={styles.serviceIconWrap}>
                <IconComponent
                  size={18}
                  color={service.accent ? COLORS.accent : COLORS.textPrimary}
                  strokeWidth={1.75}
                />
              </View>
              <View style={styles.serviceTextCol}>
                <Text style={styles.serviceTitle} numberOfLines={1}>
                  {service.title}
                </Text>
                <Text style={styles.serviceSub} numberOfLines={1}>
                  {service.subtitle}
                </Text>
              </View>
              {isDesktop && (
                <ChevronRight size={15} color={COLORS.textTertiary} strokeWidth={1.75} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </AppShell>
  );
};

const styles = StyleSheet.create({
  greetingBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
    gap: 12,
  },
  termRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  termText: {
    color: COLORS.textTertiary,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.6,
    fontFamily: FONT_FAMILY.sans,
  },
  dotSep: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: COLORS.textTertiary,
  },
  greetingTitle: {
    color: COLORS.textPrimary,
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: -0.5,
    fontFamily: FONT_FAMILY.sans,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Bento Top Row */
  bentoTop: {
    flexDirection: 'column',
    gap: 18,
    marginBottom: 28,
  },
  bentoTopDesktop: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  leftCol: {
    gap: 10,
  },
  rightCol: {
    gap: 12,
    justifyContent: 'space-between',
  },

  /* Quick Action Strip under Card */
  quickStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 11,
    paddingHorizontal: 10,
  },
  quickStripItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  quickStripText: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.sans,
  },
  quickDivider: {
    width: 1,
    height: 16,
    backgroundColor: COLORS.border,
  },

  /* KPI Row */
  kpiRow: {
    flexDirection: 'row',
    gap: 10,
  },
  kpiTile: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  kpiLabel: {
    color: COLORS.textTertiary,
    fontSize: 11,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.sans,
  },
  kpiValue: {
    color: COLORS.textPrimary,
    fontSize: 21,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginTop: 4,
    fontFamily: FONT_FAMILY.sans,
  },
  kpiSub: {
    color: COLORS.textTertiary,
    fontSize: 10,
    marginTop: 2,
    fontFamily: FONT_FAMILY.sans,
  },

  /* Active Lecture Card */
  liveCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    justifyContent: 'space-between',
    gap: 14,
  },
  liveCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.accentSoft,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.accent,
  },
  liveBadgeText: {
    color: COLORS.accentBright,
    fontSize: 11,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  roomBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.surfaceElevated,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  roomBadgeText: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  liveBody: {
    gap: 4,
  },
  liveSubject: {
    color: COLORS.textPrimary,
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.2,
    fontFamily: FONT_FAMILY.sans,
  },
  liveMeta: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontFamily: FONT_FAMILY.sans,
  },
  liveFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeInfoText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.mono,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.accent,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: RADIUS.sm,
  },
  ctaButtonText: {
    color: COLORS.textInverse,
    fontSize: 13,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },

  /* Services Section */
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
    fontFamily: FONT_FAMILY.sans,
  },
  sectionCount: {
    color: COLORS.textTertiary,
    fontSize: 12,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.sans,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    gap: 12,
  },
  serviceCardDesktop: {
    width: '32.2%',
  },
  serviceCardMobile: {
    width: '48.6%',
  },
  serviceIconWrap: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceTextCol: {
    flex: 1,
  },
  serviceTitle: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  serviceSub: {
    color: COLORS.textTertiary,
    fontSize: 11,
    marginTop: 2,
    fontFamily: FONT_FAMILY.sans,
  },
});
