'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import DiaryPage from './DiaryPage';
import DiaryCover from './DiaryCover';
import { DiaryData } from '@/types/diary';
import { format, addDays, subDays } from 'date-fns';

interface DiaryBookProps {
  diaryData: DiaryData;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  updateDiaryData: (date: string, data: any) => void;
}

export default function DiaryBook({ 
  diaryData, 
  currentDate, 
  setCurrentDate, 
  updateDiaryData 
}: DiaryBookProps) {
  const [isFlipping, setIsFlipping] = useState(false);
  const [showCover, setShowCover] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    // Check if this is the first time opening the diary
    const hasOpenedBefore = localStorage.getItem('diaryOpened');
    if (hasOpenedBefore) {
      setIsFirstTime(false);
      setShowCover(false);
    }
  }, []);

  const handleOpenDiary = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setShowCover(false);
      setIsFlipping(false);
      localStorage.setItem('diaryOpened', 'true');
      setIsFirstTime(false);
    }, 600);
  };

  const handlePrevDay = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentDate(subDays(currentDate, 1));
      setIsFlipping(false);
    }, 300);
  };

  const handleNextDay = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentDate(addDays(currentDate, 1));
      setIsFlipping(false);
    }, 300);
  };

  const dateKey = format(currentDate, 'yyyy-MM-dd');
  const currentData = diaryData[dateKey] || {
    todos: [],
    priorities: [],
    schedule: [],
    notes: []
  };

  if (showCover) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <DiaryCover onOpen={handleOpenDiary} isFlipping={isFlipping} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* Book Container */}
      <div className="relative">
        {/* Book Shadow */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-amber-800/30 rounded-2xl transform rotate-1 scale-105 blur-lg"></div>
        
        {/* Book Cover */}
        <div className="relative bg-gradient-to-r from-amber-800 to-amber-900 rounded-2xl p-6 shadow-2xl max-w-md mx-auto">
          {/* Book Binding */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-amber-900 to-amber-800 rounded-l-2xl shadow-inner">
            <div className="flex flex-col justify-evenly h-full px-1">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-1 bg-amber-700 rounded-full opacity-60"></div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mb-4 ml-6">
            <button
              onClick={handlePrevDay}
              disabled={isFlipping}
              className="p-2 bg-amber-100 hover:bg-amber-200 rounded-full shadow-md transition-all duration-200 hover:scale-110 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5 text-amber-800" />
            </button>
            
            <h1 className="text-amber-100 font-serif text-lg font-bold">My Diary</h1>
            
            <button
              onClick={handleNextDay}
              disabled={isFlipping}
              className="p-2 bg-amber-100 hover:bg-amber-200 rounded-full shadow-md transition-all duration-200 hover:scale-110 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5 text-amber-800" />
            </button>
          </div>

          {/* Page Container */}
          <div className={`relative ml-6 transition-transform duration-300 ${isFlipping ? 'scale-95 opacity-70' : ''}`}>
            <DiaryPage
              date={currentDate}
              data={currentData}
              updateData={(data) => updateDiaryData(dateKey, data)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}