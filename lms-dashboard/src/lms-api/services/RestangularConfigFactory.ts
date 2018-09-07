// This file should not be modified, as it can be overwritten by the generator.

import { Subject } from 'rxjs/Subject';

export function RestangularConfigFactory(RestangularProvider, config) {
  RestangularProvider.setBaseUrl(config.baseUrl);
  RestangularProvider.setRestangularFields({id: '@id'}); // only for items
  RestangularProvider.setSelfLinkAbsoluteUrl(false);

  // in-progress requests counter
  // subscribe with: this.restangular.provider['requestCount'].subscribe(count => console.log(count));
  RestangularProvider.requestCounter = 0;
  RestangularProvider.requestCount = new Subject();

  // callback to trigger when 401 response status happens
  RestangularProvider.notAuthorizedCallback = null;

  // change header when required
  // use: this.restangular.provider['changeHeader']('Authorization', 'Bearer hello-world');
  RestangularProvider.headersSubject = new Subject();
  RestangularProvider.changeHeader = (key: string, value: string) => {
    RestangularProvider.headersSubject.next({ key: key, value: value });
  }
  RestangularProvider.headersSubject.subscribe((header: {key: string, value: string}) => {
    RestangularProvider.configuration.defaultHeaders[header.key] = header.value;
  });

  // intercept 401 in responses, to redirect to login page
  RestangularProvider.addErrorInterceptor(function (response, subject, responseHandler) {
    RestangularProvider.requestCount.next(--RestangularProvider.requestCounter);
    if (response.status === 401) {
      if (RestangularProvider.notAuthorizedCallback) {
        RestangularProvider.notAuthorizedCallback();
      }
    }
  });

  RestangularProvider.addFullRequestInterceptor(function (element, operation) {
    RestangularProvider.requestCount.next(++RestangularProvider.requestCounter);
    // remove the id field from post operations
    if ((operation === 'post') && (element.id !== undefined)) {
      delete element.id;
    }
    // change nested property into iri identifier for put and post operations
    if ((operation === 'post') || (operation === 'put')) {
      for (const prop of Object.keys(element)) {
        if ((element[prop] !== null) && (typeof(element[prop]) === 'object') && element[prop]['@id']) {
          element[prop] = element[prop]['@id'];
        }
      }
    }
  });

  // intercept JSON LD to turn it into JSON/Restangular object(s)
  RestangularProvider.addResponseInterceptor(function (data, operation) {
    RestangularProvider.requestCount.next(--RestangularProvider.requestCounter);
    if (!data) {
      return {};
    }

    function populateHref(data) {
      if (data['@id']) {
        data.href = data['@id'].substring(1);
        // add id to collection items (first-level only)
        if ((data['@type'] !== 'hydra:Collection') && (data.id === undefined)) {
          const id = data['@id'].split('/');
          data.id = parseInt(id.pop());
        }
      }
    }
    populateHref(data);

    if ('getList' === operation) {
      const collectionResponse = data['hydra:member'];
      if (!collectionResponse) {
        return data;
      }

      collectionResponse.metadata = {};
      Object.keys(data).forEach(function (key) {
        if ('hydra:member' !== key) {
          collectionResponse.metadata[key] = data[key];
        }
      });
      const pagination = {
        current: 1,
        last: 1,
        totalItems: data['hydra:totalItems'],
      };
      if (data['hydra:view'] && data['hydra:view']['hydra:last'] && (data['hydra:view']['@id'].indexOf('page=') !== -1)) {
        pagination.current = parseInt(data['hydra:view']['@id'].split('page=')[1].split('&')[0]);
        pagination.last = parseInt(data['hydra:view']['hydra:last'].split('page=')[1].split('&')[0]);
      }
      collectionResponse.pagination = pagination;

      Object.keys(collectionResponse).forEach(function (key) {
        populateHref(collectionResponse[key]);
      });
      return collectionResponse;
    }
    return data;
  });
}
