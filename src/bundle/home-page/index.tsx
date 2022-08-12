import { ReactNode, useEffect, useRef } from 'react';

import gsap from 'gsap';

import { ASButton } from 'components';
import { CN, percentage, useGetDevice } from 'utils';

import { Pillaiyar } from 'static/svgs/pillaiyar';

import './index.scss';

export default function HomePage() {
  const device = useGetDevice();

  return (
    <>
      <ASCarousel
        horizontal={device === 'mobile'}
        bottomHeight={device === 'mobile' ? 70 : 55}
        carouselColors={['#000', '#bbf333', '#ffb653', '#90b0fa']}
        carousels={[
          <div className="as-home-page-carousel">
            <h1 className="as-home-page-carousel-heading">பிள்ளையார் நோன்பு 2021</h1>
            <p>
              வேழமுகத்து விநாயகனைத் தொழ வாழ்வு மிகுத்து வரும் வெற்றி மிகுத்து வேலவனைத் தொழ புத்தி
              மிகுத்து வரும் வெள்ளைக் கொம்பன் விநயகனைத் தொழ துள்ளி ஒடும் தொடர்ந்த வினைகள் அப்ப
              முப்பழம் அமுது செய்தருளிய தொப்பையப்பனைத் தொழ வினையறுமே!
            </p>
          </div>,
          <div className="as-home-page-carousel">
            <p>
              ஹூஸ்டன் நகரத்தார் சார்பில் அனைவருக்கும் வணக்கம்! சைவமும் தமிழும் நகரத்தார் நமது இரு
              கண்கள்! பிள்ளையார் நோன்பு நமது கலாச்சாரத்தின் முக்கியமான அடையாளம்! பல்வேறு ஆண்டுகளாக
              நகரத்தார்களின் மிகுந்த நம்பிக்கைக்குரிய நோன்பாக கடைபிடிக்கப்பட்டு வரும் பிள்ளையார்
              நோன்பு ஆண்டுதோறும் காத்திகை மாத சஷ்டி திதியும் சதய நட்சத்திரமும் சேர்ந்த நன்னாளில்
              கொண்டாடப்படுகிறது. திருக்கார்த்திகையில் இருந்து 21ஆம் நாள் கொண்டாடப் படும் நோன்பு
              பிள்ளையார் நோன்பு இந்த ஆண்டு டிசம்பர் 10-ஆம் தேதி வருகிறது. இருந்தாலும் பள்ளி கல்லூரி
              விடுமுறைக்குப் பிறகு, வார இறுதியில் அனைவரும் ஓரிடத்தில் கூடித் தங்கியிருந்து
              பிள்ளையார் நோன்பைக் கொண்டாடி மகிழ்வது நம் பகுதி நகரத்தார் வழக்கம். அந்த வகையில் இந்த
              ஆண்டு பிள்ளையார் நோன்பு, டிசம்பர் 24-ஆம் தேதி ஹூஸ்டனில் ஹையட் ஹோட்டலில் நிகழ
              இருக்கிறது.
            </p>
          </div>,
          <div className="as-home-page-carousel">
            <h1 className="as-home-page-carousel-heading">Pillayar Nonbu 2021</h1>
            <p>
              Greetings from Houston Nagarathars! We are excited to share with you that we will be
              hosting Pillayar Nonbu this year at Hyatt Regency, Houston Intercontinental Airport.
              Please mark your calendar for Pillayar Nonbu on Dec 24th, 2021 For any enquiries,
              please contact organizing team at houston.nonbu@gmail.com.
            </p>
          </div>,
        ]}
      />
      <div className="as-home-page-button-group">
        <ASButton text="Login" buttonStyle="primary" />
        <ASButton text="Sign up" />
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
