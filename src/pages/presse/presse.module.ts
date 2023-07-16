import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PressePage } from './presse';

@NgModule({
  declarations: [
    PressePage,
  ],
  imports: [
    IonicPageModule.forChild(PressePage),
  ],
})
export class PressePageModule {}
