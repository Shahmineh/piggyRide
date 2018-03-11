// @ts-ignore
require('jquery-ui/ui/effect');

/**
 * Assigns the scrollTo method to jQuery.
 *
 * @param {JQueryStatic} $
 */
function assignScrollTo ($) {
  if (!$) {
    throw new Error('$ not found.');
  }

  const abortScroll = function () {
    $('html, body').stop();
    document.removeEventListener('wheel', abortScroll);
  };

  Object.assign($, {
    scrollTo: function (target, time = 1500, easing = 'swing') {
      document.addEventListener('wheel', abortScroll);
      $('html, body').animate(
        {
          scrollTop: $(target).offset().top
        },
        time,
        easing
      );
      // console.log('Scrolled');
    }
  });
}

module.exports = (() => {
  if (typeof $ === 'function') {
    assignScrollTo($);
  }
  return assignScrollTo;
})();