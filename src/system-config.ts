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
