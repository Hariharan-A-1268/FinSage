import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";

function Logo() {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  return (
    <div className="mr-10 flex flex-row justify-center">
      <img
        className="h-15"
        src={isDarkMode ? "logo-dark.png" : "logo-light.png"}
        alt="Logo"
        onClick={() => navigate("/dashboard")}
      />
    </div>
  );
}

export default Logo;
