import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/models/ilogin';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { SecurityService } from 'src/app/services/security.service';
import { ErrorStateMatcher1 } from '../error-state-matcher1';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { DialogData } from '../../models/datos-dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  formLogin: FormGroup;
  subRef$: Subscription;
  matcher = new ErrorStateMatcher1();
  scrHeight: any;
  scrWidth: any;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    console.log(this.scrHeight, this.scrWidth);
  }
  
  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private securityService: SecurityService,
    private dialog : MatDialog
  ) {
    this.getScreenSize();
    this.securityService.LogOff();

    this.formLogin = formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  Login() {
    const usuarioLogin: ILogin = {
      userName: this.formLogin.value.usuario,
      password: this.formLogin.value.password,
    };

    const url = environment.urlAPI + 'api/Login/login';
    this.subRef$ = this.dataService.post<any>(url,
      usuarioLogin)
      .subscribe(res => {
      
        if(res.body != null){
        const token = res.body.token;      
        this.securityService.SetAuthData(token);
        this.router.navigate(['/home']);
        }
        else{
          let dialogo: DialogData ={
            status :'warning',
            message : 'usuario no encontrado'
          };
          this.mostrarDialogo(dialogo);
        }
      }, err => {
        let mensaje = err.error;
        if(err.status ==401){
          mensaje = "Usuario no autorizado";
        }
        let dialogo: DialogData ={
          status :'warning',
          message : mensaje
        };
        
        this.mostrarDialogo(dialogo);
      });
  }
  mostrarDialogo(datos :DialogData){
    console.log(datos);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: datos
    });
  }

  hasError(nombreControl: string, validacion: string) {
    const control = this.formLogin.get(nombreControl);
    return control.hasError(validacion);
  }

  ngOnDestroy() {
    if (this.subRef$) {
      this.subRef$.unsubscribe();
    }
  }

}
