/**
 * lib v1.0: HtmlPlayer
 * 2013/04/12 by aeddang
 * FlashPlayer 1.0
 */



if(typeof jarvis == "undefined") var jarvis = new Object();

jarvis.HtmlAudio=function(id) 
{
	this.id=id;
	this.player=null;
	
	this.duration=-1;
	this.currentVolume=0.5;
	
    this.currentVodObject=null;
	this.parent=null;
	this.isPlaying=false;
	this.seekChangeAble=true;
	this.initTime=-1;
	this.isStart=true;
	this.isBusy=true;
	this.endIsPlay=false;
    this.autoPlay=false;
	this.delegate=null;
	this.initTimer=null;
	this.option=null;
   
    this.isInit=true;

	this.isAndroid=jarvis.lib.isAndroid();
	this.isIos=jarvis.lib.isIos();
	this.isPhone=jarvis.lib.isPhone();
	
}

jarvis.HtmlAudio.prototype = 
{
    addPlayer: function(div,width,height,delegate,_option) 
	{
		  if (_option === undefined ) {
              _option=new jarvis.AdaptPlayerOption();
          }
		  this.option=_option;
		 
          var controls="";
          if(this.option.uiView==true){
		      controls="controls=controls";
		  }
		  this.parent = document.getElementById(div);
		  this.parent.innerHTML = "<audio "+ controls +" preload='metadata' id='"+this.id+"' width='"+width+"' height='"+height+"'></audio>";
		                      
          jarvis.debuger.log("000001");
		  
		  this.player = document.getElementById(this.id);
		 
		  this.delegate=delegate;
		 
		 // var videoJ=$(document).find("#"+this.id);
          var that=this;
          var video=this.player;
          
		  this.player.addEventListener("loadstart", function () {
                                                                 
                                                                 jarvis.lib.excuteDelegate(delegate,"stateChange",[jarvis.AdaptPlayer.CHANGE]);
																 jarvis.lib.excuteDelegate(delegate,"timeChange",[0]);
																 if( that.isIos==true){
																     that.busyChange(false);
																 }else{
																	 that.busyChange(true);
																 }
															}, false);
		  this.player.addEventListener("loadedmetadata", function (){
                                                                  
                                                                     durationChange(video.duration);
																	 }, false);
																	 

          this.player.addEventListener("timeupdate", timeChange, false);
          
		  this.player.addEventListener("seeking", function () {
                                                               that.busyChange(true);
		                                                    }, false);
          this.player.addEventListener("seeked", function () {
                                                               that.busyChange(false);
															   
															   if(that.endIsPlay==true){
																    that.playVod();
															   }else{
																    that.stopVod();
															   }
		                                                    }, false);
            
		   
           this.player.addEventListener("pause", function () {
                                                               that.isPlaying=false;
															   jarvis.lib.excuteDelegate(delegate,"stateChange",[jarvis.AdaptPlayer.STOP]);
															   
		                                                    }, false);
          this.player.addEventListener("playing", function () {
                                                                 that.isPlaying=true;
																 if(that.isStart==true){
								                                     that.isStart=false;
																	 durationChange(video.duration);
																	 jarvis.lib.excuteDelegate(delegate,"stateChange",[jarvis.AdaptPlayer.START]);
										                            
                                                                     if(that.initTime!=-1){
																	          that.seekChange(that.initTime,true);
																	          that.initTime=-1;
															         }
																	
                                                                 }
																 
																 that.busyChange(false);
																 jarvis.lib.excuteDelegate(delegate,"stateChange",[jarvis.AdaptPlayer.PLAY]);
																
																
																 
																 
                                                              }, false);
          
          this.player.addEventListener("loadeddata", function () {
			                                                   
			                                                    that.busyChange(false);
																if(that.autoPlay==true){
																	 that.playVod();
																 }
											                 }, false);
		 
		 this.player.addEventListener("waiting", function () {
                                                                jarvis.debuger.log("waiting");
																 that.busyChange(true);
                                                             }, false);
	      
		  this.player.addEventListener("suspend", function () {
																jarvis.debuger.log("suspend");
                                                                //that.busyChange(true);  
                                                             }, false);
		  this.player.addEventListener("stalled", function () {
																jarvis.debuger.log("stalled");
                                                               // that.busyChange(true);  
                                                             }, false);
	      
		  this.player.addEventListener("ended", function () {
                                                               jarvis.lib.excuteDelegate(delegate,"stateChange",[jarvis.AdaptPlayer.COMPLETE]);
															   
															 
                                                            }, false);

          this.player.addEventListener("progress", function () {
			                                                       durationChange(video.duration);
																   progressChange();
																  
																
																}, false);
          
		  this.player.addEventListener("error", function (err) {
                                              
																  jarvis.lib.excuteDelegate(delegate,"playerError",[err]);
														
                                                               }, false);
          this.player.addEventListener("canplay", function () {
			                                                     
							                                     that.busyChange(false);
		                                                      }, false);
         
		  
		  function progressChange(){
                  
			     
				  if(video.buffered){
                     if(video.duration!=0){
						try {
                             var progress=video.buffered.end(0)/video.duration;
							 jarvis.lib.excuteDelegate(delegate,"progressChange",[progress]);
                        } catch (e) {
                             
                        }		
					 }
				     
				  }
				   
		  }
          function timeChange(){
                  
			       if(that.duration==1 || that.duration==-1)
				   {
						
						durationChange(video.duration);
						if(that.option.reciveTimeEvent!=true){
		                    that.player.removeEventListener("timeupdate", timeChange);
							return;
		                }
                   }
				   progressChange();
				   jarvis.lib.excuteDelegate(delegate,"timeChange",[video.currentTime]);
				   
																     
          }
          function durationChange(_duration){
		          
			      if(String(_duration)=="NaN")
			      {
		             _duration=0;
		          }
				  that.duration=_duration;
				  jarvis.lib.excuteDelegate(delegate,"durationChange",[that.duration]);
				  
			     
		  }

		  jarvis.lib.excuteDelegate(delegate,"stateChange",[jarvis.AdaptPlayer.INIT]);
          
		 
    },
    
    checkSupport : function()
    {
		if(!!document.createElement('audio').canPlayType)
        {
             var vidTest=document.createElement("audio");
             var  oggTest=vidTest.canPlayType('audio/ogg; codecs="theora, vorbis"');
             if (!oggTest)
             {
                 var h264Test=vidTest.canPlayType('audio/mp4; codecs="avc1.42E01E, mp4a.40.2"');
                 if (!h264Test)
                 {
                     return false;
                 }else
                 {
                     if (h264Test=="probably")
                     {
                          return true;
                     }else
                     {
                          return false;//Some support
                     }
                 }
             }else
             {
                 if (oggTest=="probably")
                 {
                     return true;
                 }else
                 {
                     return false;//Some support
                 }
             }
        }
        else
        {
            return false;
        }

	},

    changeVod : function (vodObject)
    {
        
		this.isBusy=false;
        this.stopVod();
		this.isStart=true;
		this.currentVodObject=vodObject;
		this.isPlaying=false;
	    this.initTime=vodObject.initTime;
	    this.endIsPlay=false;
		this.duration=-1;
        
       
        this.autoPlay=vodObject.autoPlay;
		if(vodObject.autoPlay==true){
		    this.player.autoplay ="auto";
			if(this.isInit==true){
			    this.isInit=false;
				this.player.play();
			}
		}
		this.initTime=vodObject.initTime;
		this.player.src = vodObject.vodUrl;
        /*
		if(this.isAndroid==true)
		{
			this.player.load();  
			if(this.autoPlay==true){
				this.playVod();
			}
		}*/
		
    },
	busyChange : function(ac){
              if(this.isPlaying==false && ac==true){
			      //return;
			  }
			  if(this.isBusy!=ac){
					  this.isBusy=ac;
					  if(ac==true){
					      jarvis.lib.excuteDelegate(this.delegate,"stateChange",[jarvis.AdaptPlayer.BUSY]);
					  }else{
					      jarvis.lib.excuteDelegate(this.delegate,"stateChange",[jarvis.AdaptPlayer.READY]);
					  }
                      
		      }

    },
    stopVod : function()
    {
	    if(this.isBusy==true){
		   return;
		}
		if(this.isPlaying==true){
			
		    this.player.pause();
		}  
		
		
		
    },
    playVod : function()
    {
	    if(this.isBusy==true){
		   return;
		}
		if(this.isPlaying==false){
			this.player.play();
		}
    },
	rePlayVod: function()
    {
	    if(this.isBusy==true){
		   return;
		}
		this.seekChange(0,false);
    },
    togglePlay : function()
    {
	   
		if(this.isBusy==true){
		   return;
		}
		if(this.isPlaying==true){
		   this.player.pause();
		}else{
		   this.player.play();
		}
    },
	toggleSound : function()
    {
	   if(this.isBusy==true){
		   return;
		}
	   if(this.currentVolume==0){
	       this.volumeChange(0.5);
	   }else{
	       this.volumeChange(0);
	   }
    },
    fullScreen : function()
    {
	   
    },
	volumeChange : function(volume)
    {
	    if(this.isBusy==true){
		   return;
		}
		if(volume<0){
		   volume=0;

		}else if(volume>1){
		   volume=1;
		}
		
		this.currentVolume=volume;
		this.player.volume=volume;
		jarvis.lib.excuteDelegate(this.delegate,"soundChange",[volume]);
		
    },
    seekChange : function(seek,isPlay)
    {
	    if(this.isBusy==true){
		   return;
		}
		if(this.seekChangeAble==true){
		   this.endIsPlay=isPlay;
		   this.player.currentTime = seek;
		}
		
    },
    rateChange : function(rate)
    {
	    if(this.isBusy==true){
		   return;
		}
		this.player.playbackRate += rate;
	},
    resize : function(w,h)
    {
	   this.player.width=Number(w);
	   this.player.height=Number(h);
	},
	setSeekChangeAble : function(ac)
    {
	    this.seekChangeAble=ac;
		if (this.seekChangeAble==false) {
			this.player.controls=false; 
			
        }else{
			
		    this.player.controls=true; 	
		}
	},
	viewMessage : function(msg)
    {
	    alert(msg);
	},
	viewImage : function(img)
    {
	    
		 
	},
	getCurrentTime : function()
    {
	    return this.player.currentTime;
	}

}

 