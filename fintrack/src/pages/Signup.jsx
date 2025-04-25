import { useDispatch, useSelector } from "react-redux";
import {
  updateSignupConfirmPassword,
  updateSignupPassword,
  updateSignupUserName,
} from "../features/login/loginSlice";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/auth/useSignup";
import toast from "react-hot-toast";
import SpinnerMini from "../ui/SpinnerMini";
function Signup() {
  const { signupUserName, signupUserPassword, signupConfirmPassword } =
    useSelector((store) => store.login);
  const { signup, isPending } = useSignup();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleSubmit() {
    console.log(signupUserName, signupUserPassword, signupConfirmPassword);
    if (!signupUserName || !signupUserPassword || !signupConfirmPassword)
      return;
    if (signupUserPassword !== signupConfirmPassword) {
      toast.error("Passwords must match!");
    }
    signup(
      {
        email: signupUserName,
        password: signupUserPassword,
      },
      {
        onSuccess: () => {
          dispatch(updateSignupUserName(""));
          dispatch(updateSignupPassword(""));
          dispatch(updateSignupConfirmPassword(""));
        },
      },
    );
  }
  return (
    <div className="relative">
      <img src="landing-picture.png" className="h-screen w-screen" />
      <div className="absolute top-0 left-[36%] text-white">
        <h1 className="pb-1 font-sans text-6xl font-bold pt-10">Fintrack📊</h1>
        {/* <p className="text-2xl font-semibold">(Money is always Ultimate😎)</p> */}
      </div>
      <div className="absolute top-[30%] right-[40%] h-1/2 w-1/4 rounded-md bg-white text-black shadow-xl">
        <h1 className="flex justify-center bg-[var(--color3)] pt-5 pb-2 text-3xl font-bold">
          Sign up 
        </h1>
        <div className="flex flex-col p-2 text-xl" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="pr-1 font-bold">New UserName</label>
            <input
              required
              className="w-64 rounded-lg border-2 pr-2 text-wrap"
              type="text"
              placeholder="Username"
              value={signupUserName}
              onChange={(e) => dispatch(updateSignupUserName(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <label className="pr-1 font-bold">Password</label>
            <input
              required
              className="w-64 rounded-lg border-2 pr-2 text-wrap"
              type="password"
              placeholder="Password"
              value={signupUserPassword}
              onChange={(e) => dispatch(updateSignupPassword(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <label className="pr-1 font-bold">Confirm Password</label>
            <input
              required
              className="w-64 rounded-lg border-2 pr-2 text-wrap"
              type="password"
              placeholder="Confirm Password"
              value={signupConfirmPassword}
              onChange={(e) =>
                dispatch(updateSignupConfirmPassword(e.target.value))
              }
            />
          </div>

          {isPending ? (
            <SpinnerMini />
          ) : (
            <div className="flex flex-row justify-between pt-10">
              <button
                className="w-fit rounded-lg bg-[var(--color3)] p-1"
                onClick={() => navigate("/login")}
              >
                Back
              </button>
              <button
                className="w-fit rounded-lg bg-[var(--color3)] p-1"
                onClick={handleSubmit}
              >
                Signup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
