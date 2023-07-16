import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    templateUrl: 'item-details-full-screen-gallery.html'
})

export class ItemDetailsPageFullScreenGallery {
    page: any;
    params: any;

    constructor(public navCtrl: NavController, navParams: NavParams) {
        console.log(navParams.get('index'));
        
        let index =  navParams.get('index');
        this.params = {data: {}};
        this.params.data.items = navParams.get('group');
        this.params.data.fullscreen = 'FullScreenGallery';
        this.params.data.index = index;
    }
}
