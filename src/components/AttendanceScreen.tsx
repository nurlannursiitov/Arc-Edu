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
  const [distance, setDistance] = useState(24);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [scanMode, setScanMode] = useState<"radar" | "nfc" | "qr">("radar");

  useEffect(() => {
    Animated.loop(
      Animated.timing(pulse, {
        toValue: 1,
        duration: 2200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      })
    ).start();
  }, [pulse]);

  const scale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2.4],
  });

  const opacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 0],
  });

  const handleCheckIn = () => {
    const range = classroom.beaconRange || classroom.allowed_radius_meters || 60;
    if (distance <= range) {
      setIsCheckedIn(true);
      Alert.alert(
        "Присутствие зафиксировано! ✅",
        `Вы успешно отметились на паре "${classroom.currentSubject}" в аудитории ${classroom.number}. Хэш верификации AITU Geofence записан в базу посещаемости.`
      );
    } else {
      Alert.alert(
        "Вне зоны аудитории ⚠️",
        `Вы находитесь на расстоянии ${distance}м. Максимальный радиус аудитории ${classroom.number} составляет ${range}м.`
      );
    }
  };

  const toggleLocationSim = () => {
    setDistance(distance === 24 ? 75 : 24);
  };

  const maxRange = classroom.beaconRange || classroom.allowed_radius_meters || 60;
  const inRange = distance <= maxRange;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Radar Attendance</Text>
        <TouchableOpacity style={styles.simBtn} onPress={toggleLocationSim}>
          <Text style={styles.simBtnText}>Тест: {distance}м</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Lecture Info Card */}
        <View style={styles.lectureInfo}>
          <View style={styles.lectureBadgeRow}>
            <View style={styles.roomPill}>
              <Text style={styles.roomPillText}>АУДИТОРИЯ {classroom.number}</Text>
            </View>
            <View style={styles.liveTag}>
              <View style={styles.liveDot} />
              <Text style={styles.liveTagText}>LIVE BEACON</Text>
            </View>
          </View>

          <Text style={styles.subjectTitle}>{classroom.currentSubject}</Text>
          <Text style={styles.profName}>{classroom.professor}</Text>
          <Text style={styles.timeSlot}>⏰ {classroom.timeSlot} • {classroom.building}</Text>
        </View>

        {/* Mode Selector */}
        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[styles.tabBtn, scanMode === "radar" && styles.tabBtnActive]}
            onPress={() => setScanMode("radar")}
          >
            <Text style={[styles.tabBtnText, scanMode === "radar" && styles.tabBtnTextActive]}>
              📡 BLE Radar
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
                <Text style={styles.distanceStatus}>{inRange ? "В АУДИТОРИИ" : "ДАЛЕКО"}</Text>
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
                <Text style={styles.qrText}>Сканируйте QR на экране преподавателя</Text>
              </View>
            </View>
          )}
        </View>

        {/* Geofence Status Card */}
        <View style={styles.statusBox}>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Радиус обнаружения:</Text>
            <Text style={styles.statusValue}>{maxRange} метров (BLE & GPS)</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Статус верификации:</Text>
            <Text
              style={[
                styles.statusValue,
                { color: inRange ? "#00D174" : "#EF4444" },
              ]}
            >
              {inRange ? "В пределах аудитории ✓" : "Слишком далеко ✕"}
            </Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Защита от спуфинга:</Text>
            <Text style={[styles.statusValue, { color: "#00D174" }]}>
              Шифрование AITU Token ID
            </Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          disabled={isCheckedIn}
          style={[
            styles.checkInButton,
            isCheckedIn && styles.checkInButtonSuccess,
            !inRange && styles.checkInButtonDisabled,
          ]}
          onPress={handleCheckIn}
        >
          <Text style={styles.checkInButtonText}>
            {isCheckedIn
              ? "✓ ПРИСУТСТВИЕ ЗАФИКСИРОВАНО"
              : inRange
              ? "ПОДТВЕРДИТЬ ПРИСУТСТВИЕ НА ПАРЕ"
              : `ПОДОЙДИТЕ БЛИЖЕ (${distance}м > ${maxRange}м)`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#070A0F",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#121A24",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  backButtonText: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "700",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  simBtn: {
    backgroundColor: "rgba(0, 209, 116, 0.12)",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#00D174",
  },
  simBtnText: {
    color: "#00D174",
    fontSize: 11,
    fontWeight: "800",
  },
  content: {
    padding: 18,
    flex: 1,
    justifyContent: "space-between",
  },
  lectureInfo: {
    backgroundColor: "#121A24",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  lectureBadgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  roomPill: {
    backgroundColor: "rgba(0, 209, 116, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  roomPillText: {
    color: "#00D174",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  liveTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#00D174",
  },
  liveTagText: {
    color: "#00D174",
    fontSize: 9,
    fontWeight: "800",
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
    fontSize: 11,
    fontWeight: "600",
  },
  tabsRow: {
    flexDirection: "row",
    backgroundColor: "#121A24",
    borderRadius: 14,
    padding: 4,
    marginVertical: 12,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 10,
  },
  tabBtnActive: {
    backgroundColor: "#1A2533",
  },
  tabBtnText: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "700",
  },
  tabBtnTextActive: {
    color: "#00D174",
    fontWeight: "800",
  },
  scannerWrapper: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  radarContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  pulseRing: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "#00D174",
    backgroundColor: "rgba(0, 209, 116, 0.15)",
  },
  radarCore: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#0D131B",
    borderWidth: 2,
    borderColor: "#00D174",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#00D174",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 18,
    elevation: 8,
  },
  radarCoreIcon: {
    fontSize: 24,
  },
  distanceBadge: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
    marginTop: 2,
  },
  distanceStatus: {
    color: "#00D174",
    fontSize: 8,
    fontWeight: "900",
    marginTop: 1,
  },
  nfcContainer: {
    alignItems: "center",
  },
  nfcBigIcon: {
    fontSize: 50,
    marginBottom: 8,
  },
  nfcTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
  nfcSub: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 2,
  },
  qrContainer: {
    width: "80%",
    aspectRatio: 1.3,
    borderWidth: 2,
    borderColor: "#00D174",
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
    fontSize: 36,
    marginBottom: 8,
  },
  qrText: {
    color: "#94A3B8",
    fontSize: 12,
    textAlign: "center",
  },
  statusBox: {
    backgroundColor: "#121A24",
    borderRadius: 16,
    padding: 16,
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
    fontWeight: "700",
    color: "#FFFFFF",
  },
  checkInButton: {
    backgroundColor: "#00D174",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#00D174",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
  },
  checkInButtonSuccess: {
    backgroundColor: "#10B981",
  },
  checkInButtonDisabled: {
    backgroundColor: "#1E293B",
  },
  checkInButtonText: {
    color: "#070A0F",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
});
