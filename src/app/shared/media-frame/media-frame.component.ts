import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-media-frame',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './media-frame.component.html',
  styleUrl: './media-frame.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaFrameComponent {
  @Input({ required: true }) src = '';
  @Input({ required: true }) alt = '';
  @Input({ required: true }) width!: number;
  @Input({ required: true }) height!: number;
  @Input() priority = false;
}
