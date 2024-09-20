import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle } from '@angular/platform-browser';

@Pipe({name: 'Sanitizer'})

export class SanitizerPipe implements PipeTransform {

  /**
   * Object to map the type and use {DomSanitizer}
   * @param key The type of the sanitizer.
   * @param value The value to sanitize.
  */
  switchType: {[key: string]: (value: string) => SafeHtml | SafeStyle} = {
    html: (value) => this.sanitizer.bypassSecurityTrustHtml(value),
    style: (value) => this.sanitizer.bypassSecurityTrustStyle(value)
  }

  constructor(private sanitizer: DomSanitizer) { }

  /**
   * Transform the Post/Draft message into a shorten message depending on the arguments.
   * @param value The Post/Draft message.
   * @param args
  */
  transform(value: string, args?: SanitizerType): SafeHtml | SafeStyle | string {
    if (args && this.switchType[args]) {
      return this.switchType[args](value);
    } else {
      return value;
    }
  }

}

type SanitizerType = 'html' | 'style';
