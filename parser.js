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

  return parseApply(expr, program.slice(match[0].length));
}

function skipSpace(string) {
  var first = string.search(/\S/);
  if (first == -1) return "";
  return string.slice(first);
}