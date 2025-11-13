import React from 'react';
import type { Decision } from '../types';

interface ResultDisplayProps {
  question: string;
  decision: Decision;
  reason: string;
}

const AnswerPill: React.FC<{ answer: string }> = ({ answer }) => {
  const baseClasses = "text-8xl sm:text-9xl font-black uppercase tracking-wider text-white [text-shadow:_4px_4px_8px_rgba(0,0,0,0.7)]";
  switch (answer.toLowerCase()) {
    case 'yes':
      return <span className={`${baseClasses} text-green-400`}>YES</span>;
    case 'no':
      return <span className={`${baseClasses} text-red-400`}>NO</span>;
    default:
      return <span className={`${baseClasses} text-yellow-400`}>MAYBE</span>;
  }
};

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ question, decision, reason }) => {
  return (
    <div className="w-full text-center animate-fade-in space-y-8">
      <p className="text-slate-400 text-lg">
        「{question}」...
      </p>
      
      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl mx-auto max-w-lg">
        <img
          src={decision.image}
          alt={decision.answer}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-4">
          <AnswerPill answer={decision.answer} />
        </div>
      </div>

      <div className="px-4">
        <p className="text-slate-300 text-xl md:text-2xl leading-relaxed italic max-w-lg mx-auto">
          {reason || "..."}
        </p>
      </div>
    </div>
  );
};