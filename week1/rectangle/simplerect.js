var rect={
	perimeter: function(x,y){return 2*(x+y);},
	area : function (x,y) {
		// body...
		return x*y;
	}
};

function solveRect(x,y) {
	// body...
	if (x>=0 && y>=0) {console.log("perimeter ="+rect.perimeter(x,y)+"area = "+rect.area(x,y));
}

	else
		console.log("error");
}
solveRect(2,3);
solveRect(-1,2);
