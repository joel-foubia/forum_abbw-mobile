import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GalleriePage } from './gallerie';
import { SubImageGalleryLayout1 } from '../../components/sub-image-gallery/layout-1/sub-image-gallery-layout-1';
//import { ItemDetailsPageFullScreenGallery } from '../../pages/item-details-full-screen-gallery/item-details-full-screen-gallery';

@NgModule({
  declarations: [
    GalleriePage, SubImageGalleryLayout1
  ],
  imports: [
    IonicPageModule.forChild(GalleriePage),
  ],
})
export class GalleriePageModule {}
