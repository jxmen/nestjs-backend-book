// Note: ts 코드를 읽어들일 때 데코레이터 평가 및 호출이 실행된다.

function first() {
    console.log('first(): factory evaluaged');

    return function (target: any, property: string, descriptor: PropertyDescriptor) {
        console.log('first(): called');
    };
}

function second() {
    console.log('second(): factory evaluaged');

    return function (target: any, property: string, descriptor: PropertyDescriptor) {
        console.log('second(): called');
    };
}

class ExampleClass {

    /**
     * f(g(x)) => first(second(method))
     */
    @first()
    @second()
    method() {
        console.log('method(): called');
    }
}

const exampleClass = new ExampleClass();
exampleClass.method();
