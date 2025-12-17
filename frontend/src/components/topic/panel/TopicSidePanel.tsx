import { useEffect, useState } from 'react';
import { Topic, Material, Comment, Quiz, QuizQuestion, TopicEvent } from "../../../types/general"
import { X, FileText, Image, Video, Link as LinkIcon, Trash2, MessageCircle, Send, Plus, Play, Calendar as CalendarIcon, CheckCircle, XCircle } from 'lucide-react';
import Resources from './tabs/Resources';
import { useTopicsStore } from '../../../store/topics.store';
interface TopicModalProps {
  topic: Topic;
  onClose: () => void;
  onUpdate: (updates: Partial<Topic>) => void;
}

type TabType = 'resources' | 'questions' | 'quizzes' | 'events';

export function TopicSidePanel({topic,onClose}:any) {
  const [activeTab, setActiveTab] = useState<TabType>('resources');
  
 
  const [commentText, setCommentText] = useState('');
  const [addingQuiz, setAddingQuiz] = useState(false);
  const [newQuiz, setNewQuiz] = useState({
    title: '',
    description: '',
    questions: [] as QuizQuestion[],
  });
  const [takingQuiz, setTakingQuiz] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number }>({});
  const [quizResults, setQuizResults] = useState<{ [key: string]: boolean } | null>(null);
  const [addingEvent, setAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    type: 'other' as TopicEvent['type'],
  });


  
  const topicStore = useTopicsStore()

 /*  const topic = topicStore.topic =  {
          id: 't1',
          
          title: 'Cálculo Diferencial',
          description: 'Introducción a los conceptos fundamentales del cálculo diferencial',
          createdAt: '2024-11-01',
          resources: [
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
        }
 */

  useEffect(() => {
    
    
    return () => {
      
    }
  }, [])

   const onUpdate =(a:any)=>{}

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    const comment: Comment = {
      id: Date.now().toString(),
      studentName: 'Profesor',
      studentAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      content: commentText,
      timestamp: new Date().toISOString(),
      replies: [],
    };
    onUpdate({ comments: [...topic.comments, comment] });
    setCommentText('');
  };

  const handleAddQuiz = () => {
    if (newQuiz.questions.length === 0) return;
    const quiz: Quiz = {
      id: Date.now().toString(),
      ...newQuiz,
      createdAt: new Date().toISOString(),
    };
    onUpdate({ quizzes: [...topic.quizzes, quiz] });
    setNewQuiz({ title: '', description: '', questions: [] });
    setAddingQuiz(false);
  };

  const handleSubmitQuiz = (quizId: string) => {
    const quiz = topic.quizzes.find(q => q.id === quizId);
    if (!quiz) return;

    const results: { [key: string]: boolean } = {};
    quiz.questions.forEach(q => {
      results[q.id] = quizAnswers[q.id] === q.correctAnswer;
    });
    setQuizResults(results);
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const event: TopicEvent = {
      id: Date.now().toString(),
      ...newEvent,
    };
    onUpdate({ events: [...topic.events, event] });
    setNewEvent({ title: '', description: '', date: '', type: 'other' });
    setAddingEvent(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    onUpdate({ events: topic.events.filter((e:any) => e.id !== eventId) });
  };


  const getEventTypeColor = (type: TopicEvent['type']) => {
    switch (type) {
      case 'exam':
        return 'bg-red-100 text-red-700';
      case 'deadline':
        return 'bg-orange-100 text-orange-700';
      case 'review':
        return 'bg-blue-100 text-blue-700';
      case 'other':
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getEventTypeLabel = (type: TopicEvent['type']) => {
    switch (type) {
      case 'exam':
        return 'Examen';
      case 'deadline':
        return 'Fecha Límite';
      case 'review':
        return 'Repaso';
      case 'other':
        return 'Otro';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
  {/* Backdrop */}
  <div
    onClick={onClose}
    className="flex-1 bg-black/40"
  />

  {/* Panel */}
  <div className="w-[800px] sm:w-[480px] md:w-[600px] lg:w-[800px] bg-white h-full shadow-xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-start justify-between">
          <div>
            <h2 className="text-gray-900 mb-1 font-bold text-lg">{topic.title}</h2>
            <p className="text-gray-600">{topic.description}</p>
          </div>
          <button
          title='button'
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-4 py-3 border-b-2 transition-colors ${
                activeTab === 'resources'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Recursos ({topic.resources ? topic.resources.length :0})
            </button>
            <button
              onClick={() => setActiveTab('questions')}
              className={`px-4 py-3 border-b-2 transition-colors ${
                activeTab === 'questions'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Preguntas ({topic.resources ? topic.comments.length:0})
            </button>
            <button
              onClick={() => setActiveTab('quizzes')}
              className={`px-4 py-3 border-b-2 transition-colors ${
                activeTab === 'quizzes'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Quizzes ({topic.resources ?topic.quizzes.length:0})
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 py-3 border-b-2 transition-colors ${
                activeTab === 'events'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Eventos ({topic.resources ? topic.events.length:0})
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Resources Tab */}
          {activeTab === 'resources' && (
             <Resources>

            </Resources> 
          )}

          {/* Questions Tab */}
          {activeTab === 'questions' && (
          <></>
          )}

          {/* Quizzes Tab */}
          {activeTab === 'quizzes' && (
          <></> 
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
          <></>
          )}
        </div>
      </div>
    </div>
  );
}
