import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [],
  imports: [CommonModule, ToastrModule],
  providers: [{ provide: ToastrService, useValue: ToastrService }],
})
export class SharedModule {}
