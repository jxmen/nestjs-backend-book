import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function NotIn(
  property: string,
  validationOptions?: ValidationOptions, // 1.
) {
  return (object: object, propertyName: string) => {
    // 2.
    registerDecorator({
      name: 'NotIn',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];

          return (
            typeof value === 'string' &&
            typeof relatedValue === 'string' &&
            !relatedValue.includes(value)
          );
        },
      },
    });
  };
}

// 1. 데커레이터의 인수는 객체에서 참조하려고 하는 다른 속성의 이름과 ValidationOptions를 받는다.
// 2. registerDecorator를 호출하는 함수 리턴 - 이 함수의 인수로 데커레이터가 선언될 객체와 속성 이름을 받는다.
