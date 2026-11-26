import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Send } from 'lucide-react-native';
import { ChatMessage, StudentProfile } from '../types';
import { COLORS, FONT_FAMILY, RADIUS } from '../theme/tokens';
import { AppShell } from './ui/AppShell';

interface ChatScreenProps {
  student: StudentProfile;
  initialMessages: ChatMessage[];
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onBack: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  student,
  initialMessages,
  currentPage,
  onNavigate,
  onLogout,
  onBack,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'advisor',
        text: 'Принято. Проверю ваш индивидуальный учебный план и отвечу после согласования с деканатом.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 900);
  };

  const onlineBadge = (
    <View style={styles.onlinePill}>
      <View style={styles.onlineDot} />
      <Text style={styles.onlineText}>Деканат онлайн</Text>
    </View>
  );

  return (
    <AppShell
      currentPage={currentPage}
      onNavigate={onNavigate}
      onLogout={onLogout}
      student={student}
      title="Академический эдвайзер"
      subtitle="Даулетова А.Б. · Деканат Software Engineering"
      onBack={onBack}
      rightAction={onlineBadge}
      noScroll
    >
      <KeyboardAvoidingView
        style={styles.chatPanel}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((m) => {
            const isUser = m.sender === 'user' || m.sender === 'student';
            return (
              <View
                key={m.id}
                style={[
                  styles.bubble,
                  isUser ? styles.userBubble : styles.advisorBubble,
                ]}
              >
                <Text
                  style={[
                    styles.bubbleText,
                    { color: isUser ? COLORS.textInverse : COLORS.textPrimary },
                  ]}
                >
                  {m.text}
                </Text>
                <Text
                  style={[
                    styles.bubbleTime,
                    {
                      color: isUser
                        ? 'rgba(7, 10, 13, 0.65)'
                        : COLORS.textTertiary,
                    },
                  ]}
                >
                  {m.timestamp}
                </Text>
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.composerRow}>
          <TextInput
            style={styles.input}
            placeholder="Напишите сообщение эдвайзеру..."
            placeholderTextColor={COLORS.textTertiary}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend} activeOpacity={0.85}>
            <Send size={16} color={COLORS.textInverse} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </AppShell>
  );
};

const styles = StyleSheet.create({
  onlinePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.accentSoft,
    borderWidth: 1,
    borderColor: COLORS.borderAccent,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.pill,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.accent,
  },
  onlineText: {
    color: COLORS.accentBright,
    fontSize: 11,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  chatPanel: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    padding: 18,
    gap: 12,
  },
  bubble: {
    maxWidth: '78%',
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: RADIUS.lg,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.accent,
    borderBottomRightRadius: 4,
  },
  advisorBubble: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderBottomLeftRadius: 4,
  },
  bubbleText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FONT_FAMILY.sans,
  },
  bubbleTime: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
    fontFamily: FONT_FAMILY.mono,
  },
  composerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    backgroundColor: COLORS.rail,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: 14,
    paddingVertical: 11,
    color: COLORS.textPrimary,
    fontSize: 14,
    fontFamily: FONT_FAMILY.sans,
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
