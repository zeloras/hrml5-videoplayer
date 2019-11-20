<div class="chanel-page__video">
    <div class="chanel-page__video-player">
        <div class="video-player uhidden" tabindex="1">
            <div class="video-player_top-bar">
                <div class="video-player_top-bar_video-title">
                    <?=$videos[0]['name']?>
                </div>
            </div>
            <div class="video-player__play-stop"></div>
            <div class="video-player__playlist video-player__playlist_hide noSelect">
                <ul class="video-player__playlist_list">
                    <?foreach ($videos as $key => $item) {?>
                        <li class="playlist__lists-item <?if ($key < 1) {?>playlist__lists-item_active<?}?>" data-url="<?=$item['url']?>" data-id="video_<?=$item['id']?>" data-video-id="<?=$item['id']?>_<?=$item['chanel_id']?>" data-download="<?=$item['video_path']?>">
                            <div class="media-bar__lists-item_image">
                                <img class="media-bar__lists-item_image-src" src="<?=$item['image']?>">
                            </div>
                            <div class="media-bar__lists-item_description">
                                <div class="media-bar__lists-item_description-title">
                                    <?=$item['name']?>
                                </div>
                            </div>
                        </li>
                    <?}?>
                </ul>
            </div>
            <video class="video-player_source" data-video-key="<?=$videos[0]['id'].'_'.$videos[0]['chanel_id']?>" poster="<?=$videos[0]['image']?>">
                <source src="<?=$videos[0]['video_path']?>" type="video/webm">
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
    <div class="chanel-page__video-title"><?=$playlist['title']?></div>
<div class="chanel-page__video-detail">
    <div class="chanel-page__video-detail_line">
        <?php if ($playlist['id'] > 0) {?>
            <div class="chanel-page__video-detail_playlist">
                <a href="<?=$playlist['url']?>" class="chanel-page__video-detail_playlist-link">
                    <span class="chanel-page__video-detail_playlist-plicon"></span>
                    <span class="chanel-page__video-detail_playlist-title tooltip-title" 
                          title="
                          <div class='playlist-tooltip'>
                            <div class='playlist-tooltip__image'><img src='<?=$playlist['image']?>'></div>
                            <div class='playlist-tooltip__description'>
                                <div class='playlist-tooltip__description-title'>
                                    <?=$playlist['title']?>
                                </div>
                                <div class='playlist-tooltip__description-info'>обновлено <?=$playlist['update_date']?></div>
                                <div class='playlist-tooltip__description-info'><?=$playlist['videos']?> видео</div>
                                <div class='playlist-tooltip__description-info'><?=$playlist['views']?> просмотров</div>
                            </div>
                          </div>
                          ">Плейлист: <?=$playlist['title']?></span>
                </a>
            </div>
        <?}?>
        <div class="chanel-page__video-detail_download">
            <a href="<?=$videos[0]['video_path']?>" class="chanel-page__video-detail_download-link">
                <span class="chanel-page__video-detail_download-dlicon"></span>
                <span class="chanel-page__video-detail_download-title">Скачать: 720p (496mb)</span>
            </a>
        </div>
    </div>
    <div class="chanel-page__video-detail_line">
        <div class="chanel-page__video-detail_additional">Оригенальнал: 
            <a class="chanel-page__video-detail_additional-link" href="<?=$videos[0]['youtube']?>" target="_blank">
                <span class="chanel-page__video-detail_additional-ytbicon"></span>
                <?=$videos[0]['name']?>
            </a>
        </div>
        <div class="chanel-page__video-detail_additional chanel-page__video-detail_additional-views">Просмотров: <?=$videos[0]['views']?></div>
    </div>
    <div class="chanel-page__video-detail_line">
        <div class="chanel-page__video-detail_additional">Добавлено на канал: <?=$videos[0]['create_date']?></div>
    </div>
</div>
    <div class="chanel-page__video-description"><?=$videos[0]['description']?></div>
</div>