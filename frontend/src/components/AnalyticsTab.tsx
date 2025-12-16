import { Classroom } from '../App';
import { TrendingUp, TrendingDown, Users, Award, Calendar, BookOpen } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface AnalyticsTabProps {
  classroom: Classroom;
}

export function AnalyticsTab({ classroom }: AnalyticsTabProps) {
  const avgGrade = classroom.students.length > 0
    ? Math.round(classroom.students.reduce((acc, s) => acc + s.averageGrade, 0) / classroom.students.length)
    : 0;

  const avgAttendance = classroom.students.length > 0
    ? Math.round(classroom.students.reduce((acc, s) => acc + s.attendance, 0) / classroom.students.length)
    : 0;

  const totalAssignments = classroom.assignments.length;
  const completionRate = classroom.assignments.length > 0
    ? Math.round(
        (classroom.assignments.reduce((acc, a) => {
          const graded = a.submissions.filter(s => s.status === 'graded').length;
          return acc + (graded / a.submissions.length);
        }, 0) / classroom.assignments.length) * 100
      )
    : 0;

  // Datos para gráfico de rendimiento por estudiante
  const studentPerformance = classroom.students.map(student => ({
    name: student.name.split(' ')[0],
    promedio: student.averageGrade,
    asistencia: student.attendance,
  }));

  // Datos para gráfico de tendencia de calificaciones
  const gradeTrend = [
    { semana: 'Sem 1', promedio: avgGrade - 10 },
    { semana: 'Sem 2', promedio: avgGrade - 5 },
    { semana: 'Sem 3', promedio: avgGrade - 2 },
    { semana: 'Sem 4', promedio: avgGrade },
  ];

  // Datos para gráfico de radar
  const classroomMetrics = [
    { metric: 'Participación', value: avgAttendance },
    { metric: 'Rendimiento', value: avgGrade },
    { metric: 'Entregas', value: completionRate },
    { metric: 'Asistencia', value: avgAttendance },
    { metric: 'Progreso', value: avgGrade },
  ];

  // Estudiantes destacados
  const topStudents = [...classroom.students]
    .sort((a, b) => b.averageGrade - a.averageGrade)
    .slice(0, 3);

  // Estudiantes que necesitan apoyo
  const needsSupport = [...classroom.students]
    .filter(s => s.averageGrade < 70 || s.attendance < 80)
    .slice(0, 3);

  return (
    <div>
      <h2 className="text-gray-900 mb-6">Estadísticas del Aula</h2>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Promedio General</p>
              <p className="text-gray-900 mt-2">{avgGrade}</p>
              <div className="flex items-center gap-1 mt-1 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>+5% vs anterior</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Asistencia Promedio</p>
              <p className="text-gray-900 mt-2">{avgAttendance}%</p>
              <div className="flex items-center gap-1 mt-1 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>+2% vs anterior</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Tasa de Entrega</p>
              <p className="text-gray-900 mt-2">{completionRate}%</p>
              <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                <TrendingDown className="w-4 h-4" />
                <span>-3% vs anterior</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Estudiantes Activos</p>
              <p className="text-gray-900 mt-2">{classroom.students.length}</p>
              <div className="flex items-center gap-1 mt-1 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>+2 nuevos</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Rendimiento por Estudiante */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Rendimiento por Estudiante</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={studentPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="promedio" fill="#3B82F6" name="Promedio" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tendencia de Calificaciones */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Tendencia de Calificaciones</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={gradeTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="semana" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="promedio" stroke="#10B981" strokeWidth={3} name="Promedio" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Métricas del Aula */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Métricas Generales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={classroomMetrics}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis />
              <Radar name="Aula" dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Estudiantes Destacados */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Estudiantes Destacados</h3>
          <div className="space-y-4">
            {topStudents.map((student, index) => (
              <div key={student.id} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600">{index + 1}</span>
                </div>
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 truncate">{student.name}</p>
                  <p className="text-sm text-gray-600">Promedio: {student.averageGrade}</p>
                </div>
                <Award className="w-5 h-5 text-yellow-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Estudiantes que Necesitan Apoyo */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Requieren Atención</h3>
          {needsSupport.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-green-600">¡Todos los estudiantes están al día!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {needsSupport.map((student) => (
                <div key={student.id} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 truncate">{student.name}</p>
                    <div className="flex gap-3 text-sm text-gray-600 mt-1">
                      {student.averageGrade < 70 && (
                        <span className="text-red-600">Bajo rendimiento</span>
                      )}
                      {student.attendance < 80 && (
                        <span className="text-orange-600">Baja asistencia</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Distribución de Calificaciones */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Distribución de Calificaciones</h3>
        <div className="grid grid-cols-5 gap-4">
          {[
            { range: '90-100', label: 'Excelente', color: 'bg-green-500', count: classroom.students.filter(s => s.averageGrade >= 90).length },
            { range: '80-89', label: 'Bueno', color: 'bg-blue-500', count: classroom.students.filter(s => s.averageGrade >= 80 && s.averageGrade < 90).length },
            { range: '70-79', label: 'Regular', color: 'bg-yellow-500', count: classroom.students.filter(s => s.averageGrade >= 70 && s.averageGrade < 80).length },
            { range: '60-69', label: 'Suficiente', color: 'bg-orange-500', count: classroom.students.filter(s => s.averageGrade >= 60 && s.averageGrade < 70).length },
            { range: '0-59', label: 'Insuficiente', color: 'bg-red-500', count: classroom.students.filter(s => s.averageGrade < 60).length },
          ].map((grade) => (
            <div key={grade.range} className="text-center">
              <div className={`${grade.color} h-32 rounded-lg mb-2 flex items-end justify-center pb-2 text-white`}>
                <span>{grade.count}</span>
              </div>
              <p className="text-sm text-gray-900">{grade.label}</p>
              <p className="text-xs text-gray-600">{grade.range}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
