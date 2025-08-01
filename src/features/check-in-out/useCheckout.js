import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { bookings } from "../../data/data-bookings";
import { safeMutation } from "../../utils/helpers";

export default function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      safeMutation(updateBooking(bookingId, { status: "checked-out" })),
    onSuccess: () => {
      toast.success(`Booking has checked out successfully`);
      queryClient.refetchQueries();
    },
    onError: () => {
      toast.error(`There was an error while check out`);
    },
  });
  return { checkout, isCheckingOut };
}
