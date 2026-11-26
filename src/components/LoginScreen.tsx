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
  Alert
} from 'react-native';

interface Props {
  onLoginSuccess: () => void;
  onNavigateForgotPassword: () => void;
}

export default function LoginScreen({ onLoginSuccess, onNavigateForgotPassword }: Props) {
  const [login, setLogin] = useState('230107042');
  const [password, setPassword] = useState('••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = () => {
    if (!login.trim()) {
      Alert.alert('Ошибка', 'Введите логин студента или ID');
      return;
    }
    onLoginSuccess();
  };

  const handleBiometricLogin = () => {
    Alert.alert('Face ID / Биометрия', 'Авторизация по Face ID успешно пройдена!', [
      { text: 'Продолжить', onPress: onLoginSuccess }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.content}
      >
        {/* Brand Header */}
        <View style={styles.brandContainer}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoLetter}>Δ</Text>
          </View>
          <Text style={styles.title}>ARC EDU</Text>
          <Text style={styles.subtitle}>Цифровая экосистема студента • AITU</Text>
          <View style={styles.platonusPill}>
            <Text style={styles.platonusPillText}>PLATONUS NEXTGEN EDITION</Text>
          </View>
        </View>

        {/* Login Card */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Вход в личный кабинет</Text>
          <Text style={styles.cardSub}>Используйте студенческий ID или корпоративную почту</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Логин / Студенческий ID</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>👤</Text>
              <TextInput
                style={styles.input}
                value={login}
                onChangeText={setLogin}
                placeholder="Например, 230107042"
                placeholderTextColor="#64748B"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Пароль</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Введите пароль"
                placeholderTextColor="#64748B"
              />
            </View>
          </View>

          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                {rememberMe && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>Запомнить меня</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onNavigateForgotPassword}>
              <Text style={styles.forgotText}>Забыли пароль?</Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginBtnText}>Войти в систему →</Text>
          </TouchableOpacity>

          {/* Quick Demo Fill Button */}
          <TouchableOpacity
            style={styles.demoFillBtn}
            onPress={() => {
              setLogin('230107042');
              setPassword('nurlan2026');
              onLoginSuccess();
            }}
          >
            <Text style={styles.demoFillBtnText}>⚡ Быстрый вход (Нурсиитов Нурлан)</Text>
          </TouchableOpacity>

          {/* Biometric Face ID */}
          <TouchableOpacity style={styles.biometricBtn} onPress={handleBiometricLogin}>
            <Text style={styles.biometricIcon}>🪪</Text>
            <Text style={styles.biometricText}>Войти с помощью Face ID / Touch ID</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Astana IT University • Департамент цифровизации
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070B14',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoBadge: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#0284C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#38BDF8',
    shadowColor: '#38BDF8',
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  logoLetter: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '900',
  },
  title: {
    color: '#F8FAFC',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 2,
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
  },
  platonusPill: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
  },
  platonusPillText: {
    color: '#38BDF8',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  card: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: '#1E293B',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  cardHeader: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '800',
  },
  cardSub: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 4,
    marginBottom: 18,
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    color: '#CBD5E1',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#070C16',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1E293B',
    paddingHorizontal: 12,
  },
  inputIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#F8FAFC',
    paddingVertical: 12,
    fontSize: 13,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 18,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#475569',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#0284C7',
    borderColor: '#38BDF8',
  },
  checkmark: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '900',
  },
  checkboxLabel: {
    color: '#94A3B8',
    fontSize: 11,
  },
  forgotText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '700',
  },
  loginBtn: {
    backgroundColor: '#0284C7',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#0284C7',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
  },
  demoFillBtn: {
    backgroundColor: '#131D30',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#24324D',
  },
  demoFillBtnText: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '800',
  },
  biometricBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    paddingVertical: 8,
    gap: 8,
  },
  biometricIcon: {
    fontSize: 16,
  },
  biometricText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#475569',
    fontSize: 10,
  },
});
