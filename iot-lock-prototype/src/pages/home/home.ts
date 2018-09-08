import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {Ndef, NFC} from "@ionic-native/nfc";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  public lock: boolean = true;

  constructor(public navCtrl: NavController, private nfc: NFC) {

  }

  doRefresh(refresher) {
    this.lock = true;

    refresher.complete();
  }

  ngOnInit () {
    this.nfc.addNdefListener(() => {
      console.log('successfully attached ndef listener');
    }, (err) => {
      console.log('error attaching ndef listener', err);
    }).subscribe((event) => {
      console.log('received ndef message. the tag contains: ', event.tag);
      console.log('decoded tag id'+this.nfc.bytesToHexString(event.tag.id));

      this.setLock(false);

      return setTimeout(() => {
        this.setLock(true);
      },4000);
    });
  }

  setLock(lock: boolean) {
    this.lock = lock;

    console.log('Lock' + this.lock);
  }
}
