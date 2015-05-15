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

	document.write("<script type='text/javascript' src='"+jarvis.dirPath+"lib/model/calendarinfo.js'></script>");
	document.write("<link rel='stylesheet' href='"+jarvis.dirPath+"/css/global.css'>");
	document.write("<link rel='stylesheet' href='"+jarvis.dirPath+"/css/base.css'>");
	document.write("<link rel='stylesheet' href='"+jarvis.dirPath+"/css/ui.css'>");
	document.write("<link rel='stylesheet' href='"+jarvis.dirPath+"/css/radio.css'>");

}





jarvis.SelectSongOption=function(){
   
   this.title="선곡표";
   
   this.cssKey="select-song";
   this.reciveKey="radioSelectSong";
   
   this.cssTitleColor="#ffffff";
   this.cssBgColor="#3c68ac";

   this.broadCastID="1000661100000100000";
   this.programGroupID="11";
   this.bdate="";
   this.isFullMode=false;
   this.marginFull=0;

   this.colorA=new Array();
   this.colorA[0]="#ffffff";
   this.colorA[1]="#b2cef4";
   this.colorA[2]="bg-black30";
   this.colorA[3]=false;
}


jarvis.SelectSong= function(pageID,option) 
{
	
	
	this.body;
	if(pageID===undefined){
		this.body=document.body;
	}else{
		if(typeof pageID=="String" || typeof pageID=="string"){
			this.body=document.getElementById(pageID);
		}else{
			this.body=pageID;
		}
	   
	}	
    this.option=option;
    if(this.option===undefined){
	   this.option=new jarvis.SelectSongOption();
	}
	jarvis.lib.addAttribute(this.body,this.option.cssKey+" uicomponent");
    
    this.reciveKey=this.option.reciveKey;
	this.info=jarvis.miniInfo;
	this.calendarInfo=new jarvis.CalendarInfo();
	jarvis[this.reciveKey+jarvis.config.RECIVE_KEY]=this;

	this.scrollID=this.reciveKey+"jarvisRadioSelectSong";
	this.onAirCell=null;
	
    this.currentDate=new jarvis.DayData();
	this.program=null;
    this.listA=new Array();
    this.aodDataA=new Array();


	this.title = document.createElement('h2');
	jarvis.lib.addAttribute(this.title,'radio-title font-big');
	this.title.innerHTML=this.option.title;
	this.body.appendChild(this.title);
	
	
	this.grid= document.createElement('div');
	jarvis.lib.addAttribute(this.grid,'grid bg-white-border');
	
	this.body.appendChild(this.grid);
	
    this.dateBox= document.createElement('div');
	jarvis.lib.addAttribute(this.dateBox,'date-box');
    this.grid.appendChild(this.dateBox);

	this.btnPrev= document.createElement('button');
	this.btnNext= document.createElement('button');
	jarvis.lib.addAttribute(this.btnPrev,'btn-prev');
	jarvis.lib.addAttribute(this.btnNext,'btn-next');

	this.date= document.createElement('span');
	jarvis.lib.addAttribute(this.date,'date font-big');


	this.grid.style.background=this.option.cssBgColor;
    this.date.style.color=this.option.cssTitleColor;

	this.btnPrev.innerHTML="이전";
	this.btnNext.innerHTML="다음";
	this.date.innerHTML="오늘";
	
	this.dateBox.appendChild(this.btnPrev);
    this.dateBox.appendChild(this.btnNext);
    this.dateBox.appendChild(this.date);
	this.dates=null;

	
	this.listBody= document.createElement('div');
	jarvis.lib.addAttribute(this.listBody,'list-body');
	this.listBody.id=this.scrollID;
	
    this.grid.appendChild(this.listBody);

	this.loadingBar= document.createElement("div");
	jarvis.lib.addAttribute(this.loadingBar,"animated loading");
    this.grid.appendChild(this.loadingBar);
   
	this.listScroll=null;
	this.changeColor(this.option.colorA);	
    
}

jarvis.SelectSong.prototype = 
{
    
	init : function()
	{
		var that=this;
		
        var scrollDelegate=function(){}; 
			scrollDelegate.prototype = {
		                    
							  stateChange : function(e)
                              {
								
								 switch(e){
								    case jarvis.UIScrollView.SCROLL_BOTTOM:
									    break;
									case jarvis.UIScrollView.SCROLL_TOP:
									    break;
									default:
									    break;
								 
								 }
							  },
							 
							  addCell : function(cellIdx,cell){},
							  rmoveCell : function(cellIdx,cell){}
							  
			}
		var scrollOption=new jarvis.UIScrollViewOption();
        scrollOption.cssKey="uiscrollview";
		scrollOption.noDataView="<p class='info-text'>"+jarvis.miniInfo.MSG_SONG_NODATA+"</p>" ;
		
	    this.listScroll=new jarvis.UIScrollView(this.scrollID,scrollOption,new scrollDelegate());
		

		jarvis.lib.addEventListener(this.btnPrev,"click",function (e){ that.changeDate(-1);});
        jarvis.lib.addEventListener(this.btnNext,"click",function (e){ that.changeDate(1);});
        this.reset(this.option);
		this.loadSelectSong();
    },
    remove : function()
	{
	},
    reset : function(option)
	{
		
		this.option=option;
        this.title.innerHTML=this.option.title;
		this.grid.style.background=this.option.cssBgColor;
		this.date.style.color=this.option.cssTitleColor;
		this.currentDate=new jarvis.DayData();
		if(this.option.bdate!="" && this.option.bdate.length==8 ){
		    this.currentDate.setDayData(this.option.bdate);
		}else{
		   
		}
		
        this.loadSelectSong();
	},
	
	

    changeDate : function(dr)
	{
	    
		if(dr==-1){
		    this.currentDate=this.calendarInfo.getPrevDay(this.currentDate.yy,this.currentDate.mm,this.currentDate.dd);
		}else if(dr==1){
		    this.currentDate=this.calendarInfo.getNextDay(this.currentDate.yy,this.currentDate.mm,this.currentDate.dd);
		}else{
		
		}
		this.loadSelectSong();
		
	},
	
	loadSelectSong : function()
	{
		this.loading(true);
	    this.info.loadProgramSongList("jarvis."+this.reciveKey+jarvis.config.RECIVE_KEY+".loadSelectSongComplete"
		                              ,this.option.broadCastID
                                      ,this.option.programGroupID
									  ,this.currentDate.ymd);
		
	},
	
    
    loadSelectSongComplete: function(yn,broadCastID,programGroupID,ymd)
	{
		
		var datas = this.info.getProgramSongList(broadCastID,programGroupID,ymd);
        this.dates=datas;
		this.changeList(datas);
	},
    
    changeList: function(datas)
	{
		this.loading(false);
		
		var day= jarvis.lib.getDay(this.currentDate.dayNum);
		this.addCell(datas);

		var toDay=new jarvis.DayData();
		if(toDay.ymd==this.currentDate.ymd){
		    this.date.innerHTML=this.currentDate.ymdStr+".("+day+")"+" 오늘";
		}else{
		    this.date.innerHTML=this.currentDate.ymdStr+".("+day+")";
		}
	},
    
    addCell : function(datas)
    {
		this.listScroll.reset();
		
		var that=this;
			
		var data=null;
		var cell=null;
		
	    this.listA=new Array();
       
        var num=datas.length;
		
		for(var i=0;i<num;++i){
               data=datas[i];
			   cell=document.createElement("div");
				if(i!=(num-1)){
					jarvis.lib.addAttribute(cell,"align-left select-song line");
				}else{
					jarvis.lib.addAttribute(cell,"align-left select-song");
				}
				
				cell.img=document.createElement("img");
				cell.img.src=data.albumImageUrl;
				jarvis.lib.addAttribute(cell.img,"align-left img border");
				cell.appendChild(cell.img);
				
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
			   this.listA.push(cell);
			   this.listScroll.addCell(cell);
		}
        this.listScroll.addComplete();
		
		
	},
    openMusic: function(e)
	{
		var tg=jarvis.lib.getEventTarget(e);
		if(jarvis.miniInfo.isMobile==true){
		    
			
			if(jarvis.miniInfo.isIos==true)
			{ 
			    
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
    changeColor :function(colorA)
	{
	   
		 this.title.style.color=colorA[0];
		
	},
	
	loading:function(ac)
	{
       if(ac==true){
		   jarvis.lib.addAttribute( this.loadingBar,"data-loading")
	   }else{
		   jarvis.lib.removeAttribute( this.loadingBar,"data-loading");
	   }
	},
	
    orientationChange : function(){

		this.listScroll.reset();
	    this.changeList(this.dates);
	},

	resize : function(browserHeight)
	{
	   	if(browserHeight!==undefined){
		   this.body.style.height=browserHeight+"px";
		}
		
		var bounce=jarvis.lib.getAbsoluteBounce(this.body);
	    if(bounce.width>=10000){
		    return;
		}
		
		


        if(this.option.isFullMode==true){
		   
		   var parent = this.body.parentNode;
		   var tx=0;
		   if(parent!=null){
		       tx=jarvis.lib.getAbsoluteBounce(parent).x;
		   }
		   
		   this.grid.style.width=(bounce.width-((jarvis.uiSet.uiStartPosX+tx)*2))+"px";
		   this.grid.style.marginLeft=(jarvis.uiSet.uiStartPosX+tx)+"px";
		   this.title.style.marginLeft=(jarvis.uiSet.uiStartPosX+tx) +"px";
		}else{
		   this.grid.style.width="100%";
		   this.grid.style.marginLeft="0px";
		   this.title.style.marginLeft="0px";
		
		}
        this.title.style.marginTop = this.option.marginFull+"px";
		var bounceG=jarvis.lib.getAbsoluteBounce(this.grid);
		var bounceL=jarvis.lib.getRelativeBounce(this.listBody);
		
		var gridHei=bounce.height-(bounceG.y-bounce.y)-this.option.marginFull;
        jarvis.debuger.trace("bounce: "+bounce.toString);
        this.grid.style.height=gridHei+"px";
        
		var bh=gridHei-bounceL.y;
		
		this.listBody.style.height=bh+"px";
        if(this.listScroll!=null){
			this.listScroll.resize();
		}
	
	}
}



