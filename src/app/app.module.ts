import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoutineDetailsComponent } from './routine-details/routine-details.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DataService } from './data.service';
import { AddRoutineComponent } from './add-routine/add-routine.component';
import { CreateRoutineComponent } from './create-routine/create-routine.component';
import {CalendarModule} from '@syncfusion/ej2-angular-calendars';
import {IvyCarouselModule} from 'angular-responsive-carousel';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatDialogModule} from '@angular/material/dialog';
import { PopUpComponent } from './pop-up/pop-up.component';
import { SearchByRoutineComponent } from './search-by-routine/search-by-routine.component';
import { SearchByFriendsComponent } from './search-by-friends/search-by-friends.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
@NgModule({

  entryComponents:[PopUpComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    HttpClientModule,CalendarModule,
    CarouselModule ,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    IvyCarouselModule

  ],
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    RoutineDetailsComponent,
    ProfileComponent,
    SearchPageComponent,
    NavbarComponent,
    SidebarComponent,
    AddRoutineComponent,
    CreateRoutineComponent,
    PopUpComponent,
    SearchByRoutineComponent,
    SearchByFriendsComponent,


  ],
  exports: [

  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
