# 🎓 Arc Edu — Цифровая экосистема студента

> **Курсовой проект по дисциплине «Веб и мобильные технологии / Архитектура ПО»**  
> **Стек:** **100% TypeScript** (Node.js + Express & React Native Expo)  
> **Срок выполнения:** 1 неделя (23.11.2026 – 29.11.2026)  
> **Группа:** ВТИП-23-2к (2 курс бакалавриата)  
> **Специальность:** 6B06101 Software Engineering  

---

## 👥 Команда проекта и роли

| Студент | Роль | Зона ответственности |
|---|---|---|
| **Нурсиитов Нурлан** | **Team Lead / Backend & Geo-core (TS)** | Архитектура TypeScript бэкенда на Express, математический расчет геозоны (Haversine), API динамической смены кабинетов. |
| **Жұмабек Қуаныш** | **Mobile Frontend Engineer (TS)** | Разработка мобильного клиента на React Native (Expo Go / TypeScript), дизайн Digital ID карты Freedom, NFC/QR сканер. |
| **Асқар Заңғар** | **Integrations, Data & QA (TS)** | Интеграция с Wikipedia REST API для конспектов силлабуса, каталог скидок Freedom Ecosystem, стресс-тестирование. |

---

## 🛠 Технологический стек (100% TypeScript)

- **Backend:** Node.js, Express, TypeScript, TSX (hot reload).
- **Mobile Client:** React Native, Expo Go (TypeScript).
- **Архитектура:** Единый типизированный стек (Shared TS Types & Interfaces), REST API.
- **Геолокация:** Математическая модель Haversine Great-Circle Distance на TypeScript.

---

## 📅 Roadmap разработки (1 неделя)

- [x] **День 1 (23 ноя):** Инициализация 100% TypeScript проекта: Express API + Expo mobile, базовая модель студента.
- [ ] **День 2 (24 ноя):** Digital Student Card (Freedom ко-бренд) и каталог партнерских скидок.
- [ ] **День 3 (25 ноя):** Математический модуль геозоны Haversine и экран чекина.
- [ ] **День 4 (26 ноя):** NFC-радар с вибрацией и динамический перенос аудиторий преподавателем.
- [ ] **День 5 (27 ноя):** Интеграция с Wikipedia REST API и парсер силлабуса.
- [ ] **День 6 (28 ноя):** QR-видоискатель (fallback) и полировка темы интерфейса.
- [ ] **День 7 (29 ноя):** Релиз v1.0.0, подготовка к защите курсового проекта.

---

## 🚀 Быстрый запуск

### 1. Бэкенд (Node.js + Express / TypeScript):
```bash
./start_backend.sh
```
API доступно по адресу: **http://127.0.0.1:8000**

### 2. Мобильное приложение (Expo Go / TypeScript):
```bash
./start_mobile.sh
```
Отсканируйте QR-код в приложении **Expo Go** на смартфоне.
