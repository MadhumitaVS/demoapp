import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
    <aside>
      <ul>
        <li><a routerLink="/dashboard">Dashboard</a></li>
        <li><a routerLink="/tasks">Tasks</a></li> </ul>
    </aside>
  `,
  styles: [`
    aside {
      /* Style your sidebar */
      width: 200px; /* Example */
      background-color: #eee; /* Example */
    }
  `]
})
export class SidebarComponent {

}