import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { settings } from '../envs/environment';

@Component({
  selector: 'app-frame-submission',
  templateUrl: './frame-submission.component.html',
  styleUrls: ['./frame-submission.component.css'],
})
export class FrameSubmissionComponent implements OnInit {
  frameForm: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.frameForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      frames: this.fb.array([]),
    });
  }

  get frames() {
    return this.frameForm.get('frames') as FormArray;
  }

  get Title() {
    return this.frameForm.get('title') as FormControl;
  }

  bulkSelection(event) {
    var files = event.target.files;
    let filesArray = Array.from(files);
    console.log(filesArray);
    filesArray.forEach((file: any, index) => {
      if (file) {
        // this.frames.controls[index].get('image').setValue(file);

        const reader = new FileReader();
        reader.onload = () => {
          this.frames.controls[index].get('imageData').setValue(reader.result);
        };
        reader.readAsDataURL(file);

        this.frames.push(
          this.fb.group({
            answer: [
              '',
              [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(30),
              ],
            ],
            imageData: reader.result,
            image: [file, [Validators.required]], // Store the selected image file here
          })
        );
      }
    });
  }

  addFrame() {
    this.frames.push(
      this.fb.group({
        answer: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
          ],
        ],
        imageData: '',
        image: [null, [Validators.required]], // Store the selected image file here
      })
    );
  }

  answerErrors(index) {
    return (
      this.frames.controls[index].get('answer').touched &&
      this.frames.controls[index].get('answer').errors
    );
  }

  fileErrors(index) {
    return (
      this.frames.controls[index].get('image').touched &&
      this.frames.controls[index].get('image').errors
    );
  }

  AnswerErrors(index) {
    return this.frames.controls[index].get('answer').errors;
  }

  ImageErrors(index) {
    return this.frames.controls[index].get('image').errors;
  }

  onFileChange(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.frames.controls[index].get('image').setValue(file);

      const reader = new FileReader();
      reader.onload = () => {
        this.frames.controls[index].get('imageData').setValue(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
  removeEntry(index) {
    this.frames.removeAt(index);
  }
  submitFrames() {
    this.submitting = true;

    const formData = new FormData();
    formData.append('title', this.frameForm.get('title').value);
    this.frameForm.value.frames.forEach((frame: any) => {
      formData.append('answers', frame.answer);

      if (frame.image) {
        formData.append('images', frame.image, frame.image.name);
      }
    });
    console.log(this.frameForm.value);
    this.http.post(`${settings.url}/api/Survey/PostFrames`, formData).subscribe(
      (response) => {
        console.log('Response from backend:', response);
        this.router.navigate(['/']);
        this.submitting = false;
      },
      (error) => {
        console.error('Error while submitting:', error);
        this.submitting = false;
      }
    );
  }
}
