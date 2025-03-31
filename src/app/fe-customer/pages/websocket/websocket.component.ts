import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../shared/services/websocket.service';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.css']
})
export class WebsocketComponent implements OnInit {

  orderStatus: any | null = null;

  constructor(private websocketService: WebsocketService) {}

  ngOnInit() {
    const orderId = '12345'; // Ganti dengan ID order yang sesuai
    this.websocketService.subscribeToOrder();
    this.websocketService.orderStatus$.subscribe(status => {
      this.orderStatus = status;
      // getOrder
    });
  }
}
