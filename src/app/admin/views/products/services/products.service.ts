import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "~/environments/environment";

@Injectable()

export class ProductService
{
	public appUrl: string;
	public endPoint!: string;

	constructor(
		private _httpClient: HttpClient
	) {
		this.appUrl = environment.appUrl;
		this.endPoint = 'admin/products';
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

	/**
	 * Make a request with POST method (store new resource)
	 *
	 * @param request
	 * @returns Observable<Object>
	 */
	store(request: any): Observable<Object> {
        const formData = new FormData();
        formData.append("gambar", request.gambar, request.gambar.name);
        formData.append("nama_produk", request.nama_produk);
        formData.append("keterangan", request.keterangan);
        formData.append("harga", request.harga);

		return this._httpClient.post(`${this.appUrl}/${this.endPoint}`, formData);
	}

	/**
	 * Make a request with PUT method (update resource)
	 *
	 * @param request any
	 * @param primaryKey number
	 * @returns Observable<Object>
	 */
	update(request: any, primaryKey: number): Observable<Object> {
        const formData = new FormData();
        formData.append("_method", 'put');
        if (request.gambar instanceof File) {
            formData.append("gambar", request.gambar, request.gambar.name);
        } else {
            formData.append("gambar", request.gambar);
        }

        formData.append("nama_produk", request.nama_produk);
        formData.append("keterangan", request.keterangan);
        formData.append("harga", request.harga);

		return this._httpClient.post(`${this.appUrl}/${this.endPoint}/${primaryKey}`, formData);
	}

	/**
	 * Make a request with DELETE method (delete resource)
	 *
	 * @param primaryKey number
	 * @returns Observable<Object>
	 */
	delete(primaryKey: number): Observable<Object> {
		return this._httpClient.delete(`${this.appUrl}/${this.endPoint}/${primaryKey}`);
	}
}
