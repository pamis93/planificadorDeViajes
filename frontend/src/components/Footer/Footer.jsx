import { Link } from 'react-router-dom';
import RatingFooter from './RatingFooter/RatingFooter';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <>
      {/* Incluir el banner de valoración */}
      <RatingFooter />

      <footer className=" bg-custom-blue h-[300px] mb-0 sm:h-[300px] text-white text-sm sm:text-base py-4 sm:py-8 mt-6 sm:mt-0">
        <div className="container mx-auto px-4">
          {/* Parte superior del footer */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Logo o nombre del sitio */}
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold">WonderFly</h1>
            </div>

            {/* Enlaces de navegación */}
            <nav className="flex flex-wrap justify-center gap-4">
              <Link to="#about" className="hover:text-orange-500 transition-colors">
                {t('about')}
              </Link>
              <Link to="/contact" className="hover:text-orange-500 transition-colors">
                {t('contact')}
              </Link>
              <Link to="#privacy" className="hover:text-orange-500 transition-colors">
                {t('privacyPolicy')}
              </Link>
              <Link to="#terms" className="hover:text-orange-500 transition-colors">
                {t('termsAndConditions')}
              </Link>
            </nav>
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-[#a19f9f]"></div>

          {/* Redes sociales */}
          <div className="flex justify-center gap-4">
            <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
              {t('facebook')}
            </Link>
            <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              {t('twitter')}
            </Link>
            <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
              {t('instagram')}
            </Link>
            <Link to="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
              {t('linkedin')}
            </Link>
          </div>

          {/* Copyright */}
          <div className="mt-6 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} WonderFly. {t('allRightsReserved')}
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
