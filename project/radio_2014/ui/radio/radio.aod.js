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





jarvis.AodOption=function(){
   
   this.cssKey="aod";
   this.isStaticMode=true;
   this.fontColor="#ffffff";
  
}


jarvis.Aod= function(pageID,option) 
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
	   this.option=new jarvis.AodOption();
	}
	jarvis.lib.addAttribute(this.body,this.option.cssKey);
      
    


	this.title = document.createElement('h2');
	jarvis.lib.addAttribute(this.title,'radio-title font-big');
	var titleText = document.createTextNode('다시듣기 (팟캐스트)');
	this.title.appendChild(titleText);
	this.body.appendChild(this.title);
	
	this.grid= document.createElement('div');
	jarvis.lib.addAttribute(this.grid,'grid');
	this.body.appendChild(this.grid);
	this.title.style.color=this.option.fontColor;
	var html='<ul>'
				+		'<li class="font-middle"><a href="#">라디오뉴스</a></li>'
				+		'<li class="font-middle"><a href="#">잠깐만</a></li>'
				+		'<li class="font-middle"><a href="#">무한도전코리아</a></li>'
				+		'<li class="font-middle"><a href="#">꿈의 지도</a></li>'
				+		'<li class="font-middle"><a href="#">환경캠페인</a></li>'
				+		'<li class="font-middle bg-none"><a href="#">PD스페셜</a></li>'
				+	'</ul>';
				
	this.grid.innerHTML = html; 
    	
}

jarvis.Aod.prototype = 
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
	    if(this.option.isStaticMode==true){
		    return;
		}
		
		var bounce=jarvis.lib.getAbsoluteBounce(this.body);
		if( bounce.width > 10000){
			return;
		}
		var bounceG=jarvis.lib.getAbsoluteBounce(this.grid);
        var hei=bounce.height-(bounceG.y-bounce.y);
		this.grid.style.height=Math.floor(hei)+"px";



	}
}



