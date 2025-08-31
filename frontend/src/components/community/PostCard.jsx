import React from 'react';
import { Heart, MessageSquare, Share2, Briefcase } from 'lucide-react';
import { Button } from '../ui/Button'; // Assuming you have these UI components
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';
import { Badge } from '../ui/Badge';

const PostCard = ({ post }) => {
  // Destructure post data
  const { petName, ownerName, content, imageUrl, type, tags, sitterInfo, likes, comments, timestamp } = post;

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
    <Card className="bg-black/20 backdrop-blur-sm border-border text-white transition-transform duration-300 hover:scale-[1.02] hover:border-primary/50">
      <CardHeader>
        <div className="flex items-start gap-4">
          <Avatar className="w-12 h-12 border-2 border-white/30">
            <AvatarImage src={imageUrl} alt={petName} />
            <AvatarFallback>{petName ? petName.charAt(0) : 'P'}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-xl font-bold">{petName || 'Community Post'}</CardTitle>
            <p className="text-sm text-gray-400">by {ownerName}</p>
          </div>
          {badgeVariant && (
            <Badge variant={badgeVariant} className={`ml-auto ${type === 'Sitter' ? 'bg-green-500 text-white' : ''}`}>
              {type === 'Sitter' ? 'Sitter Needed' : type}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {sitterInfo && (
          <div className="mb-4 p-3 bg-card/70 rounded-lg border border-border">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-xs text-gray-400">Service</p>
                <p className="font-bold">{sitterInfo.service}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Dates</p>
                <p className="font-bold">{sitterInfo.dates}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Rate</p>
                <p className="font-bold">${sitterInfo.rate}/day</p>
              </div>
            </div>
          </div>
        )}
        {imageUrl && type !== 'Question' && <img src={imageUrl} alt={`A post about ${petName}`} className="rounded-lg mb-4 w-full h-auto object-cover aspect-video" />}
        <p className="text-gray-200">{content}</p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map(tag => <Badge key={tag} variant="secondary" className="bg-primary/20 text-primary">#{tag}</Badge>)}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex gap-1">
          {type === 'Sitter' ? (
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Briefcase /> View Details & Apply
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-white/10 text-gray-300">
                <Heart className="w-4 h-4 text-red-500" /> {likes}
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-white/10 text-gray-300">
                <MessageSquare className="w-4 h-4" /> {comments}
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-white/10 text-gray-300">
                <Share2 className="w-4 h-4" /> Share
              </Button>
            </>
          )}
        </div>
        <span className="text-xs text-gray-500">{timestamp}</span>
      </CardFooter>
    </Card>
  );
};

export default PostCard;