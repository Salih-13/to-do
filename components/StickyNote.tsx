'use client';

import { useState, useRef } from 'react';
import { X } from 'lucide-react';
import { StickyNote as StickyNoteType } from '@/types/diary';

interface StickyNoteProps {
  note: StickyNoteType;
  onUpdate: (updates: Partial<StickyNoteType>) => void;
  onDelete: () => void;
}

export default function StickyNote({ note, onUpdate, onDelete }: StickyNoteProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const noteRef = useRef<HTMLDivElement>(null);

  const getColorClasses = () => {
    switch (note.color) {
      case 'yellow': return 'bg-yellow-300 border-yellow-400 text-yellow-900';
      case 'pink': return 'bg-pink-300 border-pink-400 text-pink-900';
      case 'blue': return 'bg-blue-300 border-blue-400 text-blue-900';
      case 'green': return 'bg-green-300 border-green-400 text-green-900';
      default: return 'bg-yellow-300 border-yellow-400 text-yellow-900';
    }
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'TEXTAREA') return;
    
    setIsDragging(true);
    const rect = noteRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const container = noteRef.current?.parentElement;
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const newX = e.clientX - containerRect.left - dragOffset.x;
      const newY = e.clientY - containerRect.top - dragOffset.y;
      
      onUpdate({
        x: Math.max(0, Math.min(newX, containerRect.width - 150)),
        y: Math.max(0, Math.min(newY, containerRect.height - 120))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).tagName === 'TEXTAREA') return;
    
    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    const rect = noteRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const container = noteRef.current?.parentElement;
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const newX = touch.clientX - containerRect.left - dragOffset.x;
      const newY = touch.clientY - containerRect.top - dragOffset.y;
      
      onUpdate({
        x: Math.max(0, Math.min(newX, containerRect.width - 150)),
        y: Math.max(0, Math.min(newY, containerRect.height - 120))
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate({ text: e.target.value });
  };

  return (
    <div
      ref={noteRef}
      className={`absolute w-36 h-28 ${getColorClasses()} rounded-sm shadow-lg border-2 cursor-move transform hover:scale-105 transition-transform ${
        isDragging ? 'z-50 rotate-2 scale-110' : 'z-20'
      } touch-none select-none`}
      style={{
        left: `${note.x}px`,
        top: `${note.y}px`,
        transform: `rotate(${Math.random() * 6 - 3}deg) ${isDragging ? 'scale(1.1)' : ''}`
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Sticky note header */}
      <div className="flex justify-between items-center p-1">
        <div className="w-3 h-3 bg-black/10 rounded-full"></div>
        <button
          onClick={onDelete}
          className="w-4 h-4 flex items-center justify-center hover:bg-black/10 rounded-full transition-colors touch-manipulation"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
      
      {/* Note content */}
      <textarea
        value={note.text}
        onChange={handleTextChange}
        placeholder="Study topics..."
        className="w-full h-20 p-2 bg-transparent border-none resize-none focus:outline-none text-xs placeholder-current/60 touch-manipulation"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      />
    </div>
  );
}