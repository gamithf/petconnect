import React, { useState, useEffect } from 'react';
import { Lightbulb, Info, Heart, Bone } from 'lucide-react';

// Mock API function to simulate fetching data
const getHealthRecommendations = async (pet) => {
    console.log(`Fetching recommendations for ${pet.name}`);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
    return {
        recommendations: [
            { type: 'breed-specific', recommendation: 'As a Golden Retriever, Buddy is prone to hip dysplasia. Ensure he maintains a healthy weight to reduce stress on his joints.', details: { link: '#' } },
            { type: 'nutrition', recommendation: 'Consider adding Omega-3 supplements, like fish oil, to Buddy\'s diet to support his coat and joint health.', details: null },
            { type: 'general-health', recommendation: 'Your daily journal entries show consistent "Happy" moods. Keep up the great work with his enrichment and activity levels!', details: null },
        ]
    };
};

// Style mapping for different recommendation types
const recommendationStyles = {
    "breed-specific": { icon: <Info />, className: 'bg-blue-500/10 border-blue-400/30 text-blue-300' },
    "vaccination": { icon: <Heart />, className: 'bg-red-500/10 border-red-400/30 text-red-300' },
    "nutrition": { icon: <Bone />, className: 'bg-yellow-500/10 border-yellow-400/30 text-yellow-300' },
    "activity": { icon: <Bone />, className: 'bg-orange-500/10 border-orange-400/30 text-orange-300' },
    "general-health": { icon: <Heart />, className: 'bg-green-500/10 border-green-400/30 text-green-300' },
    "default": { icon: <Info />, className: 'bg-gray-500/10 border-gray-400/30 text-gray-300' }
};

const Card = ({ children, className = "" }) => (
    <div className={`bg-black/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-white border border-white/10 ${className}`}>
        {children}
    </div>
);
const Skeleton = ({ className = "" }) => <div className={`bg-white/10 animate-pulse rounded-md ${className}`}></div>;

export default function ProactiveHealthDashboard({ pet }) {
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            setIsLoading(true);
            try {
                // API Comment: This is where you call your backend to get AI recommendations.
                // API: GET /api/pets/{pet.id}/recommendations
                const result = await getHealthRecommendations(pet);
                setRecommendations(result.recommendations);
            } catch (error) {
                console.error("Failed to fetch health recommendations:", error);
                alert("Could not fetch AI-powered health recommendations."); // Replace with toast
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendations();
    }, [pet]);

    return (
        <Card>
            <header>
                <h3 className="flex items-center gap-2 text-3xl font-bold text-gray-200">
                    <Lightbulb className="text-yellow-300" />
                    <span>Proactive Health Alerts</span>
                </h3>
                <p className="text-gray-300 mt-1">
                    AI-driven insights to keep {pet.name} healthy and happy.
                </p>
            </header>
            <div className="mt-6">
                {isLoading ? (
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-start space-x-4 p-4">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-1/4" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {recommendations.map((rec, index) => {
                            const style = recommendationStyles[rec.type] || recommendationStyles.default;
                            return (
                                <div key={index} className={`flex items-start gap-4 p-4 rounded-lg border ${style.className}`}>
                                    <div className="flex-shrink-0 mt-1 h-6 w-6">{style.icon}</div>
                                    <div>
                                        <h4 className="font-bold text-lg capitalize text-white">{rec.type.replace(/-/g, ' ')} Tip</h4>
                                        <p className="text-gray-300">{rec.recommendation}</p>
                                        {rec.details?.link && (
                                            <a href={rec.details.link} target="_blank" rel="noopener noreferrer" className="inline-block text-[#DEF2F1] hover:underline mt-2 text-sm font-semibold">
                                                Learn More &rarr;
                                            </a>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </Card>
    );
}