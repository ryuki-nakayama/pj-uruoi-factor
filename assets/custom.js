/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */
jQuery(function($) {
  /**
   * accordion
   * アコーディオンメニューの開閉
   */
  {
    var toggle = $('.js-pullDownHead');
    var body = $('.js-pullDownBody');
    $(document).ready(function() {
      body.slideUp();
    })
    toggle.click(function() {
      if($(this).hasClass('_open')) {
        $(this).removeClass('_open');
        $(this).next(body).slideUp();
      } else {
        $(this).addClass('_open');
        $(this).next(body).slideDown();
      }
    });
  }

  /**
   * scroll animation
   * 要素が表示されたらactiveクラスを追加
   */
  {
    const THRESHOLD = 150; // アクティベートするスクロールタイミング
    const TARGET = $('.js-scrollActivate'); // ._activeを付与するターゲット要素
    $(window).scroll(function() {
      TARGET.each(function() {
        let activeOffset = $(this).offset().top;
        let scrollPos = $(window).scrollTop();
        let windowHeight = $(window).height();
        if (scrollPos > activeOffset - windowHeight + THRESHOLD) {
          $(this).addClass('_active')
        } else {
          $(this).removeClass('_active')
        }
      });
    });
  }
});



