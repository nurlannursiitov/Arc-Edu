import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import {
  ScanFace,
  KeyRound,
  Bell,
  Radio,
  Globe,
  Info,
  ChevronRight,
  LogOut,
} from 'lucide-react-native';
import { StudentProfile } from '../types';
import { COLORS, FONT_FAMILY, RADIUS } from '../theme/tokens';
import { AppShell } from './ui/AppShell';

interface SettingScreenProps {
  student: StudentProfile;
  currentPage: string;
  onBack: () => void;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export const SettingScreen: React.FC<SettingScreenProps> = ({
  student,
  currentPage,
  onBack,
  onNavigate,
  onLogout,
}) => {
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoRadarEnabled, setAutoRadarEnabled] = useState(true);

  const initials = student.fullName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  return (
    <AppShell
      currentPage={currentPage}
      onNavigate={onNavigate}
      onLogout={onLogout}
      student={student}
      title="Настройки профиля"
      subtitle="Безопасность, уведомления и параметры приложения"
      onBack={onBack}
    >
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.profileName}>{student.fullName}</Text>
          <Text style={styles.profileEmail}>{student.email}</Text>
          <Text style={styles.profileMeta}>
            ID {student.studentId} · {student.group}
          </Text>
        </View>
      </View>

      {/* Security Section */}
      <Text style={styles.sectionHeader}>БЕЗОПАСНОСТЬ И ДОСТУП</Text>
      <View style={styles.groupCard}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <View style={styles.iconBox}>
              <ScanFace size={16} color={COLORS.textPrimary} strokeWidth={1.75} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>Face ID / Touch ID</Text>
              <Text style={styles.rowSub}>Биометрический вход в Arc Edu</Text>
            </View>
          </View>
          <Switch
            value={biometricsEnabled}
            onValueChange={setBiometricsEnabled}
            trackColor={{ false: '#262B36', true: COLORS.accent }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.row}
          onPress={() => onNavigate('change-password')}
          activeOpacity={0.75}
        >
          <View style={styles.rowLeft}>
            <View style={styles.iconBox}>
              <KeyRound size={16} color={COLORS.textPrimary} strokeWidth={1.75} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>Сменить пароль</Text>
              <Text style={styles.rowSub}>Учётная запись Platonus / AITU ID</Text>
            </View>
          </View>
          <ChevronRight size={16} color={COLORS.textTertiary} strokeWidth={1.75} />
        </TouchableOpacity>
      </View>

      {/* Preferences Section */}
      <Text style={styles.sectionHeader}>УВЕДОМЛЕНИЯ И ГЕОЛОКАЦИЯ</Text>
      <View style={styles.groupCard}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <View style={styles.iconBox}>
              <Bell size={16} color={COLORS.textPrimary} strokeWidth={1.75} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>Push-уведомления</Text>
              <Text style={styles.rowSub}>Напоминание за 10 минут до пары</Text>
            </View>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#262B36', true: COLORS.accent }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <View style={styles.iconBox}>
              <Radio size={16} color={COLORS.textPrimary} strokeWidth={1.75} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>Фоновый BLE-радар</Text>
              <Text style={styles.rowSub}>Автопоиск маяков аудитории</Text>
            </View>
          </View>
          <Switch
            value={autoRadarEnabled}
            onValueChange={setAutoRadarEnabled}
            trackColor={{ false: '#262B36', true: COLORS.accent }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.row}
          onPress={() => onNavigate('language')}
          activeOpacity={0.75}
        >
          <View style={styles.rowLeft}>
            <View style={styles.iconBox}>
              <Globe size={16} color={COLORS.textPrimary} strokeWidth={1.75} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>Язык интерфейса</Text>
              <Text style={styles.rowSub}>Русский · Қазақша · English</Text>
            </View>
          </View>
          <ChevronRight size={16} color={COLORS.textTertiary} strokeWidth={1.75} />
        </TouchableOpacity>
      </View>

      {/* About Section */}
      <Text style={styles.sectionHeader}>СИСТЕМА</Text>
      <View style={styles.groupCard}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => onNavigate('app-info')}
          activeOpacity={0.75}
        >
          <View style={styles.rowLeft}>
            <View style={styles.iconBox}>
              <Info size={16} color={COLORS.textPrimary} strokeWidth={1.75} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>О приложении Arc Edu</Text>
              <Text style={styles.rowSub}>Версия 2.4.0 · AITU & Freedom</Text>
            </View>
          </View>
          <ChevronRight size={16} color={COLORS.textTertiary} strokeWidth={1.75} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={onLogout} activeOpacity={0.8}>
        <LogOut size={16} color={COLORS.danger} strokeWidth={1.75} />
        <Text style={styles.logoutText}>Выйти из аккаунта</Text>
      </TouchableOpacity>
    </AppShell>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    gap: 14,
    marginBottom: 24,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.borderAccent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: COLORS.accentBright,
    fontSize: 17,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.sans,
  },
  profileName: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  profileEmail: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 2,
    fontFamily: FONT_FAMILY.sans,
  },
  profileMeta: {
    color: COLORS.accentBright,
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
    fontFamily: FONT_FAMILY.mono,
  },
  sectionHeader: {
    color: COLORS.textTertiary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
    marginLeft: 4,
    fontFamily: FONT_FAMILY.sans,
  },
  groupCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 12,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowTitle: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.sans,
  },
  rowSub: {
    color: COLORS.textTertiary,
    fontSize: 12,
    marginTop: 1,
    fontFamily: FONT_FAMILY.sans,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.dangerSoft,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.25)',
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    marginTop: 4,
  },
  logoutText: {
    color: COLORS.danger,
    fontSize: 13,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
});
