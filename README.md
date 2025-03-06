
# Angular v19 with Firebase and SSG (No SSR) with i18n

This project demonstrates how to use Angular v19 with Firebase for static site generation (SSG) and internationalization (i18n), without server-side rendering (SSR). The app is hosted as a completely static page without Firebase app-hosting, using normal hosting.

## Rendering Options in Angular

There are three options for rendering Angular apps:
1. Client-side rendering (CSR)
2. Server-side rendering (SSR)
3. Static site generation (SSG)

You can also combine these options using a hybrid approach. This project focuses on SSG without SSR.

## Caveats with @angular/ssr

When following the Angular prerendering guide (https://angular.dev/guide/prerendering#how-to-prerender-a-page), you might be instructed to run `ng add @angular/ssr`. If you select "no" for everything, it will still create a server, which is unnecessary for this project.

In the `angular.json` file, you need to set the `prerender` options. However, this will cause an error if no server is set, even though it's not needed.

When building the project, the output `index.html` files will be named `index.csr.html`. You can either rename these files using a script or configure your `firebase.json` to point to the `index.csr.html` file if localization is not a concern.

In this project I have make only one root prerendered, in order to see in the browser if it is indeed prerendered (pre-rendered child) and not the others.

## Caveats with Firebase i18n

### Language Selection in Firebase

Refer to the Firebase documentation on i18n rewrites (https://firebase.google.com/docs/hosting/i18n-rewrites#country-and-language-codes). Firebase requires lowercase language codes, except for the wildcard case `ALL`.

Angular outputs locale builds named based on each language code. The default language code `en-US` is not accepted by Firebase. To address this, add `en` as a special language in the `angular.json` file. This results in multiple folders for each language, including an `en_US` folder that can be ignored.

## Setting Base Href to "/"

To set the base href to `/`, configure it in the `angular.json` file. This works in conjunction with the special base language configuration mentioned above.

