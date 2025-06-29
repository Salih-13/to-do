'use client';

import { useState } from 'react';
import { Trash2, Utensils } from 'lucide-react';
import { PriorityItem as PriorityType } from '@/types/diary';

interface PriorityItemProps {
  priority: PriorityType;
  onUpdate: (updates: Partial<PriorityType>) => void;
  onDelete: () => void;
  isFood?: boolean;
}

export default function PriorityItem({ priority, onUpdate, onDelete, isFood = false }: PriorityItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(priority.text);

  const handleSave = () => {
    onUpdate({ text: editText });
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(priority.text);
      setIsEditing(false);
    }
  };

  const getPriorityColor = () => {
    if (priority.colorPalette) {
      return priority.colorPalette[priority.priority];
    }
    // Fallback to default colors
    switch (priority.priority) {
      case 'high': return 'border-red-400 bg-red-50/60';
      case 'medium': return 'border-yellow-400 bg-yellow-50/60';
      case 'low': return 'border-green-400 bg-green-50/60';
      default: return 'border-gray-400 bg-gray-50/60';
    }
  };

  const getMealTypeColor = () => {
    if (isFood) {
      switch (priority.priority) {
        case 'high': return 'text-red-500'; // Breakfast
        case 'medium': return 'text-orange-500'; // Lunch
        case 'low': return 'text-green-500'; // Dinner
        default: return 'text-gray-500';
      }
    }
    switch (priority.priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getMealTypeLabel = () => {
    if (isFood) {
      switch (priority.priority) {
        case 'high': return 'Breakfast';
        case 'medium': return 'Lunch';
        case 'low': return 'Dinner';
        default: return 'Snack';
      }
    }
    switch (priority.priority) {
      case 'high': return 'High';
      case 'medium': return 'Medium';
      case 'low': return 'Low';
      default: return 'Medium';
    }
  };

  return (
    <div className={`group flex items-center gap-3 p-3 bg-white/60 rounded-lg border-l-4 shadow-sm hover:shadow-md transition-all ${
      priority.completed ? 'opacity-60' : ''
    } ${getPriorityColor()}`}>
      <input
        type="checkbox"
        checked={priority.completed}
        onChange={(e) => onUpdate({ completed: e.target.checked })}
        className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
      />
      
      <Utensils className={`w-4 h-4 ${getMealTypeColor()}`} />
      
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
              priority.completed ? 'line-through text-gray-500' : 'text-gray-800'
            }`}
          >
            {priority.text}
          </div>
        )}
      </div>
      
      <select
        value={priority.priority}
        onChange={(e) => onUpdate({ priority: e.target.value as 'high' | 'medium' | 'low' })}
        className="text-xs bg-transparent border-none focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {isFood ? (
          <>
            <option value="high">Breakfast</option>
            <option value="medium">Lunch</option>
            <option value="low">Dinner</option>
          </>
        ) : (
          <>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </>
        )}
      </select>
      
      <button
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:text-red-700 transition-all"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}