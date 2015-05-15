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




jarvis.PageFooterOption=function(){
   
	this.cssKey="page-footer";
	this.cssTxtColor="#ffffff"; 

	this.sms="SMS 문자 참여 #8000  정보이용료 SMS: 50원,  MMS: 100원 (통화료 별도)";
	this.addr="우편번호 : (150-604) 서울 여의도 우체국 사서함 819호 <심심타파> 담당자앞";
	this.tunein="http://tunein.com/radio/MBC-Radio-959-s14585/";
    this.isFullMode=true;
  
}

jarvis.PageFooter= function(pageID,option) 
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
	   this.option=new jarvis.FooterOption();
	}
	jarvis.lib.addAttribute(this.body,this.option.cssKey+" uicomponent");
    
	
	this.info=jarvis.jarvisInfo;
	
    this.grid = document.createElement('div');
	jarvis.lib.addAttribute(this.grid,'grid');

    this.textBox = document.createElement('div');
	jarvis.lib.addAttribute(this.textBox,'text-box font-small');
    this.textBox.style.color=this.option.cssTxtColor;
    
    this.sms = document.createElement('span');
    jarvis.lib.addAttribute(this.sms,'sms');
	
    this.addr = document.createElement('span');
    jarvis.lib.addAttribute(this.addr,'addr');
	
	this.tunein = document.createElement('a');
	jarvis.lib.addAttribute(this.tunein,'tunein tunein-icon');
	this.tunein.target="_blank";
	
		
    
	
	this.textBox.appendChild(this.sms);
	this.textBox.appendChild(this.addr);
	this.textBox.appendChild(this.tunein);
    
    this.body.appendChild(this.grid);
	this.grid.appendChild(this.textBox);

    	
}

jarvis.PageFooter.prototype = 
{
    
	init :function()
	{
	   this.reset(this.option);
		
    },
	remove : function()
	{
	},
	reset : function(option)
	{
	    
		this.option=option;
		this.textBox.color=this.option.cssTxtColor;
	    
		this.sms.innerHTML=this.option.sms;
		this.addr.innerHTML=this.option.addr;
        
		this.tunein.href=this.option.tunein; 

	},
	getHeight:function(w)
	{
	   this.body.style.width=w+"px";
	   this.resize();
	   
	   var hei=jarvis.lib.getAbsoluteBounce(this.textBox).height; 
	  
       var bounceT=jarvis.lib.getAbsoluteBounce(this.tunein);
       var top=Math.floor((hei-bounceT.height)/2);
       this.tunein.style.top=top+"px";

	   return hei;
	},
	changeColor :function(colorA)
	{
	  
	

	},
	
    orientationChange : function(){

		
	},
    
	resize : function(browserHeight)
	{
	   var bounce=jarvis.lib.getAbsoluteBounce(this.body);
	   if(bounce.width>=10000){
		   return;
	   }
	   
	   if(this.option.isFullMode==true){
		   
		   var parent = this.body.parentNode;
		   var tx=0;
		   if(parent!=null){
		       tx=jarvis.lib.getAbsoluteBounce(parent).x;
		   }
		   
		   this.grid.style.width=(bounce.width-(tx*2))+"px";
		   this.grid.style.marginLeft=tx +"px";
		   
		}else{
		   this.grid.style.width="100%";
		   this.grid.style.marginLeft="0px";
		 
		
		}
	}


}