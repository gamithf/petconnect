import React, { useState, useEffect } from 'react';
import { AlertTriangle, Sparkles, CheckCircle, Info, Wand2, Loader2 } from 'lucide-react';

const insightIcons = {
    positive: <CheckCircle className="text-green-400" />,
    negative: <AlertTriangle className="text-red-500" />,
    neutral: <Info className="text-blue-400" />,
};

const insightBorders = {
    positive: 'border-green-400/30 bg-green-500/10',
    negative: 'border-red-500/30 bg-red-500/10',
    neutral: 'border-blue-400/30 bg-blue-500/10',
};

// Mock function for getting insights. Replace with your actual API call.
const getJournalInsights = async (pet, entries) => {
    console.log("Fetching insights for", pet.name);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (entries.length < 3) {
        return { insights: [] };
    }
    // Return mock data
    return {
        insights: [
            { type: 'positive', insight: 'Consistent Energy Levels', details: 'Buddy has shown consistently high energy levels for the past 3 days.' },
            { type: 'neutral', insight: 'Appetite Fluctuation', details: 'Appetite was marked as "Partial" on one occasion this week. Continue monitoring.' },
        ]
    };
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-black/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-white border border-white/10 ${className}`}>
    {children}
  </div>
);

const Skeleton = ({ className = "" }) => <div className={`bg-white/10 animate-pulse rounded-md ${className}`}></div>;

export default function JournalInsights({ pet }) {
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const hasJournalEntries = pet.journal && pet.journal.length > 0;

  const handleGenerateInsights = async () => {
      setIsLoading(true);
      setInsights([]);

      // API Comment: This is where you would call your backend AI service.
      // API: POST /api/journal/insights, Body: { petId: pet.id }
      // For now, we simulate the call and use personalized mock data.
      setTimeout(() => {
          const mockInsights = [
              { type: 'positive', insight: 'Consistent Energy Levels', details: `${pet.name} has shown consistently high energy levels. Keep up the great playtime!` },
              { type: 'neutral', insight: 'Appetite Variation', details: `We've noticed a slight variation in ${pet.name}'s appetite. Continue to monitor their food intake.` },
          ];
          setInsights(mockInsights);
          setIsLoading(false);
      }, 1500); // Simulate AI thinking for 1.5 seconds
  };

  // const getIconForType = (type) => insightIcons[type] || <Info className="text-blue-400" />;

  return (
    <Card>
      <header>
        <h3 className="flex items-center gap-2 text-2xl font-bold text-gray-200">
          <Sparkles className="text-yellow-300" />
          <span>Journal Insights</span>
        </h3>
        <p className="text-gray-300 mt-1">
          AI-powered analysis of {pet.name}'s daily logs.
        </p>
      </header>
      <div className="mt-6">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-start space-x-4 p-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : insights.length > 0 ? (
          <div className="space-y-4 animate-fade-in">
            {insights.map((item, index) => (
              <div key={index} className={`flex items-start gap-4 p-3 rounded-lg border ${insightBorders[item.type]}`}>
                <div className="pt-1">{getIconForType(item.type)}</div>
                <div>
                  <h4 className="font-bold text-base text-white">{item.insight}</h4>
                  <p className="text-sm text-gray-300">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
             <p className="mb-4 text-gray-300">
                {hasJournalEntries 
                  ? `Analyze ${pet.name}'s recent journal entries to uncover trends.` 
                  : `Log at least one journal entry to enable AI insights.`}
              </p>
             <button onClick={handleGenerateInsights} disabled={!hasJournalEntries || isLoading} className="flex w-full items-center justify-center gap-2 bg-gray-900 ...">
                {isLoading ? <Loader2 className="animate-spin" /> : <Wand2 />}
                Generate Insights
              </button>
          </div>
        )}
      </div>
    </Card>
  );
}