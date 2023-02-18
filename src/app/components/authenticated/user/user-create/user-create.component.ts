import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../../../../models/user-model";
import {AddressModel} from "../../../../models/address.model";
import {CityModel} from "../../../../models/city.model";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  userForm?: FormGroup;
  options: AddressModel[] = [];
  public optionCity: Observable<AddressModel[]>;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address :['', Validators.required]
    })

    this.optionCity = this.userForm.get('address').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    )

  }

  private _filter(value: string): AddressModel[] {
    const filterValue = ''
    return this.options.filter(option => option.city.name.toLowerCase().includes(filterValue));
  }

  public submit(){

    console.log(this.userForm.get('address'))

    let data = this.userForm.getRawValue() as UserModel

    console.log(data)
  }

  public getCities(){

  }
}
