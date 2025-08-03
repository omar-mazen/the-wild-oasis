import { createClient } from '@supabase/supabase-js';
import { isFuture, isPast, isToday,add } from 'date-fns';
import { subtractDates } from '../src/utils/helpers.js';

function fromToday(numDays, withTime = false) {
  const date = add(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString().slice(0, -1);
}

const bookings = [
  {
    created_at: fromToday(-20, true),
    startDate: fromToday(0),
    endDate: fromToday(7),
    cabinId: 1,
    guestId: 2,
    hasBreakfast: true,
    observations:
      'I have a gluten allergy and would like to request a gluten-free breakfast.',
    isPaid: false,
    numGuests: 1,
  },
  {
    created_at: fromToday(-33, true),
    startDate: fromToday(-23),
    endDate: fromToday(-13),
    cabinId: 1,
    guestId: 3,
    hasBreakfast: true,
    observations: '',
    isPaid: true,
    numGuests: 2,
  },
  {
    created_at: fromToday(-27, true),
    startDate: fromToday(12),
    endDate: fromToday(18),
    cabinId: 1,
    guestId: 4,
    hasBreakfast: false,
    observations: '',
    isPaid: false,
    numGuests: 2,
  },

  // CABIN 002
  {
    created_at: fromToday(-45, true),
    startDate: fromToday(-45),
    endDate: fromToday(-29),
    cabinId: 2,
    guestId: 5,
    hasBreakfast: false,
    observations: '',
    isPaid: true,
    numGuests: 2,
  },
  {
    created_at: fromToday(-2, true),
    startDate: fromToday(15),
    endDate: fromToday(18),
    cabinId: 2,
    guestId: 6,
    hasBreakfast: true,
    observations: '',
    isPaid: true,
    numGuests: 2,
  },
  {
    created_at: fromToday(-5, true),
    startDate: fromToday(33),
    endDate: fromToday(48),
    cabinId: 2,
    guestId: 7,
    hasBreakfast: true,
    observations: '',
    isPaid: false,
    numGuests: 2,
  },

  // CABIN 003
  {
    created_at: fromToday(-65, true),
    startDate: fromToday(-25),
    endDate: fromToday(-20),
    cabinId: 3,
    guestId: 8,
    hasBreakfast: true,
    observations: '',
    isPaid: true,
    numGuests: 4,
  },
  {
    created_at: fromToday(-2, true),
    startDate: fromToday(-2),
    endDate: fromToday(0),
    cabinId: 3,
    guestId: 9,
    hasBreakfast: false,
    observations: 'We will be bringing our small dog with us',
    isPaid: true,
    numGuests: 3,
  },
  {
    created_at: fromToday(-14, true),
    startDate: fromToday(-14),
    endDate: fromToday(-11),
    cabinId: 3,
    guestId: 10,
    hasBreakfast: true,
    observations: '',
    isPaid: true,
    numGuests: 4,
  },

  // CABIN 004
  {
    created_at: fromToday(-30, true),
    startDate: fromToday(-4),
    endDate: fromToday(8),
    cabinId: 4,
    guestId: 11,
    hasBreakfast: true,
    observations: '',
    isPaid: true,
    numGuests: 4,
  },
  {
    created_at: fromToday(-1, true),
    startDate: fromToday(12),
    endDate: fromToday(17),
    cabinId: 4,
    guestId: 12,
    hasBreakfast: true,
    observations: '',
    isPaid: false,
    numGuests: 4,
  },
  {
    created_at: fromToday(-3, true),
    startDate: fromToday(18),
    endDate: fromToday(19),
    cabinId: 4,
    guestId: 13,
    hasBreakfast: false,
    observations: '',
    isPaid: true,
    numGuests: 1,
  },

  // CABIN 005
  {
    created_at: fromToday(0, true),
    startDate: fromToday(14),
    endDate: fromToday(21),
    cabinId: 5,
    guestId: 14,
    hasBreakfast: true,
    observations: '',
    isPaid: false,
    numGuests: 5,
  },
  {
    created_at: fromToday(-6, true),
    startDate: fromToday(-6),
    endDate: fromToday(-4),
    cabinId: 5,
    guestId: 15,
    hasBreakfast: true,
    observations: '',
    isPaid: true,
    numGuests: 4,
  },
  {
    created_at: fromToday(-4, true),
    startDate: fromToday(-4),
    endDate: fromToday(-1),
    cabinId: 5,
    guestId: 16,
    hasBreakfast: false,
    observations: '',
    isPaid: true,
    numGuests: 6,
  },

  // CABIN 006
  {
    created_at: fromToday(-3, true),
    startDate: fromToday(0),
    endDate: fromToday(11),
    cabinId: 6,
    guestId: 17,
    hasBreakfast: false,
    observations:
      "We will be checking in late, around midnight. Hope that's okay :)",
    isPaid: true,
    numGuests: 6,
  },
  {
    created_at: fromToday(-16, true),
    startDate: fromToday(-16),
    endDate: fromToday(-9),
    cabinId: 6,
    guestId: 18,
    hasBreakfast: true,
    observations: 'I will need a rollaway bed for one of the guests',
    isPaid: true,
    numGuests: 4,
  },
  {
    created_at: fromToday(-18, true),
    startDate: fromToday(-4),
    endDate: fromToday(-1),
    cabinId: 6,
    guestId: 19,
    hasBreakfast: true,
    observations: '',
    isPaid: true,
    numGuests: 6,
  },

  // CABIN 007
  {
    created_at: fromToday(-2, true),
    startDate: fromToday(17),
    endDate: fromToday(23),
    cabinId: 7,
    guestId: 20,
    hasBreakfast: false,
    observations: '',
    isPaid: false,
    numGuests: 8,
  },
  {
    created_at: fromToday(-7, true),
    startDate: fromToday(40),
    endDate: fromToday(50),
    cabinId: 7,
    guestId: 21,
    hasBreakfast: true,
    observations: '',
    isPaid: true,
    numGuests: 7,
  },
  {
    created_at: fromToday(-55, true),
    startDate: fromToday(32),
    endDate: fromToday(37),
    cabinId: 7,
    guestId: 22,
    hasBreakfast: true,
    observations: '',
    isPaid: true,
    numGuests: 6,
  },

  // CABIN 008
  {
    created_at: fromToday(-8, true),
    startDate: fromToday(-5),
    endDate: fromToday(0),
    cabinId: 8,
    guestId: 1,
    hasBreakfast: true,
    observations:
      'My wife has a gluten allergy so I would like to request a gluten-free breakfast if possible',
    isPaid: true,
    numGuests: 9,
  },
  {
    created_at: fromToday(0, true),
    startDate: fromToday(0),
    endDate: fromToday(5),
    cabinId: 8,
    guestId: 23,
    hasBreakfast: true,
    observations:
      'I am celebrating my anniversary, can you arrange for any special amenities or decorations?',
    isPaid: true,
    numGuests: 10,
  },
  {
    created_at: fromToday(-10, true),
    startDate: fromToday(10),
    endDate: fromToday(13),
    cabinId: 8,
    guestId: 24,
    hasBreakfast: false,
    observations: '',
    isPaid: true,
    numGuests: 7,
  },
];
 const guests = [
  {
    // id: 1000,
    fullName: 'Jonas Schmedtmann',
    email: 'hello@jonas.io',
    nationality: 'Portugal',
    nationalID: '3525436345',
    countryFlag: 'https://flagcdn.com/pt.svg',
  },
  {
    fullName: 'Jonathan Smith',
    email: 'johnsmith@test.eu',
    nationality: 'Great Britain',
    nationalID: '4534593454',
    countryFlag: 'https://flagcdn.com/gb.svg',
  },
  {
    fullName: 'Jonatan Johansson',
    email: 'jonatan@example.com',
    nationality: 'Finland',
    nationalID: '9374074454',
    countryFlag: 'https://flagcdn.com/fi.svg',
  },
  {
    fullName: 'Jonas Mueller',
    email: 'jonas@example.eu',
    nationality: 'Germany',
    nationalID: '1233212288',
    countryFlag: 'https://flagcdn.com/de.svg',
  },
  {
    fullName: 'Jonas Anderson',
    email: 'anderson@example.com',
    nationality: 'Bolivia (Plurinational State of)',
    nationalID: '0988520146',
    countryFlag: 'https://flagcdn.com/bo.svg',
  },
  {
    fullName: 'Jonathan Williams',
    email: 'jowi@gmail.com',
    nationality: 'United States of America',
    nationalID: '633678543',
    countryFlag: 'https://flagcdn.com/us.svg',
  },

  // GPT
  {
    fullName: 'Emma Watson',
    email: 'emma@gmail.com',
    nationality: 'United Kingdom',
    nationalID: '1234578901',
    countryFlag: 'https://flagcdn.com/gb.svg',
  },
  {
    fullName: 'Mohammed Ali',
    email: 'mohammedali@yahoo.com',
    nationality: 'Egypt',
    nationalID: '987543210',
    countryFlag: 'https://flagcdn.com/eg.svg',
  },
  {
    fullName: 'Maria Rodriguez',
    email: 'maria@gmail.com',
    nationality: 'Spain',
    nationalID: '1098765321',
    countryFlag: 'https://flagcdn.com/es.svg',
  },
  {
    fullName: 'Li Mei',
    email: 'li.mei@hotmail.com',
    nationality: 'China',
    nationalID: '102934756',
    countryFlag: 'https://flagcdn.com/cn.svg',
  },
  {
    fullName: 'Khadija Ahmed',
    email: 'khadija@gmail.com',
    nationality: 'Sudan',
    nationalID: '1023457890',
    countryFlag: 'https://flagcdn.com/sd.svg',
  },
  {
    fullName: 'Gabriel Silva',
    email: 'gabriel@gmail.com',
    nationality: 'Brazil',
    nationalID: '109283465',
    countryFlag: 'https://flagcdn.com/br.svg',
  },
  {
    fullName: 'Maria Gomez',
    email: 'maria@example.com',
    nationality: 'Mexico',
    nationalID: '108765421',
    countryFlag: 'https://flagcdn.com/mx.svg',
  },
  {
    fullName: 'Ahmed Hassan',
    email: 'ahmed@gmail.com',
    nationality: 'Egypt',
    nationalID: '1077777777',
    countryFlag: 'https://flagcdn.com/eg.svg',
  },
  {
    fullName: 'John Doe',
    email: 'johndoe@gmail.com',
    nationality: 'United States',
    nationalID: '3245908744',
    countryFlag: 'https://flagcdn.com/us.svg',
  },
  {
    fullName: 'Fatima Ahmed',
    email: 'fatima@example.com',
    nationality: 'Pakistan',
    nationalID: '1089999363',
    countryFlag: 'https://flagcdn.com/pk.svg',
  },
  {
    fullName: 'David Smith',
    email: 'david@gmail.com',
    nationality: 'Australia',
    nationalID: '44450960283',
    countryFlag: 'https://flagcdn.com/au.svg',
  },
  {
    fullName: 'Marie Dupont',
    email: 'marie@gmail.com',
    nationality: 'France',
    nationalID: '06934233728',
    countryFlag: 'https://flagcdn.com/fr.svg',
  },
  {
    fullName: 'Ramesh Patel',
    email: 'ramesh@gmail.com',
    nationality: 'India',
    nationalID: '9875412303',
    countryFlag: 'https://flagcdn.com/in.svg',
  },
  {
    fullName: 'Fatimah Al-Sayed',
    email: 'fatimah@gmail.com',
    nationality: 'Kuwait',
    nationalID: '0123456789',
    countryFlag: 'https://flagcdn.com/kw.svg',
  },
  {
    fullName: 'Nina Williams',
    email: 'nina@hotmail.com',
    nationality: 'South Africa',
    nationalID: '2345678901',
    countryFlag: 'https://flagcdn.com/za.svg',
  },
  {
    fullName: 'Taro Tanaka',
    email: 'taro@gmail.com',
    nationality: 'Japan',
    nationalID: '3456789012',
    countryFlag: 'https://flagcdn.com/jp.svg',
  },
  {
    fullName: 'Abdul Rahman',
    email: 'abdul@gmail.com',
    nationality: 'Saudi Arabia',
    nationalID: '4567890123',
    countryFlag: 'https://flagcdn.com/sa.svg',
  },
  {
    fullName: 'Julie Nguyen',
    email: 'julie@gmail.com',
    nationality: 'Vietnam',
    nationalID: '5678901234',
    countryFlag: 'https://flagcdn.com/vn.svg',
  },
  {
    fullName: 'Sara Lee',
    email: 'sara@gmail.com',
    nationality: 'South Korea',
    nationalID: '6789012345',
    countryFlag: 'https://flagcdn.com/kr.svg',
  },
  {
    fullName: 'Carlos Gomez',
    email: 'carlos@yahoo.com',
    nationality: 'Colombia',
    nationalID: '7890123456',
    countryFlag: 'https://flagcdn.com/co.svg',
  },
  {
    fullName: 'Emma Brown',
    email: 'emma@gmail.com',
    nationality: 'Canada',
    nationalID: '8901234567',
    countryFlag: 'https://flagcdn.com/ca.svg',
  },
  {
    fullName: 'Juan Hernandez',
    email: 'juan@yahoo.com',
    nationality: 'Argentina',
    nationalID: '4343433333',
    countryFlag: 'https://flagcdn.com/ar.svg',
  },
  {
    fullName: 'Ibrahim Ahmed',
    email: 'ibrahim@yahoo.com',
    nationality: 'Nigeria',
    nationalID: '2345678009',
    countryFlag: 'https://flagcdn.com/ng.svg',
  },
  {
    fullName: 'Mei Chen',
    email: 'mei@gmail.com',
    nationality: 'Taiwan',
    nationalID: '3456117890',
    countryFlag: 'https://flagcdn.com/tw.svg',
  },
];
const supabaseUrl = secrets.NEXT_PUBLIC.SUPABASE_URL;
const supabaseKey = secrets.NEXT_PUBLIC.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) throw error;
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) throw error;
}

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) throw error;
}

async function createBookings() {
  const { data: guestsIds } = await supabase.from("guests").select("id").order("id");
  const { data: cabinsIds } = await supabase.from("cabins").select("id").order("id");

  const allGuestIds = guestsIds.map((g) => g.id);
  const allCabinIds = cabinsIds.map((c) => c.id);

  const finalBookings = bookings.map((booking) => {
    const cabin = cabins.at(booking.cabinId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
    const extrasPrice = booking.hasBreakfast ? numNights * 15 * booking.numGuests : 0;
    const totalPrice = cabinPrice + extrasPrice;

    let status;
    if (isPast(new Date(booking.endDate)) && !isToday(new Date(booking.endDate)))
      status = "checked-out";
    if (isFuture(new Date(booking.startDate)) || isToday(new Date(booking.startDate)))
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.endDate)) || isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = "checked-in";

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1),
      cabinId: allCabinIds.at(booking.cabinId - 1),
      status,
    };
  });

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) throw error;
}

(async () => {
  try {
    console.log("Deleting old data...");
    await deleteBookings();
    await deleteGuests();

    console.log("Uploading sample data...");
    await createGuests();
    await createBookings();

    console.log("✅ Data upload completed.");
  } catch (err) {
    console.error("❌ Upload failed:", err.message);
    process.exit(1);
  }
})();
