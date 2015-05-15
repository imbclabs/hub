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





jarvis.FrameViewerOption=function(){
   
   this.cssKey="frame-viewer";
   this.isFullMode=false;
   this.marginFull=0;
   this.marginFrame=0;

   this.isLoading=true;
   this.title="@radiombc";
   this.iframePath=jarvis.dirPath+"twitter.html";
   
   this.colorA=new Array();
   this.colorA[0]="#ffffff";
   this.colorA[1]="#b2cef4";
   this.colorA[2]="bg-black30";
   this.colorA[3]=false;

  
}


jarvis.FrameViewer= function(pageID,option) 
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
	this.info=jarvis.jarvisInfo;
    this.option=option;
	if(this.option===undefined){
	   this.option=new jarvis.FrameViewerOption();
	}
	jarvis.lib.addAttribute(this.body,this.option.cssKey);


	this.txtColor="";
   
	this.title = document.createElement('h2');
	jarvis.lib.addAttribute(this.title,'radio-title font-big');
	this.title.innerHTML=this.option.title;
	
	this.body.appendChild(this.title);
	
	
	this.grid= document.createElement('div');
	jarvis.lib.addAttribute(this.grid,'grid');
	this.body.appendChild(this.grid);
	
    this.loadingBar= document.createElement("div");
	jarvis.lib.addAttribute(this.loadingBar,"animated loading");
    this.grid.appendChild(this.loadingBar);		
    var that=this;
    
	if(this.info.isIos==true){
			this.content=document.createElement("div");
			this.content.style.overflowX="hidden";
			this.content.style.overflowY="auto";
			this.content.style["-webkit-overflow-scrolling"]="touch";
			this.iframe=document.createElement("iframe");
			jarvis.lib.addAttribute(this.content,"content");
			this.content.appendChild(this.iframe);
	}else{
			this.content=document.createElement("iframe");
			this.iframe=this.content;
	}
	jarvis.lib.addEventListener(this.iframe,"load",function (e){that.iframeLoadComplete();})
	this.iframe.frameBorder = "no"; 
	this.iframe.style.width="100%";
	this.iframe.style.height="100%";
	this.grid.appendChild(this.content);
   
    	
}

jarvis.FrameViewer.prototype = 
{
    
	init : function()
	{
		this.reset(this.option);
		
    },
	remove : function()
	{
	},
	reset : function(option)
	{
		this.option=option;
		this.title.innerHTML=this.option.title;
		
		this.loading(this.option.isLoading);
		this.iframe.src=this.option.iframePath;
		this.changeColor(this.option.colorA);

	},
    iframeLoadComplete:function(e)
	{
       this.loading(false);
	},
    

	changeColor :function(colorA)
	{
	  
	   this.title.style.color=colorA[0];
	   jarvis.lib.removeAttribute(this.grid,this.bgClass);	
	   this.bgClass=colorA[2];
       jarvis.lib.addAttribute(this.grid,this.bgClass);	

	},
	
    orientationChange : function(){
        this.resize();
		
	},
    loading:function(ac)
	{
       if(ac==true){
		   jarvis.lib.addAttribute( this.loadingBar,"data-loading")
	   }else{
		   jarvis.lib.removeAttribute( this.loadingBar,"data-loading");
	   }
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

		this.title.style.marginTop = this.option.marginFull+"px";
		var bounceG=jarvis.lib.getAbsoluteBounce(this.grid);
		
		var gridHei=bounce.height-(bounceG.y-bounce.y)-this.option.marginFull;
        this.grid.style.height=gridHei+"px";	
        
        
		
       
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
		bounceG=jarvis.lib.getAbsoluteBounce(this.grid);
		this.iframe.style.margin=this.option.marginFrame+"px";
		this.iframe.style.height=(gridHei-(this.option.marginFrame*2))+"px"; 
		this.iframe.style.width=(bounceG.width-(this.option.marginFrame*2))+"px"; 
	
	}
}



