import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';

import { AssessmentTemplatesRoutingModule, routedComponents } from './assessment-templates-routing.module';
import {Ng2SmartTableModule} from "ng2-smart-table";
import { NgJsonEditorModule } from 'ang-jsoneditor'
import {SchemaFormModule} from "ngx-schema-form";
import {AssessmentsService, AssessmentTemplatesService} from "lms-api/services";

@NgModule({
  imports: [
    ThemeModule,
    AssessmentTemplatesRoutingModule,
    Ng2SmartTableModule,
    NgJsonEditorModule,
    SchemaFormModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  entryComponents: [
  ],
  providers: [
    AssessmentTemplatesService,
    AssessmentsService,
  ]
})
export class AssessmentTemplatesModule { }
