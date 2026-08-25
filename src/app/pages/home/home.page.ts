import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BubbleFieldComponent } from '../../shared/bubble-field/bubble-field.component';
import { MediaFrameComponent } from '../../shared/media-frame/media-frame.component';
import { OptionPickerComponent } from '../../shared/option-picker/option-picker.component';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';
import { StatCounterComponent } from '../../shared/stat-counter/stat-counter.component';
import { WaveDividerComponent } from '../../shared/wave-divider/wave-divider.component';

interface HomeLane {
  id: number;
  title: string;
  meta: string;
  description: string;
  image: string;
  imageAlt: string;
}

interface HomeTestimonial {
  id: number;
  quote: string;
  name: string;
  detail: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, MediaFrameComponent, OptionPickerComponent, RevealOnScrollDirective, StatCounterComponent, WaveDividerComponent, BubbleFieldComponent],
  templateUrl: './home.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private laneRotationHandle?: ReturnType<typeof setInterval>;

  readonly lanes: HomeLane[] = [
    {
      id: 1,
      title: 'Water Babies',
      meta: '6 months-3 years | Parent + child | 30 minutes',
      description: 'Gentle water play, body position basics, and trust-building for the earliest swimmers.',
      image: '/images/swimmer-goggles-hero.jpg',
      imageAlt: 'Young child swimmer learning with guidance in a pool lesson',
    },
    {
      id: 2,
      title: 'Beginners',
      meta: '4-6 years | Small group | 35 minutes',
      description: 'Floating, kicking, breath control, and confidence around the wall and shallow water.',
      image: '/images/underwater-young-swimmer.jpg',
      imageAlt: 'Young swimmers taking part in a beginner swim class',
    },
    {
      id: 3,
      title: 'Intermediate',
      meta: '7-12 years | Small group | 45 minutes',
      description: 'Stroke foundations, safe deep-water skills, and smoother movement across the pool.',
      image: '/images/instructor-supporting-swimmer.jpg',
      imageAlt: 'Swimmer practicing technique at the pool',
    },
    {
      id: 5,
      title: 'Adult Lessons',
      meta: '18+ | Private or paired | 45 minutes',
      description: 'Supportive coaching for beginners, returning swimmers, and adults refining technique.',
      image: '/images/swimmer-goggles-hero.jpg',
      imageAlt: 'Supportive swim instructor welcoming a returning swimmer',
    },
  ];

  readonly testimonials: HomeTestimonial[] = [
    {
      id: 1,
      quote: 'Our daughter went from clinging to the wall to asking for extra pool time. Ripple Swim Co. made progress feel calm and exciting at the same time.',
      name: 'Parent of a Lane 2 swimmer',
      detail: 'Beginner lessons | age 5',
    },
    {
      id: 2,
      quote: 'The instructors knew exactly how to build confidence without rushing. Our son finally looks forward to every lesson.',
      name: 'Parent of a Lane 3 swimmer',
      detail: 'Intermediate lessons | age 9',
    },
    {
      id: 3,
      quote: 'I signed up as an adult beginner and never felt judged. The coaching was clear, patient, and incredibly encouraging.',
      name: 'Adult lessons swimmer',
      detail: 'Lane 5 | returning to the water',
    },
  ];

  readonly lanePickerOptions = computed(() =>
    this.lanes.map((lane) => ({ id: lane.id, label: `Lane ${lane.id}`, detail: lane.title, badge: `0${lane.id}` })),
  );

  readonly testimonialPickerOptions = computed(() =>
    this.testimonials.map((testimonial) => ({ id: testimonial.id, label: testimonial.name, detail: testimonial.detail })),
  );

  readonly selectedLaneId = signal(2);
  readonly selectedLane = computed(() => this.lanes.find((lane) => lane.id === this.selectedLaneId()) ?? this.lanes[0]);
  readonly selectedTestimonialId = signal(1);
  readonly selectedTestimonial = computed(() => this.testimonials.find((testimonial) => testimonial.id === this.selectedTestimonialId()) ?? this.testimonials[0]);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.startLaneRotation();
      this.destroyRef.onDestroy(() => this.stopLaneRotation());
    }
  }

  selectLane(id: number): void {
    this.selectedLaneId.set(id);
  }

  selectTestimonial(id: number): void {
    this.selectedTestimonialId.set(id);
  }

  pauseLaneRotation(): void {
    this.stopLaneRotation();
  }

  resumeLaneRotation(): void {
    this.startLaneRotation();
  }

  private startLaneRotation(): void {
    if (this.laneRotationHandle) {
      return;
    }

    this.laneRotationHandle = setInterval(() => {
      const currentIndex = this.lanes.findIndex((lane) => lane.id === this.selectedLaneId());
      const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % this.lanes.length : 0;
      this.selectedLaneId.set(this.lanes[nextIndex].id);
    }, 4800);
  }

  private stopLaneRotation(): void {
    if (!this.laneRotationHandle) {
      return;
    }

    clearInterval(this.laneRotationHandle);
    this.laneRotationHandle = undefined;
  }
}
