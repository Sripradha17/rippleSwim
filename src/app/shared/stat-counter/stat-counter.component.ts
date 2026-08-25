import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, Input, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';

@Component({
  selector: 'app-stat-counter',
  standalone: true,
  template: `
    <span class="stat-counter-value">{{ displayValue() }}</span>
    <span class="stat-counter-label">{{ label }}</span>
  `,
  styles: `
    :host {
      display: block;
    }

    .stat-counter-value {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatCounterComponent implements OnInit {
  @Input({ required: true }) value = '';
  @Input({ required: true }) label = '';

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  readonly displayValue = signal('');

  ngOnInit(): void {
    const target = Number(this.value);
    const isCountable = this.value.trim() !== '' && Number.isFinite(target) && Number.isInteger(target);

    if (!isCountable || !isPlatformBrowser(this.platformId)) {
      this.displayValue.set(this.value);
      return;
    }

    this.displayValue.set('0'.padStart(this.value.length, '0'));

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        this.animateCountTo(target);
        observer.disconnect();
      }
    }, { threshold: 0.4 });

    observer.observe(this.elementRef.nativeElement);
    this.destroyRef.onDestroy(() => observer.disconnect());
  }

  private animateCountTo(target: number): void {
    const duration = 1200;
    const digits = this.value.length;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.displayValue.set(Math.round(eased * target).toString().padStart(digits, '0'));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }
}
