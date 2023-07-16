import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, IonicPage } from 'ionic-angular';

import { AssociationPage } from '../association/association';
//import { DonsPage } from '../dons/dons';
/*import { NomaProgramPage } from '../noma-program/noma-program';
import { NomaPage } from '../noma/noma';*/
import { AboutPage } from '../about/about';
//import { ParrainsPage } from '../parrains/parrains';
import { ChatPage } from '../chat/chat';
import { GalleriePage } from '../gallerie/gallerie';

import { ContactPage } from '../contact/contact'; 
import { NewsPage } from '../news/news';
import { TabsPage } from '../tabs/tabs';

 
export interface PageInterface {
  title: string;
  pageName?: any;
  tabComponent?: any;
  index?: number;
  icon: string;
}
 
@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  // Basic root for our content view
  rootPage = TabsPage;
 
  // Reference to the app's root nav
  @ViewChild(Nav) nav: Nav;
 
  pages: PageInterface[] = [
    { title: "Accueil", pageName: 'MainPage', tabComponent: 'HomePage', icon: 'assets/img/home.png' }, 
    { title: "Africa Rise", pageName: 'MenuPage', tabComponent: 'MenuPage', icon: 'assets/img/seminar.png' },
    { title: "Organisation", pageName: TabsPage, tabComponent: 'OrganisationPage', index: 1, icon: 'assets/img/calendar.png' },
    { title: "Programme", pageName: 'ProgramPage', tabComponent: 'ProgramPage', icon: 'assets/img/list.png' },
    { title: 'Editions passées', pageName: 'EditionsPage', tabComponent: 'EditionsPage', icon: 'assets/img/actu.png' },
    { title: 'Inscription', pageName: 'InscriptionPage', tabComponent: 'InscriptionPage', icon: 'assets/img/petition.png' },
    { title: 'Acteurs', pageName: TabsPage, tabComponent: 'IntervenantsPage', index: 2, icon: 'assets/img/conference.png' },
    { title: ' Frais de participation', pageName: 'TarifsPage', tabComponent: 'TarifsPage', icon: 'assets/img/price-tag.png' },
    { title: 'Partenaires', pageName: 'PartnersPage', tabComponent: 'PartnersPage', icon: 'assets/img/partners.png' },
    { title: 'Presse', pageName: 'PressePage', tabComponent: 'PressePage' , icon: 'assets/img/press-pass.png' },
    { title: 'Discussions', pageName: TabsPage, tabComponent: 'ChatPage', index: 3, icon: 'assets/img/chats.png' },
    { title: 'Contactez nous', pageName: 'ContactPage', tabComponent: 'ContactPage', icon: 'assets/img/contact.png' },
    { title: 'A Propos', pageName: AboutPage, tabComponent: AboutPage, icon: 'assets/img/about.png' }
    
    
  ];

 
  constructor(public navCtrl: NavController) { }
 
  openPage(page: PageInterface) {
    let params = {};
 
    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
    }
 
    // The active child nav is our Tabs Navigation
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    } else {
      // Tabs are not active, so reset the root page 
      // In this case: moving to or from SpecialPage
      this.nav.setRoot(page.pageName, params);
    }
  }
 
  isActive(page: PageInterface) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNav();
 
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }
 
    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
    return;
  }
 
}