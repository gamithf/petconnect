import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDebounce } from 'use-debounce';
import { format } from 'date-fns';
import { Sparkles, Upload, Tags, Loader2, Search, Calendar, DollarSign } from 'lucide-react';

// --- UI Component Imports (adjust paths as needed) ---
import { Button } from '../../components/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../components/ui/Dialog';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Label } from '../../components/ui/Label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/RadioGroup';
import { Switch } from '../../components/ui/Switch';
import { Badge } from '../../components/ui/Badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/Avatar';
import { Alert, AlertTitle, AlertDescription } from '../../components/ui/Alert';
import { Popover, PopoverTrigger, PopoverContent } from '../../components/ui/Popover';
import { Calendar as CalendarComponent } from '../../components/ui/Calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/Select';


// --- Form Validation Schema ---
const formSchema = z.object({
  postType: z.enum(['Story', 'Adoption', 'Lost', 'Found', 'Question', 'Sitter']),
  petName: z.string().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  image: z.any().optional(),
  aiSearch: z.boolean(),
  tags: z.array(z.string()).optional(),
  sitterService: z.string().optional(),
  sitterDates: z.object({ from: z.date().optional(), to: z.date().optional() }).optional(),
  sitterRate: z.string().optional(),
}).refine(data => {
    if (['Story', 'Adoption', 'Lost'].includes(data.postType)) {
        return !!data.petName && data.petName.length > 0;
    }
    return true;
}, {
  message: 'Pet name is required for this post type',
  path: ['petName'],
});

// --- Mock API Functions (Replace with your actual fetch calls) ---
/**
 * Fetches AI-suggested tags based on post description.
 * @param {string} description The text to analyze.
 * @returns {Promise<{tags: string[]}>} A promise that resolves to an object with a tags array.
 */
const fetchPostTagsAPI = async (description) => {
  console.log("API CALL: Fetching tags for description:", description);
  // API Call: Replace this with a fetch to your Node/Express backend.
  // Example:
  // const response = await fetch('/api/posts/generate-tags', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ description })
  // });
  // if (!response.ok) throw new Error('Failed to fetch tags');
  // return response.json();

  // For now, returning mock data after a delay.
  return new Promise(resolve => setTimeout(() => {
    resolve({ tags: ["health", "behavior", "kitten-care", "advice"] });
  }, 800));
};

/**
 * A dialog component for creating a new community post.
 * @param {object} props - The component props.
 * @param {boolean} props.isOpen - Whether the dialog is open.
 * @param {(isOpen: boolean) => void} props.onOpenChange - Function to call when the open state changes.
 * @param {(data: any) => void} props.onSubmit - Function to call with form data upon submission.
 */
export default function CreatePostDialog({ isOpen, onOpenChange, onSubmit }) {
  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postType: 'Story',
      petName: '',
      description: '',
      aiSearch: false,
      tags: [],
    },
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [isTagLoading, setIsTagLoading] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [matchResult, setMatchResult] = useState(null);

  const postType = watch('postType');
  const description = watch('description');
  const currentTags = watch('tags') || [];
  
  const [debouncedDescription] = useDebounce(description, 500);

  const fetchTags = useCallback(async (desc) => {
    if (desc && desc.length > 20) {
      setIsTagLoading(true);
      try {
        // API Call: Get AI-suggested tags for the description
        const result = await fetchPostTagsAPI(desc);
        setSuggestedTags(result.tags);
      } catch (error) {
        console.error("Failed to fetch tags", error);
        setSuggestedTags([]); // Clear tags on error
      } finally {
        setIsTagLoading(false);
      }
    } else {
      setSuggestedTags([]);
    }
  }, []);

  useEffect(() => {
    fetchTags(debouncedDescription);
  }, [debouncedDescription, fetchTags]);
  
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setImagePreview(result);
        setValue('image', result);
        if (postType === 'Found') {
            triggerAiMatching();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerAiMatching = () => {
    setIsMatching(true);
    setMatchResult(null);
    // API Call: This should be a fetch to your backend to find matching lost pets.
    // fetch('/api/pets/match-found', { method: 'POST', body: ... })
    // For now, simulating with a timeout.
    setTimeout(() => {
        setMatchResult({
            name: "Buddy",
            similarity: 85,
            imageUrl: "https://placehold.co/128x128.png",
            owner: "Lost & Found Pets"
        });
        setIsMatching(false);
    }, 2500);
  }

  const resetFormState = () => {
    setImagePreview(null);
    setSuggestedTags([]);
    setIsTagLoading(false);
    setIsMatching(false);
    setMatchResult(null);
    setValue('petName', '');
    setValue('description', '');
    setValue('image', null);
    setValue('tags', []);
    setValue('sitterService', undefined);
    setValue('sitterDates', { from: undefined, to: undefined });
    setValue('sitterRate', '');
  }

  useEffect(() => {
    if (!isOpen) return;
    // Reset form state when dialog is opened or post type changes
    resetFormState();
  }, [isOpen, postType]);

  const toggleTag = (tag) => {
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    setValue('tags', newTags);
  };

  const displayedTags = useMemo(() => {
    const combined = new Set([...suggestedTags, ...currentTags]);
    return Array.from(combined);
  }, [suggestedTags, currentTags]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] w-full flex flex-col max-h-[90vh] p-0 bg-slate-900/80 backdrop-blur-lg border-slate-700 text-slate-100 shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
          <DialogHeader className="p-6 pb-4 border-b border-slate-800">
            <DialogTitle className="text-2xl font-bold text-white">Create a New Post</DialogTitle>
            <DialogDescription className="text-slate-400">
              Share a story, help a pet find a home, or ask the community for help.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {/* --- Section: Post Type --- */}
            <div className="space-y-3">
              <Label className="font-semibold">What are you posting about?</Label>
              <Controller
                name="postType"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value)}
                    defaultValue={field.value}
                    className="grid grid-cols-3 gap-2"
                  >
                    {['Story', 'Question', 'Sitter', 'Adoption', 'Lost', 'Found'].map(type => (
                      <Label key={type} className="cursor-pointer">
                        <RadioGroupItem value={type} id={type} className="sr-only" />
                        <div className={`p-3 rounded-md text-center border-2 transition-colors ${field.value === type 
                          ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300 font-semibold' 
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}>
                          {type}
                        </div>
                      </Label>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>
            
            {/* --- Section: Sitter Details (Conditional) --- */}
            {postType === 'Sitter' && (
                <div className='p-4 bg-slate-800/50 border border-slate-700 rounded-lg space-y-4'>
                    <h4 className="font-semibold text-white">Sitter Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="sitterService">Service Needed</Label>
                            <Controller name="sitterService" control={control} render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger id="sitterService"><SelectValue placeholder="Select service" /></SelectTrigger>
                                    <SelectContent><SelectItem value="house-sitting">House Sitting</SelectItem><SelectItem value="drop-in">Drop-in</SelectItem><SelectItem value="dog-walking">Dog Walking</SelectItem></SelectContent>
                                </Select>
                            )}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="sitterRate">Rate (per day)</Label>
                            <div className="relative"><DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" /><Input id="sitterRate" {...register('sitterRate')} placeholder="50" className="pl-8"/></div>
                        </div>
                    </div>
                    {/* Add Calendar for dates here when ready */}
                </div>
            )}

            {/* --- Section: Image & Pet Name --- */}
            <div className="grid grid-cols-3 gap-4">
                <div className="relative col-span-1 aspect-square bg-slate-800 border-2 border-dashed border-slate-700 rounded-lg flex flex-col justify-center items-center text-slate-400 hover:border-cyan-500 hover:text-cyan-400 transition-colors group">
                    {imagePreview ? (
                        <>
                            <img src={imagePreview} alt="Pet preview" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity">
                                <ImagePlus className="w-8 h-8 text-white" />
                                <span className="text-sm text-white font-semibold">Change Photo</span>
                            </div>
                            <button type="button" onClick={() => { setImagePreview(null); setValue('image', null); }} className="absolute top-2 right-2 bg-black/50 rounded-full p-1 text-white hover:bg-black/80 z-10">
                                <X className="w-4 h-4"/>
                            </button>
                        </>
                    ) : (
                        <>
                            <Upload className="w-8 h-8 mb-2" />
                            <p className="text-sm text-center">Upload Photo</p>
                        </>
                    )}
                    <Input id="image-upload" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleImageChange} accept="image/*" />
                </div>
                <div className="col-span-2 flex flex-col justify-center space-y-2">
                    <Label htmlFor="petName" className={postType === 'Question' || postType === 'Sitter' ? 'text-slate-500' : 'font-semibold'}>Pet's Name</Label>
                    <Input id="petName" {...register('petName')} placeholder="e.g., Buddy" disabled={(postType === 'Question' || postType === 'Sitter') && !imagePreview} />
                    {errors.petName && <p className="text-red-500 text-xs">{errors.petName.message}</p>}
                </div>
            </div>
            
            {/* --- Section: Description --- */}
            <div className="space-y-2">
              <Label htmlFor="description" className="font-semibold">Description</Label>
              <Textarea id="description" {...register('description')} placeholder="Tell us more about your story, question, or pet..." rows={4} />
              {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
            </div>

            {/* --- Section: AI Match Results (Conditional) --- */}
            {postType === 'Found' && imagePreview && (
                 <div className="space-y-4">
                    {isMatching && (
                         <Alert className="bg-blue-500/10 border-blue-500/30 text-blue-300">
                            <Search className="h-5 w-5 animate-pulse text-blue-400"/>
                            <AlertTitle className="font-semibold">AI Search in Progress</AlertTitle>
                            <AlertDescription>Scanning "Lost Pet" reports to find a match...</AlertDescription>
                        </Alert>
                    )}
                    {matchResult && (
                         <Alert className="bg-emerald-500/10 border-emerald-500/30 text-emerald-300">
                            <Sparkles className="h-5 w-5 text-emerald-400" />
                            <AlertTitle className="font-bold text-emerald-300">Potential Match Found!</AlertTitle>
                            <AlertDescription className="mt-2">
                               <div className="flex items-center gap-4">
                                    <Avatar className="w-16 h-16 rounded-md border-2 border-emerald-400/50"><AvatarImage src={matchResult.imageUrl} alt={matchResult.name}/><AvatarFallback>{matchResult.name.charAt(0)}</AvatarFallback></Avatar>
                                    <div>
                                        <p>Similarity of <strong className="text-white">{matchResult.similarity}%</strong> to missing pet <strong className="text-white">{matchResult.name}</strong>.</p>
                                        <Button variant="link" className="p-0 h-auto mt-1 text-emerald-400 hover:text-emerald-300">View Report</Button>
                                    </div>
                               </div>
                            </AlertDescription>
                        </Alert>
                    )}
                 </div>
             )}

            {/* --- Section: Tags (Conditional) --- */}
            {(postType === 'Question' || postType === 'Story') && (
              <div className="space-y-3">
                  <Label className="font-semibold flex items-center gap-2"><Tags className="w-5 h-5"/> Tags</Label>
                  <div className="flex flex-wrap gap-2 items-center min-h-[32px]">
                    {isTagLoading && <Loader2 className="w-5 h-5 animate-spin text-slate-400"/>}
                    {displayedTags.map(tag => (
                      <Badge
                        key={tag}
                        variant={currentTags.includes(tag) ? 'default' : 'secondary'}
                        onClick={() => toggleTag(tag)}
                        className="cursor-pointer text-sm py-1 px-3 transition-all"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {description.length > 20 && !isTagLoading && displayedTags.length === 0 && <p className="text-xs text-slate-500">No tag suggestions found.</p>}
                  </div>
                   <p className="text-xs text-slate-400">AI will suggest tags as you type. Click a tag to add or remove it.</p>
              </div>
            )}

            {/* --- Section: AI Search Toggle (Conditional) --- */}
            {postType === 'Lost' && (
              <div className="flex items-center justify-between space-x-4 rounded-lg border p-4 bg-cyan-500/10 border-cyan-500/30">
                <div>
                  <Label htmlFor="ai-search" className="font-semibold flex items-center gap-2 text-cyan-300"><Sparkles className="w-5 h-5"/>Enable Lost Pet AI Search</Label>
                  <p className="text-xs text-slate-400 mt-1">Our AI will continuously scan "found pet" posts to find matches for you.</p>
                </div>
                <Controller name="aiSearch" control={control} render={({ field }) => (<Switch id="ai-search" checked={field.value} onCheckedChange={field.onChange} />)} />
              </div>
            )}
          </div>

          <DialogFooter className="p-6 pt-4 border-t border-slate-800 bg-slate-900/50">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold">Post to Community</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}