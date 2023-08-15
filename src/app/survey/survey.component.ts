import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class SurveyComponent implements OnInit {
  surveyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.surveyForm = this.fb.group({
      title: '',
      frames: this.fb.array([]),
    });
  }

  ngOnInit(): void {}

  get frames(): FormArray {
    return this.surveyForm.get('frames') as FormArray;
  }

  addFrame(): void {
    const frame = this.fb.group({
      answer: '',
      file: null,
      fileType: '',
      rawFile: null,
      imagePreview: '', // Add a property for image preview
    });
    this.frames.push(frame);
  }
  removeFileEntry(index: number) {
    this.frames.removeAt(index);
  }
  // ... (other methods)

  // Method to handle file selection and image preview
  onFileChange(event: Event, frameIndex: number): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.frames.at(frameIndex).get('rawFile')?.setValue(file);
        this.frames.at(frameIndex).get('imagePreview')?.setValue(reader.result);
        this.frames.at(frameIndex).get('fileType')?.setValue(file.type);
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('title', this.surveyForm.get('title').value);
    this.frames.controls.forEach((frame: FormGroup) => {
      formData.append('answers', frame.get('answer').value);
      formData.append('fileTypes', frame.get('fileType').value);

      const parts = frame.get('file').value.split('/');
      const fileName = parts.pop();

      formData.append('fileNames', fileName);

      const file = frame.get('file').value;
      console.log(file, frame.get('file'));

      console.log('Raw File: ', frame.get('rawFile'));

      const blob = new Blob([frame.get('imagePreview').value.split(',')[1]], {
        type: frame.get('fileType').value,
      });
      formData.append('frames', blob, fileName);
    });

    console.log(formData);
    this.http.post('https://localhost:7230/api/Survey/', formData).subscribe(
      (response) => {
        console.log('Success', response);
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }
}
