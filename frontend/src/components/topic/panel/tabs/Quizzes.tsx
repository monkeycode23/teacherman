import React from 'react'
import { X, FileText, Image, Video, Link as LinkIcon, Trash2, MessageCircle, Send, Plus, Play, Calendar as CalendarIcon, CheckCircle, XCircle } from 'lucide-react';

export default function Quizzes({setTakingQuiz,takingQuiz,quizAnswers,quizResults,setQuizAnswers,setQuizAnswers,setAddingQuiz,setNewQuiz,newQuiz,handleAddQuiz}:any) {
  return (

     <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">Quizzes de Práctica</h3>
                <button
                  onClick={() => setAddingQuiz(true)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Crear Quiz
                </button>
              </div>

              {addingQuiz && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Título del Quiz</label>
                      <input
                        type="text"
                        value={newQuiz.title}
                        onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="ej. Quiz de Derivadas"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Descripción</label>
                      <input
                        type="text"
                        value={newQuiz.description}
                        onChange={(e) => setNewQuiz({ ...newQuiz, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="Descripción breve"
                      />
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-gray-900 mb-3">Preguntas</h4>
                      {newQuiz.questions.map((q, idx) => (
                        <div key={q.id} className="mb-3 p-3 bg-white rounded-lg">
                          <p className="text-gray-900 mb-2">{idx + 1}. {q.question}</p>
                          <div className="text-sm text-gray-600">
                            {q.options.map((opt, optIdx) => (
                              <div key={optIdx} className={optIdx === q.correctAnswer ? 'text-green-600' : ''}>
                                {opt} {optIdx === q.correctAnswer && '✓'}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const question: QuizQuestion = {
                            id: Date.now().toString(),
                            question: 'Nueva pregunta',
                            options: ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4'],
                            correctAnswer: 0,
                            explanation: 'Explicación',
                          };
                          setNewQuiz({ ...newQuiz, questions: [...newQuiz.questions, question] });
                        }}
                        className="w-full px-3 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-gray-400"
                      >
                        + Agregar Pregunta
                      </button>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setAddingQuiz(false)}
                        className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleAddQuiz}
                        className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Crear Quiz
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {topic.quizzes.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No hay quizzes creados</p>
              ) : (
               
              )}
            
    <div className="space-y-4">
                  {topic.quizzes.map(quiz => (
                    <div key={quiz.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-gray-900">{quiz.title}</h4>
                          <p className="text-sm text-gray-600">{quiz.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{quiz.questions.length} preguntas</p>
                        </div>
                        <button
                          onClick={() => setTakingQuiz(takingQuiz === quiz.id ? null : quiz.id)}
                          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          <Play className="w-4 h-4" />
                          Vista Previa
                        </button>
                      </div>

                      {takingQuiz === quiz.id && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="space-y-4">
                            {quiz.questions.map((q, idx) => (
                              <div key={q.id} className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-gray-900 mb-3">{idx + 1}. {q.question}</p>
                                <div className="space-y-2">
                                  {q.options.map((option, optIdx) => (
                                    <label
                                      key={optIdx}
                                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                                        quizAnswers[q.id] === optIdx
                                          ? 'bg-blue-50 border-blue-500'
                                          : 'bg-white border-gray-200 hover:border-gray-300'
                                      } ${
                                        quizResults && quizResults[q.id] !== undefined
                                          ? optIdx === q.correctAnswer
                                            ? 'bg-green-50 border-green-500'
                                            : quizAnswers[q.id] === optIdx
                                            ? 'bg-red-50 border-red-500'
                                            : ''
                                          : ''
                                      }`}
                                    >
                                      <input
                                        type="radio"
                                        name={`quiz-${quiz.id}-${q.id}`}
                                        checked={quizAnswers[q.id] === optIdx}
                                        onChange={() => setQuizAnswers({ ...quizAnswers, [q.id]: optIdx })}
                                        disabled={quizResults !== null}
                                        className="w-4 h-4"
                                      />
                                      <span className="flex-1">{option}</span>
                                      {quizResults && optIdx === q.correctAnswer && (
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                      )}
                                      {quizResults && quizAnswers[q.id] === optIdx && optIdx !== q.correctAnswer && (
                                        <XCircle className="w-5 h-5 text-red-600" />
                                      )}
                                    </label>
                                  ))}
                                </div>
                                {quizResults && q.explanation && (
                                  <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm text-blue-900">
                                    <strong>Explicación:</strong> {q.explanation}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                          {!quizResults ? (
                            <button
                              onClick={() => handleSubmitQuiz(quiz.id)}
                              className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                              Verificar Respuestas
                            </button>
                          ) : (
                            <div className="mt-4 p-4 bg-green-50 rounded-lg text-center">
                              <p className="text-green-900">
                                Resultado: {Object.values(quizResults).filter(Boolean).length} de {quiz.questions.length} correctas
                              </p>
                              <button
                                onClick={() => {
                                  setQuizResults(null);
                                  setQuizAnswers({});
                                }}
                                className="mt-2 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
                              >
                                Reintentar
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                </div>
  )
}


