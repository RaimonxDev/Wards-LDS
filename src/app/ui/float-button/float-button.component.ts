import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-float-button',
  templateUrl: './float-button.component.html',
  styleUrls: ['./float-button.component.scss'],
})
export class FloatButtonComponent implements OnInit {
  showButtonUp = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    const yOffSet = window.pageYOffset;
    const scrollTop = this.document.documentElement.scrollTop;

    this.showButtonUp = (yOffSet || scrollTop) > 500;
  }
  ngOnInit(): void {}

  scrollTop() {
    this.document.documentElement.scrollTop = 0;
  }
}
