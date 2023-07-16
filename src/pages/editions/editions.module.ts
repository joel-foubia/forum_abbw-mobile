import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditionsPage } from './editions';

@NgModule({
  declarations: [
    EditionsPage,
  ],
  imports: [
    IonicPageModule.forChild(EditionsPage),
  ],
})
export class EditionsPageModule {}
