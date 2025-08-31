// ClinicDetailPage.jsx

'use client';

import { Link, useParams, useNavigate } from "react-router-dom"; 
import { clinics } from '../../lib/data';
import { Button } from '../../components/ui/Button';
import { Stethoscope, Home, MapPin, Star, Clock, Users, Phone, ChevronLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Separator } from '../../components/ui/Separator';

const StarRating = ({ rating, reviewCount }) => (
    <div className="flex items-center gap-2">
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className={i < Math.round(rating) ? 'text-yellow-400 fill-current' : 'text-gray-500'} size={20} />
            ))}
        </div>
        <span className="font-bold text-lg">{rating.toFixed(1)}</span>
        {/* Conditionally render review count to reuse component easily */}
        {reviewCount > 0 && <span className="text-muted-foreground">({reviewCount} reviews)</span>}
    </div>
);


export default function ClinicDetailPage() {
    const { clinicId } = useParams(); 
    const clinic = clinics.find(c => c.id ===Number(clinicId));

    if (!clinic) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#3AAFA9] to-[#0686b4] text-white flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">404 - Clinic Not Found</h1>
                <p className="text-lg mb-8">We couldn't find the clinic you were looking for.</p>
                <Button asChild>
                    <Link to="/vets">
                        <ChevronLeft className="mr-2" />
                        Back to Search
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#3AAFA9] via-[#4ca8a5] to-[#0686b4] text-white">
            <main className="container mx-auto p-4 md:p-8">
                <header className="flex justify-between items-center mb-8">
                    <Button variant="outline" asChild className="bg-white/10 border-white/20 hover:bg-white/20 hover:text-white rounded-full">
                         <Link href="/vet-search">
                            <ChevronLeft className="mr-2" />
                            Back to Search
                         </Link>
                    </Button>
                    <nav>
                        <Link href="/">
                            <Button variant="outline">
                                <Home className="mr-2" />
                                Dashboard
                            </Button>
                        </Link>
                    </nav>
                </header>

                <Card className="bg-black/20 backdrop-blur-sm border border-white/10 text-white overflow-hidden">
                    <div className="relative">
                        <img src={clinic.imageUrl} alt={clinic.name} data-ai-hint="vet clinic building" className="w-full h-48 md:h-64 object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-6">
                             <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">{clinic.name}</h1>
                             <p className="text-muted-foreground flex items-center gap-2 mt-1"><MapPin size={16}/> {clinic.address}</p>
                        </div>
                    </div>
                    
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-8">
                            {/* About & Services */}
                            <section>
                                <p className="mb-4">Welcome to {clinic.name}, where we provide top-tier compassionate care for your beloved pets. Our state-of-the-art facility and expert staff are here to ensure your pet lives a long, healthy, and happy life.</p>
                                <div className="mb-6">
                                     <StarRating rating={clinic.rating} reviewCount={clinic.reviewCount} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 font-headline text-primary">Services Offered</h3>
                                <div className="flex flex-wrap gap-2">
                                    {clinic.services.map(service => (
                                        <Badge key={service} variant="secondary" className="text-base py-1 px-3">{service}</Badge>
                                    ))}
                                </div>
                            </section>

                            <Separator/>

                             {/* Vets */}
                            <section>
                                <h3 className="text-xl font-bold mb-4 font-headline text-primary flex items-center gap-2"><Users/> Our Veterinarians</h3>
                                <div className="space-y-4">
                                    {clinic.vets.map(vet => (
                                        <div key={vet.id} className="flex items-center gap-4 p-3 bg-card/60 rounded-lg">
                                            <Avatar className="h-16 w-16">
                                                <AvatarImage src={vet.imageUrl} alt={vet.name} data-ai-hint="doctor portrait"/>
                                                <AvatarFallback>{vet.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-bold text-lg">{vet.name}</p>
                                                <p className="text-muted-foreground">{vet.specialty}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                             <Separator/>

                            {/* Reviews */}
                            <section>
                                <h3 className="text-xl font-bold mb-4 font-headline text-primary">What Our Clients Say</h3>
                                <div className="space-y-4">
                                    {clinic.reviews.map((review, index) => (
                                        <div key={index} className="p-4 bg-card/60 rounded-lg">
                                            <div className="flex items-center gap-2 mb-1">
                                                {/* Set reviewCount to 0 to hide the count */}
                                                <StarRating rating={review.rating} reviewCount={0} />
                                            </div>
                                            <p className="text-gray-300">"{review.text}"</p>
                                            <p className="text-right text-sm text-muted-foreground mt-2">- {review.author}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                        
                        {/* Sidebar Info */}
                        <aside className="space-y-6">
                             <Card className="bg-card/80 border-border">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2"><Clock /> Hours</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm">
                                    <div className="flex justify-between"><span>Weekdays</span> <span>{clinic.hours.weekdays}</span></div>
                                    <div className="flex justify-between"><span>Saturday</span> <span>{clinic.hours.saturday}</span></div>
                                    <div className="flex justify-between"><span>Sunday</span> <span className={clinic.hours.sunday === 'Closed' ? 'text-red-400' : ''}>{clinic.hours.sunday}</span></div>
                                </CardContent>
                             </Card>
                             <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg" asChild>
                                <Link href={`/vets/${clinic.id}/book`}>Book an Appointment</Link>
                             </Button>
                             <Button size="lg" variant="outline" className="w-full text-lg" asChild>
                                <a href={`tel:123-456-7890`}><Phone className="mr-2"/> Call Clinic</a>
                            </Button>
                        </aside>
                    </div>
                </Card>
            </main>
        </div>
    );
}