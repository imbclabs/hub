if(typeof cheatas == "undefined")
{
	var cheatas = new Object();
}

cheatas.XmlDocument = function(dom) 
{
	this.dom = dom;
}

cheatas.XmlDocument.prototype =
{
	getElementsByTagName: function(tag)  // XmlDocument
	{
		var elements = null;

		if (this.dom == null)
		{
			return new Array();
		}

		elements = this.dom.getElementsByTagName(tag);

		if (elements.length > 0)
		{
			return elements;
		}
		else
		{
			return new Array();
		}
	},

	getElementByTagName: function(tag) // cheatas.XmlDocument
	{
		var elements = null;

		if (this.dom==null)
		{
			return new cheatas.XmlDocument(null);
		}

		elements = this.dom.getElementsByTagName(tag);

		if (elements.length>0)
		{
			return new cheatas.XmlDocument(elements[0]);
		}
		else
		{
			return new cheatas.XmlDocument(null);
		}
	},

	nodeValue: function() 
	{
		if(this.dom == null)
		{
			return "";
		}

		if (this.dom.childNodes.length > 0)
		{
			return String(this.dom.childNodes[0].nodeValue);
		}
		else
		{
			return "";
		}
	},

	getElementById: function(id)
	{
		if (this.dom==null)
		{
			return "";
		}

		return String(this.dom.getElementById(id));
    }
}

cheatas.Ajax = function() 
{
	this.xhr = null;
	this.sel = null;
	this.usedCheatasRequest = false;
	this.returnType = null;
	this.returnData = null;
	this.jsonpLoader = null;
	this.isXDomain = false;
}

cheatas.Ajax.prototype =
{
	getXMLHttpRequest: function() 
	{
        
		if(cheatas.lib.isLocal == true)
		{
			//return  this.getFlashXMLHttpRequest();
		}

		this.isXDomain = false;

        if (window.XDomainRequest)
		{
			this.isXDomain = true;

			// cheatas.debuger.log("create XDomainRequest","Ajax XMLHttpRequest ");
			return new XDomainRequest();
		}
		else if (window.XMLHttpRequest)
		{
			// cheatas.debuger.log("create XMLHttpRequest","Ajax XMLHttpRequest ");
			return new XMLHttpRequest();
		}
		else if (window.ActiveXObject)
		{
			try
			{
				//cheatas.debuger.log("create Msxml2.XMLHTTP","Ajax XMLHttpRequest ");
				return new ActiveXObject("Msxml2.XMLHTTP"); // IE 상위 버전
			}
			catch (e) 
			{
				return new ActiveXObject("Microsoft.XMLHTTP"); // IE 하위 버전
			}
        }
		else
		{
			return null; // 통신불가
		}
	},

	request: function(url, param, sel, sendType, returnType, header) 
	{
		var that = this;
		var pstr = "";

		if (url == "" || url == null)
		{
			//cheatas.debuger.log("no URL","Ajax error");
			return;
		 }

		if (sendType === undefined )
		{
			sendType="POST";
		}

		if (returnType === undefined )
		{
			returnType = "json";
		}

		// cheatas.debuger.log(url,"Ajax call");
		this.sel = sel;
		this.returnType = returnType;

		if(returnType == "jsonp")
		{
			sendType = "GET";

			if (param == null)
			{
				param = new Object();
			}

			param.callback = this.sel;
		}

		if (param != null)
		{
			for (var key in param)
			{
				pstr = pstr + "&" + key + "=" + param[key];
			}

			if(pstr != "")
			{
				pstr = pstr.slice(1);

				if(sendType == "GET")
				{
					if(url.indexOf("?") == -1)
					{
						url = url + "?" + pstr;
					}
					else
					{
						url = url + "&" + pstr;
					}

					pstr = "";
				}
			}

           // param = null;
		}

		if(this.xhr != null)
		{
			//xhr
		}

		if (returnType == "jsonp")
		{
			var head = document.getElementsByTagName("head")[0];

			if (this.jsonpLoader == null)
			{
				this.jsonpLoader = document.createElement("script");
				this.jsonpLoader.type= "text/javascript";
			}

			head.appendChild(this.jsonpLoader);
			this.jsonpLoader.src = url;
		}
		else
		{
			this.xhr = this.getXMLHttpRequest();

            try
			{
				this.xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

				if (header != undefined)
				{
					for (var h in header)
					{
						this.xhr.setRequestHeader(h, header[h]);
					}
				}
			}
			catch (e)
			{
				// cheatas.debuger.log("Request don't RequestHeader","Ajax setRequestHeader Error ");
			}

            if (this.isXDomain == true)
			{
				this.xhr.onload = function(){that.responseComplete();};
				this.xhr.onerror = function(){that.responseError("onload error");};
				this.xhr.ontimeout = function(){that.responseError("timeout error");};
			}
			else
			{
				this.xhr.onreadystatechange = function(){that.response();};
			}

			this.xhr.open(sendType, url, true); // 연결

			if (pstr == "")
			{
				this.xhr.send(null); // GET전송
			}
			else
			{
				this.xhr.send(pstr); //POST전송
			}
		}
	},

	createXMLFromString: function(string) 
	{
		var xmlDocument = null;
		var xmlParser = null;

		if (window.ActiveXObject) // IE일 경우
		{
			xmlDocument = new ActiveXObject('Microsoft.XMLDOM');
			xmlDocument.async = false;

			try
			{
				xmlDocument.loadXML(string);
			}
			catch (e) // parseError 
			{
				// cheatas.debuger.log(e.errorCode+" : "+e.reason,"Ajax parseError ");
			}
		}
		else if (window.XMLHttpRequest) // Firefox, Netscape일 경우
		{   
			xmlParser = new DOMParser();

			try
			{
				xmlDocument = xmlParser.parseFromString(string, "text/xml");
			}
			catch (e) // parseError 
			{
				// cheatas.debuger.log(e.errorCode+" : "+e.reason,"Ajax parseError ");
			}
		}
		else
		{
			// cheatas.debuger.log(e.errorCode+" : "+e.reason,"Ajax parseError ");
		}

		return new cheatas.XmlDocument(xmlDocument);
	},

	responseComplete: function() 
	{
		var str = "";
		var yn = "Y";

		try
		{
			str = this.xhr.responseText;
		}
		catch (e)
		{
			// alert("return data null!! " + e + " Ajax error");
			// eval(this.sel+"('N','null data error')");
			return;
		}

		switch (this.returnType)
		{
			case "jsonp": //사용안함
				try 
				{
					eval(str);
				}
				catch (e)
				{
					yn = "N";
					cheatas.debuger.log("return function null jsonp !!" +e,"Ajax error");
				}
				return;
			case "json":
				try
				{
					yn = "Y";
					this.returnData = eval(str);
					break;
				}
				catch (e)
				{
					yn = "N";
					// cheatas.debuger.log("json !! " +e,"Ajax error");
				}
			case "json_parse":
				try
				{
					yn = "Y";
					this.returnData = JSON.parse(eval(str));
					break;
				}
				catch (e)
				{
					yn = "N";
					// cheatas.debuger.log("json_parse!! " +e,"Ajax error");
				}
			case "json_string":
				try
				{
					yn = "Y";
					this.returnData= JSON.parse(str);
					break;
				}
				catch (e)
				{
					yn = "N";
					// cheatas.debuger.log("json_string!! " +e,"Ajax error");
				}
			case "json_object":
				try
				{
					yn = "Y";
					this.returnData= eval("("+str+")");
				}
				catch (e)
				{
					yn = "N";
					//cheatas.debuger.log("json_object!! " +e,"Ajax error");
				}
				break;
			case "xml":
				this.returnData = this.createXMLFromString(str);
				if(this.returnData == null)
				{
					yn="N";
				}
				break;
			case "text":
				this.returnData = str;
				break;
		}

		eval(this.sel+"('"+yn+"')");
	},

    responseError: function(status) 
	{
		eval(this.sel+"('N','"+status+"')");
	},

	response: function() 
	{
        if (this.xhr.readyState == 4) // 완료
		{
			if (this.xhr.status == 200) // 오류없이 OK
			{
				this.responseComplete();	
            }
			else
			{
				// alert("Ajax Response Error: this.xhr.readyState = " + this.xhr.readyState + ", this.xhr.status = " + this.xhr.status);
				eval(this.sel+"('N', '" + this.xhr.status + "')");
			}
		} 
	}
}