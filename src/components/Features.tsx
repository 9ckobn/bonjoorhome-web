"use client";

import React from "react";
import { Home, Shield, Zap, Heart, Users, Award } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Home,
      title: "Modern Design",
      description:
        "Contemporary architecture with clean lines and sophisticated aesthetics that stand the test of time.",
    },
    {
      icon: Shield,
      title: "Secure Living",
      description:
        "Advanced security systems and gated communities ensure peace of mind for you and your family.",
    },
    {
      icon: Zap,
      title: "Smart Homes",
      description:
        "Integrated smart home technology for convenience, efficiency, and modern living experiences.",
    },
    {
      icon: Heart,
      title: "Family Friendly",
      description:
        "Thoughtfully designed spaces that bring families together and create lasting memories.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "Vibrant neighborhoods with parks, recreational facilities, and strong community bonds.",
    },
    {
      icon: Award,
      title: "Quality Build",
      description:
        "Premium materials and expert craftsmanship ensure durability and exceptional quality.",
    },
  ];

  return (
    <section id="features" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose BonjourHome?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine innovative design, quality construction, and thoughtful
            amenities to create homes where life&apos;s best moments happen.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                  <IconComponent className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="btn-primary">Schedule a Tour</button>
        </div>
      </div>
    </section>
  );
};

export default Features;
