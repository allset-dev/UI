import { render } from 'react-dom';

const App = (props: { children: string }) => {
  const asd = '';

  return (
    <>
      <h1>Congrats!</h1>
      <h3>You have successfully setup React.JS from scratch</h3>
    </>
  );
};

render(<App>asd</App>, document.getElementById('root'));
