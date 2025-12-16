import { useState } from 'react';
import { Assignment, Student } from '../App';
import { Plus, Calendar, FileText, CheckCircle, Clock, XCircle, Edit, Trash2 } from 'lucide-react';

interface AssignmentsTabProps {
  assignments: Assignment[];
  students: Student[];
  onUpdateAssignments: (assignments: Assignment[]) => void;
}

export function AssignmentsTab({ assignments, students, onUpdateAssignments }: AssignmentsTabProps) {
  const [showAddAssignment, setShowAddAssignment] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);
  const [gradingStudentId, setGradingStudentId] = useState<string | null>(null);
  const [gradeValue, setGradeValue] = useState('');
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    dueDate: '',
    maxScore: 100,
  });

  const handleAddAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    const assignment: Assignment = {
      id: Date.now().toString(),
      ...newAssignment,
      submissions: students.map(student => ({
        studentId: student.id,
        status: 'pending' as const,
      })),
    };
    onUpdateAssignments([...assignments, assignment]);
    setNewAssignment({ title: '', description: '', dueDate: '', maxScore: 100 });
    setShowAddAssignment(false);
  };

  const handleDeleteAssignment = (assignmentId: string) => {
    onUpdateAssignments(assignments.filter(a => a.id !== assignmentId));
    if (selectedAssignment === assignmentId) {
      setSelectedAssignment(null);
    }
  };

  const handleGradeSubmission = (assignmentId: string, studentId: string) => {
    const score = parseInt(gradeValue);
    if (isNaN(score)) return;

    const updatedAssignments = assignments.map(assignment => {
      if (assignment.id === assignmentId) {
        return {
          ...assignment,
          submissions: assignment.submissions.map(sub => 
            sub.studentId === studentId
              ? { ...sub, score, status: 'graded' as const }
              : sub
          ),
        };
      }
      return assignment;
    });
    onUpdateAssignments(updatedAssignments);
    setGradingStudentId(null);
    setGradeValue('');
  };

  const getStatusColor = (status: Assignment['submissions'][0]['status']) => {
    switch (status) {
      case 'pending':
        return 'text-orange-600 bg-orange-50';
      case 'submitted':
        return 'text-blue-600 bg-blue-50';
      case 'graded':
        return 'text-green-600 bg-green-50';
    }
  };

  const getStatusIcon = (status: Assignment['submissions'][0]['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'submitted':
        return <FileText className="w-4 h-4" />;
      case 'graded':
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: Assignment['submissions'][0]['status']) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'submitted':
        return 'Entregado';
      case 'graded':
        return 'Calificado';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-gray-900">Tareas y Evaluaciones</h2>
        <button
          onClick={() => setShowAddAssignment(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Nueva Tarea
        </button>
      </div>

      {assignments.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">No hay tareas creadas</h3>
          <p className="text-gray-600 mb-4">Crea la primera tarea para tus estudiantes</p>
          <button
            onClick={() => setShowAddAssignment(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Crear Primera Tarea
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Assignments List */}
          <div className="lg:col-span-1 space-y-4">
            {assignments.map(assignment => {
              const pending = assignment.submissions.filter(s => s.status === 'pending').length;
              const submitted = assignment.submissions.filter(s => s.status === 'submitted').length;
              const graded = assignment.submissions.filter(s => s.status === 'graded').length;
              const isOverdue = new Date(assignment.dueDate) < new Date();

              return (
                <div
                  key={assignment.id}
                  onClick={() => setSelectedAssignment(assignment.id)}
                  className={`bg-white rounded-lg shadow-sm border-2 p-4 cursor-pointer transition-all ${
                    selectedAssignment === assignment.id
                      ? 'border-blue-500'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 mb-1 truncate">{assignment.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(assignment.dueDate).toLocaleDateString()}</span>
                        {isOverdue && (
                          <span className="text-red-600">(Vencida)</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAssignment(assignment.id);
                      }}
                      className="p-1 hover:bg-red-50 rounded text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div className="p-2 bg-orange-50 rounded">
                      <p className="text-orange-900">{pending}</p>
                      <p className="text-xs text-orange-600">Pendiente</p>
                    </div>
                    <div className="p-2 bg-blue-50 rounded">
                      <p className="text-blue-900">{submitted}</p>
                      <p className="text-xs text-blue-600">Entregado</p>
                    </div>
                    <div className="p-2 bg-green-50 rounded">
                      <p className="text-green-900">{graded}</p>
                      <p className="text-xs text-green-600">Calificado</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Assignment Detail */}
          <div className="lg:col-span-2">
            {selectedAssignment ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {(() => {
                  const assignment = assignments.find(a => a.id === selectedAssignment)!;
                  return (
                    <>
                      <div className="mb-6 pb-6 border-b border-gray-200">
                        <h3 className="text-gray-900 mb-2">{assignment.title}</h3>
                        <p className="text-gray-600 mb-4">{assignment.description}</p>
                        <div className="flex gap-6 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>Fecha límite: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <FileText className="w-4 h-4" />
                            <span>Puntuación máxima: {assignment.maxScore}</span>
                          </div>
                        </div>
                      </div>

                      <h4 className="text-gray-900 mb-4">Entregas de Estudiantes</h4>
                      <div className="space-y-3">
                        {assignment.submissions.map(submission => {
                          const student = students.find(s => s.id === submission.studentId);
                          if (!student) return null;

                          return (
                            <div
                              key={submission.studentId}
                              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                            >
                              <img
                                src={student.avatar}
                                alt={student.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-gray-900 truncate">{student.name}</p>
                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs mt-1 ${getStatusColor(submission.status)}`}>
                                  {getStatusIcon(submission.status)}
                                  <span>{getStatusLabel(submission.status)}</span>
                                </div>
                              </div>
                              
                              {submission.status === 'graded' ? (
                                <div className="text-right">
                                  <p className="text-gray-900">
                                    {submission.score}/{assignment.maxScore}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {Math.round((submission.score! / assignment.maxScore) * 100)}%
                                  </p>
                                </div>
                              ) : gradingStudentId === submission.studentId ? (
                                <div className="flex items-center gap-2">
                                  <input
                                    type="number"
                                    value={gradeValue}
                                    onChange={(e) => setGradeValue(e.target.value)}
                                    placeholder="0"
                                    min="0"
                                    max={assignment.maxScore}
                                    className="w-20 px-3 py-1.5 border border-gray-300 rounded-lg text-center"
                                  />
                                  <button
                                    onClick={() => handleGradeSubmission(assignment.id, submission.studentId)}
                                    className="p-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      setGradingStudentId(null);
                                      setGradeValue('');
                                    }}
                                    className="p-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setGradingStudentId(submission.studentId)}
                                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                  <Edit className="w-4 h-4" />
                                  Calificar
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Selecciona una tarea para ver las entregas
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Assignment Modal */}
      {showAddAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-gray-900 mb-4">Crear Nueva Tarea</h2>
            
            <form onSubmit={handleAddAssignment}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Título de la Tarea
                  </label>
                  <input
                    type="text"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ej. Ejercicios de Derivadas"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={newAssignment.description}
                    onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Descripción de la tarea..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Fecha Límite
                  </label>
                  <input
                    type="date"
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Puntuación Máxima
                  </label>
                  <input
                    type="number"
                    value={newAssignment.maxScore}
                    onChange={(e) => setNewAssignment({ ...newAssignment, maxScore: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddAssignment(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Crear Tarea
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
