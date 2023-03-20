import { Directive, HostBinding, Input } from '@angular/core';

export type ButtonType = 'primary' | 'secondary';
const baseClasses =
  'px-4 py-2 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-default uppercase';
const classMap: { [key in ButtonType]: string } = {
  primary: 'bg-indigo-500 hover:bg-indigo-600 text-white',
  secondary: 'bg-indigo-50 hover:bg-indigo-100 text-black',
};

@Directive({
  selector: '[app-button]',
})
export class ButtonDirective {
  @Input()
  public buttonType: ButtonType = 'primary';

  @HostBinding('class') get classes() {
    return `${baseClasses} ${classMap[this.buttonType]}`;
  }
}
