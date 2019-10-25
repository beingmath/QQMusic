(function(window){
	function Progress($bac,$top,$dot){
	return new Progress.prototype.init($bac,$top,$dot);	
	}
	Progress.prototype={
			constructor:Progress,
			
	        init:function($bac,$top,$dot){
	        	this.$bac=$bac;
	        	this.$top=$top;
	        	this.$dot=$dot;
	        },
	        progressClick:function(callBack){
	        var $this=this;
	        	this.$bac.click(function(event){
	        	  var offleft=$(this).offset().left;
	        	var clickleft=event.pageX;
	        	var lineHeight=clickleft-offleft;
	        	$this.$top.css("width",lineHeight);
	        	$this.$dot.css("left",lineHeight);
	        	var proWidth=$(this).width();
	        	var value=lineHeight/proWidth;
	        	callBack(value);
	        	});
	        	
	        },
	        progressMove:function(callBack){
	        	  var $this=this;
	        	this.$bac.mousedown(function(){
	        		$(this).mousemove(function(){
	        			  var offleft=$(this).offset().left;
	      	        	var clickleft=event.pageX;
	      	        	var lineHeight=clickleft-offleft;
	      	        	if(lineHeight>649){
	      	        		$this.$top.css("width","649px");
		      	        	$this.$dot.css("left","649px");	
	      	        	}else{
	      	        	$this.$top.css("width",lineHeight);
	      	        	$this.$dot.css("left",lineHeight);}
	      	        	var proWidth=$(this).width;
	    	        	var value=lineHeight/proWidth;
	    	        	callBack(value);
	        		});
	        	});
	        	this.$bac.mouseup(function(){
	        		$(this).off("mousemove");
	        	});
	        }
	       
            
	       
	}
	Progress.prototype.init.prototype=Progress.prototype;
window.Progress=Progress;
}
)(window);