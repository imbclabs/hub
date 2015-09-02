if (typeof cheatas == "undefined")
{
	var cheatas = new Object();
}

if (window.location.href.indexOf("http") == -1)
{
	var cheatasSrc = "./js/";
}
else
{
	var cheatasSrc = "./js/";
}

document.write("<script type=\"text/javascript\" src=\"" + cheatasSrc + "lib.ajax.js\"></script>"); 
document.write("<script type=\"text/javascript\" src=\"" + cheatasSrc + "lib.class.js\"></script>"); 
document.write("<script type=\"text/javascript\" src=\"" + cheatasSrc + "lib.config.js\"></script>"); 
document.write("<script type=\"text/javascript\" src=\"" + cheatasSrc + "lib.debugger.js\"></script>"); 
document.write("<script type=\"text/javascript\" src=\"" + cheatasSrc + "lib.info.js\"></script>"); 
document.write("<script type=\"text/javascript\" src=\"" + cheatasSrc + "lib.swfobject.js\"></script>"); 

cheatas.Lib = function()
{
	this.version = "0.0.1";

	if (this.isMobile())
	{
		this.isMobile = true;
	}
	else
	{
		this.isMobile = false;
	}

	if (window.location.href.indexOf("http") != -1)
	{
		this.isLocal = false;
	}
	else
	{
		this.isLocal = true;
	}
}

cheatas.Lib.prototype =
{
	addEventListener: function(element, event, fn)
	{
		if (document.createEventObject)
		{
			element.attachEvent("on" + event, fn);
		}
		else
		{
			if (event == "resize")
			{
				element = window;
			}

			element.addEventListener(event, fn);
		}

		/*
		var wheel = null;

		if (event == "mousewheel")
		{
			try
			{
				wheel = new cheatas.MouseWheel(element, fn);
			}
			catch (e)
			{
				//				 
			}	 
	   
		}
		else
		{
			if (document.createEventObject)
			{
				element.attachEvent("on" + event, fn);
			}
			else
			{
				if (event == "resize")
				{
					element = window;
				}

				element.addEventListener(event, fn);
			}
		}

		return wheel;
		*/
	},

	removeEventListener: function(element, event, fn)
	{
		if (document.createEventObject)
		{
			element.detachEvent("on" + event, fn);
		}
		else
		{
			if(event == "resize")
			{
				element = window;
			}

			element.removeEventListener(event, fn);
		}

		/*
		if (event == "mousewheel")
		{
			//
		}
		else
		{
			if (document.createEventObject)
			{
				element.detachEvent("on" + event, fn);
			}
			else
			{
				if(event == "resize")
				{
					element = window;
				}

				element.removeEventListener(event, fn);
			}
		}
		*/
	},

    excuteDelegate: function(delegate, commend, args)
    {	
		if(delegate == null)
		{
			return false;
		}

		if(delegate[commend] === undefined)
		{
			return false;
		}

		if(args === undefined)
		{
			delegate[commend].apply(delegate);
		}
		else
		{
			delegate[commend].apply(delegate, args);
		}

		return true;
	},

	inherit: function (child, parent)
	{
		var proxy = null;

		proxy = function () {};
		proxy.prototype = parent.prototype;

		child.prototype = new proxy();
		child.superclass = parent.prototype;
		child.prototype.constructor = child;
	},

	extend: function (child, parent)
	{
		var i = null;
		var toString = Object.prototype.toString;

		child = child || {};

		for (i in parent)
		{
			if (parent.hasOwnProperty(i))
			{
				if (typeof parent[i] === "object")
				{
					child[i] = (toString.call(parent[i]) == "[object Array]") ? [] : {};
					extend(parent[i], child[i]);
				}
				else
				{
					child[i] = parent[i];
				}
			}
		}

		return child;
	},

	bind: function (o, m)
	{
		var slice = Array.prototype.slice;

		return function ()
			{
				return m.apply(o, slice.call(arguments));
			};
	},

	encodeURIComponent: function(uri)
	{
		var result = encodeURIComponent(uri);
		return result;
	},

	decodeURIComponent: function(uri)
	{
		var result = decodeURIComponent(uri);
		return result;
	},

	getEventTarget: function(e)
	{
		var event = e ? e : window.event;

		return event.target ? event.target : event.srcElement;
	},

	getUrlParam: function(urlStr)
	{
		var urlObject = {};
		var pA = [];
		var uA = [];
	    var paramStr = "";
		var param = {};
		var sA = [];
		var value = "";

		pA = urlStr.split("#");
		urlStr = pA[0];

		if (pA.length > 1)
		{
			urlObject.hash = pA[1];
		}
		else
		{
			urlObject.hash = null;
		}
		
		uA = urlStr.split("?");

		if (uA.length < 2)
		{
			urlObject.url = urlStr;
			return urlObject;
		}
		else
		{
			urlObject.url = uA[0];
			paramStr = uA[1];

            for (var x = 2; x < uA.length; ++x)
			{
				paramStr += "?" + uA[x];
			}

			//alert(paramStr);
		}
		
		pA = paramStr.split("&");

		for (var i = 0; i < pA.length; ++i)
		{
			sA = pA[i].split("=");

			if(sA.length >= 2)
			{
                value = sA[1];

				for(var x = 2; x < sA.length; ++x)
				{
					value += "=" + sA[x];
				}

				param[sA[0]] = value;
			}
			
		}	
		
		urlObject.param = param;
		return urlObject;
	},

	isAvailable: function(key)
	{
		if (typeof cheatas[key] == "undefined" || cheatas[key] == null)
		{
			return true;
		}
		else
		{
			return false;
		}
	},

	isMobile: function()
	{    
		var device = this.getDeviceInfoStr();
		
		if (device == "")
		{
			return false;
		}
		else
		{
			if(device == "LG" && this.getOSInfoStr() == "Windows NT")
			{
				return false;
			}

			return true;
		}
	},

	isAndroid: function()
	{    
		var name = this.getDeviceInfoStr().toLowerCase();

		if (name == "iphone" || name == "ipad"  || name== "ipod")
		{
			return false;
		}
		else if (name == "windows ce")
        {
			return false;
		}
		else if (name == "")
		{
			return false;
		}
		else
		{
			return true;
		}
	},

	isPhone: function()
	{	
		var name = this.getDeviceInfoStr().toLowerCase();

		if (name == "iphone" || name == "ipad"  || name== "ipod")
		{
			if (name == "ipad")
			{
				return false;
			}
			else
			{
				return true;
			}
        }

		if (this.isMobile()==false)
		{
			return false;
		}
		else
		{
			return true;
		}
	},

	isIos: function()
	{
		var name = this.getDeviceInfoStr().toLowerCase();

		if (name == "iphone" || name == "ipad"  || name== "ipod")
		{
			return true;
		}
        else
        {
			return false;
		}
	},

	isIE: function()
	{
		var name = navigator.userAgent.toLowerCase();

		if (name.indexOf("microsoft internet explorer") != -1)
		{
			return true;
        }
		else
		{
			return false;
		}
	},

	getIEVersion: function()
	{    
		var rv = -1; // Return value assumes failure.

		if (navigator.userAgent == "Microsoft Internet Explorer")
		{        
			var ua = navigator.userAgent;
			var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");

			if (re.exec(ua) != null)
			{
				rv = parseFloat(RegExp.$1);    
			}
		}

		return Number(rv); 
	},

	getIEDocVersion: function()
	{    
		var rv = -1; // Return value assumes failure.

		if (navigator.userAgent == "Microsoft Internet Explorer")
		{        
			rv = document.documentMode;       
		}

		return Number(rv); 
	},

	isChrome: function()
	{    
		var name = name = navigator.userAgent.toLowerCase();
		
		if(name.indexOf("chrome") != -1)
		{
			return true;
		}
		else
		{
			return false;
		} 
	},

	isSafari: function()
	{
		var name = navigator.userAgent.toLowerCase();

		if (this.isChrome() == true)
		{
			return false;
		}

		if (name.indexOf("safari") != -1)
		{
			return true;
		}
		else
		{
			return false;
		}
	},

	isFF: function()
	{    
		var name = this.getNavigatorInfoStr();
		
		if(name.indexOf("FF") != -1)
		{
			return true;
		}
		else
		{
			return false;
		}
	},

	getDeviceInfoStr: function()
	{    
		var mobileKeyWords = new Array("iPhone", "iPad", "iPod", "BlackBerry", "Android", "Windows CE", "LG", "MOT", "SAMSUNG", "SonyEricsson");
		var device_name = "";

		for (var i=0; i < mobileKeyWords.length; ++i)
		{        
			if (navigator.userAgent.match(mobileKeyWords[i]) != null)
			{            
				device_name = mobileKeyWords[i];            
				break;        
			}    
		}

		return device_name;
	},

	getOSInfoStr : function()
	{
		var ua = navigator.userAgent;
   
		if(ua.indexOf("NT 6.0") != -1) return "Windows Vista/Server 2008";
		else if(ua.indexOf("NT 5.2") != -1) return "Windows Server 2003";
		else if(ua.indexOf("NT 5.1") != -1) return "Windows XP";
		else if(ua.indexOf("NT 5.0") != -1) return "Windows 2000";
		else if(ua.indexOf("NT") != -1) return "Windows NT";
		else if(ua.indexOf("9x 4.90") != -1) return "Windows Me";
		else if(ua.indexOf("98") != -1) return "Windows 98";
		else if(ua.indexOf("95") != -1) return "Windows 95";
		else if(ua.indexOf("Win16") != -1) return "Windows 3.x";
		else if(ua.indexOf("Windows") != -1) return "Windows";
		else if(ua.indexOf("Linux") != -1) return "Linux";
		else if(ua.indexOf("Macintosh") != -1) return "Macintosh";
		else if(ua.indexOf("iPad") != -1) return "iPad";
		else if(ua.indexOf("iPhone") != -1) return "iPhone";
		else if(ua.indexOf("iPod") != -1) return "iPod";
		else return ua;
    },

	getAbsoluteBounce: function(element)
	{
		var bounce;
		var x;
		var y;
		var w;
		var h;

		try
		{
			if (element.getBoundingClientRect)
			{
				bounce = element.getBoundingClientRect();	
				x = bounce.left + (document.documentElement.scrollLeft || document.body.scrollLeft)
				y = bounce.top + (document.documentElement.scrollTop || document.body.scrollTop)
				w = bounce.right - bounce.left;
				h = bounce.bottom - bounce.top;
			}
			else
			{
				bounce = document.getBoxObjectFor(element);
				x = bounce.x;
				y = bounce.y;
				w = bounce.width;
				h = bounce.height;
			}
		}
		catch(e)
		{
			alert(cheatas.config.MSG_UNKNOWN_ERROR);
			return;
		}

		return new cheatas.Rectangle(x, y, w, h);
	},

	getEqualRatioRect: function(w, h, tw, th, isFullSize)
    {
		var sc;
		var rectangle;

		if (isFullSize == null)
		{
			isFullSize = false;
		}

		w = Number(w);
		h = Number(h);
		tw = Number(tw);
		th = Number(th);

		if (w > tw || h > th)
		{
			if (w > tw)
			{
				sc = tw / w;
				w = tw;
				h = h * sc;
			}

			if (h > th)
			{
				sc = th / h;
				h = th;
				w = w * sc;
			}
		}
		else
		{
			if(isFullSize == true)
			{
				if (w < tw)
				{
					sc = tw / w;
					w = tw;
					h = h * sc;
				}

				if (h > th)
				{
					sc = th / h;
					h = th;
					w = w * sc;
				}
			}
		}
            
		rectangle = new cheatas.Rectangle(Math.round((tw - w) / 2), Math.round((th - h) / 2), w, h);

		return rectangle;
	},

	converseDateForm: function(date, type)
	{
		if (typeof date == null)
		{
			date = new Date();
		}

		if (typeof type == null)
		{
			type = cheatas.config.TYPE_DATE_FORM_INTERVAL;
		}

		var now = new Date();

		var nowYear = now.getFullYear();
		var nowMonth = now.getMonth() + 1;
		var nowDate = now.getDate();

		var dateYear = date.getFullYear();
		var dateMonth = date.getMonth() + 1;
		var dateDate = date.getDate();

		var strYear = "";
		var strMonth = "";
		var strDate = "";

		var interval = now.getTime() - date.getTime();
		var intervalByMonth = Math.floor(interval / 1000 / 60 / 60 / 24 / 30);
		var intervalByDate = Math.floor(interval / 1000 / 60 / 60 / 24);
		var intervalByHour = Math.floor(interval / 1000 / 60 / 60);
		var intervalByMinute = Math.floor(interval / 1000 / 60);

		var returnDefault = false;

		if (type == cheatas.config.TYPE_DATE_FORM_INTERVAL)
		{
			if (intervalByMonth < 12)
			{
				if (intervalByMonth < 1)
				{
					if (intervalByDate < 1)
					{
						if (intervalByHour < 1)
						{
							return intervalByMinute + "분 전";
						}
						else
						{
							return intervalByHour + "시간 전";
						}
					}
					else
					{
						if (intervalByDate == 1)
						{
							return "어제";
						}
						else
						{
							return intervalByDate + "일 전";
						}
					}
				}
				else
				{
					return intervalByMonth + "개월 전";
				}
			}
			else
			{
				returnDefault = true;
			}
		}

		if (type == cheatas.config.TYPE_DATE_FORM_YYYYMMDD || returnDefault == true)
		{
			strYear = dateYear;

			if(dateMonth < 10)
			{
				strMonth = "0" + dateMonth;
			}
			else
			{
				strMonth = dateMonth;
			}

			if(dateDate < 10)
			{
				strDate= "0" + dateDate;
			}
			else
			{
				strDate= dateDate;
			}

			return strYear + "-" + strMonth + "-" + strDate;
		}
	},

	getDate: function(type)
	{
		var str = "";
		var now = new Date();
		var year = now.getFullYear();
		var month = now.getMonth()+1;
		var date = now.getDate();

		if(type == "YYYY-MM-DD")
		{
			str += year;

			if(month < 10)
			{
				str += "-0" + month;
			}
			else
			{
				str += "-" + month;
			}

			if(date < 10)
			{
				str += "-0" + date;
			}
			else
			{
				str += "-" + date;
			}
		}
		else
		{
			str = year + "-" +  month + "-" +  date;
		}

		return str;
	},

	getDay: function(type)
	{
		var day = "";

		if(type == "KR")
		{
			switch (this.day)
			{
				case 0: day = "일";
				break;
				case 1: day = "월";
				break;
				case 2: day = "화";
				break;
				case 3: day = "수";
				break;
				case 4: day = "목";
				break;
				case 5: day = "금";
				break;
				case 6: day = "토";
				break;
			}
		}
		else
		{
			day = this.day;
		}

		return day;
	},

	getTime: function(type)
	{
		var time = "";

		if(type == "HH:MM")
		{
			if(this.hours < 10)
			{
				time += "0" + this.hours;
			}
			else
			{
				time += this.hours;
			}

			if(this.minutes < 10)
			{
				time += ":0" + this.minutes;
			}
			else
			{
				time += ":" + this.minutes;
			}
		}
		else
		{
			time = this.hours + ":" + this.minutes;
		}

		return time;
	},

	createElement: function(tagName, id, className)
	{
		// cheatas.debugger.log("Call", "cheatas.Lib.createElement(tagName, id, className, parent), tagName = " + tagName + ", id = " + id + ", className = " + className);

		var el = document.createElement(tagName);

		el.setAttribute("id", id);
		el.setAttribute("class", className);

		return el;
	},

	removeChild: function(element)
	{
		if(element.parentNode != null)
		{
			element.parentNode.removeChild(element);
		}
	},

	isNumber: function(s)
	{
		s += "";
		s = s.replace(/^\s*|\s*$/g, "");

		if (s == "" || isNaN(s))
		{
			return false;
		}

		return true;
	},

	shortenString: function(str, len)
	{
		if (len < str.length - 1)
		{
			var rse = "";

			res = str.slice(0, len);
			res += "...";

			return res;
		}

		return str;
	},

	copyArray: function(array)
	{
		var res = new Array();

		for (var i = 0; i < array.length; ++i)
		{
			res.push(array[i]);
		}

		return res;
	},

	bubbleSort: function(keys, vals, order)
	{
		if (order == "DESC")
		{
			for (var i = 0; i < keys.length; ++i)
			{
				for (var j = 0; j < keys.length - 1; ++j)
				{
					if (vals[j] < vals[j + 1])
					{
						var key = keys[j + 1];
						var val = vals[j + 1];

						keys[j + 1] = keys[j];
						vals[j + 1] = vals[j];
						keys[j] = key;
						vals[j] = val;
					}
				}
			}
		}
		else
		{
			for (var i = 0; i < keys.length; ++i)
			{
				for (var j = 0; j < keys.length - 1; ++j)
				{
					if (vals[j] >= vals[j + 1])
					{
						var key = keys[j + 1];
						var val = vals[j + 1];

						keys[j + 1] = keys[j];
						vals[j + 1] = vals[j];
						keys[j] = key;
						vals[j] = val;
					}
				}
			}
		}

		return keys;
	}
}

cheatas.lib = new cheatas.Lib();