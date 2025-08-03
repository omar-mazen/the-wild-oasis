const { createClient } = require('@supabase/supabase-js');
const { isFuture, isPast, isToday } = require('date-fns');
const { subtractDates } = require('../src/utils/helpers');
const { bookings } = require('../src/data/data-bookings');
const { cabins } = require('../src/data/data-cabins');
const { guests } = require('../src/data/data-guests');

const supabaseUrl = secrets.NEXT_PUBLIC.SUPABASE_URL;
const supabaseKey = secrets.NEXT_PUBLIC.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) throw error;
}

async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
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

async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
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
    await deleteCabins();

    console.log("Uploading sample data...");
    await createGuests();
    await createCabins();
    await createBookings();

    console.log("✅ Data upload completed.");
  } catch (err) {
    console.error("❌ Upload failed:", err.message);
    process.exit(1);
  }
})();
