import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environment';

@Injectable({providedIn: 'root'})
export class EmailServices {

    private emailApiUrl = "http://localhost:3000/api/send"

    constructor(private http: HttpClient) { }

    sendEmail(to: string, subject: string, plain: string): any {
        const headers = new HttpHeaders({
            'x-api-key': environment.email_api_key
        });
    
        const formData = new FormData();
        formData.append('from', "themovieapp@189bcd6a6dc599f5.maileroo.org");
        formData.append('to', to);
        formData.append('subject', subject);
        formData.append('plain', plain);
    
        return  this.http.post<any>(this.emailApiUrl, formData, { headers });

    }

}