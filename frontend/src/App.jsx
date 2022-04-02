import { BrowserRouter } from 'react-router-dom';

import Header from './components/common/Header';
import Routes from './components/common/Routes';
import Main from './components/common/Main';
import Pages from './components/common/Pages';

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
