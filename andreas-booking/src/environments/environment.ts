// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000',
  openWeather: 'https://open-weather13.p.rapidapi.com/city/',

  XRapidAPIKey: "X-RapidAPI-Key",
  XRapidAPIKeyValue: "456b6015bamsh2b903f77f95b8a2p10c934jsn4e5f6771647b",
  XRapidAPIHost: "X-RapidAPI-Host",
  XRapidAPIHostValue: "open-weather13.p.rapidapi.com",

  corsConfig: {
    allowOrigin: 'http://localhost:4200',
    allowMethods: 'GET, POST, PUT, DELETE',
    allowHeaders: 'Content-Type',
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
