import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { ScheduleItem } from "../types";

interface ScheduleScreenProps {
  schedule: ScheduleItem[];
  onBack: () => void;
  onNavigateAttendance: () => void;
}

const DAYS = [
  { key: "ПН", label: "Понедельник" },
  { key: "ВТ", label: "Вторник" },
  { key: "СР", label: "Среда" },
  { key: "ЧТ", label: "Четверг" },
  { key: "ПТ", label: "Пятница" },
  { key: "СБ", label: "Суббота" },
];

export const ScheduleScreen: React.FC<ScheduleScreenProps> = ({
  schedule,
  onBack,
  onNavigateAttendance,
}) => {
  const [selectedDay, setSelectedDay] = useState("ПН");

  const daySchedule = schedule.filter((item) => item.day === selectedDay);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "lecture":
        return "#00E5FF";
      case "practice":
        return "#10B981";
      case "lab":
        return "#F59E0B";
      default:
        return "#8B5CF6";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "lecture":
        return "Лекция";
      case "practice":
        return "Практика";
      case "lab":
        return "Лаб. работа";
      default:
        return "Семинар";
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Расписание занятий</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Days selector bar */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.daysScroll}
        >
          {DAYS.map((d) => (
            <TouchableOpacity
              key={d.key}
              style={[
                styles.dayChip,
                selectedDay === d.key && styles.dayChipActive,
              ]}
              onPress={() => setSelectedDay(d.key)}
            >
              <Text
                style={[
                  styles.dayChipShort,
                  selectedDay === d.key && styles.dayChipShortActive,
                ]}
              >
                {d.key}
              </Text>
              <Text
                style={[
                  styles.dayChipSub,
                  selectedDay === d.key && styles.dayChipSubActive,
                ]}
              >
                {d.label.slice(0, 3)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.daySummaryRow}>
          <Text style={styles.daySummaryTitle}>
            {DAYS.find((d) => d.key === selectedDay)?.label}
          </Text>
          <Text style={styles.daySummaryBadge}>{daySchedule.length} занятий</Text>
        </View>

        {daySchedule.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>🎉</Text>
            <Text style={styles.emptyTitle}>В этот день пар нет</Text>
            <Text style={styles.emptySub}>Отличный день для самоподготовки или хакатонов</Text>
          </View>
        ) : (
          daySchedule.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemTimeCol}>
                <Text style={styles.timeStart}>{item.startTime}</Text>
                <View style={styles.timeLine} />
                <Text style={styles.timeEnd}>{item.endTime}</Text>
              </View>

              <View style={styles.itemMainCol}>
                <View style={styles.itemTopRow}>
                  <View
                    style={[
                      styles.typeBadge,
                      { backgroundColor: `${getTypeColor(item.type)}20` },
                    ]}
                  >
                    <Text
                      style={[
                        styles.typeBadgeText,
                        { color: getTypeColor(item.type) },
                      ]}
                    >
                      {getTypeLabel(item.type)}
                    </Text>
                  </View>
                  <View style={styles.roomPill}>
                    <Text style={styles.roomPillText}>Ауд. {item.room}</Text>
                  </View>
                </View>

                <Text style={styles.subjectName}>{item.subject}</Text>
                <Text style={styles.profName}>Преподаватель: {item.professor}</Text>

                <TouchableOpacity
                  style={styles.checkInRow}
                  onPress={onNavigateAttendance}
                >
                  <Text style={styles.checkInText}>📡 Перейти к Radar-отметке</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
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
  daysScroll: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  dayChip: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#111827",
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    minWidth: 54,
  },
  dayChipActive: {
    backgroundColor: "rgba(0, 229, 255, 0.15)",
    borderColor: "#00E5FF",
  },
  dayChipShort: {
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "800",
  },
  dayChipShortActive: {
    color: "#00E5FF",
  },
  dayChipSub: {
    color: "#64748B",
    fontSize: 10,
    marginTop: 2,
  },
  dayChipSubActive: {
    color: "#00E5FF",
  },
  daySummaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  daySummaryTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },
  daySummaryBadge: {
    color: "#94A3B8",
    fontSize: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  emptyCard: {
    backgroundColor: "#111827",
    borderRadius: 18,
    padding: 30,
    alignItems: "center",
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "700",
    marginBottom: 4,
  },
  emptySub: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
  },
  itemCard: {
    flexDirection: "row",
    backgroundColor: "#111827",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    marginBottom: 14,
  },
  itemTimeCol: {
    alignItems: "center",
    marginRight: 16,
    width: 50,
  },
  timeStart: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  timeLine: {
    flex: 1,
    width: 2,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginVertical: 4,
  },
  timeEnd: {
    color: "#64748B",
    fontSize: 12,
  },
  itemMainCol: {
    flex: 1,
  },
  itemTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  roomPill: {
    backgroundColor: "rgba(0, 229, 255, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  roomPillText: {
    color: "#00E5FF",
    fontSize: 11,
    fontWeight: "700",
  },
  subjectName: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  profName: {
    color: "#94A3B8",
    fontSize: 12,
    marginBottom: 10,
  },
  checkInRow: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.04)",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  checkInText: {
    color: "#00E5FF",
    fontSize: 11,
    fontWeight: "700",
  },
});
