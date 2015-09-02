if(cheatas == null)
{
	var cheatas = new Object();
}

document.write("<script type=\"text/javascript\" src=\"" + cheatasSrc + "ui.header.js\"></script>");
document.write("<script type=\"text/javascript\" src=\"" + cheatasSrc + "ui.pagecontrol.js\"></script>");
document.write("<script type=\"text/javascript\" src=\"" + cheatasSrc + "ui.slidebox.js\"></script>");
document.write("<script type=\"text/javascript\" src=\"" + cheatasSrc + "ui.card.story.js\"></script>");
document.write("<script type=\"text/javascript\" src=\"" + cheatasSrc + "ui.card.js\"></script>");
document.write("<script type=\"text/javascript\" src=\"" + cheatasSrc + "ui.content.js\"></script>"); 
document.write("<script type=\"text/javascript\" src=\"" + cheatasSrc + "ui.footer.js\"></script>");
document.write("<link rel=\"stylesheet\" href=\"./css/ui.css\">");

cheatas.UIOption = function()
{
	this.channelKey = ""; // 이 객체가 속한 채널의 키, 채널은 데이터 모음의 최소 단위
	this.parentKey = ""; // 이 객체의 부모 객체의 키
	this.seq = -1; // 형제 객체 중 이 객체의 순서
	this.type = cheatas.config.TYPE_CONTENT_TIMELINE; // Content의 종류
	this.key = cheatas.config.KEY_CONTENT_TIMELINE; // Content의 API를 호출하기 위한 키
	this.api = cheatas.config.API_CONTENT_TIMELINE; // Content의 API 주소
	this.name = cheatas.config.NAME_TIMELINE; // 제목
	this.image = ""; // 썸네일 이미지
	this.imageCache = null; // 썸네일 이미지 캐시
	this.embed = ""; // 임베디드 소스 주소
	this.description = ""; // 설명
	this.date = "";	// 등록일시
	this.url = ""; // 관련 링크
	this.tags = ""; // 관련 태그

	this.keyword = ""; // 검색어
	this.isFixed = false; // 최초 생성 후 변동이 없는지 여부

	this.backgroundColor = ""; // 배경 색상
	this.backgroundImage = ""; // 배경 이미지
},

cheatas.UI = function(option) 
{
	this.option = option;

	if (option == null)
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

	// cheatas[this.key + cheatas.config.KEY_RECEIVE] = this; // 이 객체의 참조
	this.datas = null; // 이 객체의 데이터 참조
	this.childs = null; // 이 객체의 자식 참조
	this.events = null; // 이 객체의 이벤트 참조
	this.nodes = new Object(); // 이 객체의 노드 참조

	this.ignoreHashChangeEvent = false;
	this.isScrollingUp = false;
	this.scrollTop = 0;

	this.nodes.body = cheatas.lib.createElement("div", cheatas.config.NAMESPACE + "-wrap", "wrap");
	this.nodes.loading = cheatas.lib.createElement("div", "", "animated loading");
	this.nodes.header = null;
	this.nodes.container = null;
	this.nodes.footer = null;
	this.nodes.left = null;
	this.nodes.center = null;
	this.nodes.right = null;
	this.nodes.tags = null;
	this.nodes.content = null;
	this.nodes.featured = null;
}

cheatas.UI.prototype =
{
	init: function()
	{
		var that = this;

		cheatas.debugger.init();
		cheatas.debugger.view(false);
		cheatas.debugger.view(true);
		cheatas.debugger.log("Function", "cheatas.UI.init()");

		function loadTimelineDataOnHashChange(e)
		{
			that.startAction(e, cheatas.config.ACTION_LOAD_TIMELINE_DATA_ON_HASH_CHANGE);
		}

		cheatas.lib.addEventListener(window, "hashchange", loadTimelineDataOnHashChange);

		this.datas = new Array();
		this.childs = new Array();
		this.events = new Array();
		this.loadData();
	},

	loadData: function()
	{
		cheatas.debugger.log("Function", "cheatas.UI.loadData()");

		cheatas[cheatas.config.KEY_CONTENT_CHANNEL + cheatas.config.KEY_RECEIVE] = this;
		cheatas.info.loadSailors(cheatas.config.API_CONTENT_CHANNEL, "cheatas." + cheatas.config.KEY_CONTENT_CHANNEL + cheatas.config.KEY_RECEIVE + ".loadDataComplete", cheatas.config.KEY_CONTENT_CHANNEL);
	},

	loadDataComplete: function(yn)
	{
		cheatas.debugger.log("Function",
			[
				"cheatas.UI.loadDataComplete(yn)",
				"yn = " + yn
			]
		);

		if (yn == "Y")
		{
			this.create();
		}
		else
		{
			alert(cheatas.config.MSG_FAIL_TO_LOAD_DATA);
		}
	},

	loading: function(ac)
	{
		if (ac == true)
		{
			this.nodes.loading.setAttribute("class" , this.nodes.loading.className + " data-loading");
		}
		else
		{
			this.nodes.loading.setAttribute("class" , "animated loading");
		}
	},

	create: function()
	{
		cheatas.debugger.log("Function", 
			[
				"cheatas.UI.create()",
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
		var scrollHeader = null;
		var event = null;
		var hash = null;
		var key = null;
		var keyword = null;
		var channel = null;

		this.nodes.header = cheatas.lib.createElement("div", this.nodes.body.id + "-header", "header");
		this.nodes.container = cheatas.lib.createElement("div", this.nodes.body.id + "-container", "container");
		this.nodes.footer = cheatas.lib.createElement("div", this.nodes.body.id + "-footer", "footer");

		this.nodes.body.appendChild(this.nodes.header);
		this.nodes.body.appendChild(this.nodes.container);
		this.nodes.body.appendChild(this.nodes.footer);

		this.nodes.left = cheatas.lib.createElement("div", this.nodes.container.id + "-left", "left");
		this.nodes.center = cheatas.lib.createElement("div", this.nodes.container.id + "-center", "center");
		this.nodes.right = cheatas.lib.createElement("div", this.nodes.container.id + "-right", "right");

		this.nodes.container.appendChild(this.nodes.left);
		this.nodes.container.appendChild(this.nodes.center);
		this.nodes.container.appendChild(this.nodes.right);

		this.nodes.tags = cheatas.lib.createElement("ul", this.nodes.left.id + "-tags-list", "tags-list");
		this.nodes.content = cheatas.lib.createElement("div", this.nodes.center.id + "-content", "");
		this.nodes.featured = cheatas.lib.createElement("div", this.nodes.right.id + "-featured", "featured rect");

		this.nodes.left.appendChild(this.nodes.tags);
		this.nodes.center.appendChild(this.nodes.content);
		this.nodes.right.appendChild(this.nodes.featured);

		scrollHeader = function()
			{
				var scrollTop = null; 

				if (cheatas.lib.isAndroid() == true || cheatas.lib.isIos() == true)
				{
					scrollTop = document.body.scrollTop; 
				}
				else if (cheatas.lib.isChrome() == true || cheatas.lib.isSafari() == true)
				{
					scrollTop = document.body.scrollTop; 
				}
				else
				{
					scrollTop = document.documentElement.scrollTop;
				}

				if (scrollTop < that.scrollTop)
				{
					if (that.isScrollingUp == false)
					{
						that.nodes.header.setAttribute("class", "header header-down");
						that.isScrollingUp = true;
					}
				}
				else
				{
					that.nodes.header.setAttribute("class", "header");
					that.isScrollingUp = false;
				}

				that.scrollTop = scrollTop;
			};

		cheatas.lib.addEventListener(this.nodes.body, "mousewheel", scrollHeader);

		event = new Object();
		event.node = this.nodes.body;
		event.event = "mousewheel";
		event.action = scrollHeader;
		this.events.push(event);


		cheatas.lib.addEventListener(this.nodes.body, "touchmove", scrollHeader);

		event = new Object();
		event.node = this.nodes.body;
		event.event = "touchmove";
		event.action = scrollHeader;
		this.events.push(event);


		// 해시태그 읽기
		hash = document.location.hash.replace("#", "");
		key = hash.split("&")[0];
		keyword = cheatas.lib.decodeURIComponent(hash.split("&")[1]);

		if (key == null || key == "")
		{
			key = cheatas.config.KEY_CONTENT_TIMELINE;
		}

		if (keyword == null || keyword == "undefined")
		{
			keyword = "";
		}

		switch (key)
		{
			case cheatas.config.KEY_CONTENT_TIMELINE:
			{
				this.type = cheatas.config.TYPE_CONTENT_TIMELINE;
				this.api = cheatas.config.API_CONTENT_TIMELINE;
				this.key = cheatas.config.KEY_CONTENT_TIMELINE;
				this.name = cheatas.config.NAME_TIMELINE;
				this.keyword = keyword;
				break;
			}
			case cheatas.config.KEY_CONTENT_CHANNEL:
			{
				this.type = cheatas.config.TYPE_CONTENT_CHANNEL;
				// this.api = cheatas.config.API_CONTENT_CHANNEL;
				// this.key = cheatas.config.KEY_CONTENT_CHANNEL;
				// this.name = cheatas.config.NAME_CHANNEL;
				this.keyword = keyword;
				break;
			}
			default:
			{
				channel = cheatas.info.getChannel(key);

				if (channel != null)
				{
					this.type = cheatas.config.TYPE_CONTENT_TIMELINE;
					this.api = channel.api;
					this.key = channel.key;
					this.name = channel.name;
					this.keyword = keyword;
				}

				break;
			}
		}

		this.createHeader();
		this.createContent();
		this.createFeatured();
		this.createFooter();
		// this.createTags(this.key);

		this.setStyle();
	},

	update: function()
	{
		cheatas.debugger.log("Function", "cheatas.UI.update()");

		// header = 0, content = 1, footer = 2, featured = 3
		// this.childs[0].remove();
		this.childs[1].remove();
		// this.childs[2].remove();

		this.createHeader();
		this.createContent();
		// this.createFooter();
	},

	reset: function()
	{
		cheatas.debugger.log("Function", "cheatas.UI.reset()");

		this.channelKey = "";
		this.parentKey = "";
		this.seq = -1;
		this.type = cheatas.config.TYPE_CONTENT_TIMELINE;
		this.key = cheatas.config.KEY_CONTENT_TIMELINE;
		this.api = cheatas.config.API_CONTENT_TIMELINE;
		this.name = cheatas.config.NAME_TIMELINE;
		this.image = "";
		this.imageCache = null;
		this.embed = "";
		this.description = "";
		this.date = "";
		this.url = "";
		this.tags = "";

		this.keyword = "";
		this.isFixed = false;

		this.backgroundColor = "";
		this.backgroundImage = "";

		this.update();
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

	createHeader: function()
	{
		cheatas.debugger.log("Function", "cheatas.UI.createHeader()");

		var option = null;
		var header = null;
		var seq = 0;

		option = new cheatas.UIOption();
		option.channelKey = this.channelKey;
		option.parentKey = this.parentKey;
		option.seq = seq;
		option.type = this.type;
		option.key = this.key;
		option.api = this.api;
		option.name = this.name;
		option.image = this.image;
		option.embed = this.embed;
		option.description = this.description;
		option.date = this.date;
		option.url = this.url;
		option.tags = this.tags;

		header = new cheatas.Header(option);
		header.nodes.body.id = this.nodes.header.id;
		header.nodes.body.className = this.nodes.header.className;
		this.nodes.body.replaceChild(header.nodes.body, this.nodes.header);

		this.childs[seq] = header;
		this.nodes.header = header.nodes.body;

		header.init();
	},

	createContent: function()
	{
		cheatas.debugger.log("Function", "cheatas.UI.createContent()");

		var option = null;
		var content = null;
		var seq = 1;

		switch (this.type)
		{
			case cheatas.config.TYPE_CONTENT_TIMELINE:
			{
				option = new cheatas.UIOption();
				option.channelKey = this.channelKey;
				option.parentKey = this.parentKey;
				option.seq = seq;
				option.type = this.type;
				option.key = this.key;
				option.api = this.api;
				option.name = this.name;
				option.image = this.image;
				option.embed = this.embed;
				option.description = this.description;
				option.date = this.date;
				option.url = this.url;
				option.tags = this.tags;
				option.keyword = this.keyword;
				// option.isFixed = true;
				break;
			}
			case cheatas.config.TYPE_CONTENT_CHANNEL:
			{
				option = new cheatas.UIOption();
				option.channelKey = this.channelKey;
				option.parentKey = this.parentKey;
				option.seq = seq;
				option.type = this.type;
				option.key = cheatas.config.KEY_CONTENT_CHANNEL;
				option.api = cheatas.config.API_CONTENT_CHANNEL;
				option.name = this.name;
				option.image = this.image;
				option.embed = this.embed;
				option.description = this.description;
				option.date = this.date;
				option.url = this.url;
				option.tags = this.tags;
				option.keyword = this.keyword;
				// option.isFixed = true;
				break;
			}
			default:
			{
				alert(cheatas.config.MSG_UNKNOWN_ERROR);
				return;
			}
		}

		content = new cheatas.Content(option);
		content.nodes.body.id = this.nodes.content.id;
		content.nodes.body.className = this.nodes.content.className;
		this.nodes.center.replaceChild(content.nodes.body, this.nodes.content)

		this.childs[seq] = content;
		this.nodes.content = content.nodes.body;

		content.init();
	},

	createFeatured: function()
	{
		cheatas.debugger.log("Function", "cheatas.UI.createFeatured()");

		var that = this;
		var top = null;
		var bottom = null;
		var name = null;
		var more = null;
		var option = null;
		var featured = null;

		top = cheatas.lib.createElement("div", this.nodes.featured.id + "-top", "top");
		bottom = cheatas.lib.createElement("div", this.nodes.featured.id + "-bottom", "bottom");
		name = cheatas.lib.createElement("span", top.id + "-name", "name font-small font-bold font-tint");
		more = cheatas.lib.createElement("span", top.id + "-more", "btn btn-more txt is-active font-small");

		this.nodes.featured.appendChild(top);
		this.nodes.featured.appendChild(bottom);
		top.appendChild(name);
		top.appendChild(more);

		name.innerHTML = cheatas.config.NAME_FEATURED;
		more.innerHTML = cheatas.config.NAME_MORE;

		cheatas.lib.addEventListener(more, "click",
			function(e)
			{
				var a = cheatas.config.ACTION_GO_TO_CHANNEL;
				that.startAction(e, a);
			}
		);

		option = new cheatas.UIOption();
		option.channelKey = this.channelKey;
		option.parentKey = this.key;
		option.seq = this.seq;
		option.type = cheatas.config.TYPE_CONTENT_FEATURED;
		option.key = cheatas.config.KEY_CONTENT_FEATURED;
		option.api = cheatas.config.API_CONTENT_FEATURED;
		option.name = cheatas.config.NAME_FEATURED;
		option.image = this.image;
		option.embed = this.embed;
		option.description = this.description;
		option.date = this.date;
		option.url = this.url;
		option.tags = this.tags;
		// option.keyword = this.keyword;
		option.isFixed = true;

		featured = new cheatas.Content(option);
		featured.nodes.body.id = bottom.id + "-content";

		this.childs[3] = featured;
		bottom.appendChild(featured.nodes.body);

		featured.init();
	},

	createTags: function(key)
	{
		cheatas.debugger.log("Function",
			[
				"cheatas.UI.createTags(key)",
				"key = " + key
			]
		);

		var that = this;
		var datas = null;
		var tags = null;

		if (key == null)
		{
			alert(cheatas.config.MSG_UNKNOWN_ERROR);
			return;
		}

		this.nodes.tags.innerHTML = "";

		datas = cheatas[key + cheatas.config.KEY_RECEIVE].datas;
		tags = cheatas.info.getTags(datas);

		for (i = 0; i < tags.length && i < cheatas.config.SPEC_TAGS_SIZE + 1; ++i)
		{
			var item = null;

			if (i == 0)
			{
				item = cheatas.lib.createElement("li", this.nodes.tags.id + "-tags-item-all", "tags-item font-medium font-bold btn");
				item.setAttribute("keyword", "");
				item.innerHTML = cheatas.config.SIGN_TAGS + "전체";
				this.nodes.tags.appendChild(item);

				cheatas.lib.addEventListener(item, "click",
					function(e)
					{
						var a = cheatas.config.ACTION_SORT_DATA_BY_KEYWORD;
						that.startAction(e, a);
					}
				);
			}

			item = cheatas.lib.createElement("li", this.nodes.tags.id + "-tags-item-" + i, "tags-item font-medium btn");
			item.setAttribute("keyword", tags[i]);
			item.innerHTML = cheatas.config.SIGN_TAGS + tags[i];
			this.nodes.tags.appendChild(item);

			if (this.keyword == tags[i])
			{
				item.setAttribute("class", "tags-item font-medium font-blue btn");
			}

			cheatas.lib.addEventListener(item, "click",
				function(e)
				{
					var a = cheatas.config.ACTION_SORT_DATA_BY_KEYWORD;
					that.startAction(e, a);
				}
			);
		}
	},

	createFooter: function()
	{
		cheatas.debugger.log("Function", "cheatas.UI.createFooter()");

		var option = null;
		var footer = null;
		var seq = 2;

		option = new cheatas.UIOption();

		option.channelKey = this.channelKey;
		option.parentKey = this.parentKey;
		option.seq = seq;
		option.type = this.type;
		option.key = this.key;
		option.api = this.api;
		option.name = this.name;
		option.image = this.image;
		option.embed = this.embed;
		option.description = this.description;
		option.date = this.date;
		option.url = this.url;
		option.tags = this.tags;

		footer = new cheatas.Footer(option);
		footer.nodes.body.id = this.nodes.footer.id;
		footer.nodes.body.className = this.nodes.footer.className;
		this.nodes.body.replaceChild(footer.nodes.body, this.nodes.footer);

		this.childs[seq] = footer;
		this.nodes.footer = footer.nodes.body;

		footer.init();
	},

	startAction: function(e, a, param)
	{
		cheatas.debugger.log("Event",
			[
				"cheatas.UI.startAction(e, a, param)",
				"e = " + e,
				"a = " + a,
				"param = " + param
			]
		);

		var card = null;
		var content = null;
		var channel = null;

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

		if (param != null)
		{
			cheatas.debugger.trace(
				[
					"cheatas.UI.startAction(e, a, param)",
					"param.channelKey = " + param.channelKey,
					"param.parentKey = " + param.parentKey,
					"param.seq = " + param.seq,
					"param.type = " + param.type,
					"param.key = " + param.key,
					"param.api = " + param.api
				]
			);

			switch (param.type)
			{
				case cheatas.config.TYPE_CONTENT_TIMELINE:
				{
					content = cheatas[param.key + cheatas.config.KEY_RECEIVE];
					break;
				}
				case cheatas.config.TYPE_CONTENT_CHANNEL:
				{
					content = cheatas[param.key + cheatas.config.KEY_RECEIVE];
					break;
				}
				case cheatas.config.TYPE_CONTENT_FEATURED:
				{
					content = cheatas[param.key + cheatas.config.KEY_RECEIVE];
					break;
				}
				case cheatas.config.TYPE_CARD_VIDEO:
				{
					content = cheatas[param.parentKey + cheatas.config.KEY_RECEIVE];
					card = cheatas[param.parentKey + cheatas.config.KEY_RECEIVE].childs[param.seq];
					break;
				}
				case cheatas.config.TYPE_CARD_LIST:
				{
					content = cheatas[param.parentKey + cheatas.config.KEY_RECEIVE];
					card = cheatas[param.parentKey + cheatas.config.KEY_RECEIVE].childs[param.seq];
					break;
				}
				case cheatas.config.TYPE_CARD_STORY:
				{
					content = cheatas[param.parentKey + cheatas.config.KEY_RECEIVE];
					card = cheatas[param.parentKey + cheatas.config.KEY_RECEIVE].childs[param.seq];
					break;
				}
				default:
				{
					alert(cheatas.config.MSG_UNKNOWN_ERROR);
					return;
				}
			}
		}

		switch (a)
		{
			case cheatas.config.ACTION_RESET_UI:
			{
				this.ignoreHashChangeEvent = true;
				document.location.hash = "#" + cheatas.config.KEY_CONTENT_TIMELINE;

				this.reset();
				break;
			}
			case cheatas.config.ACTION_LOAD_DATA_COMPLETE:
			{
				card.loading(false);
				break;
			}
			case cheatas.config.ACTION_GO_TO_TIMELINE:
			{
				this.ignoreHashChangeEvent = true;
				document.location.hash = "#" + this.key;

				this.type = cheatas.config.TYPE_CONTENT_TIMELINE;
				// this.api = cheatas.config.API_CONTENT_TIMELINE;
				// this.key = cheatas.config.KEY_CONTENT_TIMELINE;
				// this.name = cheatas.config.NAME_TIMELINE;
				this.keyword = "";
				this.update();
				break;
			}
			case cheatas.config.ACTION_GO_TO_CHANNEL:
			{
				this.ignoreHashChangeEvent = true;
				document.location.hash = "#" + cheatas.config.KEY_CONTENT_CHANNEL;

				this.type = cheatas.config.TYPE_CONTENT_CHANNEL;
				// this.api = cheatas.config.API_CONTENT_CHANNEL;
				// this.key = cheatas.config.KEY_CONTENT_CHANNEL;
				// this.name = cheatas.config.NAME_CHANNEL;
				this.keyword = "";
				this.update();
				break;
			}
			case cheatas.config.ACTION_LOAD_TIMELINE_DATA:
			{
				this.ignoreHashChangeEvent = true;
				document.location.hash = "#" + param.channelKey;

				channel = cheatas.info.getChannel(param.channelKey);
				this.type = cheatas.config.TYPE_CONTENT_TIMELINE;
				this.api = channel.api;
				this.key = channel.key;
				this.name = channel.name;
				this.keyword = "";
				this.update();
				break;
			}
			case cheatas.config.ACTION_LOAD_TIMELINE_DATA_ON_HASH_CHANGE:
			{
				var hash = document.location.hash.replace("#", "");
				var key = hash.split("&")[0];
				var keyword = cheatas.lib.decodeURIComponent(hash.split("&")[1]);

				if (this.ignoreHashChangeEvent == true)
				{
					this.ignoreHashChangeEvent = false;
					return;
				}

				if (key == null || key == "")
				{
					key = cheatas.config.KEY_CONTENT_TIMELINE;
				}

				if (keyword == null || keyword == "undefined")
				{
					keyword = "";
				}

				switch (key)
				{
					case cheatas.config.KEY_CONTENT_TIMELINE:
					{
						this.type = cheatas.config.TYPE_CONTENT_TIMELINE;
						this.api = cheatas.config.API_CONTENT_TIMELINE;
						this.key = cheatas.config.KEY_CONTENT_TIMELINE;
						this.name = cheatas.config.NAME_TIMELINE;
						this.keyword = keyword;
						this.update();
						break;
					}
					case cheatas.config.KEY_CONTENT_CHANNEL:
					{
						this.type = cheatas.config.TYPE_CONTENT_CHANNEL;
						// this.api = cheatas.config.API_CONTENT_CHANNEL;
						// this.key = cheatas.config.KEY_CONTENT_CHANNEL;
						// this.name = cheatas.config.NAME_CHANNEL;
						this.keyword = keyword;
						this.update();
						break;
					}
					default:
					{
						channel = cheatas.info.getChannel(key);

						if (channel != null)
						{
							this.type = cheatas.config.TYPE_CONTENT_TIMELINE;
							this.api = channel.api;
							this.key = channel.key;
							this.name = channel.name;
							this.keyword = keyword;
							this.update();
						}

						// return;
					}
				}

				break;
			}
			case cheatas.config.ACTION_LOAD_MORE_DATA:
			{
				if (content.pageSeq >= content.pageLength)
				{
					alert(cheatas.config.MSG_NO_MORE_DATA);
					return;
				}

				content.create();
				break;
			}
			case cheatas.config.ACTION_SORT_DATA_BY_KEYWORD:
			{
				var hash = document.location.hash.replace("#", "");
				var key = hash.split("&")[0];
				var keyword = cheatas.lib.encodeURIComponent(e.target.getAttribute("keyword"));

				document.location.hash = key + "&" + keyword;

				/*
				if (keyword != null)
				{
					this.keyword = keyword;
					this.update();
				}
				*/

				break;
			}
			default:
			{
				alert(cheatas.config.MSG_UNKNOWN_ACTION);
				return;
			}
		}

		this.startActionComplete(e, a, param);
	},

	startActionComplete: function(e, a, param, x, y)
	{
		var isValid = true;

		switch (a)
		{
			case cheatas.config.ACTION_LOAD_DATA_COMPLETE:
			{
				isValid = false;
				break;
			}
			case cheatas.config.ACTION_LOAD_MORE_DATA:
			{
				isValid = false;
				break;
			}
			default:
			{
				//
			}
		}

		if (isValid == true)
		{
			if (x == null)
			{
				x = 0;
			}

			if (y == null)
			{
				y = 0;
			}

			this.nodes.header.setAttribute("class", "header");
			window.scrollTo(x, y);
		}
	}
}

cheatas.ui = new cheatas.UI(new cheatas.UIOption());