import React, {useState} from 'react';
import { Stethoscope } from 'lucide-react';
import { format } from 'date-fns';

// Simple Accordion replacement
const Accordion = ({ children }) => <div className="space-y-2">{children}</div>;
const AccordionItem = ({ children }) => <div className="rounded-lg border bg-black/30 px-4">{children}</div>;
const AccordionTrigger = ({ children, onClick }) => <button onClick={onClick} className="w-full flex justify-between items-center py-4 font-bold text-left">{children}</button>;
const AccordionContent = ({ children, isOpen }) => isOpen ? <div className="pb-4 pt-2 border-t border-white/20">{children}</div> : null;

export default function HealthRecords({ pet }) {
    const [openItems, setOpenItems] = useState([]);

    const toggleItem = (id) => {
        setOpenItems(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
    };
    
    const sortedTimeline = [...pet.healthTimeline].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="bg-black/20 ...">
            <header className="p-6"><h3 className="..."><Stethoscope /><span>Medical History</span></h3></header>
            <div className="p-6 pt-0">
                {sortedTimeline.length > 0 ? (
                    <Accordion>
                        {sortedTimeline.map((event) => (
                            <AccordionItem key={event._id}>
                                <AccordionTrigger onClick={() => toggleItem(event._id)}>
                                    <h4 className="text-lg font-bold">{event.title}</h4>
                                    <p className="text-sm text-gray-400">{format(new Date(event.date), 'MMMM d, yyyy')}</p>
                                </AccordionTrigger>
                                <AccordionContent isOpen={openItems.includes(event._id)}>
                                    <p className="text-gray-300">{event.details || 'No additional details.'}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                ) : <div className="text-center ..."><p>No health events recorded yet.</p></div>}
            </div>
        </div>
    );
}