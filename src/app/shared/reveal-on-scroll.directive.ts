import { isPlatformBrowser } from '@angular/common';
import { DestroyRef, Directive, ElementRef, OnInit, PLATFORM_ID, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealOnScrollDirective implements OnInit {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.renderer.addClass(this.elementRef.nativeElement, 'is-visible');
      return;
    }

    const reveal = () => this.renderer.addClass(this.elementRef.nativeElement, 'is-visible');

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      }
    }, { threshold: 0.1, rootMargin: '0px 0px 180px 0px' });

    observer.observe(this.elementRef.nativeElement);

    // Backstop: content must never stay invisible indefinitely if the
    // observer never fires (e.g. an oversized element, a hydration edge
    // case, or a browser quirk) - force it visible after a short delay.
    const fallbackTimer = setTimeout(() => {
      reveal();
      observer.disconnect();
    }, 2500);

    this.destroyRef.onDestroy(() => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    });
  }
}
