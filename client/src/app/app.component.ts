import { Component } from '@angular/core';
import { IShow } from './app.interface';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles.css';

type navItem = {
    text: string;
    href: string;
}

@Component({
    selector: 'app',
    template: require('./app.component.html'),
})

export class AppComponent {

    private navItems: navItem[];
    private baseUrl = 'https://api.themoviedb.org';
    private navSearchValue = "star";
    private searchTerm = "";
 
    constructor(private router: Router,
        private auth: AuthService) {

        this.navItems = [
            {
                text: 'Search Shows',
                href: '/search'
            }
        ];

        auth.handleAuthentication(); 
        auth.getProfile((err, profile) => {
            auth.userProfile = profile; 
            console.log(auth.userProfile);
        });
    };

    private update(value: string) {
        this.router.navigate(['/search'], { queryParams: { searchTerm: value } });
    }
 
}

