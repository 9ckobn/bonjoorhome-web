'use client'

import React from 'react'
import { ArrowRight, Play } from 'lucide-react'
import { smoothScrollTo } from '@/utils/helpers'

const Hero = () => {
  const priceFrom = process.env.NEXT_PUBLIC_PRICE_FROM || '3000'
  const years = process.env.NEXT_PUBLIC_YEARS_EXPERIENCE || '5+'
  const clients = process.env.NEXT_PUBLIC_HAPPY_CLIENTS || '150+'
  const properties = process.env.NEXT_PUBLIC_PROPERTIES || '30+'
  const tourVideoUrl = process.env.NEXT_PUBLIC_TOUR_VIDEO_URL || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'

  const handleWatchTour = () => {
    window.open(tourVideoUrl, '_blank')
  }

  const handleExploreHomes = () => {
    smoothScrollTo('properties')
  }

  return (
    <section id="home" className="section-padding bg-gradient-to-br from-primary-50 to-blue-50 min-h-screen flex items-center">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Найдите идеальное
              <span className="text-primary-600 block">жилье для аренды</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Уютные квартиры, дома и студии в лучших районах города. 
              Комфортное проживание по доступным ценам.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={handleExploreHomes}
                className="btn-primary group inline-flex items-center"
              >
                Посмотреть варианты
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={handleWatchTour}
                className="btn-secondary group inline-flex items-center"
              >
                <Play className="mr-2 h-5 w-5" />
                Видео-тур
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary-600">{clients}</div>
                <div className="text-gray-600">Довольных клиентов</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary-600">{properties}</div>
                <div className="text-gray-600">Объектов в аренду</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary-600">{years}</div>
                <div className="text-gray-600">Лет опыта</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Video/Image */}
          <div className="relative animate-slide-up">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Placeholder for video - you can replace this with actual video */}
              <video 
                className="w-full h-[500px] object-cover"
                poster="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80"
                controls={false}
                muted
                loop
                autoPlay
              >
                <source src="/videos/hero-tour.mp4" type="video/mp4" />
                {/* Fallback image if video doesn't load */}
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80"
                  alt="Современное жилье для аренды"
                  className="w-full h-[500px] object-cover"
                />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 animate-bounce-slow">
              <div className="text-sm text-gray-600">Цены от</div>
              <div className="text-2xl font-bold text-primary-600">{priceFrom}₽/сутки</div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4">
              <div className="text-sm text-gray-600">Видео-просмотры</div>
              <div className="text-lg font-semibold text-gray-900">Доступны 24/7</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
