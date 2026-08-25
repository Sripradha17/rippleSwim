import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export interface OptionPickerItem {
  id: number;
  label: string;
  detail: string;
  badge?: string;
}

@Component({
  selector: 'app-option-picker',
  standalone: true,
  templateUrl: './option-picker.component.html',
  styleUrl: './option-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionPickerComponent {
  @Input({ required: true }) options: OptionPickerItem[] = [];
  @Input() selectedId: number | null = null;
  @Input() ariaLabel = '';
  @Input() columns: 1 | 2 = 1;
  @Output() selected = new EventEmitter<number>();
}
