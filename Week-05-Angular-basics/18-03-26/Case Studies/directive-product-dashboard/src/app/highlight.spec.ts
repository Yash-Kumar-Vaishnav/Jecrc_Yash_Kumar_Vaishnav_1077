import { ElementRef } from '@angular/core';
import { HighlightDirective } from './highlight';

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    const mockElement = new ElementRef(document.createElement('div'));
    const directive = new HighlightDirective(mockElement);
    expect(directive).toBeTruthy();
  });
});