
var fs = require('fs');

function validVar(varName) {
  if (varName.length > 1) {
    return false;
  }
  if (['0','1','2','3','4','5','6','7','8','9'].indexOf(varName) > -1) {
    return false;
  }
  return true;
}

function assocIndex(assoc, index) {
  for (var i = assoc.length - 1; i >= 0; --i) {
    if (assoc[i][0] === index) {
      return assoc[i][1];
    }
  }
  return null;
}

function eval(string, stack, defs, funs, syms) {
  if (stack === undefined) {
    stack = [];
  }
  if (defs === undefined) {
    defs = [];
  }
  if (funs === undefined) {
    funs = [];
  }
  if (syms === undefined) {
    syms = [];
  }
  var value, tmp, arg1, arg2, arg3, ref;
  for (var i = 0; i < string.length; ++i) {
    switch (string[i]) {
    case '$':
      stack.push(stack[stack.length - 1]);
      break;
    case ':':
      tmp = stack[stack.length - 1];
      stack[stack.length - 1] = stack[stack.length - 2];
      stack[stack.length - 2] = tmp;
      break;
    case '_':
      stack.pop();
      break;
    case ';':
      stack.push(stack);
      break;

    case '+':
      arg2 = Number(stack.pop());
      arg1 = Number(stack.pop());
      stack.push(String(arg1 + arg2));
      break;
    case '-':
      arg2 = Number(stack.pop());
      arg1 = Number(stack.pop());
      stack.push(String(arg1 - arg2));
      break;
    case '*':
      arg2 = Number(stack.pop());
      arg1 = Number(stack.pop());
      stack.push(String(arg1 * arg2));
      break;
    case '/':
      arg2 = Number(stack.pop());
      arg1 = Number(stack.pop());
      stack.push(String(arg1 / arg2));
      break;
    case '%':
      arg2 = Number(stack.pop());
      arg1 = Number(stack.pop());
      stack.push(String(arg1 % arg2));
      break;
   
    case '=':
      arg2 = stack.pop();
      arg1 = stack.pop();
      if (arg1 === arg2) {
        stack.push('t');
      } else {
        stack.push('f');
      }
      break;
    case '<':
      arg2 = Number(stack.pop());
      arg1 = Number(stack.pop());
      if (arg1 < arg2) {
        stack.push('t');
      } else {
        stack.push('f');
      }
      break;
    case '>':
      arg2 = Number(stack.pop());
      arg1 = Number(stack.pop());
      if (arg1 > arg2) {
        stack.push('t');
      } else {
        stack.push('f');
      }
      break;

    case '`':
      if (typeof(stack.pop()) === 'string') {
        stack.push('t');
      } else {
        stack.push('f');
      }
      break;
    case '@':
      arg2 = stack.pop();
      arg1 = Number(stack.pop());
      stack.push(arg2[arg1]);
      break;
    case '#':
      stack.push(stack.pop().length);
      break;
    case ',':
      arg2 = stack.pop();
      arg1 = stack.pop();
      stack.push(arg1.concat(arg2));
      break;
    case '\'':
      stack.push([stack.pop()]);

    case '?':
      arg3 = stack.pop();
      arg2 = stack.pop();
      arg1 = stack.pop();
      if (arg1 === 't') {
        eval(arg2, stack, defs, funs, syms);
      } else if (arg1 === 'f') {
        eval(arg3, stack, defs, funs, syms);
      } else {
        console.error("Error: 't' or 'f' not given to ? statement.");
        process.exit(1);
      }
      break;
    case '!':
      eval(stack.pop(), stack, defs, funs, syms);
      break;
    case '.':
      arg2 = stack.pop();
      arg1 = stack.pop();
      if (validVar(arg2)) {
        defs.push([arg2, arg1]);
      } else {
        console.error("Error: invalid variable name.");
        process.exit(2);
      }
      break;
    case '\\':
      arg2 = stack.pop();
      arg1 = stack.pop();
      if (validVar(arg2)) {
        funs.push([arg2, arg1]);
      } else {
        console.error("Error: invalid function name.");
        process.exit(2);
      }
      break;
    case '{':
      defs.pop();
      break;
    case '}':
      funs.pop();
      break;
    case '"':
      arg2 = stack.pop();
      arg1 = stack.pop();
      syms.push([arg2, arg1]);
      break;
    case '^':
      syms.pop();
      break;
    case '[':
      value = assocIndex(syms, stack.pop());
      if (value !== null) {
        stack.push(value);
      } else {
        console.error("Error: indexed undefined symbol.");
        process.exit(3);
      }
      break;
    case ']':
      value = assocIndex(syms, stack.pop());
      if (value !== null) {
        eval(value, stack, defs, funs, syms);
      } else {
        console.error("Error: indexed undefined symbol.");
        process.exit(3);
      }
      break;

    case '(':
      ref = 1;
      tmp = "";
      while (ref > 0) {
        i += 1;
        if (i >= string.length) {
          console.error("Error: Did not enclose string.");
          process.exit(4);
        } else if (string[i] === ')') {
          ref -= 1;
          if (ref > 0) {
            tmp += ')';
          }
        } else if (string[i] === '(') {
          ref += 1;
          tmp += '(';
        } else {
          tmp += string[i];
        }
      }
      stack.push(tmp.replace(/\\n/g, "\n"));
      break;

    case '0': stack.push('0'); break;
    case '1': stack.push('1'); break;
    case '2': stack.push('2'); break;
    case '3': stack.push('3'); break;
    case '4': stack.push('4'); break;
    case '5': stack.push('5'); break;
    case '6': stack.push('6'); break;
    case '7': stack.push('7'); break;
    case '8': stack.push('8'); break;
    case '9': stack.push('9'); break;
    case 'A': stack.push('10'); break;
    case 'B': stack.push('11'); break;
    case 'C': stack.push('12'); break;
    case 'D': stack.push('13'); break;
    case 'E': stack.push('14'); break;
    case 'F': stack.push('15'); break;
    case 'G': stack.push('16'); break;
    case 'H': stack.push('17'); break;
    case 'I': stack.push('18'); break;
    case 'J': stack.push('19'); break;
    case 'K': stack.push('20'); break;
    case 'L': stack.push('21'); break;
    case 'M': stack.push('22'); break;
    case 'N': stack.push('23'); break;
    case 'O': stack.push('24'); break;
    case 'P': stack.push('25'); break;
    case 'Q': stack.push('26'); break;
    case 'R': stack.push('27'); break;
    case 'S': stack.push('28'); break;
    case 'T': stack.push('29'); break;
    case 'W': stack.push('30'); break;
    case 'X': stack.push('31'); break;
    case 'Y': stack.push('32'); break;
    case 'Z': stack.push('33'); break;

    case '\n': case '\t': case '\s': case ' ':
      break;

    default:
      value = assocIndex(funs, string[i]);
      if (value === null) {
        value = assocIndex(defs, string[i]);
        if (value === null) {
          stack.push(string[i]);
        } else {
          stack.push(value);
        }
      } else {
        eval(value, stack, defs, funs, syms);
      }
      break;
    }
  }
}

var args = [];
for (var i = process.argv[0] === 'node' ? 2 : 1; i < process.argv.length; ++i) {
  args.push(process.argv[i]);
}

fs.readFile(args[1], 'utf8', function (err, data) {
  if (err) {
    return console.error(err);
  }
  var stack = [];
  if (args.length > 2) {
    stack = args.slice(2);
  }
  eval(data, stack);
  console.log(stack[stack.length - 1]);
});

