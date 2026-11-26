import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Wifi } from 'lucide-react-native';
import { StudentProfile } from '../../types';
import { COLORS, FONT_FAMILY, RADIUS } from '../../theme/tokens';
import { EmvChipSvg, RealBarcodeSvg } from './QrBarcodeSvg';

interface FreedomCardProps {
  student: StudentProfile;
  balanceVisible?: boolean;
}

export const FreedomCard: React.FC<FreedomCardProps> = ({
  student,
  balanceVisible = true,
}) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={() => setFlipped(!flipped)}
      style={styles.outerWrap}
    >
      <LinearGradient
        colors={flipped ? ['#12141B', '#0B0D12'] : ['#191D26', '#10131A', '#0B0D12']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {/* Subtle metallic top sheen (smooth gradient, never a hard circle) */}
        <LinearGradient
          colors={['rgba(16, 185, 129, 0.16)', 'rgba(16, 185, 129, 0.03)', 'transparent']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0.15, y: 0.85 }}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />

        {!flipped ? (
          <>
            {/* Top row */}
            <View style={styles.headerRow}>
              <View style={styles.brandGroup}>
                <View style={styles.emeraldDot} />
                <Text style={styles.brandFreedom}>FREEDOM</Text>
                <Text style={styles.brandSep}>·</Text>
                <Text style={styles.brandUniv}>AITU</Text>
              </View>
              <View style={styles.tierRow}>
                <Text style={styles.tierLabel}>STUDENT BLACK</Text>
                <View style={{ transform: [{ rotate: '90deg' }], marginLeft: 8 }}>
                  <Wifi size={15} color={COLORS.textSecondary} strokeWidth={1.75} />
                </View>
              </View>
            </View>

            {/* Chip + Balance */}
            <View style={styles.middleRow}>
              <View style={styles.chipBalanceRow}>
                <EmvChipSvg />
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.balanceCaption}>Баланс карты</Text>
                  <Text style={styles.balanceValue}>
                    {balanceVisible
                      ? `${student.cardDetails.balance.toLocaleString('ru-RU')} ₸`
                      : '•••••• ₸'}
                  </Text>
                </View>
              </View>

              <View style={styles.numberRow}>
                <Text style={styles.cardNumber}>
                  {balanceVisible ? student.cardDetails.cardNumber : '••••  ••••  ••••  9842'}
                </Text>
                <Text style={styles.scholarshipPill}>
                  Стипендия +{student.cardDetails.scholarshipAmount.toLocaleString('ru-RU')} ₸
                </Text>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footerRow}>
              <View>
                <Text style={styles.metaLabel}>CARDHOLDER</Text>
                <Text style={styles.holderName}>{student.cardDetails.cardHolder}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.metaLabel}>VALID THRU</Text>
                <Text style={styles.expiresValue}>{student.cardDetails.expiresMonthYear}</Text>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.backWrap}>
            <View style={styles.magStripe} />
            <View style={styles.sigRow}>
              <View style={styles.sigPad}>
                <Text style={styles.sigText}>{student.fullName}</Text>
              </View>
              <View style={styles.cvvPad}>
                <Text style={styles.cvvCaption}>CVV</Text>
                <Text style={styles.cvvCode}>784</Text>
              </View>
            </View>
            <View style={styles.barcodeWrap}>
              <RealBarcodeSvg width={196} height={26} value={student.studentId} />
              <Text style={styles.barcodeId}>ID {student.studentId}</Text>
            </View>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outerWrap: {
    width: '100%',
    maxWidth: 440,
  },
  card: {
    width: '100%',
    minHeight: 224,
    borderRadius: RADIUS.xl,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.borderStrong,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  emeraldDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.accent,
  },
  brandFreedom: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.4,
    fontFamily: FONT_FAMILY.sans,
  },
  brandSep: {
    color: COLORS.textTertiary,
    fontSize: 12,
  },
  brandUniv: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    fontFamily: FONT_FAMILY.sans,
  },
  tierRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tierLabel: {
    color: COLORS.textSecondary,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
    fontFamily: FONT_FAMILY.sans,
  },
  middleRow: {
    marginVertical: 14,
    gap: 14,
  },
  chipBalanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceCaption: {
    color: COLORS.textTertiary,
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 2,
    fontFamily: FONT_FAMILY.sans,
  },
  balanceValue: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.5,
    fontFamily: FONT_FAMILY.sans,
  },
  numberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  cardNumber: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontFamily: FONT_FAMILY.mono,
    letterSpacing: 1.8,
  },
  scholarshipPill: {
    color: COLORS.accentBright,
    fontSize: 11,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  metaLabel: {
    color: COLORS.textTertiary,
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.8,
    fontFamily: FONT_FAMILY.sans,
  },
  holderName: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.8,
    marginTop: 2,
    fontFamily: FONT_FAMILY.sans,
  },
  expiresValue: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
    fontFamily: FONT_FAMILY.mono,
  },
  backWrap: {
    flex: 1,
    justifyContent: 'space-between',
  },
  magStripe: {
    height: 36,
    backgroundColor: '#040507',
    marginHorizontal: -20,
    marginTop: -4,
  },
  sigRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  sigPad: {
    flex: 1,
    height: 32,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  sigText: {
    color: '#111827',
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: '600',
  },
  cvvPad: {
    width: 60,
    height: 32,
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cvvCaption: {
    color: COLORS.textTertiary,
    fontSize: 8,
    fontWeight: '600',
  },
  cvvCode: {
    color: COLORS.textPrimary,
    fontSize: 11,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.mono,
  },
  barcodeWrap: {
    alignItems: 'center',
    gap: 4,
  },
  barcodeId: {
    color: COLORS.textSecondary,
    fontSize: 10,
    fontFamily: FONT_FAMILY.mono,
    letterSpacing: 1.5,
  },
});
