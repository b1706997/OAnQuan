function Chessman(type = null) {
	if(type) {
		// Quan
		this.value=10;
		this.name='quan';
	}
	else // Dan
	{
		this.name='dan';
		this.value=1;
	}
	return this;
}

function Square(type = null) {
	// FRONTEND
	this.nonDisplay = function() {
		// var thisDiv = document.getElementById(this.id);
		// thisDiv.innerHTML = "";
		// $('#'+this.id).empty();
		// $('#'+this.id).html("");
		
		// // document.getElementById(this.id).innerHTML="";
		// // $('#'+this.id).empty();
		// while (thisDiv.hasChildNodes()) {  
		// 	thisDiv.removeChild(thisDiv.firstChild);
		//   }
		// $('#'+this.id+' div').remove();
		// this.display();
		$('#'+this.id).empty();
	}
	// this.changeColor = function()
	// {
		
	// 	$('#'+this.id).empty();
	// }
	this.display = function()
	{
		for(var i = 0; i <this.array.length;i++)
		{
			if(this.array[i].value==10)
				this.createQuan();
			else
				this.createDan();
		}
	}
	this.createQuan = function()
	{
		// div_id = this.id;
  //   	var div = $('<div>');
  //   	div.css('background-color','red');
  //   	div.css('height','15px');
  //   	div.css('width','15px');
  //   	div.css('margin','3px');
  //   	div.css('display','inline');
  //   	$('#'+div_id).append(div);


    	var div = document.createElement("div");
    	var att = document.createAttribute('style');
    	att.value = "background-color:red;height:15px;width:15px;margin:3px;display:inline-block;"
    	div.setAttributeNode(att);
    	// div.style.background-color='red';
    	// div.style.margin = '3px';
    	// div.style.height = '15px';
    	// div.style.width = '15px';

    	document.getElementById(this.id).appendChild(div);
	}
	this.createDan = function()
	{
		// div_id = this.id;
  //   	var div = $('<div>');
  //   	div.css('background-color','blue');
  //   	div.css('height','10px');
  //   	div.css('width','10px');
  //   	div.css('margin','3px');
  //   	div.css('display','inline');

  //   	$('#'+div_id).append(div);

    	var div = document.createElement("div");
    	var att = document.createAttribute('style');
    	att.value = "background-color:blue;height:10px;width:10px;margin:3px;display:inline-block;"
    	div.setAttributeNode(att);
    	// div.style.background-color='blue';
    	// div.style.margin = '3px';
    	// div.style.height = '10px';
    	// div.style.width = '10px';
    	document.getElementById(this.id).appendChild(div);
	}
	// BACKEND
	this.totalValue=function() {
		var total = 0;
		for (var i = 0; i < this.array.length; i++) {
			total += this.array[i].value;
		}
		return total;
	}
	this.empty = function() { //Lam trong o duoc chon de rai quan
		this.array=[];
	}
	this.add = function() { //Them 1 quan
		var chessman = new Chessman();
		this.array.push(chessman);
	}
	this.containChess = function()
	{
		if(this.array.length==0)
			return false;
		else
			return true;
	}
	this.setId = function(id)
	{
		this.id=id;
	}
	this.array = [];
	this.id='';
	if (type) {
		var chessman = new Chessman(true);
		this.array.push(chessman);
	}
	else {
		for (var i = 0; i < 5; i++) {
			var chessman = new Chessman();
			this.array.push(chessman);
		}
	}
	
	return this;
}

function Player(name,playerDiv) {
	this.name = name;
	this.array=[];
	this.div = playerDiv;
	this.score = function()
	{
		var totalScore=0;
		for(var i=0;i<this.array.length;i++)
		{
			totalScore += this.array[i].value;
		}
		return totalScore;
	}
	this.an = function(square)
	{
		for(var i=0;i<square.array.length;i++)
			this.array.push(square.array[i]);
		
		square.empty();
	}
}
// function State(chess) {
// 	this.chess = ;
// }
function Chess(name1, name2,frame_id,playerdiv) {
	this.banco = [
		[new Square(true),new Square(),new Square(),new Square(),new Square(),new Square(),new Square(true)],
		[new Square(),new Square(),new Square(),new Square(),new Square()]
	];
	// this.currentPlayer = this.player1;
	this.player1 = new Player(name1,playerDiv);
	this.player2 = new Player(name2,playerDiv);
	this.currentTurn=1;
	this.init = function()
	{
		// assign id to Square
		var banco = this.banco;
		$('#'+frame_id+' div').each(function(){
			var a = parseInt($(this).attr('data-x'));
			var b = parseInt($(this).attr('data-y'));
			var id = $(this).attr('id');
			banco[a][b].setId(id);
		});
		// set playername
		$('#'+playerdiv+' .player1Div .playername').html(this.player1.name);
		$('#'+playerdiv+' .player2Div .playername').html(this.player2.name);
		// init score
		this.setScore();
		this.setCurrentMove();

		for(var i = 1 ; i<=5 ; i ++)
		{
			$('#'+this.banco[0][i].id).attr('class','o');
		}
		for(var i = 0 ; i<5 ; i ++)
		{
			$('#'+this.banco[1][i].id).attr('class','');
		}
	}
	this.setCurrentMove = function()
	{
		$('#'+playerdiv+' .playerTurn').html(this.currentPlayerMove().name);
	}
	this.setScore = function()
	{
		$('#'+playerdiv+' .player1Div .score').html(this.player1.score());
		$('#'+playerdiv+' .player2Div .score').html(this.player2.score());
	}
	this.currentPlayerMove = function()
	{
		if(this.currentTurn==1)
			return this.player1;
		else
			return this.player2;
	}
	this.init();
	this.findSquareId = function(html_id) {
		for(var i = 0 ; i < this.banco.length ; i++)
		{
			for(var j = 0;j<this.banco[i].length;j++)
			{
				if(this.banco[i][j].id===html_id)
					return result = {x:i,y:j};
			}
		}
	}
	this.reset = function()
	{
		this.empty();
		var a = new Chess(this.player1.name,this.player2.name,frame_id,playerdiv);
		this.banco = a.banco;
		this.player1 = a.player1;
		this.player2 = a.player2;
		this.currentTurn=a.currentTurn;
		this.display();
	}
	this.checkWin = function()
	{
		if(!this.banco[0][0].containChess() && !this.banco[0][6].containChess())
		{
			// find winning player
			// get all remain quan for player1
			for(var i = 1;i<=6;i++)
			{
				if(this.banco[0][i].containChess())
				{	
					for(var j=0;j<this.banco[0][i].length;j++)
						this.player1.array.push(this.banco[0][i]);
				}
			}
			// get all remain quan for player2
			for(var i = 0;i<=5;i++)
			{
				if(this.banco[1][i].containChess())
				{	
					for(var j=0;j<this.banco[1][i].length;j++)
						this.player2.array.push(this.banco[1][i]);
				}
			}
			// find which player have higher score
			if(this.player1.score()>this.player2.score())
				var winner = this.player1;
			else
				var winner = this.player2;
			var r = confirm("Game kết thúc, người chơi "+winner.name+" thắng");
			if(r==true)
				this.reset();
		}
		else
			return false;
	}
	this.move = function(x, y, d,callback) {
		var currentPlayer;
		var player = this.currentTurn;

		if (player==1)
			currentPlayer = this.player1;
		else
			currentPlayer = this.player2;
		var current = {x:x,y:y,d:d}; // doi tuong current chua 3 thuoc tinh: x,y la toa do ban co; d la huong di chuyen
		for (var i = 0; i < this.banco[x][y].array.length; i++) {
			current = this.next(current);
			this.banco[current.x][current.y].add();
		}
		this.banco[x][y].empty(); //Lam trong o duoc chon
		// wining check
		
		var next = this.next(current);
		if(this.conluot(next.x,next.y,next.d))
		{
			// this is the first time call
			this.move(next.x,next.y,next.d,true);
		}
		else
		{
			// xet tinh diem
			var nextnext = this.next(next);
			nextnext = this.banco[nextnext.x][nextnext.y];
			if(nextnext.containChess())
			{
				currentPlayer.an(nextnext);
			}
			this.controllSet();
		}
		if((x==0 && y==0) || (x==0&&y==6))
		{
			this.checkWin();
		}
		this.checkSide();
	}
	this.checkSide = function()
	{
		
	}
	this.controllSet = function ()
	{
		// enable side control for the current player turn
		if(this.currentTurn==1)
		{
			this.currentTurn=2;
			// disable player choose
			for(var i = 1 ; i<=5 ; i ++)
			{
				$('#'+this.banco[0][i].id).attr('class','');
			}
			for(var i = 0 ; i<5 ; i ++)
			{
				$('#'+this.banco[1][i].id).attr('class','o');
			}
		}
		else
		{
			this.currentTurn=1;
			for(var i = 0 ; i<=4 ; i ++)
			{
				$('#'+this.banco[1][i].id).attr('class','');
			}
			for(var i = 1 ; i<=5 ; i ++)
			{
				$('#'+this.banco[0][i].id).attr('class','o');
			}
		}

		// disable control for the Square that doesnt have chess in it
		for(var i=0;i<this.banco.length;i++)
			for(var j =0 ; j<this.banco[i].length;j++)
				if(!this.banco[i][j].containChess())
				{
					$('#'+this.banco[i][j].id).attr('class','');
				}
	}
	this.conluot = function(x,y,d) // return true false
	{
		if((x==0 && y==0) || (x==0 && y==6))
		{// vi tri hai dau
			if(this.banco[x][y].containChess())
				return false;
		}
		// var next = {x:x,y:y,d:d};
		// var nextnext = next(next);
		if(!this.banco[x][y].containChess())
			return false;


		return true;
	}
	this.next = function(array) {
		if (array.x==0 && array.y==0 && array.d==false) { 
			return result = {x:1,y:0,d:true};
		}
		if (array.x==1 && array.y==0 && array.d==false) { 
			return result = {x:0,y:0,d:true};
		}
		if (array.x==0 && array.y==6 && array.d==true) { 
			return result = {x:1,y:4,d:false};
		}
		if (array.x==1 && array.y==4 && array.d==true) { 
			return result = {x:0,y:6,d:false};
		}
		if (array.d) {
			return result = {x: array.x, y: array.y +1, d: array.d};
		} else {
			return result = {x: array.x, y: array.y -1, d: array.d};
		}
	}
	//FRONTEND
	this.display = function()
	{
		for(var i = 0;i<this.banco[0].length;i++)
		{
			this.banco[0][i].display();
		}
		for(var i = 0;i<this.banco[1].length;i++)
		{
			this.banco[1][i].display();
		}
	}
	this.empty = function()
	{
		// empty all
		for(var i = 0;i<this.banco[0].length;i++)
		{
			this.banco[0][i].nonDisplay();
		}
		for(var i = 0;i<this.banco[1].length;i++)
		{
			this.banco[1][i].nonDisplay();
		}
	}
	this.update = function()
	{
		// re-display
		this.empty();
		this.display();
		// update current player move and score
		this.setCurrentMove();
		this.setScore();
	}


	return this;

}