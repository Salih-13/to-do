'use client';

import { useState, useEffect } from 'react';
import DiaryBook from '@/components/DiaryBook';
import { DiaryData } from '@/types/diary';

export default function Home() {
  const [diaryData, setDiaryData] = useState<DiaryData>({});
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Load data from localStorage
    const savedData = localStorage.getItem('diaryData');
    if (savedData) {
      setDiaryData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    // Save data to localStorage whenever it changes
    localStorage.setItem('diaryData', JSON.stringify(diaryData));
  }, [diaryData]);

  const updateDiaryData = (date: string, data: any) => {
    setDiaryData(prev => ({
      ...prev,
      [date]: data
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4">
      <DiaryBook
        diaryData={diaryData}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        updateDiaryData={updateDiaryData}
      />
    </div>
  );
}