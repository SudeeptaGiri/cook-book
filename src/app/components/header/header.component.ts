import { JsonpInterceptor } from '@angular/common/http';
import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isMenuOpen = false;
  @Output() searchChanged = new EventEmitter<string>();
  searchText: string = '';
  isDropdownOpen = false;
  isAuthenticated = false;
  currentUser:any = {};
  constructor(private router: Router) {}
  ngOnInit() {
    const user = sessionStorage.getItem('currentUser');
    if(user){
      console.log(JSON.parse(user));
      this.currentUser = JSON.parse(user);
      this.isAuthenticated = true;
    }else{
      this.isAuthenticated = false;
    }
  } 
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  login() {
    console.log('Login button clicked');
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }

  onSearchChange() {
    this.searchChanged.emit(this.searchText);
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  logout() {
    sessionStorage.clear();
    this.isAuthenticated = false;
    this.currentUser = null;
    this.router.navigate(['/login']);
  }
  
}
