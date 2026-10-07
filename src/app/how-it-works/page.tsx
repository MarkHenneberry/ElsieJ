import { faqs } from '@/lib/business';
import { pageMetadata } from '@/lib/metadata';
import { Container, PageIntro, ProcessStep, SectionHeading, FAQAccordion, ContactCTA } from '@/components/ui';
export const metadata = pageMetadata('How It Works', 'Understand what happens when you contact Elsie J’s Home Care. A simple guide to discussing your needs, planning support, and getting started.', '/how-it-works');
const steps = [
  ['Contact us', 'You can start with a simple question. You do not need to know exactly what support you need.'],
  ['Tell us what you need', 'Share who the care is for, what daily life looks like, and where a little help would make a difference.'],
  ['Discuss a care plan', 'Talk through your preferences and the tasks you need help with. Ask questions about the support available and the costs.'],
  ['Choose a schedule', 'Discuss the days and times you are looking for. Availability and any visit requirements will be confirmed together.'],
  ['Begin care', 'Once the plan and arrangements are agreed, support can begin. Your comfort and choices remain part of the conversation.'],
  ['Stay in touch', 'Let us know how things are going. If your needs change, we can talk about the next steps.'],
];
export default function HowItWorks() { return <><PageIntro eyebrow="HOW IT WORKS" title="One conversation. One step at a time."><p>Finding home care can feel overwhelming. We keep the conversation simple, so you can understand your options and decide what feels right.</p></PageIntro><section className="section"><Container><ol className="full-process">{steps.map(([title, text], i) => <ProcessStep key={title} title={title} number={i + 1}>{text}</ProcessStep>)}</ol></Container></section><section className="section faq-section"><Container><SectionHeading eyebrow="YOUR QUESTIONS, ANSWERED" title="It’s okay to have questions." center><p>Here are a few things families often want to know.</p></SectionHeading><FAQAccordion items={faqs} /></Container></section><ContactCTA /></>; }
