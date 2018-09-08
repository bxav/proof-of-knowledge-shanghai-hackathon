import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController
  ) {

  }

  public scanCode() {
    if (true) { // if (!this.platform.is('cordova')) {
      let alert = this.createNotAvailableAlert();
      alert.present();
    }
  }


  private createNotAvailableAlert() {
    return this.alertCtrl.create({
      title: 'Feature not available in browser',
      subTitle: 'You have to enter the address of the assessment.',
      inputs: [
        {
          name: 'address',
          placeholder: 'Assessment'
        }
      ],
      buttons: [{
        text: 'Not Now',
        role: 'cancel',
        handler: () => {
          this.navCtrl.popToRoot();
        }
      }, {
        text: 'Submit',
        role: '',
        handler: (data) => {
          return data;
        }
      }]
    });
  }
}
