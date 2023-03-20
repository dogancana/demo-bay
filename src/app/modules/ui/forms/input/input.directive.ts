import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[app-input]',
})
export class InputDirective {
  @HostBinding('class') get classes() {
    return `relative block w-full rounded-t-md border-0 py-1.5 text-gray-900
     ring-1 ring-inset ring-gray-300
     placeholder:text-gray-400 focus:z-10 focus:ring-2
     focus:ring-inset focus:ring-indigo-600
     sm:text-sm sm:leading-6`;
  }
}
