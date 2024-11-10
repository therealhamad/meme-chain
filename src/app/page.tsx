"use client";
import React, { useEffect, useState } from 'react';
//import Voting from './components/Voting';
import Image from 'next/image';
//import { ethers } from 'ethers';
//import Voting from '../app/components/Voting';
//import abi from '../contracts/MemeDAO.json';

//const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MEME_DAO_CONTRACT;
const MEME_API_URL = 'https://meme-api.com/gimme/wholesomememes';

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
  points: number; // Add points property to Meme interface
  voted: boolean; // Add voted property to Meme interface
}

const MemePage = () => {
  const [currentMeme, setCurrentMeme] = useState<Meme | null>(null);
  const [leaderboard, setLeaderboard] = useState<Meme[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch memes from the meme API
  const fetchMeme = async () => {
    setLoading(true);
    const response = await fetch(MEME_API_URL);
    const data = await response.json();
    const newMeme = { ...data, points: 0, voted: false };
    setCurrentMeme(newMeme);
    setLeaderboard((prevLeaderboard) => [...prevLeaderboard, newMeme]);
    setLoading(false);
  };

  // Fetch a meme when the component mounts
  useEffect(() => {
    fetchMeme();
  }, []);

  // Handle voting
  const handleVote = (points: number) => {
    if (currentMeme) {
      const updatedMeme = { ...currentMeme, points: currentMeme.points + points, voted: true };
      setCurrentMeme(updatedMeme);
      setLeaderboard((prevLeaderboard) =>
        prevLeaderboard.map((meme) =>
          meme.url === currentMeme.url ? updatedMeme : meme
        )
      );
    }
  };

  // Sort memes by points in descending order
  const sortedLeaderboard = [...leaderboard].sort((a, b) => b.points - a.points);

  return (
    <div className='justify-center bg-gray-900 w-full h-full'>
      <h1 className='text-6xl text-center justify-center mb-10 py-20'>MemeVoter</h1>
      {loading ? (
        <p className='text-center'>Loading...</p>
      ) : (
        currentMeme && (
          <div className='flex flex-col items-center justify-center'>
            <Image src={currentMeme.url} alt={currentMeme.title} width={400} height={400} className='items-center justify-center' />
            <p className='mt-10 text-xl'>{currentMeme.title}</p>
            <div className='flex space-x-4 mt-4'>
              <button
                onClick={() => handleVote(3)}
                className='bg-green-500 text-white px-4 py-2 rounded'
                disabled={currentMeme.voted}
              >
                Like
              </button>
              <button
                onClick={() => handleVote(1)}
                className='bg-yellow-500 text-white px-4 py-2 rounded'
                disabled={currentMeme.voted}
              >
                Ok
              </button>
              <button
                onClick={() => handleVote(0)}
                className='bg-red-500 text-white px-4 py-2 rounded'
                disabled={currentMeme.voted}
              >
                Dislike
              </button>
            </div>
            <p className='mt-4 text-xl'>Points: {currentMeme.points}</p>
          </div>
        )
      )}
      <div className='flex justify-center mt-10'>
        <button onClick={fetchMeme} className='bg-red-300 text-4xl border-2 rounded-xl items-center place-content-center justify-center mb-10 px-4 py-2'>
          Generate
        </button>
      </div>
      <div className='mt-10'>
        <h2 className='text-4xl text-center mb-4'>Leaderboard</h2>
        <div className='flex flex-col items-center'>
          {sortedLeaderboard.map((meme, index) => (
            <div key={index} className='flex justify-between w-1/2 bg-gray-800 p-4 mb-2 rounded'>
              <span className='text-white'>{meme.title}</span>
              <span className='text-white'>{meme.points} points</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemePage;
//<Voting memeId={index + 1} />