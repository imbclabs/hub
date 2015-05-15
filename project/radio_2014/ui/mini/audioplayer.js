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
    boraBtnClick : function(){},   
	optionBtnClick : function(){},   
	stateChange : function(state){}, 
}
*/

jarvis.AudioPlayerOption=function(){
    
	this.isMobile=jarvis.lib.isMobile();
	this.isHtmlPlayer=this.isMobile;
    this.playerId="jarvisAudioPlayer";
	this.cssKey="audio-player";
	this.optionBtnTitle='';
}

jarvis.AudioObject=function(){
    this.title="TITLE";
	this.subTitle="DESC";
	this.viewImage="";
	this.isLive=true;
	this.playURL="";
}

jarvis.AudioPlayer= function(pageID,option,delegate) 
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
	
	
    this.info=new jarvis.AudioObject();
	this.player=null;
	this.duration=1;
	this.volume=0.5;
	this.isCompactMode=false;
    this.isBusy=false;
	this.isPlay=false;
	this.startPos=0;
	this.startTime=0;
    this.moveTime=0;
	this.isInit=true;
	this.isStart=false;
	this.isInitPlay=true;
	this.isBora=false;

	//UI
    var that=this;

	this.playerBox=document.createElement("div");
	jarvis.lib.addAttribute(this.playerBox,"screen-out");
    this.body.appendChild(this.playerBox);
    
	this.uiBox=document.createElement("div");
	jarvis.lib.addAttribute(this.uiBox,"ui-box");
    this.body.appendChild(this.uiBox);

	//left
	this.playBtn=document.createElement("button");
	this.playBtn.innerHTML="재생/일시정지";
    jarvis.lib.addAttribute(this.playBtn,"btn align-left ui-left btn-image btn-stop");
	
	//center
	this.uiCenter=document.createElement("div");
    this.icon=document.createElement("div");
	this.title=document.createElement("div");
	this.subTitle=document.createElement("div");

    jarvis.lib.addAttribute(this.uiCenter,"align-left ui-center");
	jarvis.lib.addAttribute(this.icon,"align-left icon-live");
	jarvis.lib.addAttribute(this.title,"font-middle text-auto-resize align-left title");
	jarvis.lib.addAttribute(this.subTitle,"font-small text-auto-resize align-left sub-title");
    this.uiCenter.appendChild(this.icon);
	this.uiCenter.appendChild(this.title);
	this.uiCenter.appendChild(this.subTitle);
    
	
    //right
	this.uiRight=document.createElement("div");
    this.sndBtn=document.createElement("button");
    this.sndBtn.innerHTML="사운드 on/off";
	this.sndBtnP=document.createElement("button");
	this.sndBtnP.innerHTML="볼륨증가";
	this.sndBtnM=document.createElement("button");
	this.sndBtnM.innerHTML="볼륨감소";
    this.optionBtn=document.createElement("button");

	jarvis.lib.addAttribute(this.uiRight,"align-right ui-right");
    if(this.option.isMobile==false){
		jarvis.lib.addAttribute(this.sndBtn,"btn align-right btn-image btn-snd btn-snd-on");
		jarvis.lib.addAttribute(this.sndBtnP,"btn align-right btn-image btn-snd-p");
		jarvis.lib.addAttribute(this.sndBtnM,"btn align-right btn-image btn-snd-m");
		this.uiRight.appendChild(this.sndBtnM);
		this.uiRight.appendChild(this.sndBtnP);
		this.uiRight.appendChild(this.sndBtn);

		jarvis.lib.addEventListener(this.sndBtn,"click",function (e){ that.volumeClick(e);})
		jarvis.lib.addEventListener(this.sndBtnM,"click",function (e){ that.volumeClick(e);})
		jarvis.lib.addEventListener(this.sndBtnP,"click",function (e){ that.volumeClick(e);})
	}
	if(this.option.optionBtnTitle!=""){
		jarvis.lib.addAttribute(this.optionBtn,"btn align-right font-middle option-btn");
		this.optionBtn.innerHTML=this.option.optionBtnTitle; 
		this.uiRight.appendChild(this.optionBtn);
		jarvis.lib.addEventListener(this.optionBtn,"click",function (e){ jarvis.lib.excuteDelegate(that.delegate,"optionBtnClick");})
	}
	
	
    this.uiBox.appendChild(this.playBtn);
	this.uiBox.appendChild(this.uiCenter);
	this.uiBox.appendChild(this.uiRight);

    
	this.viewer=document.createElement("div");
	this.viewer.img=document.createElement("img");
	jarvis.lib.addAttribute(this.viewer,"viewer bg-black30");
	this.boraBtn=document.createElement("button");
	jarvis.lib.addAttribute(this.boraBtn,"btn btn-image btn-bora btn-play-c");
	
	this.body.appendChild(this.viewer);
    this.viewer.appendChild(this.viewer.img);
    this.viewer.appendChild(this.boraBtn);


	this.progress=document.createElement("button");
	jarvis.lib.addAttribute(this.progress,"btn progress");
	this.body.appendChild(this.progress);
    
	this.progressBar=document.createElement("span");
    this.seekBar=document.createElement("span");
	this.seekPreBar=document.createElement("span");
	this.seekHead=document.createElement("span");
    jarvis.lib.addAttribute(this.progressBar,"progress-object progress-bar");
	jarvis.lib.addAttribute(this.seekBar,"progress-object seek-bar");
	jarvis.lib.addAttribute(this.seekPreBar,"progress-object seek-pre-bar");
	jarvis.lib.addAttribute(this.seekHead,"progress-object seek-head");
    this.progress.appendChild(this.progressBar);
	this.progress.appendChild(this.seekBar);
	this.progress.appendChild(this.seekPreBar);
    this.progress.appendChild(this.seekHead);
    
	this.loadingBar= document.createElement("div");
	jarvis.lib.addAttribute(this.loadingBar,"animated loading");
    this.body.appendChild(this.loadingBar);
    this.gestureElement=null;
	
}





jarvis.AudioPlayer.prototype = 
{
    init:function()
	{
         var that=this;
		 this.addPlayer(); 
		 
		 
		 var gestureDelegate=function(){}; 
		 gestureDelegate.prototype = {
		                      
								stateChange :function(e,point)
								{
									if(e==jarvis.GestureElement.START)
									{
										that.touchStart(point.x);
									}
									else if(e==jarvis.GestureElement.MOVE_H)
									{
										that.touchMove(point.x);
									}
									else if(e==jarvis.GestureElement.END)
									{
										that.touchEnd(point.x);
									}
								}
							  
		 }
		 this.gestureElement=new  jarvis.GestureElement(this.body,new gestureDelegate(),false,true);
		 
		 jarvis.lib.addEventListener(this.playBtn,"click",function (e){ that.playClick();})
	     jarvis.lib.addEventListener(this.boraBtn,"click",function (e){ jarvis.lib.excuteDelegate(that.delegate,"boraBtnClick");})
         
	}, 
	changeColor:function(color)
	{
	     this.optionBtn.style.color=color;
		 this.title.style.color=color;
		 this.subTitle.style.color=color;

	},
	addPlayer:function()
	{
		   var that=this;
		   
		   var audioID= this.option.playerId+"player";
		   this.playerBox.id=audioID;
		 

           this.player=new jarvis.AdaptPlayer(this.option.playerId);
           var playerDelegate=function(){};
           playerDelegate.prototype = {
                              stateChange : function(e)
                              {
		            			  
								   switch(e){
                                       
								       case jarvis.AdaptPlayer.COMPLETE:
									   
									        break;
									   case jarvis.AdaptPlayer.INIT:
										  
									        break;
									   case jarvis.AdaptPlayer.READY:
									        that.loading(false); 
									        break;
									   case jarvis.AdaptPlayer.PLAY:
										    
										    that.setPlay();
									        break;
									   case jarvis.AdaptPlayer.STOP:
										   
									        that.setStop();
									        break;
									   case jarvis.AdaptPlayer.BUSY:
									        that.loading(true);
									        break;
                                       case jarvis.AdaptPlayer.CHANGE:
										    that.isStart=false;
									        that.loading(true);
									        break;
                                       case jarvis.AdaptPlayer.START:
										    that.isStart=true;
									        that.loading(false);
									        break;

								   }
								  
								   jarvis.lib.excuteDelegate(that.delegate,"stateChange",[e]);

                              },
	                          durationChange : function(duration)
                              {
								  that.setDuration(duration);
	                          },
                              bufferChange: function(buffer)
                              {
								  that.setBuffer(buffer);
	                          },
							  reloadLive : function()
                              {
		                          jarvis.lib.excuteDelegate(that.delegate,"reloadLive");
                              },
						      openPopup : function()
                              {
		                          
                              },
	                          timeChange : function(time)
                              {
	                             that.setTime(time);
                              },
							  hdChange: function(hd)
                              {
	                               
                              },
							  soundChange : function(volume)
                              {
	                             
								  that.setVolume(volume)
                              },
	                          progressChange : function(progress)
                              {
	                              that.setProgress(progress);
                              },
	                          alertMsg : function(msg)
                              {
	                              //alert(msg);
	                          },
	                          playerError : function(error)
                              {
	                              
                              }
		     }
             var pDelegate=new playerDelegate();
        
             var option=new jarvis.AdaptPlayerOption();
		     option.uiView=false;  
		     option.isPopup=false;  
		     option.isUIHidden=false;  
		     option.reciveEvent=true;  
		     option.reciveTimeEvent=true; 
			 option.isVideo=false;
	   	     option.volume=0.5;  
			 
			 if( this.option.isHtmlPlayer==true ){
		         this.player.addHtmlPlayer(audioID,0,0,pDelegate,option);
			 }else{
                 var swfPath;
				 if(jarvis.config.isTestMode==false){
					 swfPath=jarvis.dirPath+"./lib/player/FlashPlayer.swf";
				 }else{
				     swfPath=jarvis.dirPath+"./lib/player/FlashPlayer_test.swf";
				 }
				 
				 this.player.addFlashPlayer(audioID,swfPath,1,1,pDelegate,option);
			 }
             
    },
//UI event
	getAudioPlayerSize:function()
	{
       
		return this.getPlayerSize()+this.getViwerSize();
	},
	
	getPlayerSize:function(isFullMode)
	{
        if(isFullMode===undefined){
		    isFullMode=false;
		}
		
		
		var bounce=jarvis.lib.getAbsoluteBounce(this.uiBox);
		if(isFullMode==true){
		   return bounce.height+10;
		}else{
		   return bounce.height;
		}
		
	},
	getViwerSize:function()
	{
        var bounce=jarvis.lib.getAbsoluteBounce(this.body);
		var bounceP=jarvis.lib.getAbsoluteBounce(this.progressBar);
		return bounceP.height+bounce.width*jarvis.config.IMAGE_SCALE_HD;
	},
	setCompactMode:function(ac)
	{
         if(ac==true && this.isCompactMode==false){
		    this.isCompactMode=true;
			this.viewer.style.display="none";
			this.resize(false);
		 }else if(ac==false && this.isCompactMode==true){
		    this.isCompactMode=false;
			this.viewer.style.display="block";
			this.resize(false);
		 }
		 var bounce=jarvis.lib.getAbsoluteBounce(this.body);
		 var bounceP=jarvis.lib.getAbsoluteBounce(this.progressBar);
		 var bodyH=Math.floor((bounceP.y-bounce.y)+bounceP.height);
		
		// this.body.style.height=bodyH+"px";
		 
         return bodyH;

	},
    resize:function(isFix)
	{
	    if(isFix===undefined){
		    isFix=true;
		}
		
		var bounce=jarvis.lib.getAbsoluteBounce(this.body);
        var bounceT=jarvis.lib.getAbsoluteBounce(this.uiBox);
        var bounceB=jarvis.lib.getAbsoluteBounce(this.progress);
        
        
		var w= bounce.width;
		var h= bounce.height;
        if(w>10000){
		   return;
		}
        
       

		var viewerH=h-(bounceT.height+bounceB.height);
        var vMin=50;

		if(isFix==true){
			if(viewerH<=vMin && this.isCompactMode==false){
				this.isCompactMode=true;
				this.viewer.style.display="none";
		
			}else if(viewerH>vMin &&this.isCompactMode==true){
				this.isCompactMode=false;
				this.viewer.style.display="block";
			}
		}else{
			
		}
		if(this.isCompactMode==false){
			viewerH=Math.floor(w*9/16);
	        this.viewer.style.height=viewerH+"px";
			var bounceV=jarvis.lib.getAbsoluteBounce(this.viewer);
			var rect= jarvis.lib.getEqualRatioRect(16,9,bounceV.width,bounceV.height,true);
			
			this.viewer.img.width=rect.width;
			this.viewer.img.height=rect.height;

			
		}
		if(isFix==false){
			var bounceP=jarvis.lib.getAbsoluteBounce(this.progressBar);
			var bodyH=Math.floor((bounceP.y-bounce.y)+bounceP.height);
			
			this.body.style.height=bodyH+"px"; 
		}
		this.setText();

	},
	setBora:function(ac)
	{
         if(this.isBora==ac){
		     return;
		 }
         this.isBora=ac;
		 if(this.isBora==true){
			 this.boraBtn.style.display="block";
		 }else{
		     this.boraBtn.style.display="none";
		 }
	},
	setText:function()
	{
		
		var bounce=jarvis.lib.getAbsoluteBounce(this.body);
        if(bounce.width>10000){
		   return;
		}
       
		var bounceC=jarvis.lib.getAbsoluteBounce(this.uiCenter);
		var bounceL=jarvis.lib.getAbsoluteBounce(this.playBtn);
        var bounceR=jarvis.lib.getAbsoluteBounce(this.uiRight);
		var bounceT=jarvis.lib.getRelativeBounce(this.subTitle);
		
		
		var cw=Math.floor(bounce.width-bounceL.width-bounceR.width);
		var mg=Math.ceil(bounceT.x);
		
		var w;
		if(this.info.isLive==true){
			var bounceI=jarvis.lib.getRelativeBounce(this.icon);
		    w=cw-mg-bounceI.width-bounceI.x;
            
		}else{
		    w=cw-mg;
		}
		
 
        this.uiCenter.style.width=cw+"px";
		this.title.style.width=w+"px";

		
	},
	touchStart:function(startPos)
	{
	    
		if(this.isBusy==true){
		   return;
		}
		if(this.isStart==false){
		   return;
		}
		if(this.info.isLive==true){
		   return;
		}
      
		this.startPos= startPos;
	    this.startTime=this.player.getCurrentTime();
        this.moveTime=this.startTime;
		
       
    },
    touchMove:function(movePos)
	{
	    
		if(this.isBusy==true){
		   return;
		}
		if(this.isStart==false){
		   return;
		}
		if(this.info.isLive==true){
		   return;
		}
	   
		var bounce=jarvis.lib.getAbsoluteBounce(this.body);	
        var gep=movePos/bounce.width;
        
		
		this.moveTime=this.startTime+(this.duration*gep);
		//jarvis.debuger.trace(movePos+" "+bounce.width+" "+this.moveTime);
        if(this.moveTime>=this.duration){
		   this.moveTime=this.duration-1;
		}
		if(this.moveTime<=0){
		   this.moveTime=1;
		}
        var pct=this.moveTime/this.duration*100;
        this.seekPreBar.style.width=pct+"%";

        

	},
    touchEnd:function(endPos)
	{
	    if(this.isSeekAble==false){
		   return;
		}
		if(this.isStart==false){
		   return;
		}
		if(this.isBusy==true){
		   return;
		}
		if(this.info.isLive==true){
		   return;
		}
        
		if(Math.abs(this.startTime-this.moveTime)<2){
		     return; 
		}
	    this.seekChange(this.moveTime);
        
	},
	seekClick:function(e)
	{
        var event = e ? e : window.event;
		var pageX = event.pageX ? event.pageX : event.clientX;

		var bounce=jarvis.lib.getAbsoluteBounce(this.progressBar);	
        var relX = pageX- bounce.x;
        

		var seekTime=  this.duration*relX/bounce.width;
        this.seekChange(seekTime);
	},
	volumeClick:function(e)
	{
	    var target=jarvis.lib.getEventTarget(e);
	    
		if(target==this.sndBtn){
		    this.toggleSound();
		}else{
			var v=Number(this.volume);
			if(target==this.sndBtnP){
			    v=v+0.1;
			}else{
				v=v-0.1;
			}
            
		    this.volumeChange(v);
		
		} 
		
	   
	},
	playClick:function()
	{
	   this.player.togglePlay();
	},
//UI Change
    seekChange:function(seekTime){
	    
        if(this.info.isLive==true){
			return;
		}
		
		var pct=seekTime/this.duration*100;
        this.seekPreBar.style.width=pct+"%";
        this.player.seekChange(seekTime);

	},

    changeInfo:function(title,subTitle,viewImage)
	{
        if(title!=null){
		   this.info.title=title;
		} 
		if(subTitle!=null){
		   this.info.subTitle=subTitle;
		}
		if(viewImage!=null && this.info.viewImage!=viewImage){
		   this.info.viewImage=viewImage;
		   this.viewer.img.src=this.info.viewImage;
		}
        this.title.innerHTML=this.info.title;
		this.subTitle.innerHTML=this.info.subTitle;
        this.setText();

	},
    changeVod:function(playURL,isLive,isPlay,isLiveStream)
	{
		if (isLiveStream === undefined ) {
              isLiveStream=true;
        }
		
		
		if(this.isInit==true){
		   this.isInit=false;
		   isPlay=false;
		}
			
        var that=this;
		this.loading(true);
		this.info.playURL= playURL;
        this.info.isLive=isLive;
        if(isLive==true){
			if(this.optionBtn!=null){
			    this.optionBtn.display="block";
			}
          
			this.icon.style.display="block";
			jarvis.lib.removeEventListener(this.progress,"click",function (e){ that.seekClick(e);})
			this.progress.style.cursor="default";
			this.gestureElement.addEvent();
			
			

		}else{
		    this.icon.style.display="none";
			if(this.optionBtn!=null){
			    this.optionBtn.display="none";
			}
			jarvis.lib.addEventListener(this.progress,"click",function (e){ that.seekClick(e);})
            this.progress.style.cursor="pointer";
			this.gestureElement.removeEvent();
		    this.seekBar.style.width="0%";
		}
        
        this.progressBar.style.width="0%";
		this.seekPreBar.style.width="0%";
        
       
		var vodObject=new jarvis.AdaptPlayerObject();
        vodObject.vodUrl=this.info.playURL
        vodObject.isLive=this.info.isLive;
	    vodObject.autoPlay=isPlay;
		vodObject.oneTimeLive=true;
		vodObject.isLiveStream=isLiveStream;
		
	    this.player.changeVod(vodObject);

    },
	
	volumeChange:function(volume)
	{
	    this.player.volumeChange(volume);
	},
	toggleSound:function()
	{
	    this.player.toggleSound();
	},
	
    
	playVod:function()
	{
        
		
		
		this.player.playVod()
	},
	stopVod:function()
	{
        this.player.stopVod()
    },
    loading:function(ac,isCheck)
	{
       this.isBusy=ac;
	   if (isCheck === undefined ) {
              isCheck=true;
        }
	   if(ac==true){
		   if(this.isInitPlay==false || isCheck==false){
				jarvis.lib.addAttribute( this.loadingBar,"data-loading");
		   }
	   }else{
		   this.seekPreBar.style.width="0%";
	       jarvis.lib.removeAttribute( this.loadingBar,"data-loading");
	   }
	},
//UI SET
    
    setPlay:function()
	{  
        if(this.isInitPlay==true){
		   this.isInitPlay=false;
		}

		if(jarvis.uiSet!=null){
		 
			 jarvis.uiSet.onAirPlayer=this;
		}
		this.isPlay=true;
		jarvis.lib.addAttribute(this.playBtn,"btn-play");
		
	},
    setStop:function()
	{
		this.isPlay=false;
		jarvis.lib.removeAttribute(this.playBtn,"btn-play");
		
	},
     
	setDuration:function(duration)
	{
		if(this.info.isLive==true){
		    return;
		}
		this.duration=duration;
        //this.totalTime.innerHTML=jarvis.lib.getTimeStr(Math.floor(duration)); 
        
	},	
	setTime:function(time)
	{
        if(this.info.isLive==true){
		    return;
		}
		
		//this.currentTime.innerHTML=jarvis.lib.getTimeStr(Math.floor(time)); 
		var pct=time/this.duration;
        this.setPctTime(pct);
		
    },
	setPctTime:function(pct)
	{
        if(pct<0){
			pct=0;
		}else if(pct>1){
		    pct=1;
		}
		
		pct=pct*100;
        this.seekBar.style.width=pct+"%";
		this.seekHead.style.left=pct+"%";
    },

    setBuffer:function(buffer){
	   if(this.info.isLive==true){
		    return;
	   }
	   
	   var amount=buffer+this.player.getCurrentTime()/this.duration;
       this.setProgress(amount);
	   // jarvis.debuger.log(buffer,"buffer");
	},
	setProgress:function(progress)
	{
		if(progress>1){
		   progress=1;
		}
       
		var pct=progress*100;
		this.progressBar.style.width=pct+"%";
		
	},
    setVolume:function(volume)
	{
	    
		if(volume==0){
			jarvis.lib.addAttribute(this.sndBtn,"btn-snd-off");
		}else{
			jarvis.lib.removeAttribute(this.sndBtn,"btn-snd-off");
		}
		this.volume=volume;

	}
	
   
}



