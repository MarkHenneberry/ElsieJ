import { faqs } from '@/lib/business';
import { pageMetadata } from '@/lib/metadata';
import { Container, PageIntro, ProcessStep, SectionHeading, FAQAccordion, ContactCTA } from '@/components/ui';
export const metadata = pageMetadata('How It Works', 'See what happens from your first enquiry to an agreed home care plan, schedule, and ongoing conversations with Elsie J’s.', '/how-it-works');
const steps = [
  ['Get in touch', 'Call or email with a question, or send an enquiry. There is no need to choose a service before your first conversation.'],
  ['Describe a typical day', 'Share the routines that are going well and the tasks you would like a caregiver to take on.'],
  ['Discuss the details', 'Go through the services, personal preferences, and costs. Include the family members or other people you want involved.'],
  ['Agree on a schedule', 'Choose suitable days and times from the available options. Confirm any visit requirements before making arrangements.'],
  ['Meet your caregiver', 'Begin with a shared understanding of the plan, from practical tasks to the small things you like done a certain way.'],
  ['Keep the conversation going', 'Let us know what is working and what could change. Review the arrangements as your circumstances develop.'],
];
export default function HowItWorks() { return <><PageIntro eyebrow="HOW IT WORKS" title="Know what to expect."><p>Here is what happens between your first enquiry and welcoming a caregiver into your day. Take each step at a pace that feels right.</p></PageIntro><section className="section"><Container><ol className="full-process">{steps.map(([title, text], i) => <ProcessStep key={title} title={title} number={i + 1}>{text}</ProcessStep>)}</ol></Container></section><section className="section faq-section"><Container><SectionHeading eyebrow="PRACTICAL QUESTIONS" title="A few things you may be wondering." center><p>Schedules, costs, and how arrangements can change.</p></SectionHeading><FAQAccordion items={faqs} /></Container></section><ContactCTA title="Ready for the first step?" description="Bring your questions about services, schedules, or costs. We can go through them one at a time." /></>; }