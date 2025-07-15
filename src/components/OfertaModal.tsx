'use client'

import React from 'react'
import { X } from 'lucide-react'

interface OfertaModalProps {
  isOpen: boolean
  onClose: () => void
}

const OfertaModal: React.FC<OfertaModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto animate-modal-enter">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Публичная оферта</h3>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="space-y-4 text-gray-700">
            <h4 className="font-semibold text-lg">ДОГОВОР ОКАЗАНИЯ УСЛУГ ПО КРАТКОСРОЧНОЙ АРЕНДЕ ЖИЛЬЯ</h4>
            
            <div className="space-y-3">
              <p><strong>1. ОБЩИЕ ПОЛОЖЕНИЯ</strong></p>
              <p>1.1. Настоящая публичная оферта (далее — «Оферта») является официальным предложением индивидуального предпринимателя/физического лица (далее — «Арендодатель») заключить договор оказания услуг по краткосрочной аренде жилых помещений.</p>
              
              <p>1.2. Акцептом данной оферты является заполнение и отправка формы бронирования на сайте или любое иное выражение согласия с условиями данного договора.</p>
              
              <p><strong>2. ПРЕДМЕТ ДОГОВОРА</strong></p>
              <p>2.1. Арендодатель обязуется предоставить Арендатору во временное пользование жилое помещение, указанное в заявке на бронирование.</p>
              
              <p>2.2. Срок аренды определяется в заявке на бронирование и не может превышать 90 дней подряд.</p>
              
              <p><strong>3. ПРАВА И ОБЯЗАННОСТИ СТОРОН</strong></p>
              <p>3.1. Арендодатель обязуется:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Предоставить чистое, исправное жилое помещение;</li>
                <li>Обеспечить работоспособность всех коммунальных услуг;</li>
                <li>Предоставить необходимые для проживания предметы быта.</li>
              </ul>
              
              <p>3.2. Арендатор обязуется:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Бережно относиться к имуществу;</li>
                <li>Не нарушать покой соседей;</li>
                <li>Соблюдать правила пожарной безопасности;</li>
                <li>Своевременно оплачивать аренду.</li>
              </ul>
              
              <p><strong>4. СТОИМОСТЬ И ПОРЯДОК ОПЛАТЫ</strong></p>
              <p>4.1. Стоимость аренды указывается в рублях за сутки и определяется согласно прайс-листу на сайте.</p>
              
              <p>4.2. Оплата производится наличными при заселении или безналичным переводом на карту/счет Арендодателя.</p>
              
              <p>4.3. При проживании свыше 7 дней возможна предоплата в размере 50% от общей суммы.</p>
              
              <p><strong>5. ОТВЕТСТВЕННОСТЬ СТОРОН</strong></p>
              <p>5.1. За причинение ущерба имуществу Арендатор несет материальную ответственность в полном размере.</p>
              
              <p>5.2. Арендодатель не несет ответственности за ценности, оставленные Арендатором в помещении.</p>
              
              <p><strong>6. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</strong></p>
              <p>6.1. Договор вступает в силу с момента акцепта оферты и действует до окончания срока аренды.</p>
              
              <p>6.2. Споры разрешаются в соответствии с действующим законодательством РФ.</p>
              
              <p>6.3. Настоящая оферта действует до момента ее отзыва Арендодателем.</p>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm"><strong>Контактная информация:</strong></p>
                <p className="text-sm">Телефон: {process.env.NEXT_PUBLIC_PHONE_NUMBER}</p>
                <p className="text-sm">Email: {process.env.NEXT_PUBLIC_EMAIL}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button 
              onClick={onClose}
              className="btn-primary"
            >
              Понятно
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OfertaModal
