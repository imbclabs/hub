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
document.write("<script type='text/javascript' src='"+jarvis.dirPath+"ui/radio/radio.aod.js'></script>");





jarvis.AodAppsOption=function(){
   
   this.cssKey="aod-apps";
   this.fontColor="#ffffff";
  
}


jarvis.AodApps= function(pageID,option) 
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
	   this.option=new jarvis.AodAppsOption();
	}
	jarvis.lib.addAttribute(this.body,this.option.cssKey);
   
   
	var appsBox= document.createElement('div');  
    var aodBox = document.createElement('div');
	
    this.body.appendChild(appsBox);
    this.body.appendChild(aodBox);
    
	this.apps=new jarvis.Apps(appsBox);
    
	var option=new jarvis.AodOption();
    option.isStaticMode=false;
    this.aod=new jarvis.Aod(aodBox,option);
   
	
}

jarvis.AodApps.prototype = 
{
    
	init : function()
	{
	   this.apps.init();
	   this.aod.init();
      
    },
	remove : function()
	{
	},
	reset : function(option)
	{
	   this.apps.reset(option);
	   this.aod.reset(option);

	},
	changeColor :function(colorA)
	{
	   
	   this.apps.changeColor(colorA);
	   this.aod.changeColor(colorA);
		
	},
	
    orientationChange : function(){
	},

	resize : function(browserHeight)
	{
	   var bounce=jarvis.lib.getAbsoluteBounce(this.body);
	   if( bounce.width > 10000){
		   return;
	   }
	   
	   var bounceB=jarvis.lib.getAbsoluteBounce(this.aod.body);
	   

	   var hei=bounce.height-(bounceB.y-bounce.y);
	   this.aod.body.style.height=Math.floor(hei)+"px";
	   this.apps.resize();
	   this.aod.resize();
       

	}
}



