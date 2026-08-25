import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MediaFrameComponent } from '../../shared/media-frame/media-frame.component';
import { OptionPickerComponent } from '../../shared/option-picker/option-picker.component';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';
import { StatCounterComponent } from '../../shared/stat-counter/stat-counter.component';

interface PricingPlan {
  id: number;
  title: string;
  price: string;
  summary: string;
  features: string[];
  buttonLabel: string;
  rhythm: string;
  idealFor: string;
  momentum: number;
  note: string;
  primary?: boolean;
  featured?: boolean;
}

interface PricingGoal {
  id: number;
  label: string;
  detail: string;
  planId: number;
}

@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [RouterLink, MediaFrameComponent, OptionPickerComponent, RevealOnScrollDirective, StatCounterComponent],
  templateUrl: './pricing.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingPage {
  readonly commitmentSteps = [1, 2, 3, 4];

  readonly pricingPlans: PricingPlan[] = [
    {
      id: 1,
      title: 'Single Lesson',
      price: 'Contact for pricing',
      summary: 'Best for first-time inquiries, quick assessments, or families wanting a low-commitment starting point.',
      features: ['One focused lesson', 'Ideal for trying a lane', 'Great for schedule flexibility'],
      buttonLabel: 'Ask About Availability',
      rhythm: 'Light introduction',
      idealFor: 'A simple way to test instructor fit, water comfort, and scheduling before committing to a pack.',
      momentum: 1,
      note: 'Works best when you want clarity first and commitment second.',
    },
    {
      id: 2,
      title: '4-Class Pack',
      price: 'Contact for pricing',
      summary: 'A short, manageable pack that helps beginners build early momentum without overcommitting upfront.',
      features: ['Four lessons to build momentum', 'Recommended for beginners', 'Easy short-term commitment'],
      buttonLabel: 'Ask About Availability',
      rhythm: 'Starter routine',
      idealFor: 'Families who want enough repetition to build trust and fundamentals over a few consistent weeks.',
      momentum: 2,
      note: 'Best when a swimmer needs repetition before deciding on a longer routine.',
    },
    {
      id: 3,
      title: '8-Class Pack',
      price: 'Contact for pricing',
      summary: 'The best fit for steady progress, stronger routine, and families who want visible improvement week to week.',
      features: ['Best for consistent progress', 'Priority on recurring time slots', 'Strong value for growing swimmers'],
      buttonLabel: 'Ask About Availability',
      rhythm: 'Momentum builder',
      idealFor: 'Families who want a real swim rhythm, visible progress, and enough runway for habits to settle in.',
      momentum: 3,
      note: 'This is the most balanced option for confidence, progress, and scheduling value.',
      primary: true,
      featured: true,
    },
    {
      id: 4,
      title: 'Monthly Unlimited',
      price: 'Contact for pricing',
      summary: 'Designed for swimmers practicing often or families looking for the fastest path to stronger consistency.',
      features: ['For swimmers training often', 'Ideal for fast skill progression', 'Best for committed schedules'],
      buttonLabel: 'Ask About Availability',
      rhythm: 'Full routine',
      idealFor: 'Swimmers who thrive with frequent water time and families who want the strongest pace of progress.',
      momentum: 4,
      note: 'Best when swim lessons are becoming a major weekly routine rather than an occasional activity.',
    },
  ];

  readonly pricingGoals: PricingGoal[] = [
    {
      id: 1,
      label: 'Try it first',
      detail: 'Best for families wanting a low-risk first lesson before choosing a pack.',
      planId: 1,
    },
    {
      id: 2,
      label: 'Build early momentum',
      detail: 'Best for new swimmers who need a short block of consistency.',
      planId: 2,
    },
    {
      id: 3,
      label: 'Commit to steady progress',
      detail: 'Best for families who want the strongest value and repeat schedule.',
      planId: 3,
    },
    {
      id: 4,
      label: 'Train more often',
      detail: 'Best for swimmers improving quickly or attending regularly.',
      planId: 4,
    },
  ];

  readonly goalOptions = computed(() =>
    this.pricingGoals.map((goal) => ({ id: goal.planId, label: goal.label, detail: goal.detail })),
  );

  readonly stagePreviewOptions = computed(() =>
    this.pricingPlans.map((plan) => ({ id: plan.id, label: plan.title, detail: plan.rhythm })),
  );

  readonly selectedPlanId = signal(3);
  readonly selectedPlan = computed(() => this.pricingPlans.find((plan) => plan.id === this.selectedPlanId()) ?? this.pricingPlans[0]);

  selectPlan(planId: number): void {
    this.selectedPlanId.set(planId);
  }
}
