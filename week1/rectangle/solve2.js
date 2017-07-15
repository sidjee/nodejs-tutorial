var argv =require('yargs')
	.usage('Usage: node $0 --l=[num] --b=[num]')
	.demand(['l','b'])
	.argv;

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

solve(argv.l,argv.b);