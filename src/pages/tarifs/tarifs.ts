import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, MenuController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { AfProvider } from '../../providers/af/af';
import { ApiConfig } from '../../config';



@IonicPage()
@Component({
  selector: 'page-tarifs',
  templateUrl: 'tarifs.html',
})
export class TarifsPage {

	public tarifs : any;
  public current_lang;
  public objSpinner;
  
  constructor(public navParams: NavParams, public menuCtrl: MenuController, private afServ: AfProvider, public navCtrl: NavController) {
  	this.loadTarifs();
    this.current_lang = 'fr';
  }

  ionViewDidLoad() {
  }

  openMenu(){
  	this.menuCtrl.open();
  }

  loadTarifs(){

  	this.objSpinner = true;
    this.afServ.getTarifs((res)=>{
      this.tarifs = res;
      this.objSpinner = false;
    });

  }

  send(){
    this.navCtrl.push('InscriptionPage');
  }

}
