var rect= require('./simplerect2');
function solve(x,y) {
	// body...
	rect(x,y,function (err,rectangle){
		if (err)
			console.log(err);
		else{
			console.log("Perimeter is "+ rectangle.perimeter() + " Area is "+ rectangle.area());
		}
	});
};

solve(2,3);
solve(-2,3);