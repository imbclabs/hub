if (cheatas == null)
{
	var cheatas = new Object();
}

cheatas.Debugger = function() 
{
	this.node = null;
	this.name = null;
	this.viewer = null;
	this.logger = null;
	this.type = "";
	this.isUsed = false;

	this.count = 0;
}

cheatas.Debugger.prototype =
{
	init: function() 
	{
		this.node = document.createElement("div");
		this.node.setAttribute("style", "overflow: hidden; z-index: 9999; position: absolute; right: 5px; bottom: 5px; width: 100%; height: 240px; line-height: 1.6em; background: rgba(0,0,0,0.7);");

		this.name = document.createElement("div");
		this.name.setAttribute("style", "overflow: hidden; padding: 10px; height: 20px; color: #dddddd; font-size: 18px");
		this.name.innerHTML = "cheatas " + cheatas.lib.version;

		this.viewer = document.createElement("div");
		this.viewer.setAttribute("style", "overflow: hidden; overflow-y: auto; -webkit-overflow-scrolling: touch; padding: 10px; height: 40px; color: #ffffff; font-size: 14px");

		this.logger = document.createElement("div");	
		this.logger.setAttribute("style", "overflow: hidden; overflow-y: auto; -webkit-overflow-scrolling: touch; padding: 10px; color: #dddddd; height: 120px; font-size: 14px");

		this.node.appendChild(this.name);
		this.node.appendChild(this.viewer);
		this.node.appendChild(this.logger);
	},

	reset: function() 
	{
		if (this.isUsed == false)
		{
			return;
		}

		this.logger.innerHTML = "";
		this.viewer.innerHTML = "";
	},

	log: function(type, msg) 
	{
		if (this.isUsed == false)
		{
			return;
		}

		if (this.count%100 == cheatas.config.SPEC_DEBUGGER_MAX_LENGTH)
		{
			this.viewer.innerHTML = "";
			this.logger.innerHTML = "";
		}

		if (type == null)
		{
			type = "";
		}

		if(this.type == "" || this.type == type)
		{
			this.logger.innerHTML = this.getString(type, msg) + this.logger.innerHTML;
		}
	},

	trace: function(msg)
	{
		if (this.isUsed == false)
		{
			return;
		}

		if (this.count%100 == cheatas.config.SPEC_DEBUGGER_MAX_LENGTH)
		{
			this.viewer.innerHTML = "";
			this.logger.innerHTML = "";
		}

		this.viewer.innerHTML = this.getString("Trace", msg);
		this.logger.innerHTML = this.viewer.innerHTML + this.logger.innerHTML;
    },

	getString: function(type, msg)
	{
		var str = "";

		if (this.isUsed == false)
		{
			return;
		}

		if (msg instanceof Array)
		{
			for (var i = 1; i < msg.length; ++i)
			{
				str = ">> " + msg[i] + "<br>" + str;
			}

			str = "<span style = \"color: yellow; font-weight: bold;\">" + this.count + "</span> " + type + ": <b>" + msg[0] + "</b><br>" + str;
		}
		else
		{
			str = "<span style = \"color: yellow; font-weight: bold;\">" + this.count + "</span> " + type + ": <b>" + msg + "</b><br>";
		}

		this.count++;
		return str;
	},

	view: function(isUsed)
	{
		if (this.isUsed == isUsed)
		{
			return;
		}

		this.isUsed = isUsed

		if (this.isUsed == true)
		{
			document.body.appendChild(this.node);
		}
		else
		{
			document.body.removeChild(this.node);
		}
	}
}

cheatas.debugger = new cheatas.Debugger();