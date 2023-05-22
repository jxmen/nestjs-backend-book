function deco1(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('데커레이터가 평가됨');
}


function deco2(value: string) {
    console.log('데커레이터가 평가됨');

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(value);
    };
}


class TestClass {

    @deco1
    test1() {
        console.log('함수 호출됨');
    }

    @deco2('hello')
    test2() {
        console.log('함수 호출됨');
    }
}

const testClass = new TestClass();
testClass.test1();
console.log('================================');
testClass.test2();
