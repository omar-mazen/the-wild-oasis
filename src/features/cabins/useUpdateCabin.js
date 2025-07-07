import toast from "react-hot-toast";
import { updateCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate } = useMutation({
    mutationFn: updateCabin,
    onSuccess: (data) => {
      toast.success(`cabin ${data.name} updated successfully`);
      queryClient.invalidateQueries(["cabins"]);
    },
    onError: () => toast.error("cabin not updated"),
  });
  return { isUpdating, updateCabin: mutate };
}
