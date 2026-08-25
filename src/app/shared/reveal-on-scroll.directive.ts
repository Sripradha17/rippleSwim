import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, OnInit, PLATFORM_ID, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealOnScrollDirective implements OnInit {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.renderer.addClass(this.elementRef.nativeElement, 'is-visible');
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          this.renderer.addClass(this.elementRef.nativeElement, 'is-visible');
          observer.disconnect();
        }
      }
    }, { threshold: 0.1, rootMargin: '0px 0px 180px 0px' });

    observer.observe(this.elementRef.nativeElement);
  }
}
