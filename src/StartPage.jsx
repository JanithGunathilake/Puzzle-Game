import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Fullscreen, Minimize } from "lucide-react";

const StartPage = () => {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-200 relative">
      {/* Fullscreen Button */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 bg-gray-800 text-white p-3 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
      >
        {isFullscreen ? <Minimize size={24} /> : <Fullscreen size={24} />}
      </button>

      

      {/* Game Title */}
      <h1 className="text-8xl font-bold text-blue-800 mb-12">Piece by Piece</h1>

      <p className="text-4xl text-gray-600 mb-6 text-center">
        Tap a tile to move it into the empty space and <br /> complete the puzzle 
        before time runs out...!
      </p>
      <br />

      {/* Image at the Top */}
      <img
        src="/photo.png" // Path to your image
        alt="Puzzle Logo"
        className="max-w-md h-auto mb-8 rounded-lg shadow-md" // Adjust size and styling as needed
      />

      
      {/* Start Game Button */}
      <button
        onClick={() => navigate("/game")}
        className="bg-blue-500 text-white px-12 py-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 text-4xl"
      >
        Start Game
      </button>
    </div>
  );
};

export default StartPage;
