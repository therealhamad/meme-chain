"use client"; // Ensures the component is rendered on the client side
import React, { useEffect, useState } from 'react'; // Import necessary hooks for state management and lifecycle methods

import Image from 'next/image'; // Import Next.js Image component for optimized image rendering
const MEME_API_URL = 'https://meme-api.com/gimme/wholesomememes'; // URL to fetch memes from the meme API

// Define the Meme interface for TypeScript type-checking
interface Meme {
  postLink: string;
  subreddit: string;
  title: string;
  url: string;
  nsfw: boolean;
  spoiler: boolean;
  author: string;
  ups: number;
  preview: string[];
  points: number; // Tracks the points assigned to a meme
  voted: boolean; // Indicates if the meme has already been voted on
}

const MemePage = () => {
  // State to hold the current meme being displayed
  const [currentMeme, setCurrentMeme] = useState<Meme | null>(null);
  // State to maintain the leaderboard of memes
  const [leaderboard, setLeaderboard] = useState<Meme[]>([]);
  // State to manage loading status
  const [loading, setLoading] = useState<boolean>(true);

  // Function to fetch a new meme from the API
  const fetchMeme = async () => {
    setLoading(true); // Start the loading state
    const response = await fetch(MEME_API_URL); // Fetch meme data from the API
    const data = await response.json(); // Parse JSON response
    const newMeme = { ...data, points: 0, voted: false }; // Add default points and voted properties
    setCurrentMeme(newMeme); // Set the new meme as the current meme
    setLeaderboard((prevLeaderboard) => [...prevLeaderboard, newMeme]); // Update the leaderboard with the new meme
    setLoading(false); // Stop the loading state
  };

  // useEffect to fetch a meme when the component mounts
  useEffect(() => {
    fetchMeme(); // Fetch the initial meme
  }, []); // Empty dependency array ensures this runs only once

  // Function to handle voting on the current meme
  const handleVote = (points: number) => {
    if (currentMeme) {
      const updatedMeme = { ...currentMeme, points: currentMeme.points + points, voted: true }; // Update points and voting status
      setCurrentMeme(updatedMeme); // Update the state with the new meme data
      setLeaderboard((prevLeaderboard) =>
        prevLeaderboard.map((meme) =>
          meme.url === currentMeme.url ? updatedMeme : meme // Replace the updated meme in the leaderboard
        )
      );
    }
  };

  // Sort the leaderboard memes by points in descending order
  const sortedLeaderboard = [...leaderboard].sort((a, b) => b.points - a.points);

  return (
    <div className='justify-center bg-gray-900 w-full h-full'> {/* Main container */}
      <h1 className='text-6xl text-center justify-center mb-10 py-20'>MemeVoter</h1> {/* Title */}
      {loading ? (
        <p className='text-center'>Loading...</p> // Display loading message while memes are fetched
      ) : (
        currentMeme && (
          <div className='flex flex-col items-center justify-center'> {/* Meme display section */}
            <Image src={currentMeme.url} alt={currentMeme.title} width={400} height={400} className='items-center justify-center' /> {/* Display meme image */}
            <p className='mt-10 text-xl'>{currentMeme.title}</p> {/* Display meme title */}
            <div className='flex space-x-4 mt-4'> {/* Voting buttons */}
              <button
                onClick={() => handleVote(3)} // Like button gives 3 points
                className='bg-green-500 text-white px-4 py-2 rounded'
                disabled={currentMeme.voted} // Disable if already voted
              >
                Like
              </button>
              <button
                onClick={() => handleVote(1)} // Ok button gives 1 point
                className='bg-yellow-500 text-white px-4 py-2 rounded'
                disabled={currentMeme.voted}
              >
                Ok
              </button>
              <button
                onClick={() => handleVote(0)} // Dislike button gives 0 points
                className='bg-red-500 text-white px-4 py-2 rounded'
                disabled={currentMeme.voted}
              >
                Dislike
              </button>
            </div>
            <p className='mt-4 text-xl'>Points: {currentMeme.points}</p> {/* Display points */}
          </div>
        )
      )}
      <div className='flex justify-center mt-10'> {/* Button to generate a new meme */}
        <button onClick={fetchMeme} className='bg-red-300 text-4xl border-2 rounded-xl items-center place-content-center justify-center mb-10 px-4 py-2'>
          Generate
        </button>
      </div>
      <div className='mt-10'> {/* Leaderboard display */}
        <h2 className='text-4xl text-center mb-4'>Leaderboard</h2>
        <div className='flex flex-col items-center'>
          {sortedLeaderboard.map((meme, index) => ( // Display each meme in the leaderboard
            <div key={index} className='flex justify-between w-1/2 bg-gray-800 p-4 mb-2 rounded'>
              <span className='text-white'>{meme.title}</span> {/* Meme title */}
              <span className='text-white'>{meme.points} points</span> {/* Meme points */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
