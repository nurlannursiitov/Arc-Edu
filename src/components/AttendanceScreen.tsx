import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Alert,
  Platform,
} from 'react-native';
import { useResponsive } from '../hooks/useResponsive';
import Svg, { Circle, Line, Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import {
  Radio,
  Nfc,
  QrCode,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react-native';
import { Classroom, StudentProfile } from '../types';
import { COLORS, FONT_FAMILY, RADIUS } from '../theme/tokens';
import { AppShell } from './ui/AppShell';
import { RadarService } from '../services/radarService';

interface AttendanceScreenProps {
  student: StudentProfile;
  classroom: Classroom;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onBack: () => void;
}

export const AttendanceScreen: React.FC<AttendanceScreenProps> = ({
  student,
  classroom,
  currentPage,
  onNavigate,
  onLogout,
  onBack,
}) => {
  const { isDesktop } = useResponsive();

  const spinAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;

  const [simulateFar, setSimulateFar] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [scanMode, setScanMode] = useState<'radar' | 'nfc' | 'qr'>('radar');

  // Compute geofence via RadarService with deterministic simulated student coordinates
  const studentLat = simulateFar ? classroom.latitude + 0.00075 : classroom.latitude + 0.00018;
  const studentLon = simulateFar ? classroom.longitude + 0.0004 : classroom.longitude + 0.00014;
  const geofence = RadarService.verifyClassroomPresence(studentLat, studentLon, classroom);

  useEffect(() => {
    const useNative = Platform.OS !== 'web';
    const spinLoop = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 3800,
        easing: Easing.linear,
        useNativeDriver: useNative,
      })
    );
    const pulseLoop = Animated.loop(
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 2400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: useNative,
      })
    );
    spinLoop.start();
    pulseLoop.start();

    return () => {
      spinLoop.stop();
      pulseLoop.stop();
    };
  }, [spinAnim, pulseAnim]);

  const spinDeg = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const pulseScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });

  const pulseOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.55, 0],
  });

  const handleCheckIn = () => {
    if (geofence.isWithinRadius) {
      setIsCheckedIn(true);
      Alert.alert(
        'Присутствие подтверждено',
        `Отметка зафиксирована для пары «${classroom.currentSubject}» в аудитории ${classroom.number} (${geofence.distanceMeters} м от маяка).`
      );
    } else {
      Alert.alert(
        'Вне зоны аудитории',
        `Текущее расстояние ${geofence.distanceMeters} м превышает допустимый радиус ${geofence.allowedRadiusMeters} м.`
      );
    }
  };

  const simAction = (
    <TouchableOpacity
      style={[styles.simPill, !geofence.isWithinRadius && styles.simPillWarn]}
      onPress={() => setSimulateFar(!simulateFar)}
      activeOpacity={0.8}
    >
      <Text style={[styles.simPillText, !geofence.isWithinRadius && { color: COLORS.warning }]}>
        Тест: {geofence.distanceMeters} м
      </Text>
    </TouchableOpacity>
  );

  return (
    <AppShell
      currentPage={currentPage}
      onNavigate={onNavigate}
      onLogout={onLogout}
      student={student}
      title="Radar Attendance"
      subtitle="Геофенсинг и отметка присутствия на занятии"
      onBack={onBack}
      rightAction={simAction}
    >
      <View style={[styles.grid, isDesktop && styles.gridDesktop]}>
        {/* Left: Precision Visual Scanner */}
        <View style={[styles.scannerCard, isDesktop && { flex: 1 }]}>
          <View style={styles.tabsRow}>
            <TouchableOpacity
              style={[styles.tabBtn, scanMode === 'radar' && styles.tabBtnActive]}
              onPress={() => setScanMode('radar')}
            >
              <Radio
                size={14}
                color={scanMode === 'radar' ? COLORS.accent : COLORS.textSecondary}
                strokeWidth={1.75}
              />
              <Text style={[styles.tabText, scanMode === 'radar' && styles.tabTextActive]}>
                BLE Radar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabBtn, scanMode === 'nfc' && styles.tabBtnActive]}
              onPress={() => setScanMode('nfc')}
            >
              <Nfc
                size={14}
                color={scanMode === 'nfc' ? COLORS.accent : COLORS.textSecondary}
                strokeWidth={1.75}
              />
              <Text style={[styles.tabText, scanMode === 'nfc' && styles.tabTextActive]}>
                NFC Tag
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabBtn, scanMode === 'qr' && styles.tabBtnActive]}
              onPress={() => setScanMode('qr')}
            >
              <QrCode
                size={14}
                color={scanMode === 'qr' ? COLORS.accent : COLORS.textSecondary}
                strokeWidth={1.75}
              />
              <Text style={[styles.tabText, scanMode === 'qr' && styles.tabTextActive]}>
                Dynamic QR
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.scannerStage}>
            {scanMode === 'radar' && (
              <View style={styles.radarBox}>
                {/* Static Precision Concentric SVG Rings + Crosshair */}
                <Svg width={240} height={240} viewBox="0 0 240 240">
                  <Circle cx={120} cy={120} r={112} stroke="rgba(255,255,255,0.06)" strokeWidth={1} fill="none" />
                  <Circle cx={120} cy={120} r={82} stroke="rgba(255,255,255,0.06)" strokeWidth={1} fill="none" />
                  <Circle cx={120} cy={120} r={52} stroke="rgba(16,185,129,0.22)" strokeWidth={1} fill="none" />
                  <Line x1={120} y1={8} x2={120} y2={232} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
                  <Line x1={8} y1={120} x2={232} y2={120} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
                </Svg>

                {/* Animated Rotating Radar Sweep */}
                <Animated.View
                  style={[
                    styles.sweepOverlay,
                    { transform: [{ rotate: spinDeg }] },
                  ]}
                  pointerEvents="none"
                >
                  <Svg width={240} height={240} viewBox="0 0 240 240">
                    <Defs>
                      <SvgGradient id="sweepGrad" x1="120" y1="120" x2="210" y2="40" gradientUnits="userSpaceOnUse">
                        <Stop
                          offset="0"
                          stopColor={geofence.isWithinRadius ? COLORS.accent : COLORS.warning}
                          stopOpacity="0.32"
                        />
                        <Stop
                          offset="1"
                          stopColor={geofence.isWithinRadius ? COLORS.accent : COLORS.warning}
                          stopOpacity="0"
                        />
                      </SvgGradient>
                    </Defs>
                    <Path d="M120 120 L120 10 A110 110 0 0 1 215 65 Z" fill="url(#sweepGrad)" />
                    <Line
                      x1={120}
                      y1={120}
                      x2={120}
                      y2={10}
                      stroke={geofence.isWithinRadius ? COLORS.accent : COLORS.warning}
                      strokeWidth={1.5}
                      strokeOpacity={0.75}
                    />
                  </Svg>
                </Animated.View>

                {/* Subtle Pulse Ring */}
                <Animated.View
                  style={[
                    styles.pulseCircle,
                    {
                      borderColor: geofence.isWithinRadius ? COLORS.accent : COLORS.warning,
                      transform: [{ scale: pulseScale }],
                      opacity: pulseOpacity,
                    },
                  ]}
                  pointerEvents="none"
                />

                {/* Core Readout */}
                <View
                  style={[
                    styles.radarCore,
                    {
                      borderColor: geofence.isWithinRadius
                        ? COLORS.borderAccent
                        : 'rgba(245, 158, 11, 0.35)',
                    },
                  ]}
                >
                  <Text style={styles.distanceNum}>{geofence.distanceMeters} м</Text>
                  <Text
                    style={[
                      styles.distanceSub,
                      { color: geofence.isWithinRadius ? COLORS.accentBright : COLORS.warning },
                    ]}
                  >
                    {geofence.isWithinRadius ? 'В ЗОНЕ' : 'ДАЛЕКО'}
                  </Text>
                </View>
              </View>
            )}

            {scanMode === 'nfc' && (
              <View style={styles.altStage}>
                <View style={styles.altRingOuter}>
                  <View style={styles.altRingInner}>
                    <Nfc size={34} color={COLORS.accent} strokeWidth={1.6} />
                  </View>
                </View>
                <Text style={styles.altTitle}>Поднесите смартфон к NFC-метке</Text>
                <Text style={styles.altSub}>Метка установлена на кафедре аудитории {classroom.number}</Text>
              </View>
            )}

            {scanMode === 'qr' && (
              <View style={styles.altStage}>
                <View style={styles.qrFrame}>
                  <QrCode size={52} color={COLORS.textPrimary} strokeWidth={1.5} />
                </View>
                <Text style={styles.altTitle}>Сканируйте код на экране проектора</Text>
                <Text style={styles.altSub}>Динамический токен обновляется каждые 30 секунд</Text>
              </View>
            )}
          </View>
        </View>

        {/* Right: Lecture Context & Verification */}
        <View style={[styles.rightCol, isDesktop && { flex: 1 }]}>
          <View style={styles.infoCard}>
            <View style={styles.infoTopRow}>
              <View style={styles.roomBadge}>
                <MapPin size={12} color={COLORS.accent} strokeWidth={1.75} />
                <Text style={styles.roomBadgeText}>Аудитория {classroom.number}</Text>
              </View>
              <View style={styles.timeBadge}>
                <Clock size={12} color={COLORS.textTertiary} strokeWidth={1.75} />
                <Text style={styles.timeBadgeText}>{classroom.timeSlot}</Text>
              </View>
            </View>

            <Text style={styles.subjectTitle}>{classroom.currentSubject}</Text>
            <Text style={styles.profText}>
              {classroom.professor} · {classroom.building}
            </Text>
          </View>

          <View style={styles.statusCard}>
            <Text style={styles.statusHeader}>Параметры верификации</Text>

            <View style={styles.statusRow}>
              <Text style={styles.statusKey}>Допустимый радиус</Text>
              <Text style={styles.statusValMono}>{geofence.allowedRadiusMeters} м (BLE + GPS)</Text>
            </View>

            <View style={styles.statusRow}>
              <Text style={styles.statusKey}>Дистанция до маяка</Text>
              <View style={styles.statusInline}>
                {geofence.isWithinRadius ? (
                  <CheckCircle2 size={14} color={COLORS.accent} strokeWidth={2} />
                ) : (
                  <AlertCircle size={14} color={COLORS.warning} strokeWidth={2} />
                )}
                <Text
                  style={[
                    styles.statusVal,
                    { color: geofence.isWithinRadius ? COLORS.accentBright : COLORS.warning },
                  ]}
                >
                  {geofence.isWithinRadius ? 'В пределах аудитории' : 'Вне зоны доступа'}
                </Text>
              </View>
            </View>

            <View style={[styles.statusRow, { borderBottomWidth: 0, paddingBottom: 2 }]}>
              <Text style={styles.statusKey}>Антиспуфинг</Text>
              <View style={styles.statusInline}>
                <ShieldCheck size={14} color={COLORS.textSecondary} strokeWidth={1.75} />
                <Text style={styles.statusValMono}>AITU Signed Token</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            disabled={isCheckedIn}
            style={[
              styles.confirmBtn,
              isCheckedIn && styles.confirmBtnDone,
              !geofence.isWithinRadius && !isCheckedIn && styles.confirmBtnDisabled,
            ]}
            onPress={handleCheckIn}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.confirmBtnText,
                !geofence.isWithinRadius && !isCheckedIn && { color: COLORS.textTertiary },
              ]}
            >
              {isCheckedIn
                ? 'Присутствие подтверждено'
                : geofence.isWithinRadius
                ? 'Подтвердить присутствие'
                : `Подойдите ближе (${geofence.distanceMeters} м > ${geofence.allowedRadiusMeters} м)`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </AppShell>
  );
};

const styles = StyleSheet.create({
  simPill: {
    backgroundColor: COLORS.accentSoft,
    borderWidth: 1,
    borderColor: COLORS.borderAccent,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: RADIUS.pill,
  },
  simPillWarn: {
    backgroundColor: COLORS.warningSoft,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  simPillText: {
    color: COLORS.accentBright,
    fontSize: 11,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.mono,
  },
  grid: {
    gap: 18,
  },
  gridDesktop: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  scannerCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    justifyContent: 'space-between',
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.bg,
    borderRadius: RADIUS.md,
    padding: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 4,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: RADIUS.sm,
  },
  tabBtnActive: {
    backgroundColor: COLORS.surfaceElevated,
  },
  tabText: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  tabTextActive: {
    color: COLORS.textPrimary,
  },
  scannerStage: {
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radarBox: {
    width: 240,
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sweepOverlay: {
    position: 'absolute',
    width: 240,
    height: 240,
  },
  pulseCircle: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 1,
  },
  radarCore: {
    position: 'absolute',
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: COLORS.bg,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  distanceNum: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.mono,
  },
  distanceSub: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginTop: 2,
    fontFamily: FONT_FAMILY.sans,
  },
  altStage: {
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
  },
  altRingOuter: {
    width: 116,
    height: 116,
    borderRadius: 58,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  altRingInner: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.borderAccent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrFrame: {
    width: 116,
    height: 116,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: COLORS.borderAccent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  altTitle: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: FONT_FAMILY.sans,
  },
  altSub: {
    color: COLORS.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: FONT_FAMILY.sans,
  },
  rightCol: {
    gap: 14,
    justifyContent: 'space-between',
  },
  infoCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
  },
  infoTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  roomBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.accentSoft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  roomBadgeText: {
    color: COLORS.accentBright,
    fontSize: 11,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  timeBadgeText: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontFamily: FONT_FAMILY.mono,
  },
  subjectTitle: {
    color: COLORS.textPrimary,
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.2,
    marginBottom: 4,
    fontFamily: FONT_FAMILY.sans,
  },
  profText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontFamily: FONT_FAMILY.sans,
  },
  statusCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
  },
  statusHeader: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
    fontFamily: FONT_FAMILY.sans,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  statusKey: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontFamily: FONT_FAMILY.sans,
  },
  statusInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusVal: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  statusValMono: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.mono,
  },
  confirmBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.md,
    paddingVertical: 15,
    alignItems: 'center',
  },
  confirmBtnDone: {
    backgroundColor: COLORS.accentDeep,
  },
  confirmBtnDisabled: {
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  confirmBtnText: {
    color: COLORS.textInverse,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
});
