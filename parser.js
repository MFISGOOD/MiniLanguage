// parseExpression uses three regular expressions
// to spot the three simple (atomic) elements that miniLanguage supports:
// strings, numbers, and words. The parser constructs a 
// different kind of data structure depending on which one matches.
//  If the input does not match one of these three forms, 
//  it is not a valid expression, and the parser throws an error.
// SyntaxError is a standard error object type, which is raised 
// when an attempt is made to run\ an invalid JavaScript program

function parseExpression(program) {
  program = skipSpace(program);
  var match, expr;
  if (match = /^"([^"]*)"/.exec(program))
    expr = {type: "value", value: match[1]};
  else if (match = /^\d+\b/.exec(program))
    expr = {type: "value", value: Number(match[0])};
  else if (match = /^[^\s(),"]+/.exec(program))
    expr = {type: "word", name: match[0]};
  else
    throw new SyntaxError("Unexpected syntax: " + program);
// We can then cut off the part that we matched from the program string
//  and pass that, along with the object for the expression, 
//  to parseApply, which checks whether the expression is an application.
//  If so, it parses a parenthesized list of arguments.
  return parseApply(expr, program.slice(match[0].length));
}

function skipSpace(string) {
  var first = string.search(/\S/);
  if (first == -1) return "";
  return string.slice(first);
}

function parseApply(expr, program) {
  program = skipSpace(program);
  if (program[0] != "(")
    return {expr: expr, rest: program};
  program = skipSpace(program.slice(1));
  expr = {type: "apply", operator: expr, args: []};
  while (program[0] != ")") {
    var arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = skipSpace(arg.rest);
    if (program[0] == ",")
      program = skipSpace(program.slice(1));
    else if (program[0] != ")")
      throw new SyntaxError("Expected ',' or ')'");
  }
  return parseApply(expr, program.slice(1));
}

// This is all we need to parse miniLanguage. 
// We wrap it in a convenient parse function 
// that verifies that it has reached the end of the input string after parsing the expression
//  (an miniLanguage program is a single expression),
//   and that gives us the program’s data structure.
function parse(program) {
  var result = parseExpression(program);
  if (skipSpace(result.rest).length > 0)
    throw new SyntaxError("Unexpected text after program");
  return result.expr;
}
