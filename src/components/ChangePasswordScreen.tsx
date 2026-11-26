import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Lock } from 'lucide-react-native';
import { StudentProfile } from '../types';
import { COLORS, FONT_FAMILY, RADIUS } from '../theme/tokens';
import { AppShell } from './ui/AppShell';

interface ChangePasswordScreenProps {
  student: StudentProfile;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onBack: () => void;
}

export const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({
  student,
  currentPage,
  onNavigate,
  onLogout,
  onBack,
}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Ошибка', 'Новые пароли не совпадают');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Ошибка', 'Пароль должен содержать минимум 6 символов');
      return;
    }

    Alert.alert('Пароль обновлён', 'Новый пароль синхронизирован с вашим аккаунтом AITU ID.');
    onBack();
  };

  return (
    <AppShell
      currentPage={currentPage}
      onNavigate={onNavigate}
      onLogout={onLogout}
      student={student}
      title="Смена пароля"
      subtitle="Безопасность учётной записи AITU ID"
      onBack={onBack}
    >
      <View style={styles.card}>
        <View style={styles.field}>
          <Text style={styles.label}>Текущий пароль</Text>
          <View style={styles.inputRow}>
            <Lock size={15} color={COLORS.textTertiary} strokeWidth={1.75} />
            <TextInput
              style={styles.input}
              placeholder="Введите текущий пароль"
              placeholderTextColor={COLORS.textTertiary}
              secureTextEntry
              value={oldPassword}
              onChangeText={setOldPassword}
            />
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Новый пароль</Text>
          <View style={styles.inputRow}>
            <Lock size={15} color={COLORS.textTertiary} strokeWidth={1.75} />
            <TextInput
              style={styles.input}
              placeholder="Не менее 6 символов"
              placeholderTextColor={COLORS.textTertiary}
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Подтвердите пароль</Text>
          <View style={styles.inputRow}>
            <Lock size={15} color={COLORS.textTertiary} strokeWidth={1.75} />
            <TextInput
              style={styles.input}
              placeholder="Повторите новый пароль"
              placeholderTextColor={COLORS.textTertiary}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
          <Text style={styles.saveBtnText}>Сохранить новый пароль</Text>
        </TouchableOpacity>
      </View>
    </AppShell>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    gap: 16,
    maxWidth: 520,
  },
  field: {
    gap: 6,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '500',
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
  saveBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  saveBtnText: {
    color: COLORS.textInverse,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
});
