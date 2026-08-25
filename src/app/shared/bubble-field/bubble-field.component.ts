import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-bubble-field',
  standalone: true,
  template: `
    <span></span><span></span><span></span><span></span><span></span>
    <span></span><span></span><span></span><span></span><span></span>
  `,
  styles: `
    :host {
      position: absolute;
      inset: 0;
      display: block;
      overflow: hidden;
      pointer-events: none;
      z-index: 0;
    }

    span {
      position: absolute;
      bottom: -6rem;
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.62), rgba(255, 255, 255, 0.08));
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
      animation: bubble-rise 13s linear infinite;
    }

    span:nth-child(1) { left: 6%; width: 1rem; height: 1rem; animation-delay: 0s; animation-duration: 12s; }
    span:nth-child(2) { left: 16%; width: 1.7rem; height: 1.7rem; animation-delay: 2.5s; animation-duration: 15s; }
    span:nth-child(3) { left: 27%; width: 0.8rem; height: 0.8rem; animation-delay: 4s; animation-duration: 11s; }
    span:nth-child(4) { left: 38%; width: 1.1rem; height: 1.1rem; animation-delay: 6.5s; animation-duration: 14s; }
    span:nth-child(5) { left: 49%; width: 1.4rem; height: 1.4rem; animation-delay: 1.2s; animation-duration: 13s; }
    span:nth-child(6) { left: 60%; width: 0.9rem; height: 0.9rem; animation-delay: 8.2s; animation-duration: 12.5s; }
    span:nth-child(7) { left: 71%; width: 2rem; height: 2rem; animation-delay: 5.2s; animation-duration: 16s; }
    span:nth-child(8) { left: 82%; width: 1rem; height: 1rem; animation-delay: 3.1s; animation-duration: 13.5s; }
    span:nth-child(9) { left: 90%; width: 1.5rem; height: 1.5rem; animation-delay: 9.4s; animation-duration: 15.5s; }
    span:nth-child(10) { left: 96%; width: 0.75rem; height: 0.75rem; animation-delay: 0.6s; animation-duration: 11.5s; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BubbleFieldComponent {}
