import { CommonModule, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../../app/service/shared.service';

@Component({
  selector: 'app-mobile-sidebar',
  imports: [CommonModule],
  templateUrl: './mobile-sidebar.component.html',
  styleUrl: './mobile-sidebar.component.css'
})
export class MobileSidebarComponent {
  dropdownOpen = false;
  dropdownHeight = '0px';

  @ViewChild('dropdownList') dropdownList!: ElementRef;

  languages = [
    { code: 'EN', label: 'EN - English', flag: 'https://flagcdn.com/w40/gb.png' },
    { code: 'BR', label: 'BR - Portuguese', flag: 'https://flagcdn.com/w40/br.png' },
    { code: 'ES', label: 'ES - Español', flag: 'https://flagcdn.com/w40/es.png' },
    { code: 'FR', label: 'FR - Français', flag: 'https://flagcdn.com/w40/fr.png' },
    { code: 'DE', label: 'DE - Deutsch', flag: 'https://flagcdn.com/w40/de.png' },
    { code: 'FI', label: 'FI - Finnish', flag: 'https://flagcdn.com/w40/fi.png' },
    { code: 'NO', label: 'NO - Norsk', flag: 'https://flagcdn.com/w40/no.png' },
    { code: 'IT', label: 'IT - Italiano', flag: 'https://flagcdn.com/w40/it.png' },
    { code: 'RU', label: 'RU - Русский', flag: 'https://flagcdn.com/w40/ru.png' },
  ];

  selectedLanguage = this.languages[0];
  isVisible = false;
  private sub!: Subscription;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sub = this.sharedService.mobileSidebarToggle$.subscribe(show => {
      this.isVisible = show;
    });
  }

  closeSidebar() {
    this.sharedService.mobileSidebarClose();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
    setTimeout(() => {
      this.dropdownHeight = this.dropdownOpen
        ? `${this.dropdownList?.nativeElement.scrollHeight}px`
        : '0px';
    }, 10);
  }

  closeDropdown(): void {
    this.dropdownOpen = false;
    this.dropdownHeight = '0px';
  }

  selectLanguage(lang: any): void {
    this.selectedLanguage = lang;
    this.toggleDropdown();
  }
}