import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { safeMutation } from "../../utils/helpers";
export default function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ email, password, fullName, options }) =>
      safeMutation(signUpApi({ email, password, fullName, options })),
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address"
      );
    },
    onError: () =>
      toast.error(
        "There was somthing wrong while create the account, try agin."
      ),
  });
  return { signup, isLoading };
}
