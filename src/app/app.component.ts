import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Person} from "./core/models/person";
import {PersonService} from "./shared/services/personService/person.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  search: string = ""
  formGroupPerson!: FormGroup
  personService: PersonService = inject(PersonService)
  person$: Observable<Person[]> = this.personService.getAllPerson()

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.formGroupPerson = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    })
  }


  searchPerson(value: string) {

  }

  onSubmit() {
    console.log(this.formGroupPerson.value)
    if(this.formGroupPerson.valid){
      this.personService.postPerson(this.formGroupPerson.value).subscribe({
        next: value => {
          this.person$ = this.personService.getAllPerson()
          this.formGroupPerson.reset()
        }
      })
    }

  }
}
