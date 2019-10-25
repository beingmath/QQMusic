
$(function(){
	var $audio=$("audio");
	var player=new Player($audio);
	
	var $bac=$(".song-bac");
	var $top=$(".song-top");
	var $dot=$(".song-dot");
	var progress=new Progress($bac,$top,$dot);
	progress.progressClick(function(value){
		player.changePlay(value);
		
	});
	progress.progressMove(function(value){
		player.changePlay(value);
	});
	//声音控制
	var $Sbac=$(".sound-bac");
	var $Stop=$(".sound-top");
	var $Sdot=$(".sound-dot");
	var Sprogress=new Progress($Sbac,$Stop,$Sdot);
	Sprogress.progressClick(function(value){
		player.changeSound(value);
		
	});
	Sprogress.progressMove(function(value){
		player.changeSound(value);
	});
	//加载歌曲列表
	getmusic();
	
	function getmusic(){
		$.ajax(
			{
				url:"music.json",
				dataType:"json",
				success:function(data){
					Player.MusicList=data;
					$.each(data,function(index,music){
						$item=createmusic(index,music);
						var $musiclist=$(".content-bottom ul");
						$musiclist.append($item);
					});
				},error(e){
					console.log(e);
				}
			}
		);
	}
	//初始化事件
	//监视时间改变
      player.timeupdatePlay(function(durationTime,currentTime,playedtime){
    	 $(".song-time").text(playedtime);
    	 var value=currentTime/durationTime*100+"%";
    	     player.bacChange(value);
      });
	//删除按钮
	$(".content-bottom").delegate(".music_delete","click",function(){
		var $item=$(this).parents(".list_music");
		if($item.get(0).index==player.currentindex){
			$(".song_next").trigger("click");
		}
		$(this).parents(".list_music").remove();
		
		player.deleteMusic($item.get(0).index);
		
		$(".list_music").each(function(index,ele){
			ele.index=index;
			$(ele).find(".number").text(index+1);
		});
		
	});
	//播放按钮
	$(".song_play").click(function(){
	
		$(".song_play").toggleClass("song_play2");
		if(player.currentindex==-1){
			$(".list_music").find(".music_play").eq(0).trigger("click");
		}else{
			$(".list_music").find(".music_play").eq(player.currentindex).trigger("click");
			
		}
	});
	//上一首
	$(".song_pre").click(function(){
		$(".list_music").find(".music_play").eq(player.currentindex-1).trigger("click");
	});
	//下一首
	$(".song_next").click(function(){
		var childNum = document.getElementById("ullist").children.length;
	if(player.currentindex==childNum-2){
		player.currentindex=-1;
	}
		$(".list_music").find(".music_play").eq(player.currentindex+1).trigger("click");
	});
	//声音
	$(".sound-pic").click(function(){
		$(".sound-pic").toggleClass("sound-pic2");
		if($(this).attr("class").indexOf("sound-pic2")!=-1){
			player.changeSound(0);
		}else{
			player.changeSound(1);
		}
	});
		$(".content-bottom").delegate(".list_music","mouseenter",function(){
	        $(this).find(".list_menu").stop().fadeIn(100);
	        $(this).find(".list_delete").stop().fadeIn(100);
	        $(this).find(".time span").stop().fadeOut(100);
	    });
	    $(".content-bottom").delegate(".list_music","mouseleave",function(){
			$(this).find(".list_menu").stop().fadeOut(100);
			$(this).find(".list_delete").stop().fadeOut(100);
			$(this).find(".time span").stop().fadeIn(100);
		
		});
	    $(".content-bottom").delegate(".box","click",function(){
	    	$(this).toggleClass("checked");
	    });
	    $(".content-bottom").delegate(".music_play","click",function(){
	    	$(this).parents(".list_music").siblings().find(".number").removeClass("gif");
	    	var $item=$(this).parents(".list_music");
	    	$(this).toggleClass("music_play2");
	    	$(this).parents(".list_music").siblings().find(".music_play").removeClass("music_play2");
	    	if($(this).attr("class").indexOf("music_play2")!=-1){
	    		//不等于-1为播放状态
	    		$(".song_play").addClass("song_play2");
	    	}else{
	    		//等于-1为暂停状态
	    		$(".song_play").removeClass("song_play2");
	    	}
	    	$(this).parents(".list_music").find(".number").toggleClass("gif");
	    	//播放音乐
	    	player.playMusic($item.get(0).index,$item.get(0).music);
	    	initMusicInfo($item.get(0).music)
	    	
	    });
	function  createmusic(index,music){
		var $item=$(" <li class=\"list_music\">\n" +
			"                        <div class=\"box \"><i></i></div>\n" +
			"                        <div class=\"number\">"+(index+1)+"</div>\n" +
			"                        <div class=\"name\">"+music.singer+"</div>\n" +
			"                        <div class=\"music\">"+music.name+"\n" +
			"                            <div class=\"list_menu\">\n" +
			"                                <a href=\"javascript:;\" class=\"music_play\" title=\"播放\" ></a></div>\n" +
			"                        </div>\n" +
			"                        <div class=\"time\"><span>"+music.time+"</span>\n" +
			"                            <div class=\"list_delete\">\n" +
			"                                <a href=\"javascript:;\" class=\"music_delete\"></a></div></div>\n" +
			"                    </li>");
		$item.get(0).index=index;
		$item.get(0).music=music;
		return $item;
	}
	function initMusicInfo(music){
		var $pic=$(".content-right img");
		var $name=$(".song-music");
		var $singer=$(".singer");
		var $album=$(".album");
		var $sonName=$(".song-name");
		var $time=$(".song-time");
		var $musicBg=$(".mask_bg");
		var $title=$(".title");
		$musicBg.css("background","url("+music.pictrue+")");
		$title.text(""+music.name+"........正在播放");
		$pic.attr("src",music.pictrue);
		$name.text(music.name);
		$singer.text(music.singer);
		$album.text(music.album);
		$sonName.text(music.name);
		$time.text("00:00/"+music.time+"");
	}
});