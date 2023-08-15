import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-submitframetest',
  templateUrl: './submitframetest.component.html',
  styleUrls: ['./submitframetest.component.css'],
})
export class SubmitframetestComponent implements OnInit {
  frameForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.frameForm = this.fb.group({
      preview: [''],
      title: [''],
      fileInput: [''],
      fileEntries: this.fb.array([]),
    });
  }
  get fileEntries(): FormArray {
    return this.frameForm.get('fileEntries') as FormArray;
  }
  addFileEntry() {
    const newEntry = this.fb.group({
      answer: ['', [Validators.required]],
      frameFile: [''],
      preview: [''],
    });
    this.fileEntries.push(newEntry);
  }
  removeFileEntry(index: number) {
    this.fileEntries.removeAt(index);
  }
  previewImage(event) {
    const files = event.target.files;
    console.log(files);
  }

  onFileChange(event: any, index: number) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.fileEntries.at(index).patchValue({
        file: file,
        preview: e.target.result,
      });
    };

    reader.readAsDataURL(file);
  }

  submitForm() {
    if (this.frameForm.valid) {
      console.log(this.frameForm.value);
      const formData = new FormData();
      formData.append('id', '0');
      formData.append('data', this.frameForm.value);
      console.log(formData);
      // You can now submit formData using your HTTP service, e.g., HttpClient.
      // For example:
      this.http
        .post(
          'https://localhost:7230/api/Frames/FrameUpload',
          this.frameForm.value
        )
        .subscribe((response) => {
          console.log('Upload successful!', response);
        });

      // Reset the form after submission
      //this.frameForm.reset();
    }
  }
}
