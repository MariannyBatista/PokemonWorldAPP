import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    
  }

  buscar(texto:string){
    
    texto = texto.trim();
    if (texto.length === 0) {
      return;
    }else{
      this.router.navigate(['/buscar', texto])
    }


  }
}
