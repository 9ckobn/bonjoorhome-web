interface RateLimit {
  count: number;
  resetTime: number;
}

const RATE_LIMIT_KEY = "bonjour_email_limit";
const MAX_EMAILS_PER_DAY = 3;
const DAY_IN_MS = 24 * 60 * 60 * 1000;

export function checkRateLimit(): {
  allowed: boolean;
  remaining: number;
  resetTime?: Date;
} {
  if (typeof window === "undefined")
    return { allowed: true, remaining: MAX_EMAILS_PER_DAY };

  const now = Date.now();
  const stored = localStorage.getItem(RATE_LIMIT_KEY);

  let rateLimit: RateLimit;

  if (stored) {
    try {
      rateLimit = JSON.parse(stored);

      // Check if reset time has passed
      if (now > rateLimit.resetTime) {
        rateLimit = { count: 0, resetTime: now + DAY_IN_MS };
      }
    } catch (e) {
      // Invalid JSON, reset
      rateLimit = { count: 0, resetTime: now + DAY_IN_MS };
    }
  } else {
    rateLimit = { count: 0, resetTime: now + DAY_IN_MS };
  }

  if (rateLimit.count >= MAX_EMAILS_PER_DAY) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: new Date(rateLimit.resetTime),
    };
  }

  // Increment count
  rateLimit.count++;
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(rateLimit));

  return {
    allowed: true,
    remaining: MAX_EMAILS_PER_DAY - rateLimit.count,
  };
}

export function getRemainingEmails(): number {
  if (typeof window === "undefined") return MAX_EMAILS_PER_DAY;

  const stored = localStorage.getItem(RATE_LIMIT_KEY);

  if (!stored) {
    return MAX_EMAILS_PER_DAY;
  }

  try {
    const rateLimit: RateLimit = JSON.parse(stored);
    const now = Date.now();

    // If reset time passed, return max
    if (now > rateLimit.resetTime) {
      return MAX_EMAILS_PER_DAY;
    }

    return Math.max(0, MAX_EMAILS_PER_DAY - rateLimit.count);
  } catch (e) {
    return MAX_EMAILS_PER_DAY;
  }
}
