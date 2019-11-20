<div class="chanel-page__last-video">
    <h1>Все плейлисты</h1>
    <ul class="chanel-page__last-video_list">
        <?foreach ($playlists as $v) {?>
        <li class="chanel-page__last-video_item">
            <div class="chanel-page__last-video_item-image">
                <a href="<?=$v['url']?>" class="chanel-page__last-video_item-image-link">
                    <img src="<?=$v['image']?>" class="chanel-page__last-video_item-image-src">
                </a>
            </div>
            <div class="chanel-page__last-video_item-title">
                <a href="<?=$v['url']?>" class="chanel-page__last-video_item-title-link">
                    <?=$v['title']?>
                </a>
            </div>
            <div class="chanel-page__last-video_item-actions">
                <div class="chanel-page__last-video_item-actions-box">
                    <div class="chanel-page__last-video_item-actions-inp">
                        <input type="checkbox" 
                                value="<?=$v['id']?>" 
                                id="check-to-load_<?=$v['id']?>"
                                data-type="load"
                                data-playlist="true"
                                data-update="<?=$v['update_date']?>"
                                data-url="<?=$v['url']?>"
                                data-image="<?=$v['image']?>"
                                data-value="<?=$v['id']?>">
                    </div>
                    <label for="check-to-load_<?=$v['id']?>" class="chanel-page__last-video_item-actions-label">
                        для скачивания
                    </label>
                </div>
                <div class="chanel-page__last-video_item-actions-box">
                    <div class="chanel-page__last-video_item-actions-inp">
                        <input type="checkbox" 
                                value="<?=$v['id']?>" 
                                id="check-to-see_<?=$v['id']?>"
                                data-type="play"
                                data-playlist="true"
                                data-update="<?=$v['update_date']?>"
                                data-url="<?=$v['url']?>"
                                data-image="<?=$v['image']?>"
                                data-value="<?=$v['id']?>">
                    </div>
                    <label for="check-to-see_<?=$v['id']?>" class="chanel-page__last-video_item-actions-label">
                        для просмотра
                    </label>
                </div>
            </div>
        <?}?>
    </ul>
</div>
<?=$pagination?>