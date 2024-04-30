import { Component, OnInit } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { UserService } from "../user.service";

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,

  ],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent implements OnInit{
  ngOnInit(){
  }


  constructor(private userService: UserService) { }
  username: string = '';
  password: string = '';
  email: string = ''
  reg_username: string = '';
  reg_password: string = '';

  signUp(){
    if(this.reg_username=='' || this.reg_password=='' || this.email==''){
      alert("Заполните все поля!")
    }
    else{
      const newUser = {
        username: this.reg_username,
        password: this.reg_password,
        email: this.email
      }
      this.userService.addUser(newUser)
        .subscribe((data)=>{
          this.reg_username = ''
          this.reg_password = ''
          this.email = ''
          alert("Аккаунт успешно создан! Теперь используя введенные данные, выполните вход")
        }, (error)=>{
          alert("Пользователь с такими данными уже существует!")
            this.reg_username = ''
            this.reg_password = ''
            this.email = ''
          }
          )
    }

  }

  signIn(){
    if(this.username=='' || this.password==''){
      alert("Заполните все поля!")
    }
    else{
      this.userService.signIn(this.username, this.password)
        .subscribe((data)=>{
          localStorage.setItem("access", data.access)
          localStorage.setItem("refresh", data.refresh)
          localStorage.setItem("logged", 'logged');

        }, (error) => {
        alert(`Введенные данные неверны`);
      });
      this.userService.user_detail(this.username)
        .subscribe((data)=>{
          localStorage.setItem("username", data.username)
          this.username = ''
          this.password = ''
        })
    }
  }

  logout(){
    localStorage.setItem("logged", '');
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
  }

  protected readonly Boolean = Boolean;
  protected readonly localStorage = localStorage;
}
