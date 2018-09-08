import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';

import { AssessmentTemplatesRoutingModule, routedComponents } from './assessment-templates-routing.module';
import {Ng2SmartTableModule} from "ng2-smart-table";
import { NgJsonEditorModule } from 'ang-jsoneditor'
import {SchemaFormModule} from "ngx-schema-form";
import {AssessmentsService, AssessmentTemplatesService} from "lms-api/services";
import {
  ButtonViewComponent,
  ViewAssessmentTemplateGenerateQrCodeModalComponent
} from "./assessment-template-table/assessment-template-table.component";
import {QRCodeModule} from "angularx-qrcode";

@NgModule({
  imports: [
    ThemeModule,
    AssessmentTemplatesRoutingModule,
    Ng2SmartTableModule,
    NgJsonEditorModule,
    SchemaFormModule,
    QRCodeModule,
  ],
  declarations: [
    ButtonViewComponent,
    ViewAssessmentTemplateGenerateQrCodeModalComponent,
    ...routedComponents,
  ],
  entryComponents: [
    ButtonViewComponent,
    ViewAssessmentTemplateGenerateQrCodeModalComponent,
  ],
  providers: [
    AssessmentTemplatesService,
    AssessmentsService,
  ]
})
export class AssessmentTemplatesModule { }
