import serviceData from './services.json';

// OWNER SETUP: empty values are intentional placeholders and are hidden in the UI.
// Service wording is owner-supplied and preserved verbatim in services.json.
export const business = {
  name: "Elsie J's Home Care",
  legalName: '', phone: '', email: 'ashlea.henneberry@elsiejhomecare.ca', address: '',
  serviceAreas: [] as string[], businessHours: '',
  socialLinks: [] as { label: string; url: string }[],
  founderName: '', founderStory: '',
  servicesConfirmed: true,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || '',
  images: {
    senior: { src: '/images/senior-companion-kitchen.webp', alt: 'A woman shares seed packets with a companion while preparing plant pots at her kitchen table.' },
    veteran: { src: '/images/canadian-veteran-home-care.webp', alt: 'A man wearing a remembrance poppy builds a model boat with a companion, with Canadian service mementos on his bookshelf.' },
    wheelchair: { src: '/images/wheelchair-client-caregiver.webp', alt: 'A woman using a wheelchair mixes pancake batter while a companion prepares fruit alongside her.', position: '25% center' },
  },
  testimonials: [] as { quote: string; name: string; relationship?: string }[],
};
export const navigation = [
  { href: '/', label: 'Home' }, { href: '/services', label: 'Our Services' },
  { href: '/about', label: 'About Us' }, { href: '/how-it-works', label: 'How It Works' }, { href: '/contact', label: 'Contact' },
];
export type ServiceBlock = { type: 'paragraph' | 'heading'; text: string } | { type: 'list'; items: string[] };
export type Service = { slug: string; icon: string; title: string; short: string; blocks: ServiceBlock[] };
export const services = serviceData as Service[];
export const previewServices = ['personal-care', 'meal-preparation', 'housekeeping', 'companion-care', 'respite-care', 'transportation-services'].map(slug => services.find(service => service.slug === slug)!);
export const careSteps = [
  { title: 'Have a conversation', text: 'Ask questions and share what a typical day looks like for you or your loved one.' },
  { title: 'Make a personal plan', text: 'Agree on the services, timing, and everyday preferences that matter to you.' },
  { title: 'Welcome your caregiver', text: 'Begin with an agreed plan, then stay in touch as routines and needs change.' },
];
export const faqs = [
  { question: 'How do I know which services to choose?', answer: 'Start with the parts of the day that take more time or energy than they used to. We can discuss the tasks you would like to share with a caregiver.' },
  { question: 'Can care change if our needs change?', answer: 'Tell us when your needs change. We can discuss what adjustments may be possible and agree on the next steps together.' },
  { question: 'Can family members join the planning?', answer: 'Yes. Let us know who you would like to include. Your own wishes remain central to decisions about your day.' },
  { question: 'How often can someone receive care?', answer: 'Please ask us about available schedules and any minimum visit requirements. These will be discussed before care is agreed.' },
  { question: 'What happens when I first contact you?', answer: 'Start by telling us who needs support and what would make daily life easier. You can ask questions and discuss your options without having everything worked out.' },
  { question: 'Do you provide short-term care?', answer: 'Share your dates and the services you are considering. We will explain what can be arranged for that period.' },
  { question: 'What areas do you serve?', answer: business.serviceAreas.length ? `Our service areas include ${business.serviceAreas.join(', ')}. Contact us to discuss your location.` : 'Please ask us whether care is available in your community.' },
  { question: 'How much does home care cost?', answer: 'The cost depends on the support and schedule agreed. Ask us to explain costs and any visit requirements before you make a decision.' },
];
