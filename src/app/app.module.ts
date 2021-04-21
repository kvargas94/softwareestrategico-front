import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { JwtInterceptor } from './services/auth/jwt-interceptor';
import { SidenavmenuComponent } from './components/sidenavmenu/sidenavmenu.component';
import { DialogComponent } from './components/shared/dialog/dialog.component';
import { BooksComponent } from './components/books/books.component';
import { DatePipe } from '@angular/common';
import { SyncComponent } from './components/sync/sync.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    SidenavmenuComponent,
    BooksComponent,
    SyncComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HttpClientXsrfModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  entryComponents: [DialogComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
