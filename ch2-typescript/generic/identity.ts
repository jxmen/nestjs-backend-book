function identity<T>(arg: T): T {
    return arg;
}

console.log(`identity<string>: ${(identity<string>('asdf'))}`);
console.log(`identity<number>: ${(identity<number>(123))}`);
