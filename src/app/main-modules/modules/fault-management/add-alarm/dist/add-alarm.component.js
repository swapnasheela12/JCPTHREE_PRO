"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddAlarmComponent = void 0;
var core_1 = require("@angular/core");
var file_upload_popup_component_1 = require("src/app/core/components/commonPopup/file-upload-popup/file-upload-popup.component");
//import { dropdown, R4GState, JC } from './cia-module-dropdown';
var rxjs_1 = require("rxjs");
var AddAlarmComponent = /** @class */ (function () {
    function AddAlarmComponent(dialog, _formBuilder, http, datashare) {
        this.dialog = dialog;
        this._formBuilder = _formBuilder;
        this.http = http;
        this.datashare = datashare;
        //default value
        //bulkupload: boolean;
        this.selectedRadio = "Bulk Upload";
        this.showSuccessFailure = false;
        this.showSuccessKpiFailure = false;
        this._onDestroy = new rxjs_1.Subject();
        this.showBulk = true;
        this.radioTypeList = [
            { 'name': 'Bulk Upload' },
            { 'name': 'Manual' }
        ];
        this.frequencySelected = "Per Day";
        this.frequencyData = [
            'Per Day',
            'BBH',
            'NBH',
            'Hourly'
        ];
        this.selectedValue = "RAN";
        this.show = true;
        this.domains = [
            { value: 'RAN', viewValue: 'RAN' },
            { value: 'IP-1', viewValue: 'IP-1' },
        ];
        this.techSelectedValue = "5G";
        this.techs = [
            { value: '5G', viewValue: '5G' },
        ];
        this.vendor = "JIO";
        this.vendors = [
            { value: 'JIO', viewValue: 'JIO' },
            { value: 'IP-3', viewValue: 'IP-3' }
        ];
        this.softwareversion = "7.0.0.0";
        this.softwares = [
            { value: '7.0.0.0', viewValue: '7.0.0.0' },
            { value: 'IP-4', viewValue: 'IP-4' },
        ];
        this.option1 = true;
        this.option2 = false;
    }
    // R4G Circle Dropdown 
    // Select JC Dropdown 
    AddAlarmComponent.prototype.trackByRadioButtonType = function (index, type) {
        return type.name;
    };
    AddAlarmComponent.prototype.trackByChipsPost = function (index, postValue) {
        return postValue;
    };
    AddAlarmComponent.prototype.trackByChipsPre = function (index, preValue) {
        return preValue;
    };
    AddAlarmComponent.prototype.trackByRadioButtonFrequency = function (index, frequency) {
        return frequency;
    };
    AddAlarmComponent.prototype.switchthedivs = function (ev) {
        if (ev.value == 'Bulk Upload') {
            this.showBulk = true;
        }
        else {
            this.showBulk = false;
        }
        console.log(ev);
    };
    AddAlarmComponent.prototype.ngOnInit = function () {
    };
    AddAlarmComponent.prototype.toggleShow = function () {
        this.show === !this.show;
    };
    AddAlarmComponent.prototype.showUpload = function () {
        this.show === !this.show;
    };
    AddAlarmComponent.prototype.manualUpload = function () {
        !this.show === this.show;
    };
    AddAlarmComponent.prototype.openFileUploadPopup = function () {
        var _this = this;
        var title = "Upload Files";
        var showExample = true;
        var dialogData = new file_upload_popup_component_1.fileUploadPopupModel(title, showExample);
        var dialogRef = this.dialog.open(file_upload_popup_component_1.FileUploadPopupComponent, {
            width: '700px',
            height: '290px',
            data: dialogData,
            panelClass: 'file-upload-dialog'
        });
        dialogRef.afterClosed().subscribe(function (data) {
            if (data == 'uploadClicked') {
                _this.showSuccessFailure = true;
            }
        });
    };
    AddAlarmComponent.prototype.changediv = function (divswitch) {
        //console.log(this.$event);
        if (divswitch === "BulkUpload") {
            this.BulkUpload = true;
            this.Manual = false;
        }
        else if (divswitch === "Manual") {
            this.BulkUpload = false;
            this.Manual = true;
        }
    };
    AddAlarmComponent.prototype.radioButtonChanged = function ($event) {
        // if you need the event source and value it can be accessed.
        console.log(this.selectedRadio);
        // if ($event.value == this.BulkUpload) {
        //   this.BulkUpload = true;
        //   this.Manual = false;
        // } else if($event.value == this.Manual) {
        //   this.Manual = true;
        //  this.BulkUpload = false;
        // }
    };
    AddAlarmComponent = __decorate([
        core_1.Component({
            selector: 'app-add-alarm',
            templateUrl: './add-alarm.component.html',
            styleUrls: ['./add-alarm.component.scss']
        })
    ], AddAlarmComponent);
    return AddAlarmComponent;
}());
exports.AddAlarmComponent = AddAlarmComponent;
