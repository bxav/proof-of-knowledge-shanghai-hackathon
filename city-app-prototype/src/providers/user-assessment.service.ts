import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserAssessmentService {
  constructor(
    private http: HttpClient,
  ) {}

  public get(url: string): Observable<any> {
    return this.http.get(url, {
      headers: {'Content-Type': 'application/json'}
    });
  }

  public postFromAssessmentTemplateWithData(assessmentTemplateUrl: string, assessmentTemplate: any, assessmentData: any): Observable<any>  {
    console.log(assessmentTemplateUrl, assessmentData);
    let urlArray = new URL(assessmentTemplateUrl);
    console.log(urlArray);

    return this.http.post(urlArray.origin + '/assessments', {
      assessmentTemplate: assessmentTemplate['@id'],
      data: assessmentData
    });
  }
}
