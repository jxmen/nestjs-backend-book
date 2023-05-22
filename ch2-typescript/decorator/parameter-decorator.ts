function MinLength(min: number) {

    /**
     * @param target 정적 멤버가 속한 클래스의 생성자 함수이거나 인스턴스 멤버에 대한 클래스의 프로토타입
     * @param propertyKey 멤버의 이름
     * @param parameterIndex 매개변수가 함수에서 몇번째로 실행되었는지를 나타내는 인덱스
     *
     */
    return function (target: any, propertyKey: string, parameterIndex: number) {
        /**
         * target.validator로 메서드 하나만 선언하는 것도 충분할 것 같다.
         */
        target.validators = {
            minLength: function (args: string[]) {
                return args[parameterIndex].length >= min;
            },
        }
    };
}

function Validate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(target);

    // 메서드 데커레이터가 선언된 메서드 임시 저장
    const method = descriptor.value;

    descriptor.value = function (...args: string[]) {
        Object.keys(target.validators).forEach(key => {
            if (!target.validators[key](args)) {
                throw new Error('BadRequest');
            }
        });

        method.apply(this, args); // 원래 함수 실행
    };
}

class User {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    @Validate
    setName(@MinLength(3) name: string) {
        this.name = name;
    }

    getName() {
        return this.name;
    }
}

const user = new User('12345');
console.log(`user.getName(): ${user.getName()}`);
user.setName('Dexter');
console.log(`user.getName(): ${user.getName()}`);

console.log('================================');
user.setName('12');
console.log(`user.getName(): ${user.getName()}`);
