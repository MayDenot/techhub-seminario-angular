import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsDataService } from '../products-data.service';

@Component({
  selector: 'app-upload-form',
  standalone: false,
  templateUrl: './upload-form.component.html',
  styleUrl: './upload-form.component.scss',
})
export class UploadFormComponent {
  private formBuilder = inject(FormBuilder);
  formUpload : FormGroup;

  constructor(public productServices : ProductsDataService) {
    this.formUpload = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(40)]],
      price: [0, [Validators.required]],
      stock: [0, [Validators.required, Validators.min(0)]],
      image: [''],
      clearance: [false],
    });
  }

  onSubmit() {
    this.productServices.postProduct(this.formUpload.value).subscribe(
      data => {
        this.formUpload.reset();
      }
    );
  }
}
