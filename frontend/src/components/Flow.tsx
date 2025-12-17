import { useState } from 'react';
import {
  ArrowLeft,
  Plus,
  Check,
  X,
  GripVertical,
  BookOpen,
  PenTool,
  Mic,
  MoreHorizontal,
  Trash2,
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { Session, Student, Activity } from '../types/general';

interface SessionFlowProps {
  session: Session;
  students: Student[];
  onUpdateSession: (session: Session) => void;
  onBack: () => void;
}

const activityIcons = {
  attendance: Check,
  reading: BookOpen,
  exercises: PenTool,
  oral_lesson: Mic,
  custom: MoreHorizontal,
};

const activityTypeLabels = {
  attendance: 'Asistencia',
  reading: 'Lectura del Libro',
  exercises: 'Resolver Ejercicios',
  oral_lesson: 'Lección Oral',
  custom: 'Actividad Personalizada',
};

export function SessionFlow({ session, students, onUpdateSession, onBack }: SessionFlowProps) {
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);
  const [newActivityType, setNewActivityType] = useState<Activity['type']>('reading');
  const [newActivityTitle, setNewActivityTitle] = useState('');
  const [expandedActivity, setExpandedActivity] = useState<string>('1'); // Start with attendance expanded

  const handleToggleAttendance = (studentId: string) => {
    const updatedSession = {
      ...session,
      attendance: {
        ...session.attendance,
        [studentId]: !session.attendance[studentId],
      },
    };
    onUpdateSession(updatedSession);
  };

  const handleToggleActivityComplete = (activityId: string) => {
    const updatedActivities = session.activities.map(activity =>
      activity.id === activityId
        ? { ...activity, completed: !activity.completed }
        : activity
    );
    onUpdateSession({
      ...session,
      activities: updatedActivities,
    });
  };

  const handleAddActivity = () => {
    if (newActivityType === 'custom' && !newActivityTitle.trim()) return;

    const title = newActivityType === 'custom' 
      ? newActivityTitle 
      : activityTypeLabels[newActivityType];

    const newActivity: Activity = {
      id: Date.now().toString(),
      type: newActivityType,
      title,
      completed: false,
      order: session.activities.length,
    };

    onUpdateSession({
      ...session,
      activities: [...session.activities, newActivity],
    });

    setIsAddActivityOpen(false);
    setNewActivityType('reading');
    setNewActivityTitle('');
  };

  const handleDeleteActivity = (activityId: string) => {
    // Cannot delete attendance activity
    if (activityId === '1') return;

    const updatedActivities = session.activities
      .filter(a => a.id !== activityId)
      .map((a, index) => ({ ...a, order: index }));

    onUpdateSession({
      ...session,
      activities: updatedActivities,
    });
  };

  const presentCount = Object.values(session.attendance).filter(Boolean).length;
  const totalStudents = students.length;
  const completedActivities = session.activities.filter(a => a.completed).length;
  const totalActivities = session.activities.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button onClick={onBack} variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Sesiones
          </Button>
        </div>
      </div>

      {/* Session Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{session.courseName}</CardTitle>
              <p className="text-gray-600 mt-1">
                {session.date.toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Progreso</div>
              <div className="text-2xl">
                {completedActivities} / {totalActivities}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Activities Flow */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl">Flujo de la Clase</h2>
          <Dialog open={isAddActivityOpen} onOpenChange={setIsAddActivityOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Agregar Actividad
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar Nueva Actividad</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="activity-type">Tipo de Actividad</Label>
                  <Select
                    value={newActivityType}
                    onValueChange={(value) => setNewActivityType(value as Activity['type'])}
                  >
                    <SelectTrigger id="activity-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reading">Lectura del Libro</SelectItem>
                      <SelectItem value="exercises">Resolver Ejercicios</SelectItem>
                      <SelectItem value="oral_lesson">Lección Oral</SelectItem>
                      <SelectItem value="custom">Actividad Personalizada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {newActivityType === 'custom' && (
                  <div>
                    <Label htmlFor="activity-title">Título de la Actividad</Label>
                    <Input
                      id="activity-title"
                      placeholder="Ej: Trabajo en grupos"
                      value={newActivityTitle}
                      onChange={(e) => setNewActivityTitle(e.target.value)}
                    />
                  </div>
                )}

                <Button onClick={handleAddActivity} className="w-full">
                  Agregar Actividad
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {session.activities.map((activity, index) => {
          const Icon = activityIcons[activity.type];
          const isExpanded = expandedActivity === activity.id;
          const isAttendance = activity.type === 'attendance';

          return (
            <Card key={activity.id} className={activity.completed ? 'bg-green-50' : ''}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex items-center space-x-2">
                      <GripVertical className="w-4 h-4 text-gray-400" />
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.completed
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {index + 1}
                      </div>
                    </div>

                    <Icon className="w-5 h-5 text-gray-600" />

                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-base">{activity.title}</CardTitle>
                        {activity.completed && (
                          <Check className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                      {isAttendance && (
                        <p className="text-sm text-gray-600 mt-1">
                          {presentCount} / {totalStudents} estudiantes presentes
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {!isAttendance && (
                      <Button
                        onClick={() => handleDeleteActivity(activity.id)}
                        variant="ghost"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    )}
                    <Button
                      onClick={() => setExpandedActivity(isExpanded ? '' : activity.id)}
                      variant="outline"
                    >
                      {isExpanded ? 'Ocultar' : 'Expandir'}
                    </Button>
                    <Button
                      onClick={() => handleToggleActivityComplete(activity.id)}
                      variant={activity.completed ? 'secondary' : 'default'}
                    >
                      {activity.completed ? 'Marcar Incompleta' : 'Marcar Completa'}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {isExpanded && isAttendance && (
                <CardContent>
                  <div className="space-y-3">
                    <h3 className="text-sm">Lista de Estudiantes</h3>
                    <div className="grid gap-2">
                      {students.map(student => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between p-3 bg-white rounded-lg border"
                        >
                          <span>{student.name}</span>
                          <div className="flex items-center space-x-2">
                            {session.attendance[student.id] ? (
                              <>
                                <span className="text-sm text-green-600">Presente</span>
                                <Button
                                  onClick={() => handleToggleAttendance(student.id)}
                                  variant="outline"
                                  size="sm"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </>
                            ) : (
                              <>
                                <span className="text-sm text-red-600">Ausente</span>
                                <Button
                                  onClick={() => handleToggleAttendance(student.id)}
                                  variant="outline"
                                  size="sm"
                                >
                                  <Check className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              )}

              {isExpanded && !isAttendance && (
                <CardContent>
                  <div className="text-sm text-gray-600">
                    <p>Detalles de la actividad aparecerán aquí.</p>
                    <p className="mt-2">Puedes expandir esta sección para agregar más funcionalidad específica para cada tipo de actividad.</p>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
