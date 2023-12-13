import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { tap } from 'rxjs/operators'
import { environment } from "~/environments/environment"

@Injectable()

export class AuthService 
{
	public appUrl: string
	public endPoint: string

	constructor(
		private _httpClient: HttpClient
	) {
		this.appUrl   = environment.appUrl
		this.endPoint = 'admin/auth'
	}

	/**
	 * Send login request
	 *
	 * @param request any
	 * @returns Observable<Object>
	 */
	login(request: any): Observable<Object> {
		return this._httpClient.post(`${this.appUrl}/${this.endPoint}/login`, request)
		.pipe(
            tap((data: any) => {
	            if (data && data.token) {
					localStorage.setItem('currentUser', JSON.stringify(data))
				}

            	return data
            })
        )
	}

	/**
	 * Send logout request
	 *
	 * @returns Observable<Object>
	 */
	logout(): Observable<Object> {
		return this._httpClient.get(
			`${this.appUrl}/${this.endPoint}/logout`,
			{}
		)
		.pipe(
			tap(async (resp) => {
				localStorage.removeItem('currentUser')
				return resp
			})
		)
	}

	/**
	 * Get data of saved user
	 *
	 * @returns any
	 */
	getUser(): any {
        const item = localStorage.getItem('currentUser')
        const currentUser = item ? JSON.parse(item) : null
		if (currentUser && currentUser.user) return currentUser.user
        return null
    }

	/**
	 * Get data of saved token
	 *
	 * @returns any
	 */
	getToken(): any {
        const item = localStorage.getItem('currentUser')
        const currentUser = item ? JSON.parse(item) : null
		if (currentUser && currentUser.token) return currentUser.token
        return null
    }
}
