if(cheatas == null)
{
	var cheatas = new Object();
}

cheatas.StoryCard = function(option) 
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
	this.isNCast = this.option.isNCast;
	this.keyword = this.option.keyword;
	this.isFixed = this.option.isFixed;

	this.backgroundColor = this.option.backgroundColor;
	this.backgroundImage = this.option.backgroundImage;

	// cheatas[this.key + cheatas.config.KEY_RECEIVE] = this;
	this.datas = null;
	this.childs = null;
	this.events = null;
	this.nodes = new Object();

	this.pageControl = null;
	this.slideBox = null;
	this.pageSeq = 0;
	this.pageLength = this.name.length;

	this.nodes.body = cheatas.lib.createElement("div", "", "");
	this.nodes.loading = cheatas.lib.createElement("div", "", "animated loading");
	this.nodes.lookup = null;
	this.nodes.lookupThumbnail = null;
	this.nodes.lookupImage = null;
	this.nodes.lookupTitle = null;
	this.nodes.date = null;
	this.nodes.player = null;
	this.nodes.currentPageBox = null;
	this.nodes.pageNavi = null;
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

cheatas.StoryCard.prototype =
{
	init: function()
	{
		cheatas.debugger.log("Function", "cheatas.StoryCard.init()");

		if (this.imageCache == null)
		{
			this.imageCache = new Array();
		}

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
		cheatas.debugger.log("Function", "cheatas.StoryCard.create()");

		var that = this;
		var event = null;
		var channel = cheatas.info.getChannel(this.channelKey);
		var delegateSlideBox = null;
		var optionSlideBox = null;
		var delegatePageControl = null;
		var optionPageControl = null;

		function loadTimelineData(e)
		{
			that.startAction(e, cheatas.config.ACTION_LOAD_TIMELINE_DATA);
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

		// 슬라이드 박스 시작
		delegateSlideBox = function() {};

		delegateSlideBox.prototype = {

			initBox: function(div)
			{
				cheatas.debugger.log("Function",
					[
						"cheatas.StoryCard.delegateSlideBox.initBox(div)",
						"div = " + div
					]
				);

				that.nodes.currentPageBox = div; 
				that.createPage(div, 0);
			},   

			moveStart: function(div, dr)
			{
				cheatas.debugger.log("Function", 
					[
						"cheatas.StoryCard.delegateSlideBox.moveStart(div, dr)",
						"div = " + div,
						"dr = " + dr
					]
				);

				cheatas.config.isAnimation = true;
				that.createPage(div, dr);
			},
				
			moveChanged: function(div, dr)
			{
				cheatas.debugger.log("Function",
					[
						"cheatas.StoryCard.delegateSlideBox.moveChanged(div, dr)",
						"div = " + div,
						"dr = " + dr,
						"that.pageSeq" + that.pageSeq
					]
				);

				var seq = that.pageSeq + dr;

				that.nodes.currentPageBox = div;
				that.setPageIndex(seq);
			},

			moveEnd: function(div, dr)
			{
				cheatas.debugger.log("Function",
					[
						"cheatas.StoryCard.delegateSlideBox.moveEnd(div, dr)",
						"div = " + div,
						"dr = " + dr
					]
				);

				cheatas.config.isAnimation = false;
				that.nodes.currentPageBox = div; 
			}
		}

		optionSlideBox = new cheatas.UISlideBoxOption();
		optionSlideBox.divKey = "div";

		this.slideBox = new cheatas.UISlideBox(new delegateSlideBox(), optionSlideBox);
		this.slideBox.nodes.body.setAttribute("id", this.nodes.player.id + "-page-list");
		this.slideBox.nodes.body.setAttribute("class", "page-list");
		this.nodes.player.appendChild(this.slideBox.nodes.body);

		this.slideBox.init();

		// 페이지 컨트롤 시작
		this.nodes.pageNavi = document.createElement("div");
		this.nodes.pageNavi.setAttribute("id", this.nodes.player.id + "-page-navi");
		this.nodes.pageNavi.setAttribute("class", "page-navi pagecontrol-bottom align-center");
		this.nodes.player.appendChild(this.nodes.pageNavi);

		delegatePageControl = function() {};

		delegatePageControl.prototype = {

			changePage: function(seq)
			{
				cheatas.debugger.log("Function",
					[
						"cheatas.StoryCard.delegatePageControl.changePage(seq)",
						"seq = " + seq
					]
				);

				if(seq == that.pageSeq)
				{
					return;
				}

				that.changePage(seq);
			}
		}

		optionPageControl = new cheatas.UIPageControlOption();
		optionPageControl.pageLength = this.pageLength;
		optionPageControl.usedNumber = false;

		this.pageControl = new cheatas.UIPageControl(new delegatePageControl(), optionPageControl);
		this.pageControl.nodes.body.setAttribute("id", this.nodes.pageNavi.id + "-pagecontrol");
		this.pageControl.nodes.body.setAttribute("class", "pagecontrol");
		this.nodes.pageNavi.appendChild(this.pageControl.nodes.body);

		this.pageControl.init();

		// 태그, 페이스북 버튼 시작
		this.nodes.addons = cheatas.lib.createElement("div", this.nodes.body.id + "-add-ons", "add-ons font-medium font-tint");
		this.nodes.body.appendChild(this.nodes.addons);

		this.nodes.tags = cheatas.lib.createElement("ul", this.nodes.addons.id + "-tags-list", "tags-list font-medium font-tint");
		this.nodes.addons.appendChild(this.nodes.tags);

		this.nodes.facebookLikeButton = cheatas.lib.createElement("iframe", this.nodes.addons.id + "-facebook-like-button", "facebook-like-button");
		this.nodes.facebookLikeButton.setAttribute("src", "http://www.facebook.com/plugins/like.php?href=http://www.imbc.com/labs/cheatas/index.html#" + this.key + "&amp;layout=standard&amp;action=like&amp;show_faces=false&amp;share=false");
		this.nodes.facebookLikeButton.setAttribute("frameborder", "no");
		this.nodes.facebookLikeButton.setAttribute("scrollin", "no");
		this.nodes.addons.appendChild(this.nodes.facebookLikeButton);

		this.createTags();
		this.setStyle();

		this.createPageGroup();
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
				"cheatas.StoryCard.remove()",
				"this.name = " + this.name,
				"this.events.length = " + this.events.length
			]
		);

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

	createTags: function()
	{
		cheatas.debugger.log("Function", "cheatas.StoryCard.createTags()");

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

	createPageGroup: function()
	{
		cheatas.debugger.log("Function", "cheatas.StoryCard.createPageGroup()");

		if(this.nodes.currentPageBox == null)
		{
			return;
		}

		this.pageControl.reset(this.pageLength);
		this.setPageIndex(this.pageSeq);
		this.createPage(this.nodes.currentPageBox, 0);
	},

	setPageIndex: function(seq)
	{
		cheatas.debugger.log("Function",
			[
				"cheatas.StoryCard.setPageIndex(seq)",
				"seq = " + seq
			]
		);

		this.pageSeq = seq;

		if(this.pageControl != null)
		{
			this.pageControl.setPageIndex(this.pageSeq);
		}

		if(this.slideBox != null)
		{
			this.slideBox.pageLength = this.pageLength;
			this.slideBox.pageSeq = this.pageSeq;
		}
	},

	createPage: function(div, dr)
	{
		cheatas.debugger.log("Function",
			[
				"cheatas.StoryCard.createPage(div, dr)",
				"div = " + div,
				"dr = " + dr,
				"this.pageSeq = " + this.pageSeq,
				"this.pageLength = " + this.pageLength
			]
		);

		var that = this;
		var event = null;
		var seq = this.pageSeq + dr;

		function loadDataComplete(e)
		{
			var embedRect = cheatas.lib.getAbsoluteBounce(that.nodes.embed);
			var imageRect = cheatas.lib.getEqualRatioRect(that.nodes.image.width, that.nodes.image.height, embedRect.width, embedRect.height, true)

			that.nodes.image.style.width = imageRect.width + "px";
			that.nodes.image.style.height = imageRect.height + "px";

			that.nodes.embed.appendChild(that.nodes.image);
			that.nodes.embed.appendChild(that.nodes.info);
			// that.loading(false);

			that.startAction(e, cheatas.config.ACTION_LOAD_DATA_COMPLETE);
		}

		if(seq < 0 || seq >= this.pageLength)
		{
			return;
		}

		div.innerHTML = "";

		this.nodes.embed = cheatas.lib.createElement("div", this.nodes.player.id + "-embed", "embed");
		div.appendChild(this.nodes.embed);

		// this.nodes.embed.appendChild(this.nodes.loading);
		// this.loading(true);

		if (this.imageCache[seq] != null)
		{
			cheatas.debugger.trace(
				[
					"cheatas.Card.createPage()",
					"this.imageCache.src = " + this.imageCache[seq].src
				]
			);

			this.nodes.embed.appendChild(this.imageCache[seq]);
			// this.loading(false);
		}
		else
		{
			this.nodes.image = cheatas.lib.createElement("img", this.nodes.embed.id + "-image", "image");
			this.nodes.image.setAttribute("src", this.image[seq]);
			this.nodes.image.setAttribute("alt", "썸네일 이미지");

			// addEventListener
			cheatas.lib.addEventListener(this.nodes.image, "load", loadDataComplete);

			event = new Object();
			event.node = this.nodes.image;
			event.event = "load";
			event.action = loadDataComplete;
			this.events.push(event);

			this.imageCache[seq] = this.nodes.image[seq];
		}

		this.nodes.info = cheatas.lib.createElement("div", this.nodes.embed.id + "-info", "info");
		// this.nodes.embed.appendChild(this.nodes.info);

		this.nodes.name = cheatas.lib.createElement("div", this.nodes.info.id + "-name", "name is-active font-large");
		this.nodes.name.innerHTML = this.name[seq];
		this.nodes.info.appendChild(this.nodes.name);

		if (this.description[seq] != null && this.description[seq] != "")
		{
			this.nodes.description = cheatas.lib.createElement("div", this.nodes.info.id + "-description", "description font-medium");
			this.nodes.description.innerHTML = this.description[seq];
			this.nodes.info.appendChild(this.nodes.description);
		}

		if (this.url[seq] != null && this.url[seq] != "")
		{
			this.nodes.url = cheatas.lib.createElement("a", this.nodes.info.id + "-url", "url font-medium font-tint");
			this.nodes.url.setAttribute("href", this.url[seq]);
			this.nodes.url.innerHTML = cheatas.lib.shortenString(this.url[seq], cheatas.config.SPEC_URL_MAX_LENGTH);
			this.nodes.info.appendChild(this.nodes.url);
		}
	},

	changePage: function(seq, isAni)
	{
		cheatas.debugger.log("Function", 
			[
				"cheatas.StoryCard.changePage(seq, isAni)",
				"seq = " + seq,
				"isAni = " + isAni,
				"this.pageSeq = " + this.pageSeq
			]
		);

		if (isAni == null)
		{
			isAni = true;
		}

		if (this.nodes.currentPageBox == null)
		{
			return;
		}

		if (this.slideBox.isMoveable == true)
		{
			return;
		}

		if (this.slideBox.isDirectControl == true)
		{
			this.slideBox.isDirectControl = false;
		}

		if (this.pageSeq != -1 && isAni == true)
		{
			if (seq > this.pageSeq)
			{
				this.pageSeq = seq - 1;
				this.slideBox.moveSlide(1);
			}
			else
			{
				this.pageSeq = seq + 1;
				this.slideBox.moveSlide(-1);
			}

			this.setPageIndex(seq);
		}
		else
		{
			this.setPageIndex(seq);
		}
	},

	startAction: function(e, a, param)
	{
		cheatas.debugger.log("Event",
			[
				"cheatas.StoryCard.startAction(e)",
				"e = " + e,
				"a = " + a,
				"param = " + param
			]
		);

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