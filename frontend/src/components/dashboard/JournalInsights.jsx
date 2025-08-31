import React, { useState, useEffect } from 'react';
import { AlertTriangle, Sparkles, CheckCircle, Info, Wand2, Loader2, Lightbulb } from 'lucide-react';

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

const getPersonalizedHealthInsights = async (pet) => {
    console.log(`Generating insights for ${pet.name}`);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    return {
        insights: [
            `${pet.name}'s recent activity levels are above average for a ${pet.breed || 'dog of their breed'}. This is a great sign of good health!`,
            `Based on their age and breed, consider incorporating joint supplements like glucosamine to support long-term mobility.`,
            `You've logged 3 park visits this month. Maintaining this level of socialization is excellent for ${pet.name}'s mental well-being.`
        ]
    };
};

const Skeleton = ({ className = "" }) => <div className={`bg-white/10 animate-pulse rounded-md ${className}`}></div>;

export default function JournalInsights({ pet }) {
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
   <Card className="sticky top-8">
            <header>
                <h3 className="flex items-center gap-2 text-2xl font-bold text-gray-200">
                    <Wand2 className="text-cyan-300" /> {/* Changed color for variety */}
                    <span>Health Insights</span>
                </h3>
                <p className="text-gray-300 mt-1">
                    AI-generated wellness insights for {pet.name}.
                </p>
            </header>
            <div className="flex-col gap-6">
                {isLoading ? (
                    <div className="space-y-3">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-5/6" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                ) : insights.length > 0 ? (
                    <ul className="space-y-3">
                        {insights.map((item, index) => (
                           <li key={index} className={`flex items-start gap-4 p-4 rounded-lg border ${insightBorders[item.type] || insightBorders.neutral}`}>
                                {insightIcons[item.type] || insightIcons.neutral}
                                <div>
                                    <h4 className="font-semibold text-gray-100">{item.insight}</h4>
                                    <p className="text-gray-300 text-sm">{item.details}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-4">
                        <p className="mb-4 text-gray-300">Analyze {pet.name}'s health data and activity to generate personalized wellness insights.</p>
                        <button onClick={handleGenerateInsights} disabled={isLoading} className="flex w-full items-center justify-center gap-2 bg-cyan-400/30 hover:bg-cyan-400/20 text-cyan-200 font-semibold py-2.5 px-6 cursor-pointer rounded-lg shadow-lg transition-all duration-300">
                            {isLoading ? <Loader2 className="animate-spin" /> : <Wand2 />}
                            Generate Insights
                        </button>
                    </div>
                )}

                {insights.length > 0 && (
                    <button onClick={handleGenerateInsights} disabled={isLoading} className="w-full mt-6 flex items-center justify-center gap-2 bg-white/20 hover:bg-white/10 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
                        {isLoading ? <Loader2 className="animate-spin" /> : <Wand2 />}
                        Regenerate Insights
                    </button>
                )}
            </div>
        </Card>
  );
}