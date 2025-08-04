// Utility for parsing Google Sheets CSV data

// Request counter for debugging
let requestCounter = 0;

export interface RentPeriod {
  id: string;
  month: string;
  startDay: number;
  endDay: number;
}

export interface PropertyMapping {
  csvName: string;
  propertyId: number;
}

// Mapping between CSV names and property IDs
const PROPERTY_MAPPINGS: PropertyMapping[] = [
  { csvName: "Ленинский 36 1 комната", propertyId: 2 }, // 1-room apartment
  { csvName: "Ленинский 36 2 комнаты", propertyId: 1 }, // 2-room apartment
  { csvName: "Ленинский 36 комната 2", propertyId: 1 }, // Alternative name for 2-room
  { csvName: "Согласия 50", propertyId: 3 },
];

// Russian month names mapping (with common variations)
const RUSSIAN_MONTHS: { [key: string]: number } = {
  январь: 1,
  января: 1,
  jan: 1,
  февраль: 2,
  февраля: 2,
  feb: 2,
  март: 3,
  марта: 3,
  mar: 3,
  апрель: 4,
  апреля: 4,
  apr: 4,
  май: 5,
  мая: 5,
  may: 5,
  июнь: 6,
  июня: 6,
  jun: 6,
  июль: 7,
  июля: 7,
  jul: 7,
  август: 8,
  августа: 8,
  aug: 8,
  сентябрь: 9,
  сентября: 9,
  sep: 9,
  октябрь: 10,
  октября: 10,
  oct: 10,
  ноябрь: 11,
  ноября: 11,
  nov: 11,
  декабрь: 12,
  декабря: 12,
  dec: 12,
};

/**
 * Downloads and parses CSV data from Google Sheets
 */
export async function fetchAndParseRentData(
  csvUrl: string
): Promise<RentPeriod[]> {
  try {
    requestCounter++;
    // Add timestamp to see when requests are made
    console.log(
      `[${new Date().toLocaleTimeString()}] 🌐 CSV Request #${requestCounter} - Fetching from Google Sheets...`
    );

    const response = await fetch(csvUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch CSV: ${response.status} ${response.statusText}`
      );
    }

    const csvText = await response.text();
    const rentPeriods = parseCsvData(csvText);

    console.log(
      `[${new Date().toLocaleTimeString()}] ✅ CSV Request #${requestCounter} completed - ${
        rentPeriods.length
      } rent periods found`
    );

    return rentPeriods;
  } catch (error) {
    console.error(`❌ CSV Request #${requestCounter} failed:`, error);
    throw error;
  }
}
/**
 * Parses CSV text into RentPeriod objects
 */
function parseCsvData(csvText: string): RentPeriod[] {
  const lines = csvText.trim().split("\n");

  if (lines.length < 2) {
    throw new Error("CSV must have at least header and one data row");
  }

  // Skip header row
  const dataLines = lines.slice(1);
  const rentPeriods: RentPeriod[] = [];

  for (const line of dataLines) {
    const [id, month, startDay, endDay] = line
      .split(",")
      .map((field) => field.trim());

    if (!id || !month || !startDay || !endDay) {
      console.warn("Skipping invalid CSV row:", line);
      continue;
    }

    const parsedStartDay = parseInt(startDay, 10);
    const parsedEndDay = parseInt(endDay, 10);

    if (isNaN(parsedStartDay) || isNaN(parsedEndDay)) {
      console.warn("Invalid day values in CSV row:", line);
      continue;
    }

    rentPeriods.push({
      id,
      month: month.toLowerCase(),
      startDay: parsedStartDay,
      endDay: parsedEndDay,
    });
  }

  return rentPeriods;
}

/**
 * Maps CSV property names to our internal property IDs
 */
export function mapCsvPropertyToId(csvPropertyName: string): number | null {
  const mapping = PROPERTY_MAPPINGS.find(
    (m) => m.csvName.toLowerCase() === csvPropertyName.toLowerCase()
  );
  return mapping ? mapping.propertyId : null;
}

/**
 * Converts Russian month name to number
 */
export function getRussianMonthNumber(monthName: string): number | null {
  const normalizedMonth = monthName.toLowerCase().trim();
  return RUSSIAN_MONTHS[normalizedMonth] || null;
}

/**
 * Gets current month number (1-12)
 */
export function getCurrentMonth(): number {
  return new Date().getMonth() + 1;
}

/**
 * Filters rent periods for a specific property and current month
 */
export function getRentPeriodsForProperty(
  rentPeriods: RentPeriod[],
  propertyId: number,
  currentMonth?: number
): RentPeriod[] {
  const targetMonth = currentMonth || getCurrentMonth();
  const currentMonthName = Object.keys(RUSSIAN_MONTHS).find(
    (month) => RUSSIAN_MONTHS[month] === targetMonth
  );

  if (!currentMonthName) {
    return [];
  }

  return rentPeriods.filter((period) => {
    const periodPropertyId = mapCsvPropertyToId(period.id);
    const periodMonthNumber = getRussianMonthNumber(period.month);

    return periodPropertyId === propertyId && periodMonthNumber === targetMonth;
  });
}

/**
 * Checks if a specific date is within any rent period for a property
 */
export function isDateRented(
  rentPeriods: RentPeriod[],
  propertyId: number,
  day: number,
  month?: number
): boolean {
  const propertyRentPeriods = getRentPeriodsForProperty(
    rentPeriods,
    propertyId,
    month
  );

  return propertyRentPeriods.some(
    (period) => day >= period.startDay && day <= period.endDay
  );
}

/**
 * Gets all rented days for a property in current month
 */
export function getRentedDaysForProperty(
  rentPeriods: RentPeriod[],
  propertyId: number,
  month?: number
): number[] {
  const propertyRentPeriods = getRentPeriodsForProperty(
    rentPeriods,
    propertyId,
    month
  );
  const rentedDays: number[] = [];

  for (const period of propertyRentPeriods) {
    for (let day = period.startDay; day <= period.endDay; day++) {
      if (!rentedDays.includes(day)) {
        rentedDays.push(day);
      }
    }
  }

  return rentedDays.sort((a, b) => a - b);
}

/**
 * Main function to get rent data with property mapping
 */
export async function getPropertyRentData(csvUrl: string) {
  try {
    const rentPeriods = await fetchAndParseRentData(csvUrl);

    // Group by property ID
    const propertyRentData: { [propertyId: number]: RentPeriod[] } = {};

    for (const period of rentPeriods) {
      const propertyId = mapCsvPropertyToId(period.id);
      if (propertyId) {
        if (!propertyRentData[propertyId]) {
          propertyRentData[propertyId] = [];
        }
        propertyRentData[propertyId].push(period);
      }
    }

    return {
      rentPeriods,
      propertyRentData,
    };
  } catch (error) {
    console.error("Error getting property rent data:", error);
    throw error;
  }
}
