import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Layers, Code2, ShieldCheck } from 'lucide-react-native';
import { StudentProfile } from '../types';
import { COLORS, FONT_FAMILY, RADIUS } from '../theme/tokens';
import { AppShell } from './ui/AppShell';
import { BrandMark } from './ui/BrandMark';

interface AppInfoScreenProps {
  student: StudentProfile;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onBack: () => void;
}

export const AppInfoScreen: React.FC<AppInfoScreenProps> = ({
  student,
  currentPage,
  onNavigate,
  onLogout,
  onBack,
}) => {
  return (
    <AppShell
      currentPage={currentPage}
      onNavigate={onNavigate}
      onLogout={onLogout}
      student={student}
      title="О приложении"
      subtitle="Команда разработки и архитектура Arc Edu"
      onBack={onBack}
    >
      <View style={styles.heroCard}>
        <BrandMark size={56} />
        <Text style={styles.appName}>Arc Edu</Text>
        <Text style={styles.appSub}>Platonus NextGen · Campus Portal</Text>
        <View style={styles.versionPill}>
          <Text style={styles.versionText}>Версия 2.4.0 · TypeScript Build</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <Code2 size={16} color={COLORS.accent} strokeWidth={1.75} />
          <Text style={styles.cardTitle}>Команда Astana IT University</Text>
        </View>

        <View style={styles.memberRow}>
          <Text style={styles.memberName}>Нурсиитов Нурлан</Text>
          <Text style={styles.memberRole}>Team Lead & Core Architecture</Text>
        </View>
        <View style={styles.memberRow}>
          <Text style={styles.memberName}>Жұмабек Қуаныш</Text>
          <Text style={styles.memberRole}>Mobile Frontend & UI/UX</Text>
        </View>
        <View style={[styles.memberRow, { borderBottomWidth: 0, paddingBottom: 2 }]}>
          <Text style={styles.memberName}>Асқар Заңғар</Text>
          <Text style={styles.memberRole}>Data Models & Integrations</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <Layers size={16} color={COLORS.accent} strokeWidth={1.75} />
          <Text style={styles.cardTitle}>Технологический стек</Text>
        </View>

        <Text style={styles.stackLine}>· 100% TypeScript (Expo SDK 58 & React Native Web)</Text>
        <Text style={styles.stackLine}>· BLE Radar & Haversine Geofence Verification</Text>
        <Text style={styles.stackLine}>· Freedom Bank Student Black FinTech Pass</Text>
        <Text style={styles.stackLine}>· Wikipedia Research API & eGov Digital ID</Text>
      </View>

      <View style={styles.footerRow}>
        <ShieldCheck size={14} color={COLORS.textTertiary} strokeWidth={1.75} />
        <Text style={styles.footerCopy}>2026 Astana IT University · Software Engineering</Text>
      </View>
    </AppShell>
  );
};

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 28,
    alignItems: 'center',
    gap: 8,
    marginBottom: 18,
  },
  appName: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.4,
    marginTop: 6,
    fontFamily: FONT_FAMILY.sans,
  },
  appSub: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontFamily: FONT_FAMILY.sans,
  },
  versionPill: {
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
    marginTop: 4,
  },
  versionText: {
    color: COLORS.textTertiary,
    fontSize: 11,
    fontFamily: FONT_FAMILY.mono,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    marginBottom: 16,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  memberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 10,
  },
  memberName: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.sans,
  },
  memberRole: {
    color: COLORS.accentBright,
    fontSize: 12,
    fontFamily: FONT_FAMILY.sans,
  },
  stackLine: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 22,
    fontFamily: FONT_FAMILY.sans,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 6,
  },
  footerCopy: {
    color: COLORS.textTertiary,
    fontSize: 11,
    fontFamily: FONT_FAMILY.sans,
  },
});
