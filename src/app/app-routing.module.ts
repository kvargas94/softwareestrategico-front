import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './services/auth/auth-guard';
import { SidenavmenuComponent } from './components/sidenavmenu/sidenavmenu.component';
import { BooksComponent } from './components/books/books.component';
import { SyncComponent } from './components/sync/sync.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', 
  component: SidenavmenuComponent,
  children:[
    {
      path:'',
      component:HomeComponent
    }
  ] ,
  canActivate: [AuthGuard] },
  { path: 'books', 
    component: SidenavmenuComponent,
    children:[
      {
        path:'',
        component:BooksComponent
      }
    ] ,
    canActivate: [AuthGuard] },
    { path: 'sync', 
    component: SidenavmenuComponent,
    children:[
      {
        path:'',
        component:SyncComponent
      }
    ] ,
    canActivate: [AuthGuard] }, 
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
