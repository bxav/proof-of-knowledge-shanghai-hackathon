import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AssessmentPage } from './assessment';
import { SchemaFormModule } from 'ngx-schema-form';

@NgModule({
  declarations: [
    AssessmentPage,
  ],
  imports: [
    SchemaFormModule,
    IonicPageModule.forChild(AssessmentPage)
  ],
  exports: [
    AssessmentPage
  ]
})
export class AssessmentPageModule { }
