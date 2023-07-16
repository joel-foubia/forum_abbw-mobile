import { Component, ViewChild } from '@angular/core';
import { IonicPage, ViewController, NavParams, ToastController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';


@IonicPage()
@Component({
  selector: 'page-benevole-form',
  templateUrl: 'benevole-form.html',
})
export class BenevoleFormPage {

  public edition: any;
   
  constructor(public navParams: NavParams, public toastCtrl: ToastController, public vc: ViewController, private apiServ: RemoteServiceProvider) {
    this.edition = this.navParams.get('objet');
  }

  ionViewDidLoad() {}

    //Cette fonction permet de charger les coordonnées géographies
  showVideo(){
    this.apiServ.readYTVideo(this.edition.url);    
  }

  //Fermer le formulaire
  close(){
  	this.vc.dismiss();
  }


}
