import React from 'react';

interface Props {}

const Test: React.FC<Props> = () => {
  return (
    <div className="flex flex-col space-y-3">
      {[...Array(10)].map((x, i) => (
        <div className="bg-gray-200 p-10 w-full h-96 rounded-lg"></div>
      ))}
    </div>
  );
};

export default Test;
