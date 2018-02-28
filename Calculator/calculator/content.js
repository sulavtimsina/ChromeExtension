alert("Hello from Sulav");
var firstHref = $("a[href^='http']").eq(0).attr("href");

console.log(firstHref);