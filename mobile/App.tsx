import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brandTitle}>ARC EDU</Text>
        <Text style={styles.brandSubtitle}>Astana IT University • Smart Campus</Text>
      </View>

      {/* Day 1 Initial Skeleton Screen */}
      <View style={styles.content}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeLabel}>СТУДЕНЧЕСКИЙ ПОРТАЛ</Text>
          <Text style={styles.studentName}>Нурсиитов Нурлан</Text>
          <Text style={styles.studentMeta}>Группа: ВТИП-23-2к • 2 курс</Text>
          <Text style={styles.studentMeta}>ID: 230107042 • GPA: 3.87</Text>
        </View>

        <View style={styles.devCard}>
          <Text style={styles.devCardTitle}>🚀 Проект запущен (День 1)</Text>
          <Text style={styles.devCardText}>
            Каркас приложения инициализирован на Expo + FastAPI.
          </Text>
          <View style={styles.todoList}>
            <Text style={styles.todoItem}>✅ Инициализация FastAPI бэкенда</Text>
            <Text style={styles.todoItem}>✅ Базовый каркас мобильного клиента</Text>
            <Text style={styles.todoItem}>⏳ В разработке: Digital Student Card</Text>
            <Text style={styles.todoItem}>⏳ В разработке: Модуль чекина (NFC + Geofence)</Text>
            <Text style={styles.todoItem}>⏳ В разработке: Wikipedia силлабус</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070B14',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#151D2E',
    backgroundColor: '#0A0F1D',
  },
  brandTitle: {
    color: '#38BDF8',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  brandSubtitle: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 2,
  },
  content: {
    padding: 20,
  },
  welcomeCard: {
    backgroundColor: '#0F172A',
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1E293B',
    marginBottom: 16,
  },
  welcomeLabel: {
    color: '#38BDF8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 4,
  },
  studentName: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '800',
  },
  studentMeta: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
  },
  devCard: {
    backgroundColor: '#0E1729',
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1D4ED8',
  },
  devCardTitle: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 6,
  },
  devCardText: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 14,
  },
  todoList: {
    gap: 8,
  },
  todoItem: {
    color: '#CBD5E1',
    fontSize: 12,
  },
});
