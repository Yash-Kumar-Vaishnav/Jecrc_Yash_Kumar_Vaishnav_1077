import { Component, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BankStateService } from './services/bank-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentYear = new Date().getFullYear();
  profileOpen = false;
  activeModal: 'privacy' | 'terms' | 'contact' | 'profile' | 'settings' | 'security' | 'notifications' | null = null;

  constructor(public state: BankStateService) {}

  toggleProfile() {
    this.profileOpen = !this.profileOpen;
  }

  openModal(modal: typeof this.activeModal) {
    this.activeModal = modal;
    this.profileOpen = false;
  }

  closeModal() {
    this.activeModal = null;
  }

  onNotifClick(index: number) {
    this.state.markRead(index);
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.activeModal = null;
    this.profileOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-info')) {
      this.profileOpen = false;
    }
  }
}
