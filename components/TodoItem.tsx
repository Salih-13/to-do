'use client';

import { useState } from 'react';
import { Trash2, Clock, Flag, Edit2 } from 'lucide-react';
import { TodoItem as TodoType } from '@/types/diary';

interface TodoItemProps {
  todo: TodoType;
  onUpdate: (updates: Partial<TodoType>) => void;
  onDelete: () => void;
  isSchedule?: boolean;
}

export default function TodoItem({ todo, onUpdate, onDelete, isSchedule = false }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [editTime, setEditTime] = useState(todo.time || '');

  const handleSave = () => {
    onUpdate({ text: editText });
    setIsEditing(false);
  };

  const handleTimeSave = () => {
    onUpdate({ time: editTime });
    setIsEditingTime(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const handleTimeKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTimeSave();
    } else if (e.key === 'Escape') {
      setEditTime(todo.time || '');
      setIsEditingTime(false);
    }
  };

  // Use the color class if available, otherwise fall back to default
  const colorClass = todo.colorClass || (isSchedule ? 'border-violet-400 bg-violet-50/60' : 'border-blue-400 bg-blue-50/60');
  const completedColorClass = todo.completed ? 'border-green-400 bg-green-50/60' : colorClass;

  const getPriorityColor = () => {
    switch (todo.priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const checkboxColor = isSchedule ? 'text-violet-600 focus:ring-violet-500' : 'text-blue-600 focus:ring-blue-500';

  return (
    <div className={`group flex items-center gap-3 p-3 bg-white/60 rounded-lg border-l-4 shadow-sm hover:shadow-md transition-all ${
      todo.completed ? 'opacity-60' : ''
    } ${completedColorClass}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => onUpdate({ completed: e.target.checked })}
        className={`w-4 h-4 rounded ${checkboxColor}`}
      />
      
      {!isSchedule && <Flag className={`w-4 h-4 ${getPriorityColor()}`} />}
      
      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyPress}
            className="w-full px-2 py-1 text-sm bg-transparent border-none focus:outline-none"
            autoFocus
          />
        ) : (
          <div
            onClick={() => setIsEditing(true)}
            className={`text-sm cursor-pointer ${
              todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
            }`}
          >
            {todo.text}
          </div>
        )}
        
        {todo.time && (
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            {isEditingTime ? (
              <input
                type="time"
                value={editTime}
                onChange={(e) => setEditTime(e.target.value)}
                onBlur={handleTimeSave}
                onKeyDown={handleTimeKeyPress}
                className="bg-transparent border-none focus:outline-none text-xs"
                autoFocus
              />
            ) : (
              <span 
                onClick={() => {
                  setIsEditingTime(true);
                  setEditTime(todo.time || '');
                }}
                className="cursor-pointer hover:text-gray-700"
              >
                {todo.time}
              </span>
            )}
          </div>
        )}
      </div>
      
      {!isSchedule && (
        <select
          value={todo.priority || 'medium'}
          onChange={(e) => onUpdate({ priority: e.target.value as 'high' | 'medium' | 'low' })}
          className="text-xs bg-transparent border-none focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      )}
      
      <button
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:text-red-700 transition-all"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}