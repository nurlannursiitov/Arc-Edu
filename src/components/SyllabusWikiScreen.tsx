import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { BookOpen, Search, CheckCircle2, Clock, Globe } from 'lucide-react-native';
import { StudentProfile, SyllabusTopic } from '../types';
import { COLORS, FONT_FAMILY, RADIUS } from '../theme/tokens';
import { AppShell } from './ui/AppShell';

interface SyllabusWikiScreenProps {
  student: StudentProfile;
  topics: SyllabusTopic[];
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onBack: () => void;
}

export const SyllabusWikiScreen: React.FC<SyllabusWikiScreenProps> = ({
  student,
  topics,
  currentPage,
  onNavigate,
  onLogout,
  onBack,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<SyllabusTopic>(topics[0]);
  const [searchQuery, setSearchQuery] = useState('');
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
      if (data?.query?.search) {
        setWikiResults(data.query.search);
      }
    } catch (e) {
      console.log('Wiki API Error:', e);
    } finally {
      setLoading(false);
    }
  };

  const cleanSnippet = (html: string) => html.replace(/<[^>]*>?/gm, '');

  return (
    <AppShell
      currentPage={currentPage}
      onNavigate={onNavigate}
      onLogout={onLogout}
      student={student}
      title="Силлабус и Wiki"
      subtitle="Тематический план курса и научная база знаний"
      onBack={onBack}
    >
      {/* Week Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0, marginBottom: 18 }}
        contentContainerStyle={styles.weeksRow}
      >
        {topics.map((t) => {
          const active = selectedTopic.id === t.id;
          return (
            <TouchableOpacity
              key={t.id}
              style={[styles.weekChip, active && styles.weekChipActive]}
              onPress={() => {
                setSelectedTopic(t);
                setSearchQuery(t.title);
                searchWikipedia(t.title);
              }}
              activeOpacity={0.78}
            >
              <Text style={[styles.weekLabel, active && styles.weekLabelActive]}>
                Неделя {t.week}
              </Text>
              <Text
                style={[styles.weekTitle, active && { color: COLORS.textPrimary }]}
                numberOfLines={1}
              >
                {t.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Selected Topic Detail */}
      <View style={styles.topicCard}>
        <View style={styles.topicTopRow}>
          <Text style={styles.topicEyebrow}>НЕДЕЛЯ {selectedTopic.week} · СИЛЛАБУС</Text>
          <View
            style={[
              styles.statusPill,
              { backgroundColor: selectedTopic.completed ? COLORS.accentSoft : COLORS.warningSoft },
            ]}
          >
            {selectedTopic.completed ? (
              <CheckCircle2 size={12} color={COLORS.accent} strokeWidth={2} />
            ) : (
              <Clock size={12} color={COLORS.warning} strokeWidth={2} />
            )}
            <Text
              style={[
                styles.statusText,
                { color: selectedTopic.completed ? COLORS.accentBright : COLORS.warning },
              ]}
            >
              {selectedTopic.completed ? 'Изучено' : 'В процессе'}
            </Text>
          </View>
        </View>

        <Text style={styles.topicHeading}>{selectedTopic.title}</Text>
        <Text style={styles.topicDesc}>{selectedTopic.description}</Text>

        <View style={styles.readingBox}>
          <Text style={styles.readingHeader}>Рекомендуемая литература</Text>
          {selectedTopic.readingMaterials.map((m, i) => (
            <View key={i} style={styles.readingRow}>
              <BookOpen size={13} color={COLORS.accent} strokeWidth={1.75} />
              <Text style={styles.readingText}>{m}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Live Wikipedia Research Crawler */}
      <View style={styles.wikiCard}>
        <View style={styles.wikiHeader}>
          <View style={styles.wikiIconBox}>
            <Globe size={18} color={COLORS.accent} strokeWidth={1.75} />
          </View>
          <View>
            <Text style={styles.wikiTitle}>Wikipedia Research</Text>
            <Text style={styles.wikiSub}>Быстрый поиск академических определений</Text>
          </View>
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchInputWrap}>
            <Search size={15} color={COLORS.textTertiary} strokeWidth={1.75} />
            <TextInput
              style={styles.searchInput}
              placeholder="Введите термин или тему..."
              placeholderTextColor={COLORS.textTertiary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => searchWikipedia(searchQuery)}
            activeOpacity={0.85}
          >
            <Text style={styles.searchBtnText}>Найти</Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <View style={styles.loadingWrap}>
            <ActivityIndicator color={COLORS.accent} />
            <Text style={styles.loadingText}>Загрузка материалов...</Text>
          </View>
        )}

        {wikiResults.map((item, idx) => (
          <View key={idx} style={styles.resultCard}>
            <Text style={styles.resultTitle}>{item.title}</Text>
            <Text style={styles.resultSnippet}>{cleanSnippet(item.snippet)}...</Text>
            <View style={styles.resultFooter}>
              <Text style={styles.resultMeta}>Слов: {item.wordcount}</Text>
              <Text style={styles.resultSource}>ru.wikipedia.org</Text>
            </View>
          </View>
        ))}
      </View>
    </AppShell>
  );
};

const styles = StyleSheet.create({
  weeksRow: {
    flexDirection: 'row',
    gap: 10,
  },
  weekChip: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxWidth: 180,
  },
  weekChipActive: {
    backgroundColor: COLORS.surfaceElevated,
    borderColor: COLORS.borderAccent,
  },
  weekLabel: {
    color: COLORS.textTertiary,
    fontSize: 10,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  weekLabelActive: {
    color: COLORS.accentBright,
  },
  weekTitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
    fontFamily: FONT_FAMILY.sans,
  },
  topicCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    marginBottom: 18,
    gap: 10,
  },
  topicTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topicEyebrow: {
    color: COLORS.textTertiary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    fontFamily: FONT_FAMILY.sans,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  topicHeading: {
    color: COLORS.textPrimary,
    fontSize: 17,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  topicDesc: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    fontFamily: FONT_FAMILY.sans,
  },
  readingBox: {
    backgroundColor: COLORS.bg,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginTop: 4,
    gap: 8,
  },
  readingHeader: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  readingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  readingText: {
    flex: 1,
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 17,
    fontFamily: FONT_FAMILY.sans,
  },
  wikiCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    gap: 14,
  },
  wikiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  wikiIconBox: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wikiTitle: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  wikiSub: {
    color: COLORS.textTertiary,
    fontSize: 12,
    fontFamily: FONT_FAMILY.sans,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 10,
  },
  searchInputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.bg,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    color: COLORS.textPrimary,
    paddingVertical: 11,
    fontSize: 13,
    fontFamily: FONT_FAMILY.sans,
  },
  searchBtn: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 18,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
  },
  searchBtnText: {
    color: COLORS.textInverse,
    fontSize: 13,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  loadingWrap: {
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  loadingText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontFamily: FONT_FAMILY.sans,
  },
  resultCard: {
    backgroundColor: COLORS.bg,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    gap: 6,
  },
  resultTitle: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  resultSnippet: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 17,
    fontFamily: FONT_FAMILY.sans,
  },
  resultFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  resultMeta: {
    color: COLORS.textTertiary,
    fontSize: 10,
    fontFamily: FONT_FAMILY.mono,
  },
  resultSource: {
    color: COLORS.accentBright,
    fontSize: 10,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.mono,
  },
});
