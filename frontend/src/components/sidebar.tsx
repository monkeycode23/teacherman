import React,{useState} from 'react'
import { LayoutDashboard, School, Calendar, Bell, Settings, Menu, X,FilterX,FileText } from 'lucide-react';
import { Link } from 'react-router';

export default function Sidebar() {

      const [sidebarOpen, setSidebarOpen] = useState(true);
       const [currentView, setCurrentView] = useState("dashboard");
   
    const selectedClassroom = "";
  
  
    return (
    
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        <div className="p-6 flex items-center justify-between border-b border-gray-200">
          {sidebarOpen && <h1 className="text-blue-600">EduManage</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
          onClick={()=>{setCurrentView("dashboard")}}
            to={"/"}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'dashboard' && !selectedClassroom
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            {sidebarOpen && <span>Dashboard</span>}
          </Link>

          <Link
          onClick={()=>{setCurrentView("classrooms")}}
           to={"/classrooms"} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'classrooms' && !selectedClassroom
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <School className="w-5 h-5" />
            {sidebarOpen && <span>Mis Aulas</span>}
          </Link>

          <Link
          onClick={()=>{setCurrentView("calendar")}}
            to={"/callendar"} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'calendar'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Calendar className="w-5 h-5" />
            {sidebarOpen && <span>Calendario</span>}
          </Link>

          <Link
          onClick={()=>{setCurrentView("notifications")}}
            to={"/notifications"} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'notifications'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Bell className="w-5 h-5" />
            {sidebarOpen && <span>Notificaciones</span>}
          </Link>

          <Link
          onClick={()=>{setCurrentView("events")}}
            to={"/events"} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'events'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FileText className="w-5 h-5" />
            {sidebarOpen && <span>Eventos</span>}
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
            <Settings className="w-5 h-5" />
            {sidebarOpen && <span>Configuración</span>}
          </button>
        </div>
      </aside>
  )
}
