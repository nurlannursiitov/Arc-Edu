import { Classroom, PartnerPerk, SyllabusTopic } from '../types.js';

export const SYLLABUS_DB: SyllabusTopic[] = [
  {
    id: 1,
    week: '01',
    title: 'Архитектура фон Неймана vs Гарвардская модель',
    subtitle: 'Шины данных, ALU, управляющий блок и регистровый файл',
    progress: 100,
    query: 'Архитектура_фон_Неймана'
  },
  {
    id: 2,
    week: '02',
    title: 'Иерархия кэш-памяти (L1, L2, L3) и когерентность',
    subtitle: 'Кэш-попадания, протоколы MESI/MOESI, алгоритмы LRU',
    progress: 100,
    query: 'Кэш_память'
  },
  {
    id: 3,
    week: '03',
    title: 'Суперскалярный конвейер и спекулятивное исполнение',
    subtitle: 'Fetch-Decode-Execute-Mem-WB, Branch Prediction (BPU)',
    progress: 65,
    query: 'Конвейер_команд'
  },
  {
    id: 4,
    week: '04',
    title: 'Высокоскоростные интерфейсы: PCIe 5.0, NVMe, CXL',
    subtitle: 'Дифференциальная сигнализация, lane-распределение и DMA',
    progress: 10,
    query: 'PCI_Express'
  }
];

export const FREEDOM_PERKS: PartnerPerk[] = [
  {
    id: 'p-1',
    partner: 'Freedom Bank',
    tag: 'ФИНТЕХ ПАКЕТ',
    title: 'Freedom Black Student VIP',
    subtitle: '0₸ обслуживание + до 10% кэшбэк на столовые и кофейни кампуса',
    code: 'ARC_FREEDOM_VIP',
    gradient: ['#0B6623', '#034417'],
    icon: '💳'
  },
  {
    id: 'p-2',
    partner: 'Freedom Mobile',
    tag: 'РАССРОЧКА 0-0-24',
    title: 'Студенческая техника Apple & ThinkPad',
    subtitle: 'Специальная рассрочка без переплат на учебные ноутбуки по Digital ID',
    code: 'STUDENT_DEV2026',
    gradient: ['#0284C7', '#0369A1'],
    icon: '💻'
  },
  {
    id: 'p-3',
    partner: 'Freedom Broker',
    tag: 'ИНВЕСТИЦИИ',
    title: 'Инвестиционный счет 0% комиссия',
    subtitle: 'Бесплатное обучение фондовому рынку + бонус 5 000 ₸ на первую сделку',
    code: 'INVEST_STUDENT',
    gradient: ['#7C3AED', '#5B21B6'],
    icon: '📈'
  },
  {
    id: 'p-4',
    partner: 'Dodo Pizza & Kinopark',
    tag: 'ЛАЙФСТАЙЛ',
    title: 'Студенческий комбо-пакет',
    subtitle: 'Пицца 25 см за 1990 ₸ + билеты в кино по 900 ₸ по вторникам',
    code: 'DODO_ARC_EDU',
    gradient: ['#EA580C', '#C2410C'],
    icon: '🍕'
  }
];

export const ROOMS_DB: Record<string, Classroom> = {
  '304': {
    id: 'room-304',
    code: '304',
    building: 'Главный кампус AITU',
    floor: 3,
    latitude: 43.238949,
    longitude: 76.945465,
    allowed_radius_meters: 60.0,
    current_subject: 'Архитектура вычислительных систем',
    teacher_name: 'доц. Ахметов С.К.',
    lecture_type: 'Лекция • 2 пара (10:00 - 11:30)',
    qr_code_token: 'ARC-EDU-ROOM304-TOKEN',
    nfc_tag_uid: '04:A2:8F:B1:3C:60:80',
    is_active: true
  },
  '402': {
    id: 'room-402',
    code: '402',
    building: 'IT Hub & Cyber Lab',
    floor: 4,
    latitude: 43.239450,
    longitude: 76.946120,
    allowed_radius_meters: 60.0,
    current_subject: 'Операционные системы и сети',
    teacher_name: 'проф. Жумагулов Н.Б.',
    lecture_type: 'Лабораторная • 3 пара',
    qr_code_token: 'ARC-EDU-ROOM402-TOKEN',
    nfc_tag_uid: '04:F1:C3:7E:9A:11:80',
    is_active: false
  }
};
