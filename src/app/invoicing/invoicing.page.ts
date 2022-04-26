import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-invoicing',
  templateUrl: './invoicing.page.html',
  styleUrls: ['./invoicing.page.scss'],
})
export class InvoicingPage implements OnInit {

  isLoad: boolean = false;
  private headers = new HttpHeaders(
    {
        'Content-Type':  'application/x-www-form-urlencoded',
        'Accept': '*/*',
    }
  );
  proxy = "https://api-cors-proxy-avaris.herokuapp.com/";
  url = "http://app.metatelecom.com.br/cgi-bin/parla";
  id: any;
  session: any = [];
  Services: any = [];
  Invoices: any = [];

  constructor(private http: HttpClient, private Http: HTTP) { }

  ngOnInit() {
    this.StartSession();
  }

  StartSession(){
    
    const body = new HttpParams()
    .set('function', 'login')
    .set('output_type', 'json')
    .set('company', 'metatelecom')
    .set('Admin', 'api')
    .set('AdminPwd', '123@Meta');
    return this.http.post(this.url, body.toString(), {
      headers: {'Accept': '*/*', 'Content-Type': 'application/x-www-form-urlencoded'},
    }).subscribe(result => {
      console.log(result); 
      this.session = result;
      this.id = this.session.login.response.sessionid;
      console.log(this.id); 
      this.GetServices();
    }); 
  }

  GetServices(){
    const body = new HttpParams()
    .set('function', 'ApiShowTotalServices')
    .set('company', 'metatelecom')
    .set('output_type', 'json')
    .set('servicetype', '20')
    .set('pincarrier', '0')
    .set('sessionid', this.id)
    .set('login', 'api');
    return this.http.post(this.url, body.toString(), {
      headers: {'Accept': '*/*', 'Content-Type': 'application/x-www-form-urlencoded'},
    }).subscribe(result => { 
      this.Services = result;
      console.log(this.Services); 
      this.GetInvoices();
    }); 
  }

  GetInvoices(){
    const body = new HttpParams()
    .set('function', 'getalluserservices')
    .set('company', 'metatelecom')
    .set('output_type', 'json')
    .set('servicetype', '20')
    .set('sessionid', this.id)
    .set('pincarrier', '190')
    .set('login', 'api')
    .set('ini', '1')
    .set('total', '25');
    return this.http.post(this.url, body.toString(), {
      headers: {'Accept': '*/*', 'Content-Type': 'application/x-www-form-urlencoded'},
    }).subscribe(result => { 
      this.Invoices = result;
      console.log(this.Invoices); 
    }); 
  }

  /* {
    "function":"getalluserservices",
    "company":"metatelecom",
    "output_type":"xml",
    "servicetype":20,
    "sessionid":"5454564650",
    "pincarrier":70,
    "login":"31279908000100",
    "ini":1,
    "total":100
 } */

//clientestotais
//dt ativacao mensalidade to calcule!
//simcard descricao

}
