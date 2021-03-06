if(cheatas == null)
{
	var cheatas = new Object();
}

cheatas.Animation = function() 
{
	this.animationJS = new cheatas.AnimationJS();
	this.animationCSS = new cheatas.AnimationCSS();
}

cheatas.AnimationObject = function() 
{
	this.id = "";
	this.duration = 10;
	this.t = 0;
	this.delay = 0;
	this.isPx = false;
	this.unit = "";
	this.ease = "ease in"; // ease out ease in ease in out
	this.prop = null;
	this.copyProp = new Object();
	this.listener = null; // css ani used
	this.diff = 0;
	this.delegate = null; // update/complete
	this.staticProp = false;
}

cheatas.Animation.prototype =
{
	startAnimation: function(element, prop, delegate) 
	{
		cheatas.debugger.log("Function",
			[
				"cheatas.Animation.startAnimation(element, prop, delegate)",
				"element = " + element,
				"prop = " + prop,
				"delegate = " + delegate
			]
		);

		var aniObj = null;
	   
		if(element == null)
		{
			return;
		}

		if(prop == null)
		{
			return;
		}

		if(delegate == null)
		{
			delegate = null;
		}

		aniObj = new cheatas.AnimationObject();

		if(prop.id != null)
		{
			aniObj.id = prop.id;
		}

		if(prop.isPx != null)
		{
			aniObj.isPx = prop.isPx;

			if(prop.isPx == true)
			{
				aniObj.unit = "px";
			}
			else if(prop.isPx == "auto")
			{
				aniObj.unit="auto";
			}
			else
			{
				if(prop.unit != null)
				{
					aniObj.unit = prop.unit;
					delete prop.unit;
				}
				else
				{
					aniObj.unit = "";
				}
			}

			delete prop.isPx;
		} 

		if(prop.listener != null)
		{
			aniObj.listener = prop.listener;
			delete prop.listener;
		}

		if(prop.staticProp != null)
		{
			aniObj.staticProp = prop.staticProp;
			delete prop.staticProp;
		}
	   
		aniObj.delegate = delegate;
	
		if(prop.relativeDuration != null && prop.relativeKey != null)
		{
			if(element[prop.relativeKey] != null)
			{
				var v = cheatas.lib.getNumber(element[prop.relativeKey], aniObj.unit);
				var diff = Math.abs(v - prop[prop.relativeKey]);
				var spdA = String(prop.relativeDuration).split(";");
				var len = spdA.length;
				var d = Number(spdA[0]);
				var min = -1;
				var max = -1;

				if(len >= 2)
				{
					min = Number(spdA[1]);

					if(len >= 3)
					{
						max = Number(spdA[2]);
					}
				}

				prop.duration = d  *Math.ceil(diff / 100);

				if(min != -1 && prop.duration < min)
				{
					prop.duration = min;
				}

				if(max != -1 && prop.duration > max)
				{
					prop.duration = max;
				}
			}

			delete prop.relativeKey;
			delete prop.relativeDuration;
		}
       
		if(prop.duration != null)
		{
			aniObj.duration = prop.duration;
			delete prop.duration;
		}

		if(prop.delay != null)
		{
			aniObj.delay = prop.delay;
			delete prop.delay;
		}

		if(prop.ease != null)
		{
			aniObj.ease = prop.ease;
			delete prop.ease;
		}

		aniObj.prop = prop;
	   
		if(cheatas.lib.isIE() == false && aniObj.unit != "")
		{
			if(aniObj.listener == null)
			{
				this.animationJS.startAnimation(element, aniObj);
			}
			else
			{
				this.animationCSS.startAnimation(element, aniObj);
			}
		}
		else
		{
			this.animationJS.startAnimation(element, aniObj);
		}
    },

	stopAllAnimation: function() 
	{
		if(this.animationJS == null)
		{
			return;
		}
		
		this.animationJS.stopAllAnimation();
		this.animationCSS.stopAllAnimation();
	},

    stopAnimation: function(id) 
	{
		if(id == "")
		{
			return;
		}

		if(this.animationJS == null)
		{
			return;
		}
		
		this.animationJS.stopAnimation(id);
		this.animationCSS.stopAnimation(id);
    }	
}

cheatas.animation = new cheatas.Animation();