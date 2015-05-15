/**
 * miniInfo v1.0: MiniInfo (InterFace class)
 * by aeddang
 */



if(typeof jarvis == "undefined") var jarvis = new Object();

if(jarvis.dirPath===undefined){
	jarvis.dirPath="./";
	if(window.location.href.indexOf("http")==-1 || window.location.href.indexOf("imbctc")!=-1){
		jarvis.dirPath="./";
	}else{
    }
}

//document.write("<script type='text/javascript' src='"+jarvis.dirPath+"info/radio/miniInfo.UserInfo.js'></script>"); 


jarvis.IronMan= function() 
{
    this.seq="";
	this.group="";
    this.title="title";
    this.text="text";
	this.date="date";
    this.imgPath="imgPath";
	this.subImgPath="subImgPath";
    this.vodPath="vodPath";
    this.imgCash=null;
	this.subImgCash=null;
	this.link="";
    this.target="_top";
    this.iFramePath="";
	this.display="1";
    
	this.isLink=false;
	this.program="";
    this.performer=null;
    this.isNCast=false;

}

jarvis.IronMan.prototype =
{
    
	setData:function(data)
	{
	    
		this.seq=getData(data.seq);
		this.group=getData(data.group);
		this.title=getData(data.title);
		this.text=getData(data.text);
		this.date=getData(data.date);
		this.imgPath=getData(data.imgPath);
		this.subImgPath=getData(data.subImgPath);
		this.vodPath=getData(data.vodPath);
        this.display=getData(data.display);
		this.link=getData(data.link);
		this.target=getData(data.target);
		this.program=getData(data.program);
        this.performer=getDatas(data.performer);
        this.iFramePath=getDatas(data.iFramePath);
        
        if(this.target=="_app" && this.link!=""){
		   this.isLink=false;
		}else if(this.iFramePath=="" && this.imgPath=="" && this.vodPath==""){
		   this.isLink=true;
		}else{
		   this.isLink=false;
		}

		var that=this;
		function getData(value){
		   
		   if(value===undefined||value==null){
		        return "";   
		   }
		   return value;
		   
		}
	    function getDatas(value){
		   
		   if(value===undefined||value==null){
		        return new Array();   
		   }
		   return value;
		   
		}
		
	},
    setYoutubeData:function(item)
	{
	    //alert('제목 = '+item.snippet.title+', 이미지 = '+item.snippet.thumbnails.high.url+', 동영상 = '+item.id.videoId);
		if(item.id==null||item.id==undefined ){
		    return;
		}
		if(item.snippet==null||item.snippet==undefined ){
		    return;
		}
		
		this.seq=getData(item.id.videoId);
		this.group=getData(item.snippet.channelId);
		this.title=getData(item.snippet.title);
		this.text=getData(item.snippet.description);
		this.date=getData(item.snippet.publishedAt);
        if(this.date.length>10){
		    this.date=this.date.slice(0,10);
		}
		this.imgPath="";
        if(item.snippet.thumbnails!=null&&item.snippet.thumbnails!=undefined ){
		   this.subImgPath=getData(item.snippet.thumbnails.medium.url);
		} 
		
		this.vodPath="";
        this.display="";
		this.link="";
		this.target="_app";
		this.program="";
        this.performer="";
        this.iFramePath="http://www.youtube.com/embed/"+this.seq;
        
        if(this.target=="_app" && this.link!=""){
		   this.isLink=false;
		}else if(this.iFramePath=="" && this.imgPath=="" && this.vodPath==""){
		   this.isLink=true;
		}else{
		   this.isLink=false;
		}

		var that=this;
		function getData(value){
		   
		   if(value===undefined||value==null){
		        return "";   
		   }
		   return value;
		   
		}
	    
		
	},
     
	setNCastData:function(item)
	{
	    
		if(item.videoId==null||item.videoId==undefined ){
		    return;
		}
		
		
		this.seq=getData(item.videoId);
		this.group=getData(item.channelId);
		this.title=getData(item.title);
		this.text=getData(item.description);
		this.date=getData(item.produceDate);

      
        if(this.date.length>8){
		    this.date=this.date.slice(0,8);
			
			this.date=jarvis.lib.getDateByCode(this.date);

			
		}
		this.imgPath="";
       
		this.subImgPath=getData(item.extraData.thumbUrl);
		this.isNCast=true;
		
		this.vodPath="";
        this.display="";
		this.link="";
		this.target="_app";
		this.program="";
        this.performer="";
        this.iFramePath="http://serviceapi.rmcnmv.naver.com/flash/outKeyPlayer.nhn?vid="+this.seq;
        
        if(this.target=="_app" && this.link!=""){
		   this.isLink=false;
		}else if(this.iFramePath=="" && this.imgPath=="" && this.vodPath==""){
		   this.isLink=true;
		}else{
		   this.isLink=false;
		}

		var that=this;
		function getData(value){
		   
		   if(value===undefined||value==null){
		        return "";   
		   }
		   return value;
		   
		}
	    
		
		
	}

}


jarvis.JarvisInfo= function() 
{
    this.ironManDic=new Dictionary();

	this.isHtmlPlayer=undefined;
	this.isMobile=undefined;
	this.isIos=undefined;
	this.isMac=undefined;
	this.isPhone=undefined;
	this.isAndroid=undefined;
	this.androidVS="";
	this.androidSdkVS=0;
    this.ieVS=undefined;
	this.isInit=false;
    this.ncastVideoInfoAPI="http://api.tvcast.naver.com/api/open/share/clip/json";
	//http://api.tvcast.naver.com/api/open/share/clip/json?videoId=921500FBAD0FCE80F743DCA8393176CBD6AE
}





jarvis.JarvisInfo.prototype = 
{
    init:function()
	{
		 if(this.isInit==true){
		    return;
		 }
		 this.ieVS=jarvis.lib.getIEVersion();
		 this.isInit=true;
		 this.isMobile=jarvis.lib.isMobile();
		 
		 if(this.isMobile==true){
           
		    this.isPhone=jarvis.lib.isPhone();
            this.isAndroid=jarvis.lib.isAndroid();
			this.isIos=jarvis.lib.isIos();
            if(this.isAndroid==true){
			   this.androidVS= jarvis.lib.getADVersion();
			   this.androidSdkVS=jarvis.lib.getADSdkVersion(this.androidVS);
			}
		 }else{
	        this.isPhone=false;
			this.isAndroid=false;
		 }
         if(jarvis.lib.getOSInfoStr()=="Macintosh"){
		     this.isMac=true;
		 }
		 
		 if(this.isMobile==true){
		     
	          this.isHtmlPlayer=true;
			  
		 }else
	     {
			 this.isHtmlPlayer=false;				 
		 }
	    
	    
		//this.userInfo=new jarvis.miniInfo.UserInfo();
		
    },
    
    resetInfo:function()
    {
	    this.ironManDic=new Dictionary();
		
		//this.userInfo.resetInfo();
	  
	},
    loadIronMansFromYoutube : function (apiPath,sel,id,returnA)
    {
		//alert("loadIronMansFromYoutube");
		var paramObj=jarvis.lib.getUrlParam(apiPath);
		var param=paramObj.param;
        if(param.maxResults==null){
		   param.maxResults="15";
		}
        if(param.order==null){
		   param.order="date";
		}
		if(param.channelId==null){
		   param.channelId='UCe52oeb7Xv_KaJsEzcKXJJg';
		}
        //alert("param : "+param.q+param.order+param.maxResults);


        try{
		
			var request = gapi.client.youtube.search.list({
				q: param.q,
				part: 'snippet',
				channelId: param.channelId,
				maxResults: param.maxResults,
				order: param.order,
				type: 'video',
				key: 'AIzaSyDBuqjueHyq4N-75VYs0O3x909oE0llB9g'

					  
			});
			
			request.execute(function(response) {
				var str = JSON.stringify(response.result);

				// str test1
				//alert('str = '+str);

				var data = '-';
				var data = JSON.parse(str);
				var item;
				var ironMan=null;
               
				for(var i=0;i<data.items.length;++i){
					item=data.items[i];
					
                    ironMan=new jarvis.IronMan();
					ironMan.setYoutubeData(item);
			   
				 if(ironMan.seq!=""){
					returnA.push(ironMan);
				 }
				}
				//alert(returnA.length);
				eval(sel+"('Y')");
			});
		}catch(e){
		     eval(sel+"('N');");
		}
	},
    loadVideoInfoFromNCast : function (vid,delegate)
    {
		
		var param=new Object();
		param.url=this.ncastVideoInfoAPI+"?videoId="+vid;
		
		var ajax=new jarvis.Ajax();
		jarvis.jarvisInfo["loadVideoInfoFromNCastComplete"+vid]= function(yn){
			 // alert(yn);

             ajax.returnData=JSON.parse(ajax.returnData);
			 
			 if(yn=="N"){
			     jarvis.lib.excuteDelegate(delegate,"loadError");
				 return;
			 }
			 if(ajax.returnData.statusCode!="normal"){
			     jarvis.lib.excuteDelegate(delegate,"loadError");
				 return;
			 }
			 var iframePath=ajax.returnData.shareServicePlayerUrl;
			 jarvis.lib.excuteDelegate(delegate,"loadComplete",[iframePath]);
			
			 if( jarvis.jarvisInfo["loadVideoInfoFromNCastComplete"+vid]==this){
				jarvis.jarvisInfo["loadVideoInfoFromNCastComplete"+vid]=null;
			 }
            
		}
        ajax.request("http://mini.imbc.com/mininew/apiparser.aspx",param,"jarvis.jarvisInfo.loadVideoInfoFromNCastComplete"+vid,"POST","text") 
	},
   
	loadIronMansFromNCast : function (apiPath,sel,id,returnA)
    {
		
		var param=new Object();
		
        param.url=escape(apiPath);
		
		var ajax=new jarvis.Ajax();
		jarvis.jarvisInfo["loadIronMansComplete"+id]= function(yn){
			 // alert(yn);

             ajax.returnData=JSON.parse(ajax.returnData);
			 
			 if(yn=="N"){
			     eval(sel+"('N');");
				 return;
			 }
			 if(ajax.returnData.statusCode!="normal"){
			     eval(sel+"('N');");
				 return;
			 }
			 data=ajax.returnData.clipApiItems;
			 
			 var ironMan=null;
			 for(var i=0;i<data.length;++i){
		         ironMan=new jarvis.IronMan();
				 ironMan.setNCastData(data[i]);
			   
				 if(ironMan.seq!=""){
					returnA.push(ironMan);
				 }
			 }
             eval(sel+"('Y')");
			 if( jarvis.jarvisInfo["loadIronMansComplete"+id]==this){
				jarvis.jarvisInfo["loadIronMansComplete"+id]=null;
			 }
            
		}
        ajax.request("http://mini.imbc.com/mininew/apiparser.aspx",param,"jarvis.jarvisInfo.loadIronMansComplete"+id,"POST","text") 

        
	},
	loadIronMans : function (apiPath,sel,id,param)
    {
        
		if(param===undefined){
			param=new Object();
		}
		var that=this;
        var returnA=new Array();
		this.ironManDic.setValue(id,returnA);


        if(apiPath.indexOf("youtubeapi")!=-1){
		
		     this.loadIronMansFromYoutube(apiPath,sel,id,returnA);
			 return;
		}else if(apiPath.indexOf("api.tvcast.naver.com")!=-1){
		
		     this.loadIronMansFromNCast(apiPath,sel,id,returnA);
			 return;
		}
      
        /*
		var returnA=this.ironManDic.getValue(id);
	    if(returnA==null){
		   returnA=new Array();
		   this.ironManDic.setValue(id,returnA);
		}else{
		   eval(sel+"('Y')");
		   return;
		}
		*/
        jarvis.jarvisInfo["loadIronMansComplete"+id]= function(data){
			 if(data=="N"){
			     eval(sel+"('N');");
				 return;
			 }
			 
			 var ironMan=null;
			 for(var i=0;i<data.length;++i){
		         ironMan=new jarvis.IronMan();
				 ironMan.setData(data[i]);
			   
				 if(ironMan.seq!=""){
					returnA.push(ironMan);
				 }
			 }
             eval(sel+"('Y')");
			 if( jarvis.jarvisInfo["loadIronMansComplete"+id]==this){
				jarvis.jarvisInfo["loadIronMansComplete"+id]=null;
			 }
            
		}
        
        var ajax=new jarvis.Ajax();
        ajax.request(apiPath,param,"jarvis.jarvisInfo.loadIronMansComplete"+id,"POST","jsonp") 

		
	},

    getIronMans : function (id,isAll)
    {
       if(isAll==undefined){
	       isAll=true;
	   }
	   
	   var returnA=this.ironManDic.getValue(id);
	   if(returnA==null){
	      returnA=new Array();
	   }
       if(isAll==false){
		  var ironMan;
		  var rA=new Array();
		  for(var i=0;i<returnA.length;++i){
		         ironMan=returnA[i];
				
				 if(String(ironMan.display)!="0"){
					rA.push(ironMan);
				 }
		   }
		   returnA=rA;
	       
	   }

	   return returnA;
	}
 
	
}

jarvis.jarvisInfo = new jarvis.JarvisInfo();

