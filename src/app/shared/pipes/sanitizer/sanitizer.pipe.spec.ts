import { DomSanitizer } from "@angular/platform-browser";
import { SanitizerPipe } from "./sanitizer.pipe";
import { TestBed } from "@angular/core/testing";

describe('SanitizerPipe', () => {
  let pipe: SanitizerPipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new SanitizerPipe(sanitizer);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy(); 
  });

  it('should sanitize HTML', () => {
    const HTML = `<div><script>alert("0wned")</script> <b>Syntax</b></div>`;
    const result = pipe.transform(HTML, "html");
    expect(result).toBeTruthy();
  });

  it('should sanitize CSS', () => {
    const CSS = `.test { color: 'red' }`;
    const result = pipe.transform(CSS, "style");
    expect(result).toBeTruthy();
  });

})