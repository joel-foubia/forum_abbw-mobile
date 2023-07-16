import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the ProgramPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-program',
	templateUrl: 'program.html'
})
export class ProgramPage {
	programme;

	constructor(public navCtrl: NavController, public menu: MenuController,public navParams: NavParams, public afDb: AngularFireDatabase) {
		this.afDb.list('/programme').subscribe((res) => {
			this.programme = res;
			console.log('Programme', this.programme);
			// this.constructDays();
			//console.log('Resonse', res)
		});
	}

	constructDays() {
		var struct = [];
		var const_prog = [];
		for (let i = 0; i < this.programme.length; i++) {
			if (struct.indexOf(this.programme[i].jour) < 0) {
				struct.push({ day: this.programme[i].jour });
			}
		}

		for (let i = 0; i < this.programme.length; i++) {
			for (let k = 0; k < struct.length; k++) {
				if (this.programme[i].jour == struct[k].day) {
					struct[k].prog = this.programme[i];
				}
			}
		}
		console.log('struc', struct);
	}

	ionViewDidLoad() {
		// console.log('ionViewDidLoad ProgramPage');
	}
	openMenu(){
		this.menu.open();
	}
}
