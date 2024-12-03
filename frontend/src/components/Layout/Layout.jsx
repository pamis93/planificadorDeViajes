import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './ErrorPage';
import FeedbackButton from '../Rating/FeedbackButton';

export const Layout = () => {
  return (
    <>
      {/* <ErrorBoundary fallback={<ErrorPage />}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
      <FeedbackButton /> */}
      <ErrorBoundary fallback={<ErrorPage />}>
        <div className="">
          <Header />
          <main className="">
            <div className="">
              <Outlet />
            </div>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
      <Footer />
      <FeedbackButton />
    </>
  );
};
