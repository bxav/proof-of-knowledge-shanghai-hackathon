import {Component, OnInit} from '@angular/core';
import {AlertController, NavController, Platform} from 'ionic-angular';
import {NFC} from "@ionic-native/nfc";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  public lock: boolean = true;
  public trial: number = 0;

  constructor(
    public navCtrl: NavController,
    private nfc: NFC,
    private platform: Platform,
    private alertCtrl: AlertController
  ) {

  }

  doRefresh(refresher) {
    this.lock = true;

    refresher.complete();
  }

  ngOnInit () {
    if (!this.platform.is('cordova')) {
      let alert = this.createNotAvailableAlert();
      alert.present();
      return;
    }

    this.nfc.addNdefListener(() => {
      console.log('successfully attached ndef listener');
    }, (err) => {
      console.log('error attaching ndef listener', err);
    }).subscribe((event) => {
      console.log('received ndef message. the tag contains: ', event.tag);
      console.log('decoded tag id'+this.nfc.bytesToHexString(event.tag.id));

      this.validate();
    });
  }

  private validate() {
    this.trial++;
    if (this.trial%2 == 0) {
      this.setLock(false);
    } else {
      return this.alertCtrl.create({
        title: 'You can\'t come In',
        subTitle: 'Your are missing the Basic Swimming pool knowledge.',
        buttons: [{
          text: 'Ok',
          role: '',
          handler: (data) => {
            this.setLock(true);
          }
        }]
      }).present();
    }
  }

  private createNotAvailableAlert() {
    return this.alertCtrl.create({
      title: 'Feature not available in browser',
      subTitle: 'You have to enter the address of the caller manually.',
      inputs: [
        {
          name: 'address',
          placeholder: 'Public Address'
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

  setLock(lock: boolean) {
    this.lock = lock;

    console.log('Lock' + this.lock);
  }
}
