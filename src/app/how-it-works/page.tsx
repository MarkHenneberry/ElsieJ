import { faqs } from '@/lib/business';
import { pageMetadata } from '@/lib/metadata';
import { Container, PageIntro, ProcessStep, SectionHeading, FAQAccordion, ContactCTA } from '@/components/ui';
export const metadata = pageMetadata('How It Works', 'See what happens from your first enquiry to an agreed home care plan, schedule, and ongoing conversations with Elsie J’s.', '/how-it-works');
const steps = [
  ['Get in Touch', 'Call or send an email with your questions or enquiry. There is no rush to choose a service before your first conversation or consult.'],
  ['Describe a Typical Day', "Share with us what's working for you and what you need assistance with."],
  ['Discuss the Details', "Take a look at our services offered and the costs, include your preferences, and we can decide together what's best for you."],
  ['Set a Schedule', 'Choose suitable days and times from the available options. Confirm any visit requirements before finalizing your schedule.'],
  ['Meet Your Caregiver', 'Begin by setting your schedule, then we will introduce you to your caregiver.'],
  ['Communication', "Stay in touch and let us know what's working for you. We understand that things change. Let us know if your circumstances change so we can adjust with you."],
];
export default function HowItWorks() { return <><PageIntro eyebrow="HOW IT WORKS" title="Know what to expect."><p>Here is what happens between your first consult and welcoming a caregiver into your day. Take each step at a pace that feels right for you.</p></PageIntro><section className="section"><Container><ol className="full-process">{steps.map(([title, text], i) => <ProcessStep key={title} title={title} number={i + 1}>{text}</ProcessStep>)}</ol></Container></section><section className="section faq-section"><Container><SectionHeading eyebrow="PRACTICAL QUESTIONS" title="A few things you may be wondering." center><p>Consults and how arrangements can be modified.</p></SectionHeading><FAQAccordion items={faqs} /></Container></section><ContactCTA title="Ready for the first step?" description="Bring your questions about services, schedules, or costs. We can go through them one at a time." /></>; }
