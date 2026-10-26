import serviceData from './services.json';

// OWNER SETUP: empty values are intentional placeholders and are hidden in the UI.
// Service wording is owner-supplied and preserved verbatim in services.json.
export const business = {
  name: "Elsie J's Home Care",
  legalName: '', phone: '', email: 'info@elsiejhomecare.ca', address: '',
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
const previewDescriptions: Record<string, string> = {
  'personal-care': 'Personal care assistance that feels respectful and transparent.',
  'meal-preparation': 'Meal planning with familiar recipes that can be shaped around your preferences.',
  'companion-care': 'Compassionate care and shared activities that keep you active and connected.',
  'respite-care': 'Perfect for family caregivers to rest, recharge, relax, and tend to their own needs.',
  'transportation-services': 'Assistance and a companion during outings, appointments, and running errands.',
};
export const previewServices = ['personal-care', 'meal-preparation', 'housekeeping', 'companion-care', 'respite-care', 'transportation-services'].map(slug => {
  const service = services.find(service => service.slug === slug)!;
  return { ...service, short: previewDescriptions[slug] ?? service.short };
});
export const careSteps = [
  { title: 'Have a conversation', text: 'Ask questions and share what a typical day looks like for you or your loved one.' },
  { title: 'Make a personal plan', text: 'Decide on the services, timing, and required needs that matter most to you.' },
  { title: 'Welcome your caregiver', text: 'Begin with a plan, welcome your caregiver, and stay in touch as your needs or routines change.' },
];
export const faqs = [
  { question: 'How do I know what services I need?', answer: 'Start with the tasks that are harder to complete and where you need the most assistance. We can discuss the tasks you would like your caregiver to take on for you.' },
  { question: 'Can care change if our needs change?', answer: 'Tell us when your needs change. We can discuss what adjustments may be possible and agree on the next steps together.' },
  { question: 'Can family members join the planning?', answer: 'Yes! Let us know who you would like to include. Your choices are crucial to the decisions about your care.' },
  { question: 'How often can I receive care?', answer: 'Every client is different. Ask us about schedule availability and any minimum visit requirements. These will be discussed before care is finalized.' },
  { question: 'What happens during first contact?', answer: 'Start by contacting us. Let us know who needs care or support and what we can help with. Ask all your questions, and we can discuss your options without all the stress.' },
  { question: 'Do you provide short-term care?', answer: 'Yes, we provide short-term and long-term care. Share your needs with us and what services you require. We will walk you through every step.' },
  { question: 'What areas do you serve?', answer: 'We currently serve the Halifax and Dartmouth areas, as well as some surrounding areas. We hope to expand in the future. Please contact us to find out if care is available in your community.' },
  { question: 'How much does it cost?', answer: 'Costs are different for everyone. The cost is based on duration, schedule, and the level of care required. Ask us to explain further during your consult, and we can decide on a schedule and payment that suits you.' },
];
