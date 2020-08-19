import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './api.service';
import { ToastrService } from 'ngx-toastr';
import { BodyInterface } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  req_form1: FormGroup;
  httpList:any = [];
  httpnumber: number = 404;

  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService) {
    this.req_form1 = fb.group({
      input1: ['', [Validators.required, Validators.maxLength(50)]],
      input2: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(10000),
          // Validators.pattern(/^\d*\.?\d{0,2}$/g)
        ],
      ],
    });
  }

  getHttpData(){
    this.apiService.getDummyHttpData(this.httpnumber).subscribe(
      (data: BodyInterface) => {
        alert(data.message);
        this.httpList.push(data);
        this.httpnumber = null;
      },
      (error) => {
        this.toastr.error(`Error ${error.statusText}`);
        console.log(error);
      }
    );

  }



}
