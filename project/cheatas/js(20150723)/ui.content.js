if(cheatas == null)
{
	var cheatas = new Object();
}

cheatas.Content = function(option) 
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

	cheatas[this.key + cheatas.config.KEY_RECEIVE] = this;
	this.datas = null;
	this.childs = null;
	this.events = null;
	this.nodes = new Object();

	this.apiSeq = 0;
	this.pageSeq = 0;
	this.pageLength = 0;
	this.pageSize = 0;

	this.nodes.body = cheatas.lib.createElement("div", "", "");
	this.nodes.loading = cheatas.lib.createElement("div", "", "animated loading");
}

cheatas.Content.prototype =
{
	init: function()
	{
		cheatas.debugger.log("Function", "cheatas.Content.init()");

		var that = this;
		var event = null;

		function loadMoreData(e)
		{
			that.startAction(e, cheatas.config.ACTION_LOAD_MORE_DATA);
		}

		this.datas = new Array();
		this.childs = new Array();
		this.events = new Array();

		if (this.api instanceof Array)
		{
			this.apiSeq = this.api.length;
		}

		this.nodes.cards = cheatas.lib.createElement("div", this.nodes.body.id + "-card-list", "card-list");
		this.nodes.body.appendChild(this.nodes.cards);

		if (this.isFixed == false)
		{
			this.nodes.more = cheatas.lib.createElement("div", this.nodes.body.id + "-btn-more", "btn btn-more rect font-medium font-tint");
			this.nodes.more.innerHTML = cheatas.config.NAME_MORE;
			this.nodes.body.appendChild(this.nodes.more);

			// addEventListener
			cheatas.lib.addEventListener(this.nodes.more, "click", loadMoreData);

			event = new Object();
			event.node = this.nodes.more;
			event.event = "click";
			event.action = loadMoreData;
			this.events.push(event);
		}

		this.loadData();
    },

	loadData: function()
	{
		cheatas.debugger.log("Function", "cheatas.Content.loadData()");

		this.nodes.body.appendChild(this.nodes.loading);
		this.loading(true);

		switch (this.type)
		{
			case cheatas.config.TYPE_CONTENT_TIMELINE:
			{
				this.nodes.body.setAttribute("class", "timeline");
				this.pageSize = cheatas.config.SPEC_PAGE_SIZE_TIMELINE;
				break;
			}
			case cheatas.config.TYPE_CONTENT_CHANNEL:
			{
				this.nodes.body.setAttribute("class", "channel");
				this.pageSize = cheatas.config.SPEC_PAGE_SIZE_CHANNEL;
				break;
			}
			case cheatas.config.TYPE_CONTENT_FEATURED:
			{
				this.nodes.body.setAttribute("class", "channel");
				this.pageSize = cheatas.config.SPEC_PAGE_SIZE_FEATURED;
				break;
			}
			default:
			{
				alert(cheatas.config.MSG_UNKNOWN_ERROR);
				return;
			}
		}

		if (this.api instanceof Array)
		{
			this.loadMulipleData();
			return;
		}

		cheatas.info.loadSailors(this.api, "cheatas." + this.key + cheatas.config.KEY_RECEIVE + ".loadDataComplete", this.key);
	},

	loadMulipleData: function()
	{
		cheatas.debugger.log("Function", "cheatas.Content.loadMulipleData()");

		var sailors = new Array();
		var results = new Array();

		if (this.apiSeq > 0)
		{
			this.apiSeq--;
			cheatas.info.loadSailors(this.api[this.apiSeq], "cheatas." + this.key + cheatas.config.KEY_RECEIVE + ".loadMulipleData", this.key + this.apiSeq.toString());
		}
		else
		{
			for (var i = 0; i < this.api.length; ++i)
			{
				sailors = cheatas.info.getSailors(this.key + i.toString());
				results = results.concat(sailors);
			}

			cheatas.info.sailorsDic.setValue(this.key, results);
			this.loadDataComplete("Y");
		}
	},

	loadDataComplete: function(yn)
	{
		cheatas.debugger.log("Function",
			[
				"cheatas.Content.loadDataComplete(yn)",
				"yn = " + yn
			]
		);

		this.loading(false);

		if (yn == "Y")
		{
			if (this.isFixed == false && this.keyword.length > 0)
			{
				this.datas = cheatas.info.getSailorsSortedByKeyword(this.key, this.keyword);
			}
			else
			{
				if (this.api instanceof Array)
				{
					this.datas = cheatas.info.getSailorsSortedByDate(this.key, "DESC");
				}
				else
				{
					this.datas = cheatas.info.getSailors(this.key);
				}
			}

			this.pageLength = this.datas.length / this.pageSize;

			if (this.pageLength % 1 > 0)
			{
				this.pageLength = Math.ceil(this.pageLength);
			}

			this.create();
		}
		else
		{
			alert(cheatas.config.MSG_FAIL_TO_LOAD_DATA);
			return;
		}
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
				"cheatas.Content.create()",
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

		var startSeq = this.pageSeq * this.pageSize;
		var nextSeq = this.pageSeq + 1;
		var endSeq = nextSeq * this.pageSize;
		var option = null;
		var card = null;

		if (nextSeq < 0 || nextSeq > this.pageLength + 1)
		{
			return;
		}

		if(endSeq > this.datas.length)
		{
			endSeq = this.datas.length;
		}

		for (var i = startSeq; i < endSeq; ++i)
		{
			if (this.type == cheatas.config.TYPE_CONTENT_TIMELINE)
			{
				if (this.datas[i].type == cheatas.config.TYPE_CARD_STORY)
				{
				option = new cheatas.UIOption();
				option.channelKey = this.datas[i].channelKey;

				if (this.api instanceof Array)
				{
					option.parentKey = this.key;
				}
				else
				{
					option.parentKey = this.datas[i].parentKey;
				}

				option.seq = i;
				option.type = cheatas.config.TYPE_CARD_STORY;
				option.key = this.datas[i].key;
				option.api = this.datas[i].api;
				option.name = this.datas[i].name;
				option.image = this.datas[i].image;
				option.imageCache = this.datas[i].imageCache;
				option.embed = this.datas[i].embed;
				option.description = this.datas[i].description;
				option.date = this.datas[i].date;
				option.url = this.datas[i].url;
				option.tags = this.datas[i].tags;
				option.keyword = this.keyword;
				// option.isFixed = this.isFixed;

				card = new cheatas.StoryCard(option);

				this.childs[i] = card;
				card.nodes.body.setAttribute("id", this.nodes.cards.id + "-card-" + i);
				card.nodes.body.setAttribute("class", "card rect");
				this.nodes.cards.appendChild(card.nodes.body);

				card.init();
				}
				else
				{
				option = new cheatas.UIOption();

				option.channelKey = this.datas[i].channelKey;

				if (this.api instanceof Array)
				{
					option.parentKey = this.key;
				}
				else
				{
					option.parentKey = this.datas[i].parentKey;
				}

				option.seq = i;
				option.type = cheatas.config.TYPE_CARD_VIDEO;
				option.key = this.datas[i].key;
				option.api = this.datas[i].api;
				option.name = this.datas[i].name;
				option.image = this.datas[i].image;
				option.imageCache = this.datas[i].imageCache;
				option.embed = this.datas[i].embed;
				option.description = this.datas[i].description;
				option.date = this.datas[i].date;
				option.url = this.datas[i].url;
				option.tags = this.datas[i].tags;
				option.keyword = this.keyword;
				// option.isFixed = this.isFixed;

				card = new cheatas.Card(option);

				this.childs[i] = card;
				card.nodes.body.setAttribute("id", this.nodes.cards.id + "-card-" + i);
				card.nodes.body.setAttribute("class", "card rect");
				this.nodes.cards.appendChild(card.nodes.body);

				card.init();
				}
			}
			else if (this.type == cheatas.config.TYPE_CONTENT_CHANNEL || cheatas.config.TYPE_CONTENT_FEATURED)
			{
				option = new cheatas.UIOption();

				option.channelKey = this.datas[i].channelKey;

				if (this.api instanceof Array)
				{
				option.parentKey = this.key;
				}
				else
				{
				option.parentKey = this.datas[i].parentKey;
				}

				option.seq = i;
				option.type = cheatas.config.TYPE_CARD_LIST;
				option.key = this.datas[i].key;
				option.api = this.datas[i].api;
				option.name = this.datas[i].name;
				option.image = this.datas[i].image;
				option.imageCache = this.datas[i].imageCache;
				option.embed = this.datas[i].embed;
				option.description = this.datas[i].description;
				option.date = this.datas[i].date;
				option.url = this.datas[i].url;
				option.tags = this.datas[i].tags;
				option.keyword = this.keyword;
				// option.isFixed = this.isFixed;

				card = new cheatas.Card(option);

				this.childs[i] = card;
				card.nodes.body.setAttribute("id", this.nodes.cards.id + "-card-" + i);
				card.nodes.body.setAttribute("class", "card rect");
				this.nodes.cards.appendChild(card.nodes.body);

				card.init();
			}
			else
			{
				alert(cheatas.config.MSG_UNKNOWN_ERROR);
				return;
			}
		}

		this.pageSeq = nextSeq;

		if (this.isFixed == false)
		{
			this.createTags(this.key);
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
		cheatas.debugger.log("Function",
			[
				"cheatas.Content.remove()",
				"this.childs.length = " + this.childs.length
			]
		);

		for (var i = 0; i < this.childs.length; ++i)
		{

			this.childs[i].remove();
			this.childs[i] = null;
		}

		for (var i = 0; i < this.events.length; ++i)
		{
			cheatas.debugger.trace(
				[
					"cheatas.Content.remove()",
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

	createTags: function(key)
	{
		cheatas.ui.createTags(key);
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