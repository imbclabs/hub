/**
 * miniInfo v1.0: MiniInfo (InterFace class)
 * by aeddang
 */
/*
interfaces

 userInfo interface  사용자정보 및 로그인
    
    * 로그인
    * @param : id,pw 아이디패스워드
	* @return : sel(Y/N)
    login(id,pw,sel) 
	
	* 로그아웃
    * @param : null
	* @return : sel(Y/N)
    logout(sel) 
	
	* 로그인 사용자정보불러오기
    * @param : null
	* @return : sel(Y/N)
	* @get  : this.userInfo.userName
	          this.userInfo.userId
	          this.userInfo.userData
	          this.userInfo.userType
	          this.userInfo.userAge
	          this.userInfo.isAdmin
	          this.userInfo.userNation
	loadUserData(sel)

    
 playInfo interface 라디오 재생경로 및 프로그램 정보등
	
	* 온에어 경로불러오기
    * @param : channel 방송채널( this.CHANNEL_TYPE_CALL[0,1,2] 참조 )
	* @return : sel(라이브경로/N)
	loadOnAir(channel,sel)
   
	* 보이는라디오 온에어 경로불러오기
    * @param : null
	* @return : sel(라이브경로/N)
	loadOnAirVod(sel)
	
    
	
	* 온에어 편성표 불러오기
    * @param : null
	* @return : sel(Y/N)
	* @get  : getOnAirSchedule(channel,day)
	loadOnAirSchedule(sel)

    * 보이는라디오 온에어 편성표 불러오기 ( 온에어 편성표에 보이는라디오 정보 추가시)
    * @param : null
	* @return : sel(Y/N)
	loadOnAirVodSchedule(sel)
	
	* 온에어 편성표 읽기
    * @param : channel 방송채널( this.CHANNEL_TYPE_READ[0,1,2] 참조 )
    * @param : day (월,화,수,목,금,토,일)
	* @return : Array<ProgramObject>
    * @get  : ProgramObject{}
	getOnAirSchedule(channel,day)

    * 각 프로그램이 보이는라디오인지 채크(loadOnAirVodSchedule() 이완료된후에만 정상작동)
    * @param : program ProgramObject{}
	* @return : true/false
    isVodOnAir(program)

	

    * 라디오 채널별 프로그램 불러오기
    * @param : channel  방송채널( this.CHANNEL_TYPE_CALL[0,1,2] 참조 )
	* @return : sel(Y/N)
	* @get  : getProgramList(channel)
	loadProgram(sel,channel)

	* 라디오 채널별 프로그램 리스트 읽기
    * @param : channel 방송채널( this.CHANNEL_TYPE_READ[0,1,2] 참조 )
	* @return : Array<ProgramObject>
    * @get  : ProgramObject{}
	getProgramList(channel)
	
	

    ProgramObject
	          {
	              channel
                  broadDate
                  startTime
                  endTime
                  programTitle
                  homePageUrl
                  broadCastID
                  liveDays
                  DJ
                  picture
                  runningTime
                  programGroupID
                  podCastURL
                  thumbnailPicture
                  isVod
			  }


songInfo interface 선곡표 실시간 음악정보
   
	* 현재 재생중인 모든 음악 불러오기
    * @param : null
	* @return : sel(Y/N)
	* @get : getCurrentSong(channel)
	loadCurrentSong(sel)

	* 현재 재생중 음악정보 읽기
    * @param : channel 방송채널( this.CHANNEL_TYPE_READ[0,1,2] 참조 )
	* @return : SongObject
    * @get  : SongObject{}
	getCurrentSong : function (channel)
	
	* 현재 재생중 음악정보 비우기
    removeCurrentSong()


    
	* 프로그램별 현재날짜 선곡 리스트 불러오기
    * @param : broadCastID,programGroupID (SongObject{} 참조)
	* @return : sel(Y/N,broadCastID,programGroupID)
	* @get : getCurrentSongList(broadCastID,programGroupID)
	loadCurrentSongList(sel,broadCastID,programGroupID)

	* 프로그램별 현재날짜 선곡 리스트 읽기
    * @param : broadCastID,programGroupID (SongObject{} 참조)
	* @return : Array<SelectSongInfo>
    * @get  : SelectSongInfo{}
	getCurrentSongList(broadCastID,programGroupID)
	
    * 프로그램별 현재날짜 선곡 리스트 비우기
	* @param : broadCastID,programGroupID (SongObject{} 참조)
	removeCurrentSongList(broadCastID,programGroupID)
    
	* 모든 프로그램 현재날짜 선곡 리스트 비우기
	removeAllCurrentSongList()

    SongObject
	          {
	              logCD
                  channel
                  broadcastID
                  programGroupID
                  regDate
                  somItem
                  progCode
			  }
  
	SelectSongObject
	          {
	              rownum
                  seq_no
                  title
                  broadDate
                  artistName
                  trackTitle
              }




miniMsgInfo interface  미니메시지작성 불러오기
    
    * 미니메시지작성
    * @param : broadCastID,programGroupID
             : msg 사용자입력글
	* @return : sel(F/L/U/Y)  실패/비로그인/불량사용자/성공
	writeMsg (sel,broadCastID,programGroupID,msg)
    

	* 미니메시지 불러오기 
    * @param : broadCastID,programGroupID
             : msg 사용자입력글
	* @return : sel(F/L/U/Y)  실패/비로그인/불량사용자/성공
	* @get  : getCurrentMsgList(broadCastID,programGroupID) 
	          getMsgList(broadCastID,programGroupID)  
    reLoadMsgList(sel,broadCastID,programGroupID)  1page 부터다시
	loadMsgList(sel,broadCastID,programGroupID)  순차적으로 1,2,3,...
    
    * 미니메시지 읽기 
    * @param : broadCastID,programGroupID
	* @return : jarvis.PageDataInfo{}
	* @get  : MsgObject{}
	getMsgInfo : function (broadCastID,programGroupID) 마지막불러온 페이지리스트
	
    * 미니메시지 리스트 비우기
    * @param : broadCastID,programGroupID
	removeMsgList(broadCastID,programGroupID)
    
	* 미니메시지 전채 리스트 비우기
	removeAllMsgList()
    
	MsgObject
	          {
	              seqID
                  uno
                  userID
                  userNm
                  comment
                  regDate
				  rank
              }

  

podcastInfo interface
    
	* 팟캐스트 프로그램 리스트 불러오기 
	* @return : sel(Y/N)
	* @get  : getPodList(channel)
    loadPodList(sel)
    
	* 팟캐스트 프로그램 리스트 읽기 
    * @param : channel ( this.CHANNEL_TYPE_READ[0,1,2] 참조 )
	* @return : Array<PodObject>
	* @get  : PodObject{}
	getPodList(channel)
	
	* 팟캐스트 프로그램별 회차 리스트 불러오기 
    * @param : broadCastID,programGroupID
	* @return : sel(Y/N)
	* @get  : getPodItemListTotalNum(broadCastID,programGroupID)
	          getCurrentPodItemList(broadCastID,programGroupID) 
	          getPodItemList(broadCastID,programGroupID)  
	reLoadPodItemList(sel,broadCastID,programGroupID) 1page 부터다시
    loadPodItemList(sel,broadCastID,programGroupID)  순차적으로 1,2,3,...
    
	* 팟캐스트 프로그램별 회차 리스트 읽기 
    * @param : broadCastID,programGroupID
	* @return : jarvis.PageDataInfo{}
	* @get  : PodItemObject{};
	getPodItemInfo(broadCastID,programGroupID)
	
    
	* 팟캐스트 프로그램별 회차 리스트 비우기
    * @param : broadCastID,programGroupID
	removePodItemList(broadCastID,programGroupID)
    
	* 팟캐스트 전체 회차 리스트 비우기
	removeAllPodItemList()

	PodObject
	          {
	              channel
                  broadCastID
                  groupID
                  title
                  subTitle
                  itunesImageURL
				  homeURL
              }

    PodItemObject
	          {
	              rowNum
                  contentTitle
                  linkUrl
                  description
                  encloserURL
                  pubDate
				  broadDate
              }
	
} 

*/

if(typeof jarvis == "undefined") var jarvis = new Object();
if(jarvis.dirPath===undefined){
	jarvis.dirPath="./";
	if(window.location.href.indexOf("http")==-1 || window.location.href.indexOf("imbctc")!=-1){
		jarvis.dirPath="./";
	}else{
    }
}

document.write("<script type='text/javascript' src='"+jarvis.dirPath+"info/mini/miniInfo.UserInfo.js'></script>"); 
document.write("<script type='text/javascript' src='"+jarvis.dirPath+"info/mini/miniInfo.PlayInfo.js'></script>");
document.write("<script type='text/javascript' src='"+jarvis.dirPath+"info/mini/miniInfo.SongInfo.js'></script>");
document.write("<script type='text/javascript' src='"+jarvis.dirPath+"info/mini/miniInfo.MiniMsgInfo.js'></script>");
document.write("<script type='text/javascript' src='"+jarvis.dirPath+"info/mini/miniInfo.PodcastInfo.js'></script>");


jarvis.MiniInfo= function() 
{
    this.CHANNEL_TYPE_VIEW=new Array();
    this.CHANNEL_TYPE_VIEW[0]="표준FM";
    this.CHANNEL_TYPE_VIEW[1]="FM4U";
	this.CHANNEL_TYPE_VIEW[2]="Channel M";
	
	this.CHANNEL_TYPE_READ=new Array();
    this.CHANNEL_TYPE_READ[0]="STFM";
    this.CHANNEL_TYPE_READ[1]="FM4U";
	this.CHANNEL_TYPE_READ[2]="CHAM";

    this.CHANNEL_TYPE_CALL=new Array();
    this.CHANNEL_TYPE_CALL[0]="sfm";
    this.CHANNEL_TYPE_CALL[1]="mfm";
	this.CHANNEL_TYPE_CALL[2]="chm";
    
	this.MSG_NO_DATA="mini 메시지가 없습니다.";
	this.MSG_BORA_NO="방송시간이 아닙니다.";
	this.MSG_BORA_SELECT="방송을 선택해 주세요.";

    this.MSG_WRITE_ANABLE="이 프로그램은 게시판을 제공하지 않습니다.";
	this.MSG_WRITE_ONLY="메시지 보내기 전용 게시판입니다.";
    this.MSG_WRITE_NOMSG="메시지를 입력해주세요.";
	this.MSG_WRITE_OVERLENGTH="200자이내로 입력해주세요.";
    this.MSG_WRITE_LOGIN="로그인을 해주세요.";
	this.MSG_WRITE_COMPLETE="메시지 작성이 완료되엇습니다";
	this.MSG_WRITE_ERROR="데이터를 불러오지 못했습니다.";
	this.MSG_WRITE_TROUBLE_MAKER="사용하고 계신 아이디는 iMBC의 게시판 운영 원칙에 따라 메시지를 쓸 수 없는 아이디입니다.";
	this.MSG_WRITE_FAIL="메시지를 등록하는 데 실패했습니다. 다시 한 번 시도해주세요.";

	this.MSG_SONG_NODATA="등록되어 있는 데이터가 없습니다.";

	this.MSG_NO_VOD="해당프로그램은 보이는라디오가 없습니다.";
	this.MSG_NO_VOD_TIME="현재방송시간이 아닙니다.";

	//this.MSG_DAUM_APP_INSTALL="다음뮤직앱을 설치하거나\n업데이트하시면\n이용할 수 있습니다.\n설치 하시겠습니까?"
    this.MSG_DAUM_APP_INSTALL=""
    
	this.DAUM_IOS_APP="https://itunes.apple.com/kr/app/da-eummyujig-bang-geumgeugog/id411835583?mt=8";
    this.DAUM_ANDROID_APP="https://play.google.com/store/apps/details?id=net.daum.entertainment.music.android";
	
	this.userInfo=null;
	this.playInfo=null;
	this.songInfo=null;
    this.miniMsgInfo=null;
	this.podcastInfo=null;


	this.isHtmlPlayer=undefined;
	this.isMobile=undefined;
	this.isIos=undefined;
	this.isMac=undefined;
	this.isPhone=undefined;
	this.isAndroid=undefined;
	this.androidVS="";
	this.androidSdkVS=0;

	this.isInit=false;
}





jarvis.MiniInfo.prototype = 
{
    init:function()
	{
		 if(this.isInit==true){
		    return;
		 }
		 this.isInit=true;
		 this.isMobile=jarvis.lib.isMobile();
		 
		 if(this.isMobile==true){
           
		    this.isPhone=jarvis.lib.isPhone();
            this.isAndroid=jarvis.lib.isAndroid();
			this.isIos=jarvis.lib.isIos();
            if(this.isAndroid==true){
			   this.androidVS= jarvis.lib.getADVersion();
			   this.androidSdkVS=jarvis.lib.getADSdkVersion(this.androidVS);
			}
		 }else{
	        this.isPhone=false;
			this.isAndroid=false;
		 }
         if(jarvis.lib.getOSInfoStr()=="Macintosh"){
		     this.isMac=true;
		 }
		 
		 if(this.isMobile==true){
		     
	          this.isHtmlPlayer=true;
			  
		 }else
	     {
			 this.isHtmlPlayer=false;				 
		 }
	    
	     
		jarvis.debuger.log("isMobile : "+this.isMobile+" isPhone : "+this.isPhone+"  isAndroid : "+this.isAndroid,"info");
        jarvis.debuger.log("isMobile : "+this.isAndroid+" androidVS : "+this.androidVS+" sdkVS : "+this.androidSdkVS,"info");

        
        
		this.userInfo=new jarvis.miniInfo.UserInfo();
		this.playInfo=new jarvis.miniInfo.PlayInfo();
		this.songInfo=new jarvis.miniInfo.SongInfo();
		this.miniMsgInfo=new jarvis.miniInfo.MiniMsgInfo();
		this.podcastInfo=new jarvis.miniInfo.PodcastInfo();
    },
    
    resetInfo:function()
    {
	    this.userInfo.resetInfo();
	    this.playInfo.resetInfo();
		this.songInfo.resetInfo();
		this.miniMsgInfo.resetInfo();
		this.podcastInfo.resetInfo();
	},
 
//userInfo interface
    loginCheck:function(){return this.userInfo.loginCheck();},
	login:function(){this.userInfo.login();},
	logout : function (){this.userInfo.logout();},
	
    
//playInfo interface    
	loadOnAir : function (channel,sel){this.playInfo.loadOnAir(channel,sel);},
    loadOnAirVod : function (sel){this.playInfo.loadOnAirVod(sel);},
	loadOnAirSchedule : function (sel,id){this.playInfo.loadOnAirSchedule(sel,id);},
    loadOnAirVodSchedule : function (sel,id){this.playInfo.loadOnAirVodSchedule(sel,id);},
	loadProgram : function (sel,channel){this.playInfo.loadProgram(sel,channel);},
    
	getProgramImg: function (programid){return this.playInfo.getProgramImg(programid);},
    getProgramList: function (channel){return this.playInfo.getProgramList(channel);},
	getOnAirSchedule : function (channel,day){return this.playInfo.getOnAirSchedule(channel,day);},
	getOnAirVodSchedule : function (channel,day){return this.playInfo.getOnAirVodSchedule(channel,day);},
	getCurrentOnAir : function (channel){return this.playInfo.getCurrentOnAir(channel);},
	isVodOnAir: function (program){return this.playInfo.isVodOnAir(program);},

    loadNotice : function (){this.playInfo.loadNotice();},
    setNotice : function (ac){this.playInfo.setNotice(ac);},
    getNotice : function (){return this.playInfo. getNotice();},


    loadOnAirVodCurrentSchedule : function (sel){this.playInfo.loadOnAirVodCurrentSchedule(sel);},
    loadOnAirVodWeekSchedule : function (sel){this.playInfo.loadOnAirVodWeekSchedule(sel);},
    loadOnAirVodProgramSchedule : function (sel,wseq){this.playInfo.loadOnAirVodProgramSchedule(sel,wseq);},

    getCurrentBoraProgram : function (){return this.playInfo.getCurrentBoraProgram();},
    getBoraWeekList : function (){return this.playInfo.getBoraWeekList();},
    getBoraProgramList : function (wseq){return this.playInfo.getBoraProgramList(wseq);},


//songInfo interface
    loadCurrentSong : function (sel){this.songInfo.loadCurrentSong(sel);},
    loadCurrentSongList : function (sel,broadCastID,programGroupID){this.songInfo.loadCurrentSongList(sel,broadCastID,programGroupID);},
    loadProgramSongList : function (sel,broadCastID,programGroupID,ymd){this.songInfo.loadProgramSongList(sel,broadCastID,programGroupID,ymd);},

    getCurrentSong : function (channel){return this.songInfo.getCurrentSong(channel);},
	removeCurrentSong : function (){this.songInfo.removeCurrentSong();},
	
	getCurrentSongList : function (broadCastID,programGroupID){return this.songInfo.getCurrentSongList(broadCastID,programGroupID);},
	removeCurrentSongList : function (broadCastID,programGroupID){this.songInfo.removeCurrentSongList(broadCastID,programGroupID);},
    removeAllCurrentSongList : function (){this.songInfo.removeAllCurrentSongList();},
	
	getProgramSongList : function (broadCastID,programGroupID,ymd){return this.songInfo.getProgramSongList(broadCastID,programGroupID,ymd);},
	removeProgramSongList : function (broadCastID,programGroupID,ymd){this.songInfo.removeProgramSongList(broadCastID,programGroupID,ymd);},
    removeAllProgramSongList : function (){this.songInfo.removeAllProgramSongList();},
	

//miniMsgInfo interface
    
	writeMsg : function (sel,broadCastID,programGroupID,msg){this.miniMsgInfo.writeMsg(sel,broadCastID,programGroupID,msg);},
    deleteMsg : function (sel,seqID){this.miniMsgInfo.deleteMsg(sel,seqID);},
	reFlashMsgList : function (sel,broadCastID,programGroupID){return this.miniMsgInfo.reFlashMsgList(sel,broadCastID,programGroupID);},
	resetMsgList : function (broadCastID,programGroupID){return this.miniMsgInfo.resetMsgList(broadCastID,programGroupID);},
	reLoadMsgList : function (sel,broadCastID,programGroupID){return this.miniMsgInfo.reLoadMsgList(sel,broadCastID,programGroupID);},
	loadMsgList : function (sel,broadCastID,programGroupID){return this.miniMsgInfo.loadMsgList(sel,broadCastID,programGroupID);}, 
    getMsgInfo : function (broadCastID,programGroupID){return this.miniMsgInfo.getMsgInfo(broadCastID,programGroupID);},
    getWriteAble : function (){return this.miniMsgInfo.getWriteAble();},
    getWriteOnly : function (){return this.miniMsgInfo.getWriteOnly();},
	removeMsgList : function (broadCastID,programGroupID){this.miniMsgInfo.removeMsgList(broadCastID,programGroupID);},
    removeAllMsgList : function (){this.miniMsgInfo.removeAllMsgList();},


//podcastInfo interface
   
    loadPodList : function (sel){this.podcastInfo.loadPodList(sel);},
    reLoadPodItemList : function (sel,broadCastID,programGroupID){return this.podcastInfo.reLoadPodItemList(sel,broadCastID,programGroupID);},
    loadPodItemList : function (sel,broadCastID,programGroupID){return this.podcastInfo.loadPodItemList(sel,broadCastID,programGroupID);},
    loadPodItemPage : function (sel,broadCastID,programGroupID,page){return this.podcastInfo.loadPodItemPage(sel,broadCastID,programGroupID,page);},

	getPodList : function (channel){return this.podcastInfo.getPodList(channel);},
	
	getPodItemInfo : function (broadCastID,programGroupID){return this.podcastInfo.getPodItemInfo(broadCastID,programGroupID);},
    removePodItemList : function (broadCastID,programGroupID){this.podcastInfo.removePodItemList(broadCastID,programGroupID);},
    removeAllPodItemList : function (){this.podcastInfo.removeAllPodItemList();},

	getPodItemPageInfo : function (broadCastID,programGroupID){return this.podcastInfo.getPodItemPageInfo(broadCastID,programGroupID);},
    removePodItemPageList : function (broadCastID,programGroupID){this.podcastInfo.removePodItemPageList(broadCastID,programGroupID);},
    removeAllPodItemPageList : function (){this.podcastInfo.removeAllPodItemPageList();}
}

jarvis.miniInfo = new jarvis.MiniInfo();

