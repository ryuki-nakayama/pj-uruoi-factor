{
  const BREAK_POINT_MAX = '(max-width: 768px)';
  if (window.matchMedia(BREAK_POINT_MAX).matches) {
    const swiper = new Swiper('#js-scheduleSwiper', {
      navigation: {
        nextEl: ".js-scheduleSwiperButtonNext",
        prevEl: ".js-scheduleSwiperButtonPrev"
      }
    });
  }
}