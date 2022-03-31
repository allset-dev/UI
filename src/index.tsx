import { createRoot } from 'react-dom/client';

const App = () => {
  return (
    <>
      <h1>Congrats!</h1>
      <h3>You have successfully setup React.JS from scratch</h3>
      <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
        Go to ABOUT
      </a>
    </>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
