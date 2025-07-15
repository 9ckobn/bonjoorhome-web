'use client'

import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { makePhoneCall, sendEmail } from '../utils/helpers'

const Contact = () => {
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+7 (999) 123-45-67'
  const email = process.env.NEXT_PUBLIC_EMAIL || 'info@rentdom.ru'
  const emailTo = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@rentdom.ru'
  const address = process.env.NEXT_PUBLIC_ADDRESS || 'г. Москва, ул. Примерная, д. 123'
  const workHours = process.env.NEXT_PUBLIC_WORK_HOURS || 'Ежедневно с 9:00 до 21:00'

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      alert('Пожалуйста, заполните все обязательные поля')
      return
    }

    setIsSubmitting(true)

    try {
      const emailData = {
        type: 'contact',
        subject: 'Новая заявка с сайта',
        ...formData,
        timestamp: new Date().toISOString()
      }
      
      await sendEmail(emailTo, JSON.stringify(emailData))
      
      alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.')
      setFormData({ name: '', phone: '', date: '', message: '' })
    } catch (error) {
      console.error('Error sending email:', error)
      alert('Произошла ошибка при отправке заявки. Попробуйте позже или свяжитесь с нами по телефону.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePhoneClick = () => {
    makePhoneCall(phoneNumber)
  }

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Свяжитесь с нами
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Готовы найти идеальное жилье? Оставьте заявку, и мы подберем 
            лучший вариант специально для вас.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">
              Как с нами связаться
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Телефон</h4>
                  <button 
                    onClick={handlePhoneClick}
                    className="text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    {phoneNumber}
                  </button>
                  <p className="text-gray-500 text-sm">Звонки и WhatsApp</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <a 
                    href={`mailto:${email}`}
                    className="text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    {email}
                  </a>
                  <p className="text-gray-500 text-sm">Для деловой переписки</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Адрес</h4>
                  <p className="text-gray-600">{address}</p>
                  <p className="text-gray-500 text-sm">Встречи по предварительной записи</p>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-4">Режим работы</h4>
              <p className="text-gray-600">{workHours}</p>
              <p className="text-gray-500 text-sm mt-2">
                Экстренная связь доступна круглосуточно для гостей
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Оставить заявку
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Ваше имя <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Иван Петров"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Номер телефона <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="+7 (999) 123-45-67"
                />
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Желаемая дата заселения
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Ваши пожелания <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                  placeholder="Расскажите о ваших предпочтениях: количество комнат, район, бюджет..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full group inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Отправляем...' : 'Отправить заявку'}
                <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
