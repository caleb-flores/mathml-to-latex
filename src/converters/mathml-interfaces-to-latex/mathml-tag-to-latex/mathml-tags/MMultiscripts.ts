import { MathMLTag } from './MathMLTag';
import { BracketWrapper, ParenthesisWrapper } from '../../../../utils/wrappers';
import { InvalidNumberOfChild } from '../../../../errors';

export class MMultiscripts extends MathMLTag {
  constructor(value: string, attributes: Record<string, string>, children: MathMLTag[]) {
    super('mmultiscripts', value, attributes, children);
  }

  convert(): string {
    if (this._children.length !== 3) throw new InvalidNumberOfChild(this._name, 2, this._children.length);

    const base = this._children[0].convert();
    const sub = this._children[1].convert();
    const sup = this._children[2].convert();

    const wrappedSub = new BracketWrapper().wrap(sub);
    const wrappedSup = new BracketWrapper().wrap(sup);

    return `${this._wrapInParenthesisIfThereIsSpace(base)}_${wrappedSub}^${wrappedSup}`;
  }

  private _wrapInParenthesisIfThereIsSpace(str: string): string {
    if (!str.match(/\s+/g)) return str;
    return new ParenthesisWrapper().wrap(str);
  }
}
