if(typeof cheatas == "undefined")
{
	var cheatas = new Object();
}

cheatas.Config = function()
{
	/* 이름 정의 */
	this.NAMESPACE = "cheatas";
	this.NAME_TIMELINE = "새로 올라온 동영상";
	this.NAME_CHANNEL = "채널";
	this.NAME_FEATURED = "추천채널";
	this.NAME_MORE = "더 보기";

	/* 기호 정의 */
	this.SIGN_TAGS = "#";

	/* 키값 정의 */
	this.KEY_RECEIVE = "_RECEIVE_KEY";
	this.KEY_CONTENT_TIMELINE = "TIMELINELIST";
	this.KEY_CONTENT_CHANNEL = "CHANNELLIST";
	this.KEY_CONTENT_FEATURED = "FEATUREDLIST";

	/* API 정의 */
	/*
	this.API_CONTENT_TIMELINE = [];
	this.API_CONTENT_TIMELINE[0] = "youtubeapi?channelId=UCYG6DQUw79szmnuNux_S8pg&q=&maxResults=50&order=date&videoLicense=youtube&videoSyndicated=true";
	this.API_CONTENT_TIMELINE[1] = "youtubeapi?channelId=UCHMrIrGZCMjkwKg5_Ht498A&q=&maxResults=50&order=date&videoLicense=youtube&videoSyndicated=true";
	this.API_CONTENT_TIMELINE[2] = "youtubeapi?channelId=UCCmyTnCbjOoWNq3bsM3BovA&q=&maxResults=50&order=date&videoLicense=youtube&videoSyndicated=true";
	this.API_CONTENT_TIMELINE[3] = "youtubeapi?channelId=UCuhsmKsW8HsZd8uqvinFeOw&q=&maxResults=50&order=date&videoLicense=youtube";

	this.API_CONTENT_TIMELINE = "http://www.imbc.com/labs/cheatas/json/feedlist/feedlist_jsonapi.js";
	this.API_CONTENT_CHANNEL = "http://www.imbc.com/labs/cheatas/json/channellist/channellist_jsonapi.js";
	this.API_CONTENT_FEATURED = "http://www.imbc.com/labs/cheatas/json/channellist/featuredlist_jsonapi.js";
	*/

	this.API_CONTENT_TIMELINE = "http://www.imbc.com/labs/cheatas/json/feedlist/feedlist.js";
	this.API_CONTENT_CHANNEL = "http://www.imbc.com/labs/cheatas/json/channellist/channellist.js";
	this.API_CONTENT_FEATURED = "http://www.imbc.com/labs/cheatas/json/channellist/featuredlist.js";

	/* 타입 정의 */
	this.TYPE_CONTENT_TIMELINE = "CONTENT_TIMELINE";
	this.TYPE_CONTENT_CHANNEL = "CONTENT_CHANNEL";
	this.TYPE_CONTENT_FEATURED = "CONTENT_FEATURED";
	this.TYPE_CARD_LIST = "CARD_LIST";
	this.TYPE_CARD_VIDEO = "CARD_VIDEO";
	this.TYPE_CARD_STORY = "CARD_STORY";
	this.TYPE_DATE_FORM_INTERVAL = "DATE_FORM_INTERVAL";
	this.TYPE_DATE_FORM_YYYYMMDD = "DATE_FORM_YYYYMMDD";
	this.TYPE_TAGS_GLOBAL = "TAGS_GLOBAL";
	this.TYPE_TAGS_CARD = "TAGS_CARD";

	/* 이벤트가 발생했을 때 수행해야 할 작업 정의 */
	this.ACTION_LOAD_MORE_DATA = "ACTION_LOAD_MORE_DATA";
	this.ACTION_LOAD_TIMELINE_DATA = "ACTION_LOAD_TIMELINE_DATA";
	this.ACTION_LOAD_TIMELINE_DATA_ON_HASH_CHANGE = "ACTION_LOAD_TIMELINE_DATA_ON_HASH_CHANGE";
	this.ACTION_SORT_DATA_BY_KEYWORD = "ACTION_SORT_DATA_BY_KEYWORD";
	this.ACTION_RESET_UI = "ACTION_RESET_UI";
	this.ACTION_GO_TO_TIMELINE = "ACTION_GO_TO_TIMELINE";
	this.ACTION_GO_TO_CHANNEL = "ACTION_GO_TO_CHANNEL";
	this.ACTION_LOAD_DATA_COMPLETE = "ACTION_LOAD_DATA_COMPLETE";

	/* 안내문구 정의 */
	this.MSG_NO_MORE_DATA = "더 이상 데이터가 없습니다.";
	this.MSG_FAIL_TO_LOAD_DATA = "데이터를 불러오는 데 실패했습니다.";
	this.MSG_UNKNOWN_ERROR = "알 수 없는 오류가 발생했습니다.";
	this.MSG_UNKNOWN_ACTION = "이벤트를 처리하는 데 실패했습니다.";

	/* 태그 문자열 구분자 */
	this.TAGS_DELIMITER_NOUNS = [
		"정오의 희망곡", "fm데이트", "꿈꾸는 라디오", "별이 빛나는 밤에", "심심타파", "show music core",
		"김신영", "써니", "소녀시대", "girls' generation", "타블로", "에픽하이", "허경환", "정준영",
		"라이브", "온에어"
	];
	this.TAGS_DELIMITER_PREPOSITIONS = [" about ", " across ", " after ", " against ", " among ", " and ", " around ", " as ", " away ", " because ", " beside ", " between ", " but ", " by ", " down ", " for ", " from ", " in ", " of ", " off ", " on ", " or ", " outside ", " over ", " since ", " so ", " that ", " to ",  " under ", " up ", " with ", " the "];
	this.TAGS_DELIMITER_PARENTHESIS = ["(", ")", "[", "]", "{", "}", "【", "】", "\"", "\""];
	this.TAGS_DELIMITER_SIGNS = [",", ".", ";", ":", "@", "#", "&", "-", "_", " vs ", "®", "/", "▷", "✔", "►", "●", "|", "!"];

	/* 제약사항 정의 */
	this.SPEC_PAGE_SIZE_TIMELINE = 3;
	this.SPEC_PAGE_SIZE_CHANNEL = 12;
	this.SPEC_PAGE_SIZE_FEATURED = 5;
	this.SPEC_PAGE_SIZE_GROUP = 10;
	this.SPEC_TAGS_SIZE = 15;
	this.SPEC_TAGS_MAX_LENGTH = 24;
	this.SPEC_TAGS_MIN_LENGTH = 3;
	this.SPEC_TAGS_BANNED_WORDS = ["습니다", "입니다"];
	this.SPEC_NAVTAB_MAX_LENGTH = 15;
	this.SPEC_URL_MAX_LENGTH = 30;
	this.SPEC_STRING_MAX_LENGTH = 36;
	this.SPEC_DEBUGGER_MAX_LENGTH = 99;
}

cheatas.Config.prototype =
{
	//
}

cheatas.config = new cheatas.Config();