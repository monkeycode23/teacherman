import { Classroom } from '../types/general';
import { Users, BookOpen, CheckCircle, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface DashboardProps {
  
}

export function Dashboard() {

  const classrooms:any =[]
  
  

  const totalStudents = classrooms.reduce((acc, c) => acc + c.students.length, 0);
  const totalAssignments = classrooms.reduce((acc, c) => acc + c.assignments.length, 0);
  const totalTopics = classrooms.reduce((acc, c) => acc + c.topics.length, 0);

  const pendingSubmissions = classrooms.reduce((acc, c) => {
    return acc + c.assignments.reduce((aAcc, a) => {
      return aAcc + a.submissions.filter(s => s.status === 'pending').length;
    }, 0);
  }, 0);

  // Datos para gráfico de rendimiento por aula
  const classroomPerformance = classrooms.map(c => ({
    name: c.name,
    promedio: c.students.length > 0
      ? Math.round(c.students.reduce((acc, s) => acc + s.averageGrade, 0) / c.students.length)
      : 0,
    asistencia: c.students.length > 0
      ? Math.round(c.students.reduce((acc, s) => acc + s.attendance, 0) / c.students.length)
      : 0,
  }));

  // Datos para gráfico de actividad
  const activityData = [
    { mes: 'Sep', tareas: 12, topicos: 8 },
    { mes: 'Oct', tareas: 18, topicos: 12 },
    { mes: 'Nov', tareas: 15, topicos: 10 },
    { mes: 'Dic', tareas: 10, topicos: 6 },
  ];

  // Datos para distribución de estudiantes
  const studentDistribution = classrooms.map(c => ({
    name: c.name,
    value: c.students.length,
  }));

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Resumen general de tus actividades educativas</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Aulas Activas</p>
              <p className="text-gray-900 mt-2">{classrooms.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Estudiantes</p>
              <p className="text-gray-900 mt-2">{totalStudents}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Tareas Asignadas</p>
              <p className="text-gray-900 mt-2">{totalAssignments}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Entregas Pendientes</p>
              <p className="text-gray-900 mt-2">{pendingSubmissions}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Rendimiento por Aula */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Rendimiento por Aula</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={classroomPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="promedio" fill="#3B82F6" name="Promedio" />
              <Bar dataKey="asistencia" fill="#10B981" name="Asistencia %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Actividad Mensual */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Actividad Mensual</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="tareas" stroke="#3B82F6" name="Tareas" strokeWidth={2} />
              <Line type="monotone" dataKey="topicos" stroke="#10B981" name="Tópicos" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Segunda fila de gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Distribución de Estudiantes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Distribución de Estudiantes</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={studentDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {studentDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Actividad Reciente */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
          <h3 className="text-gray-900 mb-4">Actividad Reciente</h3>
          <div className="space-y-4">
            {classrooms.slice(0, 3).map(classroom => {
              const recentComments = classroom.topics.flatMap(t => t.comments).slice(0, 2);
              
              return (
                <div key={classroom.id}>
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: classroom.color }}
                    />
                    <p className="text-gray-700">{classroom.name}</p>
                  </div>
                  {recentComments.length > 0 ? (
                    <div className="ml-5 space-y-2">
                      {recentComments.map(comment => (
                        <div key={comment.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <img
                            src={comment.studentAvatar}
                            alt={comment.studentName}
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-700">
                              <span>{comment.studentName}</span> comentó
                            </p>
                            <p className="text-sm text-gray-600 truncate">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="ml-5 text-sm text-gray-500">Sin actividad reciente</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mis Aulas - Vista Rápida */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Mis Aulas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classrooms.map(classroom => (
            <button
              key={classroom.id}
              onClick={() => }
              className="text-left p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: classroom.color + '20' }}
                >
                  <BookOpen className="w-6 h-6" style={{ color: classroom.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-gray-900 truncate">{classroom.name}</h4>
                  <p className="text-sm text-gray-600">{classroom.subject}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-gray-900">{classroom.students.length}</p>
                  <p className="text-xs text-gray-600">Estudiantes</p>
                </div>
                <div>
                  <p className="text-gray-900">{classroom.topics.length}</p>
                  <p className="text-xs text-gray-600">Temas</p>
                </div>
                <div>
                  <p className="text-gray-900">{classroom.assignments.length}</p>
                  <p className="text-xs text-gray-600">Tareas</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
