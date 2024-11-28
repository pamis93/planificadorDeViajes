import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './ErrorPage';
import FeedbackButton from '../Rating/FeedbackButton';

export const Layout = () => {
  return (
    <>
      <Header />
      <ErrorBoundary fallback={<ErrorPage />}>
        <main>
          <Outlet />
        </main>
      </ErrorBoundary>
      <FeedbackButton />
    </>
  );
};
