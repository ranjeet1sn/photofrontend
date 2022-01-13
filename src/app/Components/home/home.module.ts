import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPhotosComponent } from './view-photos/view-photos.component';
import { RouterModule, Routes } from '@angular/router';
import { AddPhotoComponent } from './add-photo/add-photo.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ViewPhotosComponent,
  },
  {
    path: 'add',
    component: AddPhotoComponent,
  },
  {
    path: 'edit/:id',
    component: AddPhotoComponent,
  },
];

@NgModule({
  declarations: [ViewPhotosComponent, AddPhotoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
  ],
})
export class HomeModule {}
