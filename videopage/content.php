<div class="chanel-page__video">
    <div class="chanel-page__video-player">
        <div class="video-player uhidden" tabindex="1">
            <div class="video-player_top-bar">
                <div class="video-player_top-bar_video-title">
                    <?=$video['title']?>
                </div>
            </div>
            <div class="video-player__play-stop"></div>
            <video class="video-player_source" data-video-key="<?=$video['id'].'_'.$video['chanel_id']?>" poster="<?=$video['image']?>">
                <source src="<?=$video['video_path']?>" type="video/webm">
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
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="chanel-page__video-title"><?=$video['title']?></div>
    <div class="chanel-page__video-detail">
        <div class="chanel-page__video-detail_line">
            <?if ($video['playlist'][0]['id'] > 0) {?>
                <div class="chanel-page__video-detail_playlist">
                    <a href="<?=$video['playlist'][0]['url']?>" class="chanel-page__video-detail_playlist-link">
                        <span class="chanel-page__video-detail_playlist-plicon"></span>
                        <span class="chanel-page__video-detail_playlist-title tooltip-title" 
                              title="
                              <div class='playlist-tooltip'>
                                <div class='playlist-tooltip__image'><img src='<?=$video['playlist'][0]['image']?>'></div>
                                <div class='playlist-tooltip__description'>
                                    <div class='playlist-tooltip__description-title'>
                                        <?=$video['playlist'][0]['title']?>
                                    </div>
                                    <div class='playlist-tooltip__description-info'>обновлено <?=$video['playlist'][0]['update_date']?></div>
                                    <div class='playlist-tooltip__description-info'><?=$video['playlist'][0]['videos']?> видео</div>
                                    <div class='playlist-tooltip__description-info'><?=$video['playlist'][0]['views']?> просмотров</div>
                                </div>
                              </div>
                              ">Плейлист: <?=$video['playlist'][0]['title']?></span>
                    </a>
                </div>
            <?}?>
            <div class="chanel-page__video-detail_download">
                <a href="<?=$video['video_path']?>" class="chanel-page__video-detail_download-link">
                    <span class="chanel-page__video-detail_download-dlicon"></span>
                    <span class="chanel-page__video-detail_download-title">Скачать: 720p (496mb)</span>
                </a>
            </div>
        </div>
        <div class="chanel-page__video-detail_line">
            <div class="chanel-page__video-detail_additional">Оригенальнал: 
                <a class="chanel-page__video-detail_additional-link" href="<?=$video['youtube']?>" target="_blank">
                    <span class="chanel-page__video-detail_additional-ytbicon"></span>
                    <?=$video['title']?>
                </a>
            </div>
            <div class="chanel-page__video-detail_additional chanel-page__video-detail_additional-views">Просмотров: <?=$video['views']?></div>
        </div>
        <div class="chanel-page__video-detail_line">
            <div class="chanel-page__video-detail_additional">Добавлено на канал: <?=$video['update_date']?></div>
        </div>
    </div>
    <div class="chanel-page__video-description"><?=$video['description']?></div>
</div>