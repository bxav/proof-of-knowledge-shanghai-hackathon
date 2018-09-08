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
}
