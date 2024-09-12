import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@my-monorepo/ui';
import { formatDate, capitalize } from '@my-monorepo/utils';

function App() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  const name = 'john doe';
  const capitalized = capitalize(name);
  const currentDate = formatDate(new Date());

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div style={{ padding: '20px' }}>
      <h1>Welcome to the Monorepo React App</h1>
      <p>Name: {capitalized}</p>
      <p>Current Date: {currentDate}</p>
      <Button label="Click Me" onClick={handleClick} />
    </div>
    </>
  )
}

export default App
