import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NavbarComponent } from './shareds/navbar/navbar.component';
import {MenubarModule} from 'primeng/menubar';
import { NoticiasComponent } from './pages/noticias/noticias.component'
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { EventosComponent } from './pages/eventos/eventos.component';
import { ReactiveFormsModule } from '@angular/forms';






const appRoutes:Routes=[

  {path:'',component:HomeComponent},
  {path:'noticias',component:NoticiasComponent},
  {path:'admin',component:AdminComponent},
  {path:'eventos',component:EventosComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarouselComponent,
    NavbarComponent,
    NoticiasComponent,
    CardComponent,
    AdminComponent,
    EventosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp (environment.firebaseConfig),
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
