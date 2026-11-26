import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useResponsive } from '../hooks/useResponsive';
import { FileText, ShieldCheck, Clock, Download, Plus, CheckCircle2 } from 'lucide-react-native';
import { CertificateRequest, StudentProfile } from '../types';
import { COLORS, FONT_FAMILY, RADIUS } from '../theme/tokens';
import { AppShell } from './ui/AppShell';

interface CertificatesScreenProps {
  student: StudentProfile;
  certificates: CertificateRequest[];
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onBack: () => void;
}

export const CertificatesScreen: React.FC<CertificatesScreenProps> = ({
  student,
  certificates,
  currentPage,
  onNavigate,
  onLogout,
  onBack,
}) => {
  const { isDesktop } = useResponsive();
  const [list, setList] = useState<CertificateRequest[]>(certificates);

  const handleOrderNew = () => {
    const newCert: CertificateRequest = {
      id: `cert-${Date.now()}`,
      title: 'Справка по месту требования (ГКП на ПХВ)',
      requestDate: new Date().toLocaleDateString('ru-RU'),
      status: 'pending',
      qrVerified: false,
    };
    setList([newCert, ...list]);
    Alert.alert(
      'Запрос сформирован',
      'Заявка на справку с места учёбы отправлена в ЦОС AITU. Ориентировочная готовность — 10 минут.'
    );
  };

  const downloadCert = (cert: CertificateRequest) => {
    Alert.alert(
      'Цифровая справка eGov',
      `Документ «${cert.title}» подписан ЭЦП ректора Astana IT University и зарегистрирован в НОБД РК.`
    );
  };

  const orderButton = (
    <TouchableOpacity style={styles.orderBtn} onPress={handleOrderNew} activeOpacity={0.85}>
      <Plus size={15} color={COLORS.textInverse} strokeWidth={2.2} />
      <Text style={styles.orderBtnText}>Заказать справку</Text>
    </TouchableOpacity>
  );

  return (
    <AppShell
      currentPage={currentPage}
      onNavigate={onNavigate}
      onLogout={onLogout}
      student={student}
      title="Справки и документы"
      subtitle="Центр обслуживания студентов (ЦОС) с ЭЦП и eGov QR"
      onBack={onBack}
      rightAction={isDesktop ? orderButton : undefined}
    >
      <View style={styles.heroCard}>
        <View style={styles.heroLeft}>
          <View style={styles.eyebrowRow}>
            <ShieldCheck size={14} color={COLORS.accent} strokeWidth={2} />
            <Text style={styles.eyebrowText}>EGOV INTEGRATION</Text>
          </View>
          <Text style={styles.heroTitle}>Официальные справки в электронном виде</Text>
          <Text style={styles.heroDesc}>
            Все документы заверяются электронной цифровой подписью и имеют юридическую силу оригинала.
          </Text>
        </View>
        {!isDesktop && orderButton}
      </View>

      <Text style={styles.sectionTitle}>История запросов</Text>

      <View style={styles.listGrid}>
        {list.map((cert) => {
          const isReady = cert.status === 'ready';
          return (
            <View key={cert.id} style={[styles.certCard, isDesktop && styles.certCardDesktop]}>
              <View style={styles.certTop}>
                <View style={styles.iconBox}>
                  <FileText size={18} color={COLORS.textPrimary} strokeWidth={1.75} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.certTitle}>{cert.title}</Text>
                  <Text style={styles.certDate}>Заказано {cert.requestDate}</Text>
                </View>

                <View
                  style={[
                    styles.statusPill,
                    { backgroundColor: isReady ? COLORS.accentSoft : COLORS.warningSoft },
                  ]}
                >
                  {isReady ? (
                    <CheckCircle2 size={11} color={COLORS.accent} strokeWidth={2.2} />
                  ) : (
                    <Clock size={11} color={COLORS.warning} strokeWidth={2.2} />
                  )}
                  <Text
                    style={[
                      styles.statusText,
                      { color: isReady ? COLORS.accentBright : COLORS.warning },
                    ]}
                  >
                    {isReady ? 'Готово' : 'В обработке'}
                  </Text>
                </View>
              </View>

              <View style={styles.certFooter}>
                <Text style={styles.verifyLabel}>
                  {cert.qrVerified ? 'ЭЦП и QR верифицированы' : 'На проверке в деканате'}
                </Text>

                {isReady && (
                  <TouchableOpacity
                    style={styles.downloadBtn}
                    onPress={() => downloadCert(cert)}
                    activeOpacity={0.8}
                  >
                    <Download size={13} color={COLORS.accentBright} strokeWidth={2} />
                    <Text style={styles.downloadBtnText}>Скачать PDF</Text>
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
  orderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.accent,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
  },
  orderBtnText: {
    color: COLORS.textInverse,
    fontSize: 13,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  heroCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    marginBottom: 22,
    gap: 14,
  },
  heroLeft: {
    gap: 6,
  },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  eyebrowText: {
    color: COLORS.accentBright,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    fontFamily: FONT_FAMILY.sans,
  },
  heroTitle: {
    color: COLORS.textPrimary,
    fontSize: 17,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  heroDesc: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    fontFamily: FONT_FAMILY.sans,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
    fontFamily: FONT_FAMILY.sans,
  },
  listGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  certCard: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    gap: 14,
    justifyContent: 'space-between',
  },
  certCardDesktop: {
    width: '49%',
  },
  certTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  certTitle: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  certDate: {
    color: COLORS.textTertiary,
    fontSize: 11,
    marginTop: 3,
    fontFamily: FONT_FAMILY.sans,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  certFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 12,
  },
  verifyLabel: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontFamily: FONT_FAMILY.sans,
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.accentSoft,
    borderWidth: 1,
    borderColor: COLORS.borderAccent,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
  },
  downloadBtnText: {
    color: COLORS.accentBright,
    fontSize: 11,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
});
