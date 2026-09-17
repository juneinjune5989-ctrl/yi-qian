import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import Home from '../views/Home.tsx';
import NotFound from '../views/NotFound.tsx';

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '*', element: <NotFound /> },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_BASE_PATH || '/',
});

export default router;
