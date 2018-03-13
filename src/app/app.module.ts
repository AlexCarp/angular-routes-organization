import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { CatalogModule } from './catalog';
import { ContactsModule } from './contacts';

const APP_MODULES = [
    CatalogModule,
    ContactsModule,
];

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        ...APP_MODULES,
    ],
    declarations: [AppComponent],
    providers: [/* TODO: Providers go here */],
    bootstrap: [AppComponent],
})
export class AppModule { }
