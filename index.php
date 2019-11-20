<html>
    <head>
        <title>Архив канала</title>
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,700,600,300' rel='stylesheet' type='text/css'>
        <link href="/templates/public/default/css/main.css" type="text/css" rel="stylesheet">
    </head>
    <body class="chanel-page">
        <div class="media-bar">
            <div class="media-bar__lists">
                <ul class="media-bar__lists-layout noSelect"></ul>
                <ul class="media-bar__lists-example">
                    <li class="media-bar__lists-item" data-url="">
                        <div class="media-bar__lists-item_image">
                            <img class="media-bar__lists-item_image-src" src="">
                        </div>
                        <div class="media-bar__lists-item_description">
                            <div class="media-bar__lists-item_description-title"></div>
                            <div class="media-bar__lists-item_description-info">
                                <span class="chanel-page__playlist-info_title">Последний апдейт: </span>
                                <span class="chanel-page__playlist-info_value"></span>
                            </div>
                        </div>
                        <div class="media-bar__lists-item-action">
                            <div class="media-bar__lists-item-action_item">
                                <input type="checkbox" value="0" id="0">
                                <label for="0" class="chanel-page__last-video_item-actions-label">
                                    для просмотра
                                </label>
                            </div><!--
                         --><div class="media-bar__lists-item-action_item">
                                <input type="checkbox" value="0" id="0">
                                <label for="0" class="chanel-page__last-video_item-actions-label">
                                    для скачивания
                                </label>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="media-bar__actions">
                <div class="media-bar__actions-playall">
                    Воспросизвести <span class="media-bar__actions-playall-cnt">288</span> видео
                </div><!--
                --><div class="media-bar__actions-download">
                    Скачать <span class="media-bar__actions-loadall-cnt">2</span> видео
                </div>
            </div>
            <div class="media-bar__show-more">
                <span class="media-bar__show-more_arrow media-bar__show-more_arrow-1st"></span>
                <span class="media-bar__show-more_arrow media-bar__show-more_arrow-2st"></span>
                <span class="media-bar__show-more_arrow media-bar__show-more_arrow-3st"></span>
            </div>
        </div>
        <div class="chanel-page__main">
            <div class="chanel-page__main-head">
                <div class="chanel-page__head-background">
                    <div class="chanel-page__head-logo">
                        <a href="#" class="chanel-page__head-logo_link">
                            <img src="#" class="chanel-page__head-logo_img">
                        </a>
                    </div>
                    <div class="chanel-page__head-links">
                        <ul class="chanel-page__head-links-list">
                            <li class="chanel-page__head-links_item chanel-page__head-links_item-icon-yt">
                                <a href="#" target="_blank" class="chanel-page__head-links_item-link">Канал Ютаб</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="chanel-page__main-menu">
                <ul class="chanel-page__main-menu_list">
                    <li class="chanel-page__main-menu_item">
                        <a href="/" class="chanel-page__main-menu_item-link">Последние видео</a>
                    </li>
                    <li class="chanel-page__main-menu_item">
                        <a href="/video-list/" class="chanel-page__main-menu_item-link">Все видео</a>
                    </li>
                    <li class="chanel-page__main-menu_item">
                        <a href="/playlists/" class="chanel-page__main-menu_item-link">Плейлисты</a>
                    </li>
                    <li class="chanel-page__main-menu_item">
                        <a href="/about/" class="chanel-page__main-menu_item-link">О канале</a>
                    </li>
                </ul>
            </div>
            <div class="chanel-page__main-content">
                <?=$content?>
            </div>
            <div class="chanel-page__main-footer">
                <div class="chanel-page__main-footer_left-block">
                    <ul class="chanel-page__main-footer_menu-list">
                        <li class="chanel-page__main-footer_menu-item">
                            <a href="#" class="chanel-page__main-footer_menu-link">Список каналов</a>
                        </li>
                        <li class="chanel-page__main-footer_menu-item">
                            <a href="#" class="chanel-page__main-footer_menu-link">Информация/Контакты</a>
                        </li>
                        <li class="chanel-page__main-footer_menu-item">
                            <a href="#" class="chanel-page__main-footer_menu-link">Лента обновлений</a>
                        </li>
                    </ul>
                </div><!--
                --><div class="chanel-page__main-footer_right-block">
                    we are animals
                </div>
            </div>
        </div>
        <script src="/templates/public/artgames/js/libs/jquery-2.1.4.min.js"></script>
        <script src="/templates/public/artgames/js/libs/jquery.slimscroll.min.js"></script>
        <script src="/templates/public/artgames/js/libs/rangeslider.min.js"></script>
        <script src="/templates/public/artgames/js/main.js"></script>
    </body>
</html>