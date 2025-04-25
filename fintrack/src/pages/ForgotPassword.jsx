import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SpinnerMini from "../ui/SpinnerMini";
import { useForgotPassword } from "../hooks/auth/useForgotPassword";
import { updateResetEmail } from "../features/login/loginSlice";
function ForgotPassword() {
  const { resetEmail } = useSelector((store) => store.login);
  const { isPending, forgotPassword } = useForgotPassword();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!resetEmail) return;
    forgotPassword(
      { email: resetEmail },
      {
        onSettled: () => {
          dispatch(updateResetEmail(""));
          navigate("/login");
        },
      },
    );
  }
  return (
    <div className="relative">
      <img src="landing-picture.png" className="h-screen w-screen" />
      <div className="absolute top-0 left-[40%] text-white">
        <h1 className="pb-1 text-7xl font-bold">Fintrack📊</h1>
        {/* <p className="text-2xl font-semibold">(Money is always Ultimate😎)</p> */}
      </div>
      <div className="absolute top-[20%] right-1/9 h-1/2 w-1/4 rounded-md bg-white text-black shadow-xl">
        <h1 className="flex justify-center bg-blue-300 pt-5 pb-2 text-3xl font-bold">
          Reset Password 🔏
        </h1>
        <div className="flex flex-col gap-2 p-5 text-xl">
          <div className="flex flex-col">
            <label className="pr-1 font-bold">Enter Email</label>
            <input
              required
              className="w-64 rounded-lg border-2 pr-2 text-wrap"
              type="email"
              placeholder="Username"
              value={resetEmail}
              onChange={(e) => dispatch(updateResetEmail(e.target.value))}
            />
          </div>
          {isPending ? (
            <SpinnerMini />
          ) : (
            <div className="flex flex-row justify-between pt-10">
              <button
                className="w-fit rounded-lg bg-blue-400 p-1"
                onClick={() => navigate("/login")}
              >
                Back
              </button>
              <button
                className="w-fit rounded-lg bg-blue-100 p-1"
                onClick={handleSubmit}
              >
                Send Mail
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
