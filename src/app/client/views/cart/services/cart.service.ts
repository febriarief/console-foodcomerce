import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "~/environments/environment";

@Injectable()

export class CartService
{
	public appUrl: string;
	public endPoint!: string;

	constructor(
		private _httpClient: HttpClient
	) {
		this.appUrl = environment.appUrl;
		// this.endPoint = 'products';
	}

	/**
	 * Make a request with GET method (get list of resources)
	 *
	 * @param params any
	 * @returns Observable<Object>
	 */
	checkout(request: any): Observable<Object> {
		return this._httpClient.post(`${this.appUrl}/checkout`, request);
	}
}
