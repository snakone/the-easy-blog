import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NOTIFICATION_TEXT } from '@shared/data/sentences';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AboutComponent {

  text = NOTIFICATION_TEXT;

  public notification(): void {
    console.log('home');
  }

}
