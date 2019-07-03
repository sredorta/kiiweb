// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURL: "https://localhost:3000/api",
  languages: ['fr','en','es'],
  matInputAppearance: "fill",   //Mat input appearance "outline", "default", "fill"...
  vapidPublic: 'BJ2ZA-q_PZ8yCexelSbjYCtCwZw0fmYVaEQ5MLMqhR4_1DVPDHcWOC1nL0LMKavdoV9bBrCmRDUQu_z35Uk8Evs',
  gmapsKey:'AIzaSyDJX3_xSyhfZCyA2Z20f1d74X8sHOkX9dE',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
