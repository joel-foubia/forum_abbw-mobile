import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AfProvider } from '../../providers/af/af';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppRate } from '@ionic-native/app-rate';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  android: any;
  about :any;
  defaultImg: string;

  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              public menuCtrl: MenuController,
              public afProvider : AfProvider,
              public appRate: AppRate,
              public iab : InAppBrowser) {

                this.defaultImg = "assets/images/team.jpg";  

                this.afProvider.getInfosAbout((_val)=>{
                  this.about = _val;
                  this.android = this.about.playstore;
                  });
  }
  openMenu(){
    this.menuCtrl.open();
  }
  ionViewDidLoad() {
    // console.log('ionViewDidLoad AboutPage');
    
  }
  facebook(){
    // console.log(this.test.facebookPage);
     this.iab.create(this.about.facebookPage);
  }
  
  instagram(){
    // console.log(this.test.instagramPage);
   this.iab.create(this.about.instagramPage);
  }
  twitter(){
     this.iab.create(this.about.twitterPage);
  }

  conditions(url){
    this.iab.create(url);
  }
  contact(){
    this.iab.create(this.about.email);
  }

  /**
   * Cette fonction ouvre la boite de dialogue
   * afin que l'utilisateur puisse évaluer l'application
   * @param android string, le lien vers le Play Store
   * @param ios string, le lien vers l'App Store
   * @param objEvaluate any, l'objet JSON
   */
  //arriere plan gray light
  doEvaluate(ios?:any){

    this.appRate.preferences = {
      usesUntilPrompt: 3,
      simpleMode: true,
      // useLanguage: this.translate.getDefaultLang(),
      displayAppName:"ABBW 2018",
      storeAppURL: { 
       //ios: '<app_id>',
       android: 'market://details?id='+this.about.playstore
      }
    };

    this.appRate.preferences.useLanguage = 'fr';
    this.appRate.promptForRating(true);
  }

}
