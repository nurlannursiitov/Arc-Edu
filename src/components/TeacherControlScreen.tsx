import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useResponsive } from '../hooks/useResponsive';
import { Users, Radio, Building2, CheckCircle2 } from 'lucide-react-native';
import { Classroom, StudentProfile } from '../types';
import { COLORS, FONT_FAMILY, RADIUS } from '../theme/tokens';
import { AppShell } from './ui/AppShell';

interface TeacherControlScreenProps {
  student: StudentProfile;
  currentClassroom: Classroom;
  availableClassrooms: Classroom[];
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onRelocateClassroom: (newRoom: Classroom) => void;
  onBack: () => void;
}

export const TeacherControlScreen: React.FC<TeacherControlScreenProps> = ({
  student,
  currentClassroom,
  availableClassrooms,
  currentPage,
  onNavigate,
  onLogout,
  onRelocateClassroom,
  onBack,
}) => {
  const { isDesktop } = useResponsive();
  const [selectedRoomId, setSelectedRoomId] = useState(currentClassroom.id);

  const handleApply = () => {
    const target = availableClassrooms.find((r) => r.id === selectedRoomId);
    if (!target) return;
    onRelocateClassroom(target);
    Alert.alert(
      'Аудитория обновлена',
      `Занятие перенесено в аудиторию ${target.number} (${target.building}). Радар геофенсинга студентов синхронизирован.`
    );
  };

  return (
    <AppShell
      currentPage={currentPage}
      onNavigate={onNavigate}
      onLogout={onLogout}
      student={student}
      title="Панель преподавателя"
      subtitle="Оперативный перенос аудитории и синхронизация радара"
      onBack={onBack}
    >
      {/* Current Active Location Card */}
      <View style={styles.currentCard}>
        <View style={styles.currentTopRow}>
          <View style={styles.activePill}>
            <View style={styles.liveDot} />
            <Text style={styles.activePillText}>Текущая локация</Text>
          </View>
          <Text style={styles.currentBuilding}>{currentClassroom.building}</Text>
        </View>

        <Text style={styles.currentNum}>Аудитория {currentClassroom.number}</Text>
        <Text style={styles.currentSubject}>{currentClassroom.currentSubject}</Text>
      </View>

      <Text style={styles.sectionTitle}>Доступные аудитории</Text>

      <View style={styles.roomsGrid}>
        {availableClassrooms.map((room) => {
          const isSelected = selectedRoomId === room.id;
          const isCurrent = currentClassroom.id === room.id;

          return (
            <TouchableOpacity
              key={room.id}
              style={[
                styles.roomCard,
                isDesktop && styles.roomCardDesktop,
                isSelected && styles.roomCardSelected,
              ]}
              onPress={() => setSelectedRoomId(room.id)}
              activeOpacity={0.8}
            >
              <View style={styles.roomTop}>
                <View>
                  <Text style={styles.roomNum}>Ауд. {room.number}</Text>
                  <View style={styles.buildingRow}>
                    <Building2 size={12} color={COLORS.textTertiary} strokeWidth={1.75} />
                    <Text style={styles.roomBuilding}>
                      {room.building}, {room.floor} эт.
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor: room.isAvailable ? COLORS.accentSoft : COLORS.dangerSoft,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusBadgeText,
                      { color: room.isAvailable ? COLORS.accentBright : COLORS.danger },
                    ]}
                  >
                    {isCurrent ? 'Текущая' : room.isAvailable ? 'Свободна' : 'Занята'}
                  </Text>
                </View>
              </View>

              <View style={styles.roomSpecs}>
                <View style={styles.specItem}>
                  <Users size={13} color={COLORS.textTertiary} strokeWidth={1.75} />
                  <Text style={styles.specText}>{room.capacity} мест</Text>
                </View>
                <View style={styles.specItem}>
                  <Radio size={13} color={COLORS.textTertiary} strokeWidth={1.75} />
                  <Text style={styles.specText}>Радиус {room.beaconRange} м</Text>
                </View>
                {isSelected && <CheckCircle2 size={15} color={COLORS.accent} strokeWidth={2} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.applyBtn} onPress={handleApply} activeOpacity={0.85}>
        <Text style={styles.applyBtnText}>Подтвердить перенос аудитории</Text>
      </TouchableOpacity>
    </AppShell>
  );
};

const styles = StyleSheet.create({
  currentCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    marginBottom: 22,
    gap: 6,
  },
  currentTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  activePill: {
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
  activePillText: {
    color: COLORS.accentBright,
    fontSize: 11,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  currentBuilding: {
    color: COLORS.textTertiary,
    fontSize: 12,
    fontFamily: FONT_FAMILY.sans,
  },
  currentNum: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.sans,
  },
  currentSubject: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontFamily: FONT_FAMILY.sans,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
    fontFamily: FONT_FAMILY.sans,
  },
  roomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
    marginBottom: 20,
  },
  roomCard: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    gap: 14,
  },
  roomCardDesktop: {
    width: '49%',
  },
  roomCardSelected: {
    borderColor: COLORS.borderAccent,
    backgroundColor: COLORS.surfaceElevated,
  },
  roomTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  roomNum: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  buildingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 3,
  },
  roomBuilding: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontFamily: FONT_FAMILY.sans,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.pill,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  roomSpecs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 10,
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  specText: {
    color: COLORS.textTertiary,
    fontSize: 11,
    fontFamily: FONT_FAMILY.sans,
  },
  applyBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.md,
    paddingVertical: 15,
    alignItems: 'center',
  },
  applyBtnText: {
    color: COLORS.textInverse,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
});
