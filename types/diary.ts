export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  time?: string;
  colorClass?: string;
  priority?: 'high' | 'medium' | 'low';
}

export interface PriorityItem {
  id: string;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  colorPalette?: {
    high: string;
    medium: string;
    low: string;
  };
}

export interface ScheduleItem {
  id: string;
  text: string;
  completed: boolean;
  time?: string;
  colorClass?: string;
}

export interface StickyNote {
  id: string;
  text: string;
  color: 'yellow' | 'pink' | 'blue' | 'green';
  x: number;
  y: number;
}

export interface DayData {
  todos: TodoItem[];
  priorities: PriorityItem[];
  schedule?: ScheduleItem[];
  notes: StickyNote[];
}

export interface DiaryData {
  [date: string]: DayData;
}