import {Component, OnInit} from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
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
    public loadingCtrl: LoadingController
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
      this.navCtrl.pop();
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
