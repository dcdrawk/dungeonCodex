angular.module('dc')
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue', {
      'default': '700', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '400', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('green', {
      'default': '400' // use shade 200 for default, and keep all other shades the same
      // 'hue-1': '600', // use shade 100 for the <code>md-hue-1</code> class
    // })

    // .backgroundPalette('grey', {
    //   'default': '50', // by default use shade 400 from the pink palette for primary intentions
    //   'hue-1': '400', // use shade 100 for the <code>md-hue-1</code> class
    //   'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
    //   'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    .warnPalette('purple', {
      'default': '400'
    });
});
