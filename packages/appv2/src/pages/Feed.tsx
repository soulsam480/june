import React from 'react';
import PostCard from 'src/components/feed/PostCard';

interface Props {}

const Test: React.FC<Props> = () => {
  return (
    <div className="flex flex-col space-y-3">
      {[...Array(10)].map((x, i) => (
        <PostCard key={i}/>
      ))}
    </div>
  );
};

export default Test;
