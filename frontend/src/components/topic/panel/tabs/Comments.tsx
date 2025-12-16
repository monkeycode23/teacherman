import React from 'react'
import { X, FileText, Image, Video, Link as LinkIcon, Trash2, MessageCircle, Send, Plus, Play, Calendar as CalendarIcon, CheckCircle, XCircle } from 'lucide-react';

export default function Comments({topic,commentText,setCommentText,handleAddComment,}:any) {
  return (
      <div>
                  <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Comentarios y Preguntas
                  </h3>
    
                  <div className="space-y-4 mb-4">
                    {topic.comments.map(comment => (
                      <div key={comment.id} className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                        <img
                          src={comment.studentAvatar}
                          alt={comment.studentName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-gray-900">{comment.studentName}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(comment.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                          <p className="text-gray-700">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
    
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Responder o agregar un comentario..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddComment();
                        }
                      }}
                    />
                    <button
                      onClick={handleAddComment}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
  )
}
