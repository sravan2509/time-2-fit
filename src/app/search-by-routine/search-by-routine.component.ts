import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { RoutineService } from '../services/routine/routine.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UserService1 } from '../services/user/user.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SearchPageService } from '../services/search-page/search-page.service';

@Component({
  selector: 'app-search-by-routine',
  templateUrl: './search-by-routine.component.html',
  styleUrls: ['./search-by-routine.component.css']
})
export class SearchByRoutineComponent implements OnInit {

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


  public routines: any[] | undefined
  public friendsData: any[] | undefined
  public filterTerm: any;

  constructor(private userService: UserService1, public _dataService: DataService, public router: Router, public route: ActivatedRoute, public routineService: RoutineService, public searchService: SearchPageService) { }

  public isTrue = false;
  public isRoutine = false;
  public friendId: any;
  public friendFilter: any;
  public allRoutines: any[] | undefined
  onSelect(id: any) {
    this.router.navigate(['/routine-details', id])
  }

  friendDetails(friend: any) {
    this.isTrue = true
    console.log(friend);
    // this.router.navigate(['/friendData' , friend])
    window.location.replace(`http://localhost:4200/friendData/${friend}`)
  }


  ngOnInit(): void {
    this.routines = this._dataService.userData
    this.friendsData = this._dataService.friendsDetails
    if (this.router.url != "/search-page") {
      this.friendId = this.route.snapshot.paramMap.get('id');
      this.friendId = this.friendId - 1
      this.isTrue = true
    }
    this.getRoutines();
    this.getFriends();

  }
  getRoutines() {
    this.routineService.getRoutineSuggestions().subscribe(
      (data) => {
        this.allRoutines = data['response']
      }
      , (err) => {
        console.log(err);
      }
    )
  }

  checkEligibility(routineObj: any) {
    return routineObj['userids'].indexOf(JSON.stringify(localStorage.getItem('userid')));
  }

  subscribeRoutine(id: any) {
    var postObj = {
      'userid': localStorage.getItem('userid'),
      'routineid': id//pass routine id
    }
    this.routineService.subscribeRoutine(postObj).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/dashboard']);
      }
      , (err) => {
        console.log(err);
      }
    )
  }

  public allFriends: any[] | undefined
  getFriends() {
    this.userService.getUsers().subscribe(
      (data) => {
        console.log("***********user suggestion*********\n", data.response);
        this.generateRoutineDetailsOfUser(data.response[0]);
        this.allFriends = data.response;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  public friendRoutines: any[] | undefined
  public friendName: any
  public friendDescription: any
  public friendData: any
  generateRoutineDetailsOfUser(userObj: any) {
    var arr = []
    console.log(userObj)
    for (let id of userObj['routineids'])
      arr.push(this.getRoutineDetails(id));
    Promise.all(arr).then((resp) => {
      console.log("current user routines", resp);
      this.friendData = resp
      console.log(this.friendData);

      this.friendRoutines = resp
      this.friendName = userObj.firstname
      this.friendDescription = userObj.description
      this.isTrue = true

    }).catch((err) => {
      console.log(err)
    })
  }




  getRoutineDetails(routineid: any) {
    return new Promise((resolve, reject) => {
      this.routineService.getRoutineDetails(routineid).subscribe(
        (data) => {
          resolve(data.response);
        },
        (err) => {
          console.log(err);
        }
      )
    })
  }

}

