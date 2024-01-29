import React from 'react';
import styles from '../components/css/PricingCard.module.css';
import Eclipse from '../components/icons/Eclipse';
import EclipseSmallBalls from '../components/icons/EclipseSmallBalls';
const PricingPage = () => {
  return (
    <section className="my-16 flex-col justify-center items-center">
      <h1 className="text-center text-4xl mb-8 font-bold">Simple Pricing</h1>
      <p className="text-center mb-4">Start for free, upgrade when you need</p>

      <div className={styles.featureItem}>
        <div className={styles.featureItemList}>
          <FeatureItem text="Unlimited Users" />
          <FeatureItem text="Unlimited Content" />
          <FeatureItem text="Unlimited Admins" />
        </div>
        <div className={styles.eclipseContainer}>
            <EclipseSmallBalls />
        </div>
      </div>

      <div className={styles.upgradeButtonContainer}>
        <div className={styles.upgradeButton}>
          <button className="bg-[--primary] text-white px-4 py-2 rounded-lg font-bold">
            Upgrade to Premium
          </button>
        </div>
      </div>

      <div className={styles.pricingCardContainer}>
        <div className={styles.pricingCardStyle}>
          <Eclipse />
        </div>
          
        <div className={styles.pricingCard}>
          <PricingCard
            title="Free Forever"
            description="Just the basics"
            price="$0.0"
            features={[
              '1 board',
              'Single sign-on',
              'Unlimited admins',
              'Unlimited feedbacks',
              'Unlimited users',
            ]}
          />
          <PricingCard
            title="Premium"
            description="More control and insights"
            price="$19.9"
            features={[
              '1 board',
              'Single sign-on',
              'Unlimited admins',
              'Unlimited feedbacks',
              'Unlimited users',
            ]}
          />
      </div>

      </div>
    </section>
  );
};

const FeatureItem = ({ text }) => (
  <div className="flex items-center gap-2 mb-2">
    <div className="bg-[--primary] w-5 h-5 rounded-full flex items-center justify-center text-white">✓</div>
    <span>{text}</span>
  </div>
);

const PricingCard = ({ title, description, price, features }) => (
  <div className={styles.pricingCardHeader}>
    <div className={styles.cardText}>
      <div className="cardheader">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-500 text-sm mb-4">{description}</p>
      </div>
      <div className="flex justify-center md:justify-start mt-5">
        <span className="text-5xl font-bold">{price}</span>
        <span className="text-gray-500 text-sm self-end ml-1">/month</span>
      </div>
    </div>
    <ul className="text-sm text-gray-500 mt-4">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-2 mb-3">
          <div className="bg-[--primary] w-5 h-5 rounded-full flex items-center text-white justify-center">✓</div>
          {feature}
        </li>
      ))}
    </ul>
  </div>
);

export default PricingPage;
