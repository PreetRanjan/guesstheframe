import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-multiframe',
  templateUrl: './multiframe.component.html',
  styleUrls: ['./multiframe.component.css'],
})
export class MultiframeComponent implements OnInit {
  fileUploadForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.fileUploadForm = this.fb.group({
      files: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    // Initialize the form with an empty file control
    this.addFileControl();
  }

  get files(): FormArray {
    return this.fileUploadForm.get('files') as FormArray;
  }

  handleFileSelect(event: any): void {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.addFileControl(files[i]);
    }
  }

  addFileControl(file?: File): void {
    const control = this.fb.control(file || null);
    this.files.push(control);
  }

  uploadFiles(): void {
    const formData = new FormData();

    for (const fileControl of this.files.controls) {
      const file = fileControl.value;
      if (file) {
        formData.append('files', file);
      }
    }

    // Replace 'YOUR_BACKEND_URL' with the actual backend URL
    this.http.post('YOUR_BACKEND_URL', formData).subscribe(
      (response) => {
        console.log('Files uploaded successfully:', response);
      },
      (error) => {
        console.error('Error uploading files:', error);
      }
    );
  }
}
