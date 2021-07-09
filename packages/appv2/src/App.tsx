import React from 'react';

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <div className="bg-cyan-500">
      <span>
        <i
          style={{ fontSize: '20px', verticalAlign: '-0.25em' }}
          className="iconify"
          data-icon="ion:accessibility-outline"
          data-inline="true"
        />
      </span>
    </div>
  );
};

export default App;
