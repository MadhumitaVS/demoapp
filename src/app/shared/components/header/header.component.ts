import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <nav>
        <a routerLink="/">Home</a>
        <a routerLink="/dashboard">Dashboard</a>
        <a routerLink="/tasks">Tasks</a> <div class="user-profile"></div>
      </nav>
    </header>
  `,
  styles: [`
    /* ... styles ... */
  `]
})
export class HeaderComponent {

}