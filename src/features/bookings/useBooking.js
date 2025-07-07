import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export default function useBooking() {
  const { bookingId } = useParams();
  const { isLoading, isError, data } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });
  return { isLoading, isError, booking: data, id: bookingId };
}
