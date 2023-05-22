function HandleError() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(target);
        console.log(`propertyKey: ${propertyKey}`);
        console.log(descriptor);

        const method = descriptor.value;

        descriptor.value = function () {
            try {
                method();
            } catch (e) {
                // 에러 핸들링 로직 구현
                console.log(`에러 발생! ${e}`);
            }
        };


    };
}

class Greeter {

    @HandleError()
    hello() {
        throw new Error('테스트 에러');
    }
}

const greeter = new Greeter();
greeter.hello();
