import { ReactNode, useEffect, useRef } from 'react';

import gsap from 'gsap';

import { ASButton } from 'components';
import { CN, isMobile, percentage, useTranslation } from 'utils';

import { Pillaiyar } from 'static/svgs/pillaiyar';

import './index.scss';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <ASCarousel
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
        <ASButton text={t('login')} buttonStyle="primary" />
        <ASButton text={t('signUp')} />
      </div>
    </>
  );
}

const SCROLL_BREAK_POINT = 20;

const ScrollTimelineDefaultValues = {
  delay: 0,
  defaults: { ease: 'none', duration: 0 },
} as gsap.TimelineVars;

interface ASCarouselProps {
  carousels: ReactNode[];
  bottomHeight: number;
  carouselColors: string[];
  horizontal?: boolean;
}

export function ASCarousel(props: ASCarouselProps) {
  const { carousels, bottomHeight, carouselColors, horizontal } = props;

  const carouselRef = useRef();
  const carouselTop = useRef();
  const carouselBottom = useRef();

  const noOfCarousels = carousels.length + 1;

  useEffect(() => {
    const carouselElement = carouselRef.current as HTMLElement;

    debouncedScrollAnimate();

    carouselElement.addEventListener('scroll', debouncedScrollAnimate, true);
    window.addEventListener('resize', debouncedScrollAnimate);

    return () => {
      carouselElement.removeEventListener('scroll', debouncedScrollAnimate, true);
      window.removeEventListener('resize', debouncedScrollAnimate);
    };
  }, [horizontal]);

  function debouncedScrollAnimate() {
    requestAnimationFrame(scrollAnimate);
  }

  function scrollAnimate() {
    const carouselElement = carouselRef.current as HTMLElement;
    const carouselBottomElement = carouselBottom.current as HTMLElement;
    const carouselTopElement = carouselTop.current as HTMLElement;

    const { scrollTop, clientHeight, scrollHeight, scrollLeft, clientWidth, scrollWidth } =
      carouselElement;

    // Note: variables based on direction
    const scroll = horizontal ? scrollLeft : scrollTop;
    const oneScreenMaxInPx = horizontal ? clientWidth : clientHeight;
    const totalScreenMaxInPX = horizontal ? scrollWidth : scrollHeight;

    const scrollInPx = scroll > 0 ? scroll : 0;
    const noOfScreen = totalScreenMaxInPX / oneScreenMaxInPx;
    const totalScrolledInPer = percentage.getPercentage(scrollInPx, totalScreenMaxInPX);
    const currentCarousel = Math.floor(scrollInPx / oneScreenMaxInPx);
    const passedScreenMaxInPx = oneScreenMaxInPx * currentCarousel;
    const currentCarouselScrolledInPx = scrollInPx - passedScreenMaxInPx;
    const isFirstCarousel = currentCarousel === 0;
    const currentCarouselScrollPercentage = percentage.getPercentage(
      currentCarouselScrolledInPx,
      oneScreenMaxInPx
    );
    const scrolledMoreThanHalfScreen = currentCarouselScrollPercentage > 50;

    const bottomStyles: gsap.TweenVars = {};
    const topStyles: gsap.TweenVars = {};

    if (isFirstCarousel) {
      if (currentCarouselScrollPercentage > SCROLL_BREAK_POINT) {
        const maxPer = 100 - SCROLL_BREAK_POINT;
        const scrollPer = currentCarouselScrollPercentage - SCROLL_BREAK_POINT;
        const showBottomHeightInPer = (scrollPer / maxPer) * bottomHeight;

        bottomStyles.height = `${showBottomHeightInPer}%`;
      } else {
        bottomStyles.height = '0%';
      }
    } else {
      bottomStyles.height = `${bottomHeight}%`;
    }
    const oneScreenInPer = 100 / noOfScreen;
    const scrollLeftPercentage = (totalScrolledInPer - oneScreenInPer) * noOfScreen;

    bottomStyles.x = isFirstCarousel
      ? 0
      : -percentage.getValue(scrollLeftPercentage, carouselElement.clientWidth);
    topStyles.backgroundColor =
      carouselColors[scrolledMoreThanHalfScreen ? currentCarousel + 1 : currentCarousel];

    gsap
      .timeline(ScrollTimelineDefaultValues)
      .to(carouselBottomElement, bottomStyles)
      .to(carouselTopElement, topStyles);
  }

  return (
    <div className={CN('as-carousel', horizontal && 'horizontal')} ref={carouselRef}>
      <div className="as-carousel-fake-scroll">
        {Array(noOfCarousels)
          .fill(0)
          .map((_, carouselIndex) => {
            return <div className="as-carousel-fake-scroll-section" key={carouselIndex} />;
          })}
      </div>
      <div className="as-carousel-main">
        <div className="as-carousel-main-top" ref={carouselTop} style={{ height: '100%' }}>
          <Pillaiyar className="as-login-avatar" />
        </div>
        <div className="as-carousel-main-bottom" ref={carouselBottom} style={{ height: `0%` }}>
          {carousels.map((carousel, carouselIndex) => {
            return (
              <div className="as-carousel-main-bottom-section" key={carouselIndex}>
                <div className="as-carousel-main-bottom-section-scroll">{carousel}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
