// copies ActiveRecord's take: https://guides.rubyonrails.org/active_record_validations.html
// https://medium.com/@reidev275/typesafe-monadic-parsing-with-mapped-types-in-typescript-a3ef9efbd9f2


const parseJson = (str: string): unknown => JSON.parse(str) 


export interface FileHeader {
  site: number;
  batch: number;
  batchDate: Date;
  recordType: number;
}

const int10 = integer(10);

export const fileHeaderParser: Parser<FileHeader> = fromParserDef({
  site: int10,
  batch: int10,
  batchDate: date(10),
  recordType: int10
});
export interface ParserResult<A> {
  result: A;
  rest: string;
}

export interface Parser<A> {
  run(input: string): ParserResult<A>;
}

export type ParserDef<A> = { [P in keyof A]: Parser<A[P]> };

export const fromParserDef = <A>(pd: ParserDef<A>): Parser<A> => ({
  run: (input: string) => {
    let result = {} as A;
    let rest = input;
    for (const k in pd) {
      const r = pd[k].run(rest);
      rest = r.rest;
      result[k] = r.result;
    }
    return {
      result,
      rest
    };
  }
});

export const map = <A, B>(
  mapper: (a: A) => B,
  parser: Parser<A>
): Parser<B> => ({
  run: (input: string) => {
    const parsed = parser.run(input);
    return {
      result: mapper(parsed.result),
      rest: parsed.rest
    };
  }
});

export const chain = <A, B>(
  chainer: (a: A) => Parser<B>,
  parser: Parser<A>
): Parser<B> => ({
  run: (input: string) => {
    const prA: ParserResult<A> = parser.run(input);
    const pB: Parser<B> = chainer(prA.result);
    return pB.run(prA.rest);
  }
});

export const alpha = (length: number): Parser<string> => ({
  run: (input: string) => {
    const text = input.substring(0, length);
    return {
      result: text.trim(),
      rest: input.substring(length)
    };
  }
});

export const integer = (length: number): Parser<number> =>
  map(Number.parseInt, alpha(length));

export const float = (length: number): Parser<number> =>
  map(Number.parseFloat, alpha(length));

export const date = (length: number): Parser<Date> =>
  map(s => new Date(s), alpha(length));