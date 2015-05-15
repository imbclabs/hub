/**
 * lib v1.0: HtmlPlayer
 * 2013/04/12 by aeddang
 * FlashPlayer 1.0
 */


document.write("<link rel='stylesheet' href='"+jarvisSrc+"player/htmlPlayer.css'>");


if(typeof jarvis == "undefined") var jarvis = new Object();

jarvis.HtmlPlayer=function(id) 
{
	this.id=id;
	this.player=null;
	
    

    this.initStart=false;
	this.initSeekChangeAble=false;
	this.duration=-1;
	this.currentVolume=0.5;
	
    this.currentVodObject=null;
	this.parent=null;
	this.isPlaying=false;
	this.seekChangeAble=true;
	this.initTime=-1;
	this.prevTime=-1;
	this.isStart=true;
	this.isBusy=false;
	this.endIsPlay=false;
    this.autoPlay=false;
	this.delegate=null;
	this.initTimer=null;
	this.option=null;
    this.adLinkBtn=null;
	this.imageViewer=null;

	this.isTimerStart=false;
	this.isComplete=false;
    
	this.isLoadingBarUsed=false;
	if(jarvis.lib.getNavigatorInfoStr().indexOf("Safari/537.36")!=-1){
		this.isLoadingBarUsed=true;
	}else{
	
	}
	
	this.devicePlayerMode=false;
	this.isAndroid=jarvis.lib.isAndroid();
	this.isIos=jarvis.lib.isIos();
	this.isPhone=jarvis.lib.isPhone();
    this.isInitPlayCheck=jarvis.lib.isMobile();
    this.playCheckMsg="무선네트워크에 연결되어있는지 확인하세요. 3G 접속시 과도한 데이터 동화료가 부과될 수 있습니다.";

	this.usedPlayBtn=this.getUsedPlayBtn();
	//alert("this.isChrome : "+this.isChrome);

	//alert("this.isChrome : "+jarvis.lib.getNavigatorInfoStr());
	
}

jarvis.HtmlPlayer.prototype = 
{
    getUsedPlayBtn: function() 
	{
		
		if(this.isAndroid==true){
		    var vn=jarvis.lib.getADVersionNumber(jarvis.lib.getADVersion());
            if(vn>=4.3){
			    return false;
			}else{
			    return true;
			}

		}else if(this.isIos==true){
		    return false;
		}else{
		    return true;
		}
	},
	
	
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
		  this.parent.setAttribute('style','position:relative');
		  jarvis.lib.addAttribute(this.parent,'jarvis_html_player');


		  this.parent.innerHTML = "<video "+ controls +" preload='metadata' id='"+this.id+"' tabindex='0' width='"+width+"' height='"+height+"'></video>"
		                      
							  +"<a href='#' type='button' id='"+this.id+"_adlink_btn' title='광고 홈페이지로 이동' class='ad_btn'>광고자세히 보기</a>"
							  +"<button title='이벤트 홈페이지로 이동' id='"+this.id+"_viewer' class='viewer'></button>"
							  +"<button type='button' id='"+this.id+"_play_btn' class='play_btn' >재생</button>"
							  +"<div id='"+this.id+"_duration_info' class='duration_info' ></div>";
							  +"<div id='"+this.id+"_loading_bar' class='animated loading' >로딩바</div>";
                              
							  
          
		  
		  this.player = document.getElementById(this.id);
		  this.playBtn =document.getElementById(this.id+"_play_btn");
		  this.adLinkBtn =document.getElementById(this.id+"_adlink_btn");
		  this.imageViewer =document.getElementById(this.id+"_viewer");
		  this.durationInfo= document.getElementById(this.id+"_duration_info");
          this.loadingBar= document.getElementById(this.id+"_loading_bar");
          
		  this.delegate=delegate;
		  this.adLinkBtn.style.display="none"; 
		  this.playBtn.style.display="none"; 
		  var that=this;
          var video=this.player;
          
          this.volumeChange(this.option.volume);
          jarvis.lib.addEventListener(this.playBtn,"click",function(e) {
			  
			  var event = e ? e : window.event;
			  (event.preventDefault) ? event.preventDefault() : event.returnValue = false; 

			  that.playVod();
		  });
		  jarvis.lib.addEventListener(this.imageViewer,"click",function(e) {that.goPage();});
         
		  this.player.addEventListener("loadstart", function () {
                                                                 jarvis.debuger.log("loadstart");
                                                                 jarvis.lib.excuteDelegate(delegate,"stateChange",[jarvis.AdaptPlayer.CHANGE]);
																 jarvis.lib.excuteDelegate(delegate,"timeChange",[0]);
																 if( that.isIos==true){
																     that.busyChange(false);
																 }else{
																	 that.busyChange(true);
																 }
																 
		                                                      }, false);
		  this.player.addEventListener("loadedmetadata", function (){
                                                                     jarvis.debuger.log("loadedmetadata");
                                                                     durationChange(video.duration);
																	
																	 }, false);
																	 

          this.player.addEventListener("timeupdate", timeChange, false);
          this.player.addEventListener("seeking", function (){
                                                               that.busyChange(true);

															 }, false);
          this.player.addEventListener("seeked", function (){
                                                               that.busyChange(false);
															   
															   if(that.endIsPlay==true){
																    that.playVod();
															   }else{
																    that.stopVod();
															   }
		                                                    }, false);
            
          this.player.addEventListener("pause", function () {
                                                               jarvis.debuger.log("pause");
															   that.isPlaying=false;
															   jarvis.lib.excuteDelegate(delegate,"stateChange",[jarvis.AdaptPlayer.STOP]);
								                               if( that.usedPlayBtn==true){
																	that.playBtn.style.display="block";
															   }
		                                                    }, false);
        
          this.player.addEventListener("playing", function () {
                                                                 jarvis.debuger.log("playing");
																 
																 that.isPlaying=true;
																 if(that.initStart==false){
																    that.initStart=true;
																	if(that.initSeekChangeAble==true){
																		that.initSeekChangeAble=false;
																	    that.setSeekChangeAble(false);
																	}
																 }
																 that.playBtn.style.display="none";
																 if(that.isStart==true){
																	 that.imageViewer.style.display="none"; 
																	 that.durationInfo.style.display="none"; 
                                                                     that.playBtn.style.display="none";
								                                     that.isStart=false;
																	 durationChange(video.duration);
														
																	 jarvis.lib.excuteDelegate(delegate,"stateChange",[jarvis.AdaptPlayer.START]);
										                            
                                                                     if(that.initTime!=-1){
																		that.seekChange(that.initTime,that.autoPlay);
																		that.initTime=-1;
															         }
																	
                                                                 }
																 that.busyChange(false);
																 jarvis.lib.excuteDelegate(delegate,"stateChange",[jarvis.AdaptPlayer.PLAY]);
																
																 
																 
																 
                                                              }, false);

          this.player.addEventListener("loadeddata", function () {
			                                                      jarvis.debuger.log("loadeddata");
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
                                                               if(that.currentVodObject!=null){
																	if(that.currentVodObject.isLive==true){
															             return;
																	}
															   }
															   if(that.isComplete==false){
														            videoComplete();
															   }
															 
                                                            }, false);

          this.player.addEventListener("progress", function () {
			                                                       
																   jarvis.debuger.log("progress");
																   durationChange(video.duration);
																   progressChange();
																
																 
                                                                }, false);
          
		  this.player.addEventListener("error", function (err) {
                                              
																  jarvis.lib.excuteDelegate(delegate,"playerError",[err]);
														
                                                               }, false);
          this.player.addEventListener("canplay", function () {
			                                                     jarvis.debuger.log("canplay");
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
		  function videoComplete(){
				
				if(jarvis.timer!=null){
					jarvis.timer.removeTimer(that.id+"complete");				
				}
				
				that.isComplete=true;
				jarvis.lib.excuteDelegate(delegate,"stateChange",[jarvis.AdaptPlayer.COMPLETE]);
		  }
          function timeChange(){
                  
			       
				   if(that.duration<=1)
				   {
						durationChange(video.duration);
						return;
				   }

				   if(that.option.reciveTimeEvent==true){
						progressChange();
						jarvis.lib.excuteDelegate(delegate,"timeChange",[video.currentTime]);
                   }
				   
                   if(that.isAndroid==false){
						return;
				   }
				   if(video.currentTime>that.duration){
						return;
		           }
				   if(video.currentTime<=10){
						return;
		           }
                  // jarvis.debuger.log("t: "+(that.duration-1.5)+" c: "+video.currentTime);
				   if((that.duration-1.5)<=video.currentTime){
						if(that.isTimerStart==false){
							that.isTimerStart=true;
                            if(jarvis.timer!=null){
							    var tObj=new jarvis.TimerObject();
								tObj.id=this.id+"complete";
								tObj.t=1.5;
								tObj.repeatCount=1;
								var timerDelegate=function(){}; 
								timerDelegate.prototype = {
											complete : function(id){videoComplete();}
								}
								jarvis.timer.addTimer(new timerDelegate(),tObj);
							}
                            
						}
				   
				   
				   }
				   
				   
																     
          }
          function durationChange(_duration){
		          
			      if(String(_duration)=="NaN"){
		             _duration=0;
		          }
				  if(that.currentVodObject!=null){
				      if(that.currentVodObject.isAd==true){
					      if(Number(_duration)>1000){
							_duration=Number(_duration)/600;
						  }
					  }
				  
				  }
                  if(that.duration==_duration){
				      return;
				  }
				  
                  jarvis.debuger.trace("duration : "+_duration);
				  that.duration=_duration;
				  
				  jarvis.lib.excuteDelegate(delegate,"durationChange",[that.duration]);
				  
			     
		  }

		 
          jarvis.lib.excuteDelegate(delegate,"stateChange",[jarvis.AdaptPlayer.INIT]);
          
		 
    },
    
    checkSupport : function()
    {
		if(!!document.createElement('video').canPlayType)
        {
             var vidTest=document.createElement("video");
             var  oggTest=vidTest.canPlayType('video/ogg; codecs="theora, vorbis"');
             if (!oggTest)
             {
                 var h264Test=vidTest.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
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
    livePlay : function (vodPath)
    {
		this.stopVod();
		this.devicePlayerMode=true;
		top.location.href=vodPath;
		this.busyChange(false);
	},

    changeVod : function (vodObject)
    {
       
		this.isStart=true;
		this.currentVodObject=vodObject;
		this.isPlaying=false;
	    this.initTime=vodObject.initTime;
	    this.endIsPlay=false;
		this.duration=-1;
		this.prevTime=-1;
        this.isComplete=false;
        this.isTimerStart=false;
        this.devicePlayerMode=false;
	    
        this.autoPlay =vodObject.autoPlay;   
		this.initTime=vodObject.initTime;

		
        if(this.isAndroid==true && vodObject.usedDevicePlayer==true){
		     if(this.autoPlay==true){
			     this.livePlay(vodObject.vodUrl);
				 this.autoPlay=false;
			 }else{
			     this.devicePlayerMode=true;
			 }
		     
		}else{
		    this.player.src = vodObject.vodUrl;
		    this.player.load();  
		}
        
		var that=this;
        this.imageViewer.style.display="none"; 
        this.playBtn.style.display="none";
		if(this.currentVodObject.preDuration==undefined 
			||this.currentVodObject.preDuration=="" 
			|| this.currentVodObject.preDuration=="0" 
			|| this.currentVodObject.preDuration==0)
			{
		    this.durationInfo.style.display="none"; 
		}else{
		    this.durationInfo.style.display="block";
			this.durationInfo.innerHTML=this.currentVodObject.preDuration;
		}
		
		if(this.currentVodObject.link==""){
			 this.adLinkBtn.style.display="none"; 
			 
		}else{
			 if(this.isPhone==true && this.isIos==true){
				 this.adLinkBtn.style.display="none"; 
			 }else{
				 this.adLinkBtn.style.display="block"; 
				 this.adLinkBtn.setAttribute("href",that.currentVodObject.link);
				 this.adLinkBtn.setAttribute("target",that.currentVodObject.linkTarget);
			 }
		}
	    
		
		if (this.seekChangeAble==false) {
			if (this.player.hasAttribute("controls")) {
				this.player.removeAttribute("controls")   
			}
        }else{
		    this.player.setAttribute("controls","controls") 	
		}
        
		if(this.autoPlay==false)
		{
		   this.playBtn.style.display="block";
		   
		   if( vodObject.initImage !== undefined &&  vodObject.initImage !== null &&  vodObject.initImage != ""){
				this.viewImage(vodObject.initImage);
		   }
		   var bounce=jarvis.lib.getAbsoluteBounce(this.parent);
           this.setPlayBtnPos(bounce.width,bounce.height);
		}else{
		   if(this.isAndroid==true){
               this.playVod();
		   } 
		   
		}
		
		
		
    },
	goPage : function (e)
    {
		
		if(this.currentVodObject.initLink!= undefined && this.currentVodObject.initLink!=""){
			if(this.currentVodObject.initTarget=="_self"){
			     top.location.href=this.currentVodObject.initLink;
			}else{
				
			     window.open(this.currentVodObject.initLink);
			}
		}else{
			
		    
		}
		
		
		
	},
	busyChange : function(ac){
             
              jarvis.debuger.log("busyChange "+ac);
              if(this.isPlaying==false && ac==true){
			     // return;
			  }
			  if(this.isBusy!=ac){
					  this.isBusy=ac;
					  if(ac==true){
						  
						  this.loading(true);
					      jarvis.lib.excuteDelegate(this.delegate,"stateChange",[jarvis.AdaptPlayer.BUSY]);
					  }else{
						
						  this.loading(false);
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
	    if(this.isInitPlayCheck==true){
		   alert( this.playCheckMsg);
		   this.isInitPlayCheck=false;
		}
		
		
		if(this.devicePlayerMode==true && this.currentVodObject!=null){
		   this.livePlay(this.currentVodObject.vodUrl);
		   return;
		}
		
		if(this.isBusy==true){
		   return;
		}
		if(this.isPlaying==false){
			this.busyChange(true);
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
		if(this.isPlaying){
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
		if(this.player!=null){
			this.player.volume=volume;
		}
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
	    	
        if (ac==false) {
			if(this.initStart==false){
				this.initSeekChangeAble=true;
				return;
			}
			this.player.controls=false; 
		}else{
			this.player.controls=true; 	
		}
		this.seekChangeAble=ac;

	},
	viewMessage : function(msg)
    {
	    alert(msg);
	},
	viewImage : function(img)
    {
	     this.imageViewer.innerHTML="";
		 var image=new Image();
		 image.src = img; 
		 image.style.width="100%";
         image.style.height="100%";
		 this.imageViewer.appendChild( image );
		 this.imageViewer.style.display="block"; 
	},
	getCurrentTime : function()
    {
	    return this.player.currentTime;
	},
	loading:function(ac)
	{
       if(this.isLoadingBarUsed==false){
	       return;
	   }
	   
	   if(ac==true){
		   jarvis.lib.addAttribute( this.loadingBar,"data-loading")
	   }else{
		   jarvis.lib.removeAttribute( this.loadingBar,"data-loading");
	   }
	}
    
}

 