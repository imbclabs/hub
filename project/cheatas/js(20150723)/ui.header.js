if(cheatas == null)
{
	var cheatas = new Object();
}

cheatas.Header = function(option) 
{
	this.option = option;

	if (this.option == null)
	{
		this.option = new cheatas.UIOption();
	}

	this.channelKey = this.option.channelKey;
	this.parentKey = this.option.parentKey;
	this.seq = this.option.seq;
	this.type = this.option.type;
	this.key = this.option.key;
	this.api = this.option.api;
	this.name = this.option.name;
	this.image = this.option.image;
	this.imageCache = this.option.imageCache;
	this.embed = this.option.embed;
	this.description = this.option.description;
	this.date = this.option.date;
	this.url = this.option.url;
	this.tag = this.option.tag;

	this.keyword = this.option.keyword;
	this.isFixed = this.option.isFixed;

	this.backgroundColor = this.option.backgroundColor;
	this.backgroundImage = this.option.backgroundImage;

	// cheatas[this.key + cheatas.config.KEY_RECEIVE] = this;
	this.datas = null;
	this.childs = null;
	this.nodes = new Object();

	this.nodes.body = cheatas.lib.createElement("div", "", "");
	this.nodes.loading = cheatas.lib.createElement("div", "", "animated loading");
}

cheatas.Header.prototype =
{
	init: function()
	{
		cheatas.debugger.log("Function", "cheatas.Header.init()");

		this.datas = new Array();
		this.childs = new Array();
		this.loadData();
	},

	loadData: function()
	{
		this.create();
	},

	loadDataComplete: function(yn)
	{
		//
	},

	loading: function(ac)
	{
		if (ac == true)
		{
			this.nodes.loading.setAttribute("class" , this.nodes.loading.className + " data-loading")
		}
		else
		{
			this.nodes.loading.setAttribute("class" , "animated loading")
		}
	},

	create: function()
	{
		cheatas.debugger.log("Function",
			[
				"cheatas.Header.create()",
				"this.channelKey = " + this.channelKey,
				"this.parentKey = " + this.parentKey,
				"this.seq = " + this.seq,
				"this.type = " + this.type,
				"this.key = " + this.key,
				"this.api = " + this.api,
				"this.name = " + this.name,
				"this.image = " + this.image,
				"this.embed = " + this.embed,
				"this.description = " + this.description,
				"this.date = " + this.date,
				"this.url = " + this.url,
				"this.tags = " + this.tags,
				"this.keyword = " + this.keyword
			]
		);

		var that = this;

		this.nodes.left = cheatas.lib.createElement("div", this.nodes.body.id + "-left", "left");
		this.nodes.center = cheatas.lib.createElement("div", this.nodes.body.id + "-center", "center");
		this.nodes.right =cheatas.lib.createElement("div", this.nodes.body.id + "-right", "right");

		this.nodes.body.appendChild(this.nodes.left);
		this.nodes.body.appendChild(this.nodes.center);
		this.nodes.body.appendChild(this.nodes.right);

		this.nodes.logo = cheatas.lib.createElement("div", this.nodes.left.id + "-logo", "logo btn");
		this.nodes.navTabList = cheatas.lib.createElement("ul", this.nodes.center.id + "-nav-tab-list", "nav-tab-list font-medium btn");

		this.nodes.left.appendChild(this.nodes.logo);
		this.nodes.center.appendChild(this.nodes.navTabList);

		this.nodes.navTabTimeline = cheatas.lib.createElement("li", this.nodes.navTabList.id + "-nav-tab-item-0", "nav-tab-item");
		this.nodes.navTabChannel = cheatas.lib.createElement("li", this.nodes.navTabList.id + "-nav-tab-item-1", "nav-tab-item");

		this.nodes.navTabList.appendChild(this.nodes.navTabTimeline);
		this.nodes.navTabList.appendChild(this.nodes.navTabChannel);

		this.nodes.logo.innerHTML = "CHEATAS";

		cheatas.lib.addEventListener(this.nodes.logo, "click",
			function(e)
			{
				var a = cheatas.config.ACTION_RESET_UI;
				that.startAction(e, a);
			}
		);

		this.nodes.navTabTimeline.innerHTML = this.name;

		cheatas.lib.addEventListener(this.nodes.navTabTimeline, "click",
			function(e)
			{
				var a = cheatas.config.ACTION_GO_TO_TIMELINE;
				that.startAction(e, a);
			}
		);

		this.nodes.navTabChannel.innerHTML = cheatas.config.NAME_CHANNEL;

		cheatas.lib.addEventListener(this.nodes.navTabChannel, "click",
			function(e)
			{
				var a = cheatas.config.ACTION_GO_TO_CHANNEL;
				that.startAction(e, a);
			}
		);

		switch (this.type)
		{
			case cheatas.config.TYPE_CONTENT_TIMELINE:
			{
				this.nodes.navTabTimeline.setAttribute("class", "nav-tab-item is-active");
				break;
			}
			case cheatas.config.TYPE_CONTENT_CHANNEL:
			{
				this.nodes.navTabChannel.setAttribute("class", "nav-tab-item is-active");
				break;
			}
			default:
			{
				alert(cheatas.config.MSG_UNKNOWN_ERROR);
				return;
			}
		}

		this.setStyle();
	},

	update: function()
	{
		//
	},

	reset: function()
	{
		//
	},

	remove: function()
	{
		//
	},

	setStyle: function()
	{
		if (this.backgroundColor != null)
		{
			this.nodes.body.setAttribute("style", "background-color: " + this.backgroundColor + ";");
		}

		if (this.backgroundImage != null)
		{
			this.nodes.body.setAttribute("style", "background-image: url(\"" + this.backgroundImage + "\") no-repeat;");
		}
	},

	startAction: function(e, a, param)
	{
		if (e == null)
		{
			alert(cheatas.config.MSG_UNKNOWN_ERROR);
			return;
		}

		if (a == null)
		{
			alert(cheatas.config.MSG_UNKNOWN_ACTION);
			return;
		}

		if (param == null)
		{
			param = new Object();
		}

		param.channelKey = this.channelKey;
		param.parentKey = this.parentKey;
		param.seq = this.seq; 
		param.type = this.type;
		param.key = this.key;
		param.api = this.api;
		param.keyword = e.target.getAttribute("keyword");

		cheatas.ui.startAction(e, a, param);
	},

	startActionComplete: function(e, a, param, x, y)
	{
		cheatas.ui.startActionComplete(e, a, param, x, y);
	}
}