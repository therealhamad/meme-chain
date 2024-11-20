// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract MemeVoting {
    // Define a structure for each meme
    struct Meme {
        string title;      // Title of the meme
        string url;        // URL of the meme image/video
        uint256 points;    // Total points for voting
        bool voted;        // Whether the meme has received a vote
    }

    Meme[] public memes;                        // Array to store all memes
    mapping(address => bool) public hasVoted;   // Track whether an address has voted

    // Event emitted when a meme is added
    event MemeAdded(uint256 memeId, string title, string url);
    // Event emitted when a meme is voted on
    event Voted(uint256 memeId, uint256 points);

    // Add a new meme to the array
    function addMeme(string memory _title, string memory _url) public {
        memes.push(Meme({
            title: _title,
            url: _url,
            points: 0,        // Initially no points
            voted: false      // Initially not voted
        }));

        uint256 memeId = memes.length - 1;  // Get the ID of the newly added meme
        emit MemeAdded(memeId, _title, _url);  // Emit the MemeAdded event
    }

    // Vote for a meme by giving points
    function voteMeme(uint256 _memeId, uint256 _points) public {
        // Ensure the meme exists
        require(_memeId < memes.length, "Meme does not exist");
        // Ensure the user has not voted yet
        require(!hasVoted[msg.sender], "You have already voted");

        // Reference the meme being voted on
        Meme storage meme = memes[_memeId];
        meme.points += _points;   // Add points to the meme
        meme.voted = true;        // Mark the meme as voted on
        hasVoted[msg.sender] = true;  // Mark the sender as having voted

        emit Voted(_memeId, _points);  // Emit the Voted event
    }

    // Retrieve all memes
    function getMemes() public view returns (Meme[] memory) {
        return memes;   // Return the array of memes
    }
}
