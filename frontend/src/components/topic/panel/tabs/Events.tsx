import React from 'react'
import { X, FileText, Image, Video, Link as LinkIcon, Trash2, MessageCircle, Send, Plus, Play, Calendar as CalendarIcon, CheckCircle, XCircle } from 'lucide-react';

export default function Events({topic,getEventTypeLabel,setAddingEvent,handleAddEvent,addingEvent,
    setNewEvent,newEvent,handleDeleteEvent,getEventTypeColor}:any) {
  return (
      <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">Eventos del Tema</h3>
                <button
                  onClick={() => setAddingEvent(true)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Agregar Evento
                </button>
              </div>

              {addingEvent && (
                <form onSubmit={handleAddEvent} className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Título</label>
                      <input
                        type="text"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="ej. Examen de Derivadas"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Descripción</label>
                      <input
                        type="text"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="Descripción del evento"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Fecha</label>
                      <input
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Tipo</label>
                      <select
                        value={newEvent.type}
                        onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as TopicEvent['type'] })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="exam">Examen</option>
                        <option value="deadline">Fecha Límite</option>
                        <option value="review">Repaso</option>
                        <option value="other">Otro</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setAddingEvent(false)}
                        className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {topic.events.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No hay eventos programados</p>
              ) : (
                <div className="space-y-3">
                  {topic.events.map(event => (
                    <div key={event.id} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                        <CalendarIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <h4 className="text-gray-900">{event.title}</h4>
                            <p className="text-sm text-gray-600">{event.description}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="p-1 hover:bg-red-50 rounded text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-sm text-gray-600">
                            {new Date(event.date).toLocaleDateString('es-ES', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-xs ${getEventTypeColor(event.type)}`}>
                            {getEventTypeLabel(event.type)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
  )
}
