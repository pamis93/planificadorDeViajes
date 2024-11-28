import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './ErrorPage';
import FeedbackButton from '../Rating/FeedbackButton';


export const Layout = () => {
  return (
    <>
      <ErrorBoundary fallback={<ErrorPage />}>
      <Header/>
        <main>
          <Outlet />
        </main>
      <Footer />
      </ErrorBoundary>
      <FeedbackButton />
    </>
  );
};
