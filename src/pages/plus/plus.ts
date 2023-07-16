import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
// import { AboutPage } from '../about/about';

/*import { EditionsPage } from '../noma-program/noma-program';
import { BenevolesPage } from '../benevoles/benevoles';
import { PetitionPage } from '../petition/petition';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { NomaPage } from '../noma/noma';
import { NewsPage } from '../news/news';*/


@IonicPage()
@Component({
  selector: 'page-plus',
  templateUrl: 'plus.html',
})
export class PlusPage {

  public otherMenus : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.otherMenus = this.chargerMenus();
  }

  ionViewDidLoad() {}
 
  //Cette fonction permet de charger
  //les autres menus
  chargerMenus(){

  	let pages = [
    { title: "Organisation", tabComponent: 'AssociationPage', icon: 'assets/img/seminar.png' },
    { title: 'Editions passées', tabComponent: 'EditionsPage', icon: 'assets/img/actu.png' },
    { title: 'Documents', tabComponent: 'OrganisationPage', icon: 'assets/img/list.png' },
    { title: 'Frais de participation', tabComponent: 'TarifsPage', icon: 'assets/img/price-tag.png' },
    { title: 'Partenaires', tabComponent: 'PartnersPage', icon: 'assets/img/partners.png' },
    //{ title: 'Presse', tabComponent: PressePage, icon: 'assets/img/actu.png' },
    { title: 'Contactez-nous', tabComponent: 'ContactPage', icon: 'assets/img/contact.png' },
    { title: 'A Propos', tabComponent: 'AboutPage', icon: 'assets/img/about.png'} 

  	];

  	return pages;
  }

  //On récupère la référence pour
  // afficher la page correspondante
  showPageItem(newItem){
  	
  	if(newItem.index!=undefined){
		this.navCtrl.parent.select(newItem.index);
	}else{
		this.navCtrl.push(newItem.tabComponent);
	}

  }

  //Fermer le formulaire
  close(){
  	this.navCtrl.pop();
  }

}
