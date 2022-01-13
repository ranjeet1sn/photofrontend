import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-view-photos',
  templateUrl: './view-photos.component.html',
  styleUrls: ['./view-photos.component.scss'],
})
export class ViewPhotosComponent implements OnInit {
  photosList = [];
  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.photoService.viewPhoto().subscribe((res) => {
      this.photosList = res.data;
    });
  }
}
