// rounding
// https://2ality.com/2019/11/nodejs-streams-async-iteration.html#recap%3A-asynchronous-iteration-and-asynchronous-generators
// calling super.all
// figuring out async joins
// modules ambient
// opaque types for uniqueness

// // export function eur(value: number): EUR {
// //   return value as any;
// // }
// // export function addEuros(a: EUR, b: EUR): EUR {
// //   return ((a as any) + (b as any)) as any;
// // }
// // const result: EUR = addEuros(eur(1), eur(10)); // OK

// // declare const tag: unique symbol
// // export type EUR = { readonly [tag]: 'EUR' };

// // console.log(eur(1))


// // type RGBColor = number & {_type_: "RGBColor"};

// // const rgb = (value: number): RGBColor => {
// //   if (value < 0 || value > 255) {
// //     throw new Error(`The value ${value} is not a valid color`);
// //   }

// //   return value as RGBColor;
// // };

// // Compiler errors
// // const color1: RGBColor = 200; // fail - number is not RGBColor
// // const color2: RGBColor = 300; // fail - number is not RGBColor

// // Runtime error
// // const color3: RGBColor = rgb(300); // fail - The value 300 is not a valid color

// // // Pass
// // const color4: RGBColor = rgb(100);
// // const color5: RGBColor = rgb(255);