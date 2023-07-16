import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ObjectifsPage } from './objectifs';

@NgModule({
  declarations: [
    ObjectifsPage,
  ],
  imports: [
    IonicPageModule.forChild(ObjectifsPage),
  ],
})
export class ObjectifsPageModule {}
