import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IntervenantsPage } from './intervenants';
import {LazyLoadImageModule} from 'ng-lazyload-image';

@NgModule({
  declarations: [
    IntervenantsPage,
  ],
  imports: [
    IonicPageModule.forChild(IntervenantsPage),
    LazyLoadImageModule
  ],
})
export class IntervenantsPageModule {}
