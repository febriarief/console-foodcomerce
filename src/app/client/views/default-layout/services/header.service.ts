import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'

@Injectable()

export class HeaderService
{
    private _cartSubject: Subject<number> = new Subject<number>();
    private _trackingSubject: Subject<void> = new Subject<void>();

    updateCart(qty: number) {
        this._cartSubject.next(qty)
    }

    getCartObservable(): Observable<any> {
        return this._cartSubject.asObservable()
    }

    openTrackingModal() {
        this._trackingSubject.next()
    }

    getTrackingObservable(): Observable<any> {
        return this._trackingSubject.asObservable()
    }
}
