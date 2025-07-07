import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabin } from "../../services/apiCabins";

export default function useCreateCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: (data) => {
      toast.success(`cabin ${data.name} addedd successfully`);
      queryClient.invalidateQueries(["cabins"]);
    },
    onError: () => toast.error("cabin not added"),
  });
  return { isCreating, createCabin: mutate };
}
