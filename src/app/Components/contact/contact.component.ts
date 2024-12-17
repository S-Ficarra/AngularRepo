import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailServices } from '../../core/services/email.service';

@Component({
  selector: 'contact',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent{

    emailSent: boolean = false;
    receiver: string = '';
    subject: string = '';
    message: string = '';


    constructor(
        private contactService: EmailServices
    ) {}    

    onSubmit(event: Event) {
        event.preventDefault();
        this.sendEmail(this.receiver, this.subject, this.message);
      }

    sendEmail(to: string, subject: string, plain: string): void {
        this.contactService.sendEmail(to, subject, plain).subscribe({
            next: (data: any) => {
                this.emailSent = data.success
            },
            error: (err: any) => {
                console.error("Erreur lors de l'envoi de l'email", err);
            }
        })
    }



}
