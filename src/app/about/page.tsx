import { business } from '@/lib/business';
import { mission, whyChoose, promise } from '@/lib/about';
import { pageMetadata } from '@/lib/metadata';
import { Container, PageIntro, ImageTextSection, ProcessStep, ContactCTA } from '@/components/ui';

export const metadata = {
  ...pageMetadata(
    'Our Story & Mission',
    'Family-founded Nova Scotia home care, shaped by Continuing Care Assistant (CCA) experience, with personalized care for seniors, people with disabilities, and veterans.',
    '/about',
  ),
  title: { absolute: "About Elsie J's Home Care | Our Story & Mission" },
};

export default function About() {
  return <>
    <PageIntro eyebrow="ABOUT ELSIE J’S" title="Every person has their own way.">
      <p>The way you like your tea. The people you enjoy seeing. The routines you want to keep. Getting to know you starts here, with the small details.</p>
    </PageIntro>

    <section className="section">
      <Container className="about-content">
        <h2>Who we are</h2>
        <p>Elsie J&apos;s Home Care serves seniors, adults requiring home care, people with disabilities, and Canadian veterans. We also work with families looking for respite or additional care for someone they love.</p>
        <p>Each person brings different experiences and priorities. We listen before making a plan, and make room for your voice in the decisions that follow.</p>
        <div className="about-story" id="our-story" aria-labelledby="our-story-heading">
          <h2 id="our-story-heading">Our Story</h2>
          {business.founderStory.split('\n\n').map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </Container>
    </section>

    <div id="our-mission" className="about-anchor">
      <ImageTextSection image={business.images.veteran} eyebrow="WHAT GUIDES US" title="Our Mission">
        <p>{mission.introduction}</p>
        <div className="values-list about-mission-principles">
          {mission.principles.map(principle => <div className="value" key={principle.title}><div><h3>{principle.title}</h3><p>{principle.text}</p></div></div>)}
        </div>
      </ImageTextSection>
    </div>

    <section className="section why-section" aria-labelledby="why-choose-heading">
      <Container className="about-content">
        <div className="section-heading">
          <h2 id="why-choose-heading">Why Choose Elsie J&apos;s Home Care?</h2>
          <div className="intro"><p>{whyChoose.introduction}</p></div>
        </div>
        <ol className="about-reasons">
          {whyChoose.reasons.map((reason, index) => <ProcessStep key={reason.title} number={index + 1} title={reason.title}>{reason.text}</ProcessStep>)}
        </ol>
        <div className="about-existing-values">
          <h3>What matters to us</h3>
          <p>Kindness in ordinary moments. Respect for different experiences. Clear conversations with you and the people you choose. Canadian veterans and their families are welcome here.</p>
          <div className="brand-values">{['Caring', 'Dependable', 'Respectful', 'Professional'].map(value => <div key={value}>{value}</div>)}</div>
        </div>
      </Container>
    </section>

    <section className="section" aria-labelledby="our-promise-heading">
      <Container className="about-content">
        <div className="about-promise">
          <h2 id="our-promise-heading">Our Promise to You</h2>
          <p className="promise-statement">{promise.statement}</p>
          <p>{promise.reassurance}</p>
          <p>{promise.closing} <strong>CARE.</strong></p>
        </div>
      </Container>
    </section>

    <ContactCTA title="Let’s get started today." description="Give your family the exceptional quality of care you deserve!" />
  </>;
}
