import React, { useMemo } from 'react';
import { Target } from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from 'recharts';

// API Comment: The data for both charts should come from an API.
// API: GET /api/pets/{pet.id}/wellness
// This endpoint would return the overall score and the breakdown for the radar chart.
const mockChartData = [
  { subject: 'Nutrition', A: 85, fullMark: 100 },
  { subject: 'Activity', A: 70, fullMark: 100 },
  { subject: 'Vaccinations', A: 95, fullMark: 100 },
  { subject: 'Check-ups', A: 90, fullMark: 100 },
  { subject: 'Mental Health', A: 75, fullMark: 100 },
];

const Card = ({ children, className = "" }) => (
  <div className={`bg-black/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-white border border-white/10 ${className}`}>
    {children}
  </div>
);


export default function WellnessScore({ pet }) {
  // This calculation would be replaced by the API response.
  const wellnessScore = useMemo(() => {
    let score = 10; // Base score from API
    // The API would perform this logic on the backend.
    return Math.min(100, Math.round(score));
  }, [pet]);

  const scoreData = [
    { name: 'filled', value: wellnessScore, fill: '#DEF2F1' }, // Filled portion
    { name: 'remaining', value: 100 - wellnessScore, fill: 'rgba(255,255,255,0.1)' }, // Empty portion
  ];
  const chartData = mockChartData; // This would come from the API response

  return (
    <Card>
      <header>
        <h3 className="flex items-center gap-2 text-3xl font-bold text-gray-200">
          <Target className="text-[#DEF2F1]" />
          <span>{pet.name}'s Wellness Score</span>
        </h3>
        <p className="text-gray-300 mt-1">
          A dynamic overview of your pet's health pillars.
        </p>
      </header>
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative h-64 w-64 mx-auto">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                barSize={20}
                data={scoreData}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar dataKey="value" cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold text-white">{wellnessScore}</span>
              <span className="text-lg text-gray-400">out of 100</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <defs>
                  <linearGradient id="colorRadar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#DEF2F1" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#DEF2F1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <PolarGrid stroke="rgba(255, 255, 255, 0.2)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'white' }} />
                <Radar name={pet.name} dataKey="A" stroke="#DEF2F1" fill="url(#colorRadar)" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Card>
  );
}