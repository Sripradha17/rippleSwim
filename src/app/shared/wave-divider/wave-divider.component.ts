import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-wave-divider',
  standalone: true,
  templateUrl: './wave-divider.component.html',
  styleUrl: './wave-divider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WaveDividerComponent {}
