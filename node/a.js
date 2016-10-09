var reduce = function(f, start, array) {
	var acc = start;
	for (var i = 0; i < array.length; ++i)
		acc = f(array[i], acc);
	return acc;
};

var add = function(x, y){
	return x + y;
};

var values = [1, 2, 3, 4, 5];
var sumOfValues = reduce(add, 0, values);
console.log(sumOfValues);