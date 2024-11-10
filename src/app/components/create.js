import React, { useState } from 'react';

const CreateMeme = ({ createMeme }) => {
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        createMeme(imageUrl);
        setImageUrl('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Meme Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
            />
            <button type="submit">Create Meme</button>
        </form>
    );
};

export default CreateMeme;
