const writer = value => [value, []];
const unit = value => [value, []];
const squared = x => [x * x, [`${x} was squared.`]];
const halved = x => [x / 2, [`${x} was halved.`]];
const bind = (writer, transform) => {
    const [value, log] = writer;
    const [result, updates] = transform(value);
    return [result, log.concat(updates)];
};
const pipelog = (writer, ...transforms) =>
    transforms.reduce(bind, writer);
pipelog(unit(4), squared, halved);
// Resulting writer object = [8, ['4 was squared.', '16 was halved.']]



bind(x, ()=>5) is like x = (()=>5)()
chain(chain(a,b),c ) is just like c(b(a())) its like pipe 
function o(f, g) {
    return function(x) {
        return f(g(x));
    }
}

const compose = pipe = (...funcs) => (initial) => funcs.reduceRight((acc, func) => func(acc), initial)



// given a mapping func that takes strings and returns a new type
// a parser func that takes strings
const map = <A, B>(
  mapper: (a: A) => B,
  parser: Parser<A>
): Parser<B> => (
  {
    run: (input: string) => {
      const parsed = parser.run(input);
      return {
        result: mapper(parsed.result),
        rest: parsed.rest
      };
    }
  }
);


const chain = <A, B>(
  chainer: (a: A) => Parser<B>,
  parser: Parser<A>
): Parser<B> => (
  {
    run: (input: string) => {
      const prA: ParserResult<A> = parser.run(input);
      const pB: Parser<B> = chainer(prA.result);
      return pB.run(prA.rest);
    }
  }
);


const field = (): Parser<string> => ({
    run: (input: string) => {
      let length; 
      let lengthToNextField = input.indexOf(',')
      if (lengthToNextField === -1) {
        let lengthToLineEnd = input.indexOf('\n')
        if (lengthToLineEnd === -1) {
          length = input.length
        } else {
          length = lengthToLineEnd
        }
      } else {
        length = lengthToNextField
      }

      const text = input.substring(0, length);
      return {
        result: text.trim(),
        rest: input.substring(length + 1)
      };
    }
})

const float = (): Parser<number> => map(Number.parseFloat, field());
const integer = (): Parser<number> => map(Number.parseInt, field());



interface Parser<A> {
  run(input: string): ParserResult<A>;
}
interface ParserResult<A> {
  result: A;
  rest: string;
}
type ParserDef<A> = { [P in keyof A]: Parser<A[P]> };
const fromParserDef = <A>(pd: ParserDef<A>): Parser<A> => ({
  run: (input: string) => {
    let result = {} as A;
    let rest = input;
    for (const k in pd) {
      const current = pd[k].run(rest);
      rest = current.rest;
      result[k] = current.result;
    }
    return {
      result,
      rest
    };
  }
});



const fileHeaderParser: Parser<StudentHeader> = fromParserDef({
  id: field(),
  name: field(), 
});
let d = fileHeaderParser.run("id, name")
console.log(d)
let test = "id, name, fake"


interface StudentRecord{
  id: number;
  name: string;
}

type StudentHeader = keyof StudentRecord


const fileHeaderParser: Parser<StudentRecord> = fromParserDef({
  id: integer(),
  name: field(), 
});



const studentString = 
`id,name
1,A
2,B
3,C`

let d = fileHeaderParser.run(studentString)
console.log(studentString.length)
