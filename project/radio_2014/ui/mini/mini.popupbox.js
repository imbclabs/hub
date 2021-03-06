﻿/**
 * miniInfo v1.0: AudioPlayer 
 * by aeddang
 */
/*
interfaces

*/

if(typeof jarvis == "undefined") var jarvis = new Object();

jarvis.MiniPopupBoxOption=function(){
   this.color="#3761a0";
   this.cssKey="popup-box";
   this.reciveKey="miniPopupBox";
   this.isMini=true;
}


jarvis.MiniPopupBox= function(body,delegate,option) 
{
	
	this.SELECT_SONG="SELECT_SONG";
	this.REPLAY_SONG="REPLAY_SONG";
	this.REPLAY_SONG_LIST="REPLAY_SONG_LIST"
    
    this.RSS_PAGE_PATH="http://minicast.imbc.com/PodCast/pod.aspx"; //?code=1003018100000100000

    this.selectSongPoint=new Point(0,50);
	this.replaySongPoint=new Point(350,44);

	
	this.body=body;
	if(delegate=== undefined){
	    delegate=null;
    }
	if(option===undefined){
	   option=new jarvis.MiniPopupBoxOption();
	}
	this.option=option;
    this.delegate=delegate;
	this.color=option.color;
    this.reciveKey=option.reciveKey;
    this.aniID=this.reciveKey+"ANI";
	jarvis.lib.addAttribute(this.body,option.cssKey+" uicomponent animated-none");
    jarvis[this.reciveKey]=this;
	
	this.info=jarvis.miniInfo;
    this.program=null
	this.type=-1;
	this.topPos=0;

	this.dataA=null;
    this.currentPage=-1;
	this.totalPage=-1;
	this.isActive=false;
	this.isAcOver=true;
    this.isMoveAble=true;
	this.programCode="";
    this.pageNum=0;
	this.lineNumW;
	this.lineNumH;
    var that=this;
    
	
	//make top
	
    this.bin=document.createElement("div");
    jarvis.lib.addAttribute(this.bin,"this.bin");
    this.body.appendChild( this.bin);
   

    this.header=document.createElement("div");
    if(this.info.isAndroid==false){
		this.overlay=document.createElement("div");
		this.overlay.img=document.createElement("img");
		this.overlay.img.src=jarvis.dirPath+'style/mini/bg_overlay.png';
		this.overlay.appendChild(this.overlay.img);
		jarvis.lib.addAttribute(this.overlay,"overlay");
		this.header.appendChild(this.overlay);
	}else{
	    this.overlay=null;
	}
	this.title=document.createElement("h3");
	this.rssBtn=document.createElement("button");
    this.closeBtn=document.createElement("button");
    
    jarvis.lib.addAttribute(this.header,"header border-top");
    this.header.style.background=this.color;

   
	jarvis.lib.addAttribute(this.title,"title align-left font-middle text-auto-resize");
    jarvis.lib.addAttribute(this.closeBtn,"btn btn-image btn-close align-right");
	jarvis.lib.addAttribute(this.rssBtn,"btn btn-image btn-rss align-right");
    
	this.body.appendChild(this.header);
    
	this.header.appendChild(this.title);
	this.header.appendChild(this.closeBtn);
    this.header.appendChild(this.rssBtn);
   

    this.listBox=document.createElement("div");
    jarvis.lib.addAttribute(this.listBox,"list-box border-side");
    this.body.appendChild(this.listBox);

    this.bottom=document.createElement("div");
	this.pageNavi=document.createElement("div");
    


	jarvis.lib.addAttribute(this.bottom,"bottom border");
    jarvis.lib.addAttribute(this.pageNavi,"pagecontrol");
    this.body.appendChild(this.bottom);
    this.bottom.appendChild(this.pageNavi);

	this.loadingBar= document.createElement("div");
	jarvis.lib.addAttribute(this.loadingBar,"animated loading");
    this.body.appendChild(this.loadingBar);

    var listBox= document.createElement("div");
    this.body.appendChild(listBox);
	this.popList=new jarvis.MiniPopupList(listBox);
   
	this.slideBox=null;
    this.pageControl=null;      
    this.currentPageBox=null;
    


	

}

jarvis.MiniPopupBox.prototype = 
{
    
	init : function()
	{
		
		
		var that=this;
		
		
		jarvis.lib.addEventListener(this.rssBtn,"click",function (e){that.openRSS();})
		jarvis.lib.addEventListener(this.closeBtn,"click",function (e){that.closePopup(true);})
		jarvis.lib.addEventListener(this.header,"click",function (e){
		
																		   if(that.isAcOver==true){
																			   that.activeChange(false);
																		   }else{
																			   that.closePopup();
																		   }  
		
																	})
	    
		if(this.option.isMini==true){
		    if(this.info.isMobile==false){
				jarvis.lib.addEventListener(this.body,"mouseover",function (e){jarvis.debuger.trace("over"); that.activeChange(true);})
				jarvis.lib.addEventListener(this.body,"mouseleave",function (e){jarvis.debuger.trace("out"); that.activeChange(false);})
			}else{
				var gestureDelegate=function(){}; 
				gestureDelegate.prototype = {
		                      gestureComplete: function(e){
								if(jarvis.config.isAnimation==true){
								       return;
								}
								if(e==jarvis.GestureElement.PAN_DOWN){
								    
								   if(that.isAcOver==true){
								       that.activeChange(false);
								   }else{
								       that.closePopup();
								   }   
								   
								}else if(e==jarvis.GestureElement.PAN_UP){
									
								   that.activeChange(true);
								}
							  }
							  
				}
				var gestureElement=new  jarvis.GestureElement( this.header,new gestureDelegate(),true,false);
				
			
			}
			
			
		}
		
		this.popList.init();
		this.creatSlideBox();
		this.creatList();
		
		

    },
	openRSS : function(){
	    
		var path=this.RSS_PAGE_PATH+"?code="+this.rssBtn.programCode;
		window.open(path);
		
	},
	setProgramCode : function(programCode){
	    
		this.programCode=programCode;
		
	},

    activeChange : function(ac)
	{
	    if(jarvis.mini==null){
		     return;
		}
		if(this.isAcOver!=ac){
		    this.isAcOver=ac;
			jarvis.mini.activePopup(ac);
		}
		
	},
	creatSlideBox :function()
	{
		var that=this;
        var delegate=function(){};
            delegate.prototype = {
                              initBox : function(div){
							       that.currentPageBox=div;
								   that.creatPage(div,0);
							  },   
							  moveStart : function(div,dr){
								  jarvis.config.isAnimation=true;
							      that.creatPage(div,dr);  
							  }, 
							  moveChanged : function(div,dr){
							      var idx=that.currentPage+dr;
								  that.setPageIndex(idx);
						          
							  },
							  moveEnd : function(div,dr){
								  jarvis.config.isAnimation=false;
							      that.currentPageBox=div;
								  that.pageBoxComplete();
							  }
		    }
			 
			
        this.slideBox=new jarvis.UISlideBox(this.listBox,new delegate(),null);
	    this.slideBox.init();
		
	},

    creatList :function()
	{
		var that=this;
		
		var delegate=function(){}; 
			delegate.prototype = {
		                      pageChange : function(idx)
                              {
								  if(idx==that.currentPage){
										return;
								  }
								  that.pageChange(idx);
							  }
						 }

			var option=new jarvis.UIPageControlOption();
			option.pageSize=6;
			option.usedNumber=false;
			option.cssKey="pagecontrol-gray";
			this.pageControl=new jarvis.UIPageControl(this.pageNavi,new delegate(),option);
				
	},
	openPopup : function(program,type,isAni,pos){
		
		if(this.isActive===true && type==this.SELECT_SONG && this.type==this.SELECT_SONG){
		    this.closePopup();
			return;
		}
        if(isAni===undefined){
		   
		   isAni=false;
		}
		if(pos===undefined){
		   pos=0;
		}
        this.topPos=pos;
		if(this.isActive==true){
		    isAni=false;
		}
        this.isActive=true;
		this.isAcOver=true;
		this.dataA=new Array();
		
		
		this.program=program;
		this.currentPage=0;
		this.totalPage=-1;
		this.pageNum=0;
		this.type=type;

		this.setTitle();
		this.body.style.display="block";
		this.resize();
        if(isAni==true){
		   this.startAni();
		}else{
		   this.initPage();
		}
		
	}
	,
	
	setTitle : function()
	{
		switch(this.type){
		   case this.SELECT_SONG:
			   this.title.innerHTML="선곡표";
			   break;
		   case this.REPLAY_SONG:
			   this.title.innerHTML="다시듣기";
			   break;
		 
           default:
			   this.title.innerHTML="";
			   break;
		   
		}
	},
	startAni : function()
	{
		 
		 var that=this;
         this.isMoveAble=false;
		 jarvis.animation.stopAnimation(this.aniID);
		 jarvis.config.isAnimation=true;
		 var aniDelegate=function(){};
		 
		 aniDelegate.prototype = {
				complete : function(e)
				{
					that.isMoveAble=true;
					jarvis.config.isAnimation=false;
					that.initPage();
				}
		}
		var easev="ease in";
		jarvis.animation.startAnimation(this.body.style, {id:this.aniID, listener:this.body, duration:0.3, top:this.topPos, ease:easev ,isPx:true},new aniDelegate());


    },
	movePopup : function(pos)
	{
		 
		 if(this.isActive==false){
		    return;
		 }
		 if( this.isMoveAble==false){
			return;
		 }
		 var that=this;

		 jarvis.animation.stopAnimation(this.aniID);
		 jarvis.config.isAnimation=true;
		 var aniDelegate=function(){};
		 aniDelegate.prototype = {
				complete : function(e)
				{
					
					jarvis.config.isAnimation=false;
					
				}
		}
		var easev="ease in";
		jarvis.animation.startAnimation(this.body.style, {id:this.aniID, listener:this.body, duration:0.3, top:pos, ease:easev ,isPx:true},new aniDelegate());


    },
    closePopup : function(isAll){
        
        
        
	    if(this.isActive==false){
		    return;
		}
		if(isAll===undefined){
		    isAll=false;
		}
        if(this.popList.isActive==true){
		    this.setTitle();
			this.popList.closePopup();
			this.rssBtn.style.display="none";
			if(isAll==false){
				return;
			}
		}

		this.isActive=false;
		jarvis.lib.excuteDelegate(this.delegate,"closePopup",[this.type]);
		var that=this;
		var bounce=jarvis.lib.getRelativeBounce(this.body);
		
		var ty=bounce.y+bounce.height;
		jarvis.animation.stopAnimation(this.aniID);
		 jarvis.config.isAnimation=true;
		 var aniDelegate=function(){};
		 aniDelegate.prototype = {
				complete : function(e)
				{
					that.body.style.display="none";
					if(that.currentPageBox!=null){
						that.currentPageBox.innerHTML="";
					}
                    jarvis.config.isAnimation=false;
				}
		}
		var easev="ease in";
		jarvis.animation.startAnimation(this.body.style, {id:this.aniID, listener:this.body, duration:0.3, top:ty, ease:easev ,isPx:true},new aniDelegate());
		
	},

	
	orientationChange : function(){
     
	   this.popList.orientationChange();
	},
    resize : function(h)
	{
	    
		
		if(h!==undefined){
		    this.body.style.height=h+"px";
		}
		
		var bounce=jarvis.lib.getAbsoluteBounce(this.body);
	    if(bounce.width>=10000 || bounce.width<=0){
		    return;
		}
		
		
		var bwid=(bounce.width-2)+"px";
		
        this.header.style.width=bwid;
		this.listBox.style.width=bwid;
		this.bottom.style.width=bwid;

        var bounceT=jarvis.lib.getAbsoluteBounce(this.header);
        var bounceB=jarvis.lib.getAbsoluteBounce(this.bottom);
        if(this.overlay!=null){
			this.overlay.img.width=bounceT.width;
			this.overlay.img.height=bounceT.height;
		}
        var bh=bounce.height-bounceT.height-bounceB.height;
		this.listBox.style.height=Math.floor(bh)+"px";
        this.slideBox.resize();
		this.changeList();
		this.pageBoxResize(this.currentPageBox);
		if(this.popList!=null){
		    if(this.popList.isActive==false){
				this.popList.body.style.top=bounce.height+"px";
			}else{
				this.popList.resize(bounce.height-bounceT.height);
			}
		}
		jarvis.lib.setCenterPosition(this.pageNavi,bounce);
	},
	

    changeList :function()
	{
		
		if(this.dataA==null){
		    return;
		}
		var num=this.getTotalPage();
       
		if(this.totalPage==num){
		     return;
		}
		
		this.totalPage=num;
        if(this.slideBox!=null){
			this.slideBox.limitedIndex=this.totalPage;
		}
		if(this.currentPage>=this.totalPage){
		    this.currentPage=this.totalPage-1;
		}
       
        this.pageControl.reset(this.totalPage); 
        
		if(this.currentPage==-1){
		    this.pageChange(0,false);
		}else{
		    this.pageChange(this.currentPage,false);
		}
		

	},
    pageChange :function(idx,isAni)
	{
        
		if(isAni===undefined){
		    isAni=true;
		}
		
		
		if(this.slideBox!=null){
			if(this.slideBox.isMoveAble==true){
			    return;
			}
		}
		
		if(this.currentPage!=-1 && isAni==true){
			if(idx>this.currentPage){
				 this.currentPage=idx-1;
			     this.slideBox.moveSlide(1);
			}else{
				 this.currentPage=idx+1;
			     this.slideBox.moveSlide(-1);
			}
			this.setPageIndex(idx);
		}else{
		    this.setPageIndex(idx);
		}

		
		
	},
	setPageIndex :function(idx)
	{
        
		this.currentPage=idx;
		if(this.pageControl!=null){
			this.pageControl.setPageIdx(this.currentPage);
		}
		if(this.slideBox!=null){
			this.slideBox.limitedIndex=this.totalPage;
			this.slideBox.currentIndex=this.currentPage;
		}
	},
    pageBoxComplete:function()
	{
        
		if(this.currentPageBox==null){
		     return;
		}
		var cellA=this.currentPageBox.cellA;
		if(cellA==null){
		     return;
		}
		
		var cell;
		var imgBounce;
		
		for(var i=0;i<cellA.length;++i){
			cell=cellA[i];
			if(cell.imgPath!==undefined && cell.img==null){
			    imgBounce=jarvis.lib.getAbsoluteBounce(cell.imgBox);
				
				cell.img=document.createElement("img");
				cell.img.width=imgBounce.width-2;
				cell.img.height=imgBounce.height-2;
				cell.imgBox.appendChild(cell.img);
				cell.img.src=cell.imgPath;
			}
		
		}


	},
	pageBoxResize:function(div)
	{

		if(div==null){
		     return;
		}
		var cellA=div.cellA;
		if(cellA==null){
		     return;
		}
		var bounce=jarvis.lib.getAbsoluteBounce(div);
       
		var w=-1;
		var h=-1;
		
		switch(this.type){
				case this.SELECT_SONG:
					w=bounce.width+"px";
					h=Math.floor(bounce.height/this.lineNumH)+"px";
					break;
				case this.REPLAY_SONG:
                    w=Math.floor(bounce.width/this.lineNumW)+"px";
					h=Math.floor(bounce.height/this.lineNumH)+"px";
					break;
			
				default:
			       
					break;
		   
		}
		var cell;
		for(var i=0;i<cellA.length;++i){
			cell=cellA[i];
			if(h!=-1){
				cell.style.height=h;
		    }
			if(w!=-1){
				cell.style.width=w;
			}

		
		}
	},
    
    initPage : function()
	{
		
		switch(this.type){
		   case this.SELECT_SONG:
			   this.loadSongList();
			   break;
		   case this.REPLAY_SONG:
			   this.loadPodList(); 
			   break;
		   case this.REPLAY_SONG_LIST:
			   
			   break;
           default:
			   
			   break;
		   
		}

    },
    getTotalPage : function()
	{
		var bounce=jarvis.lib.getAbsoluteBounce(this.currentPageBox);
		var cw;
		var ch;
		switch(this.type){
		   case this.SELECT_SONG:
			   cw=bounce.width;
			   ch=this.selectSongPoint.y;
			   break;
		   case this.REPLAY_SONG:
			   cw=this.replaySongPoint.x;
			   ch=this.replaySongPoint.y;
			   break;
		   case this.REPLAY_SONG_LIST:
			   cw=bounce.width;
			   break;
           default:
			   
			   break;
		   
		}
		this.lineNumW = Math.floor(bounce.width/cw);
		this.lineNumH = Math.floor(bounce.height/ch);
        if(this.lineNumW<1){
		   this.lineNumW=1;
		}
		if(this.lineNumH<1){
		   this.lineNumW=1;
		}
		this.pageNum= this.lineNumW*this.lineNumH;
        var num=Math.ceil(this.dataA.length/this.pageNum);
        return num;
    },
    creatPage :function(div,dr)
	{
       
		div.innerHTML="";
		div.cellA=null;
		if(this.dataA==null){
		   return;
		}

		
		var dataNum= this.dataA.length;
       
		if(dataNum<1){
             var infoText=document.createElement("p");
			 jarvis.lib.addAttribute(infoText,"font-small info-text");
			 infoText.innerHTML=this.info.MSG_SONG_NODATA;
             div.appendChild(infoText);

		     return;
		};

		
        var idx=this.currentPage+dr;
		if(idx<0 || idx>=this.totalPage){
            return;
		}
		
        
        var num=this.lineNumW*this.lineNumH;
		
        var si=idx*num;
        var ei=si+num;
		if(ei>dataNum){
		    ei=dataNum;
		}

		var cellA=new Array();
        var cell;
	    var that=this;
		
        var data;
		var css="";
		var select=null;
		for(var i=si;i<ei;++i){
			
            data=this.dataA[i];
				    
			switch(this.type){
				case this.SELECT_SONG:
					cell=document.createElement("div");
                    if(i!=(ei-1)){
						jarvis.lib.addAttribute(cell,"align-left select-song line");
					}else{
					    jarvis.lib.addAttribute(cell,"align-left select-song");
					}
					cell.imgBox=document.createElement("div");
					cell.img=null;
					cell.imgPath=data.albumImageUrl;
                    jarvis.lib.addAttribute(cell.imgBox,"align-left img border");
                    cell.appendChild(cell.imgBox);
                    
					

                    cell.content=document.createElement("div");
                    jarvis.lib.addAttribute(cell.content,"title font-small align-left");
					cell.content.innerHTML="<b>"+data.trackTitle+"</b><br>"+data.artistName;
					cell.appendChild(cell.content);
                    
                    
                    if(data.isLinkAble==true){
					    cell.btn=document.createElement("div"); 
					    jarvis.lib.addAttribute(cell.btn,"align-left btn btn-image btn-aod");
						cell.appendChild(cell.btn);
                        cell.btn.linkPath=data.link;
						jarvis.lib.addEventListener(cell.btn,"click",function (e){ that.openMusic(e);})
					}
					break;
				case this.REPLAY_SONG:
                    cell=document.createElement("button");
				    jarvis.lib.addAttribute(cell,"btn align-left replay-song");
				    
					cell.content=document.createElement("div");
                    jarvis.lib.addAttribute(cell.content,"content");
                    cell.appendChild(cell.content);

					cell.imgBox=document.createElement("div");
					cell.imgBox.disabled=true;
					cell.img=null;
					cell.imgPath=data.itunesImageURL;
                    cell.textBox=document.createElement("div");
					jarvis.lib.addAttribute(cell.textBox,"text-box");
                    cell.textBox.disabled=true;
					jarvis.lib.addAttribute(cell.imgBox,"align-left img border");
					jarvis.lib.addAttribute(cell.textBox,"align-left title font-small");
                    cell.textBox.innerHTML= "<b>"+data.title+"</b><br>"+data.subTitle;
                    
					cell.content.appendChild(cell.imgBox);
					cell.content.appendChild(cell.textBox);

					cell.info=data;
                    jarvis.lib.addEventListener(cell,"click",function (e){ that.openList(e);})
					
                    if(this.programCode==data.broadCastID || this.programCode==data.groupID){
					    select=cell;
						this.programCode="";
					}
					break;
				case this.REPLAY_SONG_LIST:
			        cell=document.createElement("div");
					break;
				default:
			        cell=document.createElement("div");
					break;
		   
			}
			cellA.push(cell);
			div.appendChild(cell);
		}
		div.cellA=cellA;
		
		this.pageBoxResize(div);
        if(select!=null){
		    this.openList(null,select);
		}
	},
	openMusic: function(e)
	{
		var tg=jarvis.lib.getEventTarget(e);
		 
		if(jarvis.miniInfo.isMobile==true){
		    
			
			if(jarvis.miniInfo.isIos==true)
			{ 
			    //alert(jarvis.miniInfo.DAUM_IOS_APP);
				jarvis.lib.executeApp(tg.linkPath,jarvis.miniInfo.DAUM_IOS_APP,null,jarvis.miniInfo.MSG_DAUM_APP_INSTALL); 
			}else if(jarvis.miniInfo.isAndroid==true)
			{
			    jarvis.lib.executeApp(tg.linkPath,jarvis.miniInfo.DAUM_ANDROID_APP,this.bin,jarvis.miniInfo.MSG_DAUM_APP_INSTALL); 
			}else{
			    window.open(tg.linkPath);
			}
		}else{
		    window.open(tg.linkPath);
		}
		
		

	},
	
    openList: function(e,select)
	{
        var tg;
		if(e==null){
		    tg=select;
		}else{
		    tg=jarvis.lib.getEventTarget(e);
		}
		
		var i=tg.info;
		if(i==null){
		   tg=tg.parentNode;
		   i=tg.info;
		}

		var bounce=jarvis.lib.getAbsoluteBounce(this.body);
		var bounceL=jarvis.lib.getAbsoluteBounce(this.listBox);
		var pos=bounceL.y-bounce.y;
		
		this.title.innerHTML=i.title;
		this.popList.openPopup(i,true,pos)
        this.popList.resize(bounce.height-pos);
        this.rssBtn.programCode=i.broadCastID;
		this.rssBtn.style.display="block";
	  
	},
    loadSongList : function ()
	{
		
		if(this.program==null){
		    return;
		}
		if(this.popList.isActive==true){
		   this.popList.closePopup();
		}
		var songs=this.info.getCurrentSongList(this.program.broadCastID,this.program.programGroupID);
		if(songs!=null){
			if(songs.length>0){
			    this.loadSongListComplete("y",this.program.broadCastID,this.program.programGroupID);
				return;
			}
		}
		this.loading(true);
		this.info.loadCurrentSongList("jarvis."+this.reciveKey+".loadSongListComplete",this.program.broadCastID,this.program.programGroupID);
		
	},
    loadSongListComplete:function(yn,bID,gID)
	{
		this.loading(false);
		this.dataA=this.info.getCurrentSongList(bID,gID);
		this.changeList();  
		this.creatPage(this.currentPageBox,0);
        this.pageBoxComplete();
		var bounce=jarvis.lib.getAbsoluteBounce(this.body);
		jarvis.lib.setCenterPosition(this.pageNavi,bounce);
	},
    

	loadPodList : function ()
	{
		
		var pods=this.info.getPodList();
		if(pods!=null){
			if(pods.length>0){
			    this.loadPodListListComplete();
				return;
			}
        }
		
        this.loading(true);
	    this.info.loadPodList("jarvis."+this.reciveKey+".loadPodListListComplete");
		
	},
    loadPodListListComplete : function(yn){
		 this.loading(false);
		 this.dataA=this.info.getPodList();
		
         this.changeList(); 
		 
		 if(this.programCode!=""){
		    
			 var idx=0;
		     for(var i=0;i<this.dataA.length;++i){
			     if( this.dataA[i].broadCastID==this.programCode || this.programCode==this.dataA[i].groupID){
				      idx=i;
					  break;
				 }
			 }

			 idx=Math.floor(idx/this.pageNum);
			 this.pageChange(idx,false);
		 }
		
		 this.creatPage(this.currentPageBox,0);	
		 this.pageBoxComplete();

	},

	loading:function(ac)
	{
       if(ac==true){
		   jarvis.lib.addAttribute( this.loadingBar,"data-loading")
	   }else{
		   jarvis.lib.removeAttribute( this.loadingBar,"data-loading");
	   }
	}


	

    		
	

}



