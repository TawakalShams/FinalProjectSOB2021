import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { DecodedToken } from 'src/app/module/ims/ims.module';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-add-car-model',
  templateUrl: './add-car-model.component.html',
  styleUrls: ['./add-car-model.component.css'],
})
export class AddCarModelComponent implements OnInit {
  fullName: any;
  submitted = false;

  constructor(
    private service: ServiceService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private helper: JwtHelperService,
    private toastr: ToastrService
  ) {
    const token = localStorage.getItem('token');
    const decodedToken: DecodedToken = helper.decodeToken(token as string);
    this.fullName = decodedToken.fullName;
  }

  ngOnInit(): void {}
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    create_by: new FormControl(),
  });

  AddModel() {
    this.service.createCarModel(this.form.value).subscribe(
      (res) => {
        this.submitted = true;
        this.toastr.success('Successfully to Create', 'Successfully');
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['carModel']);
          });
      },
      (error) => {
        console.log(error);
        this.toastr.error('Not Successfully to Create', 'Error');
      }
    );
  }
}
