import toast from "react-hot-toast";
import { updateCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { safeMutation } from "../../utils/helpers";

export default function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate } = useMutation({
    mutationFn: (cabin) => safeMutation(updateCabin(cabin)),
    onSuccess: () => {
      toast.success(`cabin updated successfully`);
      queryClient.refetchQueries(["cabins"]);
    },
    onError: () => toast.error("cabin not updated"),
  });
  return { isUpdating, updateCabin: mutate };
}
