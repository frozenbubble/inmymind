import { platformBrowserDynamic  } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
//import { enableProdMode } from '@angular/core';
import { AppModule } from './app.module'
import { HashLocationStrategy, LocationStrategy, APP_BASE_HREF } from '@angular/common';
import { provide } from '@angular/core';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';

//enableProdMode();
// bootstrap(AppModule);
platformBrowserDynamic().bootstrapModule(AppModule, [
    ROUTER_PROVIDERS,
    provide(APP_BASE_HREF, { useValue: '/' }),
    provide(LocationStrategy, {
        useClass: HashLocationStrategy
    })
]);