import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile-component',
  standalone: false,
  templateUrl: './profile-component.component.html',
  styleUrl: './profile-component.component.css'
})
export class ProfileComponentComponent {
  currentUser: any = null;
  activeTab: string = 'profile';
  isEditing: boolean = false;
  profileForm!: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    const userData = sessionStorage.getItem('currentUser') || "{}";
    const userId = JSON.parse(userData)?.id;
    if (userId) {
      this.http.get(`http://localhost:3000/users/${userId}`).subscribe({
        next: (user: any) => {
          this.currentUser = user;
          this.initForm(user);
        },
        error: (err) => {
          console.error('Failed to load user info', err);
        }
      });
    }
  }

  initForm(user: any) {
    this.profileForm = this.fb.group({
      firstName: [user.firstName, Validators.required],
      lastName: [user.lastName, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
      country: [user.country, Validators.required],
      region: [user.region, Validators.required]
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveChanges(): void {
    if (this.profileForm.valid && this.currentUser?.id) {
      const updatedUser = {
        ...this.currentUser,
        ...this.profileForm.value
      };

      this.http.put(`http://localhost:3000/users/${this.currentUser.id}`, updatedUser).subscribe({
        next: (res: any) => {
          this.currentUser = res;
          sessionStorage.setItem('currentUser', JSON.stringify(res));
          this.isEditing = false;
        },
        error: (err) => {
          console.error('Failed to update profile', err);
        }
      });
    }
  }
}