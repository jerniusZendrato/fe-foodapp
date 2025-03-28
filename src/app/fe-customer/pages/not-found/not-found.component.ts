import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {

  openGoogleLens() {
    window.location.href = 'https://search.app.goo.gl/?ofl=https%3A%2F%2Flens.google&al=googleapp%3A%2F%2Flens%3Flens_data%3DKBE&apn=com.google.android.googlequicksearchbox&amv=301204913&isi=284815942&ius=googleapp&ibi=com.google.GoogleMobile&link=https%3A%2F%2Fgoo.gl%2Fiosgoogleapp%2Fdefault%3Furl%3Dgoogleapp%253A%252F%252Flens%253Fmin-version%253D180%2526lens_data%253DKBE&ifl=https%3A%2F%2Fapps.apple.com%2Fus%2Fapp%2Fgoogle%2Fid284815942%3Fppid%3D1ac8cc35-d99c-4a1d-b909-321c8968cc74%26pt%3D9008%26mt%3D8%26ct%3D4815459-oo-lens-isb-bar-lens-cam%26UTM_campaign%3Dgoogle_search_mweb&efr=1&ct=4815459-oo-lens-isb-bar-lens-cam&utm_campaign=4815459-oo-lens-isb-bar-lens-cam&utm_source=google_search_mweb&utm_medium=owned&pt=9008&mt=8';
  }

}
