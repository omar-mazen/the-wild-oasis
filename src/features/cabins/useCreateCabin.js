import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabin } from "../../services/apiCabins";
import { safeMutation } from "../../utils/helpers";

export default function useCreateCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: ({
      name,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    }) =>
      safeMutation(
        createCabin({
          name,
          maxCapacity,
          regularPrice,
          discount,
          description,
          image,
        })
      ),
    onSuccess: () => {
      toast.success(`cabinaddedd successfully`);
      queryClient.refetchQueries(["cabins"]);
    },
    onError: () => toast.error("cabin not added"),
  });
  return { isCreating, createCabin: mutate };
}
