'use client';

import { BookOpen, Heart, Star, Sparkles } from 'lucide-react';

interface DiaryCoverProps {
  onOpen: () => void;
  isFlipping: boolean;
}

export default function DiaryCover({ onOpen, isFlipping }: DiaryCoverProps) {
  return (
    <div className="relative">
      {/* Book Shadow */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-amber-800/30 rounded-2xl transform rotate-1 scale-105 blur-lg"></div>
      
      {/* Book Cover */}
      <div className={`relative bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900 rounded-2xl p-8 shadow-2xl max-w-md mx-auto cursor-pointer transition-transform duration-600 ${
        isFlipping ? 'page-flip' : 'hover:scale-105'
      }`} onClick={onOpen}>
        
        {/* Book Binding */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-amber-900 to-amber-800 rounded-l-2xl shadow-inner">
          <div className="flex flex-col justify-evenly h-full px-1">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-1 bg-amber-700 rounded-full opacity-60"></div>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 text-amber-200 opacity-60">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="absolute bottom-4 left-12 text-amber-200 opacity-40">
          <Star className="w-4 h-4" />
        </div>
        <div className="absolute top-1/3 right-8 text-amber-200 opacity-50">
          <Heart className="w-5 h-5" />
        </div>

        {/* Cover Content */}
        <div className="ml-6 text-center">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-bold text-amber-100 mb-2 drop-shadow-lg">
              My Diary
            </h1>
            <div className="w-24 h-1 bg-amber-300 mx-auto rounded-full opacity-80"></div>
          </div>

          {/* Central Icon */}
          <div className="mb-8 flex justify-center">
            <div className="p-6 bg-amber-100/20 rounded-full backdrop-blur-sm border border-amber-200/30">
              <BookOpen className="w-16 h-16 text-amber-100" />
            </div>
          </div>

          {/* Subtitle */}
          <div className="mb-8">
            <p className="text-amber-200 text-lg font-medium mb-2">
              A Journey Through Time
            </p>
            <p className="text-amber-300 text-sm opacity-80">
              Click to open and start writing your story
            </p>
          </div>

          {/* Decorative Border */}
          <div className="border-2 border-amber-300/30 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex justify-center items-center gap-2 text-amber-200">
              <div className="w-2 h-2 bg-amber-300 rounded-full opacity-60"></div>
              <div className="w-3 h-3 bg-amber-200 rounded-full opacity-80"></div>
              <div className="w-2 h-2 bg-amber-300 rounded-full opacity-60"></div>
            </div>
          </div>

          {/* Year */}
          <div className="mt-6">
            <p className="text-amber-300 text-sm font-medium">
              {new Date().getFullYear()}
            </p>
          </div>
        </div>

        {/* Leather texture overlay */}
        <div className="absolute inset-0 rounded-2xl opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
    </div>
  );
}