import { Component } from '@angular/core';
import { PrescriptionService } from 'src/app/services/prescription.service';
@Component({
  selector: 'app-upload-prescription',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  selectedFile: File | null = null;
  loading = false;
  message = '';
  error = '';

  constructor(private service: PrescriptionService) {}

 // file changes on the time
  onFileChange(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.name.endsWith('.txt')) {
      this.error = 'Only .txt files allowed';
      this.selectedFile = null;
      return;
    }

    this.selectedFile = file;
    this.error = '';
  }

  //uploading the file
  upload() {
    if (!this.selectedFile) {
      this.error = 'Please select a prescription file';
      return;
    }

    this.loading = true;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.service.uploadPrescription(formData).subscribe({
      next: () => {
        this.message = 'Prescription uploaded successfully';
        this.loading = false;
        this.selectedFile = null;
      },
      error: () => {
        this.error = 'Upload failed';
        this.loading = false;
      }
    });
  }
}