/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'es6-shim/es6-shim.js',
      'reflect-metadata/**/*.+(js|js.map)',
      'rxjs/**/*.+(js|js.map)',
      '@angular/**/*.+(js|js.map)',
      'zone.js/dist/**/*.+(js|js.map)',
      'angular-sortablejs/**/*.+(js|js.map)',
      'sortablejs/Sortable.js',
      'angular2-cookie/**/*.+(js|js.map)',
      'ng2-bootstrap//*.js',
      'moment/moment.js'
    ]
  });
};
