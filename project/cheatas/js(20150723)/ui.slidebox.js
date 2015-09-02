if(cheatas == null)
{
	var cheatas = new Object();
}

cheatas.UISlideBoxOption = function()
{
	this.slideSpd = 0.2;
	this.isHorizontal = true;
	this.isVertical = false;
}

cheatas.UISlideBox = function(delegate, option) 
{
    if(delegate == null)
	{
		delegate = null;
	}

	if(option === null)
	{
		option = new cheatas.UISlideBoxOption();
	}

	this.delegate = delegate;
	this.option = option;
	this.slideSpd = this.option.slideSpd;
	this.isHorizontal = this.option.isHorizontal;
	this.isVertical = this.option.isVertical;
    this.pageSeq = 0;
	this.pageLength = 0;
	this.currentDirection = 0;
    this.finalGesture = "";
	this.isMoveable = false;
	this.isTouched = false;
	this.isMoving = false;
	this.isDirectControl = false;
    this.isAniMode = false;

	this.nodes = new Object();
	this.nodes.body = cheatas.lib.createElement("div", "", "");
	this.nodes.loading = cheatas.lib.createElement("div", "", "animated loading");
    this.nodes.view = null;
	this.nodes.currentView = null;
    this.nodes.nextView = null;
}

cheatas.UISlideBox.prototype = 
{
	init: function() 
	{
		cheatas.debugger.log("Function", "cheatas.UISlideBox.init()");

		var that = this;
		var isVertical = null;
		var gestureDelegate = null;
		var gestureElement = null;

		this.nodes.view = cheatas.lib.createElement("div", this.nodes.body.id + "-view", "view");
		this.nodes.view.style.position = "absolute";
		this.nodes.view.style.top = "0px";
		this.nodes.body.appendChild(this.nodes.view);

		gestureDelegate = function() {};

		gestureDelegate.prototype = {
		                      
			stateChange: function(e, point)
			{

				if(e == cheatas.GestureElement.START)
				{
					that.touchStart();
				}
				else if(e == cheatas.GestureElement.MOVE_H)
				{
					that.touchMove(point.x);
				}
				else if(e == cheatas.GestureElement.END)
				{
					that.touchEnd(point);
				}
			},

			gestureComplete: function(e)
			{
				if (e == cheatas.GestureElement.PAN_RIGHT)
				{
					that.finalGesture = e;
				}
				else if (e == cheatas.GestureElement.PAN_LEFT)
				{
					that.finalGesture = e;
				}
			}
		}

		if(this.isHorizontal == true)
		{
			isVertical = false;
		}
		else
		{
			isVertical = true;
		}

		gestureElement = new cheatas.GestureElement(this.nodes.body, new gestureDelegate(), isVertical, true);

        this.resize();
	},

    resize: function() 
	{
		cheatas.debugger.log("Function", "cheatas.UISlideBox.resize()");

        var bounce = cheatas.lib.getAbsoluteBounce(this.nodes.body);
		var w = Math.floor(bounce.width);
		var h = Math.floor(bounce.height);

		if(bounce.width > 1920)
		{
			return;
		}
		
		this.nodes.view.style.width = w * 3;
		this.nodes.view.style.height = h;
		this.nodes.view.style.left = -w + "px"

		if(this.nodes.currentView == null)
		{
			this.nodes.currentView = this.createCell(0);
			cheatas.lib.excuteDelegate(this.delegate, "initBox", [this.nodes.currentView]);
		}
		else
		{
			this.nodes.currentView.style.width = w + "px";
			this.nodes.currentView.style.height = h + "px";
			this.nodes.currentView.style.left = w + "px";
		}
    },

	createCell: function(direction) 
	{
		cheatas.debugger.log("Function",
			[
				"cheatas.UISlideBox.creatCell(direction)",
				"direction = " + direction
			]
		);

		var cell = cheatas.lib.createElement("div", this.nodes.view.id + "-cell-" + this.pageSeq, "cell");
		var seq = direction + 1;
		var bounce = cheatas.lib.getAbsoluteBounce(this.nodes.body);
		var w = Math.floor(bounce.width);
		var h = Math.floor(bounce.height);

		cell.style.position = "absolute";
		cell.style.width = w + "px";
		cell.style.height = h + "px";
		cell.style.top = "0px";
		cell.style.left = (seq * w) + "px";

		this.nodes.view.appendChild(cell);

		return cell;
    },	

	setAni:function()
	{
		cheatas.debugger.log("Function",
			[
				"cheatas.UISlideBox.setAni()",
				"cheatas.animation = " + cheatas.animation,
				"cheatas.animation.animationCSS = " + cheatas.animation.animationCSS,
				"this.isAniMode = " + this.isAniMode
			]
		);

		if(this.isAniMode == true)
		{
			return;
		}

		this.isAniMode = true;
		cheatas.animation.animationCSS.setAnimationProperty(this.nodes.view.style, "property", "left");
		cheatas.animation.animationCSS.setAnimationProperty(this.nodes.view.style, "fill-mode", "both");
		cheatas.animation.animationCSS.setAnimationProperty(this.nodes.view.style, "duration", this.slideSpd + "s");
		cheatas.animation.animationCSS.setAnimationProperty(this.nodes.view.style, "timing-function", "ease in");
	},

    removeAni:function()
	{
		cheatas.debugger.log("Function", "cheatas.UISlideBox.removeAni()");

		if(this.isAniMode == false)
		{
		    return;
		}

		this.isAniMode = false;
		cheatas.animation.animationCSS.setAnimationProperty(this.nodes.view.style, "property", "none");
		cheatas.animation.animationCSS.setAnimationProperty(this.nodes.view.style, "fill-mode", "");
		cheatas.animation.animationCSS.setAnimationProperty(this.nodes.view.style, "duration", "");
		cheatas.animation.animationCSS.setAnimationProperty(this.nodes.view.style, "timing-function", "");
	},

	touchStart:function()
	{
		cheatas.debugger.log("Event",
			[
				"cheatas.UISlideBox.touchStart()",
				"this.isMoving = " + this.isMoving,
				"this.isTouched = " + this.isTouched,
				"this.isDirectControl = " + this.isDirectControl
			]
		);

		// 터치 이벤트가 실행 중일 때 다른 터치 이벤트가 발생하면 무시
		if(this.isMoving == true)
		{
			return;
		}

		if(this.isTouched == true)
		{
			return;
		}

		this.isDirectControl = true;
		this.isTouched = true;
	},

	touchMove:function(point)
	{
		cheatas.debugger.log("Event",
			[
				"cheatas.UISlideBox.touchMove(point)",
				"point = " + point
			]
		);

		if(this.isMoving == true)
		{
		   return;
		}

		if(point < 0)
		{
			this.moveInit(1);

		}
		else if(point > 0)
		{
			this.moveInit(-1);
		}
		
		if(this.isMoveable == false)
		{
			return;
		}
		
		var bounce = cheatas.lib.getAbsoluteBounce(this.nodes.body);
		var tx = -bounce.width + point;

		this.nodes.view.style.left = tx + "px";
	},

    touchEnd:function(point)
	{
		cheatas.debugger.log("Event",
			[
				"cheatas.UISlideBox.touchEnd(point)",
				"this.isMoveable = " + this.isMoveable,
				"this.isMoving = " + this.isMoving,
				"this.isTouched = " + this.isTouched,
				"this.isDirectControl = " + this.isDirectControl,
				"this.finalGesture = " + this.finalGesture
			]
		);

		var direction;
		var seq;

		this.isTouched = false;

		if(this.isMoveable == false)
		{
			return;
		}

		if(this.isMoving == true)
		{
			return;
		}

        if(this.finalGesture == cheatas.GestureElement.PAN_RIGHT)
		{
			direction = -1;							
		}
		else if(this.finalGesture == cheatas.GestureElement.PAN_LEFT)
		{
			direction = 1;
		}
		else
		{
			direction = 0;	
		}

		seq = this.pageSeq + direction;

		if(seq < 0 || seq >= this.pageLength)
		{
			direction = 0;
		}

		this.finalGesture = "";
		this.moveSlide(direction);

		//cheatas.debuger.log("touchEnd");

		cheatas.debugger.log("Trace",
			[
				"cheatas.UISlideBox.touchEnd(point)",
				"this.isMoving = " + this.isMoving,
				"this.isTouched = " + this.isTouched,
				"this.isDirectControl = " + this.isDirectControl,
				"this.finalGesture = " + this.finalGesture
			]
		);
	},

	moveInit: function(direction) 
	{
		cheatas.debugger.log("Function",
			[
				"cheatas.UISlideBox.moveInit(direction)",
				"this.isMoveable = " + this.isMoveable,
				"this.currentDirection = " + this.currentDirection,
				"direction = " + direction,
				"this.pageSeq = " + this.pageSeq
			]
		);

		if(this.isMoveable == true)
		{
			if (this.currentDirection == direction)
			{
				return;
			}
		}

		this.currentDirection = direction;
		this.isMoveable = true;
		
		this.removeNextView();
		this.nodes.nextView = this.createCell(direction);

		cheatas.lib.excuteDelegate(this.delegate, "moveStart", [this.nodes.nextView, direction]);
    },

	moveSlide: function(direction) 
	{
		cheatas.debugger.log("Function",
			[
				"cheatas.UISlideBox.moveSlide(direction)",
				"direction = " + direction
			]
		);

		var that = this;
		var bounce = cheatas.lib.getAbsoluteBounce(this.nodes.body);
		var tx = -(direction + 1) * bounce.width;
		var aniDelegate = null;
		var easev = "ease in";

		cheatas.debugger.log("Trace",
			[
				"cheatas.UISlideBox.moveSlide(direction)",
				"this.isMoveable = " + this.isMoveable,
				"this.isMoving = " + this.isMoving,
				"this.isTouched = " + this.isTouched
			]
		);

		if(this.isTouched == true)
		{
			return;
		}

		if(this.isMoveable == false)
		{
			this.moveInit(direction);
		}

		if(this.isMoving == true)
		{
			return;
		}

		cheatas.debugger.trace(
			[
				"SlideBox will start soon!",
				"this.pageSeq = " + this.pageSeq,
				"this.pageLength = " + this.pageLength,
				"direction = " + direction
			]
		);
		
		if(this.pageLength > 0)
		{
			var seq = this.pageSeq + direction;

			if(seq < 0 || seq >= this.pageLength)
			{
				direction = 0;
			}
		}

		cheatas.debugger.trace(
			[
				"SlideBox started!",
				"seq = " + seq,
				"direction = " + direction
			]
		);

		this.setAni();
		this.isMoving = true;

		aniDelegate = function() {};

		aniDelegate.prototype = {

			complete: function(e)
			{
				cheatas.debugger.log("Function",
					[
						"cheatas.UISlideBox.moveSlide.aniDelegate.complete(e)",
						"e = " + e,
						"direction = " + direction
					]
				);

				that.removeAni();

				if(direction == 0)
				{
					that.removeNextView();
				}
				else
				{
					that.nodes.view.removeChild(that.nodes.currentView);
					that.nodes.currentView = that.nodes.nextView
					that.nodes.view.style.left = -bounce.width + "px";
					that.nodes.currentView.style.left = bounce.width + "px";

					cheatas.debugger.trace(
						[
							"aniDelegate.complete(e)",
							"that.isDirectControl = " + that.isDirectControl,
							"direction = " + direction
						]
					);

					if(that.isDirectControl == true && direction != 0)
					{
						cheatas.lib.excuteDelegate(that.delegate, "moveChanged", [that.nodes.currentView, direction]);
					}

					cheatas.lib.excuteDelegate(that.delegate, "moveEnd", [that.nodes.currentView, direction]);
				}

				that.nodes.nextView = null;
				that.isMoveable = false;
				that.isMoving = false;
				that.currentDirection = 0;
			}
		}

		cheatas.animation.startAnimation(this.nodes.view.style, {listener: this.nodes.view, staticProp: true,  duration: this.slideSpd, left: tx, ease: easev , isPx: true}, new aniDelegate());
	},

	removeNextView: function() 
	{
		cheatas.debugger.log("Function", "cheatas.UISlideBox.removeNextView()");

		if(this.nodes.nextView != null)
		{
			this.nodes.view.removeChild(this.nodes.nextView);
			this.nodes.nextView = null;
		}	
	}
}