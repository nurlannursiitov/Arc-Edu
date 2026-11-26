import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";

import {
  MOCK_STUDENT,
  MOCK_CLASSROOMS,
  MOCK_GRADES,
  MOCK_SCHEDULE,
  MOCK_SYLLABUS,
  MOCK_PERKS,
  MOCK_CERTIFICATES,
  MOCK_MESSAGES,
} from "./src/data/mockData";
import { Classroom } from "./src/types";

// BankApp-style screens
import LoginScreen from "./src/components/LoginScreen";
import { ForgotPassword } from "./src/components/ForgotPassword";
import { Dashboard } from "./src/components/Dashboard";
import { DigitalIdScreen } from "./src/components/DigitalIdScreen";
import { AttendanceScreen } from "./src/components/AttendanceScreen";
import { GradesJournalScreen } from "./src/components/GradesJournalScreen";
import { ScheduleScreen } from "./src/components/ScheduleScreen";
import { SyllabusWikiScreen } from "./src/components/SyllabusWikiScreen";
import { TeacherControlScreen } from "./src/components/TeacherControlScreen";
import { FreedomPerksScreen } from "./src/components/FreedomPerksScreen";
import { CertificatesScreen } from "./src/components/CertificatesScreen";
import { ChatScreen } from "./src/components/ChatScreen";
import { SettingScreen } from "./src/components/SettingScreen";
import { ChangePasswordScreen } from "./src/components/ChangePasswordScreen";
import { LanguageScreen } from "./src/components/LanguageScreen";
import { AppInfoScreen } from "./src/components/AppInfoScreen";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("dashboard");
  const [activeClassroom, setActiveClassroom] = useState<Classroom>(MOCK_CLASSROOMS[0]);

  // Page routing
  const navigateTo = (page: string) => {
    setCurrentPage(page);
  };

  const handleLoginSuccess = () => {
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setCurrentPage("login");
  };

  const handleRelocateClassroom = (newRoom: Classroom) => {
    setActiveClassroom(newRoom);
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      {currentPage === "login" && (
        <LoginScreen
          onLoginSuccess={handleLoginSuccess}
          onNavigateForgotPassword={() => navigateTo("forgot-password")}
        />
      )}

      {currentPage === "forgot-password" && (
        <ForgotPassword onBack={() => navigateTo("login")} />
      )}

      {currentPage === "dashboard" && (
        <Dashboard
          student={MOCK_STUDENT}
          activeClassroom={activeClassroom}
          onNavigate={navigateTo}
          onLogout={handleLogout}
        />
      )}

      {currentPage === "digital-id" && (
        <DigitalIdScreen
          student={MOCK_STUDENT}
          onBack={() => navigateTo("dashboard")}
        />
      )}

      {currentPage === "attendance" && (
        <AttendanceScreen
          classroom={activeClassroom}
          onBack={() => navigateTo("dashboard")}
        />
      )}

      {currentPage === "grades" && (
        <GradesJournalScreen
          grades={MOCK_GRADES}
          gpa={MOCK_STUDENT.gpa}
          onBack={() => navigateTo("dashboard")}
        />
      )}

      {currentPage === "schedule" && (
        <ScheduleScreen
          schedule={MOCK_SCHEDULE}
          onBack={() => navigateTo("dashboard")}
          onNavigateAttendance={() => navigateTo("attendance")}
        />
      )}

      {currentPage === "syllabus" && (
        <SyllabusWikiScreen
          topics={MOCK_SYLLABUS}
          onBack={() => navigateTo("dashboard")}
        />
      )}

      {currentPage === "teacher" && (
        <TeacherControlScreen
          currentClassroom={activeClassroom}
          availableClassrooms={MOCK_CLASSROOMS}
          onRelocateClassroom={handleRelocateClassroom}
          onBack={() => navigateTo("dashboard")}
        />
      )}

      {currentPage === "perks" && (
        <FreedomPerksScreen
          perks={MOCK_PERKS}
          onBack={() => navigateTo("dashboard")}
        />
      )}

      {currentPage === "certificates" && (
        <CertificatesScreen
          certificates={MOCK_CERTIFICATES}
          onBack={() => navigateTo("dashboard")}
        />
      )}

      {currentPage === "chat" && (
        <ChatScreen
          initialMessages={MOCK_MESSAGES}
          onBack={() => navigateTo("dashboard")}
        />
      )}

      {currentPage === "settings" && (
        <SettingScreen
          student={MOCK_STUDENT}
          onBack={() => navigateTo("dashboard")}
          onNavigate={navigateTo}
          onLogout={handleLogout}
        />
      )}

      {currentPage === "change-password" && (
        <ChangePasswordScreen onBack={() => navigateTo("settings")} />
      )}

      {currentPage === "language" && (
        <LanguageScreen onBack={() => navigateTo("settings")} />
      )}

      {currentPage === "app-info" && (
        <AppInfoScreen onBack={() => navigateTo("settings")} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#070A11",
  },
});
