import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
	public contact;
	public mapTypeControl = true;
  	public streetViewControl = true;

  constructor(public navParams: NavParams, public vc: ViewController) {
  	this.contact = this.navParams.get('map');
  }

  ionViewDidLoad() {
    
  }

  //Fermer le formulaire
  close(){
  	this.vc.dismiss();
  }

}
