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





jarvis.ListOption=function(){
   
   this.cssKey="board";
   this.title="Table";
   this.type="VOD";
   this.reciveKey="jarvisList";   
   
   this.isFullMode=false;
   this.marginFull=0;
   this.wid=240;
   this.hei=80;
   this.margin=5;
   this.imgSC=jarvis.config.IMAGE_SCALE_HD;

   this.apiPath="http://imbctc022.cafe24.com/radio/datas/vodlist.js";
   this.colorA=new Array();
   this.colorA[0]="#ffffff";
   this.colorA[1]="#b2cef4";
   this.colorA[2]="bg-black30";
   this.colorA[3]=false;
}


jarvis.List= function(pageID,option) 
{
    this.TYPE_VOD="VOD";
    this.TYPE_PHOTO="PHOTO";
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
	   this.option=new jarvis.ListOption();
	}
	jarvis.lib.addAttribute(this.body,this.option.cssKey+" uicomponent");
    
	this.reciveKey=this.option.reciveKey;
	this.info=jarvis.jarvisInfo;
	jarvis[this.reciveKey+jarvis.config.RECIVE_KEY]=this;
	this.modifyMargin=0;

    this.bgClass="";
	this.txtColor="";


	this.totalPage=-1;
    this.currentPage=-1;
	this.pageNum=-1;
	this.dataA=null; 
     
	this.title = document.createElement('h2');
	jarvis.lib.addAttribute(this.title,'radio-title font-big');
	this.title.innerHTML=this.option.title;
	this.body.appendChild(this.title);
	


	this.grid= document.createElement('div');
	jarvis.lib.addAttribute(this.grid,'grid');
	this.body.appendChild(this.grid);
	
	this.pageList = document.createElement('div');
	jarvis.lib.addAttribute(this.pageList,'page-list');
	this.pageList.style.margin=this.option.margin+"px";
	
	this.grid.appendChild(this.pageList);
	
	this.pageNavi= document.createElement('div');
	jarvis.lib.addAttribute(this.pageNavi,'page-navi pagecontrol-bottom align-center');
    this.grid.appendChild(this.pageNavi);
	
	this.loadingBar= document.createElement("div");
	jarvis.lib.addAttribute(this.loadingBar,"animated loading");
    this.grid.appendChild(this.loadingBar);		
	


	this.pageControl= null;
	this.slideBox=null;
    this.currentPageBox=null;
    this.changeColor(this.option.colorA);	
}

jarvis.List.prototype = 
{
    init :function()
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
								  that.pageBoxComplete();
							  }
		    }
			 
		var slideOption=new jarvis.UISlideBoxOption();
		slideOption.divKey="ul";	
        this.slideBox=new jarvis.UISlideBox(this.pageList,new delegate(),slideOption);
	    this.slideBox.init();


		this.loadData();
		
    },
	remove : function()
	{
	},
	reset : function(option)
	{
	    jarvis[this.reciveKey+jarvis.config.RECIVE_KEY]=null;
		this.pageNum=-1;
		this.currentPage=-1;
		this.option=option;
		this.reciveKey=this.option.reciveKey;
		jarvis[this.reciveKey+jarvis.config.RECIVE_KEY]=this;
		this.pageList.style.margin=this.option.margin+"px";
		this.title.innerHTML=this.option.title;
	    this.changeColor(this.option.colorA);
		this.loadData()

	},
    loadData:function()
	{
        this.loading(true);
		this.dataA=new Array();
		this.info.loadIronMans(this.option.apiPath,"jarvis."+this.reciveKey+jarvis.config.RECIVE_KEY+".dataComplete",this.reciveKey);
	
	}
	,
	dataComplete :function()
	{
	   
		this.loading(false); 
		this.dataA=this.info.getIronMans(this.reciveKey);
	    if(jarvis.uiSet!=null){
			
			var isVod=false;
			if(this.option.type==this.TYPE_VOD)
			{ 
				isVod=true;
			}
			
			jarvis.uiSet.checkOpenViewer(this.dataA,isVod)
		}
		this.pageSizeChange();
        

	}
	,
	getCellSize : function()
	{
        var bounce=jarvis.lib.getAbsoluteBounce(this.pageList);
		
		var wl=Math.floor(bounce.width/this.option.wid);
		if(wl<1){
		   wl=1;
		}
		var w=Math.floor(bounce.width/wl);
		var h=((w-(this.option.margin*2))*this.option.imgSC)+this.option.hei;

		this.option.margin
        var hl=Math.round(bounce.height/h);
		var mh;
		if(hl<1){
		    hl=1;
            mh=bounce.height;
		}else{
		    mh=Math.floor(bounce.height/hl);
		}
		var dh=mh-h;
		if(dh<0){
		  this.modifyMargin=Math.floor(this.modifyMargin/2);
		}else{
		  this.modifyMargin=0;
		}
		h=mh;
		return new jarvis.Rectangle(wl,hl,w,h);
	}
	,
	pageSizeChange : function()
	{
        if(this.dataA==null || this.dataA.length<1){
		    return;
		}
		var cellBounce=this.getCellSize();
        var pn=cellBounce.x*cellBounce.y;
		
        if(pn!=this.pageNum){
			this.pageNum=pn;
		    this.pageSetChange();

			this.pageBoxComplete();
		}else{
			if(this.currentPageBox!=null){
				this.pageBoxResize(this.currentPageBox,cellBounce);
			}
		}
		
	}
	,
    pageSetChange : function()
	{
	    
        if(this.dataA==null){
		     return;
	    }
		if(this.currentPageBox==null){
		     return;
		}
		
	
		var totalNum=Math.ceil(this.dataA.length/this.pageNum);
		
		if(this.totalNum!=totalNum){
              if(this.currentPage>=totalNum){
			     this.currentPage=(totalNum-1);
			  }else if(this.currentPage<0){
			     this.currentPage=0;
			  }
			  this.pageControl.reset(totalNum);
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
	    
        var idx=this.currentPage+dr;
		if(idx<0 || idx>=this.totalPage){
            return;
		}
        var cellA=new Array();
		div.innerHTML="";
        var si=idx*this.pageNum;
		var fi=si+this.pageNum;
        
		if(fi>this.dataA.length){
		    fi=this.dataA.length;
		}
      
		var that=this;
		var li;
		var btn;
		var spanB;
		var spanS;
		var img;
        var data;
		var idx=0;
       
 
		for(var i=si;i<fi;++i){
			data=this.dataA[i];
			li=document.createElement('li');
			jarvis.lib.addAttribute(li,'align-left');
			
		    div.appendChild(li);
			
			if(data.isLink==true){
			    btn=document.createElement('a');
			    jarvis.lib.addAttribute(btn,'cell font-middle');
				btn.href=data.link;
			    btn.target=data.target;
			}else{
			    btn=document.createElement('button');
				jarvis.lib.addAttribute(btn,'btn cell font-middle');
				jarvis.lib.addEventListener(btn,"click",function (e){that.listSelect(e);})
			}
	
			
			btn.style.color=this.txtColor;
			li.appendChild(btn);
			
			spanB=document.createElement('span');
			jarvis.lib.addAttribute(spanB,'thmb');
			
			if(data.subImgCash!=null)
			{
			   spanB.appendChild(data.subImgCash);
			}else{
			   img=document.createElement("img");
			   spanB.appendChild(img);
			   img.src=data.subImgPath;
			   data.subImgCash=img;
			}
            btn.appendChild(spanB);
			if(this.TYPE_VOD==this.option.type)
			{
				spanS=document.createElement('span');
				jarvis.lib.addAttribute(spanS,'btn-play-c');
				spanB.appendChild(spanS);
            } 
            spanS=document.createElement('span');
			jarvis.lib.addAttribute(spanS,'tit font-middle');
			spanS.innerHTML=data.title;
			btn.appendChild(spanS);
			spanS=document.createElement('span');
			jarvis.lib.addAttribute(spanS,'txt font-middle');
			spanS.innerHTML=data.date;
            btn.appendChild(spanS);
            
            li.imgBox=spanB;
			li.info=data;
			li.btn=btn;
			btn.idx=i;
			li.idx=i;
            
			cellA.push(li);
			idx++;
		}
        div.cellA=cellA;
		this.pageBoxResize(div);
	
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
		while(idx==undefined){
		   tg=tg.parentNode;
		   idx=tg.idx;
		}
		//alert(" idx"+tg);
		if(jarvis.uiSet===undefined || jarvis.uiSet==null){
		    alert("viewer : "+idx);
		}else{
			var data=this.dataA[idx];
			if(data.link!="" && data.target=="_app"){
			    jarvis.uiSet.changePage(data.link);
			
			}else{
				var bounce=jarvis.lib.getAbsoluteBounce(tg);
				var isVod=false;
				if(this.option.type==this.TYPE_VOD)
				{ 
					isVod=true;
				}
				
				jarvis.uiSet.openViewer(this.dataA,idx,bounce,isVod);
			
			}

		}


	},
	pageBoxResize:function(div,cellBounce)
	{
		if(div==null){
		     return;
		}
		if(cellBounce===undefined){
		   cellBounce=this.getCellSize();
		}
		var cellA=div.cellA;
		if(cellA==null){
		     return;
		}
		
		var cell;
	    var wid=cellBounce.width-((this.option.margin+this.modifyMargin)*2);
		for(var i=0;i<cellA.length;++i){
			cell=cellA[i];
			cell.style.width=cellBounce.width+"px";
			cell.style.height=cellBounce.height+"px";
			cell.imgBox.style.height=Math.floor(wid*this.option.imgSC)+"px";
			cell.btn.style.width=wid+"px";
			cell.btn.style.marginTop=this.option.margin+"px";
			cell.btn.style.marginBottom=this.option.margin+"px";

			cell.btn.style.marginLeft=(this.option.margin+this.modifyMargin)+"px";
			cell.btn.style.marginRight=(this.option.margin+this.modifyMargin)+"px";
			
		
		}

	},
    pageBoxComplete:function()
	{
        /*
		if(this.currentPageBox==null){
		     return;
		}
		var cellA=this.currentPageBox.cellA;
		if(cellA==null){
		     return;
		}
		
		var cell;
		
		for(var i=0;i<cellA.length;++i){
			cell=cellA[i];
			if(cell.info.subImgCash==null){
			    cell.img=document.createElement("img");
				cell.imgBox.appendChild(cell.img);
				cell.img.src=cell.info.subImgPath;
				cell.info.subImgCash=cell.img;
			}
		
		}
         */

	},
    pageBoxColorChange:function()
	{
        if(this.currentPageBox==null){
		     return;
		}
		var cellA=this.currentPageBox.cellA;
		if(cellA==null){
		     return;
		}
		
		var cell;
		
		for(var i=0;i<cellA.length;++i){
			cell=cellA[i];
			cell.btn.style.color=this.txtColor;
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
	   this.pageBoxColorChange();

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
		
        var bounceL=jarvis.lib.getRelativeBounce(this.pageList);
		var bounceP=jarvis.lib.getAbsoluteBounce(this.pageNavi);
        

		bounceG=jarvis.lib.getAbsoluteBounce(this.grid);
		var hei=gridHei-bounceL.y-bounceP.height-(this.option.margin*2);
		var wid=(bounceG.width-(this.option.margin*2));
		this.pageList.style.width=wid+"px";
		this.pageList.style.height=hei+"px";
		this.pageNavi.style.bottom = this.option.marginFull+"px";
        this.pageNavi.style.width=bounceG.width+"px";
		this.slideBox.resize();
	    this.pageSizeChange();
	}
	
}



