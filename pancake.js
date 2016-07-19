    var  URL_SHARE_IMG = "http://didi.kuaidadi.com/static/img/20337fe3e31ed1517cc9fbe03101e1f2.jpg",
    CSS_HOLDER_BATTER = "batter",
    CSS_HOLDER_PAN = "pan",
    CSS_HOLDER_PAN_SAUCE = "pan_sauce",
    CSS_HOLDER_PAN_CHILLI = "pan_chilli",
    CSS_HOLDER_plate = "plate",
    CSS_TIP_TOP_SPREAD = "spread",
    CSS_TIP_TOP_SPREAD_EGG = "spread_egg",
    CSS_TIP_TOP_SWIPUP = "swipup",
    CSS_TIP_TOP_SWIPDOWN = "swipdown",
    CSS_TIP_TOP_BUTTER_BRUSH = "butter-brush",
    CSS_TIP_TOP_CHILLI_BRUSH = "chilli-brush",
    CSS_TOOL_RAKE = "rake",
    CSS_EGGS_THREE = "eggs3",
    CSS_EGGS_TWO = "eggs2",
    CSS_EGGS_ONE = "eggs1",
    CSS_PANCAKE = "pancake",
    CSS_ANIMATION_NOTICE = "notice",
    CSS_ANIMATION_INBAG = "inBag",
    CSS_ANIMATION_ROTATEBAG = "rotateBag",
    CSS_ANIMATION_ANIMATED = "animated",
    CSS_ANIMATION_FADEOUT = "fadeOut",
    CSS_ANIMATION_FADEIN = "fadeIn",
    CSS_ANIMATION_LANDING = "landing",
    CSS_ANIMATION_RISE = "rise",
    SCORE_BASIC = [85, 70, 75, 70, 80, 85, 75, 90],
    //SCORE_BASIC = [85],
    CSS_CAKE = "cake",
    CSS_YOLK = "yolk",
    query = {},
    URL_SHARE;

$(window).on("load", function () {

    query.gift = true;

    /*URL_SHARE = Arg.url(location.href, query);

    wxShare.init({
        friends: {
            title: '摊个煎饼，聊聊人生', // 分享标题
            desc: '我摊了一个煎饼，你也来摊一个吧！', // 分享描述
            link: URL_SHARE, // 分享链接
            imgUrl: URL_SHARE_IMG, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: ''
        },
        timeline: {
            title: '摊个煎饼，聊聊人生', // 分享标题
            link: URL_SHARE, // 分享链接
            imgUrl: URL_SHARE_IMG // 分享图标
        }
    });*/

    var $viewhome = $(".button").eq(0),
        $logo = $(".logo"),
        $pot = $(".m-pot").eq(0),
        $home = $(".m-home").eq(0),
        $reward = $('[data-role="reward"]'),
        $pancake = $(".m-pancake").eq(0),
        $score = $(".m-score").eq(0),
        $rewardPop = $(".m-reward-pop").eq(0),
        $notice = $(".m-notice").eq(0),
        $panel = $(".js-panel").eq(0),
        $holder = $('[data-role="holder"]'),
        $tip = $('[data-role="tip"]'),
        $tipTop = $('[data-role="tip-top"]'),
        $bowl = $('[data-role="bowl"]'),
        $next = $('[data-role="tip-next"]'),
        $eggs = $('[data-role="eggs"]'),
        $tool = $('[data-role="tool"]'),
        $shareNotice = $('[data-role="share-notice"]'),
        css_cake,
        css_yolk,
        score,
        sceneMap = {
            home: {
                enter: function () {
                    $holder.removeClass().addClass(CSS_HOLDER_BATTER);
                    $tip.removeClass().addClass(CSS_HOLDER_BATTER);
                    this.ready();
                },
                ready: function () {
                    var toggleflag = false;
                    var hammer = this.hammer = new Hammer($viewhome[0]);
                    hammer.on("tap", function (evt) {
                        evt.preventDefault();
                        if (toggleflag) return;
                        toggleflag = true;
                        var $home_logo = $(".l-title");
                        var $button = $(".button");
                        var $car = $(".car");
                        var $city = $(".top-view");
                        var $people = $(".people");
                        $home_logo.addClass("go_home_logo");
                        $button.addClass("go_home_button");
                        $car.addClass("go_car");
                        $city.addClass("go_city");
                        setTimeout(function () {
                            sceneQueue.next();
                            $home_logo.removeClass("go_home_logo");
                            $button.removeClass("go_home_title");
                            $car.removeClass("go_home_bus");
                            $city.removeClass("go_home_city");
                        }, 2000);
                    });
                },
                exit: function () {
                    //$logo.hide();
                    $viewhome.hide();
                    this.hammer && this.hammer.off("tap");
                }
            },
            pan: {
                enter: function () {
                    $pancake.show();
                    $panel.empty();
                    $holder.removeClass().addClass(CSS_HOLDER_BATTER);
                    $tip.removeClass().addClass(CSS_HOLDER_BATTER);
                    var index = Math.ceil(SCORE_BASIC.length * Math.random());

                    score = SCORE_BASIC[index - 1];

                    css_cake = CSS_CAKE + index;
                    css_yolk = CSS_YOLK + index;

                    this.ready();
                },
                ready: function () {
                    $tip.addClass(CSS_ANIMATION_NOTICE);
                    var hammer = this.hammer = new Hammer($tip.get(0));
                    hammer.on("tap", function (evt) {
                        evt.preventDefault();
                        hammer.off("tap");
                        sceneQueue.next();
                    });
                },
                exit: function () {
                    $tip.removeClass();
                }
            },
            cake: {
                template: ['<div class="cakePanel" data-role="cakeWrapper">',
                                '<div class="cakeFrame js-cake-frame">',
                                    '<div class="cakeInner js-cake-inner">',
                                        '<div data-role="cake"></div>',
                                        '<div class="sauce js-sauce-frame"></div>',
                                    '</div>',
                                '</div>',
                            '</div>'].join(""),
                enter: function () {
                    $holder.removeClass().addClass(CSS_HOLDER_PAN);
                    $tipTop.addClass(CSS_TIP_TOP_SPREAD).addClass(CSS_ANIMATION_NOTICE);
                    $panel.append(this.template);
                    var $cakeWrapper = $('[data-role="cakeWrapper"]'),
                        $cake = $('[data-role="cake"]'),
                        hammer = this.hammer_cake = new Hammer($panel.get(0)),
                        scale = 1,
                        step = 0.02,
                        end = 3,
                        me = this,
                        done;

                    $cake.addClass(css_cake);
                    hammer.get('pan').set({direction: Hammer.DIRECTION_VERTICAL});

                    hammer.on('panstart', function () {
                        $tipTop.removeClass();
                    });

                    hammer.on('pan', function (evt) {
                        evt.preventDefault();

                        scale += step;

                        if (scale >= end) {
                            scale = end;
                            hammer.off('pan');
                        }

                        requestAnimationFrame(function () {
                            $cakeWrapper.css({
                                "-webkit-transform": "scale(" + scale + ")",
                                "-moz-transform": "scale(" + scale + ")",
                                "-ms-transform": "scale(" + scale + ")",
                                "-o-transform": "scale(" + scale + ")",
                                "transform": "scale(" + scale + ")"
                            });

                            if (scale >= end && !done) {
                                done = true;
                                me.ready();
                            }
                        });
                    });
                },
                ready: function () {
                    $bowl.show();
                    $next.show().addClass(CSS_ANIMATION_NOTICE);

                    var hammer = this.hammer = new Hammer($bowl.get(0));
                    hammer.on("tap", function (evt) {
                        evt.preventDefault();
                        hammer.off("tap");
                        sceneQueue.next();
                    });
                },
                exit: function () {
                    $holder.removeClass();
                    this.hammer_cake.off("pan panstart");
                }
            },
            egg: {
                template: '<div data-role="eggs-batter"></div>',
                enter: function () {
                    $holder.removeClass().addClass(CSS_HOLDER_plate);
                    $tip.removeClass().addClass(CSS_HOLDER_plate).addClass(CSS_ANIMATION_NOTICE);
                    $eggs.removeClass().addClass(CSS_EGGS_THREE).show();
                    $bowl.hide();

                    var hammer = this.hammer = new Hammer($eggs.get(0)),
                        $cakeInner = $(".js-cake-inner").eq(0),
                        $eggsBatter,
                        me = this;

                    $cakeInner.append(me.template);
                    $eggsBatter = $cakeInner.find('[data-role="eggs-batter"]');

                    hammer.on("tap", function (evt) {
                        evt.preventDefault();
                        me.ready();
                        if ($eggs.hasClass(CSS_EGGS_THREE)) {
                            $eggsBatter.removeClass().addClass(CSS_EGGS_ONE);
                            $eggs.removeClass().addClass(CSS_EGGS_TWO);
                        } else if ($eggs.hasClass(CSS_EGGS_TWO)) {
                            $eggsBatter.removeClass().addClass(CSS_EGGS_TWO);
                            $eggs.removeClass().addClass(CSS_EGGS_ONE);
                        } else {
                            $eggsBatter.removeClass().addClass(CSS_EGGS_THREE);
                            $eggsBatter.addClass(CSS_EGGS_ONE);
                            $eggs.removeClass();
                            $bowl.hide();
                        }
                    });

                },
                ready: function () {
                    if(this.done) {
                        return;
                    }
                    this.done = true;
                    $tip.removeClass();
                    $tipTop.addClass(CSS_TIP_TOP_SPREAD_EGG).addClass(CSS_ANIMATION_NOTICE);

                    var hammer_batter = this.hammer_batter = new Hammer($('[data-role="eggs-batter"]').get(0));

                    hammer_batter.get('pan').set({direction: Hammer.DIRECTION_VERTICAL});

                    hammer_batter.on('pan', function () {
                        sceneQueue.next();
                    });

                },
                exit: function () {
                    this.done = false;
                    $tipTop.removeClass();
                    this.hammer.off("tap");
                    this.hammer_batter.off("pan");
                }
            },
            yolk: {
                template: '<div data-role="yolk"></div>',
                enter: function () {
                    $bowl.hide();

                    var $cakeInner = $(".js-cake-inner");

                    $cakeInner.append(this.template);
                    $('[data-role="yolk"]').addClass(css_yolk);
                    this.ready();

                },
                ready: function () {
                    $tipTop.removeClass();
                    var me = this;

                    $('[data-role="eggs-batter"]').hide();
                    $('[data-role="yolk"]').css({
                        opacity: 1
                    });
                    $bowl.show();

                    var hammer = me.hammer_next = new Hammer($bowl.get(0));
                    hammer.on('tap', function (evt) {
                        evt.preventDefault();
                        hammer.off("tap");
                        sceneQueue.next();
                    });

                },
                exit: function () {
                    $eggs.hide();
                    $next.hide();
                    this.hammer_next.off("tap");
                }
            },
            sauce: {
                enter: function () {
                    $holder.removeClass().addClass(CSS_HOLDER_PAN_SAUCE);
                    $tip.removeClass().addClass(CSS_HOLDER_PAN_SAUCE).addClass(CSS_ANIMATION_NOTICE);

                    var $cakeInner = $(".js-cake-inner").eq(0),
                        hammer,
                        hammer_tip = this.hammer_tip = new Hammer($tip.get(0)),
                        me = this;

                    hammer_tip.on("tap", function (evt) {
                        evt.preventDefault();
                        hammer_tip.off("tap");

                        $tipTop.removeClass().addClass(CSS_TIP_TOP_BUTTER_BRUSH).addClass(CSS_ANIMATION_NOTICE);

                        hammer = me.hammer = canvasAppend($panel, "rgba(83,45,25,1)", "rgba(83,45,25,0.6)");
                        $tip.removeClass();

                        hammer.on('panstart', function () {
                            $tipTop.removeClass();
                        });

                        hammer.on('panend', function () {
                            me.ready();
                        });
                    });
                },
                ready: function () {
                    if (this.done) {
                        return;
                    }

                    this.done = true;
                    $next.show();

                    var hammer = this.hammer_next = new Hammer($bowl.get(0));
                    hammer.on('tap', function (evt) {
                        evt.preventDefault();
                        hammer.off("tap");
                        sceneQueue.next();
                    });
                },
                exit: function () {
                    var $canvas = this.hammer.$canvas,
                        canvas = $canvas.get(0),
                        $img = $('<img/>');

                    this.done = false;

                    $img.attr("src", canvas.toDataURL()).css({
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: parseInt($canvas.attr("width"), 10) / 3,
                        height: parseInt($canvas.attr("height"), 10) / 3,
                        "border-radius": parseInt($canvas.attr("width"), 10) / 2
                    }).appendTo($(".js-cake-inner").eq(0));

                    $canvas.remove();

                    this.hammer.off("panmove panend panstart");
                    $next.hide();
                }
            },
            chilli: {
                enter: function () {
                    $holder.removeClass().addClass(CSS_HOLDER_PAN_CHILLI);
                    $tip.removeClass().addClass(CSS_HOLDER_PAN_CHILLI).addClass(CSS_ANIMATION_NOTICE);

                    var $cakeInner = $(".js-cake-inner").eq(0),
                        hammer,
                        hammer_tip = this.hammer_tip = new Hammer($tip.get(0)),
                        me = this;

                    hammer_tip.on("tap", function (evt) {
                        evt.preventDefault();
                        hammer_tip.off("tap");
                        $tipTop.removeClass().addClass(CSS_TIP_TOP_BUTTER_BRUSH).addClass(CSS_ANIMATION_NOTICE);
                        hammer = me.hammer = canvasAppend($panel, "rgba(207,28,0,1)", "rgba(207,28,0,0.6)");
                        $tip.removeClass();

                        hammer.on('panstart', function () {
                            $tipTop.removeClass()
                        });

                        hammer.on('panend', function () {
                            me.ready();
                        });
                    });
                },
                ready: function () {

                    if (this.done) {
                        return;
                    }

                    this.done = true;
                    $next.show();

                    var hammer = this.hammer_next = new Hammer($bowl.get(0));
                    hammer.on('tap', function (evt) {
                        evt.preventDefault();
                        hammer.off("tap");
                        sceneQueue.next();
                    });
                },
                exit: function () {

                    var $canvas = this.hammer.$canvas,
                        canvas = $canvas.get(0),
                        $img = $('<img/>');

                    this.done = false;

                    $img.attr("src", canvas.toDataURL()).css({
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: parseInt($canvas.attr("width"), 10) / 3,
                        height: parseInt($canvas.attr("height"), 10) / 3,
                        "border-radius": parseInt($canvas.attr("width"), 10) / 2
                    }).appendTo($(".js-cake-inner").eq(0));

                    $canvas.remove();

                    this.hammer.off("panmove panend panstart");
                    $next.hide();
                }
            },
            onion: {
                enter: function () {
                    var $sauceFrame = $(".js-sauce-frame"),
                        ci,
                        MAX = 5;
                    $sauceFrame.css({
                        zIndex: 4
                    });

                    for (var i = 0; i <= MAX - 1; i++) {
                        ci = i;
                        setTimeout(function () {
                            addOnion($sauceFrame, 10);
                        }, 200 * ( ci + 1));
                    }

                    setTimeout(function () {
                        sceneQueue.next();
                    }, 200 * MAX)
                }
            },
            crackers: {
                template: '<div data-role="crackers"></div>',
                enter: function () {
                    $bowl.hide();
                    var $crackers = $(this.template);
                    $(".js-cake-inner").append($crackers);
                    $crackers.css({
                        opacity: 1
                    });
                    sceneQueue.next();
                    $tool.removeClass().addClass(CSS_TOOL_RAKE);
                }
            },
            cover_down: {
                template: '<div data-role="cover_down"></div>',
                enter: function () {
                    $tipTop.removeClass().addClass(CSS_TIP_TOP_SWIPUP).addClass(CSS_ANIMATION_NOTICE);

                    var hammer = new Hammer($panel.get(0)),
                        rem = parseInt($("html").css("fontSize"), 10),
                        height = 4,
                        frame_height = 4,
                        cake_height = 3.1,
                        bottom = -1.9,
                        cover_bottom = -1.9,
                        cake_bottom = -1,
                        $cakeFrame = $(".js-cake-frame").eq(0),
                        $coverDown;

                    $cakeFrame.append(this.template);
                    $coverDown = $('[data-role="cover_down"]');
                    hammer.get('pan').set({direction: Hammer.DIRECTION_VERTICAL});

                    hammer.on('panstart', function (evt) {
                        $tipTop.removeClass();
                        hammer.off('panstart');

                        hammer.on('pan', function (evt) {

                            if (isNaN(evt.deltaY)) {
                                return;
                            }

                            var deltaY = (evt.deltaY / rem / 3 / 10).toFixed(2) - 0;

                            frame_height += deltaY;
                            cover_bottom -= deltaY;

                            if (frame_height > height) {
                                frame_height = height;
                            }

                            if (cover_bottom < bottom) {
                                cover_bottom = bottom;
                            }

                            if (frame_height < cake_height) {
                                frame_height = cake_height;
                                cover_bottom = cake_bottom;
                                hammer.off("pan");
                                hammer.on('panend', function () {
                                    hammer.off("panend");
                                    sceneQueue.next();
                                })
                            }

                            requestAnimationFrame(function () {

                                $cakeFrame.css({
                                    height: frame_height + "rem"
                                });

                                $coverDown.css({
                                    bottom: cover_bottom + "rem"
                                });
                            });
                        });
                    });

                }
            },
            cover_up: {
                template: '<div data-role="cover_up"></div>',
                enter: function () {
                    $tipTop.removeClass().addClass(CSS_TIP_TOP_SWIPDOWN).addClass(CSS_ANIMATION_NOTICE);

                    setTimeout(function () {
                        $tipTop.removeClass();
                    }, 1000);

                    var hammer = new Hammer($panel.get(0)),
                        rem = parseInt($("html").css("fontSize"), 10),
                        height = 3.1,
                        frame_height = 3.1,
                        cake_height = 2.2,
                        top = -2,
                        cover_top = -2,
                        cake_top = -1.1,
                        $cakeFrame = $(".js-cake-frame").eq(0),
                        $cakeInner = $(".js-cake-inner").eq(0),
                        $coverUp;

                    $cakeFrame.append(this.template);
                    $coverUp = $('[data-role="cover_up"]');
                    hammer.get('pan').set({direction: Hammer.DIRECTION_VERTICAL});

                    hammer.on('panstart', function (evt) {
                        $tipTop.removeClass();
                        hammer.off('panstart');
                    });

                    hammer.on('pan', function (evt) {

                        if (isNaN(evt.deltaY)) {
                            return;
                        }

                        var deltaY = (evt.deltaY / rem / 3 / 10).toFixed(2) - 0;

                        frame_height -= deltaY;
                        cover_top += deltaY;

                        if (frame_height > height) {
                            frame_height = height;
                        }

                        if (cover_top < top) {
                            cover_top = top;
                        }

                        if (frame_height < cake_height) {
                            frame_height = cake_height;
                            cover_top = cake_top;
                            hammer.off("pan");
                            sceneQueue.next();
                        }

                        requestAnimationFrame(function () {

                            $cakeFrame.css({
                                height: frame_height + "rem",
                                top: height - frame_height + "rem"
                            });

                            $cakeInner.css({
                                top: frame_height - height + "rem"
                            });

                            $coverUp.css({
                                top: cover_top + "rem"
                            });
                        });
                    });
                },
                exit: function () {
                    $(".js-cake-frame").css({
                        height: "4em",
                        top: "0"
                    });

                    $('[data-role="cover_down"]').remove();
                    $('[data-role="cover_up"]').remove();
                    $('.js-cake-inner').css({
                        top: "0"
                    }).children().not('[data-role="cake"]').remove();
                }
            },
            cover: {
                enter: function () {
                    $('[data-role="cake"]').removeClass().addClass(CSS_PANCAKE);
                    setTimeout(sceneQueue.next, 1000);
                },
                exit: function () {
                    $pancake.hide();
                }
            },
            share: {
                enter: function () {
                    //$logo.show();
                    $score.show();

                    var $bagBack = $('[data-role="bag_back"]'),
                        $bagFront = $('[data-role="bag_front"]'),
                        $cake = $('[data-role="cake_score"]'),
                        $clothTransition = $('[data-role="cloth_transition"]'),
                        $scoreWrapper = $('[data-role="scoreWrapper"]'),
                        $clothLast = $('[data-role="cloth_last"]'),
                        $cakeLast = $('[data-role="cake_last"]'),
                        rem = parseInt($("html").css("fontSize"), 10);

                    $bagBack.show();
                    $bagFront.show();
                    $cake.show();
                    $clothTransition.show();

                    //煎饼入袋
                    $bagBack.addClass(CSS_ANIMATION_INBAG);
                    $bagFront.addClass(CSS_ANIMATION_INBAG);

                    //饼袋旋转
                    $bagBack.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function (evt) {

                        if (evt.animationName === CSS_ANIMATION_INBAG) {
                            $bagBack.css({
                                left: "8rem"
                            }).addClass(CSS_ANIMATION_ROTATEBAG);
                            $bagFront.css({
                                left: "8rem"
                            }).addClass(CSS_ANIMATION_ROTATEBAG);
                            $cake.addClass(CSS_ANIMATION_ROTATEBAG);
                        }


                        $bagBack.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function (evt) {
                            if (evt.animationName === CSS_ANIMATION_ROTATEBAG) {
                                var bottom = ( $(window).height() - $cake.position().top - $cake.height() ) / rem - 1;
                                $bagBack.hide();
                                $bagFront.hide();
                                $cake.hide();
                                $cakeLast.css({
                                    bottom: bottom + "rem"
                                }).show().addClass(CSS_ANIMATION_LANDING);

                                $clothTransition.show().addClass(CSS_ANIMATION_RISE);
                            }

                            $cakeLast.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function (evt) {
                                if (evt.animationName === CSS_ANIMATION_LANDING) {
                                    $bagBack.hide().removeClass().removeAttr("style");
                                    $bagFront.hide().removeClass().removeAttr("style");
                                    $cake.hide().removeClass().removeAttr("style");
                                    $clothTransition.hide().removeClass(CSS_ANIMATION_RISE);
                                    $cakeLast.hide();

                                    $cake.hide();
                                    $scoreWrapper.show();
                                    $clothLast.show();
                                }
                            });

                        });

                    });

                    //score
                    var scoreHTML = "";
                    (score + "").replace(/\d/g, function (s) {
                        scoreHTML += '<i class="fat fat' + s + '"></i>';
                    });

                    $('[data-role="score"]').html(scoreHTML);

                    //percent
                    var percentHTML = "",
                        percent = score + Math.round(3 * Math.random());
                    ( percent + "" ).replace(/\d/g, function (s) {
                        percentHTML += '<i class="thin thin' + s + '"></i>';
                    });

                    $('[data-role="percent"]').html(percentHTML);

                    var titleClass = ["chef", "crackers_king", "pancake_man"][( Math.ceil(3 * Math.random()) - 1 )],
                        title = {
                            "chef": "食神",
                            "crackers_king": "薄脆之王",
                            "pancake_man": "煎饼之王"
                        }[titleClass];

                    $('[data-role="title"]').html('<span class="' + titleClass + '"></span>');

                    var hammer = this.hammer = new Hammer($('[data-role="replay"]').get(0));

                    hammer.on("tap", function (evt) {
                        evt.preventDefault();
                        hammer.off("tap");
                        $score.hide();
                        typeof TDAPP !== 'undefined' && TDAPP.onEvent("再摊一份");
                        sceneQueue.goTo(sceneQueue.indexOf("pan"));
                    });

                    var hammer_reward = this.hammer_reward = new Hammer($('[data-role="reward1"]').get(0));

                    hammer_reward.on("tap", function (evt) {
                        //$logo.hide();
                        //$(".media-wrap").hide();
                        evt.preventDefault();
                        $rewardPop.show();
                        typeof TDAPP !== 'undefined' && TDAPP.onEvent("领取煎饼");
                        var hammer = new Hammer($rewardPop.find('[data-role="close"]').get(0));

                        hammer.on("tap", function (evt) {
                            evt.preventDefault();
                            $rewardPop.hide();
                            hammer.off("tap");
                        });
                    });

                    //var hammer_share = this.hammer_share = new Hammer($('[data-role="share"]').get(0));

                    wxShare.init({
                        friends: {
                            title: '摊个煎饼，聊聊人生', // 分享标题
                            desc: '我摊了一个' + score + '分煎饼，打败了朋友圈' + percent + '%的人，获得“' + title + '”称号', // 分享描述
                            link: URL_SHARE, // 分享链接
                            imgUrl: URL_SHARE_IMG, // 分享图标
                            type: '', // 分享类型,music、video或link，不填默认为link
                            dataUrl: ''
                        },
                        timeline: {
                            title: '我摊了一个' + score + '分煎饼，打败了朋友圈' + percent + '%的人，获得“' + title + '”称号',
                            link: URL_SHARE, // 分享链接
                            imgUrl: URL_SHARE_IMG // 分享图标
                        }
                    });

                    /*hammer_share.on("tap", function (evt) {
                        evt.preventDefault();
                        //$logo.hide();
                        //$(".media-wrap").hide();
                        $shareNotice.show();

                        var hammer_notice = new Hammer($shareNotice.get(0));
                        typeof TDAPP !== 'undefined' && TDAPP.onEvent("点击分享按钮");
                        hammer_notice.on("tap", function (evt) {
                            evt.preventDefault();
                            hammer_notice.off("tap");
                            //$logo.show();
                            //$(".media-wrap").show();
                            $shareNotice.hide();
                        });

                    });*/

                },
                exit: function () {
                    $score.hide();
                    //this.hammer_share.off("tap");

                    var $scoreWrapper = $('[data-role="scoreWrapper"]'),
                        $clothLast = $('[data-role="cloth_last"]');

                    $scoreWrapper.hide();
                    $clothLast.hide();

                    this.hammer_reward.off("tap");
                }
            }
        },
        sceneQueue = ["home", "pan", "cake", "egg", "yolk", "sauce", "chilli", "onion", "crackers", "cover_down", "cover_up", "cover", "share"];

    Pace.on("done", function () {
        $("#container").show();

        //判断进入条件
        var search = location.search,
            parameters = {};

        search.replace("?", "").replace(/[^&]+/g, function (p) {
            p = p.split("=");
            parameters[p[0]] = p[1];
        });

        //进入的分享页面
        if (parameters["gift"]) {
            sceneQueue.splice(0, 1, "gift");
            $home.hide();
            sceneMap.gift = {
                enter: function () {
                    $reward.show();

                    this.hammer_reward = new Hammer($('[data-role="reward2"]').get(0));
                    this.hammer_replay = new Hammer($('[data-role="replay2"]').get(0));

                    this.hammer_reward.on("tap", function (evt) {
                        evt.preventDefault();
                        $rewardPop.show();
                        var hammer = new Hammer($rewardPop.find('[data-role="close"]').get(0));

                        hammer.on("tap", function (evt) {
                            evt.preventDefault();
                            $rewardPop.hide();
                            hammer.off("tap");
                            //$logo.show();
                            //$(".media-wrap").show();
                        });
                    });
                    this.hammer_replay.on("tap", function (evt) {
                        evt.preventDefault();
                        sceneQueue.next();
                    });
                },
                exit: function () {
                    $reward.hide();
                    this.hammer_replay.off("tap");
                    this.hammer_reward.off("tap");
                    $rewardPop.hide();
                }
            };
        }
        sceneQueue.next();
    });

    //global pan
    var hammer = new Hammer(document.body);

    hammer.get('pan').set({direction: Hammer.DIRECTION_VERTICAL});
    hammer.on("pan", function () {
    });

    sceneQueue.current = null;
    sceneQueue.index = -1;
    sceneQueue.next = function () {
        sceneQueue.current && sceneQueue.current.exit && sceneQueue.current.exit.call(sceneQueue.current);
        sceneQueue.index++;
        var scene = sceneMap[sceneQueue[sceneQueue.index]];
        scene && scene.enter();
        sceneQueue.current = scene;
    };
    sceneQueue.goTo = function (index) {
        sceneQueue.index = --index;
        sceneQueue.next();
    };

    function addOnion(container, count) {
        for (var i = 0; i < count; i++) {
            createOnion(4.5, 1.4, 1.4, container);
        }
    }

    /**
     * 撒葱花
     * @param r 煎饼半径
     * @param lgap  煎饼距离左饼铛距离
     * @param tgap  煎饼距离上饼铛距离
     * @param container
     */
    function createOnion(r, lgap, tgap, container) {
        var DEG = 90,
            SCALE = 0.2,
            $onion = $("<span class='onion'>"),
            x, y;

        x = parseFloat(( 2 * r ) * Math.random().toFixed(2));
        y = parseFloat(Math.sqrt(Math.pow(r, 2) - Math.pow(( x - r), 2)).toFixed(2));

        $onion.css({
            left: (lgap + x) / 3 + "rem",
            top: (tgap + r - y + 2 * y * Math.random()) / 3 + "rem",
            "-webkit-transform": "rotate(" + Math.floor(DEG * Math.random()) + "deg) scale(" + ( (SCALE * Math.random().toFixed(1)) + 0.8 ) + ")",
            "-moz-transform": "rotate(" + Math.floor(DEG * Math.random()) + "deg) scale(" + ( (SCALE * Math.random().toFixed(1)) + 0.8 ) + ")",
            "-ms-transform": "rotate(" + Math.floor(DEG * Math.random()) + "deg) scale(" + ( (SCALE * Math.random().toFixed(1)) + 0.8 ) + ")",
            "-o-transform": "rotate(" + Math.floor(DEG * Math.random()) + "deg) scale(" + ( (SCALE * Math.random().toFixed(1)) + 0.8 ) + ")",
            transform: "rotate(" + Math.floor(DEG * Math.random()) + "deg) scale(" + ( (SCALE * Math.random().toFixed(1)) + 0.8 ) + ")",
            opacity: Math.random()
        }).appendTo(container);

    }

    function canvasAppend(container, scolor, ecolor) {
        var rem = parseInt($("html").css("fontSize"), 10),
            w = 12 * rem,
            h = 12 * rem,
            $canvas = $('<canvas width="' + w + 'px" height="' + h + 'px"></canvas>'),
            top = 2 - Math.round(Math.abs(parseInt($pot.css("top"), 10)) / rem);

        //android radius bug: http://segmentfault.com/a/1190000002496938
        $canvas.css({
            position: "absolute",
            "border-radius": w / 2,
            /*"border-top-left-radius": w / 2,
             "border-top-right-radius": w / 2,
             "border-bottom-left-radius": w / 2,
             "border-bottom-right-radius": w / 2,*/
            left: 1 + "rem",
            top: 1 + "rem"
        });

        container.append($canvas);

        var hammer = new Hammer($canvas.get(0)),
            canvas = $canvas.get(0),
            context = canvas.getContext('2d');

        hammer.$canvas = $(canvas);

        var linex = [],
            liney = [];

        function draw(evt, start) {
            var x = ( evt.pointers[0].pageX - 2 * rem);
            var y = ( evt.pointers[0].pageY - top * rem);

            linex.push(x);
            liney.push(y);

            if (start) {
                context.moveTo(x, y);
            } else {
                context.lineTo(x, y);
            }

            context.lineCap = "round";
            context.lineJoin = "round";
            context.lineWidth = 10;
            context.shadowColor = 'white';

            context.strokeStyle = scolor;
            context.globalCompositeOperation = "destination-out";
            context.stroke();
            context.strokeStyle = ecolor;
            context.globalCompositeOperation = "source-over";
            context.stroke();
        }

        hammer.get('pan').set({direction: Hammer.DIRECTION_VERTICAL});

        hammer.on("panstart", function (evt) {
            linex.length = 0;
            liney.length = 0;
            draw(evt, true);
        });

        hammer.on("panmove panend", function (evt) {
            draw(evt);
        });

        return hammer;
    }

    //播放视频
    function Playaudio() {
        var Media = document.getElementById("autoplay");

        var conut = 0;
        //Media.play();
        $("#musicBtn").addClass("music-btn");
        conut = 1;
        $("#musicBtn").click(function () {
            if (conut == 1) {
                Media.pause();
                $("#musicBtn").removeClass("music-btn");
                $("#musicBtn").addClass("music-btn-off");
                conut = 0;
            } else {
                Media.play();
                $("#musicBtn").removeClass("music-btn-off");
                $("#musicBtn").addClass("music-btn");
                conut = 1;
            }
        });
    }

    Playaudio();
});