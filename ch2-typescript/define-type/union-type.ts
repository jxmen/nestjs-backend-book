function getLength(obj: string | string[]) {
    return obj.length;
}

const aString: string = '12345';
console.log(`getLength(aString): ${getLength(aString)}`);

const strings: string[] = aString.split('');
console.log(`getLength(strings): ${getLength(strings)}`);
