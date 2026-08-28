import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BubbleFieldComponent } from '../../shared/bubble-field/bubble-field.component';
import { MediaFrameComponent } from '../../shared/media-frame/media-frame.component';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';
import { WaveDividerComponent } from '../../shared/wave-divider/wave-divider.component';

interface ClassLane {
  id: number;
  title: string;
  meta: string;
  outcomes: string[];
  confidenceLabel: string;
  coachCue: string;
  image: string;
  imageAlt: string;
  accent?: boolean;
}

@Component({
  selector: 'app-classes-page',
  standalone: true,
  imports: [RouterLink, MediaFrameComponent, RevealOnScrollDirective, WaveDividerComponent, BubbleFieldComponent],
  templateUrl: './classes.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassesPage {
  readonly lanes: ClassLane[] = [
    {
      id: 1,
      title: 'Water Babies',
      meta: 'Ages 6 months-3 years | Parent + child | 30 minutes',
      outcomes: ['Comfort in the water', 'Parent-supported routines', 'Early body awareness'],
      confidenceLabel: 'Soft entry, low-pressure rhythm',
      coachCue: 'We keep transitions slow and predictable so the water feels safe from the first minute.',
      image: 'images/toddler-parent-swim-lesson.jpg',
      imageAlt: 'Toddler and parent bonding during a swim lesson',
    },
    {
      id: 2,
      title: 'Beginners',
      meta: 'Ages 4-6 years | Small group | 35 minutes',
      outcomes: ['Float and kick basics', 'Breath control', 'Safe wall returns'],
      confidenceLabel: 'Gentle skill-building with visible wins',
      coachCue: 'Expect lots of repetition, simple cues, and quick encouragement after every success.',
      image: 'images/instructor-teaching-child.jpg',
      imageAlt: 'Instructor teaching a child to swim',
    },
    {
      id: 3,
      title: 'Intermediate',
      meta: 'Ages 7-12 years | Small group | 45 minutes',
      outcomes: ['Freestyle foundation', 'Backstroke rhythm', 'Deep-water confidence'],
      confidenceLabel: 'Steady movement with more challenge',
      coachCue: 'Lessons add sequencing and endurance while keeping corrections clear and manageable.',
      image: 'images/girl-backstroke-swim.jpg',
      imageAlt: 'Young swimmer practicing backstroke technique',
    },
    {
      id: 4,
      title: 'Advanced / Stroke Refinement',
      meta: 'Ages 10+ | Small group or semi-private | 50 minutes',
      outcomes: ['Technique refinement', 'Endurance building', 'Starts and turns basics'],
      confidenceLabel: 'Sharper pace with precision cues',
      coachCue: 'Instruction becomes more specific here, with technique notes layered into longer swim sets.',
      image: 'images/teen-swimmer-competition-ready.jpg',
      imageAlt: 'Teen swimmer focused and ready to compete',
    },
    {
      id: 5,
      title: 'Adult Lessons',
      meta: 'Ages 18+ | Private or paired | 45 minutes',
      outcomes: ['Beginner-friendly coaching', 'Confidence rebuilding', 'Lap swim technique'],
      confidenceLabel: 'Personal pacing with private support',
      coachCue: 'Adult lessons adapt around comfort, goals, and how quickly the swimmer wants to progress.',
      image: 'images/adults-swim-training-pair.jpg',
      imageAlt: 'Two adult swimmers training together in the pool',
      accent: true,
    },
  ];
}
