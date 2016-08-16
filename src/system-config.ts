/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
    //'angular-sortablejs': 'vendor/angular-sortablejs',
    sortablejs: 'vendor/sortablejs/Sortable.js',
    'angular2-cookie': 'vendor/angular2-cookie',    
    'ng2-bootstrap': 'vendor/ng2-bootstrap',
    'moment': 'vendor/moment/moment.js',
    'dragula': 'vendor/dragula/dist/dragula.js',
    'ng2-dragula': 'vendor/ng2-dragula',
    'ng2-dnd': 'vendor/ng2-dnd',
    'ng2-slider-component': 'vendor/ng2-slider-component',
    'ng2-slideable-directive': 'vendor/ng2-slideable-directive',
    'ng2-styled-directive': 'vendor/ng2-styled-directive',
  };

/** User packages configuration. */
const packages: any = {
    //'angular-sortablejs': { main: 'index.js', defaultExtension: 'js' }
    'angular2-cookie': { main: 'core.js',  defaultExtension: 'js' },
    'ng2-bootstrap': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'ng2-bootstrap.js'
    },
    'ng2-dragula': { format: 'cjs', defaultExtension: 'js', main: 'ng2-dragula' },
    //'ng2-dragula': {main:'ng2-dragula.js', defaultExtension: 'js',},
    'ng2-dnd':         { defaultExtension: 'js' },
    'ng2-slider-component': {defaultExtension: 'js', main: 'ng2-slider.component'},
    'ng2-slideable-directive': {defaultExtension: 'js'},
    'ng2-styled-directive': {defaultExtension: 'js'},
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/forms',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/components/startmodal',
  'app/test',
  'app/components/test',
  'app/components/studyconfig',
  'app/studylist',
  'app/task/task-list',
  'app/task/task-details',
  'app/study/config/stageconfig',
  'app/login',
  'app/signup',
  'app/field',
  'app/field/fields',
  'app/studyconfig/review-strategy',
  'app/studyconfig/stageconfig',
  'app/studyconfig/studyconfig',
  'app/studyconfig-menu',
  'app/page-not-found',
  'app/shared/navbar',
  'app/index',
  'app/home',
  'app/shared/navbar/usernav',
  'app/shared/services',
  'app/services',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js',
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
