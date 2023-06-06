import { ValueObject } from './value.objects';

const NAME_REGEX =
    /^(?![\s-'])(?!.*[\s-']{2})(?!.*[\s-']$)[A-ZÀ-ÖØ-öø-ÿ\s-']{2,30}$/i;

export class NameVO extends ValueObject<string> {
    public equals(valueObject: NameVO) {
        return this.value === valueObject.value;
    }

    protected assertIsValid(value: string) {
        if (!NAME_REGEX.test(value)) {
            throw new Error(NameVO.name);
        }
    }
}
