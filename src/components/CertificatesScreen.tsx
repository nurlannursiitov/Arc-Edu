import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { CertificateRequest } from "../types";

interface CertificatesScreenProps {
  certificates: CertificateRequest[];
  onBack: () => void;
}

export const CertificatesScreen: React.FC<CertificatesScreenProps> = ({
  certificates,
  onBack,
}) => {
  const [list, setList] = useState<CertificateRequest[]>(certificates);

  const handleOrderNew = () => {
    const newCert: CertificateRequest = {
      id: `cert-${Date.now()}`,
      title: "Справка по месту требования (ГКП на ПХВ)",
      requestDate: new Date().toLocaleDateString("ru-RU"),
      status: "pending",
      qrVerified: false,
    };
    setList([newCert, ...list]);
    Alert.alert(
      "Запрос сформирован! 📄",
      "Заявка на справку с места учебы отправлена в ЦОС (Центр обслуживания студентов) AITU. Готовность в течение 10 минут."
    );
  };

  const downloadCert = (cert: CertificateRequest) => {
    Alert.alert(
      "Цифровая справка eGov",
      `Документ "${cert.title}" подписан ЭЦП Ректора Astana IT University и зарегистрирован в единой базе НОБД РК. Скачивание PDF файла запущено.`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Справки и Документы</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <Text style={styles.heroBadge}>ЦОС • eGov Integration</Text>
          <Text style={styles.heroTitle}>Заказ справок с ЭЦП</Text>
          <Text style={styles.heroDesc}>
            Все справки заверяются официальной цифровой подписью и QR-валидацией министерства просвещения и науки РК.
          </Text>
          <TouchableOpacity style={styles.orderBtn} onPress={handleOrderNew}>
            <Text style={styles.orderBtnText}>+ Заказать новую справку</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>История запросов</Text>

        {list.map((cert) => (
          <View key={cert.id} style={styles.certCard}>
            <View style={styles.certHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.certTitle}>{cert.title}</Text>
                <Text style={styles.certDate}>Заказано: {cert.requestDate}</Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      cert.status === "ready"
                        ? "rgba(16, 185, 129, 0.15)"
                        : cert.status === "pending"
                        ? "rgba(245, 158, 11, 0.15)"
                        : "rgba(239, 68, 68, 0.15)",
                  },
                ]}
              >
                <Text
                  style={{
                    color:
                      cert.status === "ready"
                        ? "#10B981"
                        : cert.status === "pending"
                        ? "#F59E0B"
                        : "#EF4444",
                    fontSize: 11,
                    fontWeight: "800",
                  }}
                >
                  {cert.status === "ready"
                    ? "ГОТОВО ✓"
                    : cert.status === "pending"
                    ? "В ОБРАБОТКЕ ⏳"
                    : "ОТКЛОНЕНО"}
                </Text>
              </View>
            </View>

            <View style={styles.certFooter}>
              <Text style={styles.certQrStatus}>
                {cert.qrVerified ? "🛡 ЭЦП и QR верифицированы" : "⏳ Проверка деканатом"}
              </Text>

              {cert.status === "ready" && (
                <TouchableOpacity
                  style={styles.downloadBtn}
                  onPress={() => downloadCert(cert)}
                >
                  <Text style={styles.downloadBtnText}>Скачать PDF ↓</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
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
  headerSpacer: {
    width: 50,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: "#111827",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(20, 184, 166, 0.4)",
    marginBottom: 24,
  },
  heroBadge: {
    color: "#14B8A6",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 6,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
  },
  heroDesc: {
    color: "#94A3B8",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  orderBtn: {
    backgroundColor: "#14B8A6",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  orderBtnText: {
    color: "#050B14",
    fontSize: 13,
    fontWeight: "800",
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 12,
  },
  certCard: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    marginBottom: 12,
  },
  certHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  certTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },
  certDate: {
    color: "#64748B",
    fontSize: 12,
  },
  statusBadge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  certFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.04)",
    paddingTop: 10,
  },
  certQrStatus: {
    color: "#94A3B8",
    fontSize: 11,
  },
  downloadBtn: {
    backgroundColor: "rgba(20, 184, 166, 0.15)",
    borderWidth: 1,
    borderColor: "#14B8A6",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  downloadBtnText: {
    color: "#14B8A6",
    fontSize: 11,
    fontWeight: "700",
  },
});
