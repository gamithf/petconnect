import React, { useState } from 'react';
import { BrainCircuit, Loader2, Wand2, Lightbulb } from 'lucide-react';

// Mock API function. In your real app, this would be a fetch call.
const getTrainingPlan = async (pet, goalLabel) => {
    console.log(`Generating plan for ${pet.name} to '${goalLabel}'`);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
    return {
        planTitle: `Training Plan: ${goalLabel}`,
        introduction: `Here is a personalized nutrition plan to keep ${pet.name} healthy, energetic, and at an ideal weight. A balanced diet is the cornerstone of their well-being!`,
        steps: [
            {
                "step": 1,
                "title": "Choose the Right Food",
                "details": `The foundation of ${pet.name}'s diet should be a high-quality commercial dog food appropriate for their age and size. Consult your vet for brand recommendations.`,
                "tip": "Look for a named protein source (like chicken or lamb) as the first ingredient, and avoid fillers like corn and soy."
            },
            {
                "step": 2,
                "title": "Portion Control is Key",
                "details": `Measure ${pet.name}'s food for each meal to prevent overfeeding. The recommended serving size on the bag is a good starting point, but adjust based on activity level.`,
                "tip": "Use a proper measuring cup for accuracy. A coffee mug or scoop can vary in size, leading to inconsistent portions."
            },
            {
                "step": 3,
                "title": "Establish a Feeding Schedule",
                "details": `Feed ${pet.name} two measured meals a day, ideally in the morning and evening. A consistent routine helps regulate their metabolism and digestion.`,
                "tip": "Avoid 'free-feeding' (leaving a full bowl of food out all day) as it often leads to weight gain."
            },
            {
                "step": 4,
                "title": "Smart Treating & Hydration",
                "details": `Treats should be less than 10% of ${pet.name}'s daily diet. Also, ensure a bowl of fresh, clean water is accessible at all times.`,
                "tip": "Healthy treat options include baby carrots, green beans, blueberries, or small pieces of lean cooked meat."
            }
        ]
    };
};

const Card = ({ children, className = "" }) => (
    <div className={`bg-black/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-white border border-white/10 ${className}`}>
        {children}
    </div>
);
const Skeleton = ({ className = "" }) => <div className={`bg-white/10 animate-pulse rounded-md ${className}`}></div>;

const trainingGoals = [
    { value: 'nutrition-diet-plan', label: 'Nutrition diet plan' },
    { value: 'stop-jumping', label: 'Stop jumping on guests' },
    { value: 'leash-pulling', label: 'Reduce leash pulling' },
    { value: 'barking-at-door', label: 'Decrease barking at the door' },
    { value: 'basic-obedience', label: 'Teach basic commands (sit, stay)' },
    { value: 'crate-training', label: 'Crate training acceptance' },
];

export default function AITrainingCoach({ pet }) {
    const [selectedGoal, setSelectedGoal] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [plan, setPlan] = useState(null);

    const handleGeneratePlan = async () => {
        if (!selectedGoal) {
            return;
        }
        setIsLoading(true);
        setPlan(null);
        try {
            // API Comment: This is where you call your backend to generate the training plan.
            // API: POST /api/training/generate
            // Body: { petId: pet.id, goal: selectedGoal }
            const goalLabel = trainingGoals.find(g => g.value === selectedGoal)?.label || '';
            const result = await getTrainingPlan(pet, goalLabel);
            setPlan(result);
        } catch (error) {
            console.error("Failed to generate training plan:", error);
            alert("Could not generate a training plan. Please try again."); // Replace with toast
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <header>
                <h3 className="flex items-center gap-2 text-3xl font-bold text-gray-200">
                    <BrainCircuit className="text-[#DEF2F1]" />
                    <span>AI Training Coach</span>
                </h3>
                <p className="text-gray-300 mt-1">
                    Personalized training plans for {pet.name} to build skills and confidence.
                </p>
            </header>
            <div className="mt-6 space-y-6">
                <div className="flex flex-col md:flex-row gap-4 items-center p-4 bg-black/20 rounded-lg">
                    <div className="flex-1 w-full">
                        <label className="text-sm font-medium mb-2 block">What do you want to work on?</label>
                        <select
                            value={selectedGoal}
                            onChange={(e) => setSelectedGoal(e.target.value)}
                            className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-[#DEF2F1] focus:outline-none"
                        >
                            <option value="" disabled>Choose a training goal...</option>
                            {trainingGoals.map(goal => (
                                <option key={goal.value} value={goal.value}>{goal.label}</option>
                            ))}
                        </select>
                    </div>
                    <button onClick={handleGeneratePlan} disabled={isLoading || !selectedGoal} className="w-full md:w-auto cursor-pointer mt-4 md:mt-0 self-end flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-6 rounded-lg shadow-lg transition-all duration-300">
                        {isLoading ? <Loader2 className="animate-spin" /> : <Wand2 />}
                        Generate Plan
                    </button>
                </div>

                {isLoading && (
                    <div className="space-y-4 pt-4">
                        <Skeleton className="h-8 w-1/2" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                )}

                {plan && (
                    <div className="space-y-4 animate-fade-in">
                        <h3 className="text-2xl font-bold text-[#DEF2F1]">{plan.planTitle}</h3>
                        <p className="text-gray-300">{plan.introduction}</p>
                        <div className="space-y-4">
                            {plan.steps.map(step => (
                                <div key={step.step} className="p-4 bg-black/30 rounded-lg border border-white/10">
                                    <h4 className="font-bold text-lg text-white">Step {step.step}: {step.title}</h4>
                                    <p className="mt-1 text-gray-300 whitespace-pre-wrap">{step.details}</p>
                                    {step.tip && (
                                        <div className="mt-3 p-3 bg-yellow-400/10 rounded-md flex items-start gap-3 border border-yellow-400/20">
                                            <Lightbulb className="h-5 w-5 text-yellow-300 mt-1 flex-shrink-0" />
                                            <div>
                                                <h5 className="font-semibold text-yellow-300">Pro Tip</h5>
                                                <p className="text-sm text-gray-300">{step.tip}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
}