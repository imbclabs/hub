/**
 * miniInfo v1.0: AudioPlayer 
 * by aeddang
 */
/*
/*
jarvis.delegate=function(){}
jarvis.delegate.prototype = 
{
    closeViewer : function(){},   
	changeViewer : function(idx){},   
	
}

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
document.write("<link rel='stylesheet' href='"+jarvis.dirPath+"/css/viewer.css'>");
document.write("<script type='text/javascript' src='"+jarvis.dirPath+"ui/viewer/viewer.board.js'></script>");



jarvis.ViewerOption=function(){
   
   this.cssKey="viewer-pop";
  
   
}



jarvis.Viewer= function(pageID,option,delegate,isVod) 
{
	
	
	this.body;
	if(isVod===undefined){
		isVod=false;
	}
	
	if(pageID===undefined){
		this.body=document.body;
	}else{
		if(typeof pageID=="string" || typeof pageID=="String"){
			this.body=document.getElementById(pageID);
	    }else{
			this.body=pageID;
		} 
	}
	this.delegate=delegate;
    this.option=option;
	if(this.option===undefined || this.option==null){
	   this.option=new jarvis.ViewerOption();
	}
    
    jarvis.lib.addAttribute(this.body,this.option.cssKey+" uicomponent");
    this.isChangeAble=true;
	this.isActive=false;
	this.isVod=isVod;
	this.currentPageBox=null;
	this.dataA=null; 
    this.currentPage=-1;
    
	this.pageNavi= document.createElement('div');
	jarvis.lib.addAttribute(this.pageNavi,'page-navi pagecontrol-gray align-center');
    this.body.appendChild(this.pageNavi);


    this.closeBtn=document.createElement("button");
	jarvis.lib.addAttribute(this.closeBtn,"btn btn-image btn-close align-right");
	this.body.appendChild(this.closeBtn);
    
    this.viewBox=document.createElement("div");
	jarvis.lib.addAttribute(this.viewBox,"view-box");
    this.body.appendChild(this.viewBox);
    
    this.contentBox=document.createElement("div");
	jarvis.lib.addAttribute(this.contentBox,"content-box");
	this.viewBox.appendChild(this.contentBox);
    
	
	this.pageControl= null;
	this.slideBox=null;
    return this;
   
	
}

jarvis.Viewer.prototype = 
{
    
	init : function()
	{
		var that=this;
        

        var delegateP=function(){}; 
		delegateP.prototype = {
		                      pageChange : function(idx)
                              {
                                
								  if(idx==that.currentPage){
										return;
								  }
								  that.pageChange(idx);
								   
							  }
						 }

		var option=new jarvis.UIPageControlOption();
		option.pageSize=6;
		option.cssKey="pagecontrol";
		option.usedNumber=false;
		this.pageControl=new jarvis.UIPageControl(this.pageNavi,new delegateP(),option);



		var delegate=function(){};
            delegate.prototype = {
                              initBox : function(div){
							       that.currentPageBox=div;
								   that.creatPage(div,0);
								   that.pageBoxComplete();
							  },   
							  moveStart : function(div,dr){
								  jarvis.config.isAnimation=true;
								  that.creatPage(div,dr);	  
							  }, 
							  moveChanged : function(div,dr){
							      that.setPageIdx(that.currentPage+dr);
							  },
							  moveEnd : function(div,dr){
								  jarvis.config.isAnimation=false;
							      that.currentPageBox=div;
								  that.pageBoxComplete();
							  }
		    }
		
		var option=new jarvis.UISlideBoxOption();
		option.slideSpd	=0.5;
		
        this.slideBox=new jarvis.UISlideBox(this.contentBox,new delegate(),option);
	    jarvis.lib.addEventListener(this.closeBtn,"click",function (e){that.closeViewer();})

     
	    
    },
    openViewer : function(dataA,pageIdx)
	{
		if(pageIdx===undefined){
		   this.currentPage=0;
		}else{
		   this.currentPage=pageIdx;
		}
		
		this.dataA=dataA;
		this.resize();
		var totalNum =this.dataA.length;
		this.slideBox.limitedIndex=totalNum;
		this.pageControl.reset(totalNum);
		this.slideBox.currentIndex=this.currentPage;
        this.slideBox.init();
        this.isActive=true;
        this.setPageIdx(this.currentPage);
	    
    },
    closeViewer : function()
	{
		if(this.isActive==false){
		    return;
		}
		
		this.isActive=false;
		this.removePageBox();
		jarvis.lib.excuteDelegate(this.delegate,"closeViewer");
		
	},
    
	changeViewer : function()
	{

		jarvis.lib.excuteDelegate(this.delegate,"changeViewer",[this.currentPage]);
		
	},
    removePageBox :function()
	{
		if(this.currentPageBox!=null){
            if(this.currentPageBox.content!=null){
				this.currentPageBox.content.remove();
                this.currentPageBox.content=null;
			}
			this.currentPageBox.innerHTML="";
		}
	},
    removeViewer :function()
	{
		
		this.removePageBox();
		
		if(this.body.parentNode!=null){
		   	this.body.parentNode.removeChild(this.body);
	    }
					

	},

	pageChange : function(idx){
	    if(this.isChangeAble==false){
		    return;
		}
		
		if(this.slideBox==null){
		     return;
		}
		
		if(idx<0 || idx>=this.dataA.length)
		{
		    return;
		}
        var dr=0;
		if(idx>this.currentPage){
			this.currentPage=idx-1;
			dr=1;
		}else{
			this.currentPage=idx+1;
			dr=-1;
		}
		this.isChangeAble=false;
	 	this.slideBox.moveSlide(dr);
	    this.setPageIdx(idx);
	},
	setPageIdx :function(idx)
	{
		this.currentPage=idx;
		this.pageControl.setPageIdx(idx);
		this.slideBox.currentIndex=idx;
		
	},
    creatPage :function(div,dr)
	{
        var idx=this.currentPage+dr;
		if(idx<0 || idx>=this.dataA.length)
		{
		    return;
		}
		div.innerHTML="";
		div.content=new jarvis.ViewerBoard(div);
		div.content.init(this.dataA[idx],this.isVod);
	},

	pageBoxComplete:function()
	{
        if(this.currentPageBox!=null){
            if(this.currentPageBox.content!=null){
				this.currentPageBox.content.active();
			}
		}
		this.isChangeAble=true;
	},
	
    orientationChange : function(){
		
		if(this.currentPageBox!=null){
            if(this.currentPageBox.content!=null){
				this.currentPageBox.content.orientationChange();
			}
		}
		resize();
	},
    
	resize : function(h,w)
	{
	    if(h!==undefined){
		    this.body.style.height=h+"px";
		}
		if(w!==undefined){
		    this.body.style.width=w+"px";
		}
		
		
		var bounce=jarvis.lib.getAbsoluteBounce(this.body);
		if(bounce.width>=10000 || bounce.width<=0){
		    return;
		}
	    var bounce=jarvis.lib.getAbsoluteBounce(this.body);
		var bounceC=jarvis.lib.getRelativeBounce(this.viewBox);
        var gep=Math.floor(bounceC.y);
        
		this.contentBox.style.height=(bounce.height-gep)+"px";
		this.contentBox.style.width=bounce.width+"px";
		
		
        if(this.currentPageBox!=null){
            if(this.currentPageBox.content!=null){
				this.currentPageBox.content.resize();
			}
		}

   

		if(this.slideBox!=null){
		   this.slideBox.resize();
		}
		

	}

	
}



