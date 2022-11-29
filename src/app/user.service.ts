import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

public users: Partial<{firstname: string | null | undefined; email: string | null | undefined;password: string | null | undefined;phoneno: string | null | undefined;dob: string | null | undefined;gender: string | null | undefined;street: string | null | undefined;city: string | null | undefined;state: string | null | undefined;zip: string | null | undefined;pic: string | null | undefined}>[] = [
  {"firstname" : "Hari Sai Jogesh ","email" : "hari@gmail.com","password": "Test@123","phoneno":"4564564565","dob":"01/01/2000", "gender":"Male", "street":"random street","city":"Atlanta","state":"Georgia","zip":"45698","pic":"data:image/jpeg;base64,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",},
  {"firstname" : "Lakshman Reddy",  "email" : "lakshmi@gmail.com","password": "Test@123","phoneno":"4564564565","dob":"01/01/2000", "gender":"Male",   "street":"random street","city":"Atlanta","state":"Georgia","zip":"45698","pic":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYH_VDaGfxQ_cPhkgDPyoxXJgnnKHzEw7kdg&usqp=CAU"},
  {"firstname" : "Ananya",          "email" : "ananya@gmail.com","password": "Test@123","phoneno":"4564564565","dob":"01/01/2000", "gender":"female",   "street":"random street","city":"Atlanta","state":"Georgia","zip":"45698","pic":"data:image/jpeg;base64,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"},
  {"firstname" : "kalpana",         "email" : "kalpana@gmail.com","password": "Test@123","phoneno":"4564564565","dob":"01/01/2000", "gender":"female",   "street":"random street","city":"Atlanta","state":"Georgia","zip":"45698","pic":"data:image/jpeg;base64,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"}
]

public currentUser: Partial<{firstname: string | null | undefined; email: string | null | undefined;password: string | null | undefined;phoneno: string | null | undefined;dob: string | null | undefined;gender: string | null | undefined;street: string | null | undefined;city: string | null | undefined;state: string | null | undefined;zip: string | null | undefined;pic: string | null | undefined}> = {};

currentuser: string | null | undefined ='';


coverPic: string | null | undefined=''

  constructor() { }
}