import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { loginPage } from './login.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { loginPageRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    loginPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [loginPage]
})
export class loginPageModule {}
