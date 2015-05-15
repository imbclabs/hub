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





jarvis.AppsOption=function(){
   
   this.cssKey="apps";
   this.fontColor="#ffffff";
  
}

jarvis.Apps= function(pageID,option) 
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
	   this.option=new jarvis.AppsOption();
	}
	jarvis.lib.addAttribute(this.body,this.option.cssKey);
      
    


	this.title = document.createElement('h2');
	jarvis.lib.addAttribute(this.title,'radio-title font-big');
	var titleText = document.createTextNode('다운로드');
	this.title.appendChild(titleText);
	this.body.appendChild(this.title);
	
	var grid= document.createElement('div');
	jarvis.lib.addAttribute(grid,'grid');
	this.body.appendChild(grid);
	this.title.style.color=this.option.fontColor;

	
	var html='<p class="logo"><img src="'+jarvis.dirPath+'style/radio/logo_mini.png" alt ="mini MBC 라디오" /></p>'
				+	'<ul class="list-apps">'
				+		'<li class="icon-pc font-small"><a href="http://mini.imbc.com/betadownevent.asp" target="_blank">PC Beta</a></li>'
				+		'<li class="icon-pc font-small"><a href="http://mini.imbc.com/player/event_beta.asp" target="_blank">PC</a></li>'
				+		'<li class="icon-ios font-small"><a href="https://itunes.apple.com/kr/app/id384041016?mt=8" target="_blank">ios</a></li>'
				+		'<li class="icon-android font-small"><a href="https://play.google.com/store/apps/details?id=com.imbc.mini" target="_blank">Android</a></li>'
				+	'</ul>'
				
	grid.innerHTML = html; 
    	
}

jarvis.Apps.prototype = 
{
    
	init : function()
	{
		
    },
	remove : function()
	{
	},
	reset : function(option)
	{
		

	},
	changeColor :function(colorA)
	{
	   
		 this.title.style.color=colorA[0];
		
	},
	
    orientationChange : function(){
	},

	resize : function(browserHeight)
	{
	   

	}
}