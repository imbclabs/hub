/**
 * miniInfo v1.0: PlayInfo
 * by aeddang
 */
/*
interfaces


*/

if(typeof jarvis == "undefined") var jarvis = new Object();
if(typeof jarvis.miniInfo == "undefined") jarvis.miniInfo = new Object();





jarvis.miniInfo.PlayInfo= function() 
{
	this.info=jarvis.jarvisInfo;
	this.onAirPlayAPI ="http://miniplay.imbc.com/WebLiveURL.ashx";
	this.onAirPlayAPIForPC ="http://miniplay.imbc.com/HLSLive.ashx"; 
	
	this.onAirScheduleAPI ="http://miniunit.imbc.com/Schedule";
    this.onAirVodScheduleAPI ="http://miniunit.imbc.com/schedule/BoraSchedule";

	this.onAirVodScheduleCurrentAPI ="http://miniunit.imbc.com/schedule/BoraRecentInfo";
	this.onAirVodScheduleWeekAPI ="http://miniunit.imbc.com/schedule/BorascheduleWeekList";
	this.onAirVodScheduleTableAPI ="http://miniunit.imbc.com/schedule/BorascheduleTable";
   
	this.programListAPI="http://miniunit.imbc.com/list/programList";
	this.programDataAPI="http://mini.imbc.com/v2/js/jarvis.IronMan.menulist.js";
	this.noticeAPI="http://miniunit.imbc.com/Notice";//rtype=jsonp&callback=notice
   
    this.programKey="MenuList";
	this.programTime=null;
	this.programA=null; //Array<ProgramObject>
	this.programA=null; //Array<ProgramObject>
	this.programDataA=this.info.getIronMans(this.programKey);
	
	this.programSel="";
	this.programChannel="";
	
	this.vodA=null;  //Array<String(BroadCastID)>
	this.vodTimeA=null;  //Array<String(time)>
    this.boraWeekA; //Array<BoraWeekObject>
	this.boraProgramA;  //Dictionary <Array<BoraProgramObject>?
    this.currentBoraProgram=null; //BoraProgramObject

	this.noticeObject=null;//NoticeObject
	this.programListA=null;//Dictionary<Array<ProgramObject>>
	this.resetInfo();

}
jarvis.miniInfo.NoticeObject= function() 
{
	this.noticeSeq="";
	this.startDate="";
	this.startTime="";
	this.endDate="";
	this.endTime="";
	this.notice="";
	this.noticeURL="";
	this.isAc=true;
}
jarvis.miniInfo.NoticeObject.prototype =
{
    setData:function(data)
	{
		
		this.noticeSeq=data.NoticeSeq;
	    this.startDate=data.startDate;
		this.startTime=data.startTime;
		
		this.endDate=data.EndDate;
		this.endTime=data.EndTime;
		this.notice=data.Notice;
		this.noticeURL=data.NoticeURL;

		
	}

}
jarvis.miniInfo.ProgramObject= function() 
{
      this.channel="";
      this.broadDate="";
      this.startTime="";
      this.endTime="";
      this.programTitle="";
      this.homePageUrl="";
      this.broadCastID="";
      this.liveDays="";
      this.DJ="";
      this.picture="";
      this.runningTime="";
      this.programGroupID="";
      this.podCastURL="";
      this.thumbnailPicture="";
      this.seq="";


	  this.boraStartTime="0";
      this.boraEndTime="0";
	  
	  this.isVod=null;
	  this.isAod=true;
}

jarvis.miniInfo.ProgramObject.prototype =
{
    setData:function(data)
	{
		this.channel=data.Channel;
        this.broadDate=data.BroadDate;
        this.startTime=data.StartTime;
        this.endTime=data.EndTime;
        this.programTitle=data.ProgramTitle;
        this.homePageUrl=data.HomePageUrl;
        this.broadCastID=data.BroadCastID;
        this.liveDays=data.LiveDays;
        this.DJ=data.DJ;
        
        
		var hdImg=data.HDPicture;
		if(hdImg!=null && hdImg!="" && hdImg!=undefined){
		    this.picture= hdImg;
		}else{
		    this.picture=data.Picture;
		}
		//alert(this.picture);
		
		this.runningTime=data.RunningTime;
        this.programGroupID=data.ProgramGroupID;
        this.podCastURL=data.PodCastURL;
        this.thumbnailPicture=data.ThumbnailPicture;
        this.seq=this.broadCastID+this.liveDays;
   
		this.progress=0;
		if(this.podCastURL!=""){
		    this.isAod=true;
		}else{
		    this.isAod=false;
		}
		//jarvis.debuger.log(this.channel+" "+this.programTitle);
		//jarvis.debuger.log(this.startTime);
	}
    
}
jarvis.miniInfo.BoraProgramObject= function() 
{
     
	  this.scheduleSeq="";
      this.weekSeq="";
      this.date="";
      this.weekDay="";
      this.channel="";
      this.broadCastID="";
      this.programTitle="";

      this.startTime=0;
      this.endTime=0;
      this.picture="";
      this.guest="";
     
}

jarvis.miniInfo.BoraProgramObject.prototype =
{
    setData:function(data)
	{
		this.scheduleSeq=data.ScheduleSeq;
		this.weekSeq=data.WeekSeq;
		this.date=data.Date;
		this.weekDay=data.WeekDay;
		this.channel=data.Channel;
		this.broadCastID=data.BroadCastID;
		this.programTitle=data.ProgramTitle;

		this.startTime=data.StartTime;
		this.endTime=data.EndTime;
		this.picture=data.Picture;
		this.guest=data.Guest;
    
	}

}
jarvis.miniInfo.BoraWeekObject= function() 
{
   
	  this.startYear="";
      this.weekSeq="";
      this.startMonth="";
      this.startDate="";
      this.endYear="";
      this.endMonth="";
      this.endDate="";
      this.weekCnt="";
    
     
}

jarvis.miniInfo.BoraWeekObject.prototype =
{
    setData:function(data)
	{
		this.startYear=data.StartYear;
		this.weekSeq=data.WeekSeq;
		this.startMonth=data.StartMonth;
        this.startDate=data.StartDate;
		this.endYear=data.EndYear;
		this.endMonth=data.EndMonth;
		this.endDate=data.EndDate;
		this.weekCnt=data.WeekCnt;
    
	}

}


jarvis.miniInfo.PlayInfo.prototype =
{

	resetInfo:function()
	{
		 this.programA=new Array();
	     this.vodA=new Array();
		 this.liveDayA=new Array();
		 this.programListA=new Dictionary();
		 this.boraWeekA=new Array();
	     this.boraProgramA=new Dictionary();
         this.currentBoraProgram=null
	
	},
	
	isVodOnAir: function (program)
    {
        if(program.isVod==null){
		    var idx=this.vodA.indexOf(program.seq);
            //jarvis.debuger.log("id: "+program.seq +" idx :"+idx);
		   
		    if(idx==-1){
			    program.isVod=false;
		        
		    }else{
			    program.isVod=true;
				//jarvis.debuger.log("vodTime : "+this.vodTimeA[idx]);
				var param= jarvis.lib.getUrlParam("qurry?"+this.vodTimeA[idx]);

				
                program.boraStartTime=Number(param.param.stime);
				program.boraEndTime=Number(param.param.etime);
                
				//jarvis.debuger.log("logTime : "+ program.boraStartTime+" : "+program.boraEndTime);
                
				if(program.boraEndTime<program.boraStartTime){
				   program.boraEndTime=program.boraEndTime+2400;
				}
		    }
		}
        return program.isVod;
	},
    getCurrentOnAir : function (channel)
    {
        var d = new Date();
        
		var date=d.getDate();
		if(this.programTime!=date){
		   return null;
		}
		
		var tt=d.getHours();
        var mm=d.getMinutes();
		var day=jarvis.lib.getDay(Number(d.getDay()));
        var mt=(Number(tt)*60)+Number(mm);
			
		var program=null;
		var preProgram=null;

		var crT=0;
	    var prT=0;
		var prepmt=0;
        for(var i=0;i<this.programA.length;++i){
		      program=this.programA[i];
             
			  if(program.channel==channel && program.liveDays==day){
			      
				   crT=Number(program.startTime);
                   if(prT>crT){
						jarvis.debuger.log(crT+" "+prT+" "+program.programTitle);  
						crT=crT+2400;
						program.startTime=String(crT);
				   }
				   var pt=program.startTime.substring(0,2);
				   var pm=program.startTime.substring(2,4);
                   var pmt=(Number(pt)*60)+Number(pm);
				   prT=crT;
                   if(preProgram!=null){
						preProgram.progress=Number((mt-prepmt)/(pmt-prepmt));
				   }else{
				        program.progress=Number(mt/pmt);
				   }
				   if(mt<pmt){
                      return preProgram;
				   }
                   prepmt=pmt;
                   preProgram=program;
			  }
			  
		}
		return preProgram;
	},

    getOnAirSchedule : function (channel,day)
    {
        if ( day === undefined ) {
            day="all";
        }
		
		var returnA=new Array();
        var program=null;
		for(var i=0;i<this.programA.length;++i){
		      program=this.programA[i];
			  if(program.channel==channel){
			       if(day=="all"){
					   this.isVodOnAir(program);
					   returnA.push(program);
				   }else if(program.liveDays==day){
					   this.isVodOnAir(program);
				       returnA.push(program);
				   }
			  }
		}
        return returnA;
	},
	getOnAirVodSchedule : function (channel,day)
    {
        if ( day === undefined ) {
            day="all";
        }
		
		var returnA=new Array();
        var program=null;
		for(var i=0;i<this.programA.length;++i){
		      program=this.programA[i];
			  if(program.channel==channel){
			       if(day=="all"){
					   if(this.isVodOnAir(program)==true){
					       returnA.push(program);
					   };
					   
					   
				   }else if(program.liveDays==day){
					   if(this.isVodOnAir(program)==true){
				           returnA.push(program);
					   };
				   }
			  }
		}
        return returnA;
	},
////////////////////////////////////////////////////////////////////////program    
    loadProgram : function (sel,channel)
    {
        
		/*
		if(this.programDataA==null || this.programDataA.length<1){
			
			this.loadProgramData(sel,"",channel);
			return;
		}*/
		var selectList=this.programListA.getValue(channel);
		if(selectList==null){
		    selectList=new Array();
			this.programListA.setValue(channel,selectList);
		}

		var param=new Object();
		var that=this;
		param.channel=channel;
		param.rtype="jsonp";
		
        jarvis.miniInfo.loadProgramComplete= function(data){
			 if(data=="N"){
			     eval(sel+"('N','"+channel+"');");
				 return;
			 }
			 
			 var program=null;
			 var img;
             for(var i=0;i<data.length;++i){
		         program=new jarvis.miniInfo.ProgramObject();
				 program.setData(data[i]);
			     /*
				 img=that.getProgramImg(program.broadCastID);
				 if(img!=""){
				     program.picture=img;
				 }*/
				 selectList.push(program);
			 }
             eval(sel+"('Y','"+channel+"')");
			 if( jarvis.miniInfo.loadProgramComplete==this){
				jarvis.miniInfo.loadProgramComplete=null;
			 }
            
		}
        
        var ajax=new jarvis.Ajax();
        ajax.request(this.programListAPI,param,"jarvis.miniInfo.loadProgramComplete","POST","jsonp") 

		
	},
	getProgramImg:function(broadCastID)
	{
		var pro;
		for(var i=0;i<this.programDataA.length;++i){
			pro=this.programDataA[i];
			//
			if(pro.seq==broadCastID){
			     return pro.subImgPath;
			}
			
		}
		return "";
	},
	
    loadProgramData:function(sel,id,channel)
	{
       
		this.programSel=sel;
		this.programId=id;
	    this.programChannel=channel;     
		var that=this;
		if(this.programDataA==null || this.programDataA.length<1){
			
			jarvis.miniInfo.loadProgramDataComplete= function(yn)
			{
				that.programDataA=that.info.getIronMans(that.programKey);
				if(that.programSel!="")
				{
					if(that.programChannel!="")
					{
						that.loadProgram(that.programSel,that.programChannel);
					}else if(that.programId!=""){
						that.loadOnAirSchedule(that.programSel,that.programId);
					}
					that.programSel="";
					that.programId="";
					that.programChannel="";   
				}
			},
			this.info.loadIronMans(this.programDataAPI,"jarvis.miniInfo.loadProgramDataComplete",this.programKey);
		}
	},

    
	dataComplete :function(yn)
	{
	   	var datas=this.info.getIronMans(this.reciveKey);
		this.loading(false);
		this.minfo.CHANNEL_TYPE_READ
		for(var i=0;i<this.minfo.CHANNEL_TYPE_READ.length;++i){
		    this.dataA[i]={title:this.minfo.CHANNEL_TYPE_VIEW[i],listA:new Array()};
	    }
		var data;
		var idx;
		for(var i=0;i<datas.length;++i){
		   data=datas[i];
		   
		   idx=this.minfo.CHANNEL_TYPE_READ.indexOf(data.group);
		   if(idx!=-1){
		        this.dataA[idx].listA.push(data);
		   }
	    }
			
		this.setMenu();
		

	},	
    getProgramList : function (channel)
    {
       var returnA=this.programListA.getValue(channel);
	   if(returnA==null){
	      returnA=new Array();
	   }
	   return returnA;
	},

////////////////////////////////////////////////////////////////////////radio
	loadOnAir : function (channel,sel)
    {
        
		
		var param=new Object();
		var that=this;
		param.channel=channel;
	    var apiPath=this.onAirPlayAPI;
		if(jarvis.miniInfo.isHtmlPlayer==false){
		      if(jarvis.config.isTestMode==false){
					param.agent="";
					param.protocol="RTMP";
			  }else{
					param.type="web";
					apiPath=this.onAirPlayAPIForPC;
			  }

          
			   
			  //param.protocol="M3U8";
			  //param.agent="android";
		}else{
			
			if(jarvis.miniInfo.isAndroid==true){
				
			    param.protocol="M3U8";
			    param.agent="android";
				param.androidversion=jarvis.miniInfo.androidSdkVS;
				
			
			}else{
			    param.protocol="M3U8";
				param.agent="ios";
			}
			
		}
	    param.nocash=Math.random();
        jarvis.miniInfo.loadOnAirComplete= function(data){
			    
            if(data=="N"){
			     eval(sel+"('N');");
				 return;
			}
			//alert(data.AACLiveURL);
		   
			eval(sel+"('"+data.AACLiveURL+"');");	
			if(jarvis.miniInfo.loadOnAirComplete==this){
			   jarvis.miniInfo.loadOnAirComplete=null;
			}
		}
        
		var ajax=new jarvis.Ajax();
        ajax.request(apiPath,param,"jarvis.miniInfo.loadOnAirComplete","POST","jsonp") 
		
	},

    loadOnAirSchedule : function (sel,id)
    {
        
		if(this.programDataA==null || this.programDataA.length<1){
			
		       // this.loadProgramData(sel,id,"");
				//return;
			
			
		}
		
		
		var param=new Object();
		var that=this;
		param.rtype="jsonp";
		if(id === undefined){
		   id="";
		}else{
		   
		}
        if(jarvis.miniInfo["loadOnAirScheduleComplete"+id]!=null){
		    return;
		}
        jarvis.debuger.log(sel+id);
        jarvis.miniInfo["loadOnAirScheduleComplete"+id]= function(data){
			    
			
			 if(data=="N"){
			     eval(sel+"('N');");
				 return;
			 }
			 var program=null;
			 var img;
			 that.programA=new Array();
             for(var i=0;i<data.Programs.length;++i){
		         program=new jarvis.miniInfo.ProgramObject();
				 program.setData(data.Programs[i]);
				 //img=that.getProgramImg(program.broadCastID);
				 /*
				 if(img!=""){
				     program.picture=img;
				 }*/
				 that.programA.push(program);
				 
			 }
			 
             eval(sel+"('Y')");	
			 if(jarvis.miniInfo["loadOnAirScheduleComplete"+id]==this){
				jarvis.miniInfo["loadOnAirScheduleComplete"+id]=null;
			 }
             var d = new Date();
			 that.programTime=d.getDate();
		}
		
		
    
        var ajax=new jarvis.Ajax();
		var recive="jarvis.miniInfo.loadOnAirScheduleComplete"+id;
		
        ajax.request(this.onAirScheduleAPI,param, recive,"POST","jsonp") 

	},
/////////////////////////////////////////////////////////////vod radio    

    loadOnAirVod : function (sel)
    {
        
		var param=new Object();
		var that=this;
		param.playtype="boraplay";
		
		if(jarvis.miniInfo.isMobile==true){
           
			/*
			if(jarvis.miniInfo.isPhone==true){
				 param.rate="500";
			    
			}else{
			     param.rate="1000";
				 param.protocol="M3U8";
			}*/
			param.rate="1000";
		    param.protocol="M3U8";
		}else{
		    param.rate="1000";
		}
		
		
       
        jarvis.miniInfo.loadOnAirVodComplete= function(data){
			    
              if(data=="N"){
			     eval(sel+"('N');");
				 return;
			  }
			 // alert(data.BoraURL);
              eval(sel+"('"+data.BoraURL+"');");	
			  if( jarvis.miniInfo.loadOnAirVodComplete==this){
				jarvis.miniInfo.loadOnAirVodComplete=null;	
			  }
		}
        
        var ajax=new jarvis.Ajax();
        ajax.request(this.onAirPlayAPI,param, "jarvis.miniInfo.loadOnAirVodComplete","POST","jsonp") 

		
	},

    loadOnAirVodSchedule : function (sel,id)
    {
        
		
		
		var param=new Object();
		var that=this;
		param.rtype="jsonp";
		if(id === undefined){
		   id="";
		}
		
        jarvis.miniInfo["loadOnAirVodScheduleComplete"+id]= function(data){
			    
             if(data=="N"){
			     eval(sel+"('N');");
				 return;
			 }
			 that.vodTimeA=new Array();
			 that.vodA=new Array();
			 var program=null;
             for(var i=0;i<data.boraPrograms.length;++i){
		         program=data.boraPrograms[i];
			     that.vodA.push(program.BroadCastID+program.RunDay);
                  
	             that.vodTimeA.push("stime="+program.StartTime+"&etime="+program.EndTime);

				 //jarvis.debuger.log("id: "+program.BroadCastID+program.RunDay);
				 //jarvis.debuger.log("stime="+program.StartTime+"&etime="+program.EndTime);
			 }
             eval(sel+"('Y')");	 
			 if(jarvis.miniInfo["loadOnAirVodScheduleComplete"+id]==this){
				jarvis.miniInfo["loadOnAirVodScheduleComplete"+id]=null;
			 }			  
		}
        var ajax=new jarvis.Ajax();
        
		ajax.request(this.onAirVodScheduleAPI,param, "jarvis.miniInfo.loadOnAirVodScheduleComplete"+id,"POST","jsonp") 


	},
	loadOnAirVodCurrentSchedule : function (sel)
    {
      
		var param=new Object();
		var that=this;
		param.rtype="jsonp";
		
        jarvis.miniInfo.loadOnAirVodCurrentScheduleComplete= function(data){
			    
             if(data=="N"){
			     eval(sel+"('N');");
				 return;
			 }
			 that.currentBoraProgram=new jarvis.miniInfo.BoraProgramObject();
			 that.currentBoraProgram.setData(data);
             eval(sel+"('Y')");	 
			 if(jarvis.miniInfo.loadOnAirVodCurrentScheduleComplete==this){
				jarvis.miniInfo.loadOnAirVodCurrentScheduleComplete=null;
			 }
							  
		}
        var ajax=new jarvis.Ajax();
        ajax.request(this.onAirVodScheduleCurrentAPI,param, "jarvis.miniInfo.loadOnAirVodCurrentScheduleComplete","POST","jsonp") 


	},
	loadOnAirVodWeekSchedule : function (sel)
    {
        this.boraWeekA=new Array();
		var param=new Object();
		var that=this;
		param.rtype="jsonp";
		
        jarvis.miniInfo.loadOnAirVodWeekScheduleComplete= function(data){
			    
             if(data=="N"){
			     eval(sel+"('N');");
				 return;
			 }
			 
			 var program=null;
             for(var i=0;i<data.length;++i){
		         program=new jarvis.miniInfo.BoraWeekObject();
			     program.setData(data[i]);
				 that.boraWeekA.push(program);
			 }
             eval(sel+"('Y')");	 
			 if(jarvis.miniInfo.loadOnAirVodCurrentScheduleComplete==this){
				jarvis.miniInfo.loadOnAirVodCurrentScheduleComplete=null;
			 }
							  
		}
        var ajax=new jarvis.Ajax();
        ajax.request(this.onAirVodScheduleWeekAPI,param, "jarvis.miniInfo.loadOnAirVodWeekScheduleComplete","POST","jsonp") 


	},
	loadOnAirVodProgramSchedule : function (sel,wseq)
    {
       
		var param=new Object();
		var that=this;
		param.rtype="jsonp";
		param.wseq=wseq;
		 
        jarvis.miniInfo["loadOnAirVodProgramScheduleComplete"+wseq]= function(data){
			    
            
			 if(data=="N"){
			     eval(sel+"('N');");
				 return;
			 }

			 var arr=that.boraProgramA.getValue(wseq);
             if(arr==null){
			    arr=new Array();
				that.boraProgramA.setValue(wseq,arr);
			 }
             var program=null;
             for(var i=0;i<data.length;++i){
		         program=new jarvis.miniInfo.BoraProgramObject();
			     program.setData(data[i]);
				 arr.push(program);
			 }
			 
             eval(sel+"('Y','"+wseq+"')");	 
			 if(jarvis.miniInfo["loadOnAirVodProgramScheduleComplete"+wseq]==this){
				jarvis.miniInfo["loadOnAirVodProgramScheduleComplete"+wseq]=null;
			 }
							  
		}
        var ajax=new jarvis.Ajax();
        ajax.request(this.onAirVodScheduleTableAPI,param, "jarvis.miniInfo.loadOnAirVodProgramScheduleComplete"+wseq,"POST","jsonp") 

       
	},
    getCurrentBoraProgram : function ()
    {
       return this.currentBoraProgram;
	},
	getBoraWeekList : function ()
    {
       var returnA=this.boraWeekA;
	   if(returnA==null){
	      returnA=new Array();
	   }
	   return returnA;
	},
    getBoraProgramList : function (wseq)
    {
       var returnA=this.boraProgramA.getValue(wseq);
	   if(returnA==null){
	      returnA=new Array();
	   }
	   return returnA;
	},

	loadNotice : function ()
    {
        

		var param=new Object();
		var that=this;
		param.rtype="jsonp";
		
        jarvis.miniInfo.loadNoticeComplete= function(data){
			
			var notice=new jarvis.miniInfo.NoticeObject();
			notice.setData(data);
			if(that.noticeObject!=null){
			   if(that.noticeObject.notice!=notice.notice){
			      that.noticeObject=notice;
			   }
			}else{
			   that.noticeObject=notice;
			}
			if(that.noticeObject.notice==null){
			   that.noticeObject=null;
			}
			if(jarvis.miniInfo.loadNoticeComplete==this){
			   jarvis.miniInfo.loadNoticeComplete=null;
		    }
		}
        
        var ajax=new jarvis.Ajax();
        ajax.request(this.noticeAPI,param,"jarvis.miniInfo.loadNoticeComplete","POST","jsonp") 

		
	},
	setNotice : function (ac)
    {
		if(this.noticeObject==null){
		    return null;
		}
        this.noticeObject.isAc=ac;
	},
	getNotice : function ()
    {
        //jarvis.debuger.trace("serchnotice");
		if(this.noticeObject==null){
		    return null;
		}
		//jarvis.debuger.trace("serchnotice null");
        if(this.noticeObject.isAc==false){
		    return null;
		}
		//jarvis.debuger.trace("serchnotice isAc");

		this.startDate=this.noticeObject.startDate;
		this.startTime=this.noticeObject.startTime;
		this.endDate=this.noticeObject.endDate;
		this.endTime=this.noticeObject.endTime;
        
	    var sn=Number(String(jarvis.lib.textToNumber(this.startDate,"-",2))+String(jarvis.lib.textToNumber(this.startTime,":",2)));
        var en=Number(String(jarvis.lib.textToNumber(this.endDate,"-",2))+String(jarvis.lib.textToNumber(this.endTime,":",2)));
        
        var d = new Date();
        var yy= String(d.getFullYear());
		var mt=jarvis.lib.intToText((Number(d.getMonth())+1),2);
        var dd=jarvis.lib.intToText(d.getDate(),2);
		var tt=jarvis.lib.intToText(d.getHours(),2);
        var mm=jarvis.lib.intToText(d.getMinutes(),2);
		
		var cn=Number(yy+mt+dd+tt+mm);
        
		jarvis.debuger.log(dd+" - "+tt+" - "+mm);
		jarvis.debuger.log(sn+" - "+cn+" - "+en);
		if(cn>=sn && cn<=en){
			
		     return this.noticeObject;
		}else{
		     return null;
		}

	}
}







/*

*/