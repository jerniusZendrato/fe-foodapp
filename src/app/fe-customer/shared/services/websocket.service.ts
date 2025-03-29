import { Injectable } from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';

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
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      reconnectDelay: 5000,
      debug: (msg: string) => console.log(msg),
      onConnect: () => console.log('Connected to WebSocket'),
      onStompError: (frame) => console.error('WebSocket Error:', frame),
    });

    this.stompClient.activate();
  }

  subscribeToOrder(orderId: string) {
    if (!this.stompClient || !this.stompClient.connected) {
      console.warn('WebSocket not connected yet. Retrying in 1 second...');
      setTimeout(() => this.subscribeToOrder(orderId), 1000);
      return;
    }

    this.stompClient.subscribe(`/topic/orders/${orderId}`, (message) => {
      this.orderStatusSubject.next(message.body);
    });
  }

  
}
