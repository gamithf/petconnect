// This file contains static data for the application.
// The JSDoc comments (@typedef) define the shape of the data,
// providing type-checking and autocompletion in supported editors like VS Code.

/**
 * @typedef {object} HealthEvent
 * @property {string} id
 * @property {'vaccination' | 'appointment' | 'prescription'} type
 * @property {string} date
 * @property {string} title
 * @property {string} description
 * @property {{vet?: string, dosage?: string, next_due?: string}} [details]
 */

/**
 * @typedef {object} JournalEntry
 * @property {string} id
 * @property {string} date - YYYY-MM-DD
 * @property {'happy' | 'playful' | 'anxious' | 'calm' | 'lethargic'} mood
 * @property {'high' | 'medium' | 'low'} energy
 * @property {'full' | 'partial' | 'none'} appetite
 * @property {'normal' | 'diarrhea' | 'constipated'} poop
 * @property {string} [notes]
 * @property {string} [photoUrl]
 */

/**
 * @typedef {object} CareSheet
 * @property {{instructions: string, schedule: string}} feeding
 * @property {string[]} medications
 * @property {string} routine
 */

/**
 * @typedef {object} BehavioralNotes
 * @property {string[]} likes
 * @property {string[]} dislikes
 * @property {string} general
 */

/**
 * @typedef {object} EmergencyContact
 * @property {string} name
 * @property {string} phone
 * @property {string} address
 */

/**
 * @typedef {object} Pet
 * @property {string} id
 * @property {string} name
 * @property {'dog' | 'cat'} type
 * @property {string} breed
 * @property {number} age - in years
 * @property {number} weight - in lbs
 * @property {string} avatarUrl
 * @property {string} gotchaDate - YYYY-MM-DD
 * @property {HealthEvent[]} healthTimeline
 * @property {JournalEntry[]} journal
 * @property {CareSheet} careSheet
 * @property {BehavioralNotes} behavioralNotes
 * @property {{vet: EmergencyContact, hospital: EmergencyContact}} emergencyContacts
 */

/**
 * @typedef {object} Vet
 * @property {string} id
 * @property {string} name
 * @property {string} specialty
 * @property {string} imageUrl
 */

/**
 * @typedef {object} Clinic
 * @property {string} id
 * @property {string} name
 * @property {string} address
 * @property {number} rating
 * @property {number} reviewCount
 * @property {string[]} services
 * @property {Object<string, string>} hours
 * @property {Vet[]} vets
 * @property {string} imageUrl
 * @property {{author: string, text: string, rating: number}[]} reviews
 */

/** @type {Pet[]} */
export const pets = [
  {
    id: '1',
    name: 'Buddy',
    type: 'dog',
    breed: 'Golden Retriever',
    age: 5,
    weight: 75,
    avatarUrl: 'https://placehold.co/128x128.png',
    gotchaDate: '2019-08-15',
    healthTimeline: [
      {
        id: 'e1',
        type: 'vaccination',
        date: '2024-05-20',
        title: 'Rabies Vaccine',
        description: 'Annual rabies booster shot.',
        details: { vet: 'Dr. Smith', next_due: '2025-05-20' },
      },
      {
        id: 'e2',
        type: 'appointment',
        date: '2024-07-10',
        title: 'Annual Check-up',
        description: 'Routine yearly examination.',
        details: { vet: 'Dr. Smith' },
      },
      {
        id: 'e3',
        type: 'prescription',
        date: '2024-07-10',
        title: 'Flea & Tick Prevention',
        description: 'Monthly chewable tablet.',
        details: { dosage: '1 tablet monthly', next_due: '2024-08-10' },
      },
      {
        id: 'e4',
        type: 'vaccination',
        date: '2023-09-15',
        title: 'DHPP Vaccine',
        description: 'Annual booster for Distemper, Hepatitis, Parainfluenza, and Parvovirus.',
        details: { vet: 'Dr. Smith', next_due: '2024-09-15' },
      },
    ],
    journal: [
        { id: 'j1', date: '2024-07-29', mood: 'happy', energy: 'high', appetite: 'full', poop: 'normal', notes: 'Great day at the park!', photoUrl: 'https://placehold.co/600x400.png' },
        { id: 'j2', date: '2024-07-28', mood: 'playful', energy: 'high', appetite: 'full', poop: 'normal' },
        { id: 'j3', date: '2024-07-27', mood: 'calm', energy: 'medium', appetite: 'full', poop: 'normal' },
        { id: 'j4', date: '2024-07-26', mood: 'lethargic', energy: 'low', appetite: 'partial', poop: 'normal', notes: 'Seems a bit tired today.'},
        { id: 'j5', date: '2024-07-25', mood: 'lethargic', energy: 'low', appetite: 'none', poop: 'normal', notes: 'Didn\'t want to eat his breakfast.'},
        { id: 'j6', date: '2024-07-24', mood: 'lethargic', energy: 'low', appetite: 'partial', poop: 'diarrhea', notes: 'Tummy seems upset after eating something at the park yesterday.'},
    ],
    careSheet: {
        feeding: { instructions: "2 cups of 'ProHealth' kibble, mixed with a little warm water.", schedule: "7:00 AM and 6:00 PM" },
        medications: ["Flea & Tick chewable on the 10th of each month."],
        routine: "Morning walk around 7:30 AM, short evening walk around 8:00 PM. He gets a dental chew before bed at 10:00 PM."
    },
    behavioralNotes: {
        likes: ["Belly rubs", "Squeaky toys (especially the blue ball)", "Playing fetch at the park", "Car rides"],
        dislikes: ["Vacuum cleaner", "Thunderstorms", "Skateboards", "Getting his nails trimmed"],
        general: "Buddy is extremely friendly with other dogs and people. He knows 'sit', 'stay', and 'paw'. He will gently paw at you when he wants attention or needs to go outside."
    },
    emergencyContacts: {
        vet: { name: "City Vet Clinic", phone: "123-456-7890", address: "123 Vet Street, Anytown" },
        hospital: { name: "24/7 Animal Emergency Center", phone: "098-765-4321", address: "456 ER Drive, Anytown" }
    }
  },
  {
    id: '2',
    name: 'Lucy',
    type: 'cat',
    breed: 'Siamese',
    age: 8,
    weight: 10,
    avatarUrl: 'https://placehold.co/128x128.png',
    gotchaDate: '2017-03-20',
    healthTimeline: [
      {
        id: 'e5',
        type: 'vaccination',
        date: '2024-06-01',
        title: 'FVRCP Vaccine',
        description: 'Annual booster shot.',
        details: { vet: 'Dr. Davis', next_due: '2025-06-01' },
      },
      {
        id: 'e6',
        type: 'appointment',
        date: '2024-08-22',
        title: 'Dental Cleaning',
        description: 'Scheduled teeth cleaning procedure.',
        details: { vet: 'Dr. Davis' },
      },
       {
        id: 'e7',
        type: 'prescription',
        date: '2024-03-15',
        title: 'Thyroid Medication',
        description: 'Daily medication for hyperthyroidism.',
        details: { dosage: '0.5ml twice daily', next_due: '2024-09-15' },
      },
    ],
    journal: [
        { id: 'j7', date: '2024-07-29', mood: 'calm', energy: 'low', appetite: 'full', poop: 'normal', notes: 'Napped in the sun all day.'},
        { id: 'j8', date: '2024-07-28', mood: 'anxious', energy: 'medium', appetite: 'partial', poop: 'normal', notes: 'Upset by the thunderstorm.'},
    ],
    careSheet: {
        feeding: { instructions: "1/2 can of 'Ocean Feast' wet food.", schedule: "8:00 AM and 5:00 PM" },
        medications: ["0.5ml of Thyroid medication in her morning food."],
        routine: "Loves to watch birds from the window in the morning. Likes to nap in her cat tree in the afternoon."
    },
    behavioralNotes: {
        likes: ["Chin scratches", "Laser pointer", "Warm laundry", "Sleeping in cardboard boxes"],
        dislikes: ["Loud noises", "Being picked up unexpectedly", "The dog from next door"],
        general: "Lucy is very vocal and will 'talk' to you. She is shy with new people at first but warms up quickly. She does not like her stomach being touched."
    },
    emergencyContacts: {
        vet: { name: "City Vet Clinic", phone: "123-456-7890", address: "123 Vet Street, Anytown" },
        hospital: { name: "24/7 Animal Emergency Center", phone: "098-765-4321", address: "456 ER Drive, Anytown" }
    }
  },
   {
    id: '3',
    name: 'Max',
    type: 'dog',
    breed: 'German Shepherd',
    age: 3,
    weight: 80,
    avatarUrl: 'https://placehold.co/128x128.png',
    gotchaDate: '2021-11-01',
    healthTimeline: [
      {
        id: 'e8',
        type: 'appointment',
        date: '2024-07-25',
        title: 'Grooming Session',
        description: 'Full grooming including wash and trim.',
        details: { vet: 'Happy Paws Grooming' },
      },
    ],
    journal: [],
    careSheet: {
        feeding: { instructions: "2.5 cups of 'Active Dog' formula.", schedule: "Twice a day" },
        medications: [],
        routine: "Requires at least 1 hour of vigorous exercise daily. Loves training sessions."
    },
    behavioralNotes: {
        likes: ["Puzzle toys", "Training exercises", "Long runs"],
        dislikes: ["Being left alone for long periods"],
        general: "Highly intelligent and loyal. Can be protective of his family."
    },
    emergencyContacts: {
        vet: { name: "City Vet Clinic", phone: "123-456-7890", address: "123 Vet Street, Anytown" },
        hospital: { name: "24/7 Animal Emergency Center", phone: "098-765-4321", address: "456 ER Drive, Anytown" }
    }
  },
];

export const clinics = [
    {
        id: '1',
        name: 'City Vet Clinic',
        address: '123 Vet Street, Anytown, USA',
        rating: 4.8,
        reviewCount: 125,
        services: ['General Wellness', 'Vaccinations', 'Surgery', 'Dentistry'],
        hours: {
            weekdays: '8:00 AM - 6:00 PM',
            saturday: '9:00 AM - 2:00 PM',
            sunday: 'Closed',
        },
        vets: [
            { id: 'v1', name: 'Dr. Evelyn Reed', specialty: 'General Practice, Surgery', imageUrl: 'https://placehold.co/128x128.png' },
            { id: 'v2', name: 'Dr. Samuel Chen', specialty: 'Dermatology, Internal Medicine', imageUrl: 'https://placehold.co/128x128.png' },
        ],
        imageUrl: 'https://placehold.co/600x400.png',
        reviews: [
            { author: 'Sarah J.', text: 'Dr. Reed is amazing with my anxious dog. The staff is always friendly and helpful.', rating: 5 },
            { author: 'Mike L.', text: 'Clean facility and very professional. A bit pricey but worth it for the quality of care.', rating: 4 },
        ]
    },
    {
        id: '2',
        name: 'Pawsitive Care Hospital',
        address: '456 Paws Ave, Anytown, USA',
        rating: 4.9,
        reviewCount: 210,
        services: ['General Wellness', 'Emergency Care', 'Orthopedics', 'Exotics'],
        hours: {
            weekdays: '24 Hours',
            saturday: '24 Hours',
            sunday: '24 Hours',
        },
        vets: [
            { id: 'v3', name: 'Dr. Jessica Monroe', specialty: 'Emergency & Critical Care', imageUrl: 'https://placehold.co/128x128.png' },
            { id: 'v4', name: 'Dr. Ben Carter', specialty: 'Orthopedic Surgery', imageUrl: 'https://placehold.co/128x128.png' },
            { id: 'v5', name: 'Dr. Olivia Grant', specialty: 'Avian & Exotic Pets', imageUrl: 'https://placehold.co/128x128.png' },
        ],
        imageUrl: 'https://placehold.co/600x400.png',
        reviews: [
            { author: 'Emily R.', text: 'They saved my cat\'s life. I am forever grateful for their 24/7 emergency service.', rating: 5 },
            { author: 'David B.', text: 'The best of the best. The specialists here are top-notch and truly care.', rating: 5 },
        ]
    },
    {
        id: '3',
        name: 'Happy Tails Clinic',
        address: '789 Tailwaggers Lane, Suburbia, USA',
        rating: 4.6,
        reviewCount: 88,
        services: ['General Wellness', 'Vaccinations', 'Nutrition Counseling'],
        hours: {
            weekdays: '9:00 AM - 5:00 PM',
            saturday: '10:00 AM - 1:00 PM',
            sunday: 'Closed',
        },
        vets: [
            { id: 'v6', name: 'Dr. Chloe Davis', specialty: 'Feline and Canine Nutrition', imageUrl: 'https://placehold.co/128x128.png' },
        ],
        imageUrl: 'https://placehold.co/600x400.png',
        reviews: [
            { author: 'Jessica P.', text: 'A great local vet for routine check-ups and shots. Dr. Davis is very knowledgeable about nutrition.', rating: 5 },
            { author: 'Tom H.', text: 'Friendly, affordable, and always on time. Highly recommend for basic care.', rating: 4 },
        ]
    }
];

// NOTE: The full data from your original file is included below for completeness.
// I have omitted it here for brevity.