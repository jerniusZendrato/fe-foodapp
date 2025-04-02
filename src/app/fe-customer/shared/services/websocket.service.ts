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

  private isConnected = false;
private connectionPromise!: Promise<void>;

constructor() {
  this.connectionPromise = this.connect();
}

private connect(): Promise<void> {
  return new Promise((resolve, reject) => {
    this.stompClient = new Stomp.Client({
      webSocketFactory: () => new SockJS(`${environment.API_URL_WS}/ws`),
      reconnectDelay: 5000,
      debug: (msg: string) => console.log(msg),
      onConnect: () => {
        console.log('Connected to WebSocket');
        this.isConnected = true;
        resolve();
      },
      onStompError: (frame) => {
        console.error('WebSocket Error:', frame);
        reject(frame);
      },
    });

    this.stompClient.activate();
  });
}

async subscribeToStatusOrder(orderId: string, maxRetries = 5): Promise<void> {
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      await this.connectionPromise;
      
      if (this.stompClient.connected) {
        this.stompClient.subscribe(`/topic/orders/${orderId}/status`, (message) => {
          this.orderStatusSubject.next(message.body);
        });
        return;
      }
    } catch (error) {
      console.error('WebSocket connection failed:', error);
    }
    
    retries++;
    if (retries < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  throw new Error(`Failed to subscribe after ${maxRetries} attempts`);
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
}
