import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, PLATFORM_ID, inject, signal } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <a class="skip-link" href="#main-content">Skip to content</a>
    @if (showLoader()) {
      <div class="app-loader" aria-hidden="true">
        <div class="app-loader-stage">
          <div class="app-loader-copy">
            <p class="eyebrow">Ripple Swim Co.</p>
            <h2>Preparing the next swim story</h2>
            <p>Loading a cleaner, calmer poolside experience.</p>
          </div>
          <div class="loader-scene">
            <div class="loader-ripples" aria-hidden="true">
              <span></span><span></span><span></span>
            </div>
            <div class="loader-swimline">
              <span class="loader-swimmer-dot"></span>
              <span class="loader-swimmer-trail"></span>
            </div>
            <div class="loader-status">
              <span>Loading lanes</span>
              <strong>just a moment</strong>
            </div>
          </div>
        </div>
      </div>
    }
    <div class="app-shell" [class.route-is-loading]="showLoader()">
      <app-header></app-header>
      <main id="main-content" class="app-main">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private hideLoaderTimer?: ReturnType<typeof setTimeout>;

  readonly showLoader = signal(true);

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      this.showLoader.set(false);
      return;
    }

    this.scheduleHideLoader(1350);

    const subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.clearHideLoaderTimer();
        this.showLoader.set(true);
        return;
      }

      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.scheduleHideLoader(850);
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      this.clearHideLoaderTimer();
    });
  }

  private scheduleHideLoader(delay: number): void {
    this.clearHideLoaderTimer();
    this.hideLoaderTimer = setTimeout(() => this.showLoader.set(false), delay);
  }

  private clearHideLoaderTimer(): void {
    if (!this.hideLoaderTimer) {
      return;
    }

    clearTimeout(this.hideLoaderTimer);
    this.hideLoaderTimer = undefined;
  }
}
