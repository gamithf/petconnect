'use client';

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Stethoscope, Home, Search, MapPin, Star, ChevronDown, Check } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { clinics as allClinics } from '../../lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/Popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../../components/ui/Command';
import { cn } from '../../lib/utils';

const allServices = Array.from(new Set(allClinics.flatMap(c => c.services)));

export default function VetSearchPage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedServices, setSelectedServices] = useState([]);
    
    const filteredClinics = allClinics.filter(clinic => {
        const matchesSearch = clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              clinic.address.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesServices = selectedServices.length === 0 || 
                                selectedServices.every(service => clinic.services.includes(service));
        return matchesSearch && matchesServices;
    });

    const toggleService = (service) => {
        setSelectedServices(prev => 
            prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#3AAFA9] via-[#4ca8a5] to-[#0686b4] text-white">
            <main className="container mx-auto p-4 md:p-8">
                {/* --- UPDATED HEADER --- */}
                <header className="flex justify-between items-center mb-8 md:mb-12">
                    <div className="flex items-center gap-3">
                        <Stethoscope className="w-8 h-8 text-cyan-200" />
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                            Find a Vet
                        </h1>
                    </div>
                    <nav>
                        <Link to="/">
                            <Button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300">
                                <Home className="h-4 w-4" />
                                Dashboard
                            </Button>
                        </Link>
                    </nav>
                </header>

                {/* --- UPDATED SEARCH AND FILTER BAR --- */}
                <Card className="bg-black/20 backdrop-blur-lg border border-white/10 text-white mb-8 shadow-xl">
                    <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-grow w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input 
                                placeholder="Search by clinic name or address..." 
                                className="pl-12 h-12 text-base bg-white/5 border-white/10 rounded-full focus:ring-2 focus:ring-cyan-400 placeholder:text-gray-400"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                        
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full md:w-auto h-12 text-base justify-between bg-white/10 border-white/10 hover:bg-white/20 hover:text-white rounded-full">
                                    Services {selectedServices.length > 0 && <span className="ml-2 bg-cyan-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{selectedServices.length}</span>}
                                    <ChevronDown className="ml-2 h-4 w-4 opacity-70" />
                                </Button>
                            </PopoverTrigger>
                            {/* --- FIX: CUSTOM STYLING FOR POPOVER AND COMMAND ITEMS --- */}
                            <PopoverContent className="w-[250px] p-0 bg-slate-800/80 backdrop-blur-md border-slate-700 text-white shadow-2xl" align="end">
                                <Command>
                                    <CommandInput placeholder="Filter services..." className="bg-transparent border-b border-slate-700 focus:ring-0" />
                                    <CommandList>
                                        <CommandEmpty>No service found.</CommandEmpty>
                                        <CommandGroup>
                                            {allServices.map(service => {
                                                const isSelected = selectedServices.includes(service);
                                                return (
                                                    <CommandItem
                                                        key={service}
                                                        onSelect={() => toggleService(service)}
                                                        className="cursor-pointer hover:bg-white/10"
                                                    >
                                                        <div className={cn(
                                                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border transition-colors",
                                                            isSelected ? "bg-cyan-500 border-cyan-400" : "bg-transparent border-gray-500"
                                                        )}>
                                                          <Check className={cn("h-4 w-4", isSelected ? "opacity-100" : "opacity-0")} />
                                                        </div>
                                                        <span>{service}</span>
                                                    </CommandItem>
                                                );
                                            })}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* --- UPDATED CLINICS LIST --- */}
                    <div className="lg:col-span-2 space-y-6">
                        {filteredClinics.map(clinic => (
                            // Replaced <button> with <Link> for semantic navigation
                            <Link to={`/vets/${clinic.id}`} key={clinic.id} className="block group">
                                <Card className="bg-black/20 backdrop-blur-lg border border-white/10 text-white hover:border-cyan-400/50 transition-all duration-300 shadow-lg overflow-hidden">
                                    <div className="flex flex-col md:flex-row">
                                        <div className="w-full md:w-1/3 overflow-hidden">
                                            <img src={clinic.imageUrl} alt={clinic.name} className="w-full h-48 md:h-full object-cover transition-transform duration-300 group-hover:scale-105"/>
                                        </div>
                                        <div className="flex-1 p-6">
                                            <p className="text-gray-300 flex items-center gap-2 mb-2 text-sm"><MapPin size={14}/> {clinic.address}</p>
                                            <CardTitle className="text-2xl font-bold mb-3 group-hover:text-cyan-300 transition-colors">{clinic.name}</CardTitle>
                                            
                                            <div className="flex items-center gap-2 mb-4 text-sm">
                                                <div className="flex items-center gap-1 bg-black/30 rounded-full px-3 py-1">
                                                    <Star className="text-yellow-400 h-4 w-4" fill="currentColor" />
                                                    <span className="font-bold text-white">{clinic.rating}</span>
                                                </div>
                                                <span className="text-gray-300">({clinic.reviewCount} reviews)</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {clinic.services.slice(0, 4).map(service => (
                                                    <Badge key={service} className="bg-teal-400/10 text-teal-200 border-none">{service}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                         {filteredClinics.length === 0 && (
                            <Card className="bg-black/20 backdrop-blur-lg border border-white/10 text-white">
                                <CardContent className="p-12 text-center text-gray-300 flex flex-col items-center">
                                    <SearchX className="h-12 w-12 text-cyan-300/50 mb-4"/>
                                    <h3 className="text-xl font-semibold text-white">No Clinics Found</h3>
                                    <p>Try adjusting your search terms or filters.</p>
                                </CardContent>
                            </Card>
                         )}
                    </div>
                    {/* --- UPDATED MAP --- */}
                    <aside className="lg:sticky top-8 self-start">
                         <Card className="bg-black/20 backdrop-blur-lg border border-white/10 text-white shadow-xl">
                             <CardHeader>
                                 <CardTitle className="text-xl font-bold">Map View</CardTitle>
                             </CardHeader>
                             <CardContent>
                                 <div className="aspect-square bg-gray-700/50 rounded-lg overflow-hidden border border-white/10">
                                    <img src="https://placehold.co/400x400.png" alt="Map placeholder" className="w-full h-full object-cover opacity-80"/>
                                 </div>
                             </CardContent>
                         </Card>
                    </aside>
                </div>
            </main>
        </div>
    );
}