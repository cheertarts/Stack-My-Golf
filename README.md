# Stack-My-Golf
Stack My Golf is a stack programming language designed for code golf. Requires Node.

# Usage
* This language reads every character as a function call.
* The command line arguments are added to the stack in the beginning.
* The top of the stack is always printed after the program is finished.

Therefore,

    (Hello, world!)

is the program to print "Hello, world!". Given that, to add a string to the stack you use open and closing parenthesis. Comments are written like this:

    (This is a comment.)_

These are a list of commands:

    $ (Duplicates the top of the stack.)_
    : (Flips the top two items of the stack.)_
    _ (pops the top of the stack.)_
    ; (adds the stack to the top of the stack as a list.)_
    
    + (converts the top two strings into numbers and adds them.)_
    - (converts the top two strings into numbers and subtracts them.)_
    * (converts the top two strings into numbers and multiplies them.)_
    / (converts the top two strings into numbers and divides them.)_
    % (converts the top two strings into numbers and finds the modulus.)_
    
    = (checks if top two values are equal.)_
    < (checks if top value is less than the second value.)_
    > (checks if top value is greater than the second value.)_
    ` (gives if top value is a string.)_
    @ (gives _ index of string/list.)_
    # (gives length of string/list.)_
    , (concats strings/lists.)_
    ' (adds item into one item list.)_
    
    ? (acts as an if statement, where the third value on the stack will execute the second string of the stack if it is true and will execute the third string on the stack if it is false.)_
    ! (executes top string of the stack.)_
    . (defines top of the stack (single character) as the second value of the stack.)_
    \ (defines top of the stack (single character) as a function that executes the second string of the stack.)_
    { (pops the top of the variable stack.)_
    } (pops the top of the function stack.)_
    " (creates a new symbol (variable that is a string rather than a single character) which is defined by the top two values of the stack.)_
    ^ (pops the top of the symbols stack.)_
    [ (gets the top of the stacks symbol value.)_
    ] (gets the top of the stacks symbol value and then executes it.)_

All whitespace is removed.


It's important to understand that there are only two types. Strings and lists. Lists are defined very strangely. Here is a list of 1-20.

    1'2',3',4',5',6',7',8',9',A',B',C',D',E',F',G',H',I',J',K',

Remember that , will concatenate two lists and ' will create a one-item list. Also know that A-Z is shorthand for (10)-(35). Because the list syntax is so weird, its recommended to use strings the majority of the time:

    (123456789ABCDEFGHIJK)

Where it can be defined like:

    (123456789ABCDEFGHIJK)l.

And indexed like:

    lE@!

Which returns E. This is what is happening broken down,

    l
      stack = ["123456789ABCDEFGHIJK"]
    E
      stack = ["123456789ABCDEFGHIJK", "14"]
    @
      stack = ["E"]
    !
      stack = ["14"]

note that the ! is only to convert a possible letter gotten from the string into its number value. It is not necessary to index most strings.


Along with types, there are also different type stacks. 4 stacks exist by default, the argument stack, which is the one you work with most often and most directly, the variable stack, which stores all variables and there values, the function stack, which stores all functions and there executions, and the symbol stack which stores variables longer than a single character. The variable stack is the simplest, and can be used like this:

    4c. (sets c as 4.)_
    c5+ (-> 9)_

And, for the most part, this can be used for everything. In order to create functions you could just do the following:

    (5+)d.
    4d! (-> 9)_

However, we have to first add the string to the stack (5+) and then execute it with ! (which executes the top string of the stack). In order to make the interpreter do this for us, we have the function stack. It works like this:

    (5+)d\
    4d (-> 9)_

Where \ defines a function. It's the same as the variable stack, but 1. it has a seperate stack, so its easier to handle functions, and 2. Functions are automatically executed for us by the interpreter. Finally, the symbol stack exists just to define strings (and not single characters) as variables. It works like this:

    23+(2+3)"
    X(2+3)[*

To use a simple as a function, you use the closing square bracket instead of the open one. Like this:

    (Y*)(34*)"
    2(34*)]

# Examples

A simple program which adds 5 and then multiplies 4 to the argument:

    5+4*

A program for finding the factorial of the argument:

    ($0=(_1)($1-f*)?)f\f

In which:

    (    (Beginning of a string.)_
    $    (Copies the value on the stack.)_
    0    (Adds 0 to the stack.)_
    =    (Checks if the value copied on the stack and zero are equal.)_
    ? (Way later...)_ (if the value on the stack = 0, do the first thing. else do the second.)_
    (    (Beginning of a string.)_
    _    (Pops the value on the stack given as an argument.)_
    1    (Adds 1 to the stack; basically returning 1 from the function.)_
    )    (Ends the string.)_
    (    (Begins the second string (for the second part of the if statement.))_
    $    (Copies the value on the stack given as an argument.)_
    1    (Adds 1 to the stack.)_
    -    (Subtracts the argument and 1.)_
    f    (Finds the factorial of the argument - 1.)_
    *    (Multiplies the number with the factorial of the number - 1.)_
    )    (Ends the string (ending the function.))_

    f    (Adds character f to the stack (not yet defined))_
    \    (Sets character f to function before it.)_
    f    (Runs the function f with the argument given as input.)_

Fibonacci:

    ($0=(_1)($1=(_1)($1-b:2-b+)?)?)b\b
