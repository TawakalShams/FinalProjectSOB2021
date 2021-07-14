import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
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
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-acident',
  templateUrl: './acident.component.html',
  styleUrls: ['./acident.component.css'],
})
export class AcidentComponent implements OnInit {
  filteredOptions: Observable<string[]> | undefined;
  options: string[] = [];
  fullName?: string;
  vehcle: any;
  url: any[] = [];
  url2 = '';
  url3 = '';
  image1: any;
  image2: any;
  image3: any;
  images: any[] = [];

  @ViewChild('autosize') autosize: CdkTextareaAutosize | undefined;

  constructor(
    private service: ServiceService,
    private toastr: ToastrService,
    private router: Router,
    private helper: JwtHelperService,
    private _ngZone: NgZone,
    private formBuilder: FormBuilder
  ) {
    const token = localStorage.getItem('token');
    const decodedToken: DecodedToken = helper.decodeToken(token as string);
    this.fullName = decodedToken.fullName;
  }
  ngOnInit(): void {
    this.filteredOptions = this.platenumber.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value))
    );

    this.service.viewInsuarance().subscribe((data: any) => {
      // this.vehcle = data;
      // console.log(data);
      this.options = data.map((item: any) => item.platenumber);
      // console.log('option' + this.options);
    });
  }

  selectimage1(event: any) {
    if (event.target.files && event.target.files[0]) {
      const imageFile = event.target.files[0];
      this.images.push(imageFile);

      // const reader = new FileReader();
      // reader.onload = () => this.url.push(reader.result);
      // reader.readAsDataURL(imageFile);

      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url.push(event.target.result);
      };
    }
    // this.image1 = event.target.files[0];
    // var reader = new FileReader();
    // reader.readAsDataURL(event.target.files[0]);
    // reader.onload = (event: any) => {
    //   this.url = event.target.result;
    // };
  }

  selectimage2(event: any) {
    const image2 = (this.image2 = event.target.files[0]);
    if (image2) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url2 = event.target.result;
      };
    }
  }
  selectimage3(event: any) {
    const imag3 = (this.image3 = event.target.files[0]);
    // console.log(this.image3);
    if (imag3) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url3 = event.target.result;
      };
    }
  }
  platenumber = new FormControl('', [Validators.required]);

  form = new FormGroup({
    platenumber: new FormControl(''),
    typeofacident: new FormControl('', [Validators.required]),
    policeReportNo: new FormControl('', [Validators.required]),
    image1: new FormControl(''),
    image2: new FormControl(''),
    image3: new FormControl(''),
    create_by: new FormControl(),
  });

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option: any) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  onSubmit() {
    // this.form.controls.platenumber.setValue(this.platenumber.value);

    const values = this.form.value;
    // console.log(this.images);

    const formData = new FormData();
    this.images.forEach((image) => {
      formData.append('files[]', image);
    });

    formData.append('platenumber', this.platenumber.value);
    formData.append('typeofacident', values.typeofacident);
    formData.append('policeReportNo', values.policeReportNo);
    formData.append('create_by', values.create_by);

    this.service.createAcident(formData).subscribe(
      (res) => {
        this.toastr.success(' Successfully', 'Successfully');
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['accident']);
          });
        // console.log(res);
      },
      (error) => {
        this.toastr.error('Platenumber is already verified', 'Error');
      }
    );
  }
}
