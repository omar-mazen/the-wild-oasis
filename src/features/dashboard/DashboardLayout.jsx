import styled from "styled-components";
import useRecentBookings from "./useRecentBookings.js";
import Spinner from "../../ui/Spinner.jsx";
import useRecentStays from "./useRecentStays.js";
import Stats from "./Stats.jsx";
import useCabins from "../cabins/useCabins";
import SalesChart from "./SalesChart.jsx";
import DurationChart from "./DurationChart.jsx";
import TodayActivity from "../check-in-out/TodayActivity.jsx";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
export default function DashboardLayout() {
  const { bookings, bookingsIsLoading } = useRecentBookings();
  const { confirmedStays, numDays, staysIsLoading } = useRecentStays();
  const { cabins, isLoading: cabinsIsLoading } = useCabins();

  if (bookingsIsLoading || staysIsLoading || cabinsIsLoading)
    return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        numDays={numDays}
        cabinCount={cabins?.length}
        confirmedStays={confirmedStays}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
