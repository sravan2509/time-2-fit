import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { RoutineService } from '../services/routine/routine.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UserService } from '../user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UserService1 } from '../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right" ></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      }
    },
    nav: true
  }

  public minDate: Date = new Date();
  public maxDate: Date = new Date();
  public currentDate: Date = new Date();

  public selectedItemsList :[] | undefined;
  public checkedIDs = [] as any;
  changeSelection() {
    this.fetchCheckedIds()
  }



  fetchCheckedIds() {
    this.checkedIDs = []
    this.routines.forEach((value: { isChecked: any; routineid: any; }, index: any) => {
      if (value.isChecked) {
        this.checkedIDs.push(value.routineid);
      }
    });
    console.log(this.checkedIDs);

  }


  public routineList: any[] | any
  public filterTerm: any;
  public user: String = '';





  constructor(private _userService: UserService, private _dataService: DataService, public router: Router, public routineService: RoutineService, public dialog: MatDialog, private userService: UserService1,private snackBar : MatSnackBar) {
  }

  openDialog() {
    this.dialog.open(PopUpComponent);
  }
  public routines: any
  public isDataLoaded = false;



  onSelect(id: any) {
    this.router.navigate(['/dashboard', id]);
  }
  public routineCoverPic = ["../../assets/img.jfif","../../assets/img2.jfif","../../assets/img3.jfif","../../assets/img4.jfif","../../assets/img5.jfif"];
  public random :any
  public src :any
public randomArr : any
  ngOnInit(): void {

    this.randomArr=[]
    this.routineList = this._dataService.userData;
    this.getRoutines();
  }
  getRoutines() {
    this.routineService.getUserRoutine().subscribe(
      (data) => {
        this.routines = data.response;
        console.log("data", data);
        this.isDataLoaded = true;
        this._dataService.routineDetails = this.routines;

        for(let i=0;i<this.routines.length;i++){
          var c=Math.floor(Math.random() * this.routineCoverPic.length)
          this.randomArr.push(c)
        }

      }
      , (err) => {
        console.log(err);
      }
    )
  }

  unsubscribeRoutine(routineid: any, index: any) {
    var postObj = {
      "routineid": routineid,//pass routine id
      "userid": localStorage.getItem('userid')
    }
    this.routines.splice(this.routines.indexOf(index), 1);
    this.routineService.unsubscribeRoutine(postObj['userid'], postObj['routineid']).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    )
  }
  getUserid() {
    let userid: any = localStorage.getItem('userid');
    return (userid.substring(1, userid.length - 1))
  }
  deleteRoutine(id: any, index: any) {
    this.routines.splice(this.routines.indexOf(index), 1);
    this.routineService.deleteRoutine(id).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  createCalendarEvent() {
    var postObj = {
      "userid": localStorage.getItem('userid'),
      "routineids":this.checkedIDs,//pass selected routine ids array
      "date": this.currentDate //pass today date
    }




    this.userService.addCalendarEvent(postObj).subscribe(
      (data) => {
        console.log(data);
        this.snackBar.open('saved succesfully' , 'ok')
      },
      (err) => {
        console.log(err);
        this.snackBar.open('error saving data' , 'ok')
      }
    )
  }
}
