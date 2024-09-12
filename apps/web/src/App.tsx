import React from 'react';
import { Button } from '@my-monorepo/ui';
import { formatDate, capitalize } from '@my-monorepo/utils';

const App: React.FC = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  const name = 'john doe';
  const capitalized = capitalize(name);
  const currentDate = formatDate(new Date());

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to the Monorepo React App</h1>
      <p>Name: {capitalized}</p>
      <p>Current Date: {currentDate}</p>
      <Button label="Click Me" onClick={handleClick} />
    </div>
  );
};

export default App;
