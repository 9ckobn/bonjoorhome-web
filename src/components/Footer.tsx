'use client'

import React from 'react'
import { Home, MessageCircle, Phone, Mail, MapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE || 'РентДом'
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+7 (999) 123-45-67'
  const email = process.env.NEXT_PUBLIC_EMAIL || 'info@rentdom.ru'
  const address = process.env.NEXT_PUBLIC_ADDRESS || 'г. Москва, ул. Примерная, д. 123'
  
  const viberLink = process.env.NEXT_PUBLIC_VIBER_LINK || 'viber://chat?number=%2B79991234567'
  const whatsappLink = process.env.NEXT_PUBLIC_WHATSAPP_LINK || 'https://wa.me/79991234567'
  const avitoLink = process.env.NEXT_PUBLIC_AVITO_LINK || 'https://www.avito.ru/user/example'
  const telegramLink = process.env.NEXT_PUBLIC_TELEGRAM_LINK || 'https://t.me/rentdom_moscow'

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber.replace(/[^\d+]/g, '')}`
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom">
        {/* Main Footer */}
        <div className="section-padding border-b border-gray-800">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Home className="h-8 w-8 text-primary-400" />
                <span className="text-2xl font-bold">{siteTitle}</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Качественная краткосрочная аренда жилья в лучших районах города. 
                Ваш комфорт и безопасность — наш приоритет.
              </p>
              
              {/* Social Links */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold mb-3">Мы в соцсетях</h4>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    <span className="text-sm">WhatsApp</span>
                  </a>
                  
                  <a
                    href={viberLink}
                    className="flex items-center p-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    <span className="text-sm">Viber</span>
                  </a>
                  
                  <a
                    href={telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    <span className="text-sm">Telegram</span>
                  </a>
                  
                  <a
                    href={avitoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <Home className="h-5 w-5 mr-2" />
                    <span className="text-sm">Авито</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Навигация</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#home" className="text-gray-300 hover:text-white transition-colors">
                    Главная
                  </a>
                </li>
                <li>
                  <a href="#properties" className="text-gray-300 hover:text-white transition-colors">
                    Варианты аренды
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                    О нас
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
                    Контакты
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Контакты</h3>
              <div className="space-y-3">
                <button
                  onClick={handlePhoneClick}
                  className="flex items-center text-gray-300 hover:text-white transition-colors"
                >
                  <Phone className="h-5 w-5 text-primary-400 mr-3 flex-shrink-0" />
                  <span>{phoneNumber}</span>
                </button>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center text-gray-300 hover:text-white transition-colors"
                >
                  <Mail className="h-5 w-5 text-primary-400 mr-3 flex-shrink-0" />
                  <span>{email}</span>
                </a>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              © {currentYear} {siteTitle}. Все права защищены.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
