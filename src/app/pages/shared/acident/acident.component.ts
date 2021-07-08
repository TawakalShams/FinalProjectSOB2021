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
  url = '';
  url2 = '';
  url3 = '';
  // platenumber: any;

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
    // console.log(event);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        // console.log(event);
      };
    }
  }
  selectimage2(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url2 = event.target.result;
      };
    }
  }
  selectimage3(event: any) {
    if (event.target.files && event.target.files[0]) {
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
    image1: new FormControl('', [Validators.required]),
    image2: new FormControl('', [Validators.required]),
    image3: new FormControl('', [Validators.required]),
    create_by: new FormControl(),
  });
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option: any) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  onSubmit() {
    this.form.controls.platenumber.setValue(this.platenumber.value);
    console.log(this.form.value);

    this.service.createAcident(this.form.value).subscribe(
      (res) => {
        this.toastr.success(' Successfully', 'Successfully');
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['accident']);
          });
      },
      (error) => {
        this.toastr.error('Platenumber is already verified', 'Error');
      }
    );
  }
}
