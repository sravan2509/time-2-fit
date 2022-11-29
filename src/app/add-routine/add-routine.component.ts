import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-routine',
  templateUrl: './add-routine.component.html',
  styleUrls: ['./add-routine.component.css']
})
export class AddRoutineComponent implements OnInit {

  items: FormArray | any;

  constructor(
    public router: Router,
    private fb: FormBuilder,
  ) { }





  routineForm = this.fb.group({
    routineDesigner: [''],
    routineName: [''],
    duration: [''],
    description: [''],
    items: this.fb.array([ this.createItem() ])

  });

  createItem(): FormGroup {
    return this.fb.group({
      name: '',
      description: '',
      price: ''
    });
  }

  addItem(): void {
    this.items = this.routineForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  get userFormGroups () {
    return this.routineForm.get('items') as FormArray
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.routineForm.value)
  }
}
