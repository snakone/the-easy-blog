import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about-content',
  templateUrl: './about-content.component.html',
  styleUrl: './about-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AboutContentComponent {

}
