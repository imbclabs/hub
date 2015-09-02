if(cheatas == null)
{
	var cheatas = new Object();
}

cheatas.AnimationCSS= function() 
{
	this.elementA = new Array();
	this.animationA = new Array();
}

cheatas.AnimationCSS.prototype =
{
	startAnimation: function(element, aniObj) 
	{
		var that = this;
		var property = null;
		var seq = 0;

		if(element == undefined)
		{
			return;
		}

		this.elementA.push(element);
		this.animationA.push(aniObj);

		if(aniObj.listener != null)
		{ 
			aniObj.listener.aniComplete = function(e) {that.animationComlete(aniObj)};

			cheatas.lib.addEventListener(aniObj.listener, "webkitTransitionEnd", aniObj.listener.aniComplete);
			cheatas.lib.addEventListener(aniObj.listener, "transitionend", aniObj.listener.aniComplete);
			cheatas.lib.addEventListener(aniObj.listener, "msTransitionEnd", aniObj.listener.aniComplete);
			cheatas.lib.addEventListener(aniObj.listener, "oTransitionEnd", aniObj.listener.aniComplete); 
		}

		switch(aniObj.ease)
		{
			case "ease out": 
				aniObj.ease = "ease-out";
				break;
			case "ease in": 
				aniObj.ease = "ease-in";
				break;
			case "ease in out": 
				aniObj.ease = "ease-in-out";
				break;				 
		}

		for (var key in aniObj.prop)
		{
			if(key != "id")
			{
				if(seq == 0)
				{
					property = key;
				}
				else
				{
					property = property + "," + key; 
				}

				seq++;
			}
		}
       
		if(aniObj.staticProp == false)
		{
			this.setAnimationProperty(element, "property", property);
			this.setAnimationProperty(element, "fill-mode", "both");
			this.setAnimationProperty(element, "duration", aniObj.duration + "s");
			this.setAnimationProperty(element, "delay", aniObj.delay + "s");
			this.setAnimationProperty(element, "timing-function", aniObj.ease);
		}

		for (var key in aniObj.prop)
		{
			if(key != "id")
			{
				if(aniObj.isPx == true)
				{
					element[key] = Math.floor(aniObj.prop[key]) + aniObj.unit;
				}
				else
				{
				    element[key] = aniObj.prop[key] + aniObj.unit;
				} 
			}
		}
	},

	setAnimationProperty: function(element, property, value) 
	{
		element["-webkit-transition-" + property] = value;
		element["-moz-transition-" + property] = value;
		element["-ms-transition-" + property] = value;
		element["-o-transition-" + property] = value;
		element["transition-" + property] = value;
	},

	animationComlete: function(aniObj) 
	{
		var seq = null;
		var element = null;

		if(aniObj == null)
		{
			return;
		}

		seq = this.animationA.indexOf(aniObj);

		if(seq == -1)
		{
			return;
		}

		element = this.elementA[seq];

		this.removeAnimationCss(aniObj, element);

		cheatas.lib.excuteDelegate(aniObj.delegate, "complete", [aniObj.id]);
		
		delete aniObj.listener.animationComlete;
		delete this.elementA[seq];
		delete this.animationA[seq];
	},

	removeAnimationCss: function(aniObj, element) 
	{
		if(aniObj.staticProp == false)
		{
			this.setAnimationProperty(element, "property", "none");
			this.setAnimationProperty(element, "fill-mode", "");
			this.setAnimationProperty(element, "duration", "");
			this.setAnimationProperty(element, "delay", "");
			this.setAnimationProperty(element, "timing-function", "");
		}

		cheatas.lib.removeEventListener(aniObj.listener, "webkitTransitionEnd", aniObj.listener.animationComlete);
		cheatas.lib.removeEventListener(aniObj.listener, "transitionend", aniObj.listener.animationComlete);
		cheatas.lib.removeEventListener(aniObj.listener, "msTransitionEnd", aniObj.listener.animationComlete);
		cheatas.lib.removeEventListener(aniObj.listener, "oTransitionEnd", aniObj.listener.animationComlete);
	},

	stopAllAnimation: function() 
	{
		for(var i = 0; i < this.animationA.length; ++i)
		{
			if(this.animationA[i] != null)
			{
				this.elementA[i]["-webkit-animation-play-state"] = "paused";
				this.elementA[i]["animation-play-state"] = "paused";
				this.removeAnimationCss(this.animationA[i], this.elementA[i]);
			}
		}

		this.animationA = new Array();
		this.elementA = new Array();
	},

	stopAnimation: function(id) 
	{
		var seq = -1;

		for(var i = 0; i < this.animationA.length; ++i)
		{
			if(this.animationA[i] != null)
			{
				if(id == this.animationA[i].id)
				{
					seq = i;

					this.elementA[i]["-webkit-animation-play-state"] = "paused";
					this.elementA[i]["animation-play-state"] = "paused";
					this.removeAnimationCss(this.animationA[i], this.elementA[i]);
					break;
				}
			}
		}
		
		if(seq != -1)
		{
			delete this.elementA[seq]; 
			delete this.animationA[seq];
		}
	}	
}