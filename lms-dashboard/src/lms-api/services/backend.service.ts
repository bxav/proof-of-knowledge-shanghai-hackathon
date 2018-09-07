// This file should not be modified, as it can be overwritten by the generator.

import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs/Observable';

@Injectable()
export abstract class BackendService<T> {
  protected resource;
  protected abstract get class(): any;
  protected idField: string = 'id';

  constructor(protected restangular: Restangular) {
    // transform restangular items as class instances
    this.restangular.provider.addElementTransformer(this.resource, item => {
      if (!item[this.idField]) return item;
      // preserve static, get and set
      let baseItem = new (this.class)();
      item = Object.assign(baseItem, item);
      // delete Restangular methods (and prevent from using it...)
      for (const method in item) {
        if (typeof item[method] === 'function') {
          delete item[method];
        }
      }
      // add resource class methods to the item
      baseItem = new (this.class)();
      for (const method in baseItem) {
        if (typeof baseItem[method] === 'function') {
          item[method] = baseItem[method];
        }
      }
      return item;
    });
  }

  setIdField(idField: string): void {
    this.idField = idField;
  }

  makeCriteriasCopy(criterias: Object, additionalCriterias: Object = {}): Object {
    return Object.assign({}, criterias, additionalCriterias);
  }

  makeCriterias(pageNumber: number, criterias: Object = {}): Object {
    const pageCriteria = this.makeCriteriasCopy(criterias);
    if (pageNumber) pageCriteria['page'] = pageNumber;
    return pageCriteria;
  }

  get(id: any): Observable<T> {
    return this.restangular.one(this.resource, id).get();
  }

  getAll(pageNumber?: number, criterias: Object = {}): Observable<T[]> {
    return this.restangular.all(this.resource).getList(this.makeCriterias(pageNumber, criterias));
  }

  getAllBy(field: string, value: any, pageNumber?: number, criterias: Object = {}, alias: string = this.resource): Observable<T[]> {
    return this.restangular.one(field, value).all(alias).getList(this.makeCriterias(pageNumber, criterias));
  }

  getAllByFilter(filter: string, value: any, pageNumber?: number, criterias: Object = {}): Observable<T[]> {
    const getCriterias = this.makeCriteriasCopy(criterias); ;
    getCriterias[filter] = value;
    return this.getAll(pageNumber, getCriterias);
  }

  add(item: T): Observable<T> {
    return this.restangular.all(this.resource).post(item);
  }

  update(item: T): Observable<T> {
    return this.restangular.one(this.resource, item[this.idField]).customPUT(item);
  }

  remove(item: T): Observable<any> {
    return this.restangular.one(this.resource, item[this.idField]).remove();
  }

  collectionize(...items: T[]): T[] {
    const collection = items;
    collection['pagination'] = { current: 1, last: 1, totalItems: collection.length };
    return collection;
  }
}
