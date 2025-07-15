'use client'

import React, { useState, useEffect } from 'react'
import { MapPin, Star, Users, Calendar, ChevronLeft, ChevronRight, Phone, Mail, X } from 'lucide-react'

interface Property {
  id: number
  type: string
  title: string
  price: number
  address: string
  area: string
  rooms: number
  floor: string
  amenities: string[]
  description: string
  images: string[]
  available: boolean
  rating: number
  reviews: number
}

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  property: Property | null
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, property }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    message: ''
  })
  const [isClosing, setIsClosing] = useState(false)

  if (!isOpen && !isClosing) return null
  if (!property) return null

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 300)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      alert('Пожалуйста, заполните все обязательные поля')
      return
    }

    try {
      // Here you would send email via API
      const emailData = {
        type: 'booking',
        property: property.title,
        propertyId: property.id,
        ...formData,
        timestamp: new Date().toISOString()
      }
      
      console.log('Booking request:', emailData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.')
      handleClose()
      setFormData({ name: '', phone: '', checkIn: '', checkOut: '', message: '' })
    } catch (error) {
      alert('Произошла ошибка при отправке заявки. Попробуйте позже.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 ${
      isClosing ? 'animate-fade-out' : 'animate-fade-in'
    }`}>
      <div className={`bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto ${
        isClosing ? 'animate-modal-exit' : 'animate-modal-enter'
      }`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Забронировать {property.title}</h3>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ваше имя <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="Иван Петров"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Телефон <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="+7 (999) 123-45-67"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Заезд
                </label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Выезд
                </label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Комментарий <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="Расскажите о ваших пожеланиях..."
              />
            </div>

            <div className="bg-gray-50 p-3 rounded-md">
              <div className="text-sm text-gray-600">Стоимость за сутки:</div>
              <div className="text-xl font-bold text-primary-600">{property.price.toLocaleString()}₽</div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
            >
              Отправить заявку
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

const PropertyCard: React.FC<{ property: Property; onBooking: (property: Property) => void }> = ({ 
  property, 
  onBooking 
}) => {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Image Gallery */}
      <div className="relative h-64">
        <img
          src={property.images[currentImage] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'}
          alt={property.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
          }}
        />
        
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-1 hover:bg-white transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-1 hover:bg-white transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            
            {/* Image indicators */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {property.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImage ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Availability status */}
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            property.available 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {property.available ? 'Доступно' : 'Занято'}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 flex items-center">
          <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
          <span className="text-xs font-medium">{property.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-sm text-gray-500">{property.type}</span>
            <h3 className="font-semibold text-gray-900">{property.title}</h3>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-primary-600">
              {property.price.toLocaleString()}₽
            </div>
            <div className="text-sm text-gray-500">за сутки</div>
          </div>
        </div>

        <div className="flex items-center text-gray-600 text-sm mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          {property.address}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <span>{property.area}</span>
          <span className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {property.rooms} комн.
          </span>
          <span>{property.floor}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {property.description}
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1 mb-4">
          {property.amenities.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {amenity}
            </span>
          ))}
          {property.amenities.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              +{property.amenities.length - 3}
            </span>
          )}
        </div>

        <button
          onClick={() => onBooking(property)}
          disabled={!property.available}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            property.available
              ? 'bg-primary-600 hover:bg-primary-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {property.available ? 'Забронировать' : 'Недоступно'}
        </button>
      </div>
    </div>
  )
}

const Properties = () => {
  const [properties, setProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const response = await fetch('/data/properties.json')
        const data = await response.json()
        setProperties(data.properties)
        setFilteredProperties(data.properties)
      } catch (error) {
        console.error('Error loading properties:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProperties()
  }, [])

  useEffect(() => {
    let filtered = properties
    if (filter === 'available') {
      filtered = properties.filter(p => p.available)
    } else if (filter !== 'all') {
      filtered = properties.filter(p => p.type.includes(filter))
    }
    setFilteredProperties(filtered)
  }, [filter, properties])

  const handleBooking = (property: Property) => {
    setSelectedProperty(property)
    setIsModalOpen(true)
  }

  if (loading) {
    return (
      <section id="properties" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Загружаем варианты жилья...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="properties" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Варианты аренды
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Выберите идеальное жилье из нашего каталога проверенных объектов
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Все варианты
          </button>
          <button
            onClick={() => setFilter('available')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'available'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Доступные
          </button>
          <button
            onClick={() => setFilter('квартира')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'квартира'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Квартиры
          </button>
          <button
            onClick={() => setFilter('Студия')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'Студия'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Студии
          </button>
          <button
            onClick={() => setFilter('дом')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'дом'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Дома
          </button>
        </div>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onBooking={handleBooking}
            />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">По выбранным критериям ничего не найдено</p>
          </div>
        )}

        {/* Contact Modal */}
        <ContactModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          property={selectedProperty}
        />
      </div>
    </section>
  )
}

export default Properties
