import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing,
  Alert,
} from "react-native";
import { Classroom } from "../types";

interface AttendanceScreenProps {
  classroom: Classroom;
  onBack: () => void;
}

export const AttendanceScreen: React.FC<AttendanceScreenProps> = ({ classroom, onBack }) => {
  const [pulse] = useState(new Animated.Value(0));
  const [distance, setDistance] = useState(24); // meters away inside campus
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [scanMode, setScanMode] = useState<"radar" | "nfc" | "qr">("radar");

  useEffect(() => {
    Animated.loop(
      Animated.timing(pulse, {
        toValue: 1,
        duration: 2000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      })
    ).start();
  }, [pulse]);

  const scale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2.3],
  });

  const opacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 0],
  });

  const handleCheckIn = () => {
    if (distance <= classroom.beaconRange) {
      setIsCheckedIn(true);
      Alert.alert(
        "Посещение подтверждено! ✅",
        `Вы успешно отметились на паре "${classroom.currentSubject}" в аудитории ${classroom.number}. Время фиксации: ${new Date().toLocaleTimeString()}`
      );
    } else {
      Alert.alert(
        "Вне зоны аудитории",
        `Вы находитесь на расстоянии ${distance}м. Максимальный радиус геофенсинга аудитории ${classroom.number} составляет ${classroom.beaconRange}м.`
      );
    }
  };

  const toggleLocationSim = () => {
    setDistance(distance === 24 ? 85 : 24);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Radar Check-In</Text>
        <TouchableOpacity style={styles.simBtn} onPress={toggleLocationSim}>
          <Text style={styles.simBtnText}>Тест: {distance}м</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Lecture Banner */}
        <View style={styles.lectureInfo}>
          <Text style={styles.roomBadge}>АУДИТОРИЯ {classroom.number}</Text>
          <Text style={styles.subjectTitle}>{classroom.currentSubject}</Text>
          <Text style={styles.profName}>{classroom.professor}</Text>
          <Text style={styles.timeSlot}>⏰ {classroom.timeSlot}</Text>
        </View>

        {/* Mode Selector */}
        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[styles.tabBtn, scanMode === "radar" && styles.tabBtnActive]}
            onPress={() => setScanMode("radar")}
          >
            <Text style={[styles.tabBtnText, scanMode === "radar" && styles.tabBtnTextActive]}>
              📡 Geofence Radar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, scanMode === "nfc" && styles.tabBtnActive]}
            onPress={() => setScanMode("nfc")}
          >
            <Text style={[styles.tabBtnText, scanMode === "nfc" && styles.tabBtnTextActive]}>
              📱 NFC Tag
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, scanMode === "qr" && styles.tabBtnActive]}
            onPress={() => setScanMode("qr")}
          >
            <Text style={[styles.tabBtnText, scanMode === "qr" && styles.tabBtnTextActive]}>
              📷 Dynamic QR
            </Text>
          </TouchableOpacity>
        </View>

        {/* Visual Scanner Area */}
        <View style={styles.scannerWrapper}>
          {scanMode === "radar" && (
            <View style={styles.radarContainer}>
              <Animated.View
                style={[
                  styles.pulseRing,
                  {
                    transform: [{ scale }],
                    opacity,
                  },
                ]}
              />
              <View style={styles.radarCore}>
                <Text style={styles.radarCoreIcon}>📍</Text>
                <Text style={styles.distanceBadge}>{distance} метров</Text>
              </View>
            </View>
          )}

          {scanMode === "nfc" && (
            <View style={styles.nfcContainer}>
              <Text style={styles.nfcBigIcon}>📳</Text>
              <Text style={styles.nfcTitle}>Приложите телефон к парте</Text>
              <Text style={styles.nfcSub}>NFC-метка аудитории {classroom.number}</Text>
            </View>
          )}

          {scanMode === "qr" && (
            <View style={styles.qrContainer}>
              <View style={styles.qrFrame}>
                <Text style={styles.qrIcon}>🎯</Text>
                <Text style={styles.qrText}>Сканируйте QR на экране проектора преподавателя</Text>
              </View>
            </View>
          )}
        </View>

        {/* Geofence Status Card */}
        <View style={styles.statusBox}>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Радиус обнаружения:</Text>
            <Text style={styles.statusValue}>{classroom.beaconRange} метров (BLE & GPS)</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Статус верификации:</Text>
            <Text
              style={[
                styles.statusValue,
                { color: distance <= classroom.beaconRange ? "#10B981" : "#EF4444" },
              ]}
            >
              {distance <= classroom.beaconRange ? "В пределах аудитории ✓" : "Слишком далеко ✕"}
            </Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Защита от спуфинга:</Text>
            <Text style={[styles.statusValue, { color: "#00E5FF" }]}>Шифрование AITU Token ID</Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          disabled={isCheckedIn}
          style={[
            styles.checkInButton,
            isCheckedIn && styles.checkInButtonSuccess,
            distance > classroom.beaconRange && styles.checkInButtonDisabled,
          ]}
          onPress={handleCheckIn}
        >
          <Text style={styles.checkInButtonText}>
            {isCheckedIn
              ? "✓ ПРИСУТСТВИЕ ЗАФИКСИРОВАНО"
              : distance <= classroom.beaconRange
              ? "ПОДТВЕРДИТЬ ПРИСУТСТВИЕ НА ПАРЕ"
              : `ПОДОЙДИТЕ БЛИЖЕ (${distance}м > ${classroom.beaconRange}м)`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#070A11",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 8,
  },
  backButtonText: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "600",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  simBtn: {
    backgroundColor: "rgba(0,229,255,0.1)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#00E5FF",
  },
  simBtnText: {
    color: "#00E5FF",
    fontSize: 11,
    fontWeight: "700",
  },
  content: {
    padding: 20,
    flex: 1,
    justifyContent: "space-between",
  },
  lectureInfo: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  roomBadge: {
    color: "#00E5FF",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 4,
  },
  subjectTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 4,
  },
  profName: {
    color: "#94A3B8",
    fontSize: 13,
    marginBottom: 6,
  },
  timeSlot: {
    color: "#CBD5E1",
    fontSize: 12,
    fontWeight: "600",
  },
  tabsRow: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 12,
    padding: 4,
    marginVertical: 14,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 10,
  },
  tabBtnActive: {
    backgroundColor: "#1E293B",
  },
  tabBtnText: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "600",
  },
  tabBtnTextActive: {
    color: "#00E5FF",
    fontWeight: "700",
  },
  scannerWrapper: {
    height: 220,
    justifyContent: "center",
    alignItems: "center",
  },
  radarContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  pulseRing: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "#00E5FF",
    backgroundColor: "rgba(0, 229, 255, 0.15)",
  },
  radarCore: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#111827",
    borderWidth: 2,
    borderColor: "#00E5FF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#00E5FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 8,
  },
  radarCoreIcon: {
    fontSize: 26,
  },
  distanceBadge: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 2,
  },
  nfcContainer: {
    alignItems: "center",
  },
  nfcBigIcon: {
    fontSize: 54,
    marginBottom: 8,
  },
  nfcTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  nfcSub: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 2,
  },
  qrContainer: {
    width: "80%",
    aspectRatio: 1.2,
    borderWidth: 2,
    borderColor: "#00E5FF",
    borderRadius: 18,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  qrFrame: {
    alignItems: "center",
  },
  qrIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  qrText: {
    color: "#94A3B8",
    fontSize: 12,
    textAlign: "center",
  },
  statusBox: {
    backgroundColor: "#111827",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    gap: 8,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusLabel: {
    fontSize: 12,
    color: "#64748B",
  },
  statusValue: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  checkInButton: {
    backgroundColor: "#00E5FF",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#00E5FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  checkInButtonSuccess: {
    backgroundColor: "#10B981",
  },
  checkInButtonDisabled: {
    backgroundColor: "#334155",
  },
  checkInButtonText: {
    color: "#050B14",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});
