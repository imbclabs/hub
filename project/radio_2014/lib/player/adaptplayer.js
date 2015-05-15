/**
 * lib v1.0: AdaptPlayer
 * 2013/04/12 by aeddang
 * FlashPlayer 1.0
 */
/*



/*
jarvis.AdaptPlayerDelegate=function(){}
jarvis.AdaptPlayerDelegate.prototype = 
{
    stateChange : function(e){},
	openPopup : function(){},
	hdChange : function(hd){},
	playerCopy : function(){},
	copyCommerce : function(seq){},
	goCommerce : function(seq){},
	durationChange : function(duration){},
	timeChange : function(time){},
	soundChange : function(volume){},
	bufferChange : function(buffer){},
	progressChange : function(progress){},
	alertMsg : function(msg){},
	playerError : function(error){}
}
*/

if(typeof jarvis == "undefined") var jarvis = new Object();


document.write("<script type='text/javascript' src='"+jarvisSrc+"player/flashplayer.js'><"+"/script>"); 
document.write("<script type='text/javascript' src='"+jarvisSrc+"player/htmlplayer.js'><"+"/script>");
document.write("<script type='text/javascript' src='"+jarvisSrc+"player/htmlaudio.js'><"+"/script>");


jarvis.AdaptPlayerOption=function(){
   
	this.uiView=true;  
	this.isPopup=true;  
	this.isOriginSize=true;  
	this.isUIHidden=true;  
	this.reciveEvent=true;  
	this.reciveTimeEvent=false; 
	this.isVideo=true;
	this.volume=0.5;
}

jarvis.AdaptPlayer=function(id) 
{
    this.FLASHPLAYER="FLASHPLAYER";
	this.HTMLPLAYER="HTMLPLAYER";
	this.id=id    
	this.player=null;
    this.playerType;

}

jarvis.AdaptPlayerObject= function() 
{
     this.vodUrl="";
	 this.initImage="";
     this.initLink="";
	 this.initTarget="_blank";


	 this.autoPlay=true;
	 this.link="";
	 this.linkTarget="_blank";
	 this.initTime=-1;
	 this.oneTimeLive=false;
	 this.isLive=false;
	 this.isLiveStream=true;
	 this.isAd=false;
	 this.isDemo=false;
	 this.isBanner=false;

	 this.iconTypeName="";
     this.changeHDAble=false;
     this.changeHighAble=false;
     this.msg="";
     this.copyAble=false;
	 
								
								
                       
								

}

jarvis.AdaptPlayer.INIT="INIT";  
jarvis.AdaptPlayer.CHANGE="CHANGE";
jarvis.AdaptPlayer.PLAY="PLAY";
jarvis.AdaptPlayer.STOP="STOP";
jarvis.AdaptPlayer.COMPLETE="COMPLETE";
jarvis.AdaptPlayer.READY="READY";
jarvis.AdaptPlayer.START="START";
jarvis.AdaptPlayer.BUSY="BUSY";


jarvis.AdaptPlayer.prototype = 
{
    addPlayer: function(div,playerPath,width,height,delegate,option) 
	{
		 if (option === undefined ) {
              option=new jarvis.AdaptPlayerOption();
         }
		 var htmlPlayer=new jarvis.HtmlPlayer(this.id);
		 
         if(htmlPlayer.checkSupport()){
			this.addHtmlPlayer(div,width,height,delegate,option)
		 }else{
            this.addFlashPlayer(div,playerPath,width,height,delegate,option)
         }
         
    },
	addHtmlPlayer: function(div,width,height,delegate,option) 
	{
		if (option === undefined ) {
              option=new jarvis.AdaptPlayerOption();
        }
	
        this.playerType=this.HTMLPLAYER;
		if(option.isVideo==true){
		    this.player=new jarvis.HtmlPlayer(this.id);
		}else{
		    this.player=new jarvis.HtmlAudio(this.id);
		}
		this.player.addPlayer(div,width,height,delegate,option);
        
    },
	addFlashPlayer: function(div,playerPath,width,height,delegate,option) 
	{
		if (option === undefined ) {
              option=new jarvis.AdaptPlayerOption();
        }
		
		this.playerType=this.FLASHPLAYER;
		jarvis["flashPlayer"+this.id]=new jarvis.FlashPlayer(this.id);
		this.player=jarvis["flashPlayer"+this.id];
		this.player.addPlayer(div,playerPath,width,height,delegate,option);
        
    },
	addCommerce : function (jsonData,commerceInfo)
    {
       if(this.playerType==this.HTMLPLAYER){
	     // this.player.addCommerce(commerceInfo);
	   }else{
	      this.player.addCommerce(jsonData);
	   }
	   
	},
	addSeekPoint : function (jsonData)
    {
       if(this.playerType==this.HTMLPLAYER){
	     // this.player.addCommerce(commerceInfo);
	   }else{
	      this.player.addSeekPoint(jsonData);
	   }
	   
	},
    changeVod : function (vodObject)
    {
       if(vodObject.vodUrl=="" && vodObject.vodUrl==null && vodObject.vodUrl==undefined){
	        alert("영상경로가 없습니다.");
	        return;
	   }
	   
	   
	   if(this.playerType==this.HTMLPLAYER){
		   var exA=[".FLV",".SWF",".F4V","RTMP:"];
	       var idx=vodObject.vodUrl.toUpperCase().indexOf()
           for(var i=0;i<exA.length;++i){
		       idx=vodObject.vodUrl.toUpperCase().indexOf(exA[i]);
			   if(idx!=-1){
			       alert("모바일에서는 지원되지 않는 영상입니다.");
				   return;
			   }
		   }
			   
	   
	   }
	   
	   
	   this.player.changeVod (vodObject);
    },
    stopVod : function(addLoading)
    {
	   if ( addLoading === undefined ) {
            addLoading="Y";
       }
	   this.player.stopVod(addLoading);
    },
	rePlayVod: function()
    {
	    this.player.rePlayVod();
    },
    playVod : function()
    {
	    this.player.playVod();
    },
    togglePlay : function()
    {
	   this.player.togglePlay();
    },
	toggleSound : function()
    {
	    this.player.toggleSound();
    },
    fullScreen : function()
    {
	    this.player.fullScreen();
    },
	volumeChange : function(volume)
    {
	    this.player.volumeChange(volume);
    },
    seekChange : function(seek,isPlay)
    {
	    if ( isPlay === undefined ) {
            isPlay=true;
        }
		this.player.seekChange(seek,isPlay);
    },
	rateChange : function(rate)
    {
	    this.player.rateChange(rate);
	},
	resize : function(w,h)
    {
	    this.player.resize(w,h);
	},
	setSeekChangeAble : function(ac)
    {
	     this.player.setSeekChangeAble(ac);
	},
	viewMessage : function(msg)
    {
	    this.player.viewMessage(msg);
	},
	viewImage : function(img)
    {
	    this.player.viewImage(img);
	},
    getCurrentTime : function()
    {
	     return this.player.getCurrentTime();
	}
	
}

 //jarvis.flashPlayer;//used event delegate