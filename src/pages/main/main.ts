import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Nav } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AfProvider } from '../../providers/af/af';


@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
	public menus = [];
  public data_map;
  public current_lang;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, private afServ: AfProvider, public nav: Nav) {
    this.current_lang = 'fr';
    this.getDateEvents();
    this.menus = this.loadMenu();
  }

  ionViewDidLoad() {
  }

    loadMenu(){

  	let tab = [
  	
    { title: "Organisation", pageName: 'AssociationPage', tabComponent: 'AssociationPage', img: 'assets/img/seminar.png', icon: 'icon-book' },
    { title: "Documents", pageName: 'OrganisationPage', tabComponent: 'OrganisationPage', img: 'assets/img/calendar.png', icon: 'icon-file-document' },
    { title: "Programme", pageName: TabsPage, tabComponent: 'ProgramPage', index: 1,  img: 'assets/img/list.png', icon: 'icon-calendar' },
    { title: 'Editions passées', pageName: 'EditionsPage', tabComponent: 'EditionsPage', img: 'assets/img/actu.png', icon: 'icon-history' },
    { title: 'Inscription', pageName: 'InscriptionPage', tabComponent: 'InscriptionPage', img: 'assets/img/petition.png', icon: 'icon-pencil-box' },
    { title: 'Acteurs', pageName: TabsPage, tabComponent: 'IntervenantsPage', index: 3, img: 'assets/img/conference.png', icon: 'icon-account-multiple' },
    { title: 'Tarifs', pageName: 'TarifsPage', tabComponent: 'TarifsPage', img: 'assets/img/price-tag.png', icon: 'icon-tag' },
    { title: 'Partenaires', pageName: 'PartnersPage', tabComponent: 'PartnersPage', img: 'assets/img/partners.png', icon: 'icon-briefcase' },
    { title: 'Presse', pageName: 'PressePage', tabComponent: 'PressePage' , img: 'assets/img/press-pass.png', icon: 'icon-newspaper' },
    { title: 'Discussions', pageName: TabsPage, tabComponent: 'ChatPage', index: 2,  img: 'assets/img/chats.png', icon: 'icon-comment-multipe-outline' },
    { title: 'Contactez nous', pageName: 'ContactPage', tabComponent: 'ContactPage', img: 'assets/img/contact.png', icon: ' icon-email-outline' },
    { title: 'A Propos', pageName: 'AboutPage', tabComponent: 'AboutPage', img: 'assets/img/contact.png', icon: 'icon-account' }
  	];

  	return tab;
  }
 
  openMenu(){
  	this.menuCtrl.open();
  }

  //Cette fonction permet d'ouvrir la page
  //sélectionné par l'utilisateur
  itemTapped(page) {

  	let params = {};
 
    if (page.index) {
			params = { tabIndex: page.index, page: page.component };
		} 
    
    if (page.index === undefined) {
			this.navCtrl.push(page.pageName);
		} else if (page.index !== undefined) {
			this.nav.push(TabsPage, params);
    }

  }

  getDateEvents(){
    this.afServ.getInfosContact((res)=>{
      this.data_map = res;
    });
  }

}
