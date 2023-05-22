interface User {
    name: string,
    age: number;
}

const user: User = {
    getName(): string {
        return this.name;
    }, setName(name: string): void {
        this.name = name;
    },

    name: 'pangnem',
    age: 23
}
