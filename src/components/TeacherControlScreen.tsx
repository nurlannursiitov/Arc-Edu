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
import { Classroom } from "../types";

interface TeacherControlScreenProps {
  currentClassroom: Classroom;
  availableClassrooms: Classroom[];
  onRelocateClassroom: (newRoom: Classroom) => void;
  onBack: () => void;
}

export const TeacherControlScreen: React.FC<TeacherControlScreenProps> = ({
  currentClassroom,
  availableClassrooms,
  onRelocateClassroom,
  onBack,
}) => {
  const [selectedRoomId, setSelectedRoomId] = useState(currentClassroom.id);

  const handleApplyRelocation = () => {
    const targetRoom = availableClassrooms.find((r) => r.id === selectedRoomId);
    if (!targetRoom) return;

    onRelocateClassroom(targetRoom);
    Alert.alert(
      "Аудитория перенесена! 📢",
      `Пара "${targetRoom.currentSubject}" перенесена в кабинет ${targetRoom.number} (${targetRoom.floor} этаж, ${targetRoom.building}). Всем студентам потока отправлен Push-нотификация и обновлен радар.`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Панель преподавателя</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.noticeCard}>
          <Text style={styles.noticeBadge}>TEACHER COCKPIT • AITU CAMPUS</Text>
          <Text style={styles.noticeTitle}>Оперативное управление парой</Text>
          <Text style={styles.noticeDesc}>
            Если аудитория занята или проводятся технические работы, преподаватель может в один клик перенести лекцию в свободный кабинет. Студенческий радар синхронизируется моментально.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Текущая аудитория</Text>
        <View style={styles.currentCard}>
          <View style={styles.currentHeader}>
            <Text style={styles.currentNum}>Кабинет {currentClassroom.number}</Text>
            <View style={styles.activePill}>
              <Text style={styles.activePillText}>АКТИВНАЯ ЛОКАЦИЯ</Text>
            </View>
          </View>
          <Text style={styles.currentSubject}>{currentClassroom.currentSubject}</Text>
          <Text style={styles.currentMeta}>
            Вместимость: {currentClassroom.capacity} мест • BLE Радар: {currentClassroom.beaconRange}м • {currentClassroom.building}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Выберите аудиторию для переноса</Text>

        {availableClassrooms.map((room) => {
          const isSelected = selectedRoomId === room.id;
          const isCurrent = currentClassroom.id === room.id;

          return (
            <TouchableOpacity
              key={room.id}
              style={[
                styles.roomCard,
                isSelected && styles.roomCardSelected,
              ]}
              onPress={() => setSelectedRoomId(room.id)}
            >
              <View style={styles.roomHeader}>
                <View>
                  <Text style={styles.roomCardNum}>Аудитория {room.number}</Text>
                  <Text style={styles.roomCardBuilding}>
                    {room.building}, {room.floor} этаж
                  </Text>
                </View>
                <View
                  style={[
                    styles.roomBadge,
                    { backgroundColor: room.isAvailable ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)" },
                  ]}
                >
                  <Text
                    style={{
                      color: room.isAvailable ? "#10B981" : "#EF4444",
                      fontSize: 11,
                      fontWeight: "700",
                    }}
                  >
                    {isCurrent ? "Текущая" : room.isAvailable ? "Свободна ✓" : "Занята ✕"}
                  </Text>
                </View>
              </View>

              <View style={styles.roomSpecs}>
                <Text style={styles.specText}>👥 Вместимость: {room.capacity} чел.</Text>
                <Text style={styles.specText}>📡 Радиус радара: {room.beaconRange}м</Text>
              </View>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={styles.applyBtn}
          onPress={handleApplyRelocation}
        >
          <Text style={styles.applyBtnText}>Подтвердить перенос аудитории</Text>
        </TouchableOpacity>
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
  noticeCard: {
    backgroundColor: "rgba(168, 85, 247, 0.1)",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(168, 85, 247, 0.3)",
    marginBottom: 20,
  },
  noticeBadge: {
    color: "#C084FC",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 6,
  },
  noticeTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },
  noticeDesc: {
    color: "#CBD5E1",
    fontSize: 12,
    lineHeight: 18,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 12,
  },
  currentCard: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 229, 255, 0.3)",
    marginBottom: 20,
  },
  currentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  currentNum: {
    color: "#00E5FF",
    fontSize: 18,
    fontWeight: "800",
  },
  activePill: {
    backgroundColor: "rgba(0, 229, 255, 0.15)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  activePillText: {
    color: "#00E5FF",
    fontSize: 10,
    fontWeight: "800",
  },
  currentSubject: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  currentMeta: {
    color: "#94A3B8",
    fontSize: 12,
  },
  roomCard: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.06)",
    marginBottom: 12,
  },
  roomCardSelected: {
    borderColor: "#A855F7",
    backgroundColor: "rgba(168, 85, 247, 0.08)",
  },
  roomHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  roomCardNum: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  roomCardBuilding: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 2,
  },
  roomBadge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  roomSpecs: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.04)",
    paddingTop: 8,
  },
  specText: {
    color: "#64748B",
    fontSize: 11,
  },
  applyBtn: {
    backgroundColor: "#A855F7",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
  },
  applyBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
});
