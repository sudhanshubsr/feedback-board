'use client';
import FaqQuestion from "../components/FaqQuestions";

export default function HelpPage() {
  const email = 'support@feedbackboards.com';
  return (
    <div className="mt-16 mb-40">
      <h1 className="text-center text-4xl mb-6">Help Center</h1>
      <p className="text-center mb-8">
        Check our faq or drop us an email: {email}
      </p>
      <div className="px-3 flex flex-col items-center">
        <FaqQuestion question="Can I cancel my subscription anytime?">
          <p className="max-w-[700px]">Yes, you can downgrade in your account page.</p>
        </FaqQuestion>
        <FaqQuestion question="Can I use the free version forever?">
          Yes
        </FaqQuestion>
        <FaqQuestion question="How can i contact support?">
          Send us an email: {email}
        </FaqQuestion>
      </div>
    </div>
  );
}