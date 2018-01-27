report(parse("+(a, 10)"),JSON.stringify(
                                                        {
                                                          type:'apply',
                                                          operator: {
                                                            type:'word',
                                                            name: '+'
                                                          },
                                                          args:[
                                                            {
                                                              type:'word',
                                                              name: 'a'
                                                            },
                                                            {
                                                              type: 'value',
                                                              value : 10
                                                            }
                                                          ]
                                                        })
);
var prog = parse("if(true, false, true)");
report(evaluate(prog, topEnv),'false');
var v=run("do(define(total, 0),",
    "   define(count, 1),",
    "   while(<(count, 11),",
    "         do(define(total, +(total, count)),",
    "            define(count, +(count, 1)))),",
    "   print(total))");
report(v,"55");
run("do(define(plusOne, fun(a, +(a, 1))),",
    "   print(plusOne(10)))");


run("do(define(pow, fun(base, exp,",
    "     if(==(exp, 0),",
    "        1,",
    "        *(base, pow(base, -(exp, 1)))))),",
    "   print(pow(2, 10)))");
run("do(define(sum, fun(array,",
    "     do(define(i, 0),",
    "        define(sum, 0),",
    "        while(<(i, length(array)),",
    "          do(define(sum, +(sum, element(array, i))),",
    "             define(i, +(i, 1)))),",
    "        sum))),",
    "   print(sum(array(1, 2, 3))))");
// → 6
console.log(parse("# hello\nx"));
// → {type: "word", name: "x"}

console.log(parse("a # one\n   # two\n()"));
// → {type: "apply",
//    operator: {type: "word", name: "a"},
//    args: []}