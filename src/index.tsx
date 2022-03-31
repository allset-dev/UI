import { render } from 'react-dom';

const App = () => {
  return (
    <>
      <h1>Congrats!</h1>
      <h3>You have successfully setup React.JS from scratch</h3>
      <iframe
        src="https://www.2embed.ru/embed/tmdb/movie?id=568271"
        style={{ width: '500px', height: '300px' }}
        allowFullScreen={true}
      />
    </>
  );
};

render(<App />, document.getElementById('root'));
