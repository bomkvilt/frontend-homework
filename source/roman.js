'use strict';

const roman_numberType =
{
    error:      0,
    roman:      1,
    decimal:    2,
}

const roman_IncorrectArgumentError = new TypeError("Incorrect argument");
const roman_NegativeNumberError = new TypeError('Roman numerals cannot be negative');
const roman_LagerNumberError = new TypeError('Roman numerals cannot be lage than 4999');

function roman(number)
{
    if (typeof number === 'string')
    {
        number = number.toUpperCase();
    }
    
    switch (getNumberType(number))
    {
    case roman_numberType.decimal:  return decimalToRoman(number);
    case roman_numberType.roman:    return romanToDecimal(number);
    case roman_numberType.error:    throw roman_IncorrectArgumentError;
    default:                        
        throw new TypeError("error: unsupported case");
    }
}

function getNumberType(number)
{
    const isRoman = (number) =>
    {
        const NotRomanLetters = /[^M,C,D,L,X,V,I]/g;
        return !number.match(NotRomanLetters);
    }

    const isDecimal = (number) =>
    {
        const NotDigits = /[^0-9\-+]/g;
        return !number.match(NotDigits);
    }
    
    if (typeof number === 'string')
    {
        return isRoman(number)  ? roman_numberType.roman
            : isDecimal(number) ? roman_numberType.decimal
            : roman_numberType.error;
    } 
    if (typeof number === 'number')
    {
        return roman_numberType.decimal;
    }
    return roman_numberType.error;
}

function romanToDecimal(number)
{
    const L2D = new Map([
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

    let result = 0;
    L2D.forEach((value, roman, mapObj) =>
    {
        while (number.indexOf(roman) === 0) 
        {
            result += value;
            number = number.replace(roman, '');
        }
    });
    return result;
}

function decimalToRoman(number)
{
    const L2D = new Map([
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

    if (isNaN(number)) throw roman_IncorrectArgumentError;
    if (number > 4999) throw roman_LagerNumberError;
    if (number < 1) throw roman_NegativeNumberError;
    
    let result = '';
    L2D.forEach((value, roman, mapObj) =>
    {
        while (number % value != number) 
        {
            result += roman;
            number -= value;
        }
    });
    return result;
}
