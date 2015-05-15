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





jarvis.InformOption=function(){
   
   this.cssKey="inform";
   
   this.title="알립니다";
   this.reciveKey="jarvisViewerBoard";   
   this.apiPath="http://imbctc022.cafe24.com/radio/datas/vodlist.js";
   
   this.colorA=new Array();
   this.colorA[0]="#ffffff";
   this.colorA[1]="#b2cef4";
   this.colorA[2]="bg-black30";
   this.colorA[3]=false;

  
}


jarvis.Inform= function(pageID,option) 
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
    this.option=option;
	if(this.option===undefined){
	   this.option=new jarvis.InformOption();
	}
	jarvis.lib.addAttribute(this.body,this.option.cssKey+" uicomponent");

	this.dataA=null; 
    
	this.reciveKey=this.option.reciveKey;
	this.info=jarvis.jarvisInfo;
	jarvis[this.reciveKey+jarvis.config.RECIVE_KEY]=this;

	this.lineHeight=30;
	this.pageNum=-1;
    this.totalPage=-1;
    this.currentPage=-1;
    this.bgClass="";
	this.txtColor="";
    this.listA=new Array();

	this.title = document.createElement('h2');
	jarvis.lib.addAttribute(this.title,'radio-title font-big');
	this.title.innerHTML=this.option.title;
	this.body.appendChild(this.title);
	
	
	this.grid= document.createElement('div');
	jarvis.lib.addAttribute(this.grid,'grid');
	this.body.appendChild(this.grid);
	

	this.informBanner = document.createElement('div');
	jarvis.lib.addAttribute(this.informBanner,'inform-banner');
	this.grid.appendChild(this.informBanner);
	
	
	this.informBox = document.createElement('div');
	jarvis.lib.addAttribute(this.informBox,'inform-box');
	this.informList = document.createElement('div');
	jarvis.lib.addAttribute(this.informList,'inform-list');
	this.grid.appendChild(this.informBox);
	this.informBox.appendChild(this.informList);
	
	

	this.pageNavi= document.createElement('div');
	jarvis.lib.addAttribute(this.pageNavi,'page-navi pagecontrol-bottom align-center');
    this.informBox.appendChild(this.pageNavi);
    
    this.loadingBar= document.createElement("div");
	jarvis.lib.addAttribute(this.loadingBar,"animated loading");
    this.grid.appendChild(this.loadingBar);

	this.pageControl= null;
	this.slideBox=null;
    this.currentPageBox=null;
	this.changeColor(this.option.colorA);
    	
}

jarvis.Inform.prototype = 
{
    
	init : function()
	{
		var that=this;
		var delegate=function(){}; 
		delegate.prototype = {
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
		this.pageControl=new jarvis.UIPageControl(this.pageNavi,new delegate(),option);
		//this.pageControl.initReset(6); 
        

        var that=this;
        var delegate=function(){};
            delegate.prototype = {
                              initBox : function(div){//최초생성
							       that.currentPageBox=div; 
								   that.creatPage(div,0);
							  },   
							  moveStart : function(div,dr){
								  jarvis.config.isAnimation=true;
							      that.creatPage(div,dr);
							  }, 
							  moveChanged : function(div,dr){
							      that.currentPageBox=div;
								  var idx=that.currentPage+dr;
								  that.setPageIndex(idx);
						          
							  },
							  moveEnd : function(div,dr){
								  jarvis.config.isAnimation=false;
							      that.currentPageBox=div; 
							  }
		    }
			 
		var slideOption=new jarvis.UISlideBoxOption();
		slideOption.divKey="ul";	
        this.slideBox=new jarvis.UISlideBox(this.informList,new delegate(),slideOption);
	    this.slideBox.init();


		this.loadData();
		
    },
	remove : function()
	{
	},
    reset : function(option)
	{
        jarvis[this.reciveKey+jarvis.config.RECIVE_KEY]=null;
		this.option=option;
		this.reciveKey=this.option.reciveKey;
		jarvis[this.reciveKey+jarvis.config.RECIVE_KEY]=this;
		this.title.innerHTML=this.option.title;
	    
		this.loadData()
	},
	
    loadData:function()
	{
        //if(this.dataA==null){
			this.loading(true);
			this.dataA=new Array();
			this.info.loadIronMans(this.option.apiPath,"jarvis."+this.reciveKey+jarvis.config.RECIVE_KEY+".dataComplete",this.reciveKey);
		//}
	},
	dataComplete :function()
	{
	   	if(this.informBtn!=null){
			this.informBanner.removeChild(this.informBtn);
		}
		this.loading(false); 
		this.dataA=this.info.getIronMans(this.reciveKey);
		var data=this.dataA[0];
		if(data.isLink==true){
		    this.informBtn = document.createElement('a');
			this.informBtn.href=data.link;
			this.informBtn.target=data.target;
		}else{
		    this.informBtn = document.createElement('button');
			jarvis.lib.addAttribute(this.informBtn,'btn');
			this.informBtn.idx=i;
			jarvis.lib.addEventListener(this.informBtn,"click",function (e){that.listSelect(e);})
		}
        this.informBanner.appendChild(this.informBtn);
	    this.informBannerImg = document.createElement('img');
		this.informBtn.appendChild(this.informBannerImg);
		this.informBannerImg.src = data.subImgPath;
		this.pageSetChange();

	},
	
    pageSetChange :function()
	{
	    
        if(this.dataA==null){
		     return;
	    }
		if(this.dataA.length==0){
		     return;
	    }
		if(this.currentPageBox==null){
		     return;
		}
		var bounce=jarvis.lib.getAbsoluteBounce(this.informList);
		
        var pageNum=Math.floor(bounce.height/this.lineHeight);
      
		var h=pageNum*this.lineHeight;
		
		if((bounce.height-h)>15){
		    pageNum++;
		}
	    
		var totalNum=Math.ceil(this.dataA.length/pageNum);
		
		if(this.pageNum!=pageNum){
              if(this.currentPage>=totalNum){
			     this.currentPage=(totalNum-1);
			  }else if(this.currentPage<0){
			     this.currentPage=0;
			  }
			  this.pageControl.reset(totalNum);
              this.pageNum=pageNum;
			  this.totalPage=totalNum;
			  this.setPageIndex(this.currentPage);
			  this.creatPage(this.currentPageBox,0);
			  
		
		}
		
		

	},
	setPageIndex :function(idx)
	{
        
		this.currentPage=idx;
		if(this.pageControl!=null){
			this.pageControl.setPageIdx(this.currentPage);
		}
		if(this.slideBox!=null){
			this.slideBox.limitedIndex=this.totalPage;
			this.slideBox.currentIndex=this.currentPage;
		}
	},
	pageChange :function(idx,isAni)
	{
        
		if(isAni===undefined){
		    isAni=true;
		}
		if(this.currentPageBox==null){
		     return;
		}
		if(this.slideBox!=null){
			if(this.slideBox.isMoveAble==true){
			    return;
			}
		}
		
		if(this.currentPage!=-1 && isAni==true){
			if(idx>this.currentPage){
				 this.currentPage=idx-1;
			     this.slideBox.moveSlide(1);
			}else{
				 this.currentPage=idx+1;
			     this.slideBox.moveSlide(-1);
			}
			this.setPageIndex(idx);
		}else{
		    this.setPageIndex(idx);
		}
		
		
		
	},
	
   
	creatPage:function(div,dr)
	{
	    if(this.pageNum==-1){
		     return;
		}
		
        var idx=this.currentPage+dr;
	    
		if(idx<0 || idx>=this.totalPage){
            return;
		}
		
        this.listA=new Array();
		div.innerHTML="";
        var si=idx*this.pageNum;
		var fi=si+this.pageNum;
        
		if(fi>this.dataA.length){
		    fi=this.dataA.length;
		}
        var that=this;
		var html="";
        var path="";
		var li;
		var btn;
		var data;

		for(var i=si;i<fi;++i){
			data=this.dataA[i];
			li=document.createElement('li');
		    if(data.isLink==true){
			    btn=document.createElement('a');
				jarvis.lib.addAttribute(btn,'cell font-middle');
				btn.href=data.link;
			    btn.target=data.target;
			}else{
			    btn=document.createElement('button');
			    btn.idx=i;
				jarvis.lib.addAttribute(btn,'btn cell font-middle');
				jarvis.lib.addEventListener(btn,"click",function (e){that.listSelect(e);})
			}
			btn.innerHTML=data.title;
			btn.style.color=this.txtColor;
			li.appendChild(btn);
			li.style.height=this.lineHeight+"px";
			div.appendChild(li);
			this.listA.push(btn);
		}
       
		
	},
    listSelect:function(e)
	{
		var tg;
		if(e==null){
		    tg=select;
		}else{
		    tg=jarvis.lib.getEventTarget(e);
		}
		
		var idx=tg.idx;
		if(idx==null){
		   tg=tg.parentNode;
		   idx=tg.idx;
		}
		if(jarvis.uiSet===undefined || jarvis.uiSet==null){
		    alert("viewer : "+idx);
		}else{
			var data=this.dataA[idx];
			if(data.link!="" && data.target=="_app"){
			    jarvis.uiSet.changePage(data.link);
			
			}else{
				var bounce=jarvis.lib.getAbsoluteBounce(tg);
				jarvis.uiSet.openViewer(this.dataA,idx,bounce);
			
			}
			
		}


	},

	changeColor :function(colorA)
	{
	  
	   this.title.style.color=colorA[0];
	   this.txtColor=colorA[1];
	   
	   
	    
       jarvis.lib.removeAttribute(this.grid,this.bgClass);	
	   this.bgClass=colorA[2];
       

	   jarvis.lib.addAttribute(this.grid,this.bgClass);	
         
	   if(colorA[3]==true){
	       jarvis.lib.addAttribute(this.pageNavi,'pagecontrol-gray');
	   }else{
	       jarvis.lib.removeAttribute(this.pageNavi,'pagecontrol-gray');
	   }

	   for(var i=0;this.listA.length;++i){
	       this.listA[i].style.color=this.txtColor;
	   }

	},
	loading:function(ac)
	{
       if(ac==true){
		   jarvis.lib.addAttribute( this.loadingBar,"data-loading")
	   }else{
		   jarvis.lib.removeAttribute( this.loadingBar,"data-loading");
	   }
	},
    orientationChange : function(){

		this.resize();
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
		var bounceG=jarvis.lib.getAbsoluteBounce(this.grid);
		var bounceT=jarvis.lib.getAbsoluteBounce(this.title);
		

        var bounceL=jarvis.lib.getRelativeBounce(this.informList);
		var bounceP=jarvis.lib.getAbsoluteBounce(this.pageNavi);
        
		var gridHei=bounce.height-(bounceG.y-bounce.y);
        this.grid.style.height=gridHei+"px";

		var bh=bounce.width*jarvis.config.IMAGE_SCALE_BN2;
		this.informBanner.style.height=Math.floor(bh)+"px";
		
		
		var informHei=gridHei-bh-bounceL.y-bounceP.height;
		this.informList.style.height=informHei+"px";
        this.slideBox.resize();
		this.pageSetChange();
	
	}
}



