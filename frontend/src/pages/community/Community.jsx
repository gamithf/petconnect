'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Award, Heart, MessageSquare, PawPrint, PlusCircle, Share2, Users, MapPin, CalendarClock, Mic2, Bot, Briefcase } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/Card';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/Avatar';
import { Separator } from '../../components/ui/Separator';
import { Badge } from '../../components/ui/Badge';
import CreatePostDialog from '../../components/community/CreatePostDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import AiVetConsult from '../../components/community/AiVetConsult';
import { pets as allPets } from '../../lib/data';

const PostCard = ({ petName, petType, ownerName, content, imageUrl, type, tags, sitterInfo }) => {
  const getBadgeVariant = () => {
    switch (type) {
      case 'Lost': return 'destructive';
      case 'Found': return 'secondary';
      case 'Adoption': return 'default';
      case 'Sitter': return 'default';
      case 'Question': return 'outline';
      default: return null;
    }
  };

  const badgeVariant = getBadgeVariant();

  return (
    <Card className="bg-black/20 backdrop-blur-sm border border-white/10 text-white">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12 border-2 border-white/30">
            <AvatarImage src={imageUrl} alt={petName} data-ai-hint={`${petType} animal`} />
            <AvatarFallback>{petName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl font-bold">{petName || 'Community Post'}</CardTitle>
            <p className="text-sm text-gray-400">by {ownerName}</p>
          </div>
          {badgeVariant && <Badge variant={badgeVariant} className={`ml-auto ${type === 'Sitter' ? 'bg-green-500' : 'bg-green-500'}`}>{type === 'Sitter' ? 'Sitter Needed' : type}</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        {sitterInfo && (
            <div className="mb-4 p-3 bg-card/70 rounded-lg border border-border">
                <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                        <p className="text-xs text-muted-foreground">Service</p>
                        <p className="font-bold">{sitterInfo.service}</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Dates</p>
                        <p className="font-bold">{sitterInfo.dates}</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Rate</p>
                        <p className="font-bold">${sitterInfo.rate}/day</p>
                    </div>
                </div>
            </div>
        )}
        {imageUrl && type !== 'Question' && <img src={imageUrl} alt={`A ${type} post about ${petName}`} className="rounded-lg mb-4 w-full h-auto object-cover aspect-video" />}
        <p className="text-gray-200">{content}</p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map(tag => <Badge key={tag} variant="secondary" className="bg-primary/20 text-primary">#{tag}</Badge>)}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex gap-2">
            {type === 'Sitter' ? (
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Briefcase className="mr-2"/> View Details & Apply
                </Button>
            ) : (
                <>
                <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-white/10 text-gray-300">
                    <Heart className="w-4 h-4 text-red-500" /> 12
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-white/10 text-gray-300">
                    <MessageSquare className="w-4 h-4" /> 3
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-white/10 text-gray-300">
                    <Share2 className="w-4 h-4" /> Share
                </Button>
                </>
            )}
        </div>
        <span className="text-xs text-gray-500">2 hours ago</span>
      </CardFooter>
    </Card>
  );
};

const AmaCard = ({ vetName, specialty, date, time, imageUrl }) => (
    <div className="p-4 rounded-lg bg-black/20 border border-white/10 flex items-center gap-4 cursor-pointer">
        <Avatar className="w-16 h-16 border-2 border-accent">
            <AvatarImage src={imageUrl} alt={vetName} />
            <AvatarFallback>{vetName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
            <p className="text-sm text-accent font-bold">UPCOMING AMA</p>
            <h4 className="font-bold text-lg text-white">Live Q&A with {vetName}</h4>
            <p className="text-sm text-gray-300">{specialty}</p>
        </div>
        <div className="text-right">
             <p className="font-bold text-white">{date}</p>
             <p className="text-sm text-gray-400">{time}</p>
             <Button size="sm" className="mt-2 bg-accent text-accent-foreground hover:bg-accent/90">Join</Button>
        </div>
    </div>
);


export default function CommunityPage() {
  const [pets] = useState(allPets);
  const [selectedPetId, setSelectedPetId] = useState(pets[0].id);
  const [activeTab, setActiveTab] = useState('local');
  const tabsListRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef([]);

  useEffect(() => {
    const activeTabIndex = tabsRef.current.findIndex(tab => tab?.dataset.radixValue === activeTab);
    const activeTabNode = tabsRef.current[activeTabIndex];
    const tabsListRect = tabsListRef.current?.getBoundingClientRect();

    if (activeTabNode && tabsListRect) {
      const activeTabRect = activeTabNode.getBoundingClientRect();
      setIndicatorStyle({
        // Use transform for smoother animation
        width: activeTabRect.width,
        height: activeTabRect.height,
        transform: `translateX(${activeTabRect.left - tabsListRect.left}px)`,
      });
    }
  }, [activeTab]);

  // Placeholder state for the create post dialog
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const selectedPet = pets.find((p) => p.id === selectedPetId) || pets[0];

  const handlePostCreate = (data) => {
    console.log("New Post Data:", data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3AAFA9] via-[#4ca8a5] to-[#0686b4] text-white">
      <CreatePostDialog 
        isOpen={createPostOpen}
        onOpenChange={setCreatePostOpen}
        onSubmit={handlePostCreate}
      />
      <main className="container mx-auto p-4 md:p-8">
         <header className="flex justify-between items-center mb-8 md:mb-12">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8" />
              <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
                Community
              </h1>
            </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Community Feed & Q&A */}
          <div className="lg:col-span-2 space-y-8">
             <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold font-headline flex items-center gap-2"><Heart className="text-red-400"/> Community Feed</h2>
                <Button className="flex items-center cursor-pointer gap-2 bg-gray-900 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 cursor-pointer" onClick={() => setCreatePostOpen(true)}>
                  <PlusCircle className="mr-2 h-4 w-4"/> Create Post
                </Button>
              </div>

            <Tabs defaultValue="local" className="w-full" onValueChange={setActiveTab}>
              <TabsList ref={tabsListRef} className="grid w-full grid-cols-3">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-primary transition-all duration-300 ease-in-out"
                  style={indicatorStyle}
                />
                <TabsTrigger value="local" ref={el => (tabsRef.current[0] = el)}>
                  <MapPin className="mr-2 h-5 w-5"/> Local Feed
                </TabsTrigger>
                <TabsTrigger value="sitters" ref={el => (tabsRef.current[1] = el)}>
                  <Briefcase className="mr-2 h-5 w-5"/> Pet Sitters
                </TabsTrigger>
                <TabsTrigger value="following" ref={el => (tabsRef.current[2] = el)}>
                  Following
                </TabsTrigger>
              </TabsList>
              <TabsContent value="local" className="mt-6">
                <div className="space-y-6">
                  <PostCard petName="Buddy" petType="dog" ownerName="Lost & Found Pets" content="Buddy went missing near City Park (within 2km). He is very friendly but might be scared. Please contact us if you see him." imageUrl="https://placehold.co/600x400.png" type="Lost" tags={["lostdog", "goldenretriever", "citypark"]}/>
                  <PostCard petName="" petType="cat" ownerName="NewCatOwner" content="My new kitten is sneezing a lot. Is this normal or should I be concerned? We're located in the downtown area." imageUrl="" type="Question" tags={["kitten", "health", "sneezing"]}/>
                  <PostCard petName="Whiskers" petType="cat" ownerName="Local Shelter" content="Whiskers is a sweet 2-year-old cat looking for a forever home. He loves cuddles and is great with kids. Available for adoption at the city shelter." imageUrl="https://placehold.co/600x400.png" type="Adoption" tags={["adoption", "sheltercat"]}/>
                  <PostCard petName="Mochi" petType="cat" ownerName="Alice" content="Mochi just discovered the joy of sunbathing in a cardboard box. Pure bliss! #catlife" imageUrl="https://placehold.co/600x400.png" type="Story" tags={["catlife", "cute"]}/>
                </div>
              </TabsContent>
              <TabsContent value="sitters" className="mt-6">
                 <div className="space-y-6">
                    <PostCard 
                        petName="Max"
                        petType="dog" 
                        ownerName="John D." 
                        content="We're going on vacation and need a reliable sitter for our energetic German Shepherd, Max. He's well-trained and loves people. Needs someone comfortable with large dogs."
                        imageUrl="https://placehold.co/128x128.png"
                        type="Sitter"
                        sitterInfo={{ service: "House Sitting", dates: "Aug 20 - 28", rate: "50" }}
                    />
                     <PostCard 
                        petName="Lucy"
                        petType="cat" 
                        ownerName="Jane S." 
                        content="Looking for someone to do daily drop-in visits for our shy but sweet cat, Lucy. Just need to provide food, water, and clean the litter box."
                        imageUrl="https://placehold.co/128x128.png"
                        type="Sitter"
                        sitterInfo={{ service: "Drop-in Visits", dates: "Sep 5 - 10", rate: "25" }}
                    />
                 </div>
              </TabsContent>
              <TabsContent value="following" className="mt-6">
                 <div className="text-center py-12 text-gray-300">
                    <p className="text-lg">You're not following anyone yet.</p>
                    <p>Posts from users you follow will appear here.</p>
                 </div>
              </TabsContent>
            </Tabs>
            
          </div>

          {/* Sidebar */}
          <aside className="space-y-8 lg:sticky top-8 self-start">
            <section>
              <h2 className="text-3xl font-bold font-headline mb-4 flex items-center gap-2"><CalendarClock className="text-accent"/> Upcoming Events</h2>
              <div className="space-y-4">
                <AmaCard vetName="Dr. Chloe" specialty="Feline Nutritionist" date="Aug 15" time="7 PM" imageUrl="https://placehold.co/128x128.png" />
                <AmaCard vetName="Dr. Ben" specialty="Canine Behaviorist" date="Aug 22" time="6 PM" imageUrl="https://placehold.co/128x128.png" />
              </div>
            </section>
            
            <Separator className="my-8 bg-white/20"/>

             {/* <section>
              <h2 className="text-3xl font-bold font-headline mb-4 flex items-center gap-2"><Mic2 className="text-primary"/> AI Vet Consultation</h2>
              <AiVetConsult petName={selectedPet.name} />
            </section> */}
            
            {/* <section>
              <h2 className="text-3xl font-bold font-headline mb-4 flex items-center gap-2"><Award className="text-yellow-400"/> Leaderboard</h2>
              <div className="p-6 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10 text-white">
                 <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <p>1. Sarah J.</p>
                        <p className="font-bold">2,450 pts</p>
                    </div>
                     <div className="flex justify-between items-center text-accent">
                        <p className="font-bold">2. You</p>
                        <p className="font-bold">2,150 pts</p>
                    </div>
                     <div className="flex justify-between items-center">
                        <p>3. Mike L.</p>
                        <p className="font-bold">1,980 pts</p>
                    </div>
                 </div>
              </div>
            </section> */}

          </aside>
        </div>
      </main>
    </div>
  );
}