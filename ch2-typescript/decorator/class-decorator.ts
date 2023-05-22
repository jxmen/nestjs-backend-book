function reportableClassDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        reportingURL = "http://www.example.com";
    }
}

@reportableClassDecorator
class BugReport {
    type = "report";
    title: string;

    constructor(title: string) {
        this.title = title;
    }
}

const bugReport = new BugReport("Needs dark mode");
console.log(bugReport);
console.log(`bugReport: ${JSON.stringify( bugReport )}`);
