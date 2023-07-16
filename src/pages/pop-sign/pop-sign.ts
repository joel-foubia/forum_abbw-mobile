import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ViewController, ToastController } from 'ionic-angular';

import { ApiConfig } from '../../config';

@IonicPage()
@Component({
	selector: 'page-pop-sign',
	templateUrl: 'pop-sign.html'
})
export class PopSignPage {
	public progress;
	public max;
	public current = 0;
	public isSpinner;
	type;
	actor;
	offset: number;
	defaultImage: string;
	interestList = [];
	selected_all = false;
	selected_interests = [];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public view: ViewController,
		public toastCtrler: ToastController
	) {
		this.offset = 100;
		this.defaultImage = 'assets/images/logo.png';
		this.type = navParams.get('type');
		this.actor = navParams.get('actor');
		this.interestList = navParams.get('interests');
		console.log('interestList => ', this.interestList)
		console.log('type', this.type);

		this.max = ApiConfig.Max_Petition;
		this.current = this.navParams.get('current');
		this.totalPetition();
		if(this.interestList !== undefined){
			this.unSelect();
		}
	}

	ionViewDidLoad() {}

	//Cette fonction est appelé pour lister
	//le nombre de signatures de la pétition
	totalPetition() {
		this.isSpinner = true;
		this.progress = Math.ceil(this.current / this.max * 100);
	}
	addInt(int) {
		int.clicked = !int.clicked;
		if (int.clicked == true) {
			this.selected_interests.push(int);
		} else {
			this.selected_interests.splice(this.selected_interests.indexOf(int.title), 1);
		}
	}
	selectAll() {
		this.selected_all = !this.selected_all;
		this.selected_interests = [];
		for (let k = 0; k < this.interestList.length; k++) {
			if (this.selected_all == true) {
				this.interestList[k].clicked = true;
				this.selected_interests.push(this.interestList[k]);
			} else {
				this.interestList[k].clicked = false;
				this.selected_interests.splice(this.selected_interests.indexOf(this.interestList[k].title), 1);
			}
		}
	}

	unSelect() {
		console.log('unselectiong');
		for (let k = 0; k < this.interestList.length; k++) {
			if (this.selected_all == false) {
				this.interestList[k].clicked = false;
			}
		}
	}

	finish() {
		if (this.selected_interests.length > 0) {
			this.view.dismiss(this.selected_interests);
		} else {
			this.presenttoast("Veuillez choisir au moins un centre d'interet");
		}
	}
	presenttoast(flag) {
		let toast = this.toastCtrler.create({
			message: flag,
			duration: 3000,
			position: 'bottom'
		});
		toast.present();
	}
}
