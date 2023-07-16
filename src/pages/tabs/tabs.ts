import { Component,  ViewChild } from '@angular/core';
import { NavParams, Events, Tabs } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild(Tabs) tabs: Tabs;
 
  tab1Root = 'MainPage';
  tab2Root = 'ProgramPage';
  tab3Root = 'IntervenantsPage';
  tab4Root = 'ChatPage';
  tab5Root = 'PlusPage';

  public myIndex: any;

  constructor(navParams: NavParams, events: Events) {
  	
  	this.myIndex = navParams.data.tabIndex || 0;
  }
}
