import React from 'react'
import { LayoutDashboard, School, Calendar, Bell, Settings, Menu, X } from 'lucide-react';

export default function NotificationsPage() {
  return (
     <div className="p-8">
            <h2 className="mb-6">Notificaciones</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Bell className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700">Nueva pregunta en <strong>Matemáticas Avanzadas</strong></p>
                    <p className="text-gray-500 text-sm mt-1">Ana García comentó en "Cálculo Diferencial"</p>
                    <p className="text-gray-400 text-xs mt-2">Hace 2 horas</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Bell className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700">Nueva entrega de tarea</p>
                    <p className="text-gray-500 text-sm mt-1">Carlos Ruiz entregó "Ejercicios de Derivadas"</p>
                    <p className="text-gray-400 text-xs mt-2">Hace 5 horas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}
