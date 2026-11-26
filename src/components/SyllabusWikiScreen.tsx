import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { SyllabusTopic } from "../types";

interface SyllabusWikiScreenProps {
  topics: SyllabusTopic[];
  onBack: () => void;
}

export const SyllabusWikiScreen: React.FC<SyllabusWikiScreenProps> = ({ topics, onBack }) => {
  const [selectedTopic, setSelectedTopic] = useState<SyllabusTopic>(topics[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [wikiResults, setWikiResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const searchWikipedia = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const url = `https://ru.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
        query
      )}&format=json&origin=*`;
      const res = await fetch(url);
      const data = await res.json();
      if (data && data.query && data.query.search) {
        setWikiResults(data.query.search);
      }
    } catch (e) {
      console.log("Wiki API Error:", e);
    } finally {
      setLoading(false);
    }
  };

  const cleanSnippet = (html: string) => {
    return html.replace(/<[^>]*>?/gm, "");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Силлабус & Wiki Конспекты</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Тематический план курса (15 Недель)</Text>

        {/* Horizontal Topic Weeks */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weeksRow}
        >
          {topics.map((t) => (
            <TouchableOpacity
              key={t.id}
              style={[
                styles.topicChip,
                selectedTopic.id === t.id && styles.topicChipActive,
              ]}
              onPress={() => {
                setSelectedTopic(t);
                setSearchQuery(t.title);
                searchWikipedia(t.title);
              }}
            >
              <Text
                style={[
                  styles.topicWeekNum,
                  selectedTopic.id === t.id && styles.topicWeekNumActive,
                ]}
              >
                Неделя {t.week}
              </Text>
              <Text
                style={[
                  styles.topicChipTitle,
                  selectedTopic.id === t.id && styles.topicChipTitleActive,
                ]}
                numberOfLines={1}
              >
                {t.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Selected Topic Detail Card */}
        <View style={styles.activeTopicCard}>
          <View style={styles.topicHeader}>
            <Text style={styles.activeWeek}>НЕДЕЛЯ {selectedTopic.week} • СИЛЛАБУС AITU</Text>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: selectedTopic.completed ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)" },
              ]}
            >
              <Text
                style={{
                  color: selectedTopic.completed ? "#10B981" : "#F59E0B",
                  fontSize: 10,
                  fontWeight: "800",
                }}
              >
                {selectedTopic.completed ? "ИЗУЧЕНО ✓" : "В ПРОЦЕССЕ"}
              </Text>
            </View>
          </View>

          <Text style={styles.activeTopicTitle}>{selectedTopic.title}</Text>
          <Text style={styles.activeTopicDesc}>{selectedTopic.description}</Text>

          <View style={styles.readingList}>
            <Text style={styles.readingListTitle}>Рекомендуемая литература:</Text>
            {selectedTopic.readingMaterials.map((m, i) => (
              <Text key={i} style={styles.readingItem}>
                • {m}
              </Text>
            ))}
          </View>
        </View>

        {/* Live Wikipedia Knowledge Crawler */}
        <View style={styles.wikiCard}>
          <View style={styles.wikiHeader}>
            <Text style={styles.wikiLogo}>🌐</Text>
            <View>
              <Text style={styles.wikiTitle}>Wikipedia Research Crawler</Text>
              <Text style={styles.wikiSub}>Автоматический поиск академических статей</Text>
            </View>
          </View>

          <View style={styles.searchRow}>
            <TextInput
              style={styles.searchInput}
              placeholder="Поиск темы в Википедии..."
              placeholderTextColor="#64748B"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity
              style={styles.searchBtn}
              onPress={() => searchWikipedia(searchQuery)}
            >
              <Text style={styles.searchBtnText}>Найти</Text>
            </TouchableOpacity>
          </View>

          {loading && (
            <View style={styles.loadingBox}>
              <ActivityIndicator color="#00E5FF" />
              <Text style={styles.loadingText}>Загрузка академических данных...</Text>
            </View>
          )}

          {wikiResults.map((item, index) => (
            <View key={index} style={styles.wikiResultItem}>
              <Text style={styles.wikiItemTitle}>{item.title}</Text>
              <Text style={styles.wikiItemSnippet}>
                {cleanSnippet(item.snippet)}...
              </Text>
              <View style={styles.wikiBadgeRow}>
                <Text style={styles.wikiWordCount}>Слов: {item.wordcount}</Text>
                <Text style={styles.wikiVerified}>ru.wikipedia.org ✓</Text>
              </View>
            </View>
          ))}
        </View>
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
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 12,
  },
  weeksRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  topicChip: {
    backgroundColor: "#111827",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    minWidth: 110,
  },
  topicChipActive: {
    backgroundColor: "rgba(0, 229, 255, 0.15)",
    borderColor: "#00E5FF",
  },
  topicWeekNum: {
    fontSize: 10,
    fontWeight: "800",
    color: "#64748B",
  },
  topicWeekNumActive: {
    color: "#00E5FF",
  },
  topicChipTitle: {
    fontSize: 12,
    color: "#CBD5E1",
    fontWeight: "600",
    marginTop: 2,
  },
  topicChipTitleActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  activeTopicCard: {
    backgroundColor: "#111827",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(0, 229, 255, 0.3)",
    marginBottom: 20,
  },
  topicHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  activeWeek: {
    fontSize: 10,
    fontWeight: "800",
    color: "#00E5FF",
    letterSpacing: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  activeTopicTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  activeTopicDesc: {
    fontSize: 13,
    color: "#94A3B8",
    lineHeight: 18,
    marginBottom: 14,
  },
  readingList: {
    backgroundColor: "rgba(255,255,255,0.03)",
    padding: 12,
    borderRadius: 12,
  },
  readingListTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#CBD5E1",
    marginBottom: 6,
  },
  readingItem: {
    fontSize: 12,
    color: "#94A3B8",
    marginBottom: 2,
  },
  wikiCard: {
    backgroundColor: "#111827",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  wikiHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  wikiLogo: {
    fontSize: 26,
  },
  wikiTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  wikiSub: {
    fontSize: 11,
    color: "#64748B",
  },
  searchRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.8)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#FFFFFF",
    fontSize: 13,
  },
  searchBtn: {
    backgroundColor: "#00E5FF",
    paddingHorizontal: 16,
    borderRadius: 12,
    justifyContent: "center",
  },
  searchBtnText: {
    color: "#050B14",
    fontSize: 13,
    fontWeight: "700",
  },
  loadingBox: {
    alignItems: "center",
    paddingVertical: 20,
    gap: 8,
  },
  loadingText: {
    color: "#94A3B8",
    fontSize: 12,
  },
  wikiResultItem: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  wikiItemTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#00E5FF",
    marginBottom: 4,
  },
  wikiItemSnippet: {
    fontSize: 12,
    color: "#CBD5E1",
    lineHeight: 16,
  },
  wikiBadgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  wikiWordCount: {
    fontSize: 10,
    color: "#64748B",
  },
  wikiVerified: {
    fontSize: 10,
    color: "#10B981",
  },
});
