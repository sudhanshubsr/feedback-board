'use client'

import React from 'react';
import styles from '../components/css/PricingCard.module.css';
import Eclipse from '../components/icons/Eclipse';
import EclipseSmallBalls from '../components/icons/EclipseSmallBalls';
import axios from 'axios';

const PricingPage = () => {

  const handleUpgradeButtonClick = (e) => {
    e.preventDefault();
    axios.post('/api/subscription').then((response) => {
      window.location.href = response.data;
    });
  }
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
          <button 
          onClick={handleUpgradeButtonClick}  
          className="gradient-top-left  text-[--primary] px-4 py-2 rounded-lg font-bold">
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
              'Everything in Free',
              'Unlimited boards',
              'Invite-only boards',
              'Password-protected boards',
              'Priority support',
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
  <div className="border text-card-foreground  bg-[--platinum] flex flex-row md:flex-row  rounded-lg shadow-lg overflow-hidden max-w-full mx-auto" data-v0-t="card">
    <div className="flex-1 p-6 md:p-8 text-[--primary] gradient-top-left ">
      <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      <p className="text-4xl md:text-5xl font-extrabold my-4">{price}</p>
      <p className="text-sm md:text-base opacity-70">{description}</p>
    </div>
    <div className="flex-1 p-6 md:p-8 space-y-4">
      {features.map((feature, index) => (
        <FeatureCheckbox key={index} label={feature} />
      ))}
    </div>
  </div>
);

const FeatureCheckbox = ({ label }) => (
  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      disabled
      checked
      className="peer h-4 w-4 shrink-0 rounded-sm border bg-[--primary] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset checked:bg-[--primary] checked:border-transparent checked:rounded-sm "
    />
    <label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm md:text-base " htmlFor={label}>
      {label}
    </label>
  </div>
);

export default PricingPage;
