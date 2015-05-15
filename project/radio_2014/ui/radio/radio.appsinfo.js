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
document.write("<script type='text/javascript' src='"+jarvis.dirPath+"ui/radio/radio.apps.js'></script>");
document.write("<script type='text/javascript' src='"+jarvis.dirPath+"ui/radio/radio.inform.js'></script>");





jarvis.AppsInfoOption=function(){
   
   this.cssKey="apps-info";
   this.fontColor="#ffffff";
  
}


jarvis.AppsInfo= function(pageID,option) 
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
	   this.option=new jarvis.AppsInfoOption();
	}
	jarvis.lib.addAttribute(this.body,this.option.cssKey);
   
   
	var appsBox= document.createElement('div');  
    var infoBox = document.createElement('div');
	
    this.body.appendChild(appsBox);
    this.body.appendChild(infoBox);
    
	this.apps=new jarvis.Apps(appsBox);
    
	var option=new jarvis.InformOption();
    option.apiPath=jarvis.config.API_RADIO_INFO;
	option.title="알립니다";
	option.reciveKey="NoticeList"; 
    option.isStaticMode=false;
    this.inform=new jarvis.Inform(infoBox,option);
   
	
}

jarvis.AppsInfo.prototype = 
{
    
	init : function()
	{
	   this.apps.init();
	   this.inform.init();
      
    },
	remove : function()
	{
	},
	changeColor :function(colorA)
	{
	   
	   this.apps.changeColor(colorA);
	   this.inform.changeColor(colorA);
		
	},
	
    orientationChange : function(){
		this.inform.orientationChange();
	},

	resize : function(browserHeight)
	{
	   var bounce=jarvis.lib.getAbsoluteBounce(this.body);
	   if( bounce.width > 10000){
		   return;
	   }
	   
	   var bounceB=jarvis.lib.getAbsoluteBounce(this.inform.body);
	   

	   var hei=bounce.height-(bounceB.y-bounce.y);
	   this.inform.body.style.height=Math.floor(hei)+"px";
	   this.apps.resize();
	   this.inform.resize();
       

	}
}



