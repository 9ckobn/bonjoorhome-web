import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  placeholder?: string;
  unavailableDates?: Date[]; // For showing rented dates
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  className = "",
  placeholder = "Выберите даты",
  unavailableDates = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  // Default minDate to start of today
  const defaultMinDate = new Date();
  defaultMinDate.setHours(0, 0, 0, 0);
  const effectiveMinDate = minDate || defaultMinDate;

  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  // Format date for display
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Get display text for the input
  const getDisplayText = () => {
    if (value.startDate && value.endDate) {
      return `${formatDate(value.startDate)} - ${formatDate(value.endDate)}`;
    } else if (value.startDate) {
      return `${formatDate(value.startDate)} - ...`;
    }
    return placeholder;
  };

  // Check if date is same day
  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  // Check if a date range contains unavailable dates
  const rangeContainsUnavailableDates = (
    startDate: Date,
    endDate: Date
  ): boolean => {
    const start = startDate < endDate ? startDate : endDate;
    const end = startDate < endDate ? endDate : startDate;

    return unavailableDates.some((unavailableDate) => {
      return unavailableDate >= start && unavailableDate <= end;
    });
  };

  // Check if date is in range
  const isInRange = (date: Date) => {
    if (!value.startDate) return false;

    const endDate =
      hoverDate && value.startDate && !value.endDate
        ? hoverDate
        : value.endDate;
    if (!endDate) return false;

    const start = value.startDate < endDate ? value.startDate : endDate;
    const end = value.startDate < endDate ? endDate : value.startDate;

    // Check if date is in range and the range doesn't contain unavailable dates
    const isInDateRange = date >= start && date <= end;
    if (!isInDateRange) return false;

    // If this is a hover preview, check if the range would contain unavailable dates
    if (hoverDate && value.startDate && !value.endDate) {
      return !rangeContainsUnavailableDates(value.startDate, hoverDate);
    }

    return true;
  };

  // Check if date is unavailable
  const isUnavailable = (date: Date) => {
    return unavailableDates.some((unavailableDate) =>
      isSameDay(date, unavailableDate)
    );
  };

  // Check if date is disabled
  const isDisabled = (date: Date) => {
    if (isUnavailable(date)) return true;
    if (effectiveMinDate && date < effectiveMinDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  // Handle date click
  const handleDateClick = (date: Date) => {
    if (isDisabled(date)) return;

    if (!value.startDate || (value.startDate && value.endDate)) {
      // Start new selection
      onChange({ startDate: date, endDate: null });
    } else if (value.startDate && !value.endDate) {
      // Set end date
      if (date < value.startDate) {
        // If clicked date is before start date, make it the new start date
        onChange({ startDate: date, endDate: null });
      } else {
        // Check if the range contains unavailable dates
        if (rangeContainsUnavailableDates(value.startDate, date)) {
          // If range contains unavailable dates, start a new selection with clicked date
          onChange({ startDate: date, endDate: null });
        } else {
          // Set as end date
          onChange({ startDate: value.startDate, endDate: date });
          setIsOpen(false);
        }
      }
    }
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Start from Monday (1) instead of Sunday (0)
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7;

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  // Navigate months
  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".date-range-picker")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const calendarDays = generateCalendarDays();

  return (
    <div className={`date-range-picker relative ${className}`}>
      {/* Input Field */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 transition-colors cursor-pointer bg-white"
      >
        <span className={value.startDate ? "text-gray-900" : "text-gray-500"}>
          {getDisplayText()}
        </span>
      </div>

      {/* Calendar Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 min-w-[300px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={goToPreviousMonth}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <h3 className="font-medium text-gray-900">
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>

            <button
              type="button"
              onClick={goToNextMonth}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
              <div
                key={day}
                className="text-xs font-medium text-gray-500 text-center py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, index) => {
              if (!date) {
                return <div key={index} className="h-8" />;
              }

              const isSelected =
                (value.startDate && isSameDay(date, value.startDate)) ||
                (value.endDate && isSameDay(date, value.endDate));
              const isInRangeDay = isInRange(date);
              const isDisabledDay = isDisabled(date);
              const isToday = isSameDay(date, new Date());

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleDateClick(date)}
                  onMouseEnter={() => setHoverDate(date)}
                  onMouseLeave={() => setHoverDate(null)}
                  disabled={isDisabledDay}
                  className={`
                    h-8 text-sm rounded transition-colors relative
                    ${
                      isDisabledDay
                        ? "text-gray-300 cursor-not-allowed"
                        : "hover:bg-blue-50 cursor-pointer"
                    }
                    ${
                      isSelected
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : ""
                    }
                    ${
                      isInRangeDay && !isSelected
                        ? "bg-blue-100 text-blue-900"
                        : ""
                    }
                    ${
                      isToday && !isSelected && !isDisabledDay
                        ? "ring-1 ring-blue-600"
                        : ""
                    }
                    ${
                      isUnavailable(date) && !isDisabledDay
                        ? "bg-red-100 text-red-600"
                        : ""
                    }
                  `}
                >
                  {date.getDate()}
                  {isUnavailable(date) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-0.5 h-6 bg-red-500 rotate-45" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 text-xs text-gray-500 space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded"></div>
              <span>Выбранные даты</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-100 rounded"></div>
              <span>Период</span>
            </div>
            {unavailableDates.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-100 rounded relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-0.5 h-3 bg-red-500 rotate-45" />
                  </div>
                </div>
                <span>Недоступно</span>
              </div>
            )}
          </div>

          {/* Clear button */}
          {(value.startDate || value.endDate) && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  onChange({ startDate: null, endDate: null });
                  setIsOpen(false);
                }}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Очистить выбор
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
