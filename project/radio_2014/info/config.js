/**
 * config v1.0: Config(InterFace class)
 * by aeddang
 */



if(typeof jarvis == "undefined") var jarvis = new Object();




jarvis.Config= function() 
{
   
    
	this.isAnimation=false;
    this.PAGE_API_KEY="RADIO_MBC";
	this.MINI_CHANNEL_KEY="MINI_CHNNEL_MBC";
    this.MINI_ID="jarvisMini";
	this.MENU_ID="jarvisMenu";

    this.RECIVE_KEY="RECIVE_KEY";
	this.IMAGE_SCALE_HD=9/16;
	this.IMAGE_SCALE_SD=3/4;
	this.IMAGE_SCALE_BN=1/3;
	this.IMAGE_SCALE_BN2=1/2.4;

    
    this.API_PAGE_DATA="./datas/pagedata_";

	this.API_RADIO_MENU="http://mini.imbc.com/v2/js/jarvis.IronMan.menulist.js";;
    this.API_RADIO_INFO="http://mini.imbc.com/v2/js/jarvis.IronMan.noticelist.js";
    this.API_RADIO_VORA="http://mini.imbc.com/v2/js/jarvis.IronMan.boralist.js";
	this.API_RADIO_PHOTO="http://mini.imbc.com/v2/js/jarvis.IronMan.photolist.js";
    this.API_RADIO_VOD="http://mini.imbc.com/v2/js/jarvis.IronMan.videolist.js";
    this.API_RADIO_RECOMMAND="http://mini.imbc.com/v2/js/jarvis.IronMan.featuredlist.js";

	this.isTestMode=false;

}






jarvis.config = new jarvis.Config();

