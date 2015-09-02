if(typeof cheatas == "undefined")
{
	var cheatas = new Object();
}

cheatas.Dictionary = function() 
{
	this.keys = new Array();
	this.values = new Array();

}

cheatas.Dictionary.prototype =
{
	reset: function()
	{
		this.keys = [];
		this.values = [];
	},
    
	setValue: function(key, value)
	{
		this.keys.push(key);
		this.values.push(value);
	},

	removeValue: function(key)
	{
		var idx = this.keys.indexOf(key);

		delete this.keys[idx];
		delete this.values[idx];
    },

	getValue: function(key)
	{
		var idx = this.keys.indexOf(key);

		if(idx == -1)
		{
			return null;
		}
		else
		{
			return this.values[idx];
		}
	}
}

cheatas.MouseWheel= function(element, fn) 
{
	var that = this;

	this.element = element;
	this.fn = fn;

	cheatas.lib.addEventListener(element, "mouseover", function (e){ that.giveFocus();})
	cheatas.lib.addEventListener(element, "mouseout", function (e){ that.removeFocus();})
}

cheatas.MouseWheel.prototype =
{
	giveFocus: function() {
		
		//document.body.style.overflow="hidden";
		var that = this;

		if (window.addEventListener)
		{
			window.addEventListener('DOMMouseScroll', that.removeFocus , false);
		}

		/*
		if (document.createEventObject)
		{
			window.attachEvent("onmousewheel",function (e){that.handleMousewheel(e);});
			document.attachEvent("onmousewheel",function (e){that.handleMousewheel(e);});
		}
		else
		{
			window.addEventListener("mousewheel",function (e){ that.handleMousewheel(e);});
			document.addEventListener("mousewheel",function (e){ that.handleMousewheel(e);});
		}
		*/

		//cheatas.lib.addEventListener(window,"mousewheel",function (e){ that.handleMousewheel(e);});
		//cheatas.lib.addEventListener(document,"mousewheel",function (e){ that.handleMousewheel(e);})
		window.onmousewheel = document.onmousewheel = function (e){ that.handleMousewheel(e);};
	},

	handleMousewheel: function(e) 
	{
		var event = e ? e : window.event;
		var delta = 0;

		(event.preventDefault) ? event.preventDefault() : event.returnValue = false; 

		if (event.wheelDelta)
		{
			delta = event.wheelDelta / 120;

			if (window.opera)
			{
				delta = -delta;
			}
		}
		else if (event.detail) 
		{
			delta = -event.detail/3;
		}
        
		this.fn.apply(this.element, [event, delta]);
	},

	removeFocus: function(el)
	{
		//document.body.style.overflow="auto";
		var that =this;
		
		if (window.removeEventListener)
		{
			window.removeEventListener('DOMMouseScroll', that.removeFocus , false);
		}

		window.onmousewheel = document.onmousewheel = null;  
	}
}

cheatas.GestureElement = function(view, delegate, isVertical, isHorizontal) 
{
	if(isVertical === undefined)
	{
		isVertical = true;
	}

	if(isHorizontal === undefined)
	{
		isHorizontal = true;
	}

	this.view = view;
	this.delegate = delegate;
	this.isHorizontal = isHorizontal;
	this.isVertical = isVertical;

	this.moveType = -1;
    this.startPosA = new Array();
	this.changePosA = new Array();
	this.movePosA = new Array();

	this.startTime = 0;
	this.endTime = 0;

	this.startRotate = null;
	this.changeRotate = 30;

	this.longTime = 1000;
	this.changeMin = 3;
	this.changeMax = 15;

	this.isAndroid = cheatas.lib.isAndroid();
	
	this.addEvent();
}

cheatas.GestureElement.START = "GestureElement.START";  
cheatas.GestureElement.MOVE = "GestureElement.MOVE";
cheatas.GestureElement.MOVE_V = "GestureElement.MOVE_V";
cheatas.GestureElement.MOVE_H = "GestureElement.MOVE_H";
cheatas.GestureElement.END = "GestureElement.END";
cheatas.GestureElement.CANCLE = "GestureElement.CANCLE";

cheatas.GestureElement.LONG_TOUCH = "GestureElement.LONG_TOUCH";
cheatas.GestureElement.TOUCH = "GestureElement.TOUCH";

cheatas.GestureElement.PAN = "GestureElement.PAN";
cheatas.GestureElement.PAN_RIGHT = "GestureElement.PAN_RIGHT";
cheatas.GestureElement.PAN_LEFT = "GestureElement.PAN_LEFT";
cheatas.GestureElement.PAN_UP = "GestureElement.PAN_UP";
cheatas.GestureElement.PAN_DOWN = "GestureElement.PAN_DOWN";

cheatas.GestureElement.PINCH_MOVE = "GestureElement.PINCH_MOVE";
cheatas.GestureElement.PINCH_RIGHT = "GestureElement.PINCH_RIGHT";
cheatas.GestureElement.PINCH_LEFT = "GestureElement.PINCH_LEFT";
cheatas.GestureElement.PINCH_UP = "GestureElement.PINCH_UP";
cheatas.GestureElement.PINCH_DOWN = "GestureElement.PINCH_DOWN";

cheatas.GestureElement.PINCH_GESTURE = "GestureElement.PINCH_GESTURE";
cheatas.GestureElement.PINCH_IN = "GestureElement.PINCH_IN";
cheatas.GestureElement.PINCH_OUT = "GestureElement.PINCH_OUT";
cheatas.GestureElement.PINCH_ROTATE = "GestureElement.PINCH_ROTATE";

cheatas.GestureElement.prototype =
{
	addEvent:function()
	{
		var that = this;

		cheatas.lib.addEventListener(this.view, "touchstart", function(e) {that.touchStart(e);});
		cheatas.lib.addEventListener(this.view, "touchmove", function(e) {that.touchMove(e);});
		cheatas.lib.addEventListener(this.view, "touchend", function(e) {that.touchEnd(e);});
		cheatas.lib.addEventListener(this.view, "touchcancel", function(e) {that.touchEnd(e);});
		// cheatas.lib.addEventListener(this.view, "webkitTransitionEnd", function(e) {that.touchEnd(e);});
		// cheatas.lib.addEventListener(this.view, "msTransitionEnd", function(e) {that.touchEnd(e);});
		// cheatas.lib.addEventListener(this.view, "oTransitionEnd", function(e) {that.touchEnd(e);});
		// cheatas.lib.addEventListener(this.view, "transitionend", function(e) {that.touchEnd(e);});
    },

	removeEvent:function()
	{
        var that=this;

		cheatas.lib.removeEventListener(this.view, "touchstart", function (e){that.touchStart(e);});
		cheatas.lib.removeEventListener(this.view, "touchmove", function (e){that.touchMove(e);});
		cheatas.lib.removeEventListener(this.view, "touchend", function (e){that.touchEnd(e);});
		cheatas.lib.removeEventListener(this.view, "touchcancel", function (e){that.touchEnd(e);});
		// cheatas.lib.removeEventListener(this.view, "webkitTransitionEnd", function(e) {that.touchEnd(e);});
		// cheatas.lib.removeEventListener(this.view, "msTransitionEnd", function(e) {that.touchEnd(e);});
		// cheatas.lib.removeEventListener(this.view, "oTransitionEnd", function(e) {that.touchEnd(e);});
		// cheatas.lib.removeEventListener(this.view, "transitionend", function(e) {that.touchEnd(e);});
	},

	touchStart:function(e)
	{
		var touch = null;
		var now = null;

		this.moveType = -1
		this.startPosA = new Array();
		this.changePosA = new Array();

		for(var i=0; i < e.touches.length; ++i)
		{
			touch = e.touches[i]; 
			this.startPosA[i] = new cheatas.Point(touch.pageX, touch.pageY);
			this.changePosA[i] = new cheatas.Point(0, 0);
		}

		now = new Date();
	    this.startTime = now.getTime();
		this.startRotate = null;

		cheatas.lib.excuteDelegate(this.delegate, "stateChange", [cheatas.GestureElement.START, this.startPosA[0]]);
	},

	touchMove:function(e)
	{
		var touch;
		var start;
		var change;
		var len = e.touches.length;

		this.movePosA = new Array();
		this.checkEvent(false);
		
		if(len == this.startPosA.length)
		{
			for(var i = 0; i < len; ++i)
			{
				touch = e.touches[i]; 
				this.movePosA[i] = new cheatas.Point(touch.pageX, touch.pageY);
				start = this.startPosA[i];
				change = this.changePosA[i];
				change.x = touch.pageX - start.x;
				change.y = touch.pageY - start.y;
			}

			change = this.changePosA[0];
			
			if(Math.abs(change.x) > Math.abs(change.y))
			{
				if(this.isHorizontal == true)
				{
					e.preventDefault();
				}

				if(this.moveType == -1)
				{
					this.moveType = 1; // 가로이동
				}

				if(this.isHorizontal == true && this.moveType == 1)
				{
					cheatas.lib.excuteDelegate(this.delegate, "stateChange", [cheatas.GestureElement.MOVE_H, this.changePosA[0]]);
				}
			}
			else if(Math.abs(change.x) < Math.abs(change.y))
			{
				if(this.isVertical == true)
				{
					e.preventDefault();
				}

				if(this.moveType == -1)
				{
					this.moveType = 0; // 세로이동
				}
				
				if(this.isVertical == true && this.moveType == 0)
				{
					cheatas.lib.excuteDelegate(this.delegate, "stateChange", [cheatas.GestureElement.MOVE_V, this.changePosA[0]]);
				}
			}

			cheatas.lib.excuteDelegate(this.delegate, "stateChange", [cheatas.GestureElement.MOVE, this.changePosA[0]]);
		}
		else
		{
			cheatas.lib.excuteDelegate(this.delegate, "stateChange", [cheatas.GestureElement.CANCLE]);
		}
	},

    touchEnd: function(e)
	{
		var now = null;

		now = new Date();
		this.endTime = now.getTime(); 
		this.checkEvent(true);

		cheatas.lib.excuteDelegate(this.delegate, "stateChange", [cheatas.GestureElement.END, this.changePosA[0]]);
	},
	
	checkEvent: function(isComplete)
	{
		var spdMD = 200;
		var moveMD = 0;
		var start;
		var move;
		var change;
		var gestureTime = 0;

		if(this.startPosA.length != this.movePosA.length && isComplete == false)
		{
			//cheatas.lib.excuteDelegate(this.delegate, "stateChange", [cheatas.GestureElement.CANCLE]);
			return;
		}

		if(isComplete == true)
		{
			gestureTime = this.endTime - this.startTime;
		}

		if(this.startPosA.length == 1)
		{
			if(isComplete == true)
			{
			   change = this.changePosA[0];

				if(gestureTime >= this.longTime)
				{
					if(Math.abs(change.x) < this.changeMin && Math.abs(change.y) < this.changeMin)
					{
						cheatas.lib.excuteDelegate(this.delegate, "gestureComplete", [cheatas.GestureElement.LONG_TOUCH]);
					}
				}

				if(this.moveType == 1) // 가로이동이면
				{
					moveMD = change.x / (gestureTime / spdMD); // 빨리 터치하면 가중치를 곱함

					if(moveMD > this.changeMax)
					{
						cheatas.lib.excuteDelegate(this.delegate, "gestureComplete", [cheatas.GestureElement.PAN_RIGHT]);
					}
					else if(moveMD < -this.changeMax)
					{
						cheatas.lib.excuteDelegate(this.delegate, "gestureComplete", [cheatas.GestureElement.PAN_LEFT]);
					}
				}

				if(this.moveType == 0) // 세로이동이면
				{
					moveMD = change.y / (gestureTime / spdMD); // 빨리 터치하면 가중치를 곱함
				
					if(moveMD > this.changeMax)
					{
						cheatas.lib.excuteDelegate(this.delegate, "gestureComplete", [cheatas.GestureElement.PAN_DOWN]);
					}
					else if(moveMD < -this.changeMax)
					{
						cheatas.lib.excuteDelegate(this.delegate, "gestureComplete", [cheatas.GestureElement.PAN_UP]);
					}
				}

				if(Math.abs(change.x) < this.changeMin && Math.abs(change.y) < this.changeMin)
				{
					start = this.startPosA[0];
					cheatas.lib.excuteDelegate(this.delegate, "gestureComplete", [cheatas.GestureElement.TOUCH, start]);
				}
			}
			else
			{
				if(Math.abs(change.x) > this.changeMin || Math.abs(change.y) > this.changeMin)
				{
					cheatas.lib.excuteDelegate(this.delegate, "gestureChange", [cheatas.GestureElement.PAN, change]);
				}
			}

		}
		else if(this.startPosA.length == 2) // 멀티터치이면
		{
			change = this.changePosA[0];
			start = this.startPosA[0];
			move = this.movePosA[0];

			var change2 = this.changePosA[1];
			var start2 = this.startPosA[1];
			var move2 = this.movePosA[1];
                
			var startDist = Math.sqrt((Math.abs(start.x - start2.x) ^ 2) + (Math.abs(start.y - start2.y) ^ 2));
			var moveDist = Math.sqrt((Math.abs(move.x - move2.x) ^ 2) + (Math.abs(move.y - move2.y) ^ 2));
			var dist = moveDist - startDist;

			var rotate = 0;

			if(this.delegate.rotateChange !== undefined)
			{
				var w = 0;
				var h = 0;

				if(this.startRotate == null)
				{
					w = start.x - start2.x;
					h = start.y - start2.y;
					this.startRotate = Math.atan2(h, w) / Math.PI*360;
				}

				w = move.x - move2.x;
				h = move.y - move2.y;
				rotate = Math.atan2(h, w) / Math.PI*360;

				cheatas.lib.excuteDelegate(this.delegate, "rotateChange", [rotate]);

				if(isComplete == true && (this.startRotate - rotate) > this.changeRotate)
				{
					cheatas.lib.excuteDelegate(this.delegate, "gestureComplete", [cheatas.GestureElement.PINCH_ROTATE]);  
				}
			}

			if(isComplete == true)
			{
				if(Math.abs(dist) > this.changeMin)
				{
					if(dist > 0)
					{
						cheatas.lib.excuteDelegate(this.delegate, "gestureComplete", [cheatas.GestureElement.PINCH_OUT]);
					}
					else
					{
						cheatas.lib.excuteDelegate(this.delegate, "gestureComplete", [cheatas.GestureElement.PINCH_IN]);
					}
				}
				else 
				{
					if(this.moveType == 1) // 가로이동이면
					{
						moveMD = change.x / (gestureTime / spdMD);

						if(moveMD > this.changeMax)
						{
							cheatas.lib.excuteDelegate(this.delegate, "gestureComplete", [cheatas.GestureElement.PINCH_RIGHT]);
						}
						else if(moveMD < -this.changeMax)
						{
							cheatas.lib.excuteDelegate(this.delegate, "gestureComplete", [cheatas.GestureElement.PINCH_LEFT]);
						}
					}

					if(this.moveType == 0) // 세로이동이면
					{
						moveMD = change.y / (gestureTime / spdMD);

						if(moveMD > this.changeMax)
						{
							cheatas.lib.excuteDelegate(this.delegate, "gestureComplete", [cheatas.GestureElement.PINCH_DOWN]);
						}
						else if(moveMD < -this.changeMax)
						{
							cheatas.lib.excuteDelegate(this.delegate, "gestureComplete", [cheatas.GestureElement.PINCH_UP]);
						}
					}
				}
			}
			else
			{
				if(Math.abs(dist) > this.changeMin)
				{
					cheatas.lib.excuteDelegate(this.delegate, "gestureChange", [cheatas.GestureElement.PINCH_GESTURE]);  
				}
				else 
				{
					cheatas.lib.excuteDelegate(this.delegate, "gestureChange", [cheatas.GestureElement.PINCH_MOVE]);
				}
			}
		}
	}
}

cheatas.Rectangle = function(_x, _y, _width, _height) 
{
	this.x = Number(_x);
	this.y = Number(_y);
	this.width = Number(_width);
	this.height = Number(_height);
	this.toString = "x : " + this.x + " y : " + this.y + " w : " + this.width + " h : " + this.height;
}

cheatas.Point = function(_x, _y) 
{
	this.x = Number(_x);
	this.y = Number(_y);
	this.toString = "x : " + this.x + " y : " + this.y;
}

var Dictionary = cheatas.Dictionary;
var MouseWheel = cheatas.MouseWheel;
var GestureElement = cheatas.GestureElement;
var Rectangle = cheatas.Rectangle;
var Point = cheatas.Point;