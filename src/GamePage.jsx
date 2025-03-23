import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Fullscreen, Minimize } from "lucide-react";
import { FaHome } from 'react-icons/fa';  // for Font Awesome Home icon



const GamePage = () => {
  const [timeLeft, setTimeLeft] = useState(18); // 3 minutes timer
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [puzzlePieces, setPuzzlePieces] = useState([]);
  const [shuffledPieces, setShuffledPieces] = useState([]);
  const [score, setScore] = useState(0);
  const [emptyIndex, setEmptyIndex] = useState(8); // Index of the empty box (Box 9)
  const [gameOver, setGameOver] = useState(false); // Track game-over state
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const puzzleImage = "/photo.png"; // The image to split into pieces

  // Split the image into pieces (3x3 grid)
  const splitImage = () => {
    const pieces = [];
    const rows = 3;
    const cols = 3;
    const pieceWidth = 333.33;
    const pieceHeight = 333.33;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        pieces.push({
          id: i * cols + j,
          x: j * pieceWidth,
          y: i * pieceHeight,
          correctPosition: { x: j, y: i }, // Correct position in the grid
        });
      }
    }
    return pieces;
  };

  // Shuffle pieces randomly, ensuring the puzzle is solvable
  const shufflePieces = (pieces) => {
    let shuffled = [...pieces];
    shuffled[8] = null; // Set Box 9 as empty

    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 2; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Count the number of inversions
    const countInversions = (arr) => {
      let inversions = 0;
      for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[i] && arr[j] && arr[i].id > arr[j].id) {
            inversions++;
          }
        }
      }
      return inversions;
    };

    let inversions = countInversions(shuffled);

    // If the number of inversions is odd, swap two non-empty tiles to make it even
    if (inversions % 2 !== 0) {
      let index1 = -1, index2 = -1;
      for (let i = 0; i < shuffled.length; i++) {
        if (shuffled[i] !== null) {
          if (index1 === -1) {
            index1 = i;
          } else {
            index2 = i;
            break;
          }
        }
      }
      [shuffled[index1], shuffled[index2]] = [shuffled[index2], shuffled[index1]];
    }

    return shuffled;
  };

  // Check if the puzzle is solved
  const checkPuzzleSolved = () => {
    if (shuffledPieces[8] !== null) {
      return false;
    }

    for (let i = 0; i < shuffledPieces.length - 1; i++) {
      if (shuffledPieces[i] === null) return false;

      const expectedX = i % 3;
      const expectedY = Math.floor(i / 3);

      if (
        shuffledPieces[i].correctPosition.x !== expectedX ||
        shuffledPieces[i].correctPosition.y !== expectedY
      ) {
        return false;
      }
    }
    return true;
  };

  // Handle piece click
  const handlePieceClick = (index) => {
    if (gameOver) return;

    const newShuffledPieces = [...shuffledPieces];

    const isAdjacent =
      Math.abs(index - emptyIndex) === 1 || Math.abs(index - emptyIndex) === 3;

    if (isAdjacent) {
      newShuffledPieces[emptyIndex] = newShuffledPieces[index];
      newShuffledPieces[index] = null;
      setShuffledPieces(newShuffledPieces);
      setEmptyIndex(index);
    }
  };

  // Start the puzzle game by splitting the image and shuffling the pieces
  useEffect(() => {
    const pieces = splitImage();
    setPuzzlePieces(pieces);
    setShuffledPieces(shufflePieces(pieces));
  }, []);

  // Check if the puzzle is solved whenever shuffledPieces changes
  useEffect(() => {
    if (checkPuzzleSolved()) {
      setPuzzleSolved(true);
      const score = timeLeft * 10 + 100;
      setScore(score);
      setGameOver(true);

      Swal.fire({
        title: "Congratulations!",
        text: `You solved the puzzle with ${timeLeft} seconds left!`,
        icon: "success",
        confirmButtonColor: '#3b82f6',
        confirmButtonText: "Play Again",
      }).then(() => {
        navigate("/start"); // Redirect to start page
      });
    }
  }, [shuffledPieces]);

  // Timer countdown to limit the time to solve the puzzle
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          if (prev === 15) {
            Swal.fire({
              title: "Hurry Up!",
              text: "Only 15 seconds left!",
              icon: "warning",
              iconColor: '#3b82f6',
              timer: 1000,
              showConfirmButton: false,
            });
          }

          return prev - 1;
        } else {
          clearInterval(timer);
          setGameOver(true);

          const score = calculatePartialScore();
          setScore(score);

          Swal.fire({
            title: "Game Over!",
            text: `You scored ${score} points!`,
            icon: "error",
            iconColor: '#3b82f6',
            confirmButtonColor: '#3b82f6',
            confirmButtonText: "Play Again",
          }).then(() => {
            navigate("/start"); // Redirect to start page
          });

          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, timeLeft]);

  // Calculate the score based on correctly placed pieces
  const calculatePartialScore = () => {
    let correctCount = 0;
    for (let i = 0; i < puzzlePieces.length; i++) {
      if (shuffledPieces[i] === null) continue;

      const expectedX = i % 3;
      const expectedY = Math.floor(i / 3);

      if (
        shuffledPieces[i] &&
        shuffledPieces[i].correctPosition.x === expectedX &&
        shuffledPieces[i].correctPosition.y === expectedY
      ) {
        correctCount++;
      }
    }
    const percentage = (correctCount / 8) * 100;
    return Math.round(percentage);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-200 p-4 relative">

        <button
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 bg-gray-800 text-white p-3 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
      >
        {isFullscreen ? <Minimize size={24} /> : <Fullscreen size={24} />}
      </button>

      <button
            onClick={() => navigate("/start")}
            className="absolute top-4 left-4 bg-gray-800 text-white p-3 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
            aria-label="Go to Start"
            >
            <FaHome size={24} />
      </button>

        

      <h1 className="text-7xl font-bold text-blue-800 mb-4">Solve the Puzzle</h1>
      

      {/* Reference Image at the Top */}
      <div className="mb-6">
        <img
          src={puzzleImage}
          alt="Puzzle Reference"
          className="w-96 h-96 border border-gray-500 rounded-lg shadow-md"
        />
        <p className="text-center mt-1 text-sm text-gray-600">Reference</p>
      </div>

      {/* Timer with Progress Bar */}
      <div className="w-full max-w-[1000px] mb-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg">Time Left:</p>
          <p className="text-lg font-bold">{timeLeft} seconds</p>
        </div>
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500"
            style={{ width: `${(timeLeft / 180) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Puzzle Grid */}
      <div className="grid grid-cols-3 gap-1 w-[1000px] h-[1000px] mb-6">
        {Array(9)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className={`w-[333.33px] h-[333.33px] border border-gray-300 flex items-center justify-center ${
                shuffledPieces[index] === null ? "bg-red-200" : "bg-gray-200"
              }`}
              onClick={() => handlePieceClick(index)}
            >
              {shuffledPieces[index] && (
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url(${puzzleImage})`,
                    backgroundPosition: `-${shuffledPieces[index].x}px -${shuffledPieces[index].y}px`,
                  }}
                ></div>
              )}
              {puzzleSolved && index === 8 && (
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url(${puzzleImage})`,
                    backgroundPosition: `-${puzzlePieces[8].x}px -${puzzlePieces[8].y}px`,
                  }}
                ></div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default GamePage;