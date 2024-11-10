"use client";
import { ethers } from 'ethers';
import abi from '../contracts/MemeDAO.json';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MEME_DAO_CONTRACT;

export default function Voting({ memeId }) {
  async function voteMeme() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

      const tx = await contract.voteMeme(memeId);
      await tx.wait();
      alert('Meme voted successfully!');
    } catch (error) {
      console.error('Error voting meme:', error);
      alert('Voting failed!');
    }
  }

  return (
    <button onClick={voteMeme}>
      Vote
    </button>
  );
}
