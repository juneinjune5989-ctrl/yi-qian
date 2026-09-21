import { createHashRouter, type RouteObject } from 'react-router-dom';
import Home from '../views/Home.tsx';
import Records from '../views/Records.tsx';
import NotFound from '../views/NotFound.tsx';

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/records', element: <Records /> },
  { path: '*', element: <NotFound /> },
];

// Hash 路由不依赖服务器回退配置，适合 GitHub Pages 等静态托管。
const router = createHashRouter(routes);

export default router;
