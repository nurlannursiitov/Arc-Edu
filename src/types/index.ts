// Arc Edu Core TypeScript Types & Models

export interface StudentProfile {
  id: string;
  name: string;
  student_id: string;
  iin: string;
  email: string;
  phone: string;
  group: string;
  faculty: string;
  specialty: string;
  course_year: number;
  gpa: number;
  max_gpa: number;
  attendance_rate: string;
  credits_earned: string;
  freedom_card_number: string;
  freedom_card_type: string;
  freedom_bonus_balance: number;
  status: string;
  fullName: string;
  studentId: string;
  major: string;
  course: number;
  cardDetails: {
    cardNumber: string;
    cardHolder: string;
    expiresMonthYear: string;
    balance: number;
    scholarshipAmount: number;
  };
}

export interface Classroom {
  id: string;
  code: string;
  number: string;
  building: string;
  floor: number;
  latitude: number;
  longitude: number;
  allowed_radius_meters: number;
  beaconRange: number;
  current_subject: string;
  currentSubject: string;
  teacher_name: string;
  professor: string;
  timeSlot: string;
  lecture_type: string;
  capacity: number;
  qr_code_token: string;
  nfc_tag_uid: string;
  is_active: boolean;
  isAvailable: boolean;
}

export interface SubjectGrade {
  id: string;
  code: string;
  title: string;
  subject: string;
  credits: number;
  teacher: string;
  professor: string;
  rk1: number;
  rk2: number;
  current: number;
  exam: number;
  total: number;
  letter: string;
  letterGrade: string;
  gpa_points: number;
  attendanceRate: number;
}

export interface ScheduleItem {
  id: string;
  day: 'ПН' | 'ВТ' | 'СР' | 'ЧТ' | 'ПТ' | 'СБ';
  time: string;
  startTime: string;
  endTime: string;
  subject: string;
  room: string;
  building: string;
  teacher: string;
  professor: string;
  type: string;
  status: 'past' | 'current' | 'future';
}

export interface SyllabusTopic {
  id: number;
  week: number | string;
  title: string;
  subtitle?: string;
  description: string;
  progress: number;
  query?: string;
  completed: boolean;
  readingMaterials: string[];
}

export interface PartnerPerk {
  id: string;
  partner: string;
  partnerName: string;
  tag: string;
  category: string;
  title: string;
  subtitle?: string;
  description: string;
  code: string;
  promoCode?: string;
  discount: string;
  expiresAt: string;
  gradient?: [string, string];
  icon?: string;
}

export interface CertificateRequest {
  id: string;
  title: string;
  type?: string;
  date?: string;
  requestDate: string;
  status: 'ready' | 'pending' | 'rejected' | 'Готово' | 'В обработке' | 'Отклонено';
  code?: string;
  qrVerified: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'student' | 'advisor' | 'system' | 'user';
  name?: string;
  text: string;
  time?: string;
  timestamp: string;
}
