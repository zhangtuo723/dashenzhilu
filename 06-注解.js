function log(target, key, descriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args) {
        console.log(`Calling ${key} with arguments:`, args);
        return originalMethod.apply(this, args);
    };

    return descriptor;
}

class MyClass {
    @log
    sayHello(name) {
        return `Hello, ${name}!`;
    }
}

const instance = new MyClass();
instance.sayHello('World'); // 输出：Calling sayHello with arguments: ["World"]
