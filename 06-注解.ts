function parameterDecorator(target: any, propertyKey: string | symbol, parameterIndex: number) {
    console.log(propertyKey, parameterIndex);
}

class TestClass {
    public method(
        @parameterDecorator
        param: string
    ) {
        console.log('xx', param);
    }
}

const a = new TestClass();
