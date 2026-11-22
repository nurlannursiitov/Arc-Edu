import express, { Request, Response } from 'express';
import cors from 'cors';
import { StudentProfile } from './types.js';
import { FREEDOM_PERKS, SYLLABUS_DB } from './data/mockData.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

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

// Base info
app.get('/', (req: Request, res: Response) => {
  res.json({
    project: 'Arc Edu',
    status: 'in_development',
    team: ['Нурсиитов Нурлан', 'Жұмабек Қуаныш', 'Асқар Заңғар'],
    stack: '100% TypeScript (Node.js + Express & React Native Expo)',
    version: '0.1.2-alpha',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/student/me', (req: Request, res: Response) => {
  res.json(CURRENT_STUDENT);
});

// Partner perks (Freedom ecosystem)
app.get('/api/discounts', (req: Request, res: Response) => {
  res.json(FREEDOM_PERKS);
});

// Syllabus topics
app.get('/api/syllabus/topics', (req: Request, res: Response) => {
  res.json(SYLLABUS_DB);
});

app.listen(PORT, () => {
  console.log(`[Arc Edu API] Server running on http://127.0.0.1:${PORT}`);
});
