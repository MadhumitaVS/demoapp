// src/app/user.model.ts
export class User {
    id: number;
    username: string;
    email: string;
    roles: string[]; // You can define the roles here as an array of strings
  
    constructor(id: number, username: string, email: string, roles: string[]) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.roles = roles;
    }
  }
  