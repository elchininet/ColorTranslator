import { CALC, ERRORS } from '#constants';

type Vars = Record<string, number>;

const MAX_STACK = 100;

export class CalcParser {

    constructor(colorIndex: string, calc: string, vars: Vars) {

        this._colorIndex = colorIndex;

        let calcString = calc;
        let stack = 0;

        if (!Number.isNaN(+calc)) {

            this._result = +calc;

        } else if (calc in vars) {

            this._result = vars[calc];

        } else  if (CALC.REGEXP.test(calcString)) {

            CALC.REGEXP.lastIndex = 0;

            this._result = this._getCalcValue(calcString, vars);

        } else {

            while (CALC.SCOPED.test(calcString) && stack < MAX_STACK) {

                CALC.SCOPED.lastIndex = 0;

                calcString = calcString.replace(CALC.SCOPED, (__match: string, operation: string): string => {
                    return this._calculate(operation, vars).toString();
                });

                if (CALC.REGEXP.test(calcString)) {
                    CALC.REGEXP.lastIndex = 0;
                    break;
                }

                /* edge case if the calc has a huge number of operations */
                /* istanbul ignore next */
                stack++;

            }

            this._result = this._getCalcValue(calcString, vars);

        }

    }

    private _colorIndex: string;
    private _result: number;

    private _operations = new Map([
        [CALC.DIVISION,       this._division],
        [CALC.MULTIPLICATION, this._multiplication],
        [CALC.SUM,            this._sum],
        [CALC.REST,           this._rest]
    ]);

    private _division(left: number, right: number): number {
        return left / right;
    }

    private _multiplication(left: number, right: number): number {
        return left * right;
    }

    private _sum(left: number, right: number): number {
        return left + right;
    }

    private _rest(left: number, right: number): number {
        return left - right;
    }

    private _getCalcValue(calc: string, vars: Vars): number {
        const match = calc.match(CALC.REGEXP);
        const operation = match.groups.operation;
        const value = this._calculate(operation, vars);
        if (Number.isNaN(value)) {
            throw new Error(`Invalid value for ${this._colorIndex}. ${operation} ${ERRORS.NOT_A_VALID_RELATIVE_COLOR}`);
        }
        return value;
    }

    private _calculate(operation: string, vars: Vars): number {

        this._operations.forEach((method, regExp) => {

            let stack = 0;

            while (regExp.test(operation) && stack < MAX_STACK) {

                operation = operation.replace(
                    regExp,
                    (__match: string, left: string, right: string): string => {
                        return method(
                            vars[left] ?? +left,
                            vars[right] ?? +right
                        ).toString();
                    }
                );

                /* edge case if the calc has a huge number of operations */
                /* istanbul ignore next */
                stack++;

            }

        });

        return +operation;

    }

    public get result(): number {
        return this._result;
    }

}