import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { forgotPassword as forgotPasswordApi } from "../../services/apiAuth";
export function useForgotPassword() {
  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: () => {
      toast.success("Check email address for logging in back");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { forgotPassword, isPending };
}
