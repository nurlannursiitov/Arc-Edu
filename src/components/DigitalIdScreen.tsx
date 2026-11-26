import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { StudentProfile } from "../types";

interface DigitalIdScreenProps {
  student: StudentProfile;
  onBack: () => void;
}

export const DigitalIdScreen: React.FC<DigitalIdScreenProps> = ({ student, onBack }) => {
  const [flipped, setFlipped] = useState(false);

  const handleShare = () => {
    Alert.alert(
      "eGov Mobile QR",
      "QR-код студенческого билета сгенерирован и подписан ЭЦП. Действителен 15 минут для прохода через турникеты и подтверждения статуса студента."
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Digital Student ID</Text>
        <TouchableOpacity style={styles.egovPill} onPress={handleShare}>
          <Text style={styles.egovText}>🇰🇿 eGov Mobile</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>
          Официальный цифровой студенческий билет & FinTech VIP Pass Astana IT University
        </Text>

        {/* Luxury Glassmorphism ID Card */}
        <TouchableOpacity
          activeOpacity={0.93}
          onPress={() => setFlipped(!flipped)}
          style={styles.cardContainer}
        >
          <View style={[styles.idCard, flipped && styles.idCardBack]}>
            <View style={styles.cardAura} />
            <View style={styles.cardTopEdge} />

            {!flipped ? (
              /* FRONT SIDE */
              <>
                <View style={styles.cardHeader}>
                  <View>
                    <View style={styles.univRow}>
                      <View style={styles.greenDot} />
                      <Text style={styles.univName}>ASTANA IT UNIVERSITY</Text>
                    </View>
                    <Text style={styles.cardType}>STUDENT IDENTITY & FREEDOM PASS</Text>
                  </View>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>АКТИВЕН ✓</Text>
                  </View>
                </View>

                <View style={styles.studentInfoRow}>
                  <View style={styles.photoContainer}>
                    <View style={styles.photoFrame}>
                      <Text style={styles.photoPlaceholder}>🎓</Text>
                    </View>
                    <View style={styles.grantBadge}>
                      <Text style={styles.grantText}>ГРАНТ</Text>
                    </View>
                  </View>

                  <View style={styles.studentDetails}>
                    <Text style={styles.studentName}>{student.fullName}</Text>
                    <View style={styles.groupBadge}>
                      <Text style={styles.groupBadgeText}>ГРУППА {student.group}</Text>
                    </View>
                    <Text style={styles.studentSpecialty}>{student.major}</Text>
                    <Text style={styles.studentFaculty}>{student.faculty}</Text>
                  </View>
                </View>

                <View style={styles.chipRow}>
                  <View style={styles.goldChip}>
                    <View style={styles.chipGridHorizontal} />
                    <View style={styles.chipGridVertical} />
                    <View style={styles.chipCenter} />
                  </View>
                  <View style={styles.turnstileSignal}>
                    <Text style={styles.turnstileSignalText}>📶 NFC Turnstile Ready</Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <View>
                    <Text style={styles.footerLabel}>STUDENT ID / BARCODE</Text>
                    <Text style={styles.footerValue}>{student.studentId}</Text>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={styles.footerLabel}>КУРС ОБУЧЕНИЯ</Text>
                    <Text style={styles.footerValue}>{student.course} Курс (Бакалавриат)</Text>
                  </View>
                </View>
              </>
            ) : (
              /* BACK SIDE */
              <>
                <View style={styles.magStrip} />
                <View style={styles.backContent}>
                  <Text style={styles.qrTitle}>Динамический QR-код турникета</Text>
                  <View style={styles.qrBox}>
                    <Text style={styles.qrMock}>⬛⬜⬛⬛⬛⬜⬛{"\n"}⬜⬛⬜⬛⬜⬛⬜{"\n"}⬛⬛⬛⬛⬛⬛⬛</Text>
                  </View>
                  <Text style={styles.barcodeNum}>{student.studentId}</Text>
                  <Text style={styles.qrExpiry}>Обновление через 45 сек • Защита от скриншотов</Text>

                  <View style={styles.egovNotice}>
                    <Text style={styles.egovNoticeText}>
                      🛡 Документ заверен ЭЦП и приравнен к оригиналу удостоверения студента в соответствии с Законом РК «Об электронном документе».
                    </Text>
                  </View>
                </View>
              </>
            )}
          </View>
        </TouchableOpacity>

        <Text style={styles.tapHint}>Нажмите на карту для разворота (Front/Back)</Text>

        {/* Freedom Banking Details & eGov Info */}
        <View style={styles.detailsCard}>
          <Text style={styles.detailsSectionTitle}>Сведения об обучении и карте</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailKey}>Форма обучения</Text>
            <Text style={styles.detailVal}>Очная (Государственный грант)</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailKey}>Академический статус</Text>
            <Text style={[styles.detailVal, { color: "#00D174" }]}>
              Без академических задолженностей ✓
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailKey}>Банковский счет IBAN</Text>
            <Text style={styles.detailVal}>KZ448560000000000000</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailKey}>Ежемесячная стипендия</Text>
            <Text style={[styles.detailVal, { color: "#00D174" }]}>
              +{student.cardDetails.scholarshipAmount.toLocaleString("ru-RU")} ₸
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailKey}>Срок действия</Text>
            <Text style={styles.detailVal}>до 30.06.2027</Text>
          </View>
        </View>

        {/* Action Button */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtnPrimary} onPress={handleShare}>
            <Text style={styles.actionBtnPrimaryText}>Поделиться QR (eGov Mobile)</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  egovPill: {
    backgroundColor: "rgba(0, 209, 116, 0.15)",
    borderWidth: 1,
    borderColor: "#00D174",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  egovText: {
    color: "#00D174",
    fontSize: 11,
    fontWeight: "800",
  },
  content: {
    padding: 18,
    alignItems: "center",
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 18,
  },
  cardContainer: {
    width: "100%",
  },
  idCard: {
    backgroundColor: "#0D131B",
    borderRadius: 24,
    padding: 22,
    borderWidth: 1.5,
    borderColor: "rgba(0, 209, 116, 0.4)",
    minHeight: 250,
    justifyContent: "space-between",
    shadowColor: "#00D174",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 10,
    overflow: "hidden",
  },
  idCardBack: {
    backgroundColor: "#090E15",
    borderColor: "rgba(255,255,255,0.2)",
    padding: 16,
  },
  cardAura: {
    position: "absolute",
    right: -60,
    top: -60,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(0, 209, 116, 0.12)",
  },
  cardTopEdge: {
    position: "absolute",
    top: 0,
    left: "20%",
    right: "20%",
    height: 1,
    backgroundColor: "rgba(0, 209, 116, 0.6)",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  univRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#00D174",
  },
  univName: {
    fontSize: 12,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  cardType: {
    fontSize: 9,
    fontWeight: "700",
    color: "#00D174",
    marginTop: 2,
    letterSpacing: 0.5,
  },
  statusBadge: {
    backgroundColor: "rgba(0, 209, 116, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(0, 209, 116, 0.3)",
  },
  statusText: {
    color: "#00D174",
    fontSize: 9,
    fontWeight: "900",
  },
  studentInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginVertical: 14,
  },
  photoContainer: {
    alignItems: "center",
  },
  photoFrame: {
    width: 66,
    height: 80,
    backgroundColor: "#121A24",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "rgba(0, 209, 116, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  photoPlaceholder: {
    fontSize: 32,
  },
  grantBadge: {
    backgroundColor: "#00D174",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: -8,
  },
  grantText: {
    color: "#070A0F",
    fontSize: 8,
    fontWeight: "900",
  },
  studentDetails: {
    flex: 1,
  },
  studentName: {
    fontSize: 17,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  groupBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(0, 209, 116, 0.15)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
    marginBottom: 4,
  },
  groupBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#00D174",
  },
  studentSpecialty: {
    fontSize: 12,
    color: "#CBD5E1",
    fontWeight: "600",
  },
  studentFaculty: {
    fontSize: 10,
    color: "#64748B",
    marginTop: 2,
  },
  chipRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  goldChip: {
    width: 42,
    height: 30,
    borderRadius: 6,
    backgroundColor: "#E5A83B",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  chipGridHorizontal: {
    position: "absolute",
    width: "100%",
    height: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  chipGridVertical: {
    position: "absolute",
    width: 1,
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  chipCenter: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  turnstileSignal: {
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  turnstileSignalText: {
    color: "#CBD5E1",
    fontSize: 11,
    fontWeight: "700",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
    paddingTop: 10,
  },
  footerLabel: {
    fontSize: 8,
    color: "#64748B",
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  footerValue: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 1,
  },
  magStrip: {
    width: "115%",
    marginLeft: "-7.5%",
    height: 38,
    backgroundColor: "#000000",
    marginBottom: 12,
  },
  backContent: {
    alignItems: "center",
  },
  qrTitle: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "700",
    marginBottom: 8,
  },
  qrBox: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  qrMock: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 16,
    lineHeight: 18,
    color: "#000000",
  },
  barcodeNum: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    marginTop: 8,
    letterSpacing: 2,
  },
  qrExpiry: {
    color: "#64748B",
    fontSize: 10,
    marginTop: 2,
  },
  egovNotice: {
    marginTop: 12,
    backgroundColor: "rgba(0, 209, 116, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(0, 209, 116, 0.2)",
    padding: 8,
    borderRadius: 10,
  },
  egovNoticeText: {
    color: "#00D174",
    fontSize: 10,
    textAlign: "center",
    lineHeight: 14,
  },
  tapHint: {
    color: "#64748B",
    fontSize: 11,
    marginTop: 12,
    marginBottom: 20,
  },
  detailsCard: {
    width: "100%",
    backgroundColor: "#121A24",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  detailsSectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.04)",
  },
  detailKey: {
    fontSize: 12,
    color: "#94A3B8",
  },
  detailVal: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  actionRow: {
    width: "100%",
    marginTop: 20,
  },
  actionBtnPrimary: {
    backgroundColor: "#00D174",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#00D174",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  actionBtnPrimaryText: {
    color: "#070A0F",
    fontSize: 14,
    fontWeight: "900",
  },
});
