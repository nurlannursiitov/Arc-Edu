import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Student Profile Interface
export interface StudentProfile {
  id: string;
  name: string;
  student_id: string;
  group: string;
  faculty: string;
  specialty: string;
  course_year: number;
  gpa: number;
}

const CURRENT_STUDENT: StudentProfile = {
  id: 'arc-001',
  name: 'Нурсиитов Нурлан',
  student_id: '230107042',
  group: 'ВТИП-23-2к',
  faculty: 'Информационные технологии',
  specialty: '6B06101 Software Engineering',
  course_year: 2,
  gpa: 3.87
};

// Day 1 Base Routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    project: 'Arc Edu',
    status: 'in_development',
    author: 'Нурсиитов Нурлан',
    stack: '100% TypeScript (Node.js + Express & React Native Expo)',
    version: '0.1.0-alpha',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/student/me', (req: Request, res: Response) => {
  res.json(CURRENT_STUDENT);
});

app.listen(PORT, () => {
  console.log(`[Arc Edu API] Server running on http://127.0.0.1:${PORT}`);
});
