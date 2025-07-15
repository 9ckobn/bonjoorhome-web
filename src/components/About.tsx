'use client'

import React from 'react'
import { CheckCircle, Users, Building, TrendingUp } from 'lucide-react'

const About = () => {
  const years = process.env.NEXT_PUBLIC_YEARS_EXPERIENCE || '5+'
  const clients = process.env.NEXT_PUBLIC_HAPPY_CLIENTS || '150+'
  const properties = process.env.NEXT_PUBLIC_PROPERTIES || '30+'
  const awards = process.env.NEXT_PUBLIC_AWARDS || '5+'

  const stats = [
    { value: years, label: 'Лет опыта' },
    { value: clients, label: 'Довольных клиентов' },
    { value: properties, label: 'Объектов в портфеле' },
    { value: awards, label: 'Наград получено' },
  ]

  const achievements = [
    'Индивидуальный подход к каждому клиенту',
    'Только проверенные и качественные объекты',
    'Гарантия безопасности и комфорта',
    'Профессиональное управление недвижимостью',
    'Круглосуточная поддержка гостей',
    'Гибкие условия аренды',
  ]

  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Ваш надежный партнер в аренде жилья
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Мы специализируемся на краткосрочной аренде качественного жилья в лучших 
              районах города. Наша команда тщательно отбирает каждый объект, чтобы 
              обеспечить вам максимальный комфорт и безопасность.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-primary-600 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{achievement}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Modern kitchen"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Living room"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
              <div className="space-y-4 mt-8">
                <img
                  src="https://images.unsplash.com/photo-1571624436279-b272aff752b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Bedroom"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Bathroom"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Floating Achievement Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-6 max-w-xs">
              <div className="flex items-center mb-2">
                <Building className="h-8 w-8 text-primary-600 mr-3" />
                <div>
                  <div className="font-semibold text-gray-900">Лучший сервис 2024</div>
                  <div className="text-sm text-gray-600">Награда клиентов</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
