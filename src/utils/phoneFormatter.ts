export interface PhoneValidation {
  isValid: boolean;
  formattedNumber: string;
  error?: string;
}

const PHONE_PATTERNS = {
  RU_KZ_BY: {
    codes: ["7"],
    pattern: /^(\d{3})(\d{3})(\d{2})(\d{2})$/,
    format: "($1) $2-$3-$4",
    minLength: 10,
    maxLength: 10,
  },
  PL: {
    codes: ["48"],
    pattern: /^(\d{3})(\d{3})(\d{3})$/,
    format: "$1 $2 $3",
    minLength: 9,
    maxLength: 9,
  },
};

export function formatPhoneNumber(input: string): string {
  const digits = input.replace(/\D/g, "");

  if (!digits) return "";

  if (digits.startsWith("7") || digits.startsWith("8")) {
    let phoneDigits = digits;

    if (phoneDigits.startsWith("8")) {
      phoneDigits = "7" + phoneDigits.slice(1);
    }

    const numberPart = phoneDigits.slice(1);

    if (numberPart.length <= 3) {
      return `+7 (${numberPart}`;
    } else if (numberPart.length <= 6) {
      return `+7 (${numberPart.slice(0, 3)}) ${numberPart.slice(3)}`;
    } else if (numberPart.length <= 8) {
      return `+7 (${numberPart.slice(0, 3)}) ${numberPart.slice(
        3,
        6
      )}-${numberPart.slice(6)}`;
    } else if (numberPart.length <= 10) {
      return `+7 (${numberPart.slice(0, 3)}) ${numberPart.slice(
        3,
        6
      )}-${numberPart.slice(6, 8)}-${numberPart.slice(8, 10)}`;
    } else {
      const limitedNumber = numberPart.slice(0, 10);
      return `+7 (${limitedNumber.slice(0, 3)}) ${limitedNumber.slice(
        3,
        6
      )}-${limitedNumber.slice(6, 8)}-${limitedNumber.slice(8, 10)}`;
    }
  } else if (digits.startsWith("48")) {
    const numberPart = digits.slice(2);

    if (numberPart.length <= 3) {
      return `+48 ${numberPart}`;
    } else if (numberPart.length <= 6) {
      return `+48 ${numberPart.slice(0, 3)} ${numberPart.slice(3)}`;
    } else if (numberPart.length <= 9) {
      return `+48 ${numberPart.slice(0, 3)} ${numberPart.slice(
        3,
        6
      )} ${numberPart.slice(6, 9)}`;
    } else {
      // Limit to 9 digits after country code
      const limitedNumber = numberPart.slice(0, 9);
      return `+48 ${limitedNumber.slice(0, 3)} ${limitedNumber.slice(
        3,
        6
      )} ${limitedNumber.slice(6, 9)}`;
    }
  } else if (digits.startsWith("375")) {
    // Belarus (alternative format)
    const numberPart = digits.slice(3);

    if (numberPart.length <= 2) {
      return `+375 (${numberPart}`;
    } else if (numberPart.length <= 5) {
      return `+375 (${numberPart.slice(0, 2)}) ${numberPart.slice(2)}`;
    } else if (numberPart.length <= 7) {
      return `+375 (${numberPart.slice(0, 2)}) ${numberPart.slice(
        2,
        5
      )}-${numberPart.slice(5)}`;
    } else if (numberPart.length <= 9) {
      return `+375 (${numberPart.slice(0, 2)}) ${numberPart.slice(
        2,
        5
      )}-${numberPart.slice(5, 7)}-${numberPart.slice(7, 9)}`;
    } else {
      const limitedNumber = numberPart.slice(0, 9);
      return `+375 (${limitedNumber.slice(0, 2)}) ${limitedNumber.slice(
        2,
        5
      )}-${limitedNumber.slice(5, 7)}-${limitedNumber.slice(7, 9)}`;
    }
  } else {
    // For other numbers, try to detect by length and format as Russian
    if (digits.length >= 10) {
      // Assume it's a Russian number without country code
      const numberPart = digits.slice(-10);
      return `+7 (${numberPart.slice(0, 3)}) ${numberPart.slice(
        3,
        6
      )}-${numberPart.slice(6, 8)}-${numberPart.slice(8, 10)}`;
    } else {
      // Return digits with basic formatting attempt
      return `+7 (${digits}`;
    }
  }
}

/**
 * Validates phone number format and completeness
 * @param phoneNumber - Formatted phone number
 * @returns Validation result
 */
export function validatePhoneNumber(phoneNumber: string): PhoneValidation {
  const digits = phoneNumber.replace(/\D/g, "");

  if (!digits) {
    return {
      isValid: false,
      formattedNumber: phoneNumber,
      error: "Введите номер телефона",
    };
  }

  // Check for Russian/Kazakh/Belarusian numbers
  if (digits.startsWith("7") || digits.startsWith("8")) {
    const numberPart = digits.startsWith("8")
      ? digits.slice(1)
      : digits.slice(1);

    if (numberPart.length < 10) {
      return {
        isValid: false,
        formattedNumber: phoneNumber,
        error: "Номер телефона должен содержать 10 цифр после кода страны",
      };
    }

    if (numberPart.length > 10) {
      return {
        isValid: false,
        formattedNumber: phoneNumber,
        error: "Номер телефона слишком длинный",
      };
    }

    return {
      isValid: true,
      formattedNumber: phoneNumber,
    };
  }

  // Check for Polish numbers
  if (digits.startsWith("48")) {
    const numberPart = digits.slice(2);

    if (numberPart.length < 9) {
      return {
        isValid: false,
        formattedNumber: phoneNumber,
        error: "Польский номер должен содержать 9 цифр после кода страны",
      };
    }

    if (numberPart.length > 9) {
      return {
        isValid: false,
        formattedNumber: phoneNumber,
        error: "Номер телефона слишком длинный",
      };
    }

    return {
      isValid: true,
      formattedNumber: phoneNumber,
    };
  }

  // Check for Belarus alternative format
  if (digits.startsWith("375")) {
    const numberPart = digits.slice(3);

    if (numberPart.length < 9) {
      return {
        isValid: false,
        formattedNumber: phoneNumber,
        error: "Белорусский номер должен содержать 9 цифр после кода страны",
      };
    }

    if (numberPart.length > 9) {
      return {
        isValid: false,
        formattedNumber: phoneNumber,
        error: "Номер телефона слишком длинный",
      };
    }

    return {
      isValid: true,
      formattedNumber: phoneNumber,
    };
  }

  // For numbers without country code, assume Russian format
  if (digits.length === 10) {
    return {
      isValid: true,
      formattedNumber: phoneNumber,
    };
  }

  return {
    isValid: false,
    formattedNumber: phoneNumber,
    error: "Неверный формат номера телефона",
  };
}

/**
 * Gets only the digits from a phone number for storage/transmission
 * @param phoneNumber - Formatted phone number
 * @returns Clean digits string
 */
export function getPhoneDigits(phoneNumber: string): string {
  return phoneNumber.replace(/\D/g, "");
}
