import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../../../models/user-model";
import {CityModel} from "../../../models/city.model";
import {debounceTime, first, map, Observable, startWith} from "rxjs";
import {CityService} from "../../../service/city.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {getXHRResponse} from "rxjs/internal/ajax/getXHRResponse";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  public idUser: number = null;

  userForm?: FormGroup;
  options: CityModel[] = [];
  public optionCity: Observable<CityModel[]>;

  public hidePassword: boolean = true

  // USER ROLES
  public profilesOptions = [
    {
      id: 1,
      name: "admin",
      label: "Administrador"
    },
    {
      id: 2,
      name: "manager",
      label: "Gerenciador"
    },
    {
      id: 3,
      name: "student",
      label: "Estudante"
    },

  ]

  constructor(
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private userService: UserService,
    private activeRoute: ActivatedRoute
  ){
    this.formatedTextProfile = this.formatedTextProfile.bind(this)
  }

  async ngOnInit() {
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      this.idUser = params.get('id') ? Number(params.get('id')) : null;
    });

    this.userForm = this.formBuilder.group({
      id: null,
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      ...(this.isEdit() && { password: ['', Validators.required] }),
      password: ["", Validators.required],
      phone: ['', Validators.required
        // Validators.pattern('^\\s*(\\d{2}|\\d{0})[-. ]?(\\d{5}|\\d{4})[-. ]?(\\d{4})[-. ]?\\s*$')]
      ],
      birthday: ['', Validators.required],
      codProfile: ['', Validators.required],
      address : this.formBuilder.group({
        id: null,
        number: ['', Validators.required],
        city: ['', Validators.required]
      })
    })

    if (this.isEdit()){
      await this.userService.getUserById(this.idUser)
        .then(x => x.pipe(first())
          .subscribe(x => {
            this.userForm.patchValue(x)
            this.userForm.patchValue({
              codProfile: x.perfis[0]
            })
          })
      )
    }

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

  // CREATE/EDIT USER
  public async submit(){

    let data = this.userForm.getRawValue() as UserModel
    if (!this.isEdit()) {
      await this.userService.createUser(data).then(response => {
        response.subscribe(data => {
          console.log(data)
        })
      })
    } else {
      console.log('opa')
    }
  }

  isEdit(): boolean{
    return this.idUser != null
  }

  getCities(name: string){
    this.cityService.searchCity(name).subscribe((data)=> {
      this.options = data.content
    })
  }

  public formattedTextCity(city:CityModel): string{
    return city != null ? (city.name + " - " + city.state.acronym) : ""
  }

  public formatedTextProfile(codProfile: number): string{
    let selected = codProfile != null ?
      this.profilesOptions.find(value => value.id == codProfile)
      : {label: "Nada selecionado"}

    return selected.label
  }

}
