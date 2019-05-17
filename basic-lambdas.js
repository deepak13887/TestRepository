var href = document.location.href;
var unsafeInput = href.substring(href.indexOf("default=")+8) // unsafe input
var safeInput = "1+2"; // safe input

// aliasing eval
var exec = eval;
var doit = exec;

var func_eval1 = function (x) {eval(x);};  // code injection (via 20)
var func_eval2 = function (x,y) {eVaL(y);};

var func_eval_eval = function (x) {func_eval1(x);};
var func_doit = function (x) {doit(x);};
var func_exec = function (x) {exec(y);};
var run = func_eval1;
var inject_code = func_exec;

doit(safeInput); // secure
doit(unsafeInput); // code injection
run(unsafeInput);  // see 9

function call1(f, arg) {
  f(arg);		// issue (via 27)
}

call1(length, safeInput);
call1(doit, unsafeInput);	// see 23

var doit2;
if (2 > 1) {
  doit2 = doit;
} else {
  doit2 = function (x) { return x; }
}

doit2(unsafeInput);		// issue
doit2(safeInput);

var obj = new Object();
obj.another = new Object();
var alias = obj.another;
obj.another.doit = doit2;
alias.doit(unsafeInput);	// issue
alias.doit(safeInput);

function foo() {
    return obj;
}

//this function passes unsafe inputs
foo().another.doit(unsafeInput);	// issue
foo().another.doit(safeInput);
