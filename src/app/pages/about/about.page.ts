import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BubbleFieldComponent } from '../../shared/bubble-field/bubble-field.component';
import { MediaFrameComponent } from '../../shared/media-frame/media-frame.component';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';
import { WaveDividerComponent } from '../../shared/wave-divider/wave-divider.component';

interface StoryFocus {
  id: number;
  title: string;
  description: string;
  cue: string;
}

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [RouterLink, MediaFrameComponent, RevealOnScrollDirective, WaveDividerComponent, BubbleFieldComponent],
  templateUrl: './about.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {
  readonly storyFocuses: StoryFocus[] = [
    {
      id: 1,
      title: 'Comfort first',
      description: 'Early lessons focus on regulation, body position, and trust so swimmers feel secure before being pushed toward the next skill.',
      cue: 'Best for swimmers who need the water to feel predictable before it feels exciting.',
    },
    {
      id: 2,
      title: 'Momentum building',
      description: 'Families who want visible progress week to week get a clear structure, simple milestones, and a pace that keeps improvement moving.',
      cue: 'Best for swimmers who respond well to small wins and steady repetition.',
    },
    {
      id: 3,
      title: 'Technique support',
      description: 'When a swimmer already enjoys the water, instruction shifts toward cleaner movement patterns and more intentional skill cues.',
      cue: 'Best for swimmers ready to refine stroke quality without losing confidence.',
    },
  ];

  readonly selectedStoryFocusId = signal(1);
  readonly selectedStoryFocus = computed(() => this.storyFocuses.find((focus) => focus.id === this.selectedStoryFocusId()) ?? this.storyFocuses[0]);

  selectStoryFocus(id: number): void {
    this.selectedStoryFocusId.set(id);
  }
}
