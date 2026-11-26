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
  const [egovVerified, setEgovVerified] = useState(true);

  const handleShare = () => {
    Alert.alert(
      "eGov Mobile QR",
      "QR-код студенческого билета действителен 15 минут. Пропуск верифицирован Государственной базой данных."
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

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>
          Официальный цифровой студенческий билет и банковский пропуск AITU / Freedom
        </Text>

        {/* Card Flip Presentation */}
        <TouchableOpacity
          activeOpacity={0.92}
          onPress={() => setFlipped(!flipped)}
          style={styles.cardContainer}
        >
          <View style={[styles.idCard, flipped && styles.idCardBack]}>
            {!flipped ? (
              /* FRONT SIDE */
              <>
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.univName}>ASTANA IT UNIVERSITY</Text>
                    <Text style={styles.cardType}>OFFICIAL STUDENT IDENTITY</Text>
                  </View>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>АКТИВЕН</Text>
                  </View>
                </View>

                <View style={styles.studentInfoRow}>
                  <View style={styles.photoBox}>
                    <Text style={styles.photoPlaceholder}>🎓</Text>
                  </View>
                  <View style={styles.studentDetails}>
                    <Text style={styles.studentName}>{student.fullName}</Text>
                    <Text style={styles.studentGroup}>Группа: {student.group}</Text>
                    <Text style={styles.studentSpecialty}>{student.major}</Text>
                    <Text style={styles.studentFaculty}>{student.faculty}</Text>
                  </View>
                </View>

                <View style={styles.chipRow}>
                  <View style={styles.emvChip}>
                    <View style={styles.emvChipLine} />
                  </View>
                  <Text style={styles.nfcSignal}>📶 NFC Turnstile Ready</Text>
                </View>

                <View style={styles.cardFooter}>
                  <View>
                    <Text style={styles.footerLabel}>STUDENT ID / BARCODE</Text>
                    <Text style={styles.footerValue}>{student.studentId}</Text>
                  </View>
                  <View>
                    <Text style={styles.footerLabel}>КУРС</Text>
                    <Text style={styles.footerValue}>{student.course} Курс (Бакалавриат)</Text>
                  </View>
                </View>
              </>
            ) : (
              /* BACK SIDE */
              <>
                <View style={styles.magStrip} />
                <View style={styles.backContent}>
                  <Text style={styles.qrTitle}>QR-код для турникета и библиотек</Text>
                  <View style={styles.qrBox}>
                    <Text style={styles.qrMock}>⬛⬜⬛⬛⬛⬜⬛{"\n"}⬜⬛⬜⬛⬜⬛⬜{"\n"}⬛⬛⬛⬛⬛⬛⬛</Text>
                  </View>
                  <Text style={styles.barcodeNum}>{student.studentId}</Text>
                  <Text style={styles.qrExpiry}>Обновляется каждые 60 секунд</Text>

                  <View style={styles.egovNotice}>
                    <Text style={styles.egovNoticeText}>
                      ✓ Верифицировано МОН РК и eGov.kz. Имеет юридическую силу оригинала удостоверения студента.
                    </Text>
                  </View>
                </View>
              </>
            )}
          </View>
        </TouchableOpacity>

        <Text style={styles.tapHint}>Нажмите на карту для разворота (Front/Back)</Text>

        {/* Details List */}
        <View style={styles.detailsCard}>
          <Text style={styles.detailsSectionTitle}>Сведения об обучении</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailKey}>Форма обучения</Text>
            <Text style={styles.detailVal}>Очная (Грант)</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailKey}>Академический статус</Text>
            <Text style={[styles.detailVal, { color: "#10B981" }]}>Без академических задолженностей</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailKey}>Банковский счет IBAN</Text>
            <Text style={styles.detailVal}>KZ448560000000000000</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailKey}>Срок действия билета</Text>
            <Text style={styles.detailVal}>до 30.06.2027</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtnPrimary} onPress={handleShare}>
            <Text style={styles.actionBtnPrimaryText}>Поделиться QR (eGov)</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  egovPill: {
    backgroundColor: "rgba(0, 229, 255, 0.15)",
    borderWidth: 1,
    borderColor: "#00E5FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  egovText: {
    color: "#00E5FF",
    fontSize: 11,
    fontWeight: "700",
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 20,
  },
  cardContainer: {
    width: "100%",
  },
  idCard: {
    backgroundColor: "#0F172A",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1.5,
    borderColor: "rgba(0, 229, 255, 0.4)",
    minHeight: 240,
    justifyContent: "space-between",
    shadowColor: "#00E5FF",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  idCardBack: {
    backgroundColor: "#0B1120",
    borderColor: "rgba(255,255,255,0.2)",
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  univName: {
    fontSize: 13,
    fontWeight: "800",
    color: "#00E5FF",
    letterSpacing: 1,
  },
  cardType: {
    fontSize: 10,
    fontWeight: "600",
    color: "#64748B",
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    color: "#10B981",
    fontSize: 10,
    fontWeight: "800",
  },
  studentInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginVertical: 14,
  },
  photoBox: {
    width: 64,
    height: 76,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  photoPlaceholder: {
    fontSize: 32,
  },
  studentDetails: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  studentGroup: {
    fontSize: 13,
    fontWeight: "700",
    color: "#00E5FF",
    marginBottom: 2,
  },
  studentSpecialty: {
    fontSize: 12,
    color: "#CBD5E1",
  },
  studentFaculty: {
    fontSize: 11,
    color: "#64748B",
  },
  chipRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  emvChip: {
    width: 38,
    height: 28,
    backgroundColor: "#F59E0B",
    borderRadius: 6,
    padding: 4,
  },
  emvChipLine: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
    borderRadius: 3,
  },
  nfcSignal: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "600",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
    paddingTop: 10,
  },
  footerLabel: {
    fontSize: 9,
    color: "#64748B",
    fontWeight: "700",
  },
  footerValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  magStrip: {
    width: "110%",
    marginLeft: "-5%",
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
    fontWeight: "600",
    marginBottom: 8,
  },
  qrBox: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 12,
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
    fontWeight: "700",
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
    backgroundColor: "rgba(0, 229, 255, 0.08)",
    padding: 8,
    borderRadius: 8,
  },
  egovNoticeText: {
    color: "#00E5FF",
    fontSize: 10,
    textAlign: "center",
    lineHeight: 14,
  },
  tapHint: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 14,
    marginBottom: 20,
  },
  detailsCard: {
    width: "100%",
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  detailsSectionTitle: {
    fontSize: 14,
    fontWeight: "700",
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
    fontSize: 13,
    color: "#94A3B8",
  },
  detailVal: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  actionRow: {
    width: "100%",
    marginTop: 20,
  },
  actionBtnPrimary: {
    backgroundColor: "#00E5FF",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  actionBtnPrimaryText: {
    color: "#050B14",
    fontSize: 14,
    fontWeight: "700",
  },
});
