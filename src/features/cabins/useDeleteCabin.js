import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin } from "../../services/apiCabins";
import { safeMutation } from "../../utils/helpers";

export default function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: (id) => safeMutation(deleteCabin(id)),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["cabins"] });
      toast.success(`Cabin successfully deleted`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isDeleting, deleteCabin: mutate };
}
