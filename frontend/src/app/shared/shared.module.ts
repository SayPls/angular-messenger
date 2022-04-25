import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    FilterPipe,
  ],
  exports: [
    LoadingSpinnerComponent,
    ReactiveFormsModule,
    FilterPipe,
    FormsModule,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SharedModule { }
