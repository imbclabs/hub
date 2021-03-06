/**
 * lib v1.0: FlashPlayer
 * 2013/04/12 by aeddang
 * FlashPlayer 1.0
 */



if(typeof jarvis == "undefined") var jarvis = new Object();

jarvis.FlashPlayer=function(id) 
{
	this.id=id   
	this.hiddenBtn=null;
	this.player=null;
	this.delegate=null;
	this.seekChangeAble=true;
	this.isComplete=false;	
}

jarvis.FlashPlayer.prototype = 
{
    addPlayer: function(div,playerPath,width,height,delegate,option) 
	{
		 if (option === undefined ) {
              option=new jarvis.AdaptPlayerOption();
         }
		 this.delegate=delegate;
		 var parent = document.getElementById(div);
         

         // 

		 var so = new SWFObject(playerPath, this.id, width, height, "10.0.115");     
         so.addParam("allowScriptAccess", "always");
         so.addParam("allowFullScreen", "true");
         so.addParam("quality", "high");
         so.addParam("bgcolor", "#000000"); 
         so.addParam("wmode", "window");
         so.addParam("scale", "noscale");
         so.addParam("menu", "false"); 
         so.addParam("align", "left");
         so.addParam("salign", "t");
         
		 so.addVariable("viewControl", option.uiView);
		 so.addVariable("viewMsg", option.uiView);
		 so.addVariable("isPopup",option.isPopup);
		 so.addVariable("isUIHidden",option.isUIHidden);
		 so.addVariable("isOriginSize",option.isOriginSize);
		 
		 so.addVariable("reciveEvent",option.reciveEvent);
		 so.addVariable("reciveTimeEvent",option.reciveTimeEvent);
		 so.addVariable("delegate","jarvis.flashPlayer"+this.id+".");

		 so.addVariable("volume",option.volume)  ;
         
		 this.infoBox=document.createElement('span');
         this.infoBox.innerHTML="플래쉬 플레이어 접근 불가시 플레이어 하단 재생버튼을 이용 바랍니다.";
         this.infoBox.style.overflow="hidden";
		 this.infoBox.style.position="absolute";
		 this.infoBox.style.height="0";
		 this.infoBox.style.padding="0";
		 this.infoBox.style.left="-1000px";
		 
		 parent.appendChild(this.infoBox);
		 


		 var parentP=parent.parentNode;

		 this.hiddenBtn=document.createElement('button');
         this.hiddenBtn.style.overflow="hidden";
		 this.hiddenBtn.style.position="absolute";
		 this.hiddenBtn.style.height="0";
		 this.hiddenBtn.style.padding="0";
		 this.hiddenBtn.style.fontSize="0"; 
         this.hiddenBtn.style.lineHeight="0";
		 this.hiddenBtn.style.left="-1000px";
         this.hiddenBtn.innerHTML="비디오 플레이어 재생/정지";
		 
		 parentP.appendChild(this.hiddenBtn);
		 
		 so.write(div);
         this.player= document.getElementById(this.id);
          
		 var that=this;
		  jarvis.lib.addEventListener(this.hiddenBtn,"click",function (e){that.hiddenBtnClick(e);});
		
		 

	},
	hiddenBtnClick : function (e)
    {
        
		this.togglePlay();
	},
    addCommerce : function (jsonData)
    {
       this.player.addCommerce(jsonData);
	},
	addSeekPoint : function (jsonData)
    {
      
	   this.player.addSeekPoint(jsonData);
	},
    changeVod : function (vodObject)
    {
       
	   
	   this.isComplete=false;	
	   /*
	   var playerObj= document.getElementById(this.id);
	   if(playerObj==null){
	       return;
	   }
	    */
		//alert(vodObject.autoPlay);
	   this.player.changeVod ({
		                         vodUrl:vodObject.vodUrl,
							     initImage:vodObject.initImage,
                                 initLink:vodObject.initLink,
                                 initTarget:vodObject.initTarget,
								 autoPlay:vodObject.autoPlay,
								 link:vodObject.link,
								 linkTarget:vodObject.linkTarget,
								 initTime:vodObject.initTime,
								 isLive:vodObject.isLive,
                                 isLiveStream:vodObject.isLiveStream,
                                 isAd:vodObject.isAd,
								 iconTypeName:vodObject.iconTypeName,
							     changeHDAble:vodObject.changeHDAble,
								 changeHighAble:vodObject.changeHighAble,
							     copyAble:vodObject.copyAble,
								 isDemo:vodObject.isDemo,
							     isBanner:vodObject.isBanner,
								 msg:vodObject.msg,
								 oneTimeLive:vodObject.oneTimeLive
                                 
		                      });

    },


    stopVod : function(addLoading)
    {
	    
		//alert(" stopVod ");
		if ( addLoading === undefined ) {
            addLoading="Y";
        }
		try {
			this.player.stopVod(addLoading);
		}catch (e) {
                      
        }
		
            
		
    },
    playVod : function()
    {
	   // alert("playVod ");
		try {
			this.player.playVod();
		}catch (e) {
                      
        }
		
    },
    
	rePlayVod: function()
    {
	  // alert("rePlayVod ");
		try {
			this.player.rePlayVod();
		}catch (e) {
                      
        }
		
    },

    togglePlay : function()
    {
	   // alert("togglePlay ");
		
		try {
			this.player.playChange();
		}catch (e) {
                      
        }
		
    },
	toggleSound : function()
    {
	    this.player.volumeChange();
    },
    fullScreen : function()
    {
	    this.player.fullScreen("true");
    },
	volumeChange : function(volume)
    {
	    if(volume<0){
		   volume=0;

		}else if(volume>1){
		   volume=1;
		}
		this.player.volumeChange(volume);
    },
    seekChange : function(seek,isPlay)
    {
	    if(this.seekChangeAble==true){
		   this.player.seekChange(seek,isPlay);
		}
		
    },
	rateChange : function(rate)
    {
	   
	},
    resize : function(w,h)
    {
	   //this.player.style.width=w+"px";    
	   //this.player.style.height=h+"px";   
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
	},

 
	//return event
	stateChange : function(e)
    {
		
		if(this.player==null){
		  
		   this.player= document.getElementById(this.id);
		}
        if(e==jarvis.AdaptPlayer.INIT){
		    
			
			if(jarvis.timer==null){
			    jarvis.lib.excuteDelegate(this.delegate,"stateChange",[e]);
			}else{
		        
			    var that=this;
				var tObj=new jarvis.TimerObject();
                tObj.id="";
				tObj.t=0.5;
			    tObj.repeatCount=1;
			    var timerDelegate=function(){}; 
                timerDelegate.prototype = {
                              complete : function(id){that.delayInit();}
		        }
			    jarvis.timer.addTimer(new timerDelegate(),tObj);
			}
		}else{
			if(e==jarvis.AdaptPlayer.COMPLETE){
			   if(this.isComplete==true){
			        return;
			   }else{
			        this.isComplete=true;
			   }	
			}
		    jarvis.lib.excuteDelegate(this.delegate,"stateChange",[e]);
		}

		
		
    },
	delayInit : function()
    {
		
		jarvis.lib.excuteDelegate(this.delegate,"stateChange",[jarvis.AdaptPlayer.INIT]);
	},
	reloadLive : function()
    {
		
		jarvis.lib.excuteDelegate(this.delegate,"reloadLive");
    },
	openPopup : function()
    {
		jarvis.lib.excuteDelegate(this.delegate,"openPopup");
    },
	playerCopy : function()
    {
		jarvis.lib.excuteDelegate(this.delegate,"playerCopy");
    },
	copyCommerce : function(seq)
    {
		jarvis.lib.excuteDelegate(this.delegate,"copyCommerce",[seq]);
    },
	goCommerce : function(seq)
    {
		jarvis.lib.excuteDelegate(this.delegate,"goCommerce",[seq]);
    },
	onTop : function(yn)
    {
		if(yn=="Y"){
		   jarvis.lib.onTop(true);
		}else{
		   jarvis.lib.onTop(false);
		}
		
    },
	viewCommerce : function(seq)
    {
		jarvis.lib.excuteDelegate(this.delegate,"viewCommerce",[seq]);
    },
		
	durationChange : function(duration)
    {
	   if(String(duration)=="NaN"){
		   duration=0;
	   }
	   jarvis.lib.excuteDelegate(this.delegate,"durationChange",[duration]);
	
    },
	timeChange : function(time)
    {
		jarvis.lib.excuteDelegate(this.delegate,"timeChange",[time]);
		
    },
	bufferChange : function(buffer)
    {
		jarvis.lib.excuteDelegate(this.delegate,"bufferChange",[buffer]);
		
    },
	soundChange : function(volume)
    {
	    jarvis.lib.excuteDelegate(this.delegate,"soundChange",[volume]);
	
    },
	hdChange: function(hd)
    {
	    jarvis.lib.excuteDelegate(this.delegate,"hdChange",[hd]);
		
    },
	progressChange : function(progress)
    {
	    jarvis.lib.excuteDelegate(this.delegate,"progressChange",[progress]);
		

    },
	excuteDelegate : function(sel,param)
    {
		
		jarvis.lib.excuteDelegate(this.delegate,sel,param);
	},
	alertMsg : function(msg)
    {
	    jarvis.lib.excuteDelegate(this.delegate,"alertMsg",[msg]);
	
	},
	playerError : function(error)
    {
	    jarvis.lib.excuteDelegate(this.delegate,"playerError",[error]);

	}

}

 