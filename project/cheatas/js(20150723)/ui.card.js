if(cheatas == null)
{
	var cheatas = new Object();
}

cheatas.Card = function(option) 
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
	this.tags = this.option.tags;

	this.keyword = this.option.keyword;
	this.isFixed = this.option.isFixed;

	this.backgroundColor = this.option.backgroundColor;
	this.backgroundImage = this.option.backgroundImage;

	// cheatas[this.key + cheatas.config.KEY_RECEIVE] = this;
	this.datas = null;
	this.childs = null;
	this.events = null;
	this.nodes = new Object();

	this.nodes.body = cheatas.lib.createElement("div", "", "");
	this.nodes.loading = cheatas.lib.createElement("div", "", "animated loading");
	this.nodes.lookup = null;
	this.nodes.lookupThumbnail = null;
	this.nodes.lookupImage = null;
	this.nodes.lookupTitle = null;
	this.nodes.date = null;
	this.nodes.player = null;
	this.nodes.embed = null;
	this.nodes.iframe = null;
	this.nodes.image = null;
	this.nodes.name = null;
	this.nodes.info = null;
	this.nodes.description = null;
	this.nodes.addons = null;
	this.nodes.tags = null;
	this.nodes.facebookLikeButton = null;
}

cheatas.Card.prototype =
{
	init: function()
	{
		cheatas.debugger.log("Function", "cheatas.Card.init()");

		this.datas = new Array();
		this.childs = new Array();
		this.events = new Array();
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
			this.nodes.loading.setAttribute("class" , "animated loading data-loading")
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
				"cheatas.Card.create()",
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

		switch (this.type)
		{
			case cheatas.config.TYPE_CARD_LIST:
			{
				this.createListCard();
				break;
			}
			case cheatas.config.TYPE_CARD_VIDEO:
			{
				this.createVideoCard();
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
		cheatas.debugger.log("Function", "cheatas.Card.remove()");

		for (var i = 0; i < this.events.length; ++i)
		{
			cheatas.debugger.trace(
				[
					"event.node = " + this.events[i].node.id,
					"event.event = " + this.events[i].event,
					"event.action = " + this.events[i].action
				]
			);

			cheatas.lib.removeEventListener(this.events[i].node, this.events[i].event, this.events[i].action);
		}
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

	createListCard: function()
	{
		cheatas.debugger.log("Function", "cheatas.Card.createListCard()");

		var that = this;
		var event = null;

		function loadTimelineData(e)
		{
			that.startAction(e, cheatas.config.ACTION_LOAD_TIMELINE_DATA);
		}

		function loadDataComplete(e)
		{

			that.nodes.embed.appendChild(that.nodes.image);
			that.loading(false);
			that.startAction(e, cheatas.config.ACTION_LOAD_DATA_COMPLETE);
		}

		this.nodes.embed = cheatas.lib.createElement("div", this.nodes.body.id + "-embed", "embed");
		this.nodes.body.appendChild(this.nodes.embed);

		this.nodes.embed.appendChild(this.nodes.loading);
		this.loading(true); 

		if (this.imageCache != null)
		{
			cheatas.debugger.trace("this.imageCache.src = " + this.imageCache.src);

			this.nodes.embed.appendChild(this.imageCache);
			this.loading(false);
		}
		else
		{
			this.nodes.image = cheatas.lib.createElement("img", this.nodes.embed.id + "-image", "image btn");
			this.nodes.image.setAttribute("src", this.image);
			this.nodes.image.setAttribute("alt", "썸네일 이미지");

			// addEventListener
			cheatas.lib.addEventListener(this.nodes.image, "click", loadTimelineData);

			event = new Object();
			event.node = this.nodes.image;
			event.event = "click";
			event.action = loadTimelineData;
			this.events.push(event);

			// addEventListener
			cheatas.lib.addEventListener(this.nodes.image, "load", loadDataComplete);

			event = new Object();
			event.node = this.nodes.image;
			event.event = "load";
			event.action = loadDataComplete;
			this.events.push(event);

			this.imageCache = this.nodes.image;
		}

		this.nodes.info = cheatas.lib.createElement("div", this.nodes.body.id + "-info", "info font-small font-tint");
		this.nodes.body.appendChild(this.nodes.info);

		this.nodes.name = cheatas.lib.createElement("div", this.nodes.info.id + "-name", "name is-active font-medium btn");
		this.nodes.name.innerHTML = this.name;
		this.nodes.info.appendChild(this.nodes.name);

		// addEventListener
		cheatas.lib.addEventListener(this.nodes.name, "click", loadTimelineData);
		event = new Object();
		event.node = this.nodes.name;
		event.event = "click";
		event.action = loadTimelineData;
		this.events.push(event);

		this.nodes.description = cheatas.lib.createElement("div", this.nodes.info.id + "-description", "description btn");
		this.nodes.description.innerHTML = cheatas.lib.shortenString(this.description, cheatas.config.SPEC_STRING_MAX_LENGTH);
		this.nodes.info.appendChild(this.nodes.description);

		// addEventListener
		cheatas.lib.addEventListener(this.nodes.description, "click", loadTimelineData);
		event = new Object();
		event.node = this.nodes.name;
		event.event = "click";
		event.action = loadTimelineData;
		this.events.push(event);
	},

	createVideoCard: function()
	{
		cheatas.debugger.log("Function", "cheatas.Card.createVideoCard()");

		var that = this;
		var event = null;
		var channel = cheatas.info.getChannel(this.channelKey);

		function loadTimelineData(e)
		{
			that.startAction(e, cheatas.config.ACTION_LOAD_TIMELINE_DATA);
		}

		function loadDataComplete(e)
		{
			that.loading(false);
			that.startAction(e, cheatas.config.ACTION_LOAD_DATA_COMPLETE);
		}

		this.nodes.lookup = cheatas.lib.createElement("div", this.nodes.body.id + "-lookup", "lookup");
		this.nodes.body.appendChild(this.nodes.lookup);

		this.nodes.lookupThumbnail = cheatas.lib.createElement("div", this.nodes.lookup.id + "-thumbnail", "thumbnail");
		this.nodes.lookup.appendChild(this.nodes.lookupThumbnail);

		this.nodes.lookupImage = cheatas.lib.createElement("img", this.nodes.lookupThumbnail.id + "-image", "image btn");
		this.nodes.lookupImage.setAttribute("src", channel.image);
		this.nodes.lookupImage.setAttribute("alt", "썸네일 이미지");
		this.nodes.lookupThumbnail.appendChild(this.nodes.lookupImage);

		// addEventListener
		cheatas.lib.addEventListener(this.nodes.lookupImage, "click", loadTimelineData);

		event = new Object();
		event.node = this.nodes.lookupImage;
		event.event = "click";
		event.action = loadTimelineData;
		this.events.push(event);

		this.nodes.lookupTitle = cheatas.lib.createElement("div", this.nodes.lookup.id + "-name", "name font-medium font-tint btn");
		this.nodes.lookupTitle.innerHTML = channel.name;
		this.nodes.lookup.appendChild(this.nodes.lookupTitle);

		// addEventListener
		cheatas.lib.addEventListener(this.nodes.lookupTitle, "click", loadTimelineData);

		event = new Object();
		event.node = this.nodes.lookupTitle;
		event.event = "click";
		event.action = loadTimelineData;
		this.events.push(event);

		this.nodes.date = cheatas.lib.createElement("div", this.nodes.lookup.id + "-date", "date font-medium font-tint");
		this.nodes.date.innerHTML = cheatas.lib.converseDateForm(this.date, cheatas.config.TYPE_DATE_FORM_INTERVAL);
		this.nodes.lookup.appendChild(this.nodes.date);

		this.nodes.player = cheatas.lib.createElement("div", this.nodes.body.id + "-player", "player");
		this.nodes.body.appendChild(this.nodes.player);

		this.nodes.embed = cheatas.lib.createElement("div", this.nodes.player.id + "-embed", "embed");
		this.nodes.player.appendChild(this.nodes.embed);

		this.nodes.embed.appendChild(this.nodes.loading);
		this.loading(true);

		this.nodes.iframe = cheatas.lib.createElement("iframe", this.nodes.embed.id + "-iframe", "iframe");
		this.nodes.iframe.setAttribute("src", this.embed);
		this.nodes.embed.appendChild(this.nodes.iframe);

		// addEventListener
		cheatas.lib.addEventListener(this.nodes.iframe, "load", loadDataComplete);

		event = new Object();
		event.node = this.nodes.iframe;
		event.event = "load";
		event.action = loadTimelineData;
		this.events.push(event);

		this.nodes.info = cheatas.lib.createElement("div", this.nodes.player.id + "-info", "info");
		this.nodes.player.appendChild(this.nodes.info);

		this.nodes.name = cheatas.lib.createElement("div", this.nodes.info.id + "-name", "name is-active font-large");
		this.nodes.name.innerHTML = this.name;
		this.nodes.info.appendChild(this.nodes.name);

		if (this.description != null && this.description != "")
		{
			this.nodes.description = cheatas.lib.createElement("div", this.nodes.info.id + "-description", "description font-medium");
			this.nodes.description.innerHTML = this.description;
			this.nodes.info.appendChild(this.nodes.description);
		}

		if (this.url != null && this.url != "")
		{
			this.nodes.url = cheatas.lib.createElement("a", this.nodes.info.id + "-url", "url font-medium font-tint");
			this.nodes.url.setAttribute("href", this.url);
			this.nodes.url.innerHTML = cheatas.lib.shortenString(this.url, cheatas.config.SPEC_URL_MAX_LENGTH);
			this.nodes.info.appendChild(this.nodes.url);
		}

		this.nodes.addons = cheatas.lib.createElement("div", this.nodes.body.id + "-add-ons", "add-ons font-medium font-tint");
		this.nodes.body.appendChild(this.nodes.addons);

		this.nodes.tags = cheatas.lib.createElement("ul", this.nodes.addons.id + "-tags-list", "tags-list font-medium font-tint");
		this.nodes.addons.appendChild(this.nodes.tags);

		this.nodes.facebookLikeButton = cheatas.lib.createElement("iframe", this.nodes.addons.id + "-facebook-like-button", "facebook-like-button");
		this.nodes.facebookLikeButton.setAttribute("src", "http://www.facebook.com/plugins/like.php?href=http://www.imbc.com/labs/cheatas/index.html?card=" + this.key + "&amp;layout=standard&amp;action=like&amp;show_faces=false&amp;share=false");
		this.nodes.facebookLikeButton.setAttribute("frameborder", "no");
		this.nodes.facebookLikeButton.setAttribute("scrollin", "no");
		this.nodes.addons.appendChild(this.nodes.facebookLikeButton);

		this.createTags();
		this.setStyle();
	},

	createTags: function()
	{
		cheatas.debugger.log("Function", "cheatas.Card.createTags()");

		var that = this;
		var str = null;
		var tags = null;
		var tag = null;
		var node = null;
		var event = null;

		function sortDataByKeyword(e)
		{
			that.startAction(e, cheatas.config.ACTION_SORT_DATA_BY_KEYWORD);
		}

		this.nodes.tags.innerHTML = "";

		if (this.tags != null)
		{
			str = this.tags.toString();
			tags = str.split(",");

			for (var i = 0; i < tags.length; ++i)
			{
				tag = tags[i].trim();
				node = null;

				node = cheatas.lib.createElement("li", this.nodes.tags.id + "-tags-item-" + i, "tags-item btn");
				node.setAttribute("keyword", tag);
				node.innerHTML = cheatas.config.SIGN_TAGS + tag;
				this.nodes.tags.appendChild(node);

				// addEventListener
				cheatas.lib.addEventListener(node, "click", sortDataByKeyword);
				event = new Object();
				event.node = node;
				event.event = "click";
				event.action = sortDataByKeyword;
				this.events.push(event);

				if (tag == this.keyword)
				{
				node.setAttribute("class", "tags-item font-blue btn");
				}
			}
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