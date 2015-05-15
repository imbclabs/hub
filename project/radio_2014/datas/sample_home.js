

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
				  className:"PageNavi",
				  dynamicSize:"full",
				  backGround:"#402d1c",
				  hasShadow:false,
				  wid:320,
				  hei:45,
				  option:{
							cssTitleColor:"#ffffff",
							apiPath:"./datas/pageSampleList.js",
							reciveKey:"PageMenu"
						 }
			 },
		     {
				  className:"PageMenu",
				  dynamicSize:false,
				  backGround:null,
				  hasShadow:null,
				  option:{
						   apiPath:"./datas/pageSampleList.js",
						   title:"",
						   reciveKey:"PageMenu"
						}
			 },
		     
			 {
				  className:"PageMenu",
				  dynamicSize:true,
				  backGround:null,
				  hasShadow:null,
				  option:{
						   
						   apiPath:"./datas/pageSampleList.js",
						   title:"즐겨찾기",
						   reciveKey:"PageMenu"
						}
			 }
			 
		  ]

	  }
  
)



