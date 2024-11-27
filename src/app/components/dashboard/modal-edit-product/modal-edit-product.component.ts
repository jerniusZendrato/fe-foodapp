import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';



@Component({
  selector: 'app-modal-edit-product',
  templateUrl: './modal-edit-product.component.html',
  styleUrls: ['./modal-edit-product.component.css']
})
export class ModalEditProductComponent implements OnInit {
  @Input() product: Product | null = null;  // Menerima data produk yang dipilih dari komponen induk
  @Output() close = new EventEmitter<void>();  // Event untuk memberitahukan komponen induk saat modal ditutup

  ngOnInit(): void {
    this.cek_data()
  }
  cek_data():void{
    console.log("ini data udah masuk ke modal",this.product)
  }




}
