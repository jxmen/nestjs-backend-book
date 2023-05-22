/**
 * @param formatString 데코레이터에서 인자로 넣은 값
 */
function format(formatString: string) {
    /**
     * @param target 함수 객체
     * @param propertyKey 호출한 함수 이름?
     */
    return function (target: any, propertyKey: string): any {
        let value = target[propertyKey]; // 함수

        function getter() {
            return `${formatString} ${value}`;
        }

        function setter(newVal: string) {
            value = newVal;
        }

        return {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        }
    };
}


class Greeter {

    @format('Hello')
    greeting: string;


    constructor(greeting: string) {
        this.greeting = greeting;
    }
}

const greeter = new Greeter('World');
console.log(`greeter.greeting: ${greeter.greeting}`);
greeter.greeting = 'Dexter';
console.log(`greeter.greeting: ${greeter.greeting}`);
