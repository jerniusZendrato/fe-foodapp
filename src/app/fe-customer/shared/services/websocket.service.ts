import { Injectable } from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/app/environment/environment';


@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private stompClient!: Stomp.Client;
  private orderStatusSubject = new BehaviorSubject<string | null>(null);
  orderStatus$ = this.orderStatusSubject.asObservable();

  constructor() {
    this.connect();
  }

  private connect() {
    this.stompClient = new Stomp.Client({
      webSocketFactory: () => new SockJS(`${environment.API_URL_WS}/ws`),
      reconnectDelay: 5000,
      debug: (msg: string) => console.log(msg),
      onConnect: () => console.log('Connected to WebSocket'),
      onStompError: (frame) => console.error('WebSocket Error:', frame),
    });

    this.stompClient.activate();
  }

  subscribeToOrder() {
    if (!this.stompClient || !this.stompClient.connected) {
      console.warn('WebSocket not connected yet. Retrying in 1 second...');
      setTimeout(() => this.subscribeToOrder(), 1000);
      return;
    }

    this.stompClient.subscribe(`/topic/orders`, (message) => {
      this.orderStatusSubject.next(message.body);
    });
  }

  subscribeToStatusOrder(orderId: string) {
    if (!this.stompClient || !this.stompClient.connected) {
      console.warn('WebSocket not connected yet. Retrying in 1 second...');
      setTimeout(() => this.subscribeToStatusOrder(orderId), 1000);
      return;
    }

    this.stompClient.subscribe(`/topic/orders/${orderId}/status`, (message) => {
      this.orderStatusSubject.next(message.body);
    });
  }

  
}
