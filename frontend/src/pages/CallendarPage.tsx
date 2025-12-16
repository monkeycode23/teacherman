import React,{useState} from 'react'
import { Classroom } from '../types/general';

export default function CallendarPage() {

     const [classrooms, setClassrooms] = useState<Classroom[]>([
        {
          id: '1',
          name: 'Matemáticas Avanzadas',
          subject: 'Matemáticas',
          color: '#3B82F6',
          schedule: [
            { day: 'Lunes', time: '08:00 - 10:00' },
            { day: 'Miércoles', time: '08:00 - 10:00' },
          ],
          students: [
            {
              id: 's1',
              name: 'Ana García',
              email: 'ana@example.com',
              avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
              enrollmentDate: '2024-09-01',
              attendance: 95,
              averageGrade: 88,
            },
            {
              id: 's2',
              name: 'Carlos Ruiz',
              email: 'carlos@example.com',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
              enrollmentDate: '2024-09-01',
              attendance: 92,
              averageGrade: 85,
            },
            {
              id: 's3',
              name: 'María López',
              email: 'maria@example.com',
              avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
              enrollmentDate: '2024-09-01',
              attendance: 98,
              averageGrade: 92,
            },
          ],
          topics: [
            {
              id: 't1',
              title: 'Cálculo Diferencial',
              description: 'Introducción a los conceptos fundamentales del cálculo diferencial',
              createdAt: '2024-11-01',
              materials: [
                {
                  id: 'm1',
                  type: 'file',
                  title: 'Guía de Derivadas.pdf',
                  url: '#',
                  uploadedAt: '2024-11-01',
                },
                {
                  id: 'm2',
                  type: 'video',
                  title: 'Clase 1: Límites',
                  url: '#',
                  thumbnail: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&h=225&fit=crop',
                  uploadedAt: '2024-11-02',
                },
              ],
              comments: [
                {
                  id: 'c1',
                  studentName: 'Ana García',
                  studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
                  content: '¿Podría explicar más sobre la regla de la cadena?',
                  timestamp: '2024-11-15T10:30:00',
                  replies: [],
                },
              ],
              quizzes: [
                {
                  id: 'q1',
                  title: 'Quiz de Derivadas',
                  description: 'Prueba tus conocimientos sobre derivadas',
                  questions: [
                    {
                      id: 'qq1',
                      question: '¿Cuál es la derivada de x^2?',
                      options: ['2x', 'x', 'x^2', '1'],
                      correctAnswer: 0,
                      explanation: 'La derivada de x^2 es 2x.',
                    },
                  ],
                  createdAt: '2024-11-01',
                },
              ],
              events: [
                {
                  id: 'e1',
                  title: 'Examen de Cálculo Diferencial',
                  description: 'Examen sobre los conceptos de cálculo diferencial',
                  date: '2024-12-15',
                  type: 'exam',
                },
              ],
            },
            {
              id: 't2',
              title: 'Integrales',
              description: 'Métodos de integración y aplicaciones',
              createdAt: '2024-11-15',
              materials: [],
              comments: [],
              quizzes: [],
              events: [],
            },
          ],
          assignments: [
            {
              id: 'a1',
              title: 'Ejercicios de Derivadas',
              description: 'Resolver los problemas 1-20 del capítulo 3',
              dueDate: '2024-12-20',
              maxScore: 100,
              submissions: [
                { studentId: 's1', submittedAt: '2024-12-10', score: 88, status: 'graded' },
                { studentId: 's2', submittedAt: '2024-12-12', score: 85, status: 'graded' },
                { studentId: 's3', status: 'pending' },
              ],
            },
          ],
        },
        {
          id: '2',
          name: 'Historia Universal',
          subject: 'Historia',
          color: '#10B981',
          schedule: [
            { day: 'Martes', time: '10:00 - 12:00' },
            { day: 'Jueves', time: '10:00 - 12:00' },
          ],
          students: [
            {
              id: 's4',
              name: 'Pedro Sánchez',
              email: 'pedro@example.com',
              avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
              enrollmentDate: '2024-09-01',
              attendance: 90,
              averageGrade: 78,
            },
          ],
          topics: [],
          assignments: [],
        },
      ]);
  return (<>
   <div className="p-8">
            <h2 className="mb-6">Calendario de Clases</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="grid grid-cols-7 gap-4">
                {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
                  <div key={day} className="text-center text-gray-600">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const dayClasses = classrooms.flatMap(c =>
                    c.schedule.filter(s => {
                      const dayMap: { [key: string]: number } = {
                        'Lunes': 0, 'Martes': 1, 'Miércoles': 2, 'Jueves': 3, 'Viernes': 4, 'Sábado': 5, 'Domingo': 6
                      };
                      return dayMap[s.day] === i % 7;
                    }).map(s => ({ ...s, classroom: c }))
                  );
                  
                  return (
                    <div key={i} className="aspect-square border border-gray-200 rounded-lg p-2 hover:bg-gray-50">
                      <div className="text-gray-400 text-sm">{i + 1}</div>
                      <div className="mt-1 space-y-1">
                        {dayClasses.map((dc, idx) => (
                          <div
                            key={idx}
                            className="text-xs p-1 rounded truncate"
                            style={{ backgroundColor: dc.classroom.color + '20', color: dc.classroom.color }}
                          >
                            {dc.classroom.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
  </>)
}
