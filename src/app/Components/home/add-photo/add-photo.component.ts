import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from 'src/app/services/photo.service';

export interface description {
  word: string;
  allocation: number;
}

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss'],
})
export class AddPhotoComponent implements OnInit {
  photoForm: FormGroup;
  apiCalling: boolean = false;
  errorMessage = '';
  id = '';
  descrptionArray: description[] = [
    {
      word: '',
      allocation: 0,
    },
  ];
  total: number = 0;
  image: any = '';

  constructor(
    private photoService: PhotoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.photoService.singlePhoto(this.id).subscribe((res) => {
        this.photoForm.controls.image.setValue(res.data.image);
        this.image = res.data.image;
        this.descrptionArray = res.data.description;
        this.descrptionArray.forEach((ele) => {
          this.total += ele.allocation;
        });
      });
    }
    this.photoForm = new FormGroup({
      image: new FormControl(null),
      description: new FormControl(null),
    });
  }
  onFileCHange(event) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.image = reader.result;
      this.photoForm.controls.image.setValue(this.image);
    };
  }

  addMore() {
    let total = 0;
    this.descrptionArray.forEach((ele) => {
      total += Number(ele.allocation);
    });
    if (total < 100) {
      this.descrptionArray.push({
        word: '',
        allocation: 0,
      });
    }
  }

  remove(index) {
    this.descrptionArray.splice(index, 1);
  }

  submit() {
    let total = 0;
    this.descrptionArray.forEach((ele) => {
      total += Number(ele.allocation);
    });
    if (total > 100) {
      this.setMessage('Total  must be equal to 100');

      return;
    } else if (total < 100) {
      this.setMessage('Total  must be equal to 100');
      return;
    }
    for (let i = 0; i < this.descrptionArray.length; i++) {
      if (this.descrptionArray[i].word === '') {
        this.setMessage('Word is Required');
      }
    }
    this.photoForm.controls.description.setValue(this.descrptionArray);
    if (!this.id) {
      this.apiCalling = true;
      this.photoService.addPhoto(this.photoForm.value).subscribe(
        (res) => {
          this.apiCalling = false;
          this.setMessage(res.message);
          this.router.navigate(['/']);
        },
        (err) => {
          this.apiCalling = false;
          this.setMessage(err.error.message);
        }
      );
    } else {
      this.apiCalling = true;

      this.photoService.updatePhoto(this.id, this.photoForm.value).subscribe(
        (res) => {
          this.apiCalling = false;
          this.setMessage(res.message);
          this.router.navigate(['/']);
        },
        (err) => {
          this.apiCalling = false;
          this.setMessage(err.error.message);
        }
      );
    }
  }

  setMessage(message) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 1500);
  }

  valueChange() {
    this.total = 0;
    this.descrptionArray.forEach((ele) => {
      this.total += Number(ele.allocation);
    });
  }
}
