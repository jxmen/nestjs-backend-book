function reportableClassDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        // 데코레이터를 사용하는 클래스 내부에서 해당 변수에 대한 접근은 불가능하다.
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

// Error!
//     console.log(`bug report url: ${bugReport.reportingURL}`);
