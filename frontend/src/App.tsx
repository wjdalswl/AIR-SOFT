import Router from './Router';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Suspense } from 'react';
import { GlobalStyle } from './theme/GlobalStyle';
import { BrowserRouter } from 'react-router-dom';
import TopBar from './routes/TopBar';

function App() {
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <GlobalStyle />
        <Suspense fallback={<div>...loading</div>}>
          <TopBar />
          <Router />
        </Suspense>
        <ReactQueryDevtools initialIsOpen={true} />
      </BrowserRouter>
    </>
  );
}

export default App;
