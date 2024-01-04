import React, { useState } from "react";
import GameBoard from "../components/GameBoard";
import EmojiSelector from "../components/EmojiSelector";
import { Tektur } from "next/font/google";
import Head from "next/head";
import confetti from "canvas-confetti";

const tektur = Tektur({
  subsets: ["latin"],
  display: "swap",
});

const IndexPage = () => {
  const [playerEmoji, setPlayerEmoji] = useState(null);
  const [opponentEmoji, setOpponentEmoji] = useState("😎");
  const allEmojis = ["😀", "🤖", "👻", "🐱", "🦄", "🍉", "🌵", "🚀", "⚽"];

  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState("");

  const handleGameOver = (result) => {
    setGameResult(result);
    setGameOver(true);
    launchConfetti();
  };

  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleEmojiSelect = (emoji) => {
    setPlayerEmoji(emoji);
    const remainingEmojis = allEmojis.filter((e) => e !== emoji);
    const randomOpponentEmoji =
      remainingEmojis[Math.floor(Math.random() * remainingEmojis.length)];
    setOpponentEmoji(randomOpponentEmoji);
  };

  const handleReset = () => {
    setPlayerEmoji(null);
    setOpponentEmoji(null);
    setGameOver(false);
  };

  return (
    <>
      <Head>
        <title>Tic Tac Toe</title>
      </Head>
      <div className="flex flex-col h-screen w-screen justify-center overflow-hidden items-center">
        {" "}
        {/* Adjusted the background color for the whole screen */}
        <div
          className="rounded-xl shadow-2xl p-10 bg-beige-200"
          style={{ backgroundColor: "#f5f5dc" }}
        >
          {" "}
          {/* New wrapper div for 3D card effect */}
          <div className="flex flex-col justify-center items-center text-center">
            <h1 className={`${tektur.className} text-4xl font-bold my-4`}>
              Emoji Tic Tac Toe
            </h1>
            {!playerEmoji ? (
              <EmojiSelector emojis={allEmojis} onSelect={handleEmojiSelect} />
            ) : (
              <div>
                <div className="emoji-status">
                  <p>Player Emoji: {playerEmoji}</p>
                  <p>Opponent Emoji: {opponentEmoji}</p>
                </div>
                <GameBoard
                  playerEmoji={playerEmoji}
                  opponentEmoji={opponentEmoji}
                  onGameOver={handleGameOver}
                />
                <button onClick={handleReset} className="reset-button">
                  Reset Game
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {gameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-12 rounded-lg w-1/5 sm:w-screen sm:h-screen shadow-lg text-center">
            <h2 className="text-4xl font-bold mb-10">
              {gameResult === "Draw" ? "It's a draw!" : `${gameResult} wins!`}
            </h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={handleReset}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default IndexPage;
