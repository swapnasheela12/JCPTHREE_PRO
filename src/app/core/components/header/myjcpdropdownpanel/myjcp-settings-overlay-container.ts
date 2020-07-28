import { Injectable, OnDestroy, Inject } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';

@Injectable({providedIn: 'root'})

export class AppOverlayContainer extends OverlayContainer implements OnDestroy {
    constructor(@Inject(DOCUMENT) _document: any) {
        super(_document);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    getRootElement(): Element {
        return this._document.querySelector('#angular-app-root1');
    }
    protected _createContainer(): void {
        super._createContainer();
        this._appendToRootComponent();
    }

    private _appendToRootComponent(): void {
        if (!this._containerElement) {
            return;
        }
        const rootElement = this.getRootElement();
        console.log(rootElement)
        const parent = rootElement || this._document.body;
        parent.appendChild(this._containerElement);
    }
}