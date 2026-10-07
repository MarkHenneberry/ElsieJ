// OWNER SETUP: empty values are intentional placeholders and are hidden in the UI.
// Confirm every proposed service before publishing. No medical services are claimed.
export const business = {
  name: "Elsie J's Home Care",
  legalName: '', phone: '', email: 'ashleahenneberry@elsiejhomecare.ca', address: '',
  serviceAreas: [] as string[], businessHours: '',
  socialLinks: [] as { label: string; url: string }[],
  founderName: '', founderStory: '',
  servicesConfirmed: false,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || '',
  images: { care: '/images/care-at-home.webp', alt: 'An older woman and a home support companion enjoying a conversation over tea at home.' },
  testimonials: [] as { quote: string; name: string; relationship?: string }[],
};
export const navigation = [
  { href: '/', label: 'Home' }, { href: '/services', label: 'Our Services' },
  { href: '/about', label: 'About Us' }, { href: '/how-it-works', label: 'How It Works' }, { href: '/contact', label: 'Contact' },
];
export const services = [
  { slug: 'companionship', icon: 'heart', title: 'Companionship', short: 'Good company, conversation, and time for the things you enjoy.', detail: 'A friendly visit can bring more connection to the day. This may include conversation, a favourite activity, or simply spending time together.', benefit: 'For people who would welcome company and a familiar routine.' },
  { slug: 'personal-care', icon: 'hand', title: 'Personal Care', short: 'Respectful help with everyday personal routines.', detail: 'Support with getting ready, dressing, and other personal routines can help daily life feel more comfortable. Your preferences and privacy come first.', benefit: 'For people who need a helping hand with daily personal tasks.' },
  { slug: 'meal-preparation', icon: 'utensils', title: 'Meal Preparation', short: 'A helping hand with meals you look forward to.', detail: 'Help with planning and preparing familiar meals can make mealtimes easier. Talk with us about your tastes and everyday needs.', benefit: 'For people who find cooking tiring or would enjoy help in the kitchen.' },
  { slug: 'light-housekeeping', icon: 'home', title: 'Light Housekeeping', short: 'Everyday tidying for a comfortable, welcoming home.', detail: 'A little help with everyday household tasks can take pressure off your day. We can discuss which light tasks would be most useful.', benefit: 'For people who need help keeping up with routine chores.' },
  { slug: 'errands-shopping', icon: 'bag', title: 'Errands & Shopping', short: 'Support with the little tasks on your to-do list.', detail: 'Getting groceries and completing everyday errands can be easier with support. Tell us what you need and ask about the help available.', benefit: 'For people who find errands difficult to manage on their own.' },
  { slug: 'family-respite', icon: 'sun', title: 'Family Caregiver Respite', short: 'Time for you to rest, knowing your loved one has support.', detail: 'Family caregivers need time for their own lives, too. Discuss support that could give you a break from everyday caregiving tasks.', benefit: 'For family members who need time to rest or attend to other responsibilities.' },
  { slug: 'appointments', icon: 'car', title: 'Appointments & Outings', short: 'A little extra support when you need to get out.', detail: 'Having someone alongside you can make an appointment or outing feel easier. Ask us about transportation and accompaniment options.', benefit: 'For people who would like help getting to everyday appointments or outings.' },
  { slug: 'daily-routines', icon: 'clock', title: 'Daily Routine Support', short: 'Help that makes the day feel a little more manageable.', detail: 'Support can fit around familiar routines, from getting the day started to settling in for the evening. Share the parts of your day where help would matter most.', benefit: 'For people who would benefit from support with their everyday schedule.' },
];
export type Service = (typeof services)[number];
export const careSteps = [
  { title: 'Talk with us', text: 'Tell us what kind of help you or your family member needs.' },
  { title: 'Plan your care together', text: 'Talk through the support, schedule, and preferences that work for you.' },
  { title: 'Feel at home with care', text: 'Once everything feels right and arrangements are agreed, care can begin.' },
];
export const faqs = [
  { question: 'How do I know what kind of care I need?', answer: 'You do not need to know before you get in touch. Start with what feels difficult at home, and we can talk through the help you are looking for.' },
  { question: 'Can care change if our needs change?', answer: 'Tell us when your needs change. We can discuss what adjustments may be possible and agree on the next steps together.' },
  { question: 'Can family members help with planning?', answer: 'Let us know who you would like involved in the conversation. The person receiving care should have a voice in decisions about their support.' },
  { question: 'How often can someone receive care?', answer: 'Please ask us about available schedules and any minimum visit requirements. These will be discussed before care is agreed.' },
  { question: 'What happens when I first contact you?', answer: 'Start by telling us who needs support and what would make daily life easier. You can ask questions and discuss your options without having everything worked out.' },
  { question: 'Do you provide short-term care?', answer: 'Ask us about your dates and the type of help you need. We will explain whether suitable support is available.' },
  { question: 'What areas do you serve?', answer: business.serviceAreas.length ? `Our service areas include ${business.serviceAreas.join(', ')}. Contact us to discuss your location.` : 'Please ask us whether care is available in your community.' },
  { question: 'How much does home care cost?', answer: 'The cost depends on the support and schedule agreed. Ask us to explain costs and any visit requirements before you make a decision.' },
];
