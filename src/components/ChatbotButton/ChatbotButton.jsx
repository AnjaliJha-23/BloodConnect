import { FaRobot } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./ChatbotButton.css";

function ChatbotButton() {
  const navigate = useNavigate();

  return (
    <div
      className="chatbot-button"
      onClick={() => navigate("/chatbot")}
    >
      <FaRobot size={28} />
    </div>
  );
}

export default ChatbotButton;