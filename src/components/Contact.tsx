"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Phone, Loader2 } from "lucide-react";
import { makePhoneCall } from "../utils/helpers";
import { checkRateLimit } from "@/utils/clientRateLimit";
import { useNotification } from "@/utils/useNotification";
import { formatPhoneNumber, validatePhoneNumber } from "@/utils/phoneFormatter";
import DateRangePicker from "./DateRangePicker";
import NotificationModal from "./NotificationModal";

const Contact = () => {
  const phoneNumber =
    process.env.NEXT_PUBLIC_PHONE_NUMBER || "+7 (999) 123-45-67";
  const email = process.env.NEXT_PUBLIC_EMAIL || "ponipolos@mail.ru";
  const address =
    process.env.NEXT_PUBLIC_ADDRESS || "г. Москва, ул. Примерная, д. 123";
  const workHours =
    process.env.NEXT_PUBLIC_WORK_HOURS || "Ежедневно с 9:00 до 21:00";

  const serviceId =
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_your_id";
  const templateId =
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT || "template_contact";
  const publicKey =
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "your_public_key";

  const {
    notification,
    isOpen: notificationOpen,
    showSuccess,
    showError,
    showWarning,
    hideNotification,
  } = useNotification();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Apply phone formatting
      const formattedPhone = formatPhoneNumber(value);
      setFormData({ ...formData, [name]: formattedPhone });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation for required fields
    if (!formData.name.trim()) {
      showError("Заполните поле", "Пожалуйста, укажите ваше имя");
      return;
    }

    if (!formData.phone.trim()) {
      showError("Заполните поле", "Пожалуйста, укажите номер телефона");
      return;
    }

    // Validate phone number format
    const phoneValidation = validatePhoneNumber(formData.phone);
    if (!phoneValidation.isValid) {
      showError(
        "Неверный номер телефона",
        phoneValidation.error || "Проверьте правильность номера телефона"
      );
      return;
    }

    if (!formData.message.trim()) {
      showError("Заполните поле", "Пожалуйста, укажите ваше сообщение");
      return;
    }

    // Check rate limiting
    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      showError("Упс! Что-то случилось =(", "Попробуйте попозже");
      return;
    }

    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: formData.name,
        from_phone: formData.phone,
        message: formData.message,
        preferred_start_date:
          dateRange.startDate?.toLocaleDateString("ru-RU") || "Не указано",
        preferred_end_date:
          dateRange.endDate?.toLocaleDateString("ru-RU") || "Не указано",
        timestamp: new Date().toLocaleString("ru-RU"),
      };

      console.log("Template params:", templateParams);

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      // Show success notification with callback to reset form
      showSuccess(
        "Сообщение отправлено!",
        "Спасибо за обращение! Мы свяжемся с вами в ближайшее время.",
        () => {
          // This callback will execute when user clicks "Понятно" button
          setFormData({ name: "", phone: "", message: "" });
          setDateRange({ startDate: null, endDate: null });
        }
      );
    } catch (error) {
      console.error("Error processing form:", error);
      showError("Упс! Что-то случилось =(", "Попробуйте попозже");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneClick = () => {
    makePhoneCall(phoneNumber);
  };

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Свяжитесь с нами
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Готовы найти идеальное жилье? Оставьте заявку, и мы подберем лучший
            вариант специально для вас.
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
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
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
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
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
                <label
                  htmlFor="dateRange"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Желаемые даты проживания
                </label>
                <DateRangePicker
                  value={dateRange}
                  onChange={setDateRange}
                  placeholder="Выберите предпочтительные даты"
                  className="w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
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
                className="btn-primary w-full group inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {isSubmitting ? "Отправляем..." : "Отправить заявку"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Notification Modal */}
      {notification && (
        <NotificationModal
          isOpen={notificationOpen}
          onClose={hideNotification}
          type={notification.type}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
};

export default Contact;
