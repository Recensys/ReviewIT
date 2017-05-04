// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  api: 'http://localhost:2529/api/',
  blob: 'https://reitblob.blob.core.windows.net/resources/',

  // active directory
  clientId: '99ae2d1d-63d4-45df-934b-cd82a39727ce',
  postLogoutRedirectUrl: 'http://localhost:4200',
  redirectUri: 'http://localhost:4200',
  tenant: 'ituniversity.onmicrosoft.com'
};
