import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Assessment } from '../classes';
// import { Observable } from 'rxjs/Observable';

@Injectable()
export class AssessmentsService extends BackendService<Assessment> {
  protected get resource() { return Assessment._resource; }
  protected get class() { return Assessment; }
}
