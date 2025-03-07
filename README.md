
# Angular v19 with Firebase and SSG (No SSR) with i18n

This project demonstrates how to use Angular v19 with Firebase for static site generation (SSG) and internationalization (i18n), without server-side rendering (SSR). The app is hosted as a completely static page without Firebase app-hosting, using normal hosting.

## Rendering Options in Angular

There are three options for rendering Angular apps:
1. Client-side rendering (CSR)
2. Server-side rendering (SSR)
3. Static site generation (SSG)

You can also combine these options using a hybrid approach. This project focuses on SSG without SSR.

## Caveats with @angular/ssr

### server is needed in config, but not used
When following the Angular prerendering guide (https://angular.dev/guide/prerendering#how-to-prerender-a-page), you might be instructed to run `ng add @angular/ssr`. If you select "no" for everything, it will still create a server, which is unnecessary for this project.

In the `angular.json` file, you need to set the `prerender` options. However, this will cause an error if no server is set, even though it's not needed.

In this project I have made only one root prerendered, in order to see in the browser if it is indeed prerendered (pre-rendered child) and not the others.

### it outputs index.csr.html files
Because prerendering option requires server, angular builds a server and makes our index.html files turn into index.csr.html files. to get around this we use a little node script to rename them during build.


## Caveats with Firebase i18n

### Language Selection in Firebase

Refer to the Firebase documentation on i18n rewrites (https://firebase.google.com/docs/hosting/i18n-rewrites#country-and-language-codes). Firebase requires lowercase language codes, except for the wildcard case `ALL`.

Angular outputs locale builds named based on each language code. The default language code `en-US` is not accepted by Firebase. To address this, add `en` as a special language in the `angular.json` file. This results in multiple folders for each language, including an `en_US` folder that can be ignored.

### SPA mode

Firebase says you need to write rewrites when using an SPA, but you cannot direct to a index.html page that you don't have. So we instead tell the rewrite to use the `en/index.html` file. The i18n rewrite rules will take place first, and all references to an index file will get the correct language.


# Setting Base Href to "/" or /lang for each?

Just don't.

Google even says that this confuses crawlers, and firebase wants you do to this, angular wants you to do this, so just do this.

As the index.html files for each language have a basehref, it allows you to create links to different language versions of your app (and firebase will forward to the correct one on first load). If you want this option, change the angular.json and remove the basehref options inside i18n. I have left the links on the page but they don't work without changing that option.



## Caveats with @angular/localize

### Easier translations
We use ng-extract-i18n-merge to automatically extract and then merge instead of just extracting and doing it manually.