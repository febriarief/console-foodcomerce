import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "~/environments/environment";

@Injectable()

export class OrderService
{
	public appUrl: string;
	public endPoint!: string;

	constructor(
		private _httpClient: HttpClient
	) {
		this.appUrl = environment.appUrl;
		this.endPoint = 'order';
	}

	/**
	 * Make a request with GET method (get list of resources)
	 *
	 * @param params any
	 * @returns Observable<Object>
	 */
	get(params?: any): Observable<Object> {
		let httpParams = new HttpParams();

		if (params) {
			Object.keys(params).forEach((key) => {
				if (params[key]) httpParams = httpParams.append(key, params[key]);
			});
		}

		return this._httpClient.get(`${this.appUrl}/${this.endPoint}`, { params: httpParams });
	}
}
