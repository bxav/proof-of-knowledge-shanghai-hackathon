import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {UserAssessmentService} from "../../providers/user-assessment.service";

@IonicPage()
@Component({
  selector: 'page-assessment',
  templateUrl: 'assessment.html'
})
export class AssessmentPage implements OnInit {
  item: any = {};
  data: any = {};

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private userAssessmentService: UserAssessmentService,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
  }

  ngOnInit() {
    this.loadEntity();
  }

  public send() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait, your assessment is sending.'
    });

    loading.present();

    this.userAssessmentService.postFromAssessmentTemplateWithData(this.navParams.get('item'), this.item, this.data).subscribe(data => {
      loading.dismissAll();

      let alert = this.createSuccessAlert();
      alert.present();

      console.log(data);
    }, error => {
      loading.dismissAll();

      let alert = this.createFailureAlert();
      alert.present();
    });
  }

  private createSuccessAlert() {
    return this.alertCtrl.create({
      title: 'Success',
      subTitle: 'Enjoy your new life!',
      buttons: [{
        text: 'Ok',
        role: '',
        handler: () => {
          this.navCtrl.pop();
        }
      }]
    });
  }

  private createFailureAlert() {
    return this.alertCtrl.create({
      title: 'You Failed!',
      subTitle: 'Do you want to try again?',
      buttons: [{
        text: 'Not Now',
        role: 'cancel',
        handler: () => {
          this.navCtrl.pop();
        }
      }, {
        text: 'Yes',
        role: '',
        handler: () => {

        }
      }]
    });
  }

  public goback() {
    this.navCtrl.pop();
  }

  private loadEntity() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait, your assessment is loading.'
    });

    loading.present();
    this.userAssessmentService.get(this.navParams.get('item')).subscribe((entity) => {
      this.item = entity;

      loading.dismissAll();
    });
  }
}
