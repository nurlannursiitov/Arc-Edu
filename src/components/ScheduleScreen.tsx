import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MapPin, User, Radio, CalendarOff } from 'lucide-react-native';
import { ScheduleItem, StudentProfile } from '../types';
import { COLORS, FONT_FAMILY, RADIUS } from '../theme/tokens';
import { AppShell } from './ui/AppShell';

interface ScheduleScreenProps {
  student: StudentProfile;
  schedule: ScheduleItem[];
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onBack: () => void;
  onNavigateAttendance: () => void;
}

const DAYS = [
  { key: 'ПН', label: 'Понедельник' },
  { key: 'ВТ', label: 'Вторник' },
  { key: 'СР', label: 'Среда' },
  { key: 'ЧТ', label: 'Четверг' },
  { key: 'ПТ', label: 'Пятница' },
  { key: 'СБ', label: 'Суббота' },
];

export const ScheduleScreen: React.FC<ScheduleScreenProps> = ({
  student,
  schedule,
  currentPage,
  onNavigate,
  onLogout,
  onBack,
  onNavigateAttendance,
}) => {
  const [selectedDay, setSelectedDay] = useState('ПН');
  const daySchedule = schedule.filter((item) => item.day === selectedDay);

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'lecture':
        return { color: COLORS.accent, bg: COLORS.accentSoft, label: 'Лекция' };
      case 'practice':
        return { color: COLORS.info, bg: COLORS.infoSoft, label: 'Практика' };
      default:
        return { color: COLORS.warning, bg: COLORS.warningSoft, label: 'Лаб. работа' };
    }
  };

  return (
    <AppShell
      currentPage={currentPage}
      onNavigate={onNavigate}
      onLogout={onLogout}
      student={student}
      title="Расписание занятий"
      subtitle="Учебная неделя группы SE-2304"
      onBack={onBack}
    >
      {/* Day Selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.daysScroll}
        contentContainerStyle={styles.daysRow}
      >
        {DAYS.map((d) => {
          const active = selectedDay === d.key;
          return (
            <TouchableOpacity
              key={d.key}
              style={[styles.dayPill, active && styles.dayPillActive]}
              onPress={() => setSelectedDay(d.key)}
              activeOpacity={0.78}
            >
              <Text style={[styles.dayKey, active && styles.dayKeyActive]}>{d.key}</Text>
              <Text style={[styles.daySub, active && styles.daySubActive]}>
                {d.label.slice(0, 3)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.summaryBar}>
        <Text style={styles.summaryTitle}>
          {DAYS.find((d) => d.key === selectedDay)?.label}
        </Text>
        <View style={styles.countPill}>
          <Text style={styles.countText}>{daySchedule.length} пар</Text>
        </View>
      </View>

      {daySchedule.length === 0 ? (
        <View style={styles.emptyCard}>
          <CalendarOff size={32} color={COLORS.textTertiary} strokeWidth={1.5} />
          <Text style={styles.emptyTitle}>В этот день занятий нет</Text>
          <Text style={styles.emptySub}>Свободное время для самостоятельной работы и проектов</Text>
        </View>
      ) : (
        <View style={styles.timeline}>
          {daySchedule.map((item) => {
            const t = getTypeStyle(item.type);
            return (
              <View key={item.id} style={styles.classCard}>
                <View style={[styles.leftStrip, { backgroundColor: t.color }]} />

                <View style={styles.timeCol}>
                  <Text style={styles.timeStart}>{item.startTime}</Text>
                  <Text style={styles.timeEnd}>{item.endTime}</Text>
                </View>

                <View style={styles.mainCol}>
                  <View style={styles.topMetaRow}>
                    <View style={[styles.typeBadge, { backgroundColor: t.bg }]}>
                      <Text style={[styles.typeText, { color: t.color }]}>{t.label}</Text>
                    </View>
                    <View style={styles.roomRow}>
                      <MapPin size={12} color={COLORS.textSecondary} strokeWidth={1.75} />
                      <Text style={styles.roomText}>Ауд. {item.room}</Text>
                    </View>
                  </View>

                  <Text style={styles.subjectName}>{item.subject}</Text>

                  <View style={styles.bottomRow}>
                    <View style={styles.profRow}>
                      <User size={12} color={COLORS.textTertiary} strokeWidth={1.75} />
                      <Text style={styles.profText}>{item.professor}</Text>
                    </View>

                    <TouchableOpacity
                      style={styles.radarBtn}
                      onPress={onNavigateAttendance}
                      activeOpacity={0.78}
                    >
                      <Radio size={12} color={COLORS.accent} strokeWidth={2} />
                      <Text style={styles.radarBtnText}>Radar Check-In</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </AppShell>
  );
};

const styles = StyleSheet.create({
  daysScroll: {
    flexGrow: 0,
    marginBottom: 20,
  },
  daysRow: {
    flexDirection: 'row',
    gap: 8,
  },
  dayPill: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    minWidth: 58,
  },
  dayPillActive: {
    backgroundColor: COLORS.surfaceElevated,
    borderColor: COLORS.borderAccent,
  },
  dayKey: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.sans,
  },
  dayKeyActive: {
    color: COLORS.accentBright,
  },
  daySub: {
    color: COLORS.textTertiary,
    fontSize: 10,
    marginTop: 2,
    fontFamily: FONT_FAMILY.sans,
  },
  daySubActive: {
    color: COLORS.textSecondary,
  },
  summaryBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  summaryTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  countPill: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
  },
  countText: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.sans,
  },
  emptyCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 36,
    alignItems: 'center',
    gap: 8,
  },
  emptyTitle: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    marginTop: 4,
    fontFamily: FONT_FAMILY.sans,
  },
  emptySub: {
    color: COLORS.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: FONT_FAMILY.sans,
  },
  timeline: {
    gap: 12,
  },
  classCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    paddingLeft: 18,
    overflow: 'hidden',
    gap: 16,
  },
  leftStrip: {
    position: 'absolute',
    left: 0,
    top: 12,
    bottom: 12,
    width: 3,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
  timeCol: {
    width: 62,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
    paddingRight: 12,
    gap: 4,
  },
  timeStart: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.mono,
  },
  timeEnd: {
    color: COLORS.textTertiary,
    fontSize: 11,
    fontFamily: FONT_FAMILY.mono,
  },
  mainCol: {
    flex: 1,
    gap: 8,
  },
  topMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  roomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  roomText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.mono,
  },
  subjectName: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    paddingTop: 4,
  },
  profRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  profText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontFamily: FONT_FAMILY.sans,
  },
  radarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.accentSoft,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.sm,
  },
  radarBtnText: {
    color: COLORS.accentBright,
    fontSize: 11,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
});
