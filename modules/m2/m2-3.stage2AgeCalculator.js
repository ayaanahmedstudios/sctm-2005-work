/// current year
/// birth year
/// calculate the age(s)

var currentYear = 2026;
// var birthYear = 2004;
console.log("before prompt");
var birthYear = prompt("please enter your birth year as a number");
console.log(typeof(birthYear));

var age = currentYear-Number(birthYear); /// this will relate to assignment 1

var age2 = age-1;
/// both imlpicit and explicit coercion occur in the line below
var message = "You are either "+String(age)+" or "+age2+" years old"

console.log(typeof(age));
console.log(message);









console.log("module 2");