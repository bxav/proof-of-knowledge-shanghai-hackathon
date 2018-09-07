import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { AssessmentTemplate } from '../classes';
// import { Observable } from 'rxjs/Observable';

@Injectable()
export class AssessmentTemplatesService extends BackendService<AssessmentTemplate> {
  protected get resource() { return AssessmentTemplate._resource; }
  protected get class() { return AssessmentTemplate; }
}
