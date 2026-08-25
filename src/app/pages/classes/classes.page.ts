import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MediaFrameComponent } from '../../shared/media-frame/media-frame.component';
import { OptionPickerComponent } from '../../shared/option-picker/option-picker.component';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';

interface ClassLane {
  id: number;
  title: string;
  meta: string;
  description: string;
  outcomes: string[];
  pace: number;
  confidenceLabel: string;
  coachCue: string;
  accent?: boolean;
}

interface PlacementOption {
  id: number;
  label: string;
  detail: string;
  laneId: number;
}

@Component({
  selector: 'app-classes-page',
  standalone: true,
  imports: [RouterLink, MediaFrameComponent, OptionPickerComponent, RevealOnScrollDirective],
  templateUrl: './classes.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassesPage {
  readonly paceSteps = [1, 2, 3, 4];

  readonly lanes: ClassLane[] = [
    {
      id: 1,
      title: 'Water Babies',
      meta: 'Ages: 6 months-3 years | Format: Parent + child | Length: 30 minutes',
      description: 'This lane introduces babies and toddlers to the water through songs, supported floats, gentle splashing, and comfort-building routines that help both child and caregiver feel at ease.',
      outcomes: ['Comfort in the water', 'Parent-supported routines', 'Early body awareness'],
      pace: 1,
      confidenceLabel: 'Soft entry, low-pressure rhythm',
      coachCue: 'We keep transitions slow and predictable so the water feels safe from the first minute.',
    },
    {
      id: 2,
      title: 'Beginners',
      meta: 'Ages: 4-6 years | Format: Small group | Length: 35 minutes',
      description: 'Beginner swimmers learn water entry, floating, kicking, breath control, and safe wall returns in a supportive setting that keeps early lessons encouraging and structured.',
      outcomes: ['Float and kick basics', 'Breath control', 'Safe wall returns'],
      pace: 2,
      confidenceLabel: 'Gentle skill-building with visible wins',
      coachCue: 'Expect lots of repetition, simple cues, and quick encouragement after every success.',
    },
    {
      id: 3,
      title: 'Intermediate',
      meta: 'Ages: 7-12 years | Format: Small group | Length: 45 minutes',
      description: 'Intermediate swimmers connect breathing, kicking, and arm patterns into smoother freestyle and backstroke foundations while growing confidence in deeper water.',
      outcomes: ['Freestyle foundation', 'Backstroke rhythm', 'Deep-water confidence'],
      pace: 3,
      confidenceLabel: 'Steady movement with more challenge',
      coachCue: 'Lessons add sequencing and endurance while keeping corrections clear and manageable.',
    },
    {
      id: 4,
      title: 'Advanced / Stroke Refinement',
      meta: 'Ages: 10+ | Format: Small group or semi-private | Length: 50 minutes',
      description: 'This lane focuses on stronger technique, endurance, starts and turns basics, and refining stroke mechanics for swimmers who are already water-safe and ready for precision.',
      outcomes: ['Technique refinement', 'Endurance building', 'Starts and turns basics'],
      pace: 4,
      confidenceLabel: 'Sharper pace with precision cues',
      coachCue: 'Instruction becomes more specific here, with technique notes layered into longer swim sets.',
    },
    {
      id: 5,
      title: 'Adult Lessons',
      meta: 'Ages: 18+ | Format: Private or paired | Length: 45 minutes',
      description: 'Adults receive calm, individualized coaching whether they are learning from the beginning, rebuilding comfort in the water, or refining technique for lap swimming.',
      outcomes: ['Beginner-friendly coaching', 'Confidence rebuilding', 'Lap swim technique'],
      pace: 2,
      confidenceLabel: 'Personal pacing with private support',
      coachCue: 'Adult lessons adapt around comfort, goals, and how quickly the swimmer wants to progress.',
      accent: true,
    },
  ];

  readonly placementOptions: PlacementOption[] = [
    {
      id: 1,
      label: 'New to the water',
      detail: 'Best for early comfort and simple supported movement.',
      laneId: 1,
    },
    {
      id: 2,
      label: 'Needs confidence basics',
      detail: 'Best for floating, kicking, and safe pool habits.',
      laneId: 2,
    },
    {
      id: 3,
      label: 'Ready for stroke progress',
      detail: 'Best for connecting technique and deeper-water skills.',
      laneId: 3,
    },
    {
      id: 4,
      label: 'Wants sharper technique',
      detail: 'Best for refinement, endurance, and precision.',
      laneId: 4,
    },
    {
      id: 5,
      label: 'Adult learning path',
      detail: 'Best for adult beginners or returning swimmers.',
      laneId: 5,
    },
  ];

  readonly pickerOptions = computed(() =>
    this.placementOptions.map((option) => ({ id: option.laneId, label: option.label, detail: option.detail })),
  );

  readonly selectedLaneId = signal(2);
  readonly selectedLane = computed(() => this.lanes.find((lane) => lane.id === this.selectedLaneId()) ?? this.lanes[0]);

  focusLane(laneId: number): void {
    this.selectedLaneId.set(laneId);
  }
}
