import React from 'react';

const Leaderboard = ({ memes, voteMeme, commentOnMeme }) => {
    return (
        <div>
            <h2>Meme Leaderboard</h2>
            {memes.map((meme, index) => (
                <div key={index}>
                    <img src={meme.imageUrl} alt="Meme" />
                    <p>Yes Votes: {meme.yesVotes}, No Votes: {meme.noVotes}, Fun Votes: {meme.funVotes}</p>
                    <button onClick={() => voteMeme(meme.id, 1)}>Vote 👍</button>
                    <button onClick={() => voteMeme(meme.id, 2)}>Vote 👎</button>
                    <button onClick={() => voteMeme(meme.id, 3)}>Vote 🎉</button>
                    <input
                        type="text"
                        placeholder="Comment"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                commentOnMeme(meme.id, e.target.value);
                                e.target.value = '';
                            }
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default Leaderboard;
