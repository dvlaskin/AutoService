import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable()
export class HttpRequestService {

    private url = "/api/";

    constructor(private http: HttpClient) {
    }

    getRequest(apiController: string) {
        return this.http.get(this.url + apiController);
    }

    getRequestParams(apiController: string, getString: string) {
        return this.http.get(this.url + apiController + '/' + getString);
    }

    postRequest(apiController: string, postObject: any) {
        return this.http.post(this.url + apiController, postObject);
    }
    
    putRequest(apiController: string, putId: string, putObject: object) {

        return this.http.put(this.url + apiController + '/' + putId, putObject);
    }
    
    deleteRequest(apiController: string, id: string) {
        return this.http.delete(this.url + apiController + '/' + id);
    }
}