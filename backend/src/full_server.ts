import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// ----------------- Interfaces ----------------- //

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
  qr_code_token: string;
  nfc_tag_uid: string;
  is_active: boolean;
}

export interface AttendanceRequest {
  student_id: string;
  classroom_code: string;
  latitude: number;
  longitude: number;
  method: 'NFC' | 'QR';
  token: string;
}

// ----------------- Mock Database ----------------- //

const CURRENT_STUDENT: StudentProfile = {
  id: 'arc-001',
  name: 'Нурсиитов Нурлан',
  student_id: '230107042',
  group: 'ВТИП-23-2к',
  faculty: 'Информационные технологии',
  specialty: '6B06101 Software Engineering',
  course_year: 2,
  gpa: 3.87,
  freedom_card_number: '5412 •••• •••• 9842',
  freedom_bonus_points: 6250,
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
};

const ROOMS_DB: Record<string, Classroom> = {
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
    qr_code_token: 'ARC-EDU-ROOM402-TOKEN',
    nfc_tag_uid: '04:F1:C3:7E:9A:11:80',
    is_active: false
  },
  '101-LAB': {
    id: 'room-101',
    code: '101-LAB',
    building: 'Hardware & IoT Центр',
    floor: 1,
    latitude: 43.237800,
    longitude: 76.944200,
    allowed_radius_meters: 70.0,
    current_subject: 'Микроконтроллеры и FPGA',
    teacher_name: 'ст. преп. Идрисов М.А.',
    qr_code_token: 'ARC-EDU-LAB101-TOKEN',
    nfc_tag_uid: '04:77:2B:99:A4:55:80',
    is_active: false
  }
};

let CURRENT_ACTIVE_ROOM_CODE = '304';
const ATTENDANCE_LOG: any[] = [];

// ----------------- Math Helpers ----------------- //

function calculateHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000; // meters
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 100) / 100;
}

// ----------------- Endpoints ----------------- //

app.get('/', (req: Request, res: Response) => {
  res.json({
    project: 'Arc Edu',
    status: 'online',
    author: 'Нурсиитов Нурлан',
    active_classroom: CURRENT_ACTIVE_ROOM_CODE,
    stack: '100% TypeScript (Node.js + Express & React Native Expo)'
  });
});

app.get('/api/student/me', (req: Request, res: Response) => {
  res.json(CURRENT_STUDENT);
});

app.get('/api/classroom/current', (req: Request, res: Response) => {
  const room = ROOMS_DB[CURRENT_ACTIVE_ROOM_CODE];
  if (!room) return res.status(404).json({ error: 'Аудитория не найдена' });
  res.json(room);
});

app.post('/api/classroom/switch', (req: Request, res: Response) => {
  const { new_code } = req.body;
  if (!ROOMS_DB[new_code]) {
    return res.status(400).json({ error: `Аудитория ${new_code} не существует` });
  }

  Object.values(ROOMS_DB).forEach(r => (r.is_active = false));
  CURRENT_ACTIVE_ROOM_CODE = new_code;
  ROOMS_DB[new_code].is_active = true;

  res.json({
    success: true,
    message: `Пара перенесена в кабинет ${new_code}`,
    classroom: ROOMS_DB[new_code]
  });
});

app.post('/api/attendance/check-in', (req: Request, res: Response) => {
  const { student_id, classroom_code, latitude, longitude, method, token }: AttendanceRequest = req.body;
  const room = ROOMS_DB[classroom_code];
  if (!room) return res.status(404).json({ error: 'Аудитория не найдена' });

  const distance = calculateHaversineDistance(latitude, longitude, room.latitude, room.longitude);
  const withinRadius = distance <= room.allowed_radius_meters;
  const tokenValid = method === 'NFC' ? token === room.nfc_tag_uid : token === room.qr_code_token || token.includes('ROOM');

  const timestamp = new Date().toLocaleTimeString('ru-RU');

  if (!withinRadius) {
    return res.json({
      success: false,
      message: `Ошибка геозоны: вы на расстоянии ${distance}м от ауд. ${room.code} (лимит: ${room.allowed_radius_meters}м)`,
      distance_meters: distance,
      timestamp,
      classroom: room.code
    });
  }

  if (!tokenValid) {
    return res.json({
      success: false,
      message: 'Неверный NFC токен или просроченный QR код',
      distance_meters: distance,
      timestamp,
      classroom: room.code
    });
  }

  const record = {
    student_id,
    classroom: room.code,
    method,
    distance_meters: distance,
    timestamp,
    status: 'ATTENDED'
  };
  ATTENDANCE_LOG.push(record);

  res.json({
    success: true,
    message: `Присутствие подтверждено! Метод: ${method}. Дистанция: ${distance}м.`,
    distance_meters: distance,
    timestamp,
    classroom: room.code
  });
});

app.get('/api/syllabus/wiki-summary', async (req: Request, res: Response) => {
  const query = (req.query.query as string) || 'Компьютер';
  try {
    const url = `https://ru.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&utf8=1&srlimit=3&origin=*`;
    const response = await fetch(url);
    const data = await response.json();
    const articles = ((data as any)?.query?.search || []).map((item: any) => ({
      title: item.title,
      snippet: item.snippet.replace(/<[^>]+>/g, ''),
      url: `https://ru.wikipedia.org/wiki/${encodeURIComponent(item.title.replace(/ /g, '_'))}`
    }));
    res.json({ query, found_count: articles.length, articles });
  } catch {
    res.json({
      query,
      found_count: 1,
      articles: [{
        title: query,
        snippet: 'Справочные конспекты силлабуса для подготовки к рубежному контролю.',
        url: `https://ru.wikipedia.org/`
      }]
    });
  }
});

app.listen(PORT, () => {
  console.log(`[Arc Edu Full API] Running on http://127.0.0.1:${PORT}`);
});
