import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { safeMutation } from "../../utils/helpers";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => safeMutation(deleteBookingApi(id)),
    onSuccess: () => {
      toast.success(`Booking successfully deleted`);
      queryClient.refetchQueries({ queryKey: ["bookings"] });
    },
    onError: () => {
      toast.error(`There was an error while delete booking`);
    },
  });
  return { deleteBooking, isDeleting };
}
