/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
    //'angular-sortablejs': 'vendor/angular-sortablejs',
    sortablejs: 'vendor/sortablejs/Sortable.js',
    'angular2-cookie': 'vendor/angular2-cookie',
    'ng2-bootstrap': 'vendor/ng2-bootstrap',
    'moment': 'vendor/moment/moment.js'
};

/** User packages configuration. */
const packages: any = {
    //'angular-sortablejs': { main: 'index.js', defaultExtension: 'js' }
    'angular2-cookie': { main: 'core.js',  defaultExtension: 'js' },
    'vendor/ng2-bootstrap': {
        defaultExtension: 'js'
    }
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
