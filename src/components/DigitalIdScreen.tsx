import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useResponsive } from '../hooks/useResponsive';
import { LinearGradient } from 'expo-linear-gradient';
import { ShieldCheck, Wifi, Share2, RotateCw } from 'lucide-react-native';
import { StudentProfile } from '../types';
import { COLORS, FONT_FAMILY, RADIUS } from '../theme/tokens';
import { AppShell } from './ui/AppShell';
import { EmvChipSvg, RealBarcodeSvg, RealQrSvg } from './ui/QrBarcodeSvg';

interface DigitalIdScreenProps {
  student: StudentProfile;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onBack: () => void;
}

export const DigitalIdScreen: React.FC<DigitalIdScreenProps> = ({
  student,
  currentPage,
  onNavigate,
  onLogout,
  onBack,
}) => {
  const { isDesktop } = useResponsive();
  const [flipped, setFlipped] = useState(false);

  const initials = student.fullName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  const handleShare = () => {
    Alert.alert(
      'eGov Mobile QR',
      'QR-код студенческого билета сгенерирован и подписан ЭЦП. Действителен 15 минут для турникетов и подтверждения статуса.'
    );
  };

  const egovBadge = (
    <TouchableOpacity style={styles.egovPill} onPress={handleShare} activeOpacity={0.8}>
      <ShieldCheck size={14} color={COLORS.accent} strokeWidth={2} />
      <Text style={styles.egovPillText}>eGov Verified</Text>
    </TouchableOpacity>
  );

  return (
    <AppShell
      currentPage={currentPage}
      onNavigate={onNavigate}
      onLogout={onLogout}
      student={student}
      title="Digital Student ID"
      subtitle="Официальный пропуск и удостоверение AITU"
      onBack={onBack}
      rightAction={egovBadge}
    >
      <View style={[styles.layoutGrid, isDesktop && styles.layoutGridDesktop]}>
        {/* Left: Interactive Card */}
        <View style={isDesktop ? { flex: 1.05 } : undefined}>
          <TouchableOpacity
            activeOpacity={0.94}
            onPress={() => setFlipped(!flipped)}
          >
            <LinearGradient
              colors={flipped ? ['#12141B', '#0B0D12'] : ['#191D26', '#10131A', '#0B0D12']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.idCard}
            >
              <LinearGradient
                colors={['rgba(16, 185, 129, 0.16)', 'rgba(16, 185, 129, 0.02)', 'transparent']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0.1, y: 0.85 }}
                style={StyleSheet.absoluteFill}
                pointerEvents="none"
              />

              {!flipped ? (
                <>
                  <View style={styles.cardTopRow}>
                    <View style={styles.univGroup}>
                      <View style={styles.emeraldDot} />
                      <View>
                        <Text style={styles.univName}>ASTANA IT UNIVERSITY</Text>
                        <Text style={styles.cardType}>STUDENT IDENTITY PASS</Text>
                      </View>
                    </View>
                    <View style={styles.activeBadge}>
                      <Text style={styles.activeBadgeText}>Активен</Text>
                    </View>
                  </View>

                  <View style={styles.profileSection}>
                    <View style={styles.monogramWrap}>
                      <View style={styles.monogramCircle}>
                        <Text style={styles.monogramText}>{initials}</Text>
                      </View>
                      <View style={styles.grantBadge}>
                        <Text style={styles.grantBadgeText}>ГРАНТ</Text>
                      </View>
                    </View>

                    <View style={{ flex: 1, gap: 4 }}>
                      <Text style={styles.studentName}>{student.fullName}</Text>
                      <View style={styles.groupBadge}>
                        <Text style={styles.groupBadgeText}>{student.group}</Text>
                      </View>
                      <Text style={styles.studentMajor}>{student.major}</Text>
                      <Text style={styles.studentFaculty}>{student.faculty}</Text>
                    </View>
                  </View>

                  <View style={styles.chipRow}>
                    <EmvChipSvg />
                    <View style={styles.turnstileRow}>
                      <View style={{ transform: [{ rotate: '90deg' }] }}>
                        <Wifi size={14} color={COLORS.textSecondary} strokeWidth={1.75} />
                      </View>
                      <Text style={styles.turnstileText}>NFC Campus Access</Text>
                    </View>
                  </View>

                  <View style={styles.cardFooter}>
                    <View>
                      <Text style={styles.footerLabel}>STUDENT ID</Text>
                      <Text style={styles.footerValMono}>{student.studentId}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={styles.footerLabel}>ОБУЧЕНИЕ</Text>
                      <Text style={styles.footerVal}>{student.course} курс · Бакалавриат</Text>
                    </View>
                  </View>
                </>
              ) : (
                <View style={styles.backWrap}>
                  <View style={styles.magStrip} />
                  <View style={styles.qrCenter}>
                    <RealQrSvg size={102} seed={student.studentId} />
                    <View style={styles.barcodeUnder}>
                      <RealBarcodeSvg width={180} height={24} value={student.studentId} />
                      <Text style={styles.barcodeId}>{student.studentId}</Text>
                    </View>
                  </View>
                  <Text style={styles.legalNote}>
                    Документ заверен ЭЦП и верифицирован через eGov Mobile.
                  </Text>
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.flipHintBtn}
            onPress={() => setFlipped(!flipped)}
            activeOpacity={0.75}
          >
            <RotateCw size={13} color={COLORS.textTertiary} strokeWidth={1.75} />
            <Text style={styles.flipHintText}>
              {flipped ? 'Показать лицевую сторону' : 'Перевернуть для QR-кода'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Right: Structured Details Table & Actions */}
        <View style={[styles.rightColumn, isDesktop && { flex: 1 }]}>
          <View style={styles.detailsCard}>
            <Text style={styles.detailsTitle}>Сведения о студенте</Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailKey}>Форма обучения</Text>
              <Text style={styles.detailVal}>Очная (Гос. грант)</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailKey}>Академический статус</Text>
              <Text style={[styles.detailVal, { color: COLORS.accentBright }]}>
                Без задолженностей
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailKey}>ИИН</Text>
              <Text style={styles.detailValMono}>{student.iin}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailKey}>Счёт IBAN (Freedom)</Text>
              <Text style={styles.detailValMono}>KZ448560000000000000</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailKey}>Стипендия</Text>
              <Text style={[styles.detailValMono, { color: COLORS.accentBright }]}>
                +{student.cardDetails.scholarshipAmount.toLocaleString('ru-RU')} ₸
              </Text>
            </View>
            <View style={[styles.detailRow, { borderBottomWidth: 0, paddingBottom: 2 }]}>
              <Text style={styles.detailKey}>Действителен до</Text>
              <Text style={styles.detailValMono}>30.06.2027</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={handleShare}
            activeOpacity={0.85}
          >
            <Share2 size={16} color={COLORS.textInverse} strokeWidth={2} />
            <Text style={styles.primaryBtnText}>Поделиться QR (eGov Mobile)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AppShell>
  );
};

const styles = StyleSheet.create({
  egovPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.accentSoft,
    borderWidth: 1,
    borderColor: COLORS.borderAccent,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.pill,
  },
  egovPillText: {
    color: COLORS.accentBright,
    fontSize: 11,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  layoutGrid: {
    gap: 20,
  },
  layoutGridDesktop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  idCard: {
    borderRadius: RADIUS.xl,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.borderStrong,
    minHeight: 266,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  univGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emeraldDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.accent,
  },
  univName: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    fontFamily: FONT_FAMILY.sans,
  },
  cardType: {
    color: COLORS.textTertiary,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.6,
    marginTop: 1,
    fontFamily: FONT_FAMILY.sans,
  },
  activeBadge: {
    backgroundColor: COLORS.accentSoft,
    borderWidth: 1,
    borderColor: COLORS.borderAccent,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.pill,
  },
  activeBadgeText: {
    color: COLORS.accentBright,
    fontSize: 10,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginVertical: 18,
  },
  monogramWrap: {
    alignItems: 'center',
  },
  monogramCircle: {
    width: 64,
    height: 76,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.borderStrong,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monogramText: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
    fontFamily: FONT_FAMILY.sans,
  },
  grantBadge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: -9,
  },
  grantBadgeText: {
    color: COLORS.textInverse,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
    fontFamily: FONT_FAMILY.sans,
  },
  studentName: {
    color: COLORS.textPrimary,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.2,
    fontFamily: FONT_FAMILY.sans,
  },
  groupBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 5,
  },
  groupBadgeText: {
    color: COLORS.accentBright,
    fontSize: 11,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.mono,
  },
  studentMajor: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.sans,
  },
  studentFaculty: {
    color: COLORS.textTertiary,
    fontSize: 11,
    fontFamily: FONT_FAMILY.sans,
  },
  chipRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  turnstileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  turnstileText: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.sans,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 12,
    marginTop: 14,
  },
  footerLabel: {
    color: COLORS.textTertiary,
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.8,
    fontFamily: FONT_FAMILY.sans,
  },
  footerValMono: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
    fontFamily: FONT_FAMILY.mono,
  },
  footerVal: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
    fontFamily: FONT_FAMILY.sans,
  },
  backWrap: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 12,
  },
  magStrip: {
    height: 36,
    backgroundColor: '#040507',
    marginHorizontal: -22,
    marginTop: -4,
  },
  qrCenter: {
    alignItems: 'center',
    gap: 12,
  },
  barcodeUnder: {
    alignItems: 'center',
    gap: 4,
  },
  barcodeId: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontFamily: FONT_FAMILY.mono,
    letterSpacing: 2,
  },
  legalNote: {
    color: COLORS.textTertiary,
    fontSize: 10,
    textAlign: 'center',
    fontFamily: FONT_FAMILY.sans,
  },
  flipHintBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
    paddingVertical: 6,
  },
  flipHintText: {
    color: COLORS.textTertiary,
    fontSize: 12,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.sans,
  },

  /* Right Column */
  rightColumn: {
    gap: 16,
  },
  detailsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
  },
  detailsTitle: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    fontFamily: FONT_FAMILY.sans,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 12,
  },
  detailKey: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontFamily: FONT_FAMILY.sans,
  },
  detailVal: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
    textAlign: 'right',
  },
  detailValMono: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.mono,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    borderRadius: RADIUS.md,
  },
  primaryBtnText: {
    color: COLORS.textInverse,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
});
