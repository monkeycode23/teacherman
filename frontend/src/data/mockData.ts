// Mock data para simular datos del backend

export interface Topic {
  id: string;
  name: string;
  progress: number;
  totalResources: number;
  completedResources: number;
}

export interface Resource {
  id: string;
  topicId: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'document';
  url: string;
  completed: boolean;
  uploadedAt: string;
}

export interface Quiz {
  id: string;
  topicId: string;
  title: string;
  questions: QuizQuestion[];
  totalPoints: number;
  timeLimit?: number;
  dueDate?: string;
  completed: boolean;
  score?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

export interface Task {
  id: string;
  topicId: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  points: number;
  submittedAt?: string;
  grade?: number;
}

export interface QAItem {
  id: string;
  topicId: string;
  question: string;
  answer?: string;
  askedBy: string;
  askedAt: string;
  answeredAt?: string;
  upvotes: number;
}

export interface Event {
  id: string;
  topicId?: string;
  title: string;
  type: 'exam' | 'oral-test' | 'task' | 'class' | 'other';
  date: string;
  time: string;
  description: string;
}

export interface Student {
  id: string;
  name: string;
  code: string;
  avatar?: string;
  classroomId: string;
}

export interface Classroom {
  id: string;
  name: string;
  teacher: string;
  subject: string;
  topics: Topic[];
}

// Datos mock
export const mockStudent: Student = {
  id: '1',
  name: 'Ana García',
  code: '1234',
  classroomId: 'math-101'
};

export const mockClassroom: Classroom = {
  id: 'math-101',
  name: 'Matemáticas Avanzadas',
  teacher: 'Prof. Carlos Mendoza',
  subject: 'Matemáticas',
  topics: [
    { id: 'calc', name: 'Cálculo', progress: 75, totalResources: 12, completedResources: 9 },
    { id: 'algebra', name: 'Álgebra Lineal', progress: 60, totalResources: 10, completedResources: 6 },
    { id: 'geo', name: 'Geometría Analítica', progress: 40, totalResources: 8, completedResources: 3 },
    { id: 'stats', name: 'Estadística', progress: 90, totalResources: 15, completedResources: 13 },
    { id: 'trig', name: 'Trigonometría', progress: 55, totalResources: 9, completedResources: 5 }
  ]
};

export const mockResources: Resource[] = [
  {
    id: 'r1',
    topicId: 'calc',
    title: 'Introducción a Derivadas',
    type: 'pdf',
    url: '#',
    completed: true,
    uploadedAt: '2024-12-01'
  },
  {
    id: 'r2',
    topicId: 'calc',
    title: 'Video: Regla de la Cadena',
    type: 'video',
    url: '#',
    completed: true,
    uploadedAt: '2024-12-02'
  },
  {
    id: 'r3',
    topicId: 'calc',
    title: 'Ejercicios de Integrales',
    type: 'document',
    url: '#',
    completed: false,
    uploadedAt: '2024-12-10'
  },
  {
    id: 'r4',
    topicId: 'algebra',
    title: 'Matrices y Determinantes',
    type: 'pdf',
    url: '#',
    completed: true,
    uploadedAt: '2024-12-03'
  },
  {
    id: 'r5',
    topicId: 'algebra',
    title: 'Sistemas de Ecuaciones',
    type: 'video',
    url: '#',
    completed: false,
    uploadedAt: '2024-12-05'
  },
  {
    id: 'r6',
    topicId: 'stats',
    title: 'Distribuciones de Probabilidad',
    type: 'pdf',
    url: '#',
    completed: true,
    uploadedAt: '2024-11-28'
  }
];

export const mockQuizzes: Quiz[] = [
  {
    id: 'q1',
    topicId: 'calc',
    title: 'Quiz: Derivadas Básicas',
    totalPoints: 100,
    timeLimit: 30,
    dueDate: '2024-12-20',
    completed: true,
    score: 85,
    questions: [
      {
        id: 'q1-1',
        question: '¿Cuál es la derivada de x²?',
        options: ['x', '2x', 'x²', '2'],
        correctAnswer: 1,
        points: 25
      },
      {
        id: 'q1-2',
        question: 'La derivada de una constante es:',
        options: ['1', '0', 'La misma constante', 'Indefinida'],
        correctAnswer: 1,
        points: 25
      }
    ]
  },
  {
    id: 'q2',
    topicId: 'calc',
    title: 'Quiz: Integrales',
    totalPoints: 100,
    timeLimit: 45,
    dueDate: '2024-12-25',
    completed: false,
    questions: [
      {
        id: 'q2-1',
        question: '∫x dx = ?',
        options: ['x²/2 + C', 'x + C', '2x + C', 'x²'],
        correctAnswer: 0,
        points: 50
      }
    ]
  },
  {
    id: 'q3',
    topicId: 'algebra',
    title: 'Quiz: Matrices',
    totalPoints: 80,
    dueDate: '2024-12-22',
    completed: false,
    questions: []
  }
];

export const mockTasks: Task[] = [
  {
    id: 't1',
    topicId: 'calc',
    title: 'Resolver 20 ejercicios de derivadas',
    description: 'Completar la hoja de trabajo del libro páginas 45-48',
    dueDate: '2024-12-18',
    status: 'completed',
    points: 50,
    submittedAt: '2024-12-17',
    grade: 47
  },
  {
    id: 't2',
    topicId: 'calc',
    title: 'Proyecto Final: Aplicaciones de Integrales',
    description: 'Investigar y presentar 3 aplicaciones reales del cálculo integral',
    dueDate: '2024-12-30',
    status: 'in-progress',
    points: 100
  },
  {
    id: 't3',
    topicId: 'algebra',
    title: 'Práctica de Sistemas de Ecuaciones',
    description: 'Resolver sistemas usando método de Gauss',
    dueDate: '2024-12-16',
    status: 'overdue',
    points: 40
  },
  {
    id: 't4',
    topicId: 'stats',
    title: 'Análisis de datos estadísticos',
    description: 'Recolectar datos y crear gráficos',
    dueDate: '2024-12-28',
    status: 'pending',
    points: 60
  }
];

export const mockQA: QAItem[] = [
  {
    id: 'qa1',
    topicId: 'calc',
    question: '¿Cómo saber cuándo usar la regla de la cadena?',
    answer: 'La regla de la cadena se usa cuando tienes una función compuesta, es decir, una función dentro de otra. Por ejemplo, en f(g(x)).',
    askedBy: 'Ana García',
    askedAt: '2024-12-10T10:30:00',
    answeredAt: '2024-12-10T14:20:00',
    upvotes: 5
  },
  {
    id: 'qa2',
    topicId: 'calc',
    question: '¿Cuál es la diferencia entre derivada e integral?',
    answer: 'La derivada mide la tasa de cambio instantánea, mientras que la integral calcula el área bajo la curva. Son operaciones inversas.',
    askedBy: 'Carlos López',
    askedAt: '2024-12-11T09:15:00',
    answeredAt: '2024-12-11T16:45:00',
    upvotes: 8
  },
  {
    id: 'qa3',
    topicId: 'algebra',
    question: '¿Cómo multiplicar matrices de diferentes dimensiones?',
    askedBy: 'María Rodríguez',
    askedAt: '2024-12-14T11:00:00',
    upvotes: 3
  }
];

export const mockEvents: Event[] = [
  {
    id: 'e1',
    topicId: 'calc',
    title: 'Examen de Derivadas e Integrales',
    type: 'exam',
    date: '2024-12-20',
    time: '10:00',
    description: 'Examen parcial cubriendo todo el temario de cálculo'
  },
  {
    id: 'e2',
    topicId: 'algebra',
    title: 'Lección Oral: Matrices',
    type: 'oral-test',
    date: '2024-12-19',
    time: '14:00',
    description: 'Presentación individual sobre operaciones con matrices'
  },
  {
    id: 'e3',
    topicId: 'calc',
    title: 'Entrega Proyecto Final',
    type: 'task',
    date: '2024-12-30',
    time: '23:59',
    description: 'Fecha límite para entregar el proyecto de aplicaciones de integrales'
  },
  {
    id: 'e4',
    title: 'Clase de Repaso General',
    type: 'class',
    date: '2024-12-17',
    time: '15:00',
    description: 'Repaso de todos los temas antes de los exámenes finales'
  },
  {
    id: 'e5',
    topicId: 'stats',
    title: 'Examen Final de Estadística',
    type: 'exam',
    date: '2024-12-27',
    time: '09:00',
    description: 'Examen final del semestre'
  }
];

export const mockStudentStats = {
  overallProgress: 68,
  averageGrade: 87,
  completedTasks: 12,
  pendingTasks: 8,
  completedQuizzes: 5,
  pendingQuizzes: 3,
  upcomingEvents: 4,
  totalPoints: 875,
  maxPoints: 1000,
  weeklyActivity: [
    { day: 'Lun', hours: 2.5 },
    { day: 'Mar', hours: 3 },
    { day: 'Mie', hours: 1.5 },
    { day: 'Jue', hours: 4 },
    { day: 'Vie', hours: 2 },
    { day: 'Sab', hours: 3.5 },
    { day: 'Dom', hours: 1 }
  ],
  topicScores: [
    { topic: 'Cálculo', score: 85 },
    { topic: 'Álgebra', score: 78 },
    { topic: 'Geometría', score: 82 },
    { topic: 'Estadística', score: 92 },
    { topic: 'Trigonometría', score: 80 }
  ]
};


