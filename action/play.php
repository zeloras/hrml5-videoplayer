<div class="chanel-page__video">
    <div class="chanel-page__video-player">
        <div class="video-player uhidden" tabindex="1">
            <div class="video-player_top-bar">
                <div class="video-player_top-bar_video-title">
                    <?=$video[0]['title']?>
                </div>
            </div>
            <div class="video-player__play-stop"></div>
            <div class="video-player__playlist video-player__playlist_hide noSelect">
                <ul class="video-player__playlist_list">
                    <?foreach ($video as $key => $item) {?>
                        <li class="playlist__lists-item <?if ($key < 1) {?>playlist__lists-item_active<?}?>" data-url="<?=$item['url']?>" data-id="video_<?=$item['id']?>" data-video-id="<?=$item['id']?>_<?=$item['chanel_id']?>" data-download="<?=$item['video_path']?>">
                            <div class="media-bar__lists-item_image">
                                <img class="media-bar__lists-item_image-src" src="<?=$item['image']?>">
                            </div>
                            <div class="media-bar__lists-item_description">
                                <div class="media-bar__lists-item_description-title">
                                    <?=$item['title']?>
                                </div>
                            </div>
                        </li>
                    <?}?>
                </ul>
                <div class="video-player__playlist-element-example">
                    <ul class="video-player__playlist-element-example_list">
                        <li class="media-bar__lists-item" data-url="" data-id="" data-download="">
                            <div class="media-bar__lists-item_image">
                                <img class="media-bar__lists-item_image-src" src="#">
                            </div>
                            <div class="media-bar__lists-item_description">
                                <div class="media-bar__lists-item_description-title">
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <video class="video-player_source" data-video-key="<?=$video[0]['id'].'_'.$video[0]['chanel_id']?>" poster="<?=$video[0]['image']?>">
                <source src="<?=$video[0]['video_path']?>" type="video/webm">
            </video>
            <div class="video-player__control">
                <div class="video-player__status-line">
                    <input class="video-player__status-line-input" type="range" min="0" max="100" step="1" value="0" data-orientation="horizontal">
                </div>
                <div class="video-player__control_line">
                    <div class="video-player__control_left-side">
                        <div class="video-player__control_play-button"></div>
                        <div class="video-player__control_sound">
                            <div class="video-player__control_sound-button"></div>
                            <div class="video-player__control_sound-level">
                                <input class="video-player__control_sound-level-range" type="range" min="0" max="100" step="1" value="100" data-orientation="horizontal">
                            </div>
                        </div>
                        <div class="video-player__control_time-button">
                            <span class="video-player__control_time-current-mark">0:00:00</span> / <span class="video-player__control_time-total">0:00:00</span>
                        </div>
                    </div><!--

                    --><div class="video-player__control_right-side">
                        <div class="video-player__control_fullscreen-button"></div>
                        <div class="video-player__control_playlist-button"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="chanel-page__video-title">Мой плейлист</div>
</div>