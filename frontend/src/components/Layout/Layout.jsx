import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

export const Layout = () => {
  return (
    <div className="">
      <Header />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};
