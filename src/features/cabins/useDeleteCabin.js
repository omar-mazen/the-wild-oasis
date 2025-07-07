import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin } from "../../services/apiCabins";

export default function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success(`Cabin ${name} successfully deleted`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isDeleting, deleteCabin: mutate };
}
