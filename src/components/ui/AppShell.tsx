import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useResponsive } from '../../hooks/useResponsive';
import {
  LayoutGrid,
  GraduationCap,
  Calendar,
  BookOpen,
  CreditCard,
  Radio,
  FileCheck2,
  Sparkles,
  MessageSquare,
  SlidersHorizontal,
  Settings,
  LogOut,
  ArrowLeft,
} from 'lucide-react-native';
import { StudentProfile } from '../../types';
import { COLORS, FONT_FAMILY, RADIUS } from '../../theme/tokens';
import { BrandMark } from './BrandMark';

interface AppShellProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  student: StudentProfile;
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  noScroll?: boolean;
  children: React.ReactNode;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
}

const NAV_GROUPS: Array<{ label: string; items: NavItem[] }> = [
  {
    label: 'УЧЁБА',
    items: [
      { id: 'dashboard', label: 'Обзор', icon: LayoutGrid },
      { id: 'grades', label: 'Журнал и GPA', icon: GraduationCap },
      { id: 'schedule', label: 'Расписание', icon: Calendar },
      { id: 'syllabus', label: 'Силлабус и Wiki', icon: BookOpen },
    ],
  },
  {
    label: 'КАМПУС',
    items: [
      { id: 'digital-id', label: 'Digital ID', icon: CreditCard },
      { id: 'attendance', label: 'Radar Check-In', icon: Radio },
      { id: 'certificates', label: 'Справки eGov', icon: FileCheck2 },
    ],
  },
  {
    label: 'ЭКОСИСТЕМА',
    items: [
      { id: 'perks', label: 'Freedom Perks', icon: Sparkles },
      { id: 'chat', label: 'Эдвайзер', icon: MessageSquare },
      { id: 'teacher', label: 'Кабинет препода', icon: SlidersHorizontal },
    ],
  },
];

const MOBILE_TABS: NavItem[] = [
  { id: 'dashboard', label: 'Главная', icon: LayoutGrid },
  { id: 'grades', label: 'Журнал', icon: GraduationCap },
  { id: 'attendance', label: 'Radar', icon: Radio },
  { id: 'digital-id', label: 'ID', icon: CreditCard },
  { id: 'settings', label: 'Профиль', icon: Settings },
];

export const AppShell: React.FC<AppShellProps> = ({
  currentPage,
  onNavigate,
  onLogout,
  student,
  title,
  subtitle,
  onBack,
  rightAction,
  noScroll = false,
  children,
}) => {
  const { isDesktop } = useResponsive();

  const initials = student.fullName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  const isActive = (id: string) => {
    if (id === 'settings' && ['settings', 'change-password', 'language', 'app-info'].includes(currentPage)) {
      return true;
    }
    return currentPage === id;
  };

  const renderDesktopHeader = () => {
    if (!title && !rightAction) return null;
    return (
      <View style={styles.desktopTopHeader}>
        <View style={styles.headerLeftGroup}>
          {onBack && (
            <TouchableOpacity
              style={styles.backIconBtn}
              onPress={onBack}
              activeOpacity={0.75}
            >
              <ArrowLeft size={16} color={COLORS.textSecondary} strokeWidth={1.75} />
            </TouchableOpacity>
          )}
          <View>
            {title && <Text style={styles.desktopTitle}>{title}</Text>}
            {subtitle && <Text style={styles.desktopSubtitle}>{subtitle}</Text>}
          </View>
        </View>
        {rightAction && <View>{rightAction}</View>}
      </View>
    );
  };

  const renderMobileHeader = () => {
    if (!title && !onBack && !rightAction) return null;
    return (
      <View style={styles.mobileHeader}>
        <View style={styles.mobileHeaderLeft}>
          {onBack && (
            <TouchableOpacity
              style={styles.backIconBtn}
              onPress={onBack}
              activeOpacity={0.75}
            >
              <ArrowLeft size={17} color={COLORS.textPrimary} strokeWidth={1.75} />
            </TouchableOpacity>
          )}
          <View style={{ flex: 1 }}>
            {title && (
              <Text style={styles.mobileTitle} numberOfLines={1}>
                {title}
              </Text>
            )}
            {subtitle && (
              <Text style={styles.mobileSubtitle} numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </View>
        </View>
        {rightAction && <View>{rightAction}</View>}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.shellRow}>
        {/* Desktop Fixed Navigation Rail */}
        {isDesktop && (
          <View style={styles.sidebar}>
            <View>
              <TouchableOpacity
                style={styles.brandLockup}
                onPress={() => onNavigate('dashboard')}
                activeOpacity={0.85}
              >
                <BrandMark size={34} />
                <View>
                  <Text style={styles.brandTitle}>Arc Edu</Text>
                  <Text style={styles.brandSub}>AITU Portal</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.navGroupsWrap}>
                {NAV_GROUPS.map((group) => (
                  <View key={group.label} style={styles.navGroup}>
                    <Text style={styles.navGroupLabel}>{group.label}</Text>
                    {group.items.map((item) => {
                      const active = isActive(item.id);
                      const IconComponent = item.icon;
                      return (
                        <TouchableOpacity
                          key={item.id}
                          style={[styles.navItem, active && styles.navItemActive]}
                          onPress={() => onNavigate(item.id)}
                          activeOpacity={0.75}
                        >
                          {active && <View style={styles.activeIndicator} />}
                          <IconComponent
                            size={17}
                            color={active ? COLORS.accent : COLORS.textSecondary}
                            strokeWidth={1.75}
                          />
                          <Text style={[styles.navItemText, active && styles.navItemTextActive]}>
                            {item.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ))}
              </View>
            </View>

            {/* Bottom Pinned User Card */}
            <View style={styles.sidebarFooter}>
              <View style={styles.userMiniRow}>
                <View style={styles.userAvatar}>
                  <Text style={styles.userAvatarText}>{initials}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.userMiniName} numberOfLines={1}>
                    {student.fullName}
                  </Text>
                  <Text style={styles.userMiniGroup}>{student.group}</Text>
                </View>
              </View>

              <View style={styles.footerActions}>
                <TouchableOpacity
                  style={[
                    styles.footerIconBtn,
                    isActive('settings') && styles.footerIconBtnActive,
                  ]}
                  onPress={() => onNavigate('settings')}
                >
                  <Settings
                    size={16}
                    color={isActive('settings') ? COLORS.accent : COLORS.textSecondary}
                    strokeWidth={1.75}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerIconBtn} onPress={onLogout}>
                  <LogOut size={16} color={COLORS.textSecondary} strokeWidth={1.75} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Main Content Area */}
        <View style={styles.mainColumn}>
          {!isDesktop && renderMobileHeader()}

          {noScroll ? (
            <View style={[styles.noScrollWrap, isDesktop ? styles.desktopContainer : styles.mobileContainer]}>
              {isDesktop && renderDesktopHeader()}
              {children}
            </View>
          ) : (
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={[
                styles.scrollContent,
                isDesktop ? styles.desktopContainer : styles.mobileContainer,
              ]}
              showsVerticalScrollIndicator={false}
            >
              {isDesktop && renderDesktopHeader()}
              {children}
            </ScrollView>
          )}

          {/* Mobile Bottom Navigation Bar */}
          {!isDesktop && (
            <View style={styles.bottomBar}>
              {MOBILE_TABS.map((tab) => {
                const active = isActive(tab.id);
                const IconComponent = tab.icon;
                return (
                  <TouchableOpacity
                    key={tab.id}
                    style={styles.bottomTab}
                    onPress={() => onNavigate(tab.id)}
                    activeOpacity={0.75}
                  >
                    <IconComponent
                      size={20}
                      color={active ? COLORS.accent : COLORS.textTertiary}
                      strokeWidth={active ? 2 : 1.75}
                    />
                    <Text style={[styles.bottomTabText, active && styles.bottomTabTextActive]}>
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  shellRow: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.bg,
  },

  /* Desktop Left Rail */
  sidebar: {
    width: 248,
    backgroundColor: COLORS.rail,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  brandLockup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  brandTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.3,
    fontFamily: FONT_FAMILY.sans,
  },
  brandSub: {
    color: COLORS.textTertiary,
    fontSize: 11,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.sans,
  },
  navGroupsWrap: {
    gap: 18,
  },
  navGroup: {
    gap: 2,
  },
  navGroupLabel: {
    color: COLORS.textTertiary,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
    paddingHorizontal: 10,
    marginBottom: 4,
    fontFamily: FONT_FAMILY.sans,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: RADIUS.sm,
    position: 'relative',
  },
  navItemActive: {
    backgroundColor: COLORS.surfaceElevated,
  },
  activeIndicator: {
    position: 'absolute',
    left: 0,
    top: 7,
    bottom: 7,
    width: 2.5,
    borderRadius: 2,
    backgroundColor: COLORS.accent,
  },
  navItemText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.sans,
  },
  navItemTextActive: {
    color: COLORS.textPrimary,
    fontWeight: '600',
  },

  /* Sidebar Footer */
  sidebarFooter: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 14,
    gap: 12,
  },
  userMiniRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 4,
  },
  userAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.borderStrong,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarText: {
    color: COLORS.accentBright,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.sans,
  },
  userMiniName: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.sans,
  },
  userMiniGroup: {
    color: COLORS.textTertiary,
    fontSize: 11,
    fontFamily: FONT_FAMILY.sans,
  },
  footerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  footerIconBtn: {
    flex: 1,
    height: 34,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerIconBtnActive: {
    borderColor: COLORS.borderAccent,
    backgroundColor: COLORS.accentSoft,
  },

  /* Main Container */
  mainColumn: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  noScrollWrap: {
    flex: 1,
  },
  desktopContainer: {
    width: '100%',
    maxWidth: 960,
    alignSelf: 'center',
    paddingHorizontal: 36,
    paddingTop: 28,
    paddingBottom: 48,
  },
  mobileContainer: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 92,
  },

  /* Desktop Top Bar */
  desktopTopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    gap: 16,
  },
  headerLeftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  backIconBtn: {
    width: 34,
    height: 34,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  desktopTitle: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: -0.4,
    fontFamily: FONT_FAMILY.sans,
  },
  desktopSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 2,
    fontFamily: FONT_FAMILY.sans,
  },

  /* Mobile Header */
  mobileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: Platform.OS === 'android' ? 14 : 10,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.bg,
    gap: 12,
  },
  mobileHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  mobileTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
    fontFamily: FONT_FAMILY.sans,
  },
  mobileSubtitle: {
    color: COLORS.textTertiary,
    fontSize: 11,
    fontFamily: FONT_FAMILY.sans,
  },

  /* Mobile Bottom Bar */
  bottomBar: {
    flexDirection: 'row',
    height: 64,
    backgroundColor: COLORS.rail,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: 8,
    paddingBottom: 6,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bottomTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 6,
  },
  bottomTabText: {
    color: COLORS.textTertiary,
    fontSize: 10,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.sans,
  },
  bottomTabTextActive: {
    color: COLORS.accent,
    fontWeight: '600',
  },
});
