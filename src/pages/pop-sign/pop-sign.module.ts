import { NgModule } from '@angular/core';
import { PopSignPage } from './pop-sign';
import { IonicPageModule } from 'ionic-angular';
import {LazyLoadImageModule} from 'ng-lazyload-image';

@NgModule({
  declarations: [
    PopSignPage
  ],
  imports: [
    IonicPageModule.forChild(PopSignPage),
    LazyLoadImageModule
  ],
})
export class PopSignPageModule {}
