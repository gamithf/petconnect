import React, { useState } from 'react';
import { Wand2, BellRing, Loader2 } from 'lucide-react';

const getPersonalizedSmartReminders = async (pet) => {
    console.log(`Generating reminders for ${pet.name}`);
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
        reminders: [
            `It's time to refill ${pet.name}'s flea and tick medication for next month.`,
            `Based on ${pet.name}'s breed (${pet.breed || 'their breed'}), regular ear cleanings are recommended to prevent infections.`,
            `Consider scheduling ${pet.name}'s next annual check-up.`
        ]
    };
};

const Card = ({ children, className = "" }) => (
    <div className={`bg-black/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-white border border-white/10 ${className}`}>
        {children}
    </div>
);
const Skeleton = ({ className = "" }) => <div className={`bg-white/10 animate-pulse rounded-md ${className}`}></div>;

export default function SmartReminders({ pet }) {
    const [reminders, setReminders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateReminders = async () => {
        setIsLoading(true);
        setReminders([]);
        try {
            const result = await getPersonalizedSmartReminders(pet);
            setReminders(result.reminders);
        } catch (error) {
            console.error('Failed to generate reminders:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="sticky top-8">
            <header>
                <h3 className="flex items-center gap-2 text-2xl font-bold text-gray-200">
                    <Wand2 className="text-yellow-300" />
                    <span>Smart Reminders</span>
                </h3>
                <p className="text-gray-300 mt-1">
                    AI-generated health reminders for {pet.name}.
                </p>
            </header>
            <div className="mt-6">
                {isLoading ? (
                    <div className="space-y-3">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-5/6" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                ) : reminders.length > 0 ? (
                    <ul className="space-y-3">
                        {reminders.map((reminder, index) => (
                            <li key={index} className="flex items-start gap-3 p-3 rounded-md bg-yellow-400/10 border border-yellow-400/20">
                                <BellRing className="h-5 w-5 mt-1 text-yellow-300 flex-shrink-0" />
                                <span className="text-gray-200">{reminder}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-4">
                        <p className="mb-4 text-gray-300">Click the button to scan for upcoming events and generate reminders for {pet.name}.</p>
                        <button onClick={handleGenerateReminders} disabled={isLoading} className="flex w-full items-center justify-center gap-2 bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-200 font-semibold py-2.5 px-6 cursor-pointer rounded-lg shadow-lg transition-all duration-300">
                            {isLoading ? <Loader2 className="animate-spin" /> : <Wand2 />}
                            Generate Reminders
                        </button>
                    </div>
                )}

                {reminders.length > 0 && (
                    <button onClick={handleGenerateReminders} disabled={isLoading} className="w-full mt-6 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
                        {isLoading ? <Loader2 className="animate-spin" /> : <Wand2 />}
                        Regenerate
                    </button>
                )}
            </div>
        </Card>
    );
}