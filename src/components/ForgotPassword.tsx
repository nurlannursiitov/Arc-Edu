import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  SafeAreaView,
} from 'react-native';
import { ArrowLeft, Mail, CheckCircle2 } from 'lucide-react-native';
import { COLORS, FONT_FAMILY, RADIUS } from '../theme/tokens';

interface ForgotPasswordProps {
  onBack: () => void;
  onCodeSent?: (email: string) => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBack, onCodeSent }) => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleReset = () => {
    if (!email.trim()) {
      Alert.alert('Ошибка', 'Введите корпоративный email или 8-значный Barcode ID');
      return;
    }
    setIsSent(true);
    if (onCodeSent) onCodeSent(email);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.centerWrap}
      >
        <View style={styles.card}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.75}>
            <ArrowLeft size={15} color={COLORS.textSecondary} strokeWidth={1.75} />
            <Text style={styles.backText}>Назад ко входу</Text>
          </TouchableOpacity>

          <Text style={styles.eyebrow}>СЛУЖБА ПОДДЕРЖКИ AITU ID</Text>
          <Text style={styles.title}>Восстановление доступа</Text>
          <Text style={styles.subtitle}>
            Укажите корпоративную почту (@astanait.edu.kz) или студенческий Barcode ID для получения одноразового кода сброса пароля.
          </Text>

          {!isSent ? (
            <View style={styles.form}>
              <View>
                <Text style={styles.label}>Корпоративный Email / ID</Text>
                <View style={styles.inputRow}>
                  <Mail size={15} color={COLORS.textTertiary} strokeWidth={1.75} />
                  <TextInput
                    style={styles.input}
                    placeholder="230107042@astanait.edu.kz"
                    placeholderTextColor={COLORS.textTertiary}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.primaryBtn} onPress={handleReset} activeOpacity={0.85}>
                <Text style={styles.primaryBtnText}>Отправить код подтверждения</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.successBox}>
              <CheckCircle2 size={28} color={COLORS.accent} strokeWidth={1.75} />
              <Text style={styles.successTitle}>Код отправлен на почту</Text>
              <Text style={styles.successText}>
                Проверьте входящие сообщения для{' '}
                <Text style={{ color: COLORS.textPrimary, fontWeight: '600' }}>{email}</Text>.
              </Text>
              <TouchableOpacity style={[styles.primaryBtn, { width: '100%' }]} onPress={onBack}>
                <Text style={styles.primaryBtnText}>Вернуться к авторизации</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Проблемы с доступом к почте? Обратитесь в IT HelpDesk (Каб. C1.214).
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  centerWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
  },
  backText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.sans,
  },
  eyebrow: {
    color: COLORS.accentBright,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 6,
    fontFamily: FONT_FAMILY.sans,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: -0.3,
    marginBottom: 8,
    fontFamily: FONT_FAMILY.sans,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 22,
    fontFamily: FONT_FAMILY.sans,
  },
  form: {
    gap: 16,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 6,
    fontFamily: FONT_FAMILY.sans,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.bg,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    color: COLORS.textPrimary,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: FONT_FAMILY.sans,
  },
  primaryBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: COLORS.textInverse,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  successBox: {
    backgroundColor: COLORS.accentSoft,
    borderWidth: 1,
    borderColor: COLORS.borderAccent,
    borderRadius: RADIUS.lg,
    padding: 20,
    alignItems: 'center',
    gap: 10,
  },
  successTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  successText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 6,
    fontFamily: FONT_FAMILY.sans,
  },
  footer: {
    marginTop: 22,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerText: {
    color: COLORS.textTertiary,
    fontSize: 11,
    textAlign: 'center',
    fontFamily: FONT_FAMILY.sans,
  },
});
