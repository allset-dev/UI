import { ReactNode, useEffect, useRef } from 'react';

import gsap from 'gsap';

import { CN, percentage } from 'utils';

import { Pillaiyar } from 'static/svgs/pillaiyar';

import './index.scss';

const SCROLL_BREAK_POINT = 20;

const ScrollTimelineDefaultValues = {
  delay: 0,
  defaults: { ease: 'none', duration: 0 },
} as gsap.TimelineVars;

interface ASSplitCarouselProps {
  carousels: ReactNode[];
  bottomHeight: number;
  carouselColors: string[];
  horizontal?: boolean;
}

export function ASSplitCarousel(props: ASSplitCarouselProps) {
  const { carousels, bottomHeight, carouselColors, horizontal } = props;

  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselTop = useRef<HTMLDivElement>(null);
  const carouselBottom = useRef<HTMLDivElement>(null);

  const noOfCarousels = carousels.length + 1;

  useEffect(() => {
    const carouselElement = carouselRef.current;

    if (carouselElement) {
      debouncedScrollAnimate();

      carouselElement.addEventListener('scroll', debouncedScrollAnimate, true);
      window.addEventListener('resize', debouncedScrollAnimate);

      return () => {
        carouselElement.removeEventListener('scroll', debouncedScrollAnimate, true);
        window.removeEventListener('resize', debouncedScrollAnimate);
      };
    }
  }, [horizontal]);

  function debouncedScrollAnimate() {
    requestAnimationFrame(scrollAnimate);
  }

  function scrollAnimate() {
    const carouselElement = carouselRef.current as HTMLElement;
    const carouselBottomElement = carouselBottom.current;
    const carouselTopElement = carouselTop.current;

    if (!carouselBottomElement || !carouselTopElement) return;

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
