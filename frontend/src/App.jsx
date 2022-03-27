import { BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import Routes from './components/Routes';
import Main from './components/Main';
import Pages from './components/Pages';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header title="Portal para Desenvolvedores">
          <Routes />
        </Header>

        <Main>
          <Pages />
        </Main>
      </BrowserRouter>
    </>
  );
}
