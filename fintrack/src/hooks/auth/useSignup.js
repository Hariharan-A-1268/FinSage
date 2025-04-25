import { useMutation } from "@tanstack/react-query";
import { signup as singupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useSignup() {
  const navigate = useNavigate();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: singupApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Verfiy account in email address",
      );
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { signup, isPending };
}
