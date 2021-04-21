import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DialogData } from 'src/app/models/datos-dialog';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.css']
})
export class SyncComponent implements OnInit {
  subRef$: Subscription;  
  cargando : boolean = false;
  scrHeight: any;
  scrWidth: any;

  constructor(private dataService: DataService ,private dialog : MatDialog) { }
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    console.log(this.scrHeight, this.scrWidth);
  }

  ngOnInit(): void {
  }
  sincronizar(){
    const url = environment.urlAPI + 'api/Provider/PostSync';
    this.cargando =true;
    this.subRef$ = this.dataService.post<any>(url,'').subscribe(res =>{
      console.log(res);
      this.cargando = false;
      let dialogo: DialogData ={
        status :'success',
        message : 'Sincronizado correctamente!'
      };
      this.mostrarDialogo(dialogo);
    },err=>{
      this.cargando = false;
      let dialogo: DialogData ={
        status :'warning',
        message : err.Mensaje
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


  ngOnDestroy() {
    if (this.subRef$) {
      this.subRef$.unsubscribe();
    }
  }
}
