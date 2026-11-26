import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useResponsive } from '../hooks/useResponsive';
import { LinearGradient } from 'expo-linear-gradient';
import { Copy, Check, Sparkles } from 'lucide-react-native';
import { PartnerPerk, StudentProfile } from '../types';
import { COLORS, FONT_FAMILY, RADIUS } from '../theme/tokens';
import { AppShell } from './ui/AppShell';

interface FreedomPerksScreenProps {
  student: StudentProfile;
  perks: PartnerPerk[];
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onBack: () => void;
}

const CATEGORIES = [
  { key: 'all', label: 'Все предложения' },
  { key: 'food', label: 'Еда и кофе' },
  { key: 'lifestyle', label: 'Кино и досуг' },
  { key: 'edtech', label: 'IT-инструменты' },
  { key: 'travel', label: 'Транспорт' },
];

export const FreedomPerksScreen: React.FC<FreedomPerksScreenProps> = ({
  student,
  perks,
  currentPage,
  onNavigate,
  onLogout,
  onBack,
}) => {
  const { isDesktop } = useResponsive();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered =
    selectedCategory === 'all'
      ? perks
      : perks.filter((p) => p.category === selectedCategory);

  const handleCopy = (id: string, code?: string) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
    Alert.alert(
      'Промокод скопирован',
      `Код ${code} активирован для вашей карты Student Black.`
    );
  };

  return (
    <AppShell
      currentPage={currentPage}
      onNavigate={onNavigate}
      onLogout={onLogout}
      student={student}
      title="Freedom Perks"
      subtitle="Эксклюзивные скидки и кешбэк для студентов AITU"
      onBack={onBack}
    >
      {/* Hero Banner */}
      <LinearGradient
        colors={['#151922', '#10131A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroCard}
      >
        <View style={styles.heroTag}>
          <Sparkles size={13} color={COLORS.accent} strokeWidth={2} />
          <Text style={styles.heroTagText}>FREEDOM ECOSYSTEM</Text>
        </View>
        <Text style={styles.heroTitle}>Кешбэк до 20% по карте Student Black</Text>
        <Text style={styles.heroDesc}>
          Используйте промокоды у партнёров вокруг кампуса AITU или оплачивайте картой Freedom напрямую.
        </Text>
      </LinearGradient>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0, marginBottom: 18 }}
        contentContainerStyle={styles.catRow}
      >
        {CATEGORIES.map((c) => {
          const active = selectedCategory === c.key;
          return (
            <TouchableOpacity
              key={c.key}
              style={[styles.catPill, active && styles.catPillActive]}
              onPress={() => setSelectedCategory(c.key)}
              activeOpacity={0.78}
            >
              <Text style={[styles.catText, active && styles.catTextActive]}>{c.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Perks Grid */}
      <View style={styles.perksGrid}>
        {filtered.map((perk) => {
          const isCopied = copiedId === perk.id;
          return (
            <View
              key={perk.id}
              style={[styles.perkCard, isDesktop && styles.perkCardDesktop]}
            >
              <View style={styles.perkHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.partnerName}>{perk.partnerName}</Text>
                  <Text style={styles.perkTitle}>{perk.title}</Text>
                </View>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{perk.discount}</Text>
                </View>
              </View>

              <Text style={styles.perkDesc}>{perk.description}</Text>

              <View style={styles.perkFooter}>
                <Text style={styles.expiryText}>До {perk.expiresAt}</Text>
                {perk.promoCode && (
                  <TouchableOpacity
                    style={[styles.codeBtn, isCopied && styles.codeBtnCopied]}
                    onPress={() => handleCopy(perk.id, perk.promoCode)}
                    activeOpacity={0.8}
                  >
                    {isCopied ? (
                      <Check size={12} color={COLORS.accentBright} strokeWidth={2.5} />
                    ) : (
                      <Copy size={12} color={COLORS.textSecondary} strokeWidth={1.75} />
                    )}
                    <Text style={[styles.codeText, isCopied && { color: COLORS.accentBright }]}>
                      {isCopied ? 'Скопировано' : perk.promoCode}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </AppShell>
  );
};

const styles = StyleSheet.create({
  heroCard: {
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.borderStrong,
    padding: 20,
    marginBottom: 18,
    gap: 6,
  },
  heroTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heroTagText: {
    color: COLORS.accentBright,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    fontFamily: FONT_FAMILY.sans,
  },
  heroTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  heroDesc: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    fontFamily: FONT_FAMILY.sans,
  },
  catRow: {
    flexDirection: 'row',
    gap: 8,
  },
  catPill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  catPillActive: {
    backgroundColor: COLORS.surfaceElevated,
    borderColor: COLORS.borderAccent,
  },
  catText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.sans,
  },
  catTextActive: {
    color: COLORS.accentBright,
    fontWeight: '600',
  },
  perksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
  },
  perkCard: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    justifyContent: 'space-between',
    gap: 12,
  },
  perkCardDesktop: {
    width: '49%',
  },
  perkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  partnerName: {
    color: COLORS.textTertiary,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.4,
    fontFamily: FONT_FAMILY.sans,
  },
  perkTitle: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    marginTop: 2,
    fontFamily: FONT_FAMILY.sans,
  },
  discountBadge: {
    backgroundColor: COLORS.accentSoft,
    borderWidth: 1,
    borderColor: COLORS.borderAccent,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
  },
  discountText: {
    color: COLORS.accentBright,
    fontSize: 11,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.sans,
  },
  perkDesc: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: FONT_FAMILY.sans,
  },
  perkFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 12,
  },
  expiryText: {
    color: COLORS.textTertiary,
    fontSize: 11,
    fontFamily: FONT_FAMILY.mono,
  },
  codeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
  },
  codeBtnCopied: {
    borderColor: COLORS.borderAccent,
    backgroundColor: COLORS.accentSoft,
  },
  codeText: {
    color: COLORS.textPrimary,
    fontSize: 11,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.mono,
  },
});
