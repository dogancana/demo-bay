import { ButtonDirective } from './button.directive';

describe('ButtonDirective (shallow)', () => {
  let directive: ButtonDirective;

  beforeEach(() => {
    directive = new ButtonDirective();
  });

  it('should create', () => {
    expect(directive).toBeDefined();
  });

  it('should match for primary', () => {
    directive.buttonType = 'primary';
    expect(directive.classes).toMatchInlineSnapshot(`"px-4 py-2 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-default uppercase bg-indigo-500 hover:bg-indigo-600 text-white"`);
  });

  it('should match for secondary', () => {
    directive.buttonType = 'secondary';
    expect(directive.classes).toMatchInlineSnapshot(`"px-4 py-2 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-default uppercase bg-indigo-50 hover:bg-indigo-100 text-black"`);
  });
});
