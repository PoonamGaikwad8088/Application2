import { Component, EventEmitter, Output } from '@angular/core';
import { MatTab, MatFormFieldControl } from '@angular/material'
import { Observable, from } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import  *  as  data  from  './../assets/mockdata/data.json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'survey-app';
  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  currentSlideNumber = <any>0;
  index = <any>0;
  @Output() slideNumber: EventEmitter<any> = new EventEmitter();
  surveyData:any = data;
  surveyElements: any = [];
  steps=<any>[];
  Field:any;
  Type:any;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log(this.steps.length);
    this.steps = this.surveyData.default;
    this.surveyElements = this.steps.Controls;
    
    console.log(this.steps.length)
    this.createForm();
    this.setChangeValidate()
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'name': [null, Validators.required],
      'lname': [null, Validators.required],
      'description': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      'validate': '',
      'books':'',
      'tv':'',
      'videoGame':''
    });
  }

  setChangeValidate() {
    this.formGroup.get('validate').valueChanges.subscribe(
      (validate) => {
        if (validate == '1') {
          this.formGroup.get('name').setValidators([Validators.required, Validators.minLength(3)]);
          this.formGroup.get('lname').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = "You need to specify at least 3 characters";
        } else {
          this.formGroup.get('name').setValidators(Validators.required);
          this.formGroup.get('lname').setValidators(Validators.required);
        }
        this.formGroup.get('name').updateValueAndValidity();
        this.formGroup.get('lname').updateValueAndValidity();
      }
    )
  }

  get name() {
    return this.formGroup.get('name') as FormControl
  }

  get lname() {
    return this.formGroup.get('lname') as FormControl
  }
  onSubmit(post) {
    
    console.log(this.formGroup.value)
  }

  goToNextSlide(){
    this.currentSlideNumber += 1;
    this.index += 1;
    console.log(this.index)
    if(this.currentSlideNumber == 8){
      this.slideNumber.emit(this.currentSlideNumber);
      }
    }

}
