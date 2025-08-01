import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import { safeMutation } from "../../utils/helpers";

export default function useCheckin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      safeMutation(
        updateBooking(bookingId, {
          status: "checked-in",
          isPaid: true,
          ...breakfast,
        })
      ),
    onSuccess: () => {
      toast.success(`Booking has checked in successfully`);
      queryClient.refetchQueries();
      navigate("/", { replace: true });
    },
    onError: () => toast.error(`There was an error while check in`),
  });
  return { checkin, isCheckingIn };
}
