'use strict';

const romanNumberType = {
    error:      0, // any case excluding the folowing:
    roman:      1, // string with valid roman literals
    decimal:    2, // positive integer number in less than 5000
}

const romanToDecimalMap = new Map([
    ['M' ,1000],
    ['D' , 500],
    ['C' , 100],
    ['L' ,  50],
    ['X' ,  10],
    ['V' ,   5],
    ['I' ,   1],
]);

const decimalToRomanMap = new Map([
    ['M' ,1000],
    ['CM', 900],
    ['D' , 500],
    ['CD', 400],
    ['C' , 100],
    ['XC',  90],
    ['L' ,  50],
    ['XL',  40],
    ['X' ,  10],
    ['V' ,   5],
    ['IV',   4],
    ['I' ,   1],
]);

function roman(number) {
    if (typeof number === 'string') {
        number = number.toUpperCase();
    }

    switch (getNumberType(number)) {
    case romanNumberType.decimal:   return decimalToRoman(number);
    case romanNumberType.roman:     return romanToDecimal(number);
    case romanNumberType.error:     throw new TypeError("Incorrect argument");
    default: throw new TypeError("error: unsupported case");
    }
}

function getNumberType(number) {
    const isRoman = (number) => {
        const NotRomanLetters = /[^M,C,D,L,X,V,I]/g;
        return !number.match(NotRomanLetters);
    }

    const isDecimal = (number) => {
        const NotDigits = /[^0-9\-+]/g;
        return !number.match(NotDigits);
    }
    
    if (typeof number === 'string') {
        return isRoman(number)  ? romanNumberType.roman
            : isDecimal(number) ? romanNumberType.decimal
            : romanNumberType.error;
    }
    if (typeof number === 'number') {
        return isNaN(number)    ? romanNumberType.error
            : number <= 0       ? romanNumberType.error
            : number >= 5000    ? romanNumberType.error
            : romanNumberType.decimal;
    }
    return romanNumberType.error;
}

function romanToDecimal(number) {
    let result = 0;
    let buffer = 0;

    // XCIII -> a=oo b=oo c=X -> a=oo b=X c=C -> a=X b=C c=I -> ...
    let a = Infinity;
    let b = Infinity;

    [...number].forEach(rune => {
        let c = romanToDecimalMap.get(rune);
        
        if (!((a < b && c < a) || (a >= b && c <= a))) {
            throw new TypeError("Incorrect argument");
        }

        if (c > buffer) {
            buffer = c - buffer;
        } else {
            result += buffer;
            buffer = c;
        }        
        a = b;
        b = c;
    });
    return result + buffer;
}

function decimalToRoman(number) {
    let result = '';
    decimalToRomanMap.forEach((value, roman) => {
        while (number % value != number) {
            result += roman;
            number -= value;
        }
    });
    return result;
}
