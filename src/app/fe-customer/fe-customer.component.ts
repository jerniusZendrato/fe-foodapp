import { Component } from '@angular/core';

@Component({
  selector: 'app-fe-customer',
  styles: [
    `
      :host {
        height: 100vh;
        overflow: hidden;
      }

      .outer-container {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      .inner-container {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        padding-right: 17px; /* Compensate for the scrollbar width */
        box-sizing: content-box; /* So the width is not affected by padding */
      }

      .content-wrapper {
        display: flex;
        justify-content: center;
        min-height: 100%;
      }

      .content {
        max-width: 500px;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
      }

      .router-outlet-wrapper {
        box-sizing: border-box;
        flex: 1;
      }
    `,
  ],
  template: `
    <div class="outer-container">
      <div class="inner-container">
        <div class="content-wrapper">
          <div class="content">
            <div class="router-outlet-wrapper">
              <router-outlet></router-outlet>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class FeCustomerComponent {}
