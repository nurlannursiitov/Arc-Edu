# ⚡ Arc Edu (Platonus 2.0 Analog)

> **Next-Generation Student Experience & Campus FinTech SuperApp for Astana IT University**  
> 100% TypeScript • React Native (Expo SDK 58) • Inspired by BankApp Architecture

---

## 👥 Разработчики (Astana IT University)
- **Нурсиитов Нурлан** (`nurlannursiitov`) — Team Lead & Core System Architecture
- **Жұмабек Қуаныш** (`kzumabek543@gmail.com`) — Mobile Frontend & Luxury Neo-Dark UI/UX
- **Асқар Заңғар** (`zangaraskar08@gmail.com`) — Data Models, Radar Geofencing & Integrations

---

## 🏛 Архитектура проекта
Проект построен по модульной архитектуре автономного Expo React Native приложения:
```
Arc-Edu/
├── App.tsx                     # Главный роутер экранов приложения
├── index.ts                    # Точка входа Expo registerRootComponent
├── app.json                    # Конфигурация Expo проекта
├── package.json                # Зависимости (Expo 58, React 19, react-native)
├── tsconfig.json               # Настройки компилятора TypeScript (strict mode)
├── assets/                     # Графика, иконки, сплэш-экраны
└── src/
    ├── types/
    │   └── index.ts            # Типизированные интерфейсы (Profile, Grades, Radar, Perks)
    ├── data/
    │   └── mockData.ts         # Данные кампуса AITU, студента и Freedom Bank
    └── components/
        ├── LoginScreen.tsx          # Авторизация студента AITU + биометрия Face ID
        ├── ForgotPassword.tsx       # Восстановление доступа через Barcode ID
        ├── Dashboard.tsx            # Главный хаб: карточка Freedom VIP + Grid Menu
        ├── DigitalIdScreen.tsx      # Цифровой студенческий билет eGov + 3D flip + Barcode
        ├── AttendanceScreen.tsx     # Radar Scanner: 60m geofence проверка присутствия
        ├── GradesJournalScreen.tsx  # Академический журнал Platonus (РК-1, РК-2, Сессия, GPA)
        ├── ScheduleScreen.tsx       # Интерактивное расписание ПН - СБ с типами занятий
        ├── SyllabusWikiScreen.tsx   # Силлабус курса + живой Wikipedia API Crawler
        ├── TeacherControlScreen.tsx # Панель преподавателя (перенос аудиторий в 1 клик)
        ├── FreedomPerksScreen.tsx   # Студенческие скидки и промокоды Freedom VIP
        ├── CertificatesScreen.tsx   # Заказ официальных справок ЦОС с ЭЦП
        ├── ChatScreen.tsx           # Онлайн-чат с академическим эдвайзером
        ├── SettingScreen.tsx        # Настройки биометрии, пушей и радара
        ├── ChangePasswordScreen.tsx # Смена пароля от единого аккаунта
        ├── LanguageScreen.tsx       # Выбор языка (Қазақша / Русский / English)
        └── AppInfoScreen.tsx        # Сведения о команде и стеке технологий
```

---

## 🚀 Запуск проекта

### 1. Установка зависимостей
```bash
npm install
```

### 2. Запуск в браузере (Web)
```bash
npx expo start --web
```

### 3. Запуск на мобильном телефоне (Expo Go)
```bash
npx expo start
```
*Отсканируйте появившийся QR-код через приложение **Expo Go** на iOS или Android.*

---

## 🌟 Ключевые возможности Arc Edu
1. **Freedom Black VIP Student Card** — виртуальная банковская карта и пропуск с отображением баланса, стипендии, GPA и штрихкода.
2. **Radar Attendance (BLE / Geofence)** — умный чек-ин на лекциях с защитой от спуфинга и проверкой нахождения в радиусе аудитории.
3. **Platonus Electronic Journal** — полная ведомость успеваемости с баллами за РК-1, РК-2, экзамен и расчет накопительного GPA.
4. **Wikipedia Syllabus Research** — встроенная интеграция с Wikipedia API для автоматического поиска академических конспектов.
5. **Teacher Relocation Cockpit** — возможность преподавателя менять аудиторию (например, из 304 в 402), мгновенно оповещая всех студентов и синхронизируя радар.
