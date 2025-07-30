import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortNumber',
  standalone:true
})
export class ShortNumberPipe implements PipeTransform {

  // transform(number: number, args?: any): any {
  //   if (isNaN(number)) return null; // will only work value is a number
  //   if (number === null) return null;
  //   if (number === 0) return null;
  //   let abs = Math.abs(number);
  //   const rounder = Math.pow(10, 1);
  //   const isNegative = number < 0; // will also work for Negetive numbers
  //   let key = '';

  //   const powers = [
  //       {key: 'Q', value: Math.pow(10, 15)},
  //       {key: 'T', value: Math.pow(10, 12)},
  //       {key: 'B', value: Math.pow(10, 9)},
  //       {key: 'M', value: Math.pow(10, 6)},
  //       {key: 'K', value: 1000}
  //   ];

  //   for (let i = 0; i < powers.length; i++) {
  //       let reduced = abs / powers[i].value;
  //       reduced = Math.round(reduced * rounder) / rounder;
  //       if (reduced >= 1) {
  //           abs = reduced;
  //           key = powers[i].key;
  //           break;
  //       }
  //   }
  //   return (isNegative ? '-' : '') + abs.toFixed(2) + key;




  transform(number: number, args?: any): any {
    if (isNaN(number)) return null; // Return null if the value is not a number
    if (number === null) return null;
    if (number === 0) return 0;

    let abs = Math.abs(number);
    const rounder = Math.pow(10, 1);
    const isNegative = number < 0;
    let key = '';

    const powers = [
      { key: 'Q', value: Math.pow(10, 15) },
      { key: 'T', value: Math.pow(10, 12) },
      { key: 'B', value: Math.pow(10, 9) },
      { key: 'M', value: Math.pow(10, 6) },
      { key: 'K', value: 1000 }
    ];

    for (let i = 0; i < powers.length; i++) {
      let reduced = abs / powers[i].value;
      reduced = Math.round(reduced * rounder) / rounder;
      if (reduced >= 1) {
        abs = reduced;
        key = powers[i].key;
        break;
      }
    }

    let formattedNumber: string;

    if (Number.isInteger(abs)) {
      formattedNumber = abs.toFixed(0); // Format as whole number
    } else {
      formattedNumber = abs.toFixed(2); // Format with two decimal places
    }

    return (isNegative ? '-' : '') + formattedNumber + key;
  }



  // transform(value: any, args?: any): any {
  //   if (value === null) return null;
  //   if (value === 0) return "0";
  //   var fractionSize = 2; // Update fractionSize to 2 for two decimal places
  //   var abs = Math.abs(value);
  //   var rounder = Math.pow(10, fractionSize);
  //   var isNegative = value < 0;
  //   var key = '';
  //   var powers = [
  //     { key: "Q", value: Math.pow(10, 15) },
  //     { key: "T", value: Math.pow(10, 12) },
  //     { key: "B", value: Math.pow(10, 9) },
  //     { key: "M", value: Math.pow(10, 6) },
  //     { key: "k", value: 1000 }
  //   ];

  //   for (var i = 0; i < powers.length; i++) {
  //     var reduced = abs / powers[i].value;
  //     reduced = Math.round(reduced * rounder) / rounder;
  //     if (reduced >= 1) {
  //       abs = reduced;
  //       key = powers[i].key;
  //       break;
  //     }
  //   }

  //   return (isNegative ? '-' : '') + abs.toFixed(fractionSize) + key;
  // }
}
