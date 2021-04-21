import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { DialogData } from 'src/app/models/datos-dialog';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  formBooks: FormGroup;
  subRef$: Subscription;  
  autores: any = [];
  books: any = [];
  displayedColumns: string[] = ['title','description','pageCount', 'excerpt', 'publishDate'];
  dataSource = new MatTableDataSource();
  constructor(  private dataService: DataService,
    private dialog : MatDialog ,
    formBuilder: FormBuilder,
    public datepipe: DatePipe) {
      this.formBooks = formBuilder.group({
        autor: [0 , Validators.min(1)] ,
        fecha_inicio: ['', Validators.required],
        fecha_fin: ['', Validators.required]
      }
      );

      this.dataSource = new MatTableDataSource(this.books);
     }

  ngOnInit(): void {
    this.getAutores();
   
  }
  
  getAutores(){
    const url = environment.urlAPI + 'api/Provider/GetAutores';
    this.subRef$ = this.dataService.get<any>(url)
      .subscribe(res => {
        console.log(res);
        if(res.status == 200){          
          this.autores = res.body.content;
        }
        this.autores = res.body.content;
      }, err => {
        let dialogo: DialogData ={
          status :'warning',
          message : err.error
        };
        this.mostrarDialogo(dialogo);
      });
  }
  getBooks(){
    const url = environment.urlAPI + 'api/Provider/GetBooks';
    console.log(url);
    let fecha_inicio = this.datepipe.transform(this.formBooks.value.fecha_inicio , 'yyyy-MM-dd');
    let fecha_fin = this.datepipe.transform(this.formBooks.value.fecha_fin , 'yyyy-MM-dd');
    this.subRef$ = this.dataService.get<any>(url,{book_id : this.formBooks.value.autor , 
      fecha_inicio : fecha_inicio,
      fecha_fin : fecha_fin})
      .subscribe(res => {
        console.log(res);
        if(res.status == 200){          
          this.books = res.body.content;
          this.dataSource = new MatTableDataSource(this.books);
        }
        this.autores = res.body.content;
      }, err => {
        let dialogo: DialogData ={
          status :'warning',
          message : err.error
        };
        this.mostrarDialogo(dialogo);
      });
  }
  exportToExcel(json : any[], excelName:string):void{
    
  }

  mostrarDialogo(datos :DialogData){
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
