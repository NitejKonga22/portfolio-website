import { useState } from 'react';
export default function Card({ title }) {
  const [liked, setLiked] = useState(false);
  return <article className="card"><h2>{title}</h2><p>Status: <b>{liked ? 'Liked ❤️' : 'Not liked'}</b></p><button onClick={() => setLiked(prev => !prev)}>{liked ? 'Unlike' : 'Like'}</button></article>;
}
