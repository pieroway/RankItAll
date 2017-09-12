import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { TvDetailsComponent } from './tvdetails/tvdetails.component'; 

const appRoutes: Routes =
    [
        { path: '/', redirectTo: '/search', pathMatch: 'full' },
        { path: '/search', component: SearchComponent, pathMatch: 'full'  },
        { path: '/show/:id', component: TvDetailsComponent, pathMatch: 'full'  }
    ];

export const routing = RouterModule.forRoot(appRoutes);
