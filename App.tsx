import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View } from 'react-native';

import {
  MOCK_STUDENT,
  MOCK_CLASSROOMS,
  MOCK_GRADES,
  MOCK_SCHEDULE,
  MOCK_SYLLABUS,
  MOCK_PERKS,
  MOCK_CERTIFICATES,
  MOCK_MESSAGES,
} from './src/data/mockData';
import { Classroom } from './src/types';
import { COLORS } from './src/theme/tokens';

import LoginScreen from './src/components/LoginScreen';
import { ForgotPassword } from './src/components/ForgotPassword';
import { Dashboard } from './src/components/Dashboard';
import { DigitalIdScreen } from './src/components/DigitalIdScreen';
import { AttendanceScreen } from './src/components/AttendanceScreen';
import { GradesJournalScreen } from './src/components/GradesJournalScreen';
import { ScheduleScreen } from './src/components/ScheduleScreen';
import { SyllabusWikiScreen } from './src/components/SyllabusWikiScreen';
import { TeacherControlScreen } from './src/components/TeacherControlScreen';
import { FreedomPerksScreen } from './src/components/FreedomPerksScreen';
import { CertificatesScreen } from './src/components/CertificatesScreen';
import { ChatScreen } from './src/components/ChatScreen';
import { SettingScreen } from './src/components/SettingScreen';
import { ChangePasswordScreen } from './src/components/ChangePasswordScreen';
import { LanguageScreen } from './src/components/LanguageScreen';
import { AppInfoScreen } from './src/components/AppInfoScreen';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [activeClassroom, setActiveClassroom] = useState<Classroom>(MOCK_CLASSROOMS[0]);

  // Inject Inter Google Font and crisp dark web body rules
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;

    if (!document.getElementById('arc-edu-inter-font')) {
      const link = document.createElement('link');
      link.id = 'arc-edu-inter-font';
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
      document.head.appendChild(link);
    }

    if (!document.getElementById('arc-edu-web-polish')) {
      const style = document.createElement('style');
      style.id = 'arc-edu-web-polish';
      style.textContent = `
        html, body, #root {
          background-color: #090A0D !important;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
        }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #090A0D; }
        ::-webkit-scrollbar-thumb { background: #1F232E; border-radius: 3px; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
  };

  const handleLoginSuccess = () => {
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentPage('login');
  };

  const handleRelocateClassroom = (newRoom: Classroom) => {
    setActiveClassroom(newRoom);
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      {currentPage === 'login' && (
        <LoginScreen
          onLoginSuccess={handleLoginSuccess}
          onNavigateForgotPassword={() => navigateTo('forgot-password')}
        />
      )}

      {currentPage === 'forgot-password' && (
        <ForgotPassword onBack={() => navigateTo('login')} />
      )}

      {currentPage === 'dashboard' && (
        <Dashboard
          student={MOCK_STUDENT}
          activeClassroom={activeClassroom}
          onNavigate={navigateTo}
          onLogout={handleLogout}
        />
      )}

      {currentPage === 'digital-id' && (
        <DigitalIdScreen
          student={MOCK_STUDENT}
          currentPage={currentPage}
          onNavigate={navigateTo}
          onLogout={handleLogout}
          onBack={() => navigateTo('dashboard')}
        />
      )}

      {currentPage === 'attendance' && (
        <AttendanceScreen
          student={MOCK_STUDENT}
          classroom={activeClassroom}
          currentPage={currentPage}
          onNavigate={navigateTo}
          onLogout={handleLogout}
          onBack={() => navigateTo('dashboard')}
        />
      )}

      {currentPage === 'grades' && (
        <GradesJournalScreen
          student={MOCK_STUDENT}
          grades={MOCK_GRADES}
          gpa={MOCK_STUDENT.gpa}
          currentPage={currentPage}
          onNavigate={navigateTo}
          onLogout={handleLogout}
          onBack={() => navigateTo('dashboard')}
        />
      )}

      {currentPage === 'schedule' && (
        <ScheduleScreen
          student={MOCK_STUDENT}
          schedule={MOCK_SCHEDULE}
          currentPage={currentPage}
          onNavigate={navigateTo}
          onLogout={handleLogout}
          onBack={() => navigateTo('dashboard')}
          onNavigateAttendance={() => navigateTo('attendance')}
        />
      )}

      {currentPage === 'syllabus' && (
        <SyllabusWikiScreen
          student={MOCK_STUDENT}
          topics={MOCK_SYLLABUS}
          currentPage={currentPage}
          onNavigate={navigateTo}
          onLogout={handleLogout}
          onBack={() => navigateTo('dashboard')}
        />
      )}

      {currentPage === 'teacher' && (
        <TeacherControlScreen
          student={MOCK_STUDENT}
          currentClassroom={activeClassroom}
          availableClassrooms={MOCK_CLASSROOMS}
          currentPage={currentPage}
          onNavigate={navigateTo}
          onLogout={handleLogout}
          onRelocateClassroom={handleRelocateClassroom}
          onBack={() => navigateTo('dashboard')}
        />
      )}

      {currentPage === 'perks' && (
        <FreedomPerksScreen
          student={MOCK_STUDENT}
          perks={MOCK_PERKS}
          currentPage={currentPage}
          onNavigate={navigateTo}
          onLogout={handleLogout}
          onBack={() => navigateTo('dashboard')}
        />
      )}

      {currentPage === 'certificates' && (
        <CertificatesScreen
          student={MOCK_STUDENT}
          certificates={MOCK_CERTIFICATES}
          currentPage={currentPage}
          onNavigate={navigateTo}
          onLogout={handleLogout}
          onBack={() => navigateTo('dashboard')}
        />
      )}

      {currentPage === 'chat' && (
        <ChatScreen
          student={MOCK_STUDENT}
          initialMessages={MOCK_MESSAGES}
          currentPage={currentPage}
          onNavigate={navigateTo}
          onLogout={handleLogout}
          onBack={() => navigateTo('dashboard')}
        />
      )}

      {currentPage === 'settings' && (
        <SettingScreen
          student={MOCK_STUDENT}
          currentPage={currentPage}
          onBack={() => navigateTo('dashboard')}
          onNavigate={navigateTo}
          onLogout={handleLogout}
        />
      )}

      {currentPage === 'change-password' && (
        <ChangePasswordScreen
          student={MOCK_STUDENT}
          currentPage={currentPage}
          onNavigate={navigateTo}
          onLogout={handleLogout}
          onBack={() => navigateTo('settings')}
        />
      )}

      {currentPage === 'language' && (
        <LanguageScreen
          student={MOCK_STUDENT}
          currentPage={currentPage}
          onNavigate={navigateTo}
          onLogout={handleLogout}
          onBack={() => navigateTo('settings')}
        />
      )}

      {currentPage === 'app-info' && (
        <AppInfoScreen
          student={MOCK_STUDENT}
          currentPage={currentPage}
          onNavigate={navigateTo}
          onLogout={handleLogout}
          onBack={() => navigateTo('settings')}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
});
