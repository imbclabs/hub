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
	document.write("<link rel='stylesheet' href='"+jarvis.dirPath+"/css/global.css'>");
	document.write("<link rel='stylesheet' href='"+jarvis.dirPath+"/css/base.css'>");
	document.write("<link rel='stylesheet' href='"+jarvis.dirPath+"/css/ui.css'>");
	document.write("<link rel='stylesheet' href='"+jarvis.dirPath+"/css/radio.css'>");

}






jarvis.PageTopNaviOption=function(){
   
   this.cssKey="page-top-navi";
   this.naviHei=45;
   
   this.pageTopOption=new jarvis.PageTopOption();
   this.pageNaviOption=new jarvis.PageNaviOption();
  
}


jarvis.PageTopNavi= function(pageID,option) 
{
	
	
	this.body;
	if(pageID===undefined){
		this.body=document.body;
	}else{
		if(typeof pageID=="String"){
			this.body=document.getElementById(pageID);
		}else{
			this.body=pageID;
		}
	   
	}	
    this.option=option;
	if(this.option===undefined){
	   this.option=new jarvis.PageTopNaviOption();
	}
	jarvis.lib.addAttribute(this.body,this.option.cssKey);
   
   
	var topBox= document.createElement('div');  
    var naviBox = document.createElement('div');
	
    this.body.appendChild(topBox);
    this.body.appendChild(naviBox);
    
    var pageTopOption=new jarvis.PageTopOption();
	var pageNaviOption=new jarvis.PageNaviOption();
    jarvis.lib.overrideObject(pageTopOption,this.option.pageTopOption);
	jarvis.lib.overrideObject(pageNaviOption,this.option.pageNaviOption);

	this.top=new jarvis.PageTop(topBox,pageTopOption);
    this.navi=new jarvis.PageNavi(naviBox,pageNaviOption);
    
	
   
	
}

jarvis.PageTopNavi.prototype = 
{
    
	init : function()
	{
	   this.top.init();
	   this.navi.init();
      
    },
	reset : function(option)
	{
	   this.option=option;
	       
	   var pageTopOption=new jarvis.PageTopOption();
	   var pageNaviOption=new jarvis.PageNaviOption();
	   jarvis.lib.overrideObject(pageTopOption,this.option.pageTopOption);
	   jarvis.lib.overrideObject(pageNaviOption,this.option.pageNaviOption);
	  
	   this.top.reset(pageTopOption); 
	   this.navi.reset(pageNaviOption);
      
    },
	remove : function()
	{
	   this.top.remove();
	   this.navi.remove();
	},
	changeColor :function(colorA)
	{
	   this.top.changeColor(colorA);
	   this.navi.changeColor(colorA);
	   
		
	},
	
    orientationChange : function(){
		this.top.orientationChange();
	    this.navi.orientationChange();
	},

	resize : function(browserHeight)
	{
	   var bounce=jarvis.lib.getAbsoluteBounce(this.body);
	   if( bounce.width > 10000){
		   return;
	   }
	   
	   
	   var hei=bounce.height-this.option.naviHei;
	  
	   this.top.body.style.height=Math.floor(hei)+"px";
	   this.navi.body.style.height=this.option.naviHei+"px";
	   
	   this.top.resize();
	   this.navi.resize();
	 
       

	}
}



