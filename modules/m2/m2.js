/// current year
/// birth year
/// calculate the age(s)

var date = new Date();
var currentYear = date.getFullYear();
var currentMonth = date.getMonth() + 1;
var currentDay = date.getDate();

console.log(currentYear, currentMonth, currentDay);
// var birthYear = 2004;
console.log("before prompt");
var birthYear = prompt("please enter your birth year as a number");
var birthMonth = prompt("please enter your birth month as a number");
var birthDay = prompt("please enter your day of birth as a number")
console.log(birthYear, birthMonth, birthDay);

var age = currentYear-Number(birthYear); /// this will relate to assignment 1

var age2 = age-1;
/// both imlpicit and explicit coercion occur in the line below
var message = "You are either "+String(age)+" or "+age2+" years old"

if(birthMonth > currentMonth){
    message = "your birthday has not happened, you are "+age2+" years old"
} else if(birthMonth < currentMonth){
    message = "your birthday has happened, you are "+age+" years old"
} else
    //message = "your birthday is this month, you are either "+age+" or "+age2+" years old"
    if(birthDay > currentDay){
        message = "your birthday is this month but has not happened, you are "+age2+" years old"
} else if(birthDay < currentDay){
        message = "your birthday is this month and has passed, you are "+age+" years old"
} else {
        message = "Happy Birthday, your birthday is today. You are "+age+" years old"
}

// console.log(typeof(age));
console.log(message);









console.log("module 2");