import { useDispatch, useSelector } from "react-redux";
import {
  updateLoginPassword,
  updateLoginUserName,  
} from "../features/login/loginSlice";
import { useLogin } from "../hooks/auth/useLogin";
import { useNavigate } from "react-router-dom";
import SpinnerMini from "../ui/SpinnerMini";
function Login() {
  const { loginUserName, loginPassword } = useSelector((store) => store.login);
  const { login, isPending } = useLogin();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!loginUserName || !loginPassword) return;
    login(
      { email: loginUserName, password: loginPassword },
      {
        onSettled: () => {
          dispatch(updateLoginUserName(""));
          dispatch(updateLoginPassword(""));
        },
      },
    );
  }
  return (
    <div className="relative">
      <img src="landing-picture.png" className="h-screen w-screen" />
      <div className="absolute top-0 left-[36%] text-white">
        <h1 className="pb-1 text-6xl font-bold pt-10">Fintrack📊</h1>
        {/* <p className="text-2xl font-semibold">(Money is always Ultimate😎)</p> */}
      </div>
      <div className="absolute top-[30%] right-[40%] h-1/2 w-1/4 rounded-md bg-white text-black shadow-xl">
        <h1 className="flex justify-center bg-[var(--color3)] pt-5 pb-2 text-3xl font-bold">
          Login 
        </h1>
        <div className="flex flex-col gap-2 p-5 text-xl">
          <div className="flex flex-col">
            <label className="pr-1 font-bold">UserName</label>
            <input
              required
              className="w-64 rounded-lg border-2 pr-2 text-wrap"
              type="email"
              placeholder="Username"
              value={loginUserName}
              onChange={(e) => dispatch(updateLoginUserName(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <label className="pr-1 font-bold">Password</label>
            <input
              required
              className="w-64 rounded-lg border-2 pr-2 text-wrap"
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => dispatch(updateLoginPassword(e.target.value))}
            />
          </div>
          <div className="flex flex-row justify-between">
            <button
              className="text-lg underline"
              onClick={() => navigate("/forgotpassword")}
            >
              Forget Password?
            </button>
          </div>
          {isPending ? (
            <SpinnerMini />
          ) : (
            <div className="flex flex-row justify-between pt-10">
              <button
                className="w-fit rounded-lg bg-[var(--color3)] p-1"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
              <button
                className="w-fit rounded-lg bg-[var(--color3)] p-1"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
