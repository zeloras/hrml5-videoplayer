<div class="download-page">
    <div class="download-page__button">
        <div class="chanel-page__video-detail_download">
            <a class="chanel-page__video-detail_download-link download-page_load">
                <span class="chanel-page__video-detail_download-dlicon"></span>
                <span class="chanel-page__video-detail_download-title">Скачать <b class="video_numbers"><?=sizeof($video)?></b> видео (<b class="video_size"><?=$total_size?></b>)</span>
            </a>
        </div>
    </div>
    <ul class="download-page__list">
        <?php foreach ($video as $item) {?>
            <li class="download-page__item" data-link="<?=$item['video_path']?>" data-size="<?=$item['size'][1]?>">
                <div class="download-page__item_image">
                    <img src="<?=$item['image']?>">
                </div>
                <div class="download-page__item_description">
                    <div class="download-page__item_title">
                        <a href="<?=$item['url']?>" target="_blank"><?=$item['title']?></a>
                    </div>
                    <div class="download-page__item_size">
                        <?=$item['size'][0]?>
                    </div>
                    <div class="download-page__item_action">
                        <div class="download-page__item_action-button chanel-page__video-detail_download">
                            <a href="javascript:;" data-video-id="video_<?=$item['id']?>" class="chanel-page__video-detail_download-link download-page_remove">
                                <span class="chanel-page__video-detail_download-title">Удалить</span>
                            </a>
                        </div>
                        <div class="download-page__item_action-progress">
                            <div class="download-page__item_action-progress-bar"></div>
                        </div>
                    </div>
                </div>
            </li>
        <?php } ?>
    </ul>
    <div class="download-page__button">
        <div class="chanel-page__video-detail_download">
            <a class="chanel-page__video-detail_download-link download-page_load">
                <span class="chanel-page__video-detail_download-dlicon"></span>
                <span class="chanel-page__video-detail_download-title">Скачать <b class="video_numbers"><?=sizeof($video)?></b> видео (<b class="video_size"><?=$total_size?></b>)</span>
            </a>
        </div>
    </div>
</div>