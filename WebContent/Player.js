(function(window){
	function Player($audio){
	return new Player.prototype.init($audio);	
	}
	Player.prototype={
			constructor:Player,
			MusicList:[],
	        init:function($audio){
	        	this.$audio=$audio;
	        	this.audio=$audio.get(0);
	        },currentindex:-1,
	        playMusic:function(index,music){
	        	//判断是否为同一首
	        	if(this.currentindex==index){
	        		if(this.audio.paused){
	        			this.audio.play();
	        		}else{
	        			this.audio.pause();
	        		}
	        	}else{
	        		//不是同一首
	        		this.$audio.attr("src",music.link_url);
	        		this.audio.play();
	        		this.currentindex=index;
	        	}
	        }, deleteMusic:function(index){
	        	this.MusicList.splice(index,1);
	        	if(index<this.currentindex){
	        		this.currentindex=this.currentindex-1;
	        	}
	        },getDurarion:function(){
	        	return this.audio.duration;
	        	
	        },getCurrentTime:function(){
	        	return this.audio.currentTime;
	        },
	        timeupdatePlay:function(callBack){
	        	var $this=this;
	        	this.$audio.on("timeupdate",function(){
	        		var durationTime=$this.audio.duration;
	        		var currentTime=$this.audio.currentTime;
	        		var playedtime=$this.formatTime(currentTime,durationTime);
	        		callBack(durationTime,currentTime,playedtime);
	        	});
	        },
	        formatTime:function(currentTime,durationTime){
	        	var min=parseInt(currentTime/60);
	    		if(min<10){
	    			min="0"+min;
	    		}
	    		var sec=parseInt(currentTime%60);
	    		if(sec<10){
	    			sec="0"+sec;
	    		}
	    		var Dmin=parseInt(durationTime/60);
	    		if(Dmin<10){
	    			Dmin="0"+Dmin;
	    		}
	    		var Dsec=parseInt(durationTime%60);
	    		if(Dsec<10){
	    			Dsec="0"+Dsec;
	    		}
	    		return min+":"+sec+"/"+Dmin+":"+Dsec;
	        },bacChange:function(value){
	        	$(".song-top").css("width",value);
	        	$(".song-dot").css("left",value);
	        },changePlay:function(value){
	        this.audio.currentTime=this.audio.duration*value;
	        },changeSound:function(value){
	        	if(isNaN(value)) return;
	        	 this.audio.volume=value;
	        }
            
	       
	}
Player.prototype.init.prototype=Player.prototype;
window.Player=Player;
}
)(window);