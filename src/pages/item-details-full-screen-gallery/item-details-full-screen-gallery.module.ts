import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FullScreenGallery } from '../../components/full-screen-gallery/full-screen-gallery';
import { ItemDetailsPageFullScreenGallery } from './item-details-full-screen-gallery';

@NgModule({
  declarations: [
    ItemDetailsPageFullScreenGallery, FullScreenGallery
  ],
  imports: [
    IonicPageModule.forChild(ItemDetailsPageFullScreenGallery),
  ],
})
export class ItemDetailsPageFullScreenGalleryPageModule {}
