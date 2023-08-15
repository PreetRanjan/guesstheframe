import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-frames',
  templateUrl: './post-frames.component.html',
  styleUrls: ['./post-frames.component.css'],
})
export class PostFramesComponent implements OnInit {
  fileUploadForm: FormGroup;
  frames: any[] = [];
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.fileUploadForm = this.formBuilder.group({
      fileInput: [''],
      fileEntries: this.formBuilder.array([]),
    });
  }

  get fileEntries(): FormArray {
    return this.fileUploadForm.get('fileEntries') as FormArray;
  }

  addFileEntry() {
    const newEntry = this.formBuilder.group({
      answer: ['', [Validators.required]],
      filePath: [''],
    });
    this.fileEntries.push(newEntry);
  }

  removeFileEntry(index: number) {
    this.fileEntries.removeAt(index);
  }
  onFileInputChange(event: any) {
    const files = event.target.files;
    console.log('Selected Files: ', files);
    // if (files.length > 0) {
    //   this.fileUploadForm.get('fileInput').setValue(files);}

    // Clear existing entries
    while (this.fileEntries.length !== 0) {
      this.fileEntries.removeAt(0);
    }

    // Populate entries based on selected files
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = () => {
        this.addFileEntry();
        // console.log(reader.result);
        this.frames.push({ title: '', answer: '', content: reader.result });
      };
    }
  }
  getSelectedFileUrl(index: number): any {
    const selectedFile = this.fileUploadForm.get('fileInput').value[index];
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        return reader.result;
      };
      return null;
    }
    return null;
  }
  onSubmit() {
    const formData = new FormData();

    for (let i = 0; i < this.fileEntries.length; i++) {
      const entry = this.fileEntries.at(i);
      // console.log(entry);
      formData.append('files', this.fileUploadForm.get('fileInput').value[i]);
      formData.append('answers', entry.get('answer').value);

      console.log(formData);
    }

    // Now you can perform the HTTP request to upload the files and data
    // Use HttpClient.post() to send the formData to your server
  }
}
