import { Link } from 'react-router-dom';

import { ASButton, ASSplitCarousel } from 'components';
import { isMobile, useTranslation } from 'utils';

import './index.scss';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <ASSplitCarousel
        horizontal={isMobile}
        bottomHeight={isMobile ? 70 : 55}
        carouselColors={['', '#bbf333', '#ffb653', '#90b0fa']}
        carousels={[
          <div className="as-home-page-carousel">
            <h1 className="as-home-page-carousel-heading">{t('pillaiyarPatti')}</h1>
            <p>{t('pillaiyarPattiDesc1')}</p>
          </div>,
          <div className="as-home-page-carousel">
            <p>{t('pillaiyarPattiDesc2')}</p>
          </div>,
          <div className="as-home-page-carousel">
            <h1 className="as-home-page-carousel-heading">{t('pillaiyarPatti')}</h1>
            <p>{t('pillayarPattiDesc3')}</p>
          </div>,
        ]}
      />
      <div className="as-home-page-button-group">
        <Link to="/login" tabIndex={-1}>
          <ASButton text={t('login')} buttonStyle="primary" />
        </Link>
        <ASButton text={t('signUp')} />
      </div>
    </>
  );
}
