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





jarvis.ScheduleOption=function(){
   
   this.cssKey="schedule";
   this.reciveKey="radioSchedule";
   
   this.cssTitleColor="#ffffff";
   this.cssBgColor="#3c68ac";
}


jarvis.Schedule= function(pageID,option) 
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
	   this.option=new jarvis.ScheduleOption();
	}
	jarvis.lib.addAttribute(this.body,this.option.cssKey+" uicomponent");
    
	this.scheduleCheckID="jarvis.radio.scheduleCheck";
	this.checkTime=10;
	this.reciveKey=this.option.reciveKey;
	this.info=jarvis.miniInfo;
	this.calendarInfo=new jarvis.CalendarInfo();
	jarvis[this.reciveKey+jarvis.config.RECIVE_KEY]=this;

	this.scrollID=this.reciveKey+"jarvisRadioSchedule";
	this.onAirCell=null;
	this.currentChannel=0;
   
	
    this.currentDate=new jarvis.DayData();
	this.program=null;
    this.listA=new Array();
    this.aodDataA=new Array();


	this.title = document.createElement('h2');
	jarvis.lib.addAttribute(this.title,'radio-title font-big');
	this.title.innerHTML="편성표";
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
	

	this.radioChannel= document.createElement('div');
	jarvis.lib.addAttribute(this.radioChannel,'radio-channel');
    this.grid.appendChild(this.radioChannel);
    
	this.channelBtnA=new Array();
    var num=this.info.CHANNEL_TYPE_VIEW.length;
    for(var i=0;i<num;++i){
	    this.channelBtnA[i]= document.createElement('button');
		if(i!=(num-1)){
		   jarvis.lib.addAttribute(this.channelBtnA[i],'btn font-small mr5');
		}else{
		   jarvis.lib.addAttribute(this.channelBtnA[i],'btn font-small');
		}
		this.channelBtnA[i].innerHTML=this.info.CHANNEL_TYPE_VIEW[i];
		this.radioChannel.appendChild(this.channelBtnA[i]);
	}
    
	this.listBody= document.createElement('div');
	jarvis.lib.addAttribute(this.listBody,'list-body');
	this.listBody.id=this.scrollID;
	
    this.grid.appendChild(this.listBody);

	this.loadingBar= document.createElement("div");
	jarvis.lib.addAttribute(this.loadingBar,"animated loading");
    this.grid.appendChild(this.loadingBar);
   
	this.listScroll=null;
    	
}

jarvis.Schedule.prototype = 
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
		scrollOption.noDataView="<p class='info-text'>편성 정보가 없습니다.</p>" ;
		
	    this.listScroll=new jarvis.UIScrollView(this.scrollID,scrollOption,new scrollDelegate());
		

		jarvis.lib.addEventListener(this.btnPrev,"click",function (e){ that.changeDate(-1);});
        jarvis.lib.addEventListener(this.btnNext,"click",function (e){ that.changeDate(1);});
        
		for(var i=0;i<this.channelBtnA.length;++i){
			jarvis.lib.addEventListener(this.channelBtnA[i],"click",function (e){ that.changeChannel(e);});
	    }
		this.checkSchedule();
        this.scheduleCheckStart();
    },
    remove : function()
	{
	},
    reset : function(option)
	{
		
		this.option=option;
        this.grid.style.background=this.option.cssBgColor;
		this.date.style.color=this.option.cssTitleColor;

	},
	scheduleCheckStart : function(){
		this.scheduleCheckEnd();
		var that=this;
		var tObj=new jarvis.TimerObject();
        tObj.id=this.scheduleCheckID
	    tObj.t=this.checkTime;//sec
	    tObj.repeatCount=0;
	    var timerDelegate=function(){}; 
            timerDelegate.prototype = {
                              excute : function(id){that.scheduleCheck();}
		    }
			
		jarvis.timer.addTimer(new timerDelegate(),tObj);
		
		
	},
	checkSchedule : function(){
		
		
		var ch= this.info.CHANNEL_TYPE_READ[this.currentChannel];
		var day= jarvis.lib.getDay(this.currentDate.dayNum);
		var datas=this.info.getOnAirSchedule(ch,day);
		
		if(datas.length<1){
		    this.loadOnAirSchedule();
		}else{
		    this.loadOnAirVodScheduleComplete();
		}
		
	},
	scheduleCheckEnd : function(){
		
		jarvis.timer.removeTimer(this.scheduleCheckID);
		
	},
    scheduleCheck : function()
	{
        if(this.listA.length==0){
			this.checkSchedule();
			return;
		}
		
		var program=this.info.getCurrentOnAir(this.info.CHANNEL_TYPE_READ[this.currentChannel])
		
		if(program!=null){
		     if(this.program==null){
				 this.program=program;
 			 }else if(program.seq!=this.program.seq){
			     this.program=program;
			 }else{
			     return;
			 }
			 var cell;
			 var data;
             for(var i=0;i<this.listA.length;++i){
			     cell=this.listA[i];
                 data=cell.data;
				 if(data.seq==this.program.seq){
				     if(this.onAirCell!=null){
					    jarvis.lib.removeAttribute(this.onAirCell,"cell-on-air");
					 }
                     this.onAirCell=cell;
                     jarvis.lib.addAttribute(this.onAirCell,"cell-on-air");
					 this.listScroll.scrollToIdx(i,true);
				     break;
				 }
			 }
		     
			 
		}
	},

    changeDate : function(dr)
	{
	    
		if(dr==-1){
		    this.currentDate=this.calendarInfo.getPrevDay(this.currentDate.yy,this.currentDate.mm,this.currentDate.dd);
		}else{
		    this.currentDate=this.calendarInfo.getNextDay(this.currentDate.yy,this.currentDate.mm,this.currentDate.dd);
		}
		this.changeList();
		
	},
	changeChannel : function(e)
	{
	    var tg=jarvis.lib.getEventTarget(e);
		var idx= this.channelBtnA.indexOf(tg);
        if(this.currentChannel==idx){
		    return;
		}
		this.currentChannel=idx;
        this.changeList();
		
	},
	loadOnAirSchedule : function()
	{
		this.loading(true);
		
		//alert("loadOnAirSchedule");
		this.info.loadOnAirSchedule("jarvis."+this.reciveKey+jarvis.config.RECIVE_KEY+".loadOnAirScheduleComplete",this.reciveKey);
	},
	loadOnAirVodSchedule : function()
	{
		//alert("loadOnAirVodSchedule");
		this.info.loadOnAirVodSchedule("jarvis."+this.reciveKey+jarvis.config.RECIVE_KEY+".loadOnAirVodScheduleComplete",this.reciveKey);
	},
    
    loadOnAirScheduleComplete: function(yn)
	{
		//alert("loadOnAirScheduleComplete");
		this.loadOnAirVodSchedule();
	},
    loadOnAirVodScheduleComplete : function(yn)
	{
		//alert("loadOnAirVodScheduleComplete");
		//this.info.loadPodList("jarvis."+this.reciveKey+".loadPodListListComplete");
		this.changeList();
	},
	loadPodListListComplete: function(yn)
	{
		//alert("loadPodListListComplete");
		this.aodDataA=new Array();
		var datas=this.info.getPodList();
		for(var i=0;i<datas.length;++i){
		    this.aodDataA.push(datas[i].groupID);
		}
		this.changeList();
	},
    changeList: function()
	{
		this.loading(false);
		var ch= this.info.CHANNEL_TYPE_READ[this.currentChannel];
		var day= jarvis.lib.getDay(this.currentDate.dayNum);
		var datas=this.info.getOnAirSchedule(ch,day);
        
		for(var i=0;i<this.channelBtnA.length;++i){
			if(i==this.currentChannel){
			    jarvis.lib.addAttribute(this.channelBtnA[i],'on');
			}else{
			    jarvis.lib.removeAttribute(this.channelBtnA[i],'on');
			}
	    }
		this.addCell(datas);

		var toDay=new jarvis.DayData();
		if(toDay.ymd==this.currentDate.ymd){
			this.scheduleCheckStart();
		    this.date.innerHTML=this.currentDate.ymdStr+".("+day+")"+" 오늘";
			this.scheduleCheck();
		}else{
			this.scheduleCheckEnd();
		    this.date.innerHTML=this.currentDate.ymdStr+".("+day+")";
		}
	},
    
    addCell : function(datas)
    {
		this.listScroll.reset();
		this.onAirCell=null;
		var that=this;
		//this.loading(false);
		
		
/////////////////////////////////////////		
		var data=null;
		var cell=null;
		var span=null;
	    var a=null; 
		var btn=null; 
	    this.listA=new Array();
        var idx=0; 
        var aodIdx=0; 

		for(var i=0;i<datas.length;++i){
               data=datas[i];
			   cell=document.createElement("div");
			   jarvis.lib.addAttribute(cell,"cell font-small");

               span=document.createElement("span");
			   jarvis.lib.addAttribute(span,"time align-left text");
			   span.innerHTML=data.startTime.slice(0,2)+":"+data.startTime.slice(2,4);
			   cell.appendChild(span);
               
			   span=document.createElement("span");
			   jarvis.lib.addAttribute(span,"program align-left text text-auto-resize"); 
			   span.innerHTML=data.programTitle;
			   cell.appendChild(span);
			   
			   idx=0;
               a=document.createElement("a");
			   jarvis.lib.addAttribute(a,"btn btn-gohome align-right"); 
			   if(idx==0){
				   jarvis.lib.addAttribute(a,"btn-first"); 
			   }
               cell.appendChild(a);
			   a.href=data.homePageUrl;
               idx++;
               /*
			   aodIdx=this.aodDataA.indexOf(data.programGroupID);
			   if(aodIdx!=-1){
			      data.isAod=true;
			   }else{
			      data.isAod=false;
			   }
			   */
			   if(data.isAod==true){

					btn=document.createElement("button");
					btn.info=data;
					jarvis.lib.addAttribute(btn,"btn btn-image btn-aod align-right"); 
					if(idx==0){
					   jarvis.lib.addAttribute(btn,"btn-first"); 
					}
					cell.appendChild(btn);
					jarvis.lib.addEventListener(btn,"click",function (e){ that.aodClick(e);})
					idx++;
               
			   }

               if(this.info.isVodOnAir(data)==true){
					btn=document.createElement("button");
					btn.info=data;
					jarvis.lib.addAttribute(btn,"btn-vod btn btn-image  align-right"); 
					if(idx==0){
					   jarvis.lib.addAttribute(btn,"btn-first"); 
					}
					jarvis.lib.addEventListener(btn,"click",function (e){ that.vodClick(e);})
					cell.appendChild(btn);
					idx++;
               }
               
			   
               this.listScroll.addCell(cell);
               
			   cell.data=data;
			   this.listA.push(cell);
			   
		}
        this.listScroll.addComplete();
		
		
	},
    vodClick :function(e)
	{
	    var tg=jarvis.lib.getEventTarget(e);
		var data=tg.info;
		var program=this.info.getCurrentOnAir(this.info.CHANNEL_TYPE_READ[this.currentChannel]);
		if(program.seq==data.seq){
			if(jarvis.mini===undefined || jarvis.mini==null){
				alert("vod : "+data.programTitle);
			}else{
				jarvis.mini.openVod(data,this.currentChannel);
				top.location.href="#"+jarvis.config.MINI_ID;
			}
		}else{
			alert(this.info.MSG_NO_VOD_TIME);
			
		}
       
		
	},
	aodClick :function(e)
	{
		var tg=jarvis.lib.getEventTarget(e);
		var data=tg.info;
		
		if(jarvis.mini===undefined || jarvis.mini==null){
			alert("aod : "+data.programTitle);
		}else{
			
			jarvis.mini.openAod(data.programGroupID);
			top.location.href="#"+jarvis.config.MINI_ID;
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
	    this.changeList();
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
		var bounceG=jarvis.lib.getRelativeBounce(this.grid);
		var bounceL=jarvis.lib.getRelativeBounce(this.listBody);
		

      
		var gridHei=bounce.height-bounceG.y;
        this.grid.style.height=gridHei+"px";
        
		var bh=gridHei-bounceL.y;
		
		this.listBody.style.height=bh+"px";
        if(this.listScroll!=null){
			this.listScroll.resize();
		}
	
	}
}



