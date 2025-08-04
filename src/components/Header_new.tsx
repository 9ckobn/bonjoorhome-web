"use client";

import React, { useState } from "react";
import { Menu, X, Home, Phone } from "lucide-react";
import { smoothScrollTo, makePhoneCall } from "@/utils/helpers";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE || "РентДом";
  const phoneNumber =
    process.env.NEXT_PUBLIC_PHONE_NUMBER || "+7 (999) 123-45-67";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handlePhoneClick = () => {
    makePhoneCall(phoneNumber);
  };

  const handleNavClick = (sectionId: string) => {
    smoothScrollTo(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-primary-600" />
            <button
              onClick={() => handleNavClick("home")}
              className="text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors"
            >
              {siteTitle}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={handlePhoneClick}
              className="flex items-center text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              <Phone className="h-4 w-4 mr-2" />
              {phoneNumber}
            </button>
            <button
              onClick={() => handleNavClick("properties")}
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Аренда жилья
            </button>
            <button
              onClick={() => handleNavClick("about")}
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              О нас
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Контакты
            </button>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <button onClick={handlePhoneClick} className="btn-primary">
              Позвонить
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
              <button
                onClick={() => {
                  handlePhoneClick();
                }}
                className="flex items-center w-full px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <Phone className="h-4 w-4 mr-2" />
                {phoneNumber}
              </button>
              <button
                onClick={() => handleNavClick("properties")}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                Аренда жилья
              </button>
              <button
                onClick={() => handleNavClick("about")}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                О нас
              </button>
              <button
                onClick={() => handleNavClick("contact")}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                Контакты
              </button>
              <div className="px-3 py-2">
                <button
                  onClick={handlePhoneClick}
                  className="btn-primary w-full"
                >
                  Позвонить
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
