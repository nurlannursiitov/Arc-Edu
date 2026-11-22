// Shared TypeScript Data Models for Arc Edu

export interface StudentProfile {
  id: string;
  name: string;
  student_id: string;
  group: string;
  faculty: string;
  specialty: string;
  course_year: number;
  gpa: number;
  freedom_card_number: string;
  freedom_bonus_points: number;
  avatar_url: string;
}

export interface Classroom {
  id: string;
  code: string;
  building: string;
  floor: number;
  latitude: number;
  longitude: number;
  allowed_radius_meters: number;
  current_subject: string;
  teacher_name: string;
  lecture_type: string;
  qr_code_token: string;
  nfc_tag_uid: string;
  is_active: boolean;
}

export interface SyllabusTopic {
  id: number;
  week: string;
  title: string;
  subtitle: string;
  progress: number;
  query: string;
}

export interface PartnerPerk {
  id: string;
  partner: string;
  tag: string;
  title: string;
  subtitle: string;
  code: string;
  gradient: [string, string];
  icon: string;
}

export interface AttendanceRecord {
  student_id: string;
  classroom: string;
  method: 'NFC' | 'QR';
  distance_meters: number;
  timestamp: string;
  status: 'ATTENDED' | 'REJECTED';
}
