/**
 * lib v1.0: MiniMsgInfo
 * by aeddang
 */
/*
interfaces


*/

if(typeof jarvis == "undefined") var jarvis = new Object();
if(typeof jarvis.miniInfo == "undefined") jarvis.miniInfo = new Object();



jarvis.miniInfo.PodcastInfo= function() 
{
	
	this.podListAPI ="http://miniunit.imbc.com/list/podcastprogramlist";
    this.podItemListAPI ="http://miniunit.imbc.com/List/podcastitemlist";
    
    this.podListA=null; //Array <PodObject>
    this.podItemListA=null; //Dictionary <PageDataInfo>
    this.podItemPageA=null; //Dictionary <PageDictionaryInfo>
	
    this.resetInfo();

}


jarvis.miniInfo.PodObject= function() 
{
      this.channel="";
      this.broadCastID="";
      this.groupID="";
      this.title="";
      this.subTitle="";
      this.itunesImageURL="";
      this.homeURL="";
 }

jarvis.miniInfo.PodObject.prototype =
{
    setData:function(data)
	{
	    this.channel=data.Channel;
        this.broadCastID=data.BroadCastID;
        this.groupID=data.GroupID;
        this.title=data.Title;
        this.subTitle=data.SubTitle;
        this.itunesImageURL=data.HDPicture;
        this.homeURL=data.HomeURL;
     }

}

jarvis.miniInfo.PodItemObject= function() 
{
      this.rowNum="";
      this.contentTitle="";
      this.linkUrl="";
      this.description="";
      this.encloserURL="";
      this.pubDate="";
      this.broadDate="";
}

jarvis.miniInfo.PodItemObject.prototype =
{
    setData:function(data)
	{
		this.rowNum=data.RowNum;
        this.contentTitle=data.ContentTitle;
        this.linkUrl= data.LinkUrl;
        this.description=data.Description;
        this.encloserURL= data.EncloserURL;
        this.pubDate=data.PubDate;
        this.broadDate=data.BroadDate;
       
	}

}


jarvis.miniInfo.PodcastInfo.prototype =
{

	resetInfo:function()
	{
		this.podListA=new Array();
		this.podItemListA=new Dictionary();
		this.podItemPageA=new Dictionary();
		
	},

    loadPodList : function (sel)
    {
        this.podListA=new Array();
		var param=new Object();
		var that=this;
		param.rtype="jsonp";
		
        
        jarvis.miniInfo.loadPodListComplete= function(data){
			    
			 if(data=="N"){
			     eval(sel+"('N')");	
				 return;
			 }
			 
			 var pod=null;
             for(var i=0;i<data.length;++i){
		         pod=new jarvis.miniInfo.PodObject();
				 pod.setData(data[i]);
			     that.podListA.push(pod);
			 }
             eval(sel+"('Y')");	
			 if(jarvis.miniInfo.loadPodListComplete==this){
				jarvis.miniInfo.loadPodListComplete=null;
			 }

			 
		}
        var ajax=new jarvis.Ajax();
        ajax.request(this.podListAPI,param,"jarvis.miniInfo.loadPodListComplete","POST","jsonp") 

	},

    getPodList : function (channel)
    {
         if ( channel === undefined ) {
            return this.podListA;
         }
		
		 var returnA=new Array();
         var pod=null;
		 for(var i=0;i<this.podListA.length;++i){
		      pod=this.podListA[i];
			  if(pod.channel==channel){
			       returnA.push(pod);
			  }
		}
        return returnA;

	},
   


	reLoadPodItemList : function (sel,broadCastID,programGroupID)
    {
         this.removePodItemList(broadCastID,programGroupID);
		 return this.loadPodItemList(sel,broadCastID,programGroupID);
    },
	loadPodItemList : function (sel,broadCastID,programGroupID)
    {
        var code=broadCastID+programGroupID;
		
		var podItemInfo=this.getPodItemInfo(broadCastID,programGroupID);
		
		if(podItemInfo!=null){
		    if(podItemInfo.loadComplete==true){
		         return false;
		    }
		}else{
		    podItemInfo=new PageDataInfo(50);
		    this.podItemListA.setValue(code,podItemInfo);
		}
		
        if(podItemInfo.loadStart()==false){
		     return false;
		}

		
		var param=new Object();
		var that=this;
		param.rtype="jsonp";
		param.bid=broadCastID;
        param.gid=programGroupID;
        param.page=podItemInfo.page+1;
        param.pageSize=podItemInfo.size;
		
        
		
        jarvis.miniInfo["loadPodItemListComplete"+code]= function(data){
			    
			 if(data=="N"){
			     eval(sel+"('N','"+broadCastID+"','"+programGroupID+"')");	
				 return;
			 }
			 
			 podItemInfo.total=data.TotalCount;
             data=data.PodCastItems;
			 var podItem=null;
             var datas=new Array();
			 for(var i=0;i<data.length;++i){
		         podItem=new jarvis.miniInfo.PodItemObject();
				 podItem.setData(data[i]);
			     datas.push(podItem);
			 }
			 podItemInfo.insertDatas(datas);
			
             eval(sel+"('Y','"+broadCastID+"','"+programGroupID+"')");	
			 if(jarvis.miniInfo["loadPodItemListComplete"+code]==this){
				jarvis.miniInfo["loadPodItemListComplete"+code]=null;
			 }
		}
        
        var ajax=new jarvis.Ajax();
        ajax.request(this.podItemListAPI,param,"jarvis.miniInfo.loadPodItemListComplete"+code,"POST","jsonp") 
        

	    return true;
	},
    getPodItemInfo : function (broadCastID,programGroupID)
    {
         var code=broadCastID+programGroupID;
		 var mInfo=this.podItemListA.getValue(code);
		 return mInfo;

	},
   
    
	removePodItemList : function (broadCastID,programGroupID)
    {
         var code=broadCastID+programGroupID;
		 this.podItemListA.removeValue(code);
    },
    removeAllPodItemList : function ()
    {
         this.podItemListA=new Dictionary();
    },



    loadPodItemPage : function (sel,broadCastID,programGroupID,page)
    {
        var code=broadCastID+programGroupID;
		
		var podItemInfo=this.getPodItemPageInfo(broadCastID,programGroupID);
		
		if(podItemInfo==null){
			podItemInfo=new PageDictionaryInfo(50);
		    this.podItemPageA.setValue(code,podItemInfo);
		}
		var poditems=podItemInfo.getDatas(page);
        if(poditems!=null){
		    eval(sel+"('Y','"+broadCastID+"','"+programGroupID+"','"+page+"')");
		    return false;
		}
        if(podItemInfo.loadStart()==false){
		     return false;
		}

		
		
		var param=new Object();
		var that=this;
		param.rtype="jsonp";
		param.bid=broadCastID;
        param.gid=programGroupID;
        param.page=page+1;
        param.pageSize=podItemInfo.size;
		
        
		
        jarvis.miniInfo["loadPodItemPageComplete"+code]= function(data){
			    
			 if(data=="N"){
			     eval(sel+"('N','"+broadCastID+"','"+programGroupID+"','"+page+"')");	
				 return;
			 }
			 
			 if(podItemInfo.total==0){
			    podItemInfo.setTotal(data.TotalCount);
			 }
             
			 data=data.PodCastItems;
			 var podItem=null;
             var datas=new Array();
			 for(var i=0;i<data.length;++i){
		         podItem=new jarvis.miniInfo.PodItemObject();
				 podItem.setData(data[i]);
			     datas.push(podItem);
			 }
			 podItemInfo.insertDatas(datas,page);
			
             eval(sel+"('Y','"+broadCastID+"','"+programGroupID+"','"+page+"')");	
			 if(jarvis.miniInfo["loadPodItemPageComplete"+code]==this){
				//jarvis.miniInfo["loadPodItemPageComplete"+code]=null;
			 }
		}
        
        var ajax=new jarvis.Ajax();
        ajax.request(this.podItemListAPI,param,"jarvis.miniInfo.loadPodItemPageComplete"+code,"POST","jsonp") 
        

	    return true;
	},
    getPodItemPageInfo : function (broadCastID,programGroupID)
    {
         var code=broadCastID+programGroupID;
		 var mInfo=this.podItemPageA.getValue(code);
		 return mInfo;

	},
   
    
	removePodItemPageList : function (broadCastID,programGroupID)
    {
         var code=broadCastID+programGroupID;
		 this.podItemPageA.removeValue(code);
    },
    removeAllPodItemPage : function ()
    {
         this.podItemPageA=new Dictionary();
    }
}







/*

*/