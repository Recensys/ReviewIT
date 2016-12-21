
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WhoAreYouService } from './who-are-you.service'
import { UserDetailsDTO } from '../model/models'
import { MessageService, UserService } from '../core'

@Component({
  selector: 'app-who-are-you',
  templateUrl: './who-are-you.component.html',
  styleUrls: ['./who-are-you.component.css']
})
export class WhoAreYouComponent implements OnInit {

  model: UserDetailsDTO[]
  obs: any;
  newUser = new UserDetailsDTO();

  constructor(
    private service: WhoAreYouService,
    private msg: MessageService,
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit() {
    this.obs = this.service.get();
    this.obs.subscribe(
      dto => this.model = dto,
      error => this.msg.addError(error)
    )
  }

  create(){
    this.service.create(this.newUser).subscribe(
      dto => {
        this.model.push(dto);
        this.newUser = new UserDetailsDTO();
      },
      error => this.msg.addError(error)
    )
  }

  selectUser(user: UserDetailsDTO){
    this.userService.logIn(user);
    this.router.navigate(['home']);
  }
  
}
