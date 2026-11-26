import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Check } from 'lucide-react-native';
import { StudentProfile } from '../types';
import { COLORS, FONT_FAMILY, RADIUS } from '../theme/tokens';
import { AppShell } from './ui/AppShell';

interface LanguageScreenProps {
  student: StudentProfile;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onBack: () => void;
}

const LANGUAGES = [
  { code: 'ru', short: 'RU', name: 'Русский', native: 'Русский язык интерфейса' },
  { code: 'kz', short: 'KZ', name: 'Қазақша', native: 'Қазақ тіліндегі интерфейс' },
  { code: 'en', short: 'EN', name: 'English', native: 'English (US) interface' },
];

export const LanguageScreen: React.FC<LanguageScreenProps> = ({
  student,
  currentPage,
  onNavigate,
  onLogout,
  onBack,
}) => {
  const [selected, setSelected] = useState('ru');

  return (
    <AppShell
      currentPage={currentPage}
      onNavigate={onNavigate}
      onLogout={onLogout}
      student={student}
      title="Язык интерфейса"
      subtitle="Локализация дисциплин, расписания и сервисов"
      onBack={onBack}
    >
      <View style={styles.wrap}>
        <View style={styles.listCard}>
          {LANGUAGES.map((lang, idx) => {
            const isSelected = selected === lang.code;
            return (
              <React.Fragment key={lang.code}>
                <TouchableOpacity
                  style={styles.langRow}
                  onPress={() => setSelected(lang.code)}
                  activeOpacity={0.75}
                >
                  <View style={styles.langLeft}>
                    <View style={[styles.codeBadge, isSelected && styles.codeBadgeActive]}>
                      <Text
                        style={[
                          styles.codeText,
                          isSelected && { color: COLORS.accentBright },
                        ]}
                      >
                        {lang.short}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.langName}>{lang.name}</Text>
                      <Text style={styles.langNative}>{lang.native}</Text>
                    </View>
                  </View>

                  {isSelected && <Check size={17} color={COLORS.accent} strokeWidth={2.2} />}
                </TouchableOpacity>
                {idx < LANGUAGES.length - 1 && <View style={styles.divider} />}
              </React.Fragment>
            );
          })}
        </View>

        <TouchableOpacity style={styles.applyBtn} onPress={onBack} activeOpacity={0.85}>
          <Text style={styles.applyBtnText}>Применить</Text>
        </TouchableOpacity>
      </View>
    </AppShell>
  );
};

const styles = StyleSheet.create({
  wrap: {
    maxWidth: 520,
    gap: 18,
  },
  listCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
  },
  langRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  langLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  codeBadge: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeBadgeActive: {
    backgroundColor: COLORS.accentSoft,
    borderColor: COLORS.borderAccent,
  },
  codeText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.mono,
  },
  langName: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  langNative: {
    color: COLORS.textTertiary,
    fontSize: 12,
    marginTop: 1,
    fontFamily: FONT_FAMILY.sans,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  applyBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    alignItems: 'center',
  },
  applyBtnText: {
    color: COLORS.textInverse,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
});
