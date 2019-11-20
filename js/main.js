var hiddenControlBarInVideo = null;
var helpers_fn = new Object({
    
    formatBytes: function (bytes,decimals) {
        if(bytes == 0) return '0 Byte';
        var k = 1000;
        var dm = decimals + 1 || 3;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(dm) + ' ' + sizes[i];
    },
    
    msecond_to_time: function (label) {
        $self = this;
        var h = Math.floor(label / 3600);
        time = label - h * 3600;         
        var m = Math.floor(time / 60);
        var s = Math.floor(time % 60);

        return $self.msecond_to_time_2format(h)+':'+$self.msecond_to_time_2format(m)+':'+$self.msecond_to_time_2format(s);
    },
    
    msecond_to_time_2format: function (label) {
        return (label<10? '0':'') + label;
    },
    
    tooltip: function(target, name) {
        $(target).each(function(i){
            $("body").append("<div class='"+name+"' id='"+name+i+"'>"+$(this).attr('title')+"</div>");
            var my_tooltip = $("#"+name+i);
		
            if($(this).attr("title") != "" && $(this).attr("title") != "undefined" ){
		$(this).removeAttr("title").mouseover(function(){
                    my_tooltip.css({opacity:1, display:"none"}).fadeIn(400);
		}).mousemove(function(kmouse){
                    var border_top = $(window).scrollTop(); 
                    var border_right = $(window).width();
                    var left_pos;
                    var top_pos;
                    var offset = 20;
                    if(border_right - (offset *2) >= my_tooltip.width() + kmouse.pageX){
                        left_pos = kmouse.pageX+offset;
                    } else {
                        left_pos = border_right-my_tooltip.width()-offset;
                    }
	
                    if(border_top + (offset *2)>= kmouse.pageY - my_tooltip.height()){
                        top_pos = border_top +offset;
                    } else {
                        top_pos = kmouse.pageY-my_tooltip.height()-offset;
                    }	
				
                    my_tooltip.css({left:left_pos, top:top_pos});
		}).mouseout(function(){
                    my_tooltip.css({left:"-9999px"});				  
		});
            }
	});
    }
});


var video_player = new Object({
    config: {
        'boxVideoPlayer': '.video-player',
        'videoPlayer': 'video-player_source',
        'progressBarInp': 'video-player__status-line-input',
        'control_box': 'video-player__control',
        'control_box_hide': 'video-player__control_hidden',
        'playButton': 'video-player__control_play-button',
        'pauseButton': 'video-player__control_play-button-stop',
        'soundButton': 'video-player__control_sound-button',
        'muteButton': 'video-player__control_sound-button-mute',
        'soundLevel': 'video-player__control_sound-level-range',
        'soundInput': 'video-player__control_sound-level-range',
        'timeCurrent': 'video-player__control_time-current-mark',
        'timeDuration': 'video-player__control_time-total',
        'fullscreenButton': 'video-player__control_fullscreen-button',
        'playListButton': 'video-player__control_playlist-button',
        'playListBlock': 'video-player__playlist',
        'playListBlockHide': 'video-player__playlist_hide',
        'playlistItem': 'playlist__lists-item',
        'playListItemActive': 'playlist__lists-item_active',
        'playListItemPoster': 'media-bar__lists-item_image-src',
        'rangeClass': 'video-player__progressbar'
    },
    
    init: function () {
        var $self = this;
        $self.initVideo();
        $("."+$self.config.rangeClass).on('hover', function () {$self.timeLineThumb(this);});
        $("."+$self.config.playlistItem).on('click', function () {$self.playlist_change(this)});
        $("."+$self.config.playListButton).on('click', function () {$self.control_playlist_show()})
        $("."+$self.config.playButton).on('click', function () {$self.control_play_pause(this)});
        $("."+$self.config.soundButton).on('click', function () {$self.control_sound_mute(this)});
        $("."+$self.config.fullscreenButton).on('click', function () {$self.control_fullscreen()})
        $("."+$self.config.soundLevel).rangeslider(
            {
                polyfill: false,
                rangeClass: 'video-player__sound',
                horizontalClass: 'video-player__sound_horizontal',
                fillClass: 'video-player__sound_fill',
                handleClass: 'video-player__sound_handle',
                onSlide: function(position, value) {$self.control_sound_level(value)}
            }
        );
    },
    
    initVideo: function () {
        var $self = this;
        video_load = setInterval(function(t){
            if ($("."+$self.config.videoPlayer)[0].readyState > 0) {
                $self.bind_progressbar()
                $self.localstorageSetStart($("."+$self.config.videoPlayer));
                $("."+$self.config.progressBarInp).attr({"min": 0, "max": $("."+$self.config.videoPlayer)[0].duration})
                $self.control_set_time(false, true);
                $("."+$self.config.videoPlayer).on("timeupdate", function() {
                    $self.control_set_time(this);
                    $self.control_progressbar(this.currentTime);
                    $self.localStorageUpdateTime($("."+$self.config.videoPlayer));
                });
                $("."+$self.config.progressBarInp).rangeslider(
                    {
                        polyfill: false,
                        rangeClass: $self.config.rangeClass,
                        horizontalClass: 'video-player__progressbar_horizontal',
                        fillClass: 'video-player__progressbar_fill',
                        handleClass: 'video-player__progressbar_handle',
                        onSlideEnd: function(position, value) 
                        {$self.control_progressbar(value, true)}
                    }
                );
                $self.localStorageGetSound(1);
                clearInterval(video_load);
            }
        },500);
    },
    
    initNewVideo: function (breaker) {
        var $self = this,
            $currTime = 0;
        video_load = setInterval(function(t){
            if ($("."+$self.config.videoPlayer)[0].readyState > 0) {
                $("."+$self.config.progressBarInp).attr({"min": 0, "max": $("."+$self.config.videoPlayer)[0].duration})
                $self.control_set_time(false, true);
                $("."+$self.config.progressBarInp).rangeslider('update', true);
                $self.control_play_pause(null, false, true);
                clearInterval(video_load);
            }
        }, 200);
    },
    
    localstorageSetStart: function (label, key) {
        if (localStorage.getItem('videotimelines') == undefined)
            localStorage.setItem('videotimelines', '{}');
        
        var storage = JSON.parse(localStorage.getItem('videotimelines')),
            storage = (key != undefined) ? storage[key] : storage[label.data("videoKey")];
        
        if (storage != null)
        {
            label[0].currentTime = storage;
        }
        
        return storage;
    },
    
    localStorageUpdateTime: function (label) {
        var $self = this;
            curtime = label[0].currentTime,
            basetime = label[0].duration,
            vikey = label.data("videoKey"),
            storage = JSON.parse(localStorage.getItem('videotimelines'));
    
        if (curtime >= basetime) {
            delete storage[vikey];
            localStorage.setItem('videotimelines', JSON.stringify(storage));
            $self.nextVideo();
        }
        else {
            storage[vikey] = curtime - 2;
            localStorage.setItem('videotimelines', JSON.stringify(storage));
        }
    },
    
    localStorageUpdateSound: function ($volume, $mute) {
        var $self = this;
        
        localStorage.setItem('mute', $mute);
        if ($volume)
            localStorage.setItem('sound_level', $volume);
    },
    
    localStorageGetSound: function ($reload) {
        var $self = this,
            mute = localStorage.getItem("mute"),
            sound = localStorage.getItem("sound_level");
        if ($reload == 1)
        {
            if (mute == 1)
            {
                $("."+$self.config.soundInput).val(0).change()
            }
            else
            {
                $("."+$self.config.soundInput).val(sound).change()
            }
            return false;
        }
        else
        {
            return {mute: mute, sound: sound};
        }
    },
    
    timeLineThumb: function (label) {
        var $self = this;
        console.log(label)
    },
    
    control_playlist_show: function () {
        var $self = this,
            $item = $("."+$self.config.playListBlock);
    
        if ($item.hasClass($self.config.playListBlockHide))
            $item.removeClass($self.config.playListBlockHide);
        else
            $item.addClass($self.config.playListBlockHide);
    },
    
    playlist_change: function (label) {
        var $self = this,
            $item = $(label),
            $items = $("."+$self.config.playlistItem),
            $poster = $item.find("."+$self.config.playListItemPoster).attr("src"),
            $video = $item.data("download");
    
        $($items).removeClass($self.config.playListItemActive);
        $item.addClass($self.config.playListItemActive);
        $("."+$self.config.videoPlayer).attr("poster", $poster);
        $("."+$self.config.videoPlayer).find("source").attr("src", $video);
        $("."+$self.config.videoPlayer).data('video-key', $item.data('video-id'))
                                       .attr('data-video-key', $item.data('video-id'));
        $("."+$self.config.videoPlayer)[0].pause()
        $("."+$self.config.videoPlayer)[0].load();
        $self.initNewVideo(1);
    },
    
    nextVideo: function () {
        var $self = this,
            $activeItem = $("."+$self.config.playListItemActive),
            $items = $("."+$self.config.playlistItem);
        
        if ($activeItem.index() + 1 <= $items.size()) {
            $items.eq($activeItem.index() + 1).trigger('click');
        }
        
    },
    
    bind_progressbar: function () {
        var $self = this;
        $($self.config.boxVideoPlayer).on('click', function () {$(this).focus();})
        $("."+$self.config.videoPlayer).on("dblclick", function () {$self.control_fullscreen()})
        $("."+$self.config.videoPlayer).on("click", function () {$self.control_play_pause(null, true)})
        $($self.config.boxVideoPlayer).on('keydown',function (e) {
            var $cont = false;
            switch (e.keyCode) {
                case 32:
                    $self.control_play_pause(null, true)
                break;
                
                case 39:
                    $self.control_sound_nextprev("next");
                break;
                
                case 37:
                    $self.control_sound_nextprev("prev");
                break;
                
                case 38:
                    $self.control_sound_updown("up");
                break;
                
                case 40:
                    $self.control_sound_updown("down");
                break;
                
                case 77:
                    $self.control_sound_mute(null, true, true)
                break;
                
                case 70:
                    $self.control_fullscreen();
                break;
                
                case 27:
                    $self.control_fullscreen("exit");
                break;
                
                default:
                    $cont = true
                break;
            }

            if (!$cont)
                e.preventDefault();
        })
    },
    
    control_fullscreen: function (type) {
        var $self = this
        var $video = $("."+$self.config.videoPlayer).parent()[0]
        if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || type == "exit") {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        } else {
            if ($video.requestFullscreen) {
                $video.requestFullscreen();
            } else if ($video.mozRequestFullScreen) {
                $video.mozRequestFullScreen();
            } else if ($video.webkitRequestFullscreen) {
                $video.webkitRequestFullscreen();
            }
        }
    },
    
    control_progressbar: function (label, slide) {
        var $self = this;
        var $video = $("."+$self.config.videoPlayer)[0]
        if (slide != undefined)
        {
            $video.currentTime = label
            $video.currentTime = label
        }
        else
        {
            $("."+$self.config.progressBarInp).val($video.currentTime).change()
        }
    },
    
    controlBarHide: function (play) {
        var $self = this,
            $control_hide = $self.config.control_box_hide,
            $player = $self.config.boxVideoPlayer;
    
        if (!play)
        {
            clearTimeout(hiddenControlBarInVideo);
            $($player).removeClass($control_hide);
        }
        else
        {
            hiddenControlBarInVideo = setTimeout(function () {
                $($player).addClass($control_hide);
            }, 3000);
            
            $($player).unbind("mousemove")
            $($player).bind("mousemove", function () {
                clearTimeout(hiddenControlBarInVideo);
                $self.controlBarHide(false);
                $self.controlBarHide(true);
            });
        }
    },
    
    control_play_pause: function (label, stop, nextvideo) {
        var $self = this;
        var $video = $("."+$self.config.videoPlayer)[0]
        
        $($self.config.boxVideoPlayer).addClass("uhidden");
        if (stop != undefined)
            stop = ($("."+$self.config.playButton).hasClass($self.config.pauseButton))
        if (nextvideo == undefined)
        {
            if ($(label).hasClass($self.config.pauseButton) && stop === undefined || stop)
            {
                $("."+$self.config.playButton).removeClass($self.config.pauseButton)
                $($self.config.boxVideoPlayer).removeClass("active");
                $($self.config.boxVideoPlayer).addClass("uhidden");
                $video.pause()
                $self.controlBarHide(false);
            }
            else
            {
                $("."+$self.config.playButton).addClass($self.config.pauseButton)
                $($self.config.boxVideoPlayer).addClass("active");
                $video.play()
                $self.controlBarHide(true);
            }
        } else {
            $("."+$self.config.playButton).addClass($self.config.pauseButton)
            $($self.config.boxVideoPlayer).addClass("active");
            $video.play()
            $self.controlBarHide(true);
        }
            
            
        setTimeout(function () {
            $($self.config.boxVideoPlayer).removeClass("uhidden");
        }, 250);
    },
    
    control_sound_nextprev: function (type) {
        var $self = this;
        var $video = $("."+$self.config.videoPlayer)[0]
        var $duration = Number($video.currentTime);

        if (type == "next")
            $duration = Number($duration) + Number(2);
        else
            $duration = Number($duration) - Number(3);
        $duration = ($duration < 0.01) ? 0 : $duration;
        $duration = ($duration > $video.duration) ? $video.duration : $duration;
        $video.currentTime = $duration;
        $("."+$self.config.progressBarInp).val($duration).change()
    },
    
    control_sound_updown: function (type) {
        var $self = this;
        var $video = $("."+$self.config.videoPlayer)[0]
        var $volume = Number($video.volume);

        if (type == "up")
            $volume = Number($volume) + Number(0.01);
        else
            $volume = Number($volume) - Number(0.01);
        $volume = ($volume < 0.01) ? 0 : $volume;
        $volume = ($volume > 1) ? 1 : $volume;
        
        $video.volume = $volume;
        $volume = $volume * 100
        $("."+$self.config.soundInput).val($volume).change()
        $self.localStorageUpdateSound($volume, 0);
    },
    
    control_sound_level: function (label) {
        var $self = this;
        
        if (Number(label) < 1)
            $self.control_sound_mute(null, false, false)
        else
            $self.control_sound_mute(null, false, true)
    },
    
    control_sound_mute: function (label, control, mute) {
        var $self = this;
        var $video = $("."+$self.config.videoPlayer)[0]
        
        if (control != undefined && control)
            mute = ($("."+$self.config.soundButton).hasClass($self.config.muteButton)) ? true : false;
            
        if ($(label).hasClass($self.config.muteButton) && mute === undefined || mute)
        {
            //Unmute sound
            $("."+$self.config.soundButton).removeClass($self.config.muteButton)
            $video.volume = (Number($("."+$self.config.soundInput).val()) / 100)
            if ($video.volume * 100 > 0)
                $self.localStorageUpdateSound($video.volume * 100, 0);
            else
                $self.localStorageUpdateSound(false, 0);
            if (mute === undefined || label == null && control == true)
                $("."+$self.config.soundInput).val(video_player.localStorageGetSound(0).sound).change();
        }
        else
        {
            //Mute sound
            $("."+$self.config.soundButton).addClass($self.config.muteButton)
            $self.localStorageUpdateSound(false, 1);
            $video.volume = 0
            if (mute === undefined || label == null && control == true)
                $("."+$self.config.soundInput).val(0).change();
        }
    },
    
    control_set_time: function (label, deftime) {
        var $self = this;
        var $video = $("."+$self.config.videoPlayer)[0]
        if (deftime != undefined)
            $("."+$self.config.timeDuration).text(helpers_fn.msecond_to_time($video.duration))        
        $("."+$self.config.timeCurrent).text(helpers_fn.msecond_to_time($video.currentTime))
    }
});


var media_bar = new Object({
    
    config: {
        'bar': 'media-bar',
        'showMore': 'media-bar__show-more',
        'showMoreClose': 'media-bar__show-more_close',
        'layout': 'media-bar__lists-layout',
        'layoutOpen': 'media-bar__lists-layout_open',
        'mediaExample': 'media-bar__lists-example',
        'loadClass': 'media-bar_download',
        'playClass': 'media-bar_play',
        'mediaItemPlay': 'media-bar_play',
        'mediaItemDownload': 'media-bar_download',
        'play_video': 'media-bar__actions-playall',
        'load_video': 'media-bar__actions-download',
        'exampleItem': 'media-bar__lists-item',
        'exampleItemImage': 'media-bar__lists-item_image-src',
        'exampleItemTitle': 'media-bar__lists-item_description-title',
        'exampleItemUpdate': 'chanel-page__playlist-info_value',
        'exampleItemAction': 'media-bar__lists-item-action_item',
        'playCnt': 'media-bar__actions-playall-cnt',
        'loadCnt': 'media-bar__actions-loadall-cnt'
        
    },
    
    init: function () {
        $self = this;
        $("."+$self.config.showMore).on('click', function () {media_bar.showMore(this)});
        $("."+$self.config.play_video).on('click', function () {media_bar.videoAction('play')});
        $("."+$self.config.load_video).on('click', function () {media_bar.videoAction('load')});
        $self.loadItems();
    },
    
    videoAction: function (type) {
        var $load_item = JSON.parse(localStorage.getItem(type+'_video')),
            $link = null;
        
        switch (type) {
            case 'play':
                $link = '/play-video/';
            break;
            
            case 'load':
                $link = '/load-video/';
            break;
        }

        $.post($link, {data: $load_item}, function (data) {
            document.location.href = $link;
        })
    },
    
    loadItems: function () {
        var $self = this,
            $storage = {play: JSON.parse(localStorage.getItem('play_video')), load: JSON.parse(localStorage.getItem('load_video'))},
            $items = {},
            $loadCnt = 0,
            $playCnt = 0;

        for (var itm in $storage.load)
        {
            if (typeof $items[itm] === "undefined")
            {
                $items[itm] = $storage.load[itm];
                $items[itm]['load'] = true;
            }
            else
            {
               $items[itm]['load'] = true; 
            }
            $loadCnt++;
        }
        
        for (var itm in $storage.play)
        {
            if (typeof $items[itm] === "undefined")
            {
                $items[itm] = $storage.play[itm];
                $items[itm]['play'] = true;
            }
            else
            {
               $items[itm]['play'] = true; 
            }
            $playCnt++;
        }

        $("."+$self.config.loadCnt).text($loadCnt);
        $("."+$self.config.playCnt).text($playCnt);
        this.appendItems($items);
    },
    
    appendItems: function (label) {
        var $self = this,
            length = Object.keys(label).length,
            lists = $self.config.layout,
            example = $self.config.exampleItem;
        
        $("."+lists).html("");
        
        if (length > 0) {

            for (var item in label) {
                if (typeof label[item].load != "undefined")
                    $("."+example).addClass($self.config.loadClass);
                else
                    $("."+example).removeClass($self.config.loadClass);
                
                if (typeof label[item].play != "undefined")
                    $("."+example).addClass($self.config.playClass);
                else
                    $("."+example).removeClass($self.config.playClass);
                var action_load = $("."+example).find("."+$self.config.exampleItemAction).eq(1);
                var action_play = $("."+example).find("."+$self.config.exampleItemAction).eq(0);
                $("."+example).attr({'data-url': label[item].url, 'data-id': item, 'data-download': label[item].download});
                $("."+example).find("."+$self.config.exampleItemImage).attr("src", label[item].image);
                $("."+example).find("."+$self.config.exampleItemTitle).text(label[item].title);
                $("."+example).find("."+$self.config.exampleItemUpdate).text(label[item].update);
                $("."+example).find("."+$self.config.exampleItemAction+" input").attr({
                    'value': label[item].value,
                    'data-update': label[item].update,
                    'data-url': label[item].url,
                    'data-download': label[item].download,
                    'data-image': label[item].image,
                    'data-value': label[item].value
                });
                action_load.find("input").attr({
                    'id': 'media-check-to-load_'+label[item].value,
                    'data-type': 'load',
                });
                action_play.find("input").attr({
                    'id': 'media-check-to-play_'+label[item].value,
                    'data-type': 'play',
                });
                
                $("."+example).find("."+$self.config.exampleItemAction).eq(1).find("label").attr({'for': 'media-check-to-load_'+label[item].value});
                $("."+example).find("."+$self.config.exampleItemAction).eq(0).find("label").attr({'for': 'media-check-to-play_'+label[item].value});
                
                $("."+lists).append($("."+example).parent().html());
            }
            
            action_video.init();
        }
    },
    
    showMore: function (label) {
        var $self = this,
            block = $(label);
            
        block.parents("."+$self.config.bar).find("."+$self.config.layout).toggleClass($self.config.layoutOpen);
        block.toggleClass($self.config.showMoreClose);
    }
});

var action_video = new Object({
    config: {
        'input': 'chanel-page__last-video_item-actions-inp',
        'mediainput': 'media-bar__lists-item-action_item',
        'item': 'chanel-page__last-video_item',
        'mediaitem': 'media-bar__lists-item',
        'title': 'chanel-page__last-video_item-title-link',
        'mediatitle': 'media-bar__lists-item_description-title',
        'downloadList': 'download-page_load',
        'downloadListItem': 'download-page__item',
        'downloadListItemHiddenLink': 'download-page_load-hidden',
        'downloadRemoveItem': 'download-page_remove',
        'downloadRemoveClass': 'download-page__item_remove',
        'downloadVideoNumber': 'video_numbers',
        'downloadVideoSize': 'video_size'
    },
    
    init: function () {
        var $self = this;
        
        $self.updateBoxes();
        $("."+$self.config.input+" input, ."+$self.config.mediainput+" input").on('change', function () {$self.setData(this)});
        $("."+$self.config.downloadList).on('click', function () {$self.downloadList(this)});
        $("."+$self.config.downloadRemoveItem).on('click', function () {$self.downloadRemove(this)})
    },
    
    downloadRemove: function (label) {
        var $self = this,
            $block = $(label).parents("."+$self.config.downloadListItem);
    
        $block.addClass($self.config.downloadRemoveClass);
        setTimeout(function () {
            $block.remove();
            $self.downloadUpdate();
            if ($("."+$self.config.downloadListItem).size() == 0)
                document.location.href='/';
        }, 500);
    },
    
    
    downloadUpdate: function () {
        var $self = this,
            $videoCount = $("."+$self.config.downloadVideoNumber),
            $videoSize = $("."+$self.config.downloadVideoSize),
            $cnt = Number($("."+$self.config.downloadListItem).size()),
            $bytes = 0;
            
        $videoCount.text($cnt);
        $("."+$self.config.downloadListItem).each(function () {
            $bytes = Number($bytes) + Number($(this).data('size'));
        });
        console.log($videoSize);
        $videoSize.text(helpers_fn.formatBytes($bytes, 3))
    },
    
    downloadList: function (label) {
        var $self = this,
            $items = $("."+$self.config.downloadListItem),
            $button = $(label),
            $event = null;
        
        if ($button.data("done") == undefined) {
            $items.each(function () {
                $event = new Event("click");
                $(this).append("<a href='"+$(this).data("link")+"' class='"+$self.config.downloadListItemHiddenLink+"' download></a>");
                $(this).find("."+$self.config.downloadListItemHiddenLink)[0].dispatchEvent($event);
            });
        }
        $button.data("done", '1').attr("data-done", '1');

    },

    setData: function (label) {
        var $self = this,
            $info = $(label).data(),
            $val = $(label).val(),
            $new_data = {},
            $storage = {play: localStorage.getItem('play_video'), load: localStorage.getItem('load_video')};
    
        $info['title'] = $(label).parents("."+$self.config.item).find("."+$self.config.title).text();
        if ($info['title'] == "")
            $info['title'] = $(label).parents("."+$self.config.mediaitem).find("."+$self.config.mediatitle).text();
        $new_data['video_'+$val] = $info;
        if (!$info.playlist)
        {
            if ($storage[$info.type] == null)
                localStorage.setItem($info.type+'_video', JSON.stringify($new_data));
            $storage[$info.type] = JSON.parse($storage[$info.type]);
            delete $storage[$info.type]["video_"+$val];
            if (label.checked)
            {
                $storage[$info.type]["video_"+$val] = $info;
            }

            localStorage.setItem($info.type+'_video', JSON.stringify($storage[$info.type]));
        }
        
        media_bar.loadItems();
    },
    
    updateBoxes: function () {
        var $self = this,
            $storage = {play: localStorage.getItem('play_video'), load: localStorage.getItem('load_video')};
            $boxes = $("."+$self.config.input+" input");

        if ($("."+$self.config.mediainput).size() > 2)
            $boxes = $("."+$self.config.input+" input, ."+$self.config.mediainput+" input");
        
        $boxes.each(function () {
            var $sf = $(this),
                $stor = JSON.parse($storage[$sf.data("type")]);
            if ($stor != null)
                if (typeof $stor["video_"+$sf.val()] == "object")
                {
                    $sf[0].checked = true;
                }
        })
    }
});

$().ready(function () {
    if ($("video").size() > 0)
        video_player.init();
    helpers_fn.tooltip(".tooltip-title","tooltip");
    media_bar.init();
    action_video.init();
    $(".media-bar__lists-layout").slimScroll({
        allowPageScroll: true
    });
})