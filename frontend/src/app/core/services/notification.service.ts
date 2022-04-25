import { Injectable } from '@angular/core';
import {IndividualConfig, ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  public showInfoMessage(message?: string, title?: string, config?: Partial<IndividualConfig>) {
    this.toastr.show(message, title, config);
  }

  public showSuccessMessage(message?: string, title?: string, config?: Partial<IndividualConfig>) {
    this.toastr.success(message, title, config);
  }

  public showErrorMessage(info?: string, title?: string, config?: Partial<IndividualConfig>) {
    this.toastr.error(info, title, config);
  }
}
