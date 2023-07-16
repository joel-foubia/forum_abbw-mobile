import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, ViewController } from 'ionic-angular';
import { Slides, Events } from 'ionic-angular';
import { AfProvider } from '../../providers/af/af';
import { TabsPage } from '../tabs/tabs';
// import { ImageProvider } from '../../providers/image/image';
// import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

// import { IntervenantsPage } from '../intervenants/intervenants';
// import { ObjectifsPage } from '../objectifs/objectifs';
// import { TarifsPage } from '../tarifs/tarifs';
// import { ApiConfig } from '../../config';

@IonicPage()
@Component({
	selector: 'page-association',
	templateUrl: 'association.html'
})
export class AssociationPage {
	@Input() data: any;
	@Input() events: any;
	@ViewChild('idSlider') slider: Slides;

	public menus: any;
	public swipe: any = [];
	public infos: any;
	isActive: boolean;
	private emailForum;
	public imgLogo: any;
	public objSpinner;
	public contact;
	public mapTypeControl = true;
	public streetViewControl = true;
	public params: any = {};
	constructor(
		public navCtrl: NavController,
		public nav: Nav,
		public navParams: NavParams,
		private afServ: AfProvider ,// public modalCtrl: ModalController
		public view: ViewController
	) {
		//this.loadLocation();

		

		this.params['events'] = {
			onFinish: function(event: any) {
				// nav.setRoot(TabsPage);
				view.dismiss()
			},
			onRequest: function(event: any) {}
		};
	}

	ionViewDidLoad() {
		this.afServ.getOrganisations((data) => {
			console.log('Data => ', data);
			this.params['data'] = {
				btnNext: 'Suivant',
				btnValid: 'Valider',
				btnFinish: 'Terminer',
				btnRequest: 'Requette',
				btnSkip: 'Skip',
				lang: 'fr',
				items: data
			};

			console.log('items => ',this.params.data.items);
			this.swipe = this.params.data.items;
			console.log('Yo =>',this.swipe);
		});
	}

	show(value: string): boolean {

		let result: boolean = false;
		if(this.swipe!==undefined && this.swipe.length !==0){
		  
		  try {
			if (value == 'prev') {
				result = !this.slider.isBeginning();
			} else if (value == 'next') {
				result = this.slider.getActiveIndex() < (this.slider.length() - 1);
			} else if (value == 'finish') {
				result = this.slider.isEnd();
			}
			return result;  
		  } catch (e) {
			return false;
		  }
		
			
		}
	}
	changeSlide(index: number): void {
		if (index > 0) {
			this.slider.slideNext(300);
		} else {
			this.slider.slidePrev(300);
		}
  }
	onEvent(event: string) {
        if (this.events!==undefined && this.events[event]) {
            //this.events[event]();
			      this.events[event]();
        }
      
  }

  slideWillChange(){ 
      
	this.isActive = false;
  }


  //Le Slide a été changé
  slideHasChanged() {
	this.isActive = true;
	// if(this.slider.getActiveIndex() == 2){ 
	// } 

  }
}
