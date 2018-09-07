import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssessmentTemplatesComponent } from './assessment-templates.component';
import { AssessmentTemplateTableComponent } from "./assessment-template-table/assessment-template-table.component";
import {AssessmentTemplateEditorComponent} from "./assessment-template-editor/assessment-template-editor.component";

const routes: Routes = [{
  path: '',
  component: AssessmentTemplatesComponent,
  children: [{
    path: 'assessment-template-table',
    component: AssessmentTemplateTableComponent,
  }, {
    path: 'assessment-template-editor',
    component: AssessmentTemplateEditorComponent,
  }, {
    path: 'assessment-template-editor/:id',
    component: AssessmentTemplateEditorComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssessmentTemplatesRoutingModule { }

export const routedComponents = [
  AssessmentTemplatesComponent,
  AssessmentTemplateEditorComponent,
  AssessmentTemplateTableComponent,
];
