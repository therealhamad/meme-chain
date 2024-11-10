// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract MemeVoting {
    struct Meme {
        string title;
        string url;
        uint256 points;
        bool voted;
    }

    Meme[] public memes;
    mapping(address => bool) public hasVoted;

    event MemeAdded(uint256 memeId, string title, string url);
    event Voted(uint256 memeId, uint256 points);

    function addMeme(string memory _title, string memory _url) public {
        memes.push(Meme({
            title: _title,
            url: _url,
            points: 0,
            voted: false
        }));
        emit MemeAdded(memes.length - 1, _title, _url);
    }

    function voteMeme(uint256 _memeId, uint256 _points) public {
        require(_memeId < memes.length, "Meme does not exist");
        require(!hasVoted[msg.sender], "You have already voted");

        Meme storage meme = memes[_memeId];
        meme.points += _points;
        meme.voted = true;
        hasVoted[msg.sender] = true;

        emit Voted(_memeId, _points);
    }

    function getMemes() public view returns (Meme[] memory) {
        return memes;
    }
}