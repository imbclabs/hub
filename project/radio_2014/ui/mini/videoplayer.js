/**
 * miniInfo v1.0: AudioPlayer 
 * by aeddang
 */
/*
interfaces

*/

if(typeof jarvis == "undefined") var jarvis = new Object();



if(jarvis.dirPath===undefined){
	jarvis.dirPath="./";
	if(window.location.href.indexOf("http")==-1 || window.location.href.indexOf("imbctc")!=-1){
		jarvis.dirPath="./";
	}else{
    }
	document.write("<link rel='stylesheet' href='"+jarvis.dirPath+"css/global.css'>");
	document.write("<link rel='stylesheet' href='"+jarvis.dirPath+"css/base.css'>");
	document.write("<link rel='stylesheet' href='"+jarvis.dirPath+"css/ui.css'>");
	document.write("<script src='"+jarvis.dirPath+"info/config.js'></script>");

}

/*
jarvis.delegate=function(){}
jarvis.delegate.prototype = 
{
 
	stateChange : function(state){}, 
}
*/

jarvis.VideoPlayerOption=function(){
    
	this.isMobile=jarvis.lib.isMobile();
	this.isHtmlPlayer=this.isMobile;
    this.playerId="jarvisVideoPlayer";
	this.cssKey="video-player";
	this.optionBtnTitle='';
}

jarvis.VideoObject=function(){
    this.title="TITLE";
	this.subTitle="DESC";
    this.isLive=true;
	this.playURL="";
}

jarvis.VideoPlayer= function(pageID,option,delegate) 
{
    
	this.body;
	if(pageID===undefined){
		this.body=document.body;
	}else{
		if(typeof pageID=="string" || typeof pageID=="String"){
			this.body=document.getElementById(pageID);
		}else{
			this.body=pageID;
		}
	   
	}
	if(delegate===undefined){
		delegate=null;
	}
    this.delegate=delegate;
    this.option=option;
	if(this.option===undefined){
	   this.option=new jarvis.AudioPlayerOption();
	}
   
	jarvis.lib.addAttribute(this.body,this.option.cssKey);
	
	
    this.info=new jarvis.VideoObject();
	this.player=null;
	this.isInit=true;
	this.isPlay=false;
	//UI
    var that=this;

    this.uiBox=document.createElement("div");
	jarvis.lib.addAttribute(this.uiBox,"ui-box");
    this.body.appendChild(this.uiBox);

	this.icon=document.createElement("div");
	this.title=document.createElement("div");
	this.subTitle=document.createElement("div");

    jarvis.lib.addAttribute(this.icon,"align-left icon-live");
	jarvis.lib.addAttribute(this.title,"font-middle text-auto-resize align-left title");
	jarvis.lib.addAttribute(this.subTitle,"font-small text-auto-resize align-left sub-title");
    
	this.uiBox.appendChild(this.icon);
	this.uiBox.appendChild(this.title);
	this.uiBox.appendChild(this.subTitle);
    
	this.playerBox=document.createElement("div");
	jarvis.lib.addAttribute(this.playerBox,"player-box");
    this.body.appendChild(this.playerBox);

	
}





jarvis.VideoPlayer.prototype = 
{
    init:function()
	{
         var that=this;
		 this.addPlayer(); 
		
	},
	
	addPlayer:function()
	{
		var that=this;	
		
		 
		var videoID= this.option.playerId+"player";
	    this.playerBox.id=videoID;
		
		this.player=new jarvis.AdaptPlayer(this.option.playerId);
		var playerDelegate=function(){};
		playerDelegate.prototype = {
									stateChange : function(e)
									{
		            			   
										switch(e){
                                            case jarvis.AdaptPlayer.PLAY:
												that.isPlay=true;
												if(jarvis.uiSet!=null){
													jarvis.uiSet.onAirPlayer=that;
												}
									        break;
											case jarvis.AdaptPlayer.STOP:
												that.isPlay=false;
									        break;
											case jarvis.AdaptPlayer.COMPLETE:
												break;
											case jarvis.AdaptPlayer.INIT:
									        
												break;
									
										}
                                        jarvis.lib.excuteDelegate(that.delegate,"stateChange",[e]);
									},
									openPopup :function(e)
									{
                                        that.player.stopVod("N");
										var popPath="http://vodmall.imbc.com/player/player2014/popupPlayer.html?isBora=Y";
                                        window.open(popPath,'�ٽú����˾�','scrollbars=no,toolbar=no,resizable=yes,width=720,height=480,left=0,top=0'); 
									}
	                       
								}
		var playerOption=new jarvis.AdaptPlayerOption();
		playerOption.uiView=true;  
		playerOption.isPopup=false;  
		playerOption.isUIHidden=true;  
		playerOption.reciveEvent=true;  
		playerOption.reciveTimeEvent=false; 
		playerOption.isVideo=true;
		playerOption.volume=0.5;
       
		var w="100%";
		var h="100%";
		if( this.option.isHtmlPlayer==true ){
			this.player.addHtmlPlayer(videoID,w,h,new playerDelegate(),playerOption);
		}else{
			var swfPath=jarvis.dirPath+"./lib/player/FlashPlayer.swf";
			this.player.addFlashPlayer(videoID,swfPath,w,h,new playerDelegate(),playerOption);
		}
		
             
    },
//UI event
	
    resize:function(h)
	{
	    if(h!==undefined){
		    this.body.style.height=h+"px";
		}
		
		var bounce=jarvis.lib.getAbsoluteBounce(this.body);
        
		var w= bounce.width;
		var h= bounce.height;
		//alert(bounce.toString);
        if(w>10000){
		   return;
		}
		
        var bounceH=jarvis.lib.getAbsoluteBounce(this.uiBox);
		//alert("bounceH : "+bounceH.toString);
		this.playerBox.style.height=Math.floor(h-bounceH.height)+"px";
		this.setText();

	},
	changeColor:function(color)
	{
		 this.title.style.color=color;
		 this.subTitle.style.color=color;

	},
	setText:function()
	{
		
		var bounce=jarvis.lib.getAbsoluteBounce(this.body);
        if(bounce.width>10000){
		   return;
		}
       
		
		var bounceT=jarvis.lib.getAbsoluteBounce(this.title);
		
	    var mg=Math.floor(bounceT.x-bounce.x);
		var w;
		if(this.info.isLive==true){
			var bounceI=jarvis.lib.getAbsoluteBounce(this.icon);
		    w=bounce.width-mg-bounceI.width-(bounceI.x-bounce.x);
		}else{
		    w=bounce.width-mg;
		}
		
		this.title.style.width=w+"px";

		
	},
	

    changeInfo:function(title,subTitle)
	{
        if(title!=null){
		   this.info.title=title;
		} 
		if(subTitle!=null){
		   this.info.subTitle=subTitle;
		}
		
        this.title.innerHTML=this.info.title;
		this.subTitle.innerHTML=this.info.subTitle;
        this.setText();

	},
    changeVod:function(playURL,isLive,isPlay,isLiveStream,initImage)
	{
		if (isLiveStream === undefined ) {
              isLiveStream=true;
        }
		
		if(this.isInit==true){
		   this.isInit=false;
		   isPlay=false;
		}
		if(isLive==true){
		    this.icon.style.display="block";
		}else{
		    this.icon.style.display="none";
		}
		this.setText();	
        var vodObject=new jarvis.AdaptPlayerObject();
		vodObject.vodUrl=playURL;
		vodObject.isLive=isLive;
		vodObject.autoPlay=isPlay;
		vodObject.isLiveStream=isLiveStream;
        vodObject.initImage=initImage;
		this.player.changeVod(vodObject);

    },
	
	volumeChange:function(volume)
	{
	    if( this.player!=null){
			this.player.volumeChange(volume);
		}
	},
	toggleSound:function()
	{
	    if( this.player!=null){
			this.player.toggleSound();
		}
	},
	playVod:function()
	{
        
		
		if( this.player!=null){
			this.player.playVod();
		}
	},
	stopVod:function()
	{
        if( this.player!=null){
			this.player.stopVod("N");
		}
    }

  
   
}



