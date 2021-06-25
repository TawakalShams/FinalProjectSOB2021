import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  MaxLengthValidator,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { DecodedToken } from 'src/app/module/ims/ims.module';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-acident',
  templateUrl: './acident.component.html',
  styleUrls: ['./acident.component.css'],
})
export class AcidentComponent implements OnInit {
  fullName?: string;
  vehcle: any;
  url = '';
  url2 = '';
  url3 = '';

  @ViewChild('autosize') autosize: CdkTextareaAutosize | undefined;

  constructor(
    private service: ServiceService,
    private toastr: ToastrService,
    private router: Router,
    private helper: JwtHelperService,
    private _ngZone: NgZone
  ) {
    const token = localStorage.getItem('token');
    const decodedToken: DecodedToken = helper.decodeToken(token as string);
    this.fullName = decodedToken.fullName;
  }
  ngOnInit(): void {
    this.service.vehiclesPayed().subscribe((data: any) => {
      this.vehcle = data.vehicles;
      // console.log(data);
    });
  }

  selectimage1(event: any) {
    // console.log(event);
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        console.log(event);
      };
    }
  }
  selectimage2(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url2 = event.target.result;
      };
    }
  }
  selectimage3(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url3 = event.target.result;
      };
    }
  }

  form = new FormGroup({
    platenumber: new FormControl('', [Validators.required]),
    typeofacident: new FormControl('', [Validators.required]),
    policeReportNo: new FormControl('', [Validators.required]),
    image1: new FormControl('', [Validators.required]),
    image2: new FormControl('', [Validators.required]),
    image3: new FormControl('', [Validators.required]),
    create_by: new FormControl(),
  });
  onSubmit() {
    console.log(this.form.value);
    // this.service.createAcident(this.form.value).subscribe(
    //   (res) => {
    //     this.toastr.success(' Successfully', 'Successfully');
    //     this.router
    //       .navigateByUrl('/', { skipLocationChange: true })
    //       .then(() => {
    //         this.router.navigate(['acident']);
    //       });
    //   },
    //   (error) => {
    //     this.toastr.error('Platenumber is already verified', 'Error');
    //   }
    // );
  }
}
