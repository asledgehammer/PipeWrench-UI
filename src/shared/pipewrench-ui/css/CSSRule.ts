export class CSSRule {
  private _value: string;

  defaultValue: string;
  dirty: boolean = true;

  constructor(defaultValue: string) {
    this.value = this.defaultValue = defaultValue;
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
    this.dirty = true;
  }
}
