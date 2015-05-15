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

}

/*
jarvis.delegate=function(){}
jarvis.delegate.prototype = 
{
 
	close : function(){},   
	select : function(){}, 
}
*/



jarvis.NoticeOption=function()
{
   this.title="공지";
   this.cssKey="notice";
}



jarvis.Notice= function(pageID,option,delegate) 
{
	
	
	this.body;
	if(pageID===undefined){
		this.body=document.body;
	}else{
		if(typeof pageID=="string" || typeof pageID=="String"){
			this.body=document.getElementById(pageID);
	    }else{
			this.body=pageID;
		} 
	}
	var that=this;
	if(delegate===undefined){
		delegate=null;
	}
    this.delegate=delegate;

    this.option=option;
	if(this.option==undefined || this.option==null){
	   this.option=new jarvis.NoticeOption();
	}
   
	jarvis.lib.addAttribute(this.body,this.option.cssKey);
    
    
	this.title=document.createElement("h3");
    this.text=document.createElement("button");
    this.btnClose=document.createElement("button");
    jarvis.lib.addAttribute(this.title,"font-small align-left title");
	jarvis.lib.addAttribute(this.text,"btn font-middle text-auto-resize align-left text");
	jarvis.lib.addAttribute(this.btnClose,"btn btn-image align-right btn-close-notice");
    
    this.title.innerHTML=this.option.title;
	
	this.body.appendChild(this.title);
	this.body.appendChild(this.text);
	this.body.appendChild(this.btnClose);

   
    
	
}

jarvis.Notice.prototype = 
{
    
	init : function()
	{
		var that=this;
		jarvis.lib.addEventListener(this.text,"click",function (e){ jarvis.lib.excuteDelegate(that.delegate,"select");})
		jarvis.lib.addEventListener(this.btnClose,"click",function (e){ jarvis.lib.excuteDelegate(that.delegate,"close");})
	    var gestureDelegate=function(){}; 
		gestureDelegate.prototype = {
										gestureComplete: function(e){
										if(e==jarvis.GestureElement.PAN_LEFT || e==jarvis.GestureElement.PAN_RIGHT){
											jarvis.lib.excuteDelegate(that.delegate,"close");
										}
									}
							  
		}
		var gestureElement=new  jarvis.GestureElement( this.body,new gestureDelegate(),false,true);
    },

	setText : function(str)
	{
		//alert(str);
		this.text.innerHTML=str;
		this.resize();
	},
    orientationChange : function(){
	},

	resize : function()
	{
	    var bounce=jarvis.lib.getAbsoluteBounce(this.body);
		 if(bounce.width>=10000){
		    return;
		}
		
		var bounceL=jarvis.lib.getAbsoluteBounce(this.title);
	    var bounceR=jarvis.lib.getAbsoluteBounce(this.btnClose);
        var cw=Math.floor(bounce.width-bounceL.width-bounceR.width-(bounceL.x-bounce.x));
     
		this.text.style.width=cw+"px";

	}
}



