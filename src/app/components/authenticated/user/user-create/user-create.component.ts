import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../../../../models/user-model";
import {CityModel} from "../../../../models/city.model";
import {debounceTime, map, Observable, startWith} from "rxjs";
import {CityService} from "../../../../service/city.service";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  userForm?: FormGroup;
  options: CityModel[] = [];
  public optionCity: Observable<CityModel[]>;

  constructor(
    private formBuilder: FormBuilder,
    private cityService: CityService
  ) { }

  async ngOnInit() {

    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      birthday: ['', Validators.required],
      address : new FormGroup({
        number: new FormControl(Validators.required),
        city: new FormControl(CityModel, Validators.required)
      })
    })

    this.optionCity = this.userForm.get('address.city').valueChanges.pipe(
      startWith(''),
      debounceTime(600),
      map(value => this.filter(value || ''))
    )

  }

  private filter(value: string): CityModel[] {

    this.getCities(value)

    const filterValue = value
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  public submit(){

    // console.log(this.userForm.get('address'))

    let data = this.userForm.getRawValue() as UserModel

    console.log(data)
  }

  getCities(name: string){
    this.cityService.searchCity(name).subscribe((data)=> {
      this.options = data.content
    })
  }

  public formatedTextCity(city:CityModel): string{
    return (city.name + " - " + city.state.acronym) || ""
  }
}
