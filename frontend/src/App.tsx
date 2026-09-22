import { useEffect, useState } from 'react';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import Home from './views/Home.tsx';
import Records from './views/Records.tsx';

type Page = 'home' | 'records';

function getPageFromHash(): Page {
  return window.location.hash === '#/records' ? 'records' : 'home';
}

export default function App() {
  const [page, setPage] = useState<Page>(() => getPageFromHash());

  useEffect(() => {
    const onHashChange = () => setPage(getPageFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const goHome = () => {
    window.location.hash = '#/';
    setPage('home');
  };

  const goRecords = () => {
    window.location.hash = '#/records';
    setPage('records');
  };

  return (
    <ErrorBoundary>
      {page === 'records' ? <Records onBackHome={goHome} /> : <Home onViewRecords={goRecords} />}
    </ErrorBoundary>
  );
}
