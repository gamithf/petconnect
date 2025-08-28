import React from 'react';
import { HeartCrack, HeartHandshake, ToyBrick } from 'lucide-react';

export default function BehavioralNotes({ pet }) {
    const notes = pet.behavioralNotes;
    return (
        <div className="bg-black/20 ...">
            <header className="p-6">
                <h3 className="..."><ToyBrick /><span>Behavioral Notes & Quirks</span></h3>
            </header>
            <div className="p-6 pt-0 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="... text-green-400"><HeartHandshake size={20}/> Likes</h4>
                        <ul className="...">{notes?.likes?.length > 0 ? notes.likes.map((item, i) => <li key={i}>{item}</li>) : <li>Not specified.</li>}</ul>
                    </div>
                    <div>
                        <h4 className="... text-red-400"><HeartCrack size={20}/> Dislikes</h4>
                        <ul className="...">{notes?.dislikes?.length > 0 ? notes.dislikes.map((item, i) => <li key={i}>{item}</li>) : <li>Not specified.</li>}</ul>
                    </div>
                </div>
                <div className="pt-4">
                    <h4 className="... text-yellow-400">General Notes</h4>
                    <p className="...">{notes?.general || 'No general notes available.'}</p>
                </div>
            </div>
        </div>
    );
}