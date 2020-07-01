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
        console.log(this._document.querySelector('#angular-app-root1'));
        return this._document.querySelector('#angular-app-root1');
    }
    protected _createContainer(): void {
        console.log("hello Overlay")
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

    // protected _createContainer(): void {
    //     console.log("Overlay Container");
    //     const container: HTMLDivElement = document.createElement('div');
    //     container.classList.add('app-overlay-container');
    //     console.log( document.querySelector('#angular-app-root1'));
    //     const element: Element | null = document.querySelector('#angular-app-root1');
    //     if (element !== null) {
    //         element.appendChild(container);
    //         this._containerElement = container;
    //     }
    // }
}