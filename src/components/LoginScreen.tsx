import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Lock, Check, ArrowRight, ScanFace } from 'lucide-react-native';
import { COLORS, FONT_FAMILY, RADIUS } from '../theme/tokens';
import { BrandMark } from './ui/BrandMark';

interface Props {
  onLoginSuccess: () => void;
  onNavigateForgotPassword: () => void;
}

export default function LoginScreen({ onLoginSuccess, onNavigateForgotPassword }: Props) {
  const [login, setLogin] = useState('230107042');
  const [password, setPassword] = useState('nurlan2026');
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = () => {
    if (!login.trim()) {
      Alert.alert('Ошибка', 'Введите логин студента или Barcode ID');
      return;
    }
    onLoginSuccess();
  };

  const handleBiometricLogin = () => {
    Alert.alert('Face ID', 'Биометрическая верификация успешно пройдена', [
      { text: 'Продолжить', onPress: onLoginSuccess },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['rgba(16, 185, 129, 0.08)', 'transparent']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.45 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.centerWrap}
      >
        <View style={styles.authBox}>
          {/* Minimal Brand Header */}
          <View style={styles.brandHeader}>
            <BrandMark size={44} />
            <Text style={styles.title}>Arc Edu</Text>
            <Text style={styles.subtitle}>Цифровой кампус Astana IT University</Text>
          </View>

          {/* Clean Auth Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Вход в систему</Text>
            <Text style={styles.cardSub}>Единая авторизация Platonus & Freedom ID</Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Студенческий ID или Email</Text>
              <View style={styles.inputRow}>
                <User size={15} color={COLORS.textTertiary} strokeWidth={1.75} />
                <TextInput
                  style={styles.input}
                  value={login}
                  onChangeText={setLogin}
                  placeholder="230107042"
                  placeholderTextColor={COLORS.textTertiary}
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Пароль</Text>
              <View style={styles.inputRow}>
                <Lock size={15} color={COLORS.textTertiary} strokeWidth={1.75} />
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholder="Введите пароль"
                  placeholderTextColor={COLORS.textTertiary}
                />
              </View>
            </View>

            <View style={styles.optionsRow}>
              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => setRememberMe(!rememberMe)}
                activeOpacity={0.75}
              >
                <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                  {rememberMe && <Check size={11} color={COLORS.textInverse} strokeWidth={3} />}
                </View>
                <Text style={styles.checkboxLabel}>Запомнить сессию</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={onNavigateForgotPassword} activeOpacity={0.75}>
                <Text style={styles.forgotLink}>Восстановить доступ</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={handleLogin} activeOpacity={0.85}>
              <Text style={styles.primaryBtnText}>Войти в аккаунт</Text>
              <ArrowRight size={16} color={COLORS.textInverse} strokeWidth={2.2} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => {
                setLogin('230107042');
                setPassword('nurlan2026');
                onLoginSuccess();
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryBtnText}>Демо-вход: Нурсиитов Нурлан</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.biometricRow}
              onPress={handleBiometricLogin}
              activeOpacity={0.75}
            >
              <ScanFace size={16} color={COLORS.textSecondary} strokeWidth={1.75} />
              <Text style={styles.biometricText}>Войти через Face ID / Touch ID</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footerText}>Astana IT University · Департамент цифровизации</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
  authBox: {
    width: '100%',
    maxWidth: 420,
    gap: 24,
  },
  brandHeader: {
    alignItems: 'center',
    gap: 8,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.5,
    fontFamily: FONT_FAMILY.sans,
    marginTop: 4,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontFamily: FONT_FAMILY.sans,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 24,
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.2,
    fontFamily: FONT_FAMILY.sans,
  },
  cardSub: {
    color: COLORS.textTertiary,
    fontSize: 12,
    marginTop: 3,
    marginBottom: 20,
    fontFamily: FONT_FAMILY.sans,
  },
  fieldGroup: {
    marginBottom: 14,
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
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 17,
    height: 17,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: COLORS.textTertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  checkboxLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontFamily: FONT_FAMILY.sans,
  },
  forgotLink: {
    color: COLORS.accentBright,
    fontSize: 12,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.sans,
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
  secondaryBtn: {
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    marginTop: 10,
  },
  secondaryBtnText: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.sans,
  },
  biometricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
    paddingVertical: 6,
  },
  biometricText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.sans,
  },
  footerText: {
    color: COLORS.textTertiary,
    fontSize: 11,
    textAlign: 'center',
    fontFamily: FONT_FAMILY.sans,
  },
});
