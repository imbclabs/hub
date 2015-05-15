

/*
jarvis.IronMan= function() 
{
    this.seq="";
	this.group="";
    this.title="title";
    this.text="text";
	this.date="date";
    this.imgPath="imgPath";
	this.subImgPath="subImgPath";
    this.vodPath="vodPath";

	this.link="link";
    this.target="_top";
    this.iFramePath="";

}
*/


jarvis.uiSet.jarvisPageDataLoadComplete
(
	  {
		  
		  bgSetA : ["./style/uiset/bg_blue.png",
			        "./style/uiset/bg_white.png"],
		  
		  colorSetA : ["#ffffff","#b2cef4","bg-black30",false],
		  colorSetB : ["#636363","#636363","bg-white-border",true],
	      colorSetC : ["#636363","#636363","bg-white-border",true],
		 
		  
		  
		  datas:
		  [
			 
		  
			 
		     {
			  className:"Mini",
			  dynamicSize:null,
			  backGround:null,
			  hasShadow:null,
			  option:{}
			 },
		     {
			  className:"Board",
			  dynamicSize:null,
			  hasShadow:null,
			  fixSize:"auto", 
              option:{
				       apiPath:"http://mini.imbc.com/v2/js/jarvis.IronMan.photolist.js",
				       title:"사진방",
					   type:"PHOTO",
					   reciveKey:"PhotoList"
				     }
			 },
			 {
			  className:"Board",
			  dynamicSize:null,
			  hasShadow:null,
			  fixSize:"auto",
			  option:{
				       apiPath:"http://mini.imbc.com/v2/js/jarvis.IronMan.videolist.js",
				       title:"동영상",
					   type:"VOD",
					   reciveKey:"VideoList"
				     }
			 },
			 
		     {
			  className:"Board",
			  dynamicSize:null,
			  hasShadow:null,
			  fixSize:"auto",
			  option:{
				       apiPath:"http://mini.imbc.com/v2/js/jarvis.IronMan.boralist.js",
				       title:"보이는라디오",
					   type:"VOD",
					   reciveKey:"BoraList"
				     }
			 },
			 {
			  className:"Schedule",
			  dynamicSize:null,
			  hasShadow:null,
			  option:{}
			 },
			 {
			  className:"SelectSong",
			  dynamicSize:null,
			  hasShadow:null,
			  option:{}
			 },	
			 {
			  className:"FrameViewer",
			  dynamicSize:null,
			  hasShadow:null,
			  option:{
				       title:"@radiombc",
					   iframePath:"twitter.html"
				     }
			 },
			 {
			  className:"Featured",
			  dynamicSize:null,
			  hasShadow:null,
			  option:{
				       apiPath:"http://mini.imbc.com/v2/js/jarvis.IronMan.featuredlist.js",
					   title:"추천",
					   reciveKey:"FeaturedList"
				     }
			 },
			 {
			  className:"AppsInfo",
			  dynamicSize:null,
			  hasShadow:null,
			  option:{}
			 }
			 
		  ]

	  }
  
)



