import { useEffect, useState } from 'react';
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
  Icon,
  icons
} from 'lucide-react';

import clsx  from 'clsx'
import { useQuery, useLazyQuery } from "@apollo/client/react";
import type { Session, Student, Activity } from '../../types/general';
import { useActivityStore } from '../../store/activities.store';



const ActivityItem = ({activity,index,isAttendance,isExpanded,
    presentCount,totalStudents,Icon,
    setExpandedActivity,students,handleToggleActivityComplete,
    handleToggleAttendance,
    handleDeleteActivity}:any)=>{


        const activityStore = useActivityStore()

    return (
            <div key={activity._id} className={clsx(
                "border border-gray-300 p-4 rounded-xl",
                activity.completed ? 'bg-green-50' : '',

            )}>
              <h2>
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
                        <h2 className="text-base">{activity.title}</h2>
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
                      <button
                      title='button'
                        onClick={() => handleDeleteActivity(activity._id)}
                        
                        
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    )}
                    <button
                     className='bg-black text-white  px-2 py-1 rounded-xl'
                      onClick={() => setExpandedActivity(isExpanded ? '' : activity._id)}
                      
                    >
                      {isExpanded ? 'Ocultar' : 'Expandir'}
                    </button>
                    <button

                    className='bg-green-500 text-white  px-2 py-1 rounded-xl'
                      onClick={(e) =>{
                        e.stopPropagation()
                         handleToggleActivityComplete(activity._id)
                      }}
                      
                    >
                      {activity.completed ? 'incompleta' : 'completar'}
                    </button>
                  </div>
                </div>
              </h2>

              {isExpanded && isAttendance && (
                <div>
                  <div className="space-y-3">
                    <h3 className="text-sm">Lista de Estudiantes</h3>
                    <div className="grid gap-2">
                      {students.map((student:any) => (
                        <div
                          key={student._id}
                          className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-300"
                        >
                            <div className='flex gap-2 items-center'>
                                 <img
                              src={
                                "https://api.dicebear.com/7.x/initials/svg?seed=" +
                                student.names +
                                student.lastname
                              }
                              alt={student.names}
                              className="w-7 h-7 rounded-full object-cover"
                            />
                          <span>{student.names} {student.lastname}</span>
                            </div>
                          <div className="flex items-center space-x-2">
                            { activityStore.attendances[student._id]  ? (
                              <>
                                <span className="text-sm text-green-600">Presente</span>
                                <button
                                className=''
                                title='button'
                                  onClick={() => /*  */{
                                    handleToggleAttendance(student._id)
                                  }}
                                  /* variant="outline" */
                                  /* size="sm" */
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </>
                            ) : (
                              <>
                                <span className="text-sm text-red-600">Ausente</span>
                                <button

                                    className='bg-green-500 p-1 rounded-md text-white'
                                  onClick={() => {

                                    handleToggleAttendance(student._id)
                                  }}
                                  /* variant="outline" */
                                  /* size="sm" */
                                >
                                  
                                  presente
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {isExpanded && !isAttendance && (
                <div className='p-4'>
                  <div className="text-sm text-gray-600">
                    <p>Detalles de la actividad aparecerán aquí.</p>
                    <p className="mt-2">Puedes expandir esta sección para agregar más funcionalidad específica para cada tipo de actividad.</p>
                  </div>
                </div>
              )}
            </div>
          );
}


export default ActivityItem