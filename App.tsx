
import React, { useState, useCallback } from 'react';
import { QuestionForm } from './components/QuestionForm';
import { ResultDisplay } from './components/ResultDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { getDecision } from './services/decisionService';
import { generateReason } from './services/geminiService';
import type { Decision } from './types';

const App: React.FC = () => {
  const [decision, setDecision] = useState<Decision | null>(null);
  const [reason, setReason] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [askedQuestion, setAskedQuestion] = useState<string>('');

  const handleAskQuestion = useCallback(async (question: string) => {
    if (!question.trim()) {
      setError('質問を入力してください。');
      return;
    }

    setIsLoading(true);
    setError(null);
    setDecision(null);
    setReason('');
    setAskedQuestion(question);

    try {
      const decisionResult = await getDecision();
      setDecision(decisionResult);

      const reasonResult = await generateReason(question, decisionResult.answer);
      setReason(reasonResult);
      // FIX: Added curly braces to the catch block to fix the syntax error.
    } catch (err) {
      console.error(err);
      setError('問題が発生しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-slate-200 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-xl text-center">
        <h1 className="text-5xl sm:text-7xl font-extrabold text-white mb-10 tracking-tight">
          決めてやる。
        </h1>
        
        <div className="w-full mb-10">
          <QuestionForm onAsk={handleAskQuestion} isLoading={isLoading} />
        </div>

        {error && <p className="text-red-400 mt-4">{error}</p>}
        
        {isLoading && <LoadingSpinner />}
        
        {!isLoading && decision && (
          <ResultDisplay 
            question={askedQuestion}
            decision={decision} 
            reason={reason} 
          />
        )}
      </div>
    </div>
  );
};

export default App;
