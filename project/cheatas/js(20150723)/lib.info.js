if(cheatas == null)
{
	var cheatas = new Object();
}

cheatas.Sailor = function()
{
	this.channelKey = ""; // 이 객체가 속한 채널의 키, 채널은 데이터 모음의 최소 단위
	this.parentKey = ""; // 이 객체의 부모 객체의 키
	this.seq = -1; // 형제 객체 중 이 객체의 순서
	this.type =""; // Content의 종류
	this.key = ""; // Content의 API를 호출하기 위한 키
	this.api = ""; // Content의 API 주소
	this.name = ""; // 제목
	this.image = ""; // 썸네일 이미지
	this.imageCache = null; // 썸네일 이미지 캐시
	this.embed = ""; // 임베디드 소스 주소
	this.description = ""; // 설명
	this.date = "";	// 등록일시
	this.url = ""; // 관련 링크
	this.tags = ""; // 관련 태그
}

cheatas.Sailor.prototype =
{
	setData: function(data, key, seq)
	{
		this.channelKey = this.getData(cheatas.lib.encodeURIComponent(data.channelKey).replace(/-|%/g, "_"));
		this.parentKey = this.getData(key);
		this.seq = this.getData(seq);
		this.type = this.getData(data.type);
		this.key = this.getData(cheatas.lib.encodeURIComponent(data.key).replace(/-|%/g, "_"));
		this.api = this.getData(data.api);
		this.name = this.getData(data.name);
		this.image = this.getData(data.image);
		this.imageCache = null;
		this.embed = this.getData(data.embed);
		this.description = this.getData(data.description);
		this.date = this.getData(new Date(data.date));
		this.url = this.getData(data.url);
		this.tags = this.getData(data.tags);
	},

	setYoutubeData: function(data, key, seq, param)
	{
		if (data.id == null)
		{
			return;
		}

		if(data.snippet == null)
		{
			return;
		}

		if (param != null)
		{
			if (param.q.length > 0)
			{
				this.channelKey = this.getData(cheatas.lib.encodeURIComponent(data.snippet.channelId + "#" + param.q).replace(/-|%/g, "_"));
			}
			else
			{
				this.channelKey = this.getData(cheatas.lib.encodeURIComponent(data.snippet.channelId).replace(/-|%/g, "_"));
			}
		}
		else
		{
			this.channelKey = this.getData(cheatas.lib.encodeURIComponent(data.snippet.channelId).replace(/-|%/g, "_"));
		}

		this.parentKey = this.getData(key);
		this.seq = this.getData(seq);
		this.type = "";
		this.key = this.getData(data.id.videoId);
		this.api = "";
		this.name = this.getData(data.snippet.title);
		this.image = this.getData(data.snippet.thumbnails.medium.url);
		this.imageCache = null;
		this.embed = this.getData("http://www.youtube.com/embed/" + this.key);
		this.description = this.getData(data.snippet.description);
		this.date = this.getData(new Date(data.snippet.publishedAt));
		this.url = this.getData("https://www.youtube.com/watch?v=" + this.key);
		this.tags = cheatas.info.stringifyTags(cheatas.info.parseTags(this.name));
	},

	getData: function(value)
	{
		if (value == null)
		{
			return "";
		}

		return value;
	},

	getDatas: function(values)
	{
		if (values == null)
		{
			return new Array();
		}

		return values;
	}
}

cheatas.Info = function()
{
	this.sailorsDic = new Dictionary();
	this.isMobile = null;
	this.isInit = false;
	this.isIos = null;
	this.isMac = null;
	this.isPhone = null;
	this.isAndroid = null;
	this.ieVS = null;
	this.androidVS = "";
	this.androidSdkVS = 0;
}

cheatas.Info.prototype =
{
	init: function()
	{
		cheatas.debugger.log("Function", "cheatas.Info.init()");

		if (this.isInit == true)
		{
			return;
		}

		this.isInit = true;
		this.ieVS = cheatas.lib.getIEVersion();
		this.isMobile = cheatas.lib.isMobile();
		 
		if (this.isMobile == true)
		{
			this.isPhone = cheatas.lib.isPhone();
			this.isAndroid = cheatas.lib.isAndroid();
			this.isIos = cheatas.lib.isIos();

			if (this.isAndroid == true)
			{
				this.androidVS = cheatas.lib.getADVersion();
				this.androidSdkVS = cheatas.lib.getADSdkVersion(this.androidVS);
			}
		}
		else
		{
			this.isPhone = false;
			this.isAndroid = false;
		}

		if(cheatas.lib.getOSInfoStr() == "Macintosh")
		{
			this.isMac=true;
		}
	},

    reset: function()
	{
		this.sailorsDic = new Dictionary();
	},

	loadSailors: function(api, sel, key, param)
	{
		cheatas.debugger.log("Function",
			[
				"cheatas.Info.loadSailors(api, sel, key, param)",
				"api = " + api,
				"sel = " + sel,
				"key = " + key,
				"param = " + param
			]
		);

		try
		{
			var ajax = new cheatas.Ajax();
			var results = new Array();

			if (param == null)
			{
				param = new Object();
			}

			if (this.sailorsDic.getValue(key) != null)
			{
				eval(sel + "('Y');");
				return;
			}

			this.sailorsDic.setValue(key, results);

			if (api.indexOf("youtubeapi") != -1)
			{
				this.loadSailorsFromYoutube(api, sel, key, results);
				return;
			}

			if (api.indexOf("jsonapi") != -1)
			{
				this.loadSailorsFromJson(api, sel, key, results);
				return;
			}

			/*
			if (url.indexOf("api.tvcast.naver.com") != -1)
			{
				this.loadSailorsFromTvcast(url, sel, id, param);
				return;
			}
			*/

			cheatas.info["loadSailorsComplete" + key  + cheatas.config.KEY_RECEIVE] = function(datas)
			{
				cheatas.debugger.log("Function",
					[
						"cheatas.Info.loadSailorsComplete" + key + cheatas.config.KEY_RECEIVE + "(datas)",
						"datas = " + datas
					]
				);

				var sailor = null;

				if (datas == null)
				{
					return;
				}

				for (var i = 0; i < datas.length; ++i)
				{
					sailor = new cheatas.Sailor();
					sailor.setData(datas[i], key, i);
					results.push(sailor);
				}

				eval(sel + "('Y');");

				if (cheatas.info["loadSailorsComplete" + key + cheatas.config.KEY_RECEIVE] == this)
				{
					cheatas.info["loadSailorsComplete" + key + cheatas.config.KEY_RECEIVE] = null;
				}
			}

			ajax.request(api, param, "cheatas.info.loadSailorsComplete" + key + cheatas.config.KEY_RECEIVE, "POST", "jsonp");	
		}
		catch (err)
		{
			//
		}
		finally
		{
			// ajax = null;
			// results = null;
		}
	},

	loadSailorsFromJson: function(api, sel, key, results)
    {
		cheatas.debugger.log("Function",
			[
				"cheatas.Info.loadSailorsFromJson(api, sel, key, results)",
				"api = " + api,
				"sel = " + sel,
				"key = " + key,
				"results = " + results
			]
		);

		try
		{
			var ajax = new cheatas.Ajax();
			var param = null;

			cheatas.info["loadSailorsComplete" + key + cheatas.config.KEY_RECEIVE] = function(yn)
			{
				cheatas.debugger.log("Function",
					[
						"cheatas.Info.loadSailorsComplete" + key + cheatas.config.KEY_RECEIVE + "(yn)",
						"yn = " + yn
					]
				);

				var sailor = null;
				var str = JSON.stringify(ajax.returnData);
				var datas = JSON.parse(str);

				if (yn == "N")
				{
					eval(sel+"('N');");
					return;
				}

				for (var i = 0; i < datas.length; ++i)
				{
					sailor = new cheatas.Sailor();
					sailor.setData(datas[i], key, i);
					results.push(sailor);
				}

				eval(sel+"('Y')");

				if (cheatas.info["loadSailorsComplete" + key + cheatas.config.KEY_RECEIVE] == this)
				{
					cheatas.info["loadSailorsComplete" + key + cheatas.config.KEY_RECEIVE] = null;
				}
			}

			ajax.request(api, param, "cheatas.info.loadSailorsComplete" + key + cheatas.config.KEY_RECEIVE, "GET", "json");
		}
		catch (err)
		{
			//
		}
		finally
		{
			// ajax = null;
			// param = null;
		}
	},

	loadSailorsFromYoutube: function(api, sel, key, results)
	{
		cheatas.debugger.log("Function",
			[
				"cheatas.Info.loadSailorsFromYoutube(api, sel, key, results)",
				"api = " + api,
				"sel = " + sel,
				"key = " + key,
				"results = " + results
			]
		);

		try
		{
			var paramObj = cheatas.lib.getUrlParam(api);
			var param = paramObj.param;

			if (param.maxResults == null)
			{
				param.maxResults = "15";
			}

			if (param.order == null)
			{
				param.order = "date";
			}

			if (param.channelId == null)
			{
				param.channelId = "UCe52oeb7Xv_KaJsEzcKXJJg";
			}

			try
			{
				var request = gapi.client.youtube.search.list({

						q: param.q,
						part: "snippet",
						channelId: param.channelId,
						maxResults: param.maxResults,
						order: param.order,
						type: "video",
						key: "AIzaSyDBuqjueHyq4N-75VYs0O3x909oE0llB9g"
					});

				request.execute(function(response) {

					var paramObj = cheatas.lib.getUrlParam(api);
					var param = paramObj.param;
					var str = JSON.stringify(response.result);
					var datas = JSON.parse(str);
					var sailor = null;

					for (var i = 0; i < datas.items.length; ++i)
					{
						sailor = new cheatas.Sailor();
						sailor.setYoutubeData(datas.items[i], key, i, param);
						results.push(sailor);
					}

					eval(sel+"('Y');");
				});
			}
			catch (e)
			{
				eval(sel+"('N');");
			}
		}
		catch (err)
		{
			//
		}
		finally
		{
			paramObj = null;
			param = null;
		}
	},

    getSailors: function(key)
    {
		cheatas.debugger.log("Function",
			[
				"cheatas.Info.getSailors(key)",
				"key = " + key
			]
		);

		try
		{
			var sailors = this.sailorsDic.getValue(key);
			var results = new Array();

			for (var i = 0; i < sailors.length; ++i)
			{
				if (sailors[i] != null)
				{
					results.push(sailors[i]);
				}
			}

			return results;
		}
		catch (err)
		{
			//
		}
		finally
		{
			sailors = null;
			results = null;
		}
	},

	getSailorsSortedByKeyword: function(key, keyword)
	{
		cheatas.debugger.log("Function",
			[
				"cheatas.Info.getSailorsSortedByKeyword(key, keyword)",
				"key = " + key,
				"keyword = " + keyword
			]
		);

		try
		{
			var sailors = this.sailorsDic.getValue(key);
			var results = new Array();

			if (keyword != null)
			{
				for (var i = 0; i < sailors.length; ++i)
				{
					if (sailors[i] != null)
					{
						if (sailors[i].tags.indexOf(keyword) != -1)
						{
							results.push(sailors[i]);
						}
					}
				}
			}
			else
			{
				for (var i = 0; i < sailors.length; ++i)
				{
					if (sailors[i] != null)
					{
						results.push(sailors[i]);
					}
				}
			}

			return results;
		}
		catch (err)
		{
			//
		}
		finally
		{
			sailors = null;
			results = null;
		}
	},

	getSailorsSortedByDate: function(key, order)
	{
		cheatas.debugger.log("Function",
			[
				"cheatas.Info.getSailorsSortedByOrder(key, order)",
				"key = " + key,
				"order = " + order
			]
		);

		try
		{
			var sailors = this.sailorsDic.getValue(key);
			var results = new Array();

			for (var i = 0; i < sailors.length; ++i)
			{
				for (var j = 0; j < sailors.length - 1; ++j)
				{
					if (sailors[j] != null && sailors[j + 1] != null)
					{
						if (sailors[j].date < sailors[j + 1].date)
						{
							var sailor = sailors[j + 1];

							sailors[j + 1] = sailors[j];
							sailors[j] = sailor;
						}
					}
				}
			}

			if (order == "DESC")
			{
				for (var i = 0; i < sailors.length; ++i)
				{
					if (sailors[i] != null)
					{
						results.push(sailors[i]);
					}
				}
			}
			else
			{
				for (var i = sailors.length - 1; i >= 0; --i)
				{
					if (sailors[i] != null)
					{
						results.push(sailors[i]);
					}
				}
			}

			return results;
		}
		catch (err)
		{
			//
		}
		finally
		{
			sailors = null;
			results = null;
		}
	},

	getChannel: function(key)
	{
		cheatas.debugger.log("Function",
			[
				"cheatas.Info.getChannel(key)",
				"key = " + key
			]
		);

		try
		{
			var channels = this.getSailors(cheatas.config.KEY_CONTENT_CHANNEL);

			if (key == null)
			{
				return;
			}

			for (var i = 0; i < channels.length; ++i)
			{
				if (channels[i].key == key)
				{
					return channels[i];
				}
			}

			return;
		}
		catch (err)
		{
			//
		}
		finally
		{
			channels = null;
		}
	},

	getTags: function(datas)
	{
		cheatas.debugger.log("Function",
			[
				"cheatas.Info.getTags(datas)",
				"datas = " + datas
			]
		);

		try
		{
			var tags = new Array();
			var keys = new Array();
			var vals = new Array();

			if (datas == null)
			{
				return;
			}

			if (datas.length > 0)
			{
				for (var i = 0, k = 0; i < datas.length; ++i)
				{
					var arrA = datas[i].tags.split(",");

					for (var j = 0; j < arrA.length; ++j)
					{
						var key = arrA[j].trim();
						var seq = keys.indexOf(key);

						if (key.length > 0 && cheatas.lib.isNumber(key) == false)
						{
							if (seq != -1)
							{
								vals[seq] += 1;
							}
							else
							{
								keys[k] = key;
								vals[k] = 0;
								k++;
							}
						}
					}
				}

				// 태그들을 나온 횟수 내림차순으로 정렬
				tags = cheatas.lib.bubbleSort(keys, vals, "DESC")
			}

			if (tags.length > 0)
			{
				return tags;
			}
			else
			{
				return null;
			}
		}
		catch (err)
		{
			//
		}
		finally
		{
			tags = null;
			keys = null;
			vals = null;
		}
	},
	
	parseTags: function(str)
	{
		try
		{
			var MAXLEN = cheatas.config.SPEC_TAGS_MAX_LENGTH;
			var MINLEN = cheatas.config.SPEC_TAGS_MIN_LENGTH;
			var bannedWords = cheatas.config.SPEC_TAGS_BANNED_WORDS;
			var tags = new Array();
			var tmps = new Array();
			var delimiters = null;

			tags.push(str);

			// 태그 문자열을 명사로 분할
			delimiters = cheatas.config.TAGS_DELIMITER_NOUNS;

			for (var i = 0; i < delimiters.length; ++i)
			{
				var delimiter = delimiters[i];

				for (var j = 0; j < tags.length; ++j)
				{
					var lower = tags[j].toLowerCase();
					var index =	 lower.indexOf(delimiter);
					var arrA = null;

					if (index != -1)
					{
						delimiter = tags[j].substring(index, index + delimiter.length);
						arrA = tags[j].split(delimiter);

						if (arrA.length > 0)
						{
							for (var k = 0; k < arrA.length; ++k)
							{
								tmps.push(arrA[k]);
							}
						}

						tmps.push(delimiter);
					}
					else
					{
						tmps.push(tags[j]);
					}
				}

				tags = cheatas.lib.copyArray(tmps);
				tmps = new Array();
			}

			// 태그 문자열을 전치사로 분할
			delimiters = cheatas.config.TAGS_DELIMITER_PREPOSITIONS;

			for (var i = 0; i < delimiters.length; ++i)
			{
				var delimiter = delimiters[i];

				for (var j = 0; j < tags.length; ++j)
				{
					var lower = tags[j].toLowerCase();
					var index =	 lower.indexOf(delimiter);
					var arrA = null;

					if (index != -1)
					{
						delimiter = tags[j].substring(index, index + delimiter.length);
						arrA = tags[j].split(delimiter);

						for (var k = 0; k < arrA.length; ++k)
						{
							if (k > 0)
							{
								var arrB = arrA[k].split(" ");
								var strB = "";

								for (var l = 0; l < arrB.length; ++l)
								{
									if (l > 0)
									{
										strB += " " + arrB[l];
									}
									else
									{
										tmps.push(arrB[l]);
									}
								}

								tmps.push(strB);
							}
							else
							{
								tmps.push(arrA[k]);
							}
						}
					}
					else
					{
						tmps.push(tags[j]);
					}
				}

				tags = cheatas.lib.copyArray(tmps);
				tmps = new Array();
			}

			// 태그 문자열을 괄호로 분할
			delimiters = cheatas.config.TAGS_DELIMITER_PARENTHESIS;

			for (var i = 0; i < delimiters.length; i += 2)
			{
				var openP = delimiters[i];
				var closeP = delimiters[i + 1];

				for (var j = 0; j < tags.length; ++j)
				{
					var arrA = tags[j].split(openP);

					for (var k = 0; k < arrA.length; ++k)
					{
						if (arrA[k].indexOf(closeP) != -1)
						{
							var arrB = arrA[k].split(closeP);

							for (var l = 0; l < arrB.length; ++l)
							{
								tmps.push(arrB[l]);
							}
						}
						else
						{
							tmps.push(arrA[k]);
						}
					}
				}

				tags = cheatas.lib.copyArray(tmps);
				tmps = new Array();
			}

			// 태그 문자열을 기호로 분할
			delimiters = cheatas.config.TAGS_DELIMITER_SIGNS;

			for (var i = 0; i < delimiters.length; ++i)
			{
				var delimiter = delimiters[i];

				for (var j = 0; j < tags.length; ++j)
				{
					var lower = tags[j].toLowerCase();
					var index =	 lower.indexOf(delimiter);
					var arrA = null;

					if (index != -1)
					{
						delimiter = tags[j].substring(index, index + delimiter.length);
						arrA = tags[j].split(delimiter);

						for (var k = 0; k < arrA.length; ++k)
						{
							tmps.push(arrA[k]);
						}
					}
					else
					{
						tmps.push(tags[j]);
					}
				}

				tags = cheatas.lib.copyArray(tmps);
				tmps = new Array();
			}

			// 태그 문자열에 위의 분할 기준에 해당하는 문자열이 없는 경우 처리
			for (var i = 0; i < tags.length; ++i)
			{
				if (tags[i].length > MAXLEN)
				{
					var arrA = tags[i].split(" ");

					for (var j = 0; j < arrA.length; ++j)
					{
						tmps.push(arrA[j]);
					}
				}
				else
				{
					tmps.push(tags[i]);
				}
			}

			tags = cheatas.lib.copyArray(tmps);
			tmps = new Array();

			// 태그 중 규정에 안 맞는 태그를 제외
			for (var i = 0; i < tags.length; ++i)
			{
				var tag = "";
				var arrA = tags[i].split(" ");

				for (var j = 0; j < arrA.length; ++j)
				{
					var str = arrA[j];

					if (cheatas.lib.isNumber(str) != true)
					{
						var isValid = true;

						for (var k = 0; k < bannedWords.length; ++k)
						{
							if (str.indexOf(bannedWords[k]) != -1)
							{
								isValid = false;
							}
						}

						if (isValid == true)
						{
							tag += " " + str;
						}
					}
				}

				tag = tag.trim();

				if (tag.length >= MINLEN && tag.length <= MAXLEN)
				{
					tmps.push(tag);
				}
			}

			tags = cheatas.lib.copyArray(tmps);
			tmps = new Array();

			return tags;
		}
		catch (err)
		{
			//
		}
		finally
		{
			MAXLEN = null;
			MINLEN = null;
			bannedWords = null;
			tags = null;
			tmps = null;
			delimiters = null;
		}
	},

	stringifyTags: function(tags)
	{
		try
		{
			var str = "";

			for (var i = 0; i < tags.length; ++i)
			{
				if (i == 0)
				{
					str = tags[i].trim();
				}
				else
				{
					str += "," + tags[i].trim();
				}
			}

			return str;
		}
		catch (err)
		{
			//
		}
		finally
		{
			str = null;
		}
	}
}

cheatas.info = new cheatas.Info();