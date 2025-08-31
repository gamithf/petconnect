import React from 'react';
import { Button } from '../ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';

const AmaCard = ({ event }) => (
    <div className="p-4 rounded-lg bg-black/20 border border-border flex items-center gap-4 transition-all hover:border-primary/50">
        <Avatar className="w-16 h-16 border-2 border-primary">
            <AvatarImage src={event.imageUrl} alt={event.vetName} />
            <AvatarFallback>{event.vetName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
            <p className="text-sm text-primary font-bold">UPCOMING AMA</p>
            <h4 className="font-bold text-lg text-white">Live Q&A with {event.vetName}</h4>
            <p className="text-sm text-gray-300">{event.specialty}</p>
        </div>
        <div className="text-right">
             <p className="font-bold text-white">{event.date}</p>
             <p className="text-sm text-gray-400">{event.time}</p>
             <Button size="sm" className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90">Join</Button>
        </div>
    </div>
);

export default AmaCard;