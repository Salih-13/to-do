'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Plus, X, ListTodo, UtensilsCrossed, BookOpen, Calendar, Clock } from 'lucide-react';
import TodoItem from './TodoItem';
import PriorityItem from './PriorityItem';
import StickyNote from './StickyNote';
import { DayData, TodoItem as TodoType, PriorityItem as PriorityType, StickyNote as StickyNoteType, ScheduleItem as ScheduleType } from '@/types/diary';

interface DiaryPageProps {
  date: Date;
  data: DayData;
  updateData: (data: DayData) => void;
}

// Color palettes for variety
const todoColors = [
  'border-blue-400 bg-blue-50/60',
  'border-indigo-400 bg-indigo-50/60',
  'border-purple-400 bg-purple-50/60',
  'border-cyan-400 bg-cyan-50/60',
  'border-teal-400 bg-teal-50/60',
  'border-sky-400 bg-sky-50/60'
];

const foodColors = [
  { high: 'border-red-400 bg-red-50/60', medium: 'border-orange-400 bg-orange-50/60', low: 'border-emerald-400 bg-emerald-50/60' },
  { high: 'border-rose-400 bg-rose-50/60', medium: 'border-amber-400 bg-amber-50/60', low: 'border-green-400 bg-green-50/60' },
  { high: 'border-pink-400 bg-pink-50/60', medium: 'border-yellow-400 bg-yellow-50/60', low: 'border-lime-400 bg-lime-50/60' },
  { high: 'border-fuchsia-400 bg-fuchsia-50/60', medium: 'border-orange-400 bg-orange-50/60', low: 'border-teal-400 bg-teal-50/60' }
];

const scheduleColors = [
  'border-violet-400 bg-violet-50/60',
  'border-purple-400 bg-purple-50/60',
  'border-indigo-400 bg-indigo-50/60',
  'border-blue-400 bg-blue-50/60',
  'border-cyan-400 bg-cyan-50/60',
  'border-teal-400 bg-teal-50/60'
];

// Monthly color themes
const getMonthlyTheme = (month: number) => {
  const themes = [
    { bg: 'from-blue-50 to-indigo-50', accent: 'from-blue-500 to-indigo-500' }, // January - Winter Blues
    { bg: 'from-pink-50 to-rose-50', accent: 'from-pink-500 to-rose-500' }, // February - Valentine's Pink
    { bg: 'from-green-50 to-emerald-50', accent: 'from-green-500 to-emerald-500' }, // March - Spring Green
    { bg: 'from-yellow-50 to-amber-50', accent: 'from-yellow-500 to-amber-500' }, // April - Spring Yellow
    { bg: 'from-purple-50 to-violet-50', accent: 'from-purple-500 to-violet-500' }, // May - Lavender
    { bg: 'from-orange-50 to-red-50', accent: 'from-orange-500 to-red-500' }, // June - Summer Orange
    { bg: 'from-cyan-50 to-blue-50', accent: 'from-cyan-500 to-blue-500' }, // July - Ocean Blue
    { bg: 'from-lime-50 to-green-50', accent: 'from-lime-500 to-green-500' }, // August - Lime Green
    { bg: 'from-amber-50 to-orange-50', accent: 'from-amber-500 to-orange-500' }, // September - Autumn Amber
    { bg: 'from-red-50 to-pink-50', accent: 'from-red-500 to-pink-500' }, // October - Fall Red
    { bg: 'from-gray-50 to-slate-50', accent: 'from-gray-500 to-slate-500' }, // November - Gray
    { bg: 'from-teal-50 to-cyan-50', accent: 'from-teal-500 to-cyan-500' } // December - Winter Teal
  ];
  return themes[month];
};

export default function DiaryPage({ date, data, updateData }: DiaryPageProps) {
  const [showTodoInput, setShowTodoInput] = useState(false);
  const [showFoodInput, setShowFoodInput] = useState(false);
  const [showScheduleInput, setShowScheduleInput] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [newFood, setNewFood] = useState('');
  const [newSchedule, setNewSchedule] = useState('');
  const [newScheduleTime, setNewScheduleTime] = useState('');

  const monthTheme = getMonthlyTheme(date.getMonth());

  const addTodo = () => {
    if (!newTodo.trim()) return;
    const colorIndex = data.todos.length % todoColors.length;
    const todo: TodoType = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
      time: format(new Date(), 'HH:mm'),
      colorClass: todoColors[colorIndex],
      priority: 'medium'
    };
    updateData({
      ...data,
      todos: [...data.todos, todo]
    });
    setNewTodo('');
    setShowTodoInput(false);
  };

  const addFood = () => {
    if (!newFood.trim()) return;
    const colorIndex = data.priorities.length % foodColors.length;
    const food: PriorityType = {
      id: Date.now().toString(),
      text: newFood,
      completed: false,
      priority: 'medium',
      colorPalette: foodColors[colorIndex]
    };
    updateData({
      ...data,
      priorities: [...data.priorities, food]
    });
    setNewFood('');
    setShowFoodInput(false);
  };

  const addSchedule = () => {
    if (!newSchedule.trim()) return;
    const colorIndex = (data.schedule?.length || 0) % scheduleColors.length;
    const schedule: ScheduleType = {
      id: Date.now().toString(),
      text: newSchedule,
      completed: false,
      time: newScheduleTime || format(new Date(), 'HH:mm'),
      colorClass: scheduleColors[colorIndex]
    };
    updateData({
      ...data,
      schedule: [...(data.schedule || []), schedule]
    });
    setNewSchedule('');
    setNewScheduleTime('');
    setShowScheduleInput(false);
  };

  const addStickyNote = () => {
    const colors: ('yellow' | 'pink' | 'blue' | 'green')[] = ['yellow', 'pink', 'blue', 'green'];
    const note: StickyNoteType = {
      id: Date.now().toString(),
      text: '',
      color: colors[Math.floor(Math.random() * colors.length)],
      x: Math.random() * 200,
      y: Math.random() * 100 + 300
    };
    updateData({
      ...data,
      notes: [...data.notes, note]
    });
  };

  const updateTodo = (id: string, updates: Partial<TodoType>) => {
    updateData({
      ...data,
      todos: data.todos.map(todo => 
        todo.id === id ? { ...todo, ...updates } : todo
      )
    });
  };

  const deleteTodo = (id: string) => {
    updateData({
      ...data,
      todos: data.todos.filter(todo => todo.id !== id)
    });
  };

  const updateFood = (id: string, updates: Partial<PriorityType>) => {
    updateData({
      ...data,
      priorities: data.priorities.map(priority => 
        priority.id === id ? { ...priority, ...updates } : priority
      )
    });
  };

  const deleteFood = (id: string) => {
    updateData({
      ...data,
      priorities: data.priorities.filter(priority => priority.id !== id)
    });
  };

  const updateSchedule = (id: string, updates: Partial<ScheduleType>) => {
    updateData({
      ...data,
      schedule: (data.schedule || []).map(schedule => 
        schedule.id === id ? { ...schedule, ...updates } : schedule
      )
    });
  };

  const deleteSchedule = (id: string) => {
    updateData({
      ...data,
      schedule: (data.schedule || []).filter(schedule => schedule.id !== id)
    });
  };

  const updateNote = (id: string, updates: Partial<StickyNoteType>) => {
    updateData({
      ...data,
      notes: data.notes.map(note => 
        note.id === id ? { ...note, ...updates } : note
      )
    });
  };

  const deleteNote = (id: string) => {
    updateData({
      ...data,
      notes: data.notes.filter(note => note.id !== id)
    });
  };

  return (
    <div className={`relative bg-gradient-to-br ${monthTheme.bg} rounded-xl shadow-lg p-4 h-[600px] overflow-hidden`}>
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-30 rounded-xl" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Page lines */}
      <div className="absolute left-8 top-16 bottom-4 w-px bg-red-300 opacity-30"></div>
      
      {/* Date and Study Button */}
      <div className="relative z-10 mb-4 flex justify-between items-start">
        <div className={`bg-gradient-to-r ${monthTheme.accent} text-white px-3 py-1 rounded-lg shadow-md`}>
          <div className="text-xs font-medium">{format(date, 'EEEE')}</div>
          <div className="text-lg font-bold">{format(date, 'MMM dd, yyyy')}</div>
        </div>
        
        <button
          onClick={addStickyNote}
          className="px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium shadow-md transition-all hover:scale-105 text-sm flex items-center gap-2"
        >
          <BookOpen className="w-4 h-4" />
          Study
        </button>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full overflow-y-auto custom-scrollbar">
        {/* Schedule Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-amber-800 font-semibold text-sm uppercase tracking-wide flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Schedule
            </h3>
            <button
              onClick={() => setShowScheduleInput(true)}
              className="p-2 bg-violet-500 hover:bg-violet-600 text-white rounded-full shadow-md transition-all hover:scale-110"
              title="Add schedule item"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          {showScheduleInput && (
            <div className="mb-3 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSchedule}
                  onChange={(e) => setNewSchedule(e.target.value)}
                  placeholder="Add schedule item..."
                  className="flex-1 px-3 py-2 text-sm border border-violet-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-300 bg-white/80"
                  onKeyPress={(e) => e.key === 'Enter' && addSchedule()}
                  autoFocus
                />
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 flex-1">
                  <Clock className="w-4 h-4 text-violet-600" />
                  <input
                    type="time"
                    value={newScheduleTime}
                    onChange={(e) => setNewScheduleTime(e.target.value)}
                    className="px-3 py-2 text-sm border border-violet-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-300 bg-white/80"
                  />
                </div>
                <button
                  onClick={addSchedule}
                  className="px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-lg transition-colors"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setShowScheduleInput(false);
                    setNewSchedule('');
                    setNewScheduleTime('');
                  }}
                  className="px-3 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            {(data.schedule || []).map(schedule => (
              <TodoItem
                key={schedule.id}
                todo={schedule}
                onUpdate={(updates) => updateSchedule(schedule.id, updates)}
                onDelete={() => deleteSchedule(schedule.id)}
                isSchedule={true}
              />
            ))}
            {(!data.schedule || data.schedule.length === 0) && !showScheduleInput && (
              <div className="text-gray-500 text-sm italic text-center py-4">
                Click the + button to add schedule items
              </div>
            )}
          </div>
        </div>

        {/* To Do Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-amber-800 font-semibold text-sm uppercase tracking-wide flex items-center gap-2">
              <ListTodo className="w-4 h-4" />
              To Do
            </h3>
            <button
              onClick={() => setShowTodoInput(true)}
              className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md transition-all hover:scale-110"
              title="Add new task"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          {showTodoInput && (
            <div className="mb-3 flex gap-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add new task..."
                className="flex-1 px-3 py-2 text-sm border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white/80"
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                autoFocus
              />
              <button
                onClick={addTodo}
                className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setShowTodoInput(false);
                  setNewTodo('');
                }}
                className="px-3 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          
          <div className="space-y-2">
            {data.todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={(updates) => updateTodo(todo.id, updates)}
                onDelete={() => deleteTodo(todo.id)}
              />
            ))}
            {data.todos.length === 0 && !showTodoInput && (
              <div className="text-gray-500 text-sm italic text-center py-4">
                Click the + button to add your first task
              </div>
            )}
          </div>
        </div>

        {/* What to Eat Today Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-amber-800 font-semibold text-sm uppercase tracking-wide flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4" />
              What to Eat Today
            </h3>
            <button
              onClick={() => setShowFoodInput(true)}
              className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-md transition-all hover:scale-110"
              title="Add meal or snack"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          {showFoodInput && (
            <div className="mb-3 flex gap-2">
              <input
                type="text"
                value={newFood}
                onChange={(e) => setNewFood(e.target.value)}
                placeholder="Add meal or snack..."
                className="flex-1 px-3 py-2 text-sm border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white/80"
                onKeyPress={(e) => e.key === 'Enter' && addFood()}
                autoFocus
              />
              <button
                onClick={addFood}
                className="px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setShowFoodInput(false);
                  setNewFood('');
                }}
                className="px-3 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          
          <div className="space-y-2">
            {data.priorities.map(food => (
              <PriorityItem
                key={food.id}
                priority={food}
                onUpdate={(updates) => updateFood(food.id, updates)}
                onDelete={() => deleteFood(food.id)}
                isFood={true}
              />
            ))}
            {data.priorities.length === 0 && !showFoodInput && (
              <div className="text-gray-500 text-sm italic text-center py-4">
                Click the + button to plan your meals
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Notes */}
      {data.notes.map(note => (
        <StickyNote
          key={note.id}
          note={note}
          onUpdate={(updates) => updateNote(note.id, updates)}
          onDelete={() => deleteNote(note.id)}
        />
      ))}
    </div>
  );
}