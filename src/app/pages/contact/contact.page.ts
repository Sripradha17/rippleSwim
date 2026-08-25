import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { ContactService } from '../../core/services/contact.service';
import { BubbleFieldComponent } from '../../shared/bubble-field/bubble-field.component';
import { MediaFrameComponent } from '../../shared/media-frame/media-frame.component';
import { OptionPickerComponent } from '../../shared/option-picker/option-picker.component';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';
import { WaveDividerComponent } from '../../shared/wave-divider/wave-divider.component';

interface InquiryPreset {
  id: number;
  lane: string;
  label: string;
  detail: string;
  prompt: string;
}

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [ReactiveFormsModule, MediaFrameComponent, OptionPickerComponent, RevealOnScrollDirective, WaveDividerComponent, BubbleFieldComponent],
  templateUrl: './contact.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage {
  private readonly formBuilder = inject(FormBuilder);
  private readonly contactService = inject(ContactService);

  readonly inquiryPresets: InquiryPreset[] = [
    {
      id: 1,
      lane: 'Lane 1 - Water Babies',
      label: 'Early water comfort',
      detail: 'Best for babies, toddlers, and caregivers building calm first experiences.',
      prompt: 'Share age, prior pool exposure, and whether a parent or caregiver will be in the water each lesson.',
    },
    {
      id: 2,
      lane: 'Lane 2 - Beginners',
      label: 'Foundational confidence',
      detail: 'Best for swimmers learning floats, kicks, wall safety, and comfort putting their face in the water.',
      prompt: 'Include age, any nervousness around water, and whether the swimmer has taken group lessons before.',
    },
    {
      id: 3,
      lane: 'Lane 3 - Intermediate',
      label: 'Stroke progress',
      detail: 'Best for swimmers who are comfortable in the water and ready to connect breathing and stroke technique.',
      prompt: 'Mention current swim skills, confidence in deeper water, and whether freestyle or backstroke is already familiar.',
    },
    {
      id: 4,
      lane: 'Lane 5 - Adult Lessons',
      label: 'Adult learning path',
      detail: 'Best for adult beginners, returning swimmers, or anyone rebuilding confidence for lap swimming.',
      prompt: 'Tell us if the goal is comfort, safety, lap swimming, or technique refinement, plus any past experience.',
    },
  ];

  readonly selectedPresetId = signal(2);
  readonly selectedPreset = computed(() => this.inquiryPresets.find((preset) => preset.id === this.selectedPresetId()) ?? this.inquiryPresets[0]);

  readonly contactForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    lane: [this.inquiryPresets[1].lane, [Validators.required]],
    message: [''],
  });

  submit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.contactService.draftInquiryEmail(this.contactForm.getRawValue(), '');
  }

  selectPreset(id: number): void {
    const preset = this.inquiryPresets.find((item) => item.id === id);
    if (!preset) {
      return;
    }

    this.selectedPresetId.set(preset.id);
    this.contactForm.controls.lane.setValue(preset.lane);

    if (!this.contactForm.controls.message.value.trim()) {
      this.contactForm.controls.message.setValue(preset.prompt);
    }
  }

  syncLaneSelection(): void {
    const lane = this.contactForm.controls.lane.value;
    const preset = this.inquiryPresets.find((item) => item.lane === lane);
    if (preset) {
      this.selectedPresetId.set(preset.id);
    }
  }

  completionCount(): number {
    return ['name', 'email', 'lane', 'message'].filter((field) => this.fieldComplete(field as 'name' | 'email' | 'lane' | 'message')).length;
  }

  completionPercent(): number {
    return (this.completionCount() / 4) * 100;
  }

  fieldComplete(controlName: 'name' | 'email' | 'lane' | 'message'): boolean {
    const value = this.contactForm.controls[controlName].value;
    return typeof value === 'string' ? value.trim().length > 0 : Boolean(value);
  }

  showError(controlName: 'name' | 'email' | 'lane', errorKey: 'required' | 'email'): boolean {
    const control = this.contactForm.controls[controlName];
    return control.touched && control.hasError(errorKey);
  }
}
