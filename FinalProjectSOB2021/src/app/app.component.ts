import { Component,Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable({providedIn: 'root'})

export class AppComponent {
  title = 'FinalProjectSOB2021';
    constructor(private toastr: ToastrService){

    }
    showToast(){
      this.toastr.success('Success to loggin!', 'Success!');
    }
}
