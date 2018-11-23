(function(){
var ua = {}, agent = navigator.userAgent, nv = navigator.appVersion, r, m, optmz;
if (window.ActiveXObject || window.msIsStaticHTML) {//ie (document.querySelectorAll)
    /**
     * IE版本号，如果不是IE，此值为 NaN
     * @field
     * @type number
     * @static
     * @name ie
     * @memberOf MUSIC.userAgent
     */
    ua.ie = 6;

    (window.XMLHttpRequest || (agent.indexOf('MSIE 7.0') > -1)) && (ua.ie = 7);
    (window.XDomainRequest || (agent.indexOf('Trident/4.0') > -1)) && (ua.ie = 8);
    (agent.indexOf('Trident/5.0') > -1) && (ua.ie = 9);
    (agent.indexOf('Trident/6.0') > -1) && (ua.ie = 10);
    (agent.indexOf('Trident/7.0') > -1 || 'undefined' == typeof attachEvent) && (ua.ie = 11);

}
ua.macs = agent.indexOf('Mac OS X')>-1;

// unicode emoji
var emojiFiles = ['1f604', '1f60a', '1f603', '263a', '1f609', '1f60d', '1f618', '1f61a', '1f633', '1f601'  // 0
                , '1f60c', '1f61c', '1f61d', '1f612', '1f60f', '1f613', '1f614', '1f61e', '1f616', '1f625'
                , '1f630', '1f628', '1f62b', '1f622', '1f62d', '1f602', '1f632', '1f631', '1f620', '1f621'
                , '1f62a', '1f637', '1f47f', '1f47d', '2764', '1f494', '1f498', '2728', '1f31f', '2757'
                , '2753', '1f4a4', '1f4a6', '1f3b5', '1f525', '1f4a9', '1f44d', '1f44e', '1f44a', '270c'
                , '1f446', '1f447', '1f449', '1f448', '261d', '1f4aa', '1f48f', '1f491', '1f466', '1f467'
                , '1f469', '1f468', '1f47c', '1f480', '1f48b', '2600', '2614', '2601', '26c4', '1f31b'
                , '26a1', '1f30a', '1f431', '1f436', '1f42d', '1f439', '1f430', '1f43a', '1f438', '1f42f'
                , '1f428', '1f43b', '1f43d', '1f42e', '1f417', '1f435', '1f434', '1f40d', '1f426', '1f414'
                , '1f427', '1f41b', '1f419', '1f420', '1f433', '1f42c', '1f339', '1f33a', '1f334', '1f335'
                , '1f49d', '1f383', '1f47b', '1f385', '1f384', '1f381', '1f514', '1f389', '1f388', '1f4bf' // 10
                , '1f4f7', '1f3a5', '1f4bb', '1f4fa', '260e', '1f513', '1f512', '1f511', '1f528', '1f4a1'
                , '1f4eb', '1f6c0', '1f4b0', '1f4a3', '1f52b', '1f48a', '1f3c8', '1f3c0', '26bd', '26be'
                , '26f3', '1f3c6', '1f47e', '1f3a4', '1f3b8', '1f459', '1f451', '1f302', '1f45c', '1f484'
                , '1f48d', '1f48e', '2615', '1f37a', '1f37b', '1f378', '1f354', '1f35f', '1f35d', '1f363'
                , '1f35c', '1f373', '1f366', '1f382', '1f34e', '2708', '1f680', '1f6b2', '1f684', '26a0'
                , '1f3c1', '1f6b9', '1f6ba', '2b55', '274c', 'a9', 'ae', '2122'];

var dict = {
   "items":[
      {
         "name":"COPYRIGHT SIGN",
         "id":"copyright_sign",
         "src":"a9.png",
         "dict":[
            "\u00A9"
         ]
      },
      {
         "name":"REGISTERED SIGN",
         "id":"registered_sign",
         "src":"ae.png",
         "dict":[
            "\u00AE"
         ]
      },
      {
         "name":"DOUBLE EXCLAMATION MARK",
         "id":"double_exclamation_mark",
         "src":"203c.png",
         "dict":[
            "\u203C"
         ]
      },
      {
         "name":"EXCLAMATION QUESTION MARK",
         "id":"exclamation_question_mark",
         "src":"2049.png",
         "dict":[
            "\u2049"
         ]
      },
      {
         "name":"TRADE MARK SIGN",
         "id":"trade_mark_sign",
         "src":"2122.png",
         "dict":[
            "\u2122"
         ]
      },
      {
         "name":"INFORMATION SOURCE",
         "id":"information_source",
         "src":"2139.png",
         "dict":[
            "\u2139"
         ]
      },
      {
         "name":"LEFT RIGHT ARROW",
         "id":"left_right_arrow",
         "src":"2194.png",
         "dict":[
            "\u2194"
         ]
      },
      {
         "name":"UP DOWN ARROW",
         "id":"up_down_arrow",
         "src":"2195.png",
         "dict":[
            "\u2195"
         ]
      },
      {
         "name":"NORTH WEST ARROW",
         "id":"north_west_arrow",
         "src":"2196.png",
         "dict":[
            "\u2196",
            "\uE237"
         ]
      },
      {
         "name":"NORTH EAST ARROW",
         "id":"north_east_arrow",
         "src":"2197.png",
         "dict":[
            "\u2197",
            "\uE236"
         ]
      },
      {
         "name":"SOUTH EAST ARROW",
         "id":"south_east_arrow",
         "src":"2198.png",
         "dict":[
            "\u2198",
            "\uE238"
         ]
      },
      {
         "name":"SOUTH WEST ARROW",
         "id":"south_west_arrow",
         "src":"2199.png",
         "dict":[
            "\u2199",
            "\uE239"
         ]
      },
      {
         "name":"LEFTWARDS ARROW WITH HOOK",
         "id":"leftwards_arrow_with_hook",
         "src":"21a9.png",
         "dict":[
            "\u21A9"
         ]
      },
      {
         "name":"RIGHTWARDS ARROW WITH HOOK",
         "id":"rightwards_arrow_with_hook",
         "src":"21aa.png",
         "dict":[
            "\u21AA"
         ]
      },
      {
         "name":"WATCH",
         "id":"watch",
         "src":"231a.png",
         "dict":[
            "\u231A"
         ]
      },
      {
         "name":"HOURGLASS",
         "id":"hourglass",
         "src":"231b.png",
         "dict":[
            "\u231B"
         ]
      },
      {
         "name":"BLACK RIGHT-POINTING DOUBLE TRIANGLE",
         "id":"black_right-pointing_double_triangle",
         "src":"23e9.png",
         "dict":[
            "\u23E9",
            "\uE23C"
         ]
      },
      {
         "name":"BLACK LEFT-POINTING DOUBLE TRIANGLE",
         "id":"black_left-pointing_double_triangle",
         "src":"23ea.png",
         "dict":[
            "\u23EA",
            "\uE23D"
         ]
      },
      {
         "name":"BLACK UP-POINTING DOUBLE TRIANGLE",
         "id":"black_up-pointing_double_triangle",
         "src":"23eb.png",
         "dict":[
            "\u23EB"
         ]
      },
      {
         "name":"BLACK DOWN-POINTING DOUBLE TRIANGLE",
         "id":"black_down-pointing_double_triangle",
         "src":"23ec.png",
         "dict":[
            "\u23EC"
         ]
      },
      {
         "name":"ALARM CLOCK",
         "id":"alarm_clock",
         "src":"23f0.png",
         "dict":[
            "\u23F0"
         ]
      },
      {
         "name":"HOURGLASS WITH FLOWING SAND",
         "id":"hourglass_with_flowing_sand",
         "src":"23f3.png",
         "dict":[
            "\u23F3"
         ]
      },
      {
         "name":"CIRCLED CAPITAL LETTER M",
         "id":"circled_capital_letter_m",
         "src":"24c2.png",
         "dict":[
            "\u24C2"
         ]
      },
      {
         "name":"BLACK SMALL SQUARE",
         "id":"black_small_square",
         "src":"25aa.png",
         "dict":[
            "\u25AA"
         ]
      },
      {
         "name":"WHITE SMALL SQUARE",
         "id":"white_small_square",
         "src":"25ab.png",
         "dict":[
            "\u25AB"
         ]
      },
      {
         "name":"BLACK RIGHT-POINTING TRIANGLE",
         "id":"black_right-pointing_triangle",
         "src":"25b6.png",
         "dict":[
            "\u25B6",
            "\uE23A"
         ]
      },
      {
         "name":"BLACK LEFT-POINTING TRIANGLE",
         "id":"black_left-pointing_triangle",
         "src":"25c0.png",
         "dict":[
            "\u25C0",
            "\uE23B"
         ]
      },
      {
         "name":"WHITE MEDIUM SQUARE",
         "id":"white_medium_square",
         "src":"25fb.png",
         "dict":[
            "\u25FB"
         ]
      },
      {
         "name":"BLACK MEDIUM SQUARE",
         "id":"black_medium_square",
         "src":"25fc.png",
         "dict":[
            "\u25FC"
         ]
      },
      {
         "name":"WHITE MEDIUM SMALL SQUARE",
         "id":"white_medium_small_square",
         "src":"25fd.png",
         "dict":[
            "\u25FD"
         ]
      },
      {
         "name":"BLACK MEDIUM SMALL SQUARE",
         "id":"black_medium_small_square",
         "src":"25fe.png",
         "dict":[
            "\u25FE"
         ]
      },
      {
         "name":"BLACK SUN WITH RAYS",
         "id":"black_sun_with_rays",
         "src":"2600.png",
         "dict":[
            "\u2600",
            "\uE04A"
         ]
      },
      {
         "name":"CLOUD",
         "id":"cloud",
         "src":"2601.png",
         "dict":[
            "\u2601",
            "\uE049"
         ]
      },
      {
         "name":"BLACK TELEPHONE",
         "id":"black_telephone",
         "src":"260e.png",
         "dict":[
            "\u260E",
            "\uE009"
         ]
      },
      {
         "name":"BALLOT BOX WITH X",
         "id":"ballot_box_with_x",
         "src":"2611.png",
         "dict":[
            "\u2611"
         ]
      },
      {
         "name":"UMBRELLA WITH RAIN DROPS",
         "id":"umbrella_with_rain_drops",
         "src":"2614.png",
         "dict":[
            "\u2614",
            "\uE04B"
         ]
      },
      {
         "name":"HOT BEVERAGE",
         "id":"hot_beverage",
         "src":"2615.png",
         "dict":[
            "\u2615",
            "\uE045"
         ]
      },
      {
         "name":"WHITE UP POINTING INDEX",
         "id":"white_up_pointing_index",
         "src":"261d.png",
         "dict":[
            "\u261D",
            "\uE00F"
         ]
      },
      {
         "name":"WHITE SMILING FACE",
         "id":"white_smiling_face",
         "src":"263a.png",
         "dict":[
            "\u263A",
            "\uE414"
         ]
      },
      {
         "name":"ARIES",
         "id":"aries",
         "src":"2648.png",
         "dict":[
            "\u2648",
            "\uE23F"
         ]
      },
      {
         "name":"TAURUS",
         "id":"taurus",
         "src":"2649.png",
         "dict":[
            "\u2649",
            "\uE240"
         ]
      },
      {
         "name":"GEMINI",
         "id":"gemini",
         "src":"264a.png",
         "dict":[
            "\u264A",
            "\uE241"
         ]
      },
      {
         "name":"CANCER",
         "id":"cancer",
         "src":"264b.png",
         "dict":[
            "\u264B",
            "\uE242"
         ]
      },
      {
         "name":"LEO",
         "id":"leo",
         "src":"264c.png",
         "dict":[
            "\u264C",
            "\uE243"
         ]
      },
      {
         "name":"VIRGO",
         "id":"virgo",
         "src":"264d.png",
         "dict":[
            "\u264D",
            "\uE244"
         ]
      },
      {
         "name":"LIBRA",
         "id":"libra",
         "src":"264e.png",
         "dict":[
            "\u264E",
            "\uE245"
         ]
      },
      {
         "name":"SCORPIUS",
         "id":"scorpius",
         "src":"264f.png",
         "dict":[
            "\u264F",
            "\uE246"
         ]
      },
      {
         "name":"SAGITTARIUS",
         "id":"sagittarius",
         "src":"2650.png",
         "dict":[
            "\u2650",
            "\uE247"
         ]
      },
      {
         "name":"CAPRICORN",
         "id":"capricorn",
         "src":"2651.png",
         "dict":[
            "\u2651",
            "\uE248"
         ]
      },
      {
         "name":"AQUARIUS",
         "id":"aquarius",
         "src":"2652.png",
         "dict":[
            "\u2652",
            "\uE249"
         ]
      },
      {
         "name":"PISCES",
         "id":"pisces",
         "src":"2653.png",
         "dict":[
            "\u2653",
            "\uE24A"
         ]
      },
      {
         "name":"BLACK SPADE SUIT",
         "id":"black_spade_suit",
         "src":"2660.png",
         "dict":[
            "\u2660",
            "\uE20E"
         ]
      },
      {
         "name":"BLACK CLUB SUIT",
         "id":"black_club_suit",
         "src":"2663.png",
         "dict":[
            "\u2663",
            "\uE20F"
         ]
      },
      {
         "name":"BLACK HEART SUIT",
         "id":"black_heart_suit",
         "src":"2665.png",
         "dict":[
            "\u2665",
            "\uE20C"
         ]
      },
      {
         "name":"BLACK DIAMOND SUIT",
         "id":"black_diamond_suit",
         "src":"2666.png",
         "dict":[
            "\u2666",
            "\uE20D"
         ]
      },
      {
         "name":"HOT SPRINGS",
         "id":"hot_springs",
         "src":"2668.png",
         "dict":[
            "\u2668",
            "\uE123"
         ]
      },
      {
         "name":"BLACK UNIVERSAL RECYCLING SYMBOL",
         "id":"black_universal_recycling_symbol",
         "src":"267b.png",
         "dict":[
            "\u267B"
         ]
      },
      {
         "name":"WHEELCHAIR SYMBOL",
         "id":"wheelchair_symbol",
         "src":"267f.png",
         "dict":[
            "\u267F",
            "\uE20A"
         ]
      },
      {
         "name":"ANCHOR",
         "id":"anchor",
         "src":"2693.png",
         "dict":[
            "\u2693"
         ]
      },
      {
         "name":"WARNING SIGN",
         "id":"warning_sign",
         "src":"26a0.png",
         "dict":[
            "\u26A0",
            "\uE252"
         ]
      },
      {
         "name":"HIGH VOLTAGE SIGN",
         "id":"high_voltage_sign",
         "src":"26a1.png",
         "dict":[
            "\u26A1",
            "\uE13D"
         ]
      },
      {
         "name":"MEDIUM WHITE CIRCLE",
         "id":"medium_white_circle",
         "src":"26aa.png",
         "dict":[
            "\u26AA"
         ]
      },
      {
         "name":"MEDIUM BLACK CIRCLE",
         "id":"medium_black_circle",
         "src":"26ab.png",
         "dict":[
            "\u26AB"
         ]
      },
      {
         "name":"SOCCER BALL",
         "id":"soccer_ball",
         "src":"26bd.png",
         "dict":[
            "\u26BD",
            "\uE018"
         ]
      },
      {
         "name":"BASEBALL",
         "id":"baseball",
         "src":"26be.png",
         "dict":[
            "\u26BE",
            "\uE016"
         ]
      },
      {
         "name":"SNOWMAN WITHOUT SNOW",
         "id":"snowman_without_snow",
         "src":"26c4.png",
         "dict":[
            "\u26C4",
            "\uE048"
         ]
      },
      {
         "name":"SUN BEHIND CLOUD",
         "id":"sun_behind_cloud",
         "src":"26c5.png",
         "dict":[
            "\u26C5"
         ]
      },
      {
         "name":"OPHIUCHUS",
         "id":"ophiuchus",
         "src":"26ce.png",
         "dict":[
            "\u26CE",
            "\uE24B"
         ]
      },
      {
         "name":"NO ENTRY",
         "id":"no_entry",
         "src":"26d4.png",
         "dict":[
            "\u26D4"
         ]
      },
      {
         "name":"CHURCH",
         "id":"church",
         "src":"26ea.png",
         "dict":[
            "\u26EA",
            "\uE037"
         ]
      },
      {
         "name":"FOUNTAIN",
         "id":"fountain",
         "src":"26f2.png",
         "dict":[
            "\u26F2",
            "\uE121"
         ]
      },
      {
         "name":"FLAG IN HOLE",
         "id":"flag_in_hole",
         "src":"26f3.png",
         "dict":[
            "\u26F3",
            "\uE014"
         ]
      },
      {
         "name":"SAILBOAT",
         "id":"sailboat",
         "src":"26f5.png",
         "dict":[
            "\u26F5",
            "\uE01C"
         ]
      },
      {
         "name":"TENT",
         "id":"tent",
         "src":"26fa.png",
         "dict":[
            "\u26FA",
            "\uE122"
         ]
      },
      {
         "name":"FUEL PUMP",
         "id":"fuel_pump",
         "src":"26fd.png",
         "dict":[
            "\u26FD",
            "\uE03A"
         ]
      },
      {
         "name":"BLACK SCISSORS",
         "id":"black_scissors",
         "src":"2702.png",
         "dict":[
            "\u2702",
            "\uE313"
         ]
      },
      {
         "name":"WHITE HEAVY CHECK MARK",
         "id":"white_heavy_check_mark",
         "src":"2705.png",
         "dict":[
            "\u2705"
         ]
      },
      {
         "name":"AIRPLANE",
         "id":"airplane",
         "src":"2708.png",
         "dict":[
            "\u2708",
            "\uE01D"
         ]
      },
      {
         "name":"ENVELOPE",
         "id":"envelope",
         "src":"2709.png",
         "dict":[
            "\u2709"
         ]
      },
      {
         "name":"RAISED FIST",
         "id":"raised_fist",
         "src":"270a.png",
         "dict":[
            "\u270A",
            "\uE010"
         ]
      },
      {
         "name":"RAISED HAND",
         "id":"raised_hand",
         "src":"270b.png",
         "dict":[
            "\u270B",
            "\uE012"
         ]
      },
      {
         "name":"VICTORY HAND",
         "id":"victory_hand",
         "src":"270c.png",
         "dict":[
            "\u270C",
            "\uE011"
         ]
      },
      {
         "name":"PENCIL",
         "id":"pencil",
         "src":"270f.png",
         "dict":[
            "\u270F"
         ]
      },
      {
         "name":"BLACK NIB",
         "id":"black_nib",
         "src":"2712.png",
         "dict":[
            "\u2712"
         ]
      },
      {
         "name":"HEAVY CHECK MARK",
         "id":"heavy_check_mark",
         "src":"2714.png",
         "dict":[
            "\u2714"
         ]
      },
      {
         "name":"HEAVY MULTIPLICATION X",
         "id":"heavy_multiplication_x",
         "src":"2716.png",
         "dict":[
            "\u2716"
         ]
      },
      {
         "name":"SPARKLES",
         "id":"sparkles",
         "src":"2728.png",
         "dict":[
            "\u2728",
            "\uE32E"
         ]
      },
      {
         "name":"EIGHT SPOKED ASTERISK",
         "id":"eight_spoked_asterisk",
         "src":"2733.png",
         "dict":[
            "\u2733",
            "\uE206"
         ]
      },
      {
         "name":"EIGHT POINTED BLACK STAR",
         "id":"eight_pointed_black_star",
         "src":"2734.png",
         "dict":[
            "\u2734",
            "\uE205"
         ]
      },
      {
         "name":"SNOWFLAKE",
         "id":"snowflake",
         "src":"2744.png",
         "dict":[
            "\u2744"
         ]
      },
      {
         "name":"SPARKLE",
         "id":"sparkle",
         "src":"2747.png",
         "dict":[
            "\u2747"
         ]
      },
      {
         "name":"CROSS MARK",
         "id":"cross_mark",
         "src":"274c.png",
         "dict":[
            "\u274C",
            "\uE333"
         ]
      },
      {
         "name":"NEGATIVE SQUARED CROSS MARK",
         "id":"negative_squared_cross_mark",
         "src":"274e.png",
         "dict":[
            "\u274E"
         ]
      },
      {
         "name":"BLACK QUESTION MARK ORNAMENT",
         "id":"black_question_mark_ornament",
         "src":"2753.png",
         "dict":[
            "\u2753"
         ]
      },
      {
         "name":"WHITE QUESTION MARK ORNAMENT",
         "id":"white_question_mark_ornament",
         "src":"2754.png",
         "dict":[
            "\u2754",
            "\uE336"
         ]
      },
      {
         "name":"WHITE EXCLAMATION MARK ORNAMENT",
         "id":"white_exclamation_mark_ornament",
         "src":"2755.png",
         "dict":[
            "\u2755",
            "\uE337"
         ]
      },
      {
         "name":"HEAVY EXCLAMATION MARK SYMBOL",
         "id":"heavy_exclamation_mark_symbol",
         "src":"2757.png",
         "dict":[
            "\u2757"
         ]
      },
      {
         "name":"HEAVY EXCLAMATION MARK ORNAMENT",
         "id":"heavy_exclamation_mark_ornament",
         "src":"2762.png",
         "dict":[
            "\u2762"
         ]
      },
      {
         "name":"HEAVY BLACK HEART",
         "id":"heavy_black_heart",
         "src":"2764.png",
         "dict":[
            "\u2764",
            "\uE022"
         ]
      },
      {
         "name":"HEAVY PLUS SIGN",
         "id":"heavy_plus_sign",
         "src":"2795.png",
         "dict":[
            "\u2795"
         ]
      },
      {
         "name":"HEAVY MINUS SIGN",
         "id":"heavy_minus_sign",
         "src":"2796.png",
         "dict":[
            "\u2796"
         ]
      },
      {
         "name":"HEAVY DIVISION SIGN",
         "id":"heavy_division_sign",
         "src":"2797.png",
         "dict":[
            "\u2797"
         ]
      },
      {
         "name":"BLACK RIGHTWARDS ARROW",
         "id":"black_rightwards_arrow",
         "src":"27a1.png",
         "dict":[
            "\u27A1",
            "\uE234"
         ]
      },
      {
         "name":"CURLY LOOP",
         "id":"curly_loop",
         "src":"27b0.png",
         "dict":[
            "\u27B0"
         ]
      },
      {
         "name":"DOUBLE CURLY LOOP",
         "id":"double_curly_loop",
         "src":"27bf.png",
         "dict":[
            "\u27BF",
            "\uE211"
         ]
      },
      {
         "name":"ARROW POINTING RIGHTWARDS THEN CURVING UPWARDS",
         "id":"arrow_pointing_rightwards_then_curving_upwards",
         "src":"2934.png",
         "dict":[
            "\u2934"
         ]
      },
      {
         "name":"ARROW POINTING RIGHTWARDS THEN DOWNWARDS",
         "id":"arrow_pointing_rightwards_then_downwards",
         "src":"2935.png",
         "dict":[
            "\u2935"
         ]
      },
      {
         "name":"LEFTWARDS BLACK ARROW",
         "id":"leftwards_black_arrow",
         "src":"2b05.png",
         "dict":[
            "\u2B05",
            "\uE235"
         ]
      },
      {
         "name":"UPWARDS BLACK ARROW",
         "id":"upwards_black_arrow",
         "src":"2b06.png",
         "dict":[
            "\u2B06",
            "\uE232"
         ]
      },
      {
         "name":"DOWNWARDS BLACK ARROW",
         "id":"downwards_black_arrow",
         "src":"2b07.png",
         "dict":[
            "\u2B07",
            "\uE233"
         ]
      },
      {
         "name":"BLACK LARGE SQUARE",
         "id":"black_large_square",
         "src":"2b1b.png",
         "dict":[
            "\u2B1B"
         ]
      },
      {
         "name":"WHITE LARGE SQUARE",
         "id":"white_large_square",
         "src":"2b1c.png",
         "dict":[
            "\u2B1C"
         ]
      },
      {
         "name":"WHTE MEDIUM STAR",
         "id":"whte_medium_star",
         "src":"2b50.png",
         "dict":[
            "\u2B50"
         ]
      },
      {
         "name":"HEAVY LARGE CIRCLE",
         "id":"heavy_large_circle",
         "src":"2b55.png",
         "dict":[
            "\u2B55",
            "\uE332"
         ]
      },
      {
         "name":"WAVY DASH",
         "id":"wavy_dash",
         "src":"3030.png",
         "dict":[
            "\u3030"
         ]
      },
      {
         "name":"PART ALTERNATION MARK",
         "id":"part_alternation_mark",
         "src":"303d.png",
         "dict":[
            "\u303D",
            "\uE12C"
         ]
      },
      {
         "name":"CIRCLED IDEOGRAPH CONGRATULATION",
         "id":"circled_ideograph_congratulation",
         "src":"3297.png",
         "dict":[
            "\u3297",
            "\uE30D"
         ]
      },
      {
         "name":"CIRCLED IDEOGRAPH SECRET",
         "id":"circled_ideograph_secret",
         "src":"3299.png",
         "dict":[
            "\u3299",
            "\uE315"
         ]
      },
      {
         "name":"PRIVATE USE U+E50A",
         "id":"private_use_u+e50a",
         "src":"e50a.png",
         "dict":[
            "\uE50A"
         ]
      },
      {
         "name":"APPLE LOGO",
         "id":"apple_logo",
         "src":"f8ff.png",
         "dict":[
            "\uF8FF"
         ]
      },
      {
         "name":"MAHJONG TILE RED DRAGON",
         "id":"mahjong_tile_red_dragon",
         "src":"1f004.png",
         "dict":[
            "\uD83C\uDC04",
            "\uE12D"
         ]
      },
      {
         "name":"PLAYING CARD BLACK JOKER",
         "id":"playing_card_black_joker",
         "src":"1f0cf.png",
         "dict":[
            "\uD83C\uDCCF"
         ]
      },
      {
         "name":"NEGATIVE SQUARED LATIN CAPITAL LETTER A",
         "id":"negative_squared_latin_capital_letter_a",
         "src":"1f170.png",
         "dict":[
            "\uD83C\uDD70",
            "\uE532"
         ]
      },
      {
         "name":"NEGATIVE SQUARED LATIN CAPITAL LETTER B",
         "id":"negative_squared_latin_capital_letter_b",
         "src":"1f171.png",
         "dict":[
            "\uD83C\uDD71",
            "\uE533"
         ]
      },
      {
         "name":"NEGATIVE SQUARED LATIN CAPITAL LETTER O",
         "id":"negative_squared_latin_capital_letter_o",
         "src":"1f17e.png",
         "dict":[
            "\uD83C\uDD7E",
            "\uE535"
         ]
      },
      {
         "name":"NEGATIVE SQUARED LATIN CAPITAL LETTER P",
         "id":"negative_squared_latin_capital_letter_p",
         "src":"1f17f.png",
         "dict":[
            "\uD83C\uDD7F",
            "\uE14F"
         ]
      },
      {
         "name":"NEGATIVE SQUARED AB",
         "id":"negative_squared_ab",
         "src":"1f18e.png",
         "dict":[
            "\uD83C\uDD8E",
            "\uE534"
         ]
      },
      {
         "name":"SQUARED CL",
         "id":"squared_cl",
         "src":"1f191.png",
         "dict":[
            "\uD83C\uDD91"
         ]
      },
      {
         "name":"SQUARED COOL",
         "id":"squared_cool",
         "src":"1f192.png",
         "dict":[
            "\uD83C\uDD92",
            "\uE214"
         ]
      },
      {
         "name":"SQUARED FREE",
         "id":"squared_free",
         "src":"1f193.png",
         "dict":[
            "\uD83C\uDD93"
         ]
      },
      {
         "name":"SQUARED ID",
         "id":"squared_id",
         "src":"1f194.png",
         "dict":[
            "\uD83C\uDD94",
            "\uE229"
         ]
      },
      {
         "name":"SQUARED NEW",
         "id":"squared_new",
         "src":"1f195.png",
         "dict":[
            "\uD83C\uDD95",
            "\uE212"
         ]
      },
      {
         "name":"SQUARED NG",
         "id":"squared_ng",
         "src":"1f196.png",
         "dict":[
            "\uD83C\uDD96"
         ]
      },
      {
         "name":"SQUARED OK",
         "id":"squared_ok",
         "src":"1f197.png",
         "dict":[
            "\uD83C\uDD97",
            "\uE24D"
         ]
      },
      {
         "name":"SQUARED SOS",
         "id":"squared_sos",
         "src":"1f198.png",
         "dict":[
            "\uD83C\uDD98"
         ]
      },
      {
         "name":"SQUARED UP WITH EXCLAMATION MARK",
         "id":"squared_up_with_exclamation_mark",
         "src":"1f199.png",
         "dict":[
            "\uD83C\uDD99",
            "\uE213"
         ]
      },
      {
         "name":"SQUARED VS",
         "id":"squared_vs",
         "src":"1f19a.png",
         "dict":[
            "\uD83C\uDD9A",
            "\uE12E"
         ]
      },
      {
         "name":"SQUARED KATAKANA KOKO",
         "id":"squared_katakana_koko",
         "src":"1f201.png",
         "dict":[
            "\uD83C\uDE01",
            "\uE203"
         ]
      },
      {
         "name":"SQUARED KATAKANA SA",
         "id":"squared_katakana_sa",
         "src":"1f202.png",
         "dict":[
            "\uD83C\uDE02",
            "\uE228"
         ]
      },
      {
         "name":"SQUARED CJK UNIFIED IDEOGRAPH-7121",
         "id":"squared_cjk_unified_ideograph-7121",
         "src":"1f21a.png",
         "dict":[
            "\uD83C\uDE1A",
            "\uE216"
         ]
      },
      {
         "name":"SQUARED CJK UNIFIED IDEOGRAPH-8D70",
         "id":"squared_cjk_unified_ideograph-8d70",
         "src":"1f22f.png",
         "dict":[
            "\uD83C\uDE2F",
            "\uE22C"
         ]
      },
      {
         "name":"SQUARED CJK UNIFIED IDEOGRAPH-7981",
         "id":"squared_cjk_unified_ideograph-7981",
         "src":"1f232.png",
         "dict":[
            "\uD83C\uDE32"
         ]
      },
      {
         "name":"SQUARED CJK UNIFIED IDEOGRAPH-7A7A",
         "id":"squared_cjk_unified_ideograph-7a7a",
         "src":"1f233.png",
         "dict":[
            "\uD83C\uDE33",
            "\uE22B"
         ]
      },
      {
         "name":"SQUARED CJK UNIFIED IDEOGRAPH-5408",
         "id":"squared_cjk_unified_ideograph-5408",
         "src":"1f234.png",
         "dict":[
            "\uD83C\uDE34"
         ]
      },
      {
         "name":"SQUARED CJK UNIFIED IDEOGRAPH-6E80",
         "id":"squared_cjk_unified_ideograph-6e80",
         "src":"1f235.png",
         "dict":[
            "\uD83C\uDE35",
            "\uE22A"
         ]
      },
      {
         "name":"SQUARED CJK UNIFIED IDEOGRAPH-6709",
         "id":"squared_cjk_unified_ideograph-6709",
         "src":"1f236.png",
         "dict":[
            "\uD83C\uDE36",
            "\uE215"
         ]
      },
      {
         "name":"SQUARED CJK UNIFIED IDEOGRAPH-6808",
         "id":"squared_cjk_unified_ideograph-6808",
         "src":"1f237.png",
         "dict":[
            "\uD83C\uDE37",
            "\uE217"
         ]
      },
      {
         "name":"SQUARED CJK UNIFIED IDEOGRAPH-7533",
         "id":"squared_cjk_unified_ideograph-7533",
         "src":"1f238.png",
         "dict":[
            "\uD83C\uDE38",
            "\uE218"
         ]
      },
      {
         "name":"SQUARED CJK UNIFIED IDEOGRAPH-5272",
         "id":"squared_cjk_unified_ideograph-5272",
         "src":"1f239.png",
         "dict":[
            "\uD83C\uDE39",
            "\uE227"
         ]
      },
      {
         "name":"SQUARED CJK UNIFIED IDEOGRAPH-55B6",
         "id":"squared_cjk_unified_ideograph-55b6",
         "src":"1f23a.png",
         "dict":[
            "\uD83C\uDE3A",
            "\uE22D"
         ]
      },
      {
         "name":"CIRCLED IDEOGRAPH ADVANTAGE",
         "id":"circled_ideograph_advantage",
         "src":"1f250.png",
         "dict":[
            "\uD83C\uDE50",
            "\uE226"
         ]
      },
      {
         "name":"CIRCLED IDEOGRAPH ACCEPT",
         "id":"circled_ideograph_accept",
         "src":"1f251.png",
         "dict":[
            "\uD83C\uDE51"
         ]
      },
      {
         "name":"CYCLONE",
         "id":"cyclone",
         "src":"1f300.png",
         "dict":[
            "\uD83C\uDF00",
            "\uE443"
         ]
      },
      {
         "name":"FOGGY",
         "id":"foggy",
         "src":"1f301.png",
         "dict":[
            "\uD83C\uDF01"
         ]
      },
      {
         "name":"CLOSED UMBRELLA",
         "id":"closed_umbrella",
         "src":"1f302.png",
         "dict":[
            "\uD83C\uDF02",
            "\uE43C"
         ]
      },
      {
         "name":"NIGHT WITH STARS",
         "id":"night_with_stars",
         "src":"1f303.png",
         "dict":[
            "\uD83C\uDF03",
            "\uE44B"
         ]
      },
      {
         "name":"SUNRISE OVER MOUNTAINS",
         "id":"sunrise_over_mountains",
         "src":"1f304.png",
         "dict":[
            "\uD83C\uDF04",
            "\uE04D"
         ]
      },
      {
         "name":"SUNRISE",
         "id":"sunrise",
         "src":"1f305.png",
         "dict":[
            "\uD83C\uDF05",
            "\uE449"
         ]
      },
      {
         "name":"CITYSCAPE AT DUSK",
         "id":"cityscape_at_dusk",
         "src":"1f306.png",
         "dict":[
            "\uD83C\uDF06",
            "\uE146"
         ]
      },
      {
         "name":"SUNSET OVER BUILDINGS",
         "id":"sunset_over_buildings",
         "src":"1f307.png",
         "dict":[
            "\uD83C\uDF07",
            "\uE44A"
         ]
      },
      {
         "name":"RAINBOW",
         "id":"rainbow",
         "src":"1f308.png",
         "dict":[
            "\uD83C\uDF08",
            "\uE44C"
         ]
      },
      {
         "name":"BRIDGE AT NIGHT",
         "id":"bridge_at_night",
         "src":"1f309.png",
         "dict":[
            "\uD83C\uDF09"
         ]
      },
      {
         "name":"WATER WAVE",
         "id":"water_wave",
         "src":"1f30a.png",
         "dict":[
            "\uD83C\uDF0A",
            "\uE43E"
         ]
      },
      {
         "name":"VOLCANO",
         "id":"volcano",
         "src":"1f30b.png",
         "dict":[
            "\uD83C\uDF0B"
         ]
      },
      {
         "name":"MILKY WAY",
         "id":"milky_way",
         "src":"1f30c.png",
         "dict":[
            "\uD83C\uDF0C"
         ]
      },
      {
         "name":"EARTH GLOBE EUROPE-AFRICA",
         "id":"earth_globe_europe-africa",
         "src":"1f30d.png",
         "dict":[
            "\uD83C\uDF0D"
         ]
      },
      {
         "name":"EARTH GLOBE AMERICAS",
         "id":"earth_globe_americas",
         "src":"1f30e.png",
         "dict":[
            "\uD83C\uDF0E"
         ]
      },
      {
         "name":"EARTH GLOBE ASIA-AUSTRALIA",
         "id":"earth_globe_asia-australia",
         "src":"1f30f.png",
         "dict":[
            "\uD83C\uDF0F"
         ]
      },
      {
         "name":"GLOBE WITH MERIDIANS",
         "id":"globe_with_meridians",
         "src":"1f310.png",
         "dict":[
            "\uD83C\uDF10"
         ]
      },
      {
         "name":"NEW MOON SYMBOL",
         "id":"new_moon_symbol",
         "src":"1f311.png",
         "dict":[
            "\uD83C\uDF11"
         ]
      },
      {
         "name":"WAXING CRESCENT MOON SYMBOL",
         "id":"waxing_crescent_moon_symbol",
         "src":"1f312.png",
         "dict":[
            "\uD83C\uDF12"
         ]
      },
      {
         "name":"FIRST QUARTER MOON SYMBOL",
         "id":"first_quarter_moon_symbol",
         "src":"1f313.png",
         "dict":[
            "\uD83C\uDF13"
         ]
      },
      {
         "name":"WAXING GIBBOUS MOON SYMBOL",
         "id":"waxing_gibbous_moon_symbol",
         "src":"1f314.png",
         "dict":[
            "\uD83C\uDF14"
         ]
      },
      {
         "name":"FULL MOON SYMBOL",
         "id":"full_moon_symbol",
         "src":"1f315.png",
         "dict":[
            "\uD83C\uDF15"
         ]
      },
      {
         "name":"WANING GIBBOUS MOON SYMBOL",
         "id":"waning_gibbous_moon_symbol",
         "src":"1f316.png",
         "dict":[
            "\uD83C\uDF16"
         ]
      },
      {
         "name":"LAST QUARTER MOON SYMBOL",
         "id":"last_quarter_moon_symbol",
         "src":"1f317.png",
         "dict":[
            "\uD83C\uDF17"
         ]
      },
      {
         "name":"WANING CRESCENT MOON SYMBOL",
         "id":"waning_crescent_moon_symbol",
         "src":"1f318.png",
         "dict":[
            "\uD83C\uDF18"
         ]
      },
      {
         "name":"CRESCENT MOON",
         "id":"crescent_moon",
         "src":"1f319.png",
         "dict":[
            "\uD83C\uDF19",
            "\uE04C"
         ]
      },
      {
         "name":"NEW MOON WITH FACE",
         "id":"new_moon_with_face",
         "src":"1f31a.png",
         "dict":[
            "\uD83C\uDF1A"
         ]
      },
      {
         "name":"FIRST QUARTER MOON WITH FACE",
         "id":"first_quarter_moon_with_face",
         "src":"1f31b.png",
         "dict":[
            "\uD83C\uDF1B"
         ]
      },
      {
         "name":"LAST QUARTER MOON WITH FACE",
         "id":"last_quarter_moon_with_face",
         "src":"1f31c.png",
         "dict":[
            "\uD83C\uDF1C"
         ]
      },
      {
         "name":"FULL MOON WITH FACE",
         "id":"full_moon_with_face",
         "src":"1f31d.png",
         "dict":[
            "\uD83C\uDF1D"
         ]
      },
      {
         "name":"SUN WITH FACE",
         "id":"sun_with_face",
         "src":"1f31e.png",
         "dict":[
            "\uD83C\uDF1E"
         ]
      },
      {
         "name":"GLOWING STAR",
         "id":"glowing_star",
         "src":"1f31f.png",
         "dict":[
            "\uD83C\uDF1F",
            "\uE335"
         ]
      },
      {
         "name":"SHOOTING STAR",
         "id":"shooting_star",
         "src":"1f320.png",
         "dict":[
            "\uD83C\uDF20"
         ]
      },
      {
         "name":"CHESTNUT",
         "id":"chestnut",
         "src":"1f330.png",
         "dict":[
            "\uD83C\uDF30"
         ]
      },
      {
         "name":"SEEDLING",
         "id":"seedling",
         "src":"1f331.png",
         "dict":[
            "\uD83C\uDF31"
         ]
      },
      {
         "name":"EVERGREEN TREE",
         "id":"evergreen_tree",
         "src":"1f332.png",
         "dict":[
            "\uD83C\uDF32"
         ]
      },
      {
         "name":"DECIDUOUS TREE",
         "id":"deciduous_tree",
         "src":"1f333.png",
         "dict":[
            "\uD83C\uDF33"
         ]
      },
      {
         "name":"PALM TREE",
         "id":"palm_tree",
         "src":"1f334.png",
         "dict":[
            "\uD83C\uDF34",
            "\uE307"
         ]
      },
      {
         "name":"CACTUS",
         "id":"cactus",
         "src":"1f335.png",
         "dict":[
            "\uD83C\uDF35",
            "\uE308"
         ]
      },
      {
         "name":"TULIP",
         "id":"tulip",
         "src":"1f337.png",
         "dict":[
            "\uD83C\uDF37",
            "\uE304"
         ]
      },
      {
         "name":"CHERRY BLOSSOM",
         "id":"cherry_blossom",
         "src":"1f338.png",
         "dict":[
            "\uD83C\uDF38",
            "\uE030"
         ]
      },
      {
         "name":"ROSE",
         "id":"rose",
         "src":"1f339.png",
         "dict":[
            "\uD83C\uDF39",
            "\uE032"
         ]
      },
      {
         "name":"HIBISCUS",
         "id":"hibiscus",
         "src":"1f33a.png",
         "dict":[
            "\uD83C\uDF3A",
            "\uE303"
         ]
      },
      {
         "name":"SUNFLOWER",
         "id":"sunflower",
         "src":"1f33b.png",
         "dict":[
            "\uD83C\uDF3B",
            "\uE305"
         ]
      },
      {
         "name":"BLOSSOM",
         "id":"blossom",
         "src":"1f33c.png",
         "dict":[
            "\uD83C\uDF3C"
         ]
      },
      {
         "name":"EAR OF MAIZE",
         "id":"ear_of_maize",
         "src":"1f33d.png",
         "dict":[
            "\uD83C\uDF3D"
         ]
      },
      {
         "name":"EAR OF RICE",
         "id":"ear_of_rice",
         "src":"1f33e.png",
         "dict":[
            "\uD83C\uDF3E",
            "\uE444"
         ]
      },
      {
         "name":"HERB",
         "id":"herb",
         "src":"1f33f.png",
         "dict":[
            "\uD83C\uDF3F"
         ]
      },
      {
         "name":"FOUR LEAF CLOVER",
         "id":"four_leaf_clover",
         "src":"1f340.png",
         "dict":[
            "\uD83C\uDF40",
            "\uE110"
         ]
      },
      {
         "name":"MAPLE LEAF",
         "id":"maple_leaf",
         "src":"1f341.png",
         "dict":[
            "\uD83C\uDF41",
            "\uE118"
         ]
      },
      {
         "name":"FALLEN LEAF",
         "id":"fallen_leaf",
         "src":"1f342.png",
         "dict":[
            "\uD83C\uDF42",
            "\uE119"
         ]
      },
      {
         "name":"LEAF FLUTTERING IN WIND",
         "id":"leaf_fluttering_in_wind",
         "src":"1f343.png",
         "dict":[
            "\uD83C\uDF43",
            "\uE447"
         ]
      },
      {
         "name":"MUSHROOM",
         "id":"mushroom",
         "src":"1f344.png",
         "dict":[
            "\uD83C\uDF44"
         ]
      },
      {
         "name":"TOMATO",
         "id":"tomato",
         "src":"1f345.png",
         "dict":[
            "\uD83C\uDF45",
            "\uE349"
         ]
      },
      {
         "name":"AUBERGINE",
         "id":"aubergine",
         "src":"1f346.png",
         "dict":[
            "\uD83C\uDF46",
            "\uE34A"
         ]
      },
      {
         "name":"GRAPES",
         "id":"grapes",
         "src":"1f347.png",
         "dict":[
            "\uD83C\uDF47"
         ]
      },
      {
         "name":"MELON",
         "id":"melon",
         "src":"1f348.png",
         "dict":[
            "\uD83C\uDF48"
         ]
      },
      {
         "name":"WATERMELON",
         "id":"watermelon",
         "src":"1f349.png",
         "dict":[
            "\uD83C\uDF49",
            "\uE348"
         ]
      },
      {
         "name":"TANGERINE",
         "id":"tangerine",
         "src":"1f34a.png",
         "dict":[
            "\uD83C\uDF4A",
            "\uE346"
         ]
      },
      {
         "name":"LEMON",
         "id":"lemon",
         "src":"1f34b.png",
         "dict":[
            "\uD83C\uDF4B"
         ]
      },
      {
         "name":"BANANA",
         "id":"banana",
         "src":"1f34c.png",
         "dict":[
            "\uD83C\uDF4C"
         ]
      },
      {
         "name":"PINEAPPLE",
         "id":"pineapple",
         "src":"1f34d.png",
         "dict":[
            "\uD83C\uDF4D"
         ]
      },
      {
         "name":"RED APPLE",
         "id":"red_apple",
         "src":"1f34e.png",
         "dict":[
            "\uD83C\uDF4E",
            "\uE345"
         ]
      },
      {
         "name":"GREEN APPLE",
         "id":"green_apple",
         "src":"1f34f.png",
         "dict":[
            "\uD83C\uDF4F"
         ]
      },
      {
         "name":"PEAR",
         "id":"pear",
         "src":"1f350.png",
         "dict":[
            "\uD83C\uDF50"
         ]
      },
      {
         "name":"PEACH",
         "id":"peach",
         "src":"1f351.png",
         "dict":[
            "\uD83C\uDF51"
         ]
      },
      {
         "name":"CHERRIES",
         "id":"cherries",
         "src":"1f352.png",
         "dict":[
            "\uD83C\uDF52"
         ]
      },
      {
         "name":"STRAWBERRY",
         "id":"strawberry",
         "src":"1f353.png",
         "dict":[
            "\uD83C\uDF53",
            "\uE347"
         ]
      },
      {
         "name":"HAMBURGER",
         "id":"hamburger",
         "src":"1f354.png",
         "dict":[
            "\uD83C\uDF54",
            "\uE120"
         ]
      },
      {
         "name":"SLICE OF PIZZA",
         "id":"slice_of_pizza",
         "src":"1f355.png",
         "dict":[
            "\uD83C\uDF55"
         ]
      },
      {
         "name":"MEAT ON BONE",
         "id":"meat_on_bone",
         "src":"1f356.png",
         "dict":[
            "\uD83C\uDF56"
         ]
      },
      {
         "name":"POULTRY LEG",
         "id":"poultry_leg",
         "src":"1f357.png",
         "dict":[
            "\uD83C\uDF57"
         ]
      },
      {
         "name":"RICE CRACKER",
         "id":"rice_cracker",
         "src":"1f358.png",
         "dict":[
            "\uD83C\uDF58",
            "\uE33D"
         ]
      },
      {
         "name":"RICE BALL",
         "id":"rice_ball",
         "src":"1f359.png",
         "dict":[
            "\uD83C\uDF59",
            "\uE342"
         ]
      },
      {
         "name":"COOKED RICE",
         "id":"cooked_rice",
         "src":"1f35a.png",
         "dict":[
            "\uD83C\uDF5A",
            "\uE33E"
         ]
      },
      {
         "name":"CURRY AND RICE",
         "id":"curry_and_rice",
         "src":"1f35b.png",
         "dict":[
            "\uD83C\uDF5B",
            "\uE341"
         ]
      },
      {
         "name":"STEAMING BOWL",
         "id":"steaming_bowl",
         "src":"1f35c.png",
         "dict":[
            "\uD83C\uDF5C",
            "\uE340"
         ]
      },
      {
         "name":"SPAGHETTI",
         "id":"spaghetti",
         "src":"1f35d.png",
         "dict":[
            "\uD83C\uDF5D",
            "\uE33F"
         ]
      },
      {
         "name":"BREAD",
         "id":"bread",
         "src":"1f35e.png",
         "dict":[
            "\uD83C\uDF5E",
            "\uE339"
         ]
      },
      {
         "name":"FRENCH FRIES",
         "id":"french_fries",
         "src":"1f35f.png",
         "dict":[
            "\uD83C\uDF5F",
            "\uE33B"
         ]
      },
      {
         "name":"ROASTED SWEET POTATO",
         "id":"roasted_sweet_potato",
         "src":"1f360.png",
         "dict":[
            "\uD83C\uDF60"
         ]
      },
      {
         "name":"DANGO",
         "id":"dango",
         "src":"1f361.png",
         "dict":[
            "\uD83C\uDF61",
            "\uE33C"
         ]
      },
      {
         "name":"ODEN",
         "id":"oden",
         "src":"1f362.png",
         "dict":[
            "\uD83C\uDF62",
            "\uE343"
         ]
      },
      {
         "name":"SUSHI",
         "id":"sushi",
         "src":"1f363.png",
         "dict":[
            "\uD83C\uDF63",
            "\uE344"
         ]
      },
      {
         "name":"FRIED SHRIMP",
         "id":"fried_shrimp",
         "src":"1f364.png",
         "dict":[
            "\uD83C\uDF64"
         ]
      },
      {
         "name":"FISH CAKE WITH SWIRL DESIGN",
         "id":"fish_cake_with_swirl_design",
         "src":"1f365.png",
         "dict":[
            "\uD83C\uDF65"
         ]
      },
      {
         "name":"SOFT ICE CREAM",
         "id":"soft_ice_cream",
         "src":"1f366.png",
         "dict":[
            "\uD83C\uDF66",
            "\uE33A"
         ]
      },
      {
         "name":"SHAVED ICE",
         "id":"shaved_ice",
         "src":"1f367.png",
         "dict":[
            "\uD83C\uDF67",
            "\uE43F"
         ]
      },
      {
         "name":"ICE CREAM",
         "id":"ice_cream",
         "src":"1f368.png",
         "dict":[
            "\uD83C\uDF68"
         ]
      },
      {
         "name":"DOUGHNUT",
         "id":"doughnut",
         "src":"1f369.png",
         "dict":[
            "\uD83C\uDF69"
         ]
      },
      {
         "name":"COOKIE",
         "id":"cookie",
         "src":"1f36a.png",
         "dict":[
            "\uD83C\uDF6A"
         ]
      },
      {
         "name":"CHOCOLATE BAR",
         "id":"chocolate_bar",
         "src":"1f36b.png",
         "dict":[
            "\uD83C\uDF6B"
         ]
      },
      {
         "name":"CANDY",
         "id":"candy",
         "src":"1f36c.png",
         "dict":[
            "\uD83C\uDF6C"
         ]
      },
      {
         "name":"LOLLIPOP",
         "id":"lollipop",
         "src":"1f36d.png",
         "dict":[
            "\uD83C\uDF6D"
         ]
      },
      {
         "name":"CUSTARD",
         "id":"custard",
         "src":"1f36e.png",
         "dict":[
            "\uD83C\uDF6E"
         ]
      },
      {
         "name":"HONEY POT",
         "id":"honey_pot",
         "src":"1f36f.png",
         "dict":[
            "\uD83C\uDF6F"
         ]
      },
      {
         "name":"SHORTCAKE",
         "id":"shortcake",
         "src":"1f370.png",
         "dict":[
            "\uD83C\uDF70",
            "\uE046"
         ]
      },
      {
         "name":"BENTO BOX",
         "id":"bento_box",
         "src":"1f371.png",
         "dict":[
            "\uD83C\uDF71",
            "\uE34C"
         ]
      },
      {
         "name":"POT OF FOOD",
         "id":"pot_of_food",
         "src":"1f372.png",
         "dict":[
            "\uD83C\uDF72",
            "\uE34D"
         ]
      },
      {
         "name":"COOKING",
         "id":"cooking",
         "src":"1f373.png",
         "dict":[
            "\uD83C\uDF73",
            "\uE147"
         ]
      },
      {
         "name":"FORK AND KNIFE",
         "id":"fork_and_knife",
         "src":"1f374.png",
         "dict":[
            "\uD83C\uDF74",
            "\uE043"
         ]
      },
      {
         "name":"TEACUP WITHOUT HANDLE",
         "id":"teacup_without_handle",
         "src":"1f375.png",
         "dict":[
            "\uD83C\uDF75",
            "\uE338"
         ]
      },
      {
         "name":"SAKE BOTTLE AND CUP",
         "id":"sake_bottle_and_cup",
         "src":"1f376.png",
         "dict":[
            "\uD83C\uDF76",
            "\uE30B"
         ]
      },
      {
         "name":"WINE GLASS",
         "id":"wine_glass",
         "src":"1f377.png",
         "dict":[
            "\uD83C\uDF77"
         ]
      },
      {
         "name":"COCKTAIL GLASS",
         "id":"cocktail_glass",
         "src":"1f378.png",
         "dict":[
            "\uD83C\uDF78",
            "\uE044"
         ]
      },
      {
         "name":"TROPICAL DRINK",
         "id":"tropical_drink",
         "src":"1f379.png",
         "dict":[
            "\uD83C\uDF79"
         ]
      },
      {
         "name":"BEER MUG",
         "id":"beer_mug",
         "src":"1f37a.png",
         "dict":[
            "\uD83C\uDF7A",
            "\uE047"
         ]
      },
      {
         "name":"CLINKING BEER MUGS",
         "id":"clinking_beer_mugs",
         "src":"1f37b.png",
         "dict":[
            "\uD83C\uDF7B",
            "\uE30C"
         ]
      },
      {
         "name":"BABY BOTTLE",
         "id":"baby_bottle",
         "src":"1f37c.png",
         "dict":[
            "\uD83C\uDF7C"
         ]
      },
      {
         "name":"RIBBON",
         "id":"ribbon",
         "src":"1f380.png",
         "dict":[
            "\uD83C\uDF80",
            "\uE314"
         ]
      },
      {
         "name":"WRAPPED PRESENT",
         "id":"wrapped_present",
         "src":"1f381.png",
         "dict":[
            "\uD83C\uDF81",
            "\uE112"
         ]
      },
      {
         "name":"BIRTHDAY CAKE",
         "id":"birthday_cake",
         "src":"1f382.png",
         "dict":[
            "\uD83C\uDF82",
            "\uE34B"
         ]
      },
      {
         "name":"JACK-O-LANTERN",
         "id":"jack-o-lantern",
         "src":"1f383.png",
         "dict":[
            "\uD83C\uDF83",
            "\uE445"
         ]
      },
      {
         "name":"CHRISTMAS TREE",
         "id":"christmas_tree",
         "src":"1f384.png",
         "dict":[
            "\uD83C\uDF84",
            "\uE033"
         ]
      },
      {
         "name":"FATHER CHRISTMAS",
         "id":"father_christmas",
         "src":"1f385.png",
         "dict":[
            "\uD83C\uDF85",
            "\uE448"
         ]
      },
      {
         "name":"FIREWORKS",
         "id":"fireworks",
         "src":"1f386.png",
         "dict":[
            "\uD83C\uDF86",
            "\uE117"
         ]
      },
      {
         "name":"FIREWORK SPARKLER",
         "id":"firework_sparkler",
         "src":"1f387.png",
         "dict":[
            "\uD83C\uDF87",
            "\uE440"
         ]
      },
      {
         "name":"BALLOON",
         "id":"balloon",
         "src":"1f388.png",
         "dict":[
            "\uD83C\uDF88",
            "\uE310"
         ]
      },
      {
         "name":"PARTY POPPER",
         "id":"party_popper",
         "src":"1f389.png",
         "dict":[
            "\uD83C\uDF89",
            "\uE312"
         ]
      },
      {
         "name":"CONFETTI BALL",
         "id":"confetti_ball",
         "src":"1f38a.png",
         "dict":[
            "\uD83C\uDF8A"
         ]
      },
      {
         "name":"TANABATA TREE",
         "id":"tanabata_tree",
         "src":"1f38b.png",
         "dict":[
            "\uD83C\uDF8B"
         ]
      },
      {
         "name":"CROSSED FLAGS",
         "id":"crossed_flags",
         "src":"1f38c.png",
         "dict":[
            "\uD83C\uDF8C",
            "\uE143"
         ]
      },
      {
         "name":"PINE DECORATION",
         "id":"pine_decoration",
         "src":"1f38d.png",
         "dict":[
            "\uD83C\uDF8D",
            "\uE436"
         ]
      },
      {
         "name":"JAPANESE DOLLS",
         "id":"japanese_dolls",
         "src":"1f38e.png",
         "dict":[
            "\uD83C\uDF8E",
            "\uE438"
         ]
      },
      {
         "name":"CARP STREAMER",
         "id":"carp_streamer",
         "src":"1f38f.png",
         "dict":[
            "\uD83C\uDF8F",
            "\uE43B"
         ]
      },
      {
         "name":"WIND CHIME",
         "id":"wind_chime",
         "src":"1f390.png",
         "dict":[
            "\uD83C\uDF90",
            "\uE442"
         ]
      },
      {
         "name":"MOON VIEWING CEREMONY",
         "id":"moon_viewing_ceremony",
         "src":"1f391.png",
         "dict":[
            "\uD83C\uDF91",
            "\uE446"
         ]
      },
      {
         "name":"SCHOOL SATCHEL",
         "id":"school_satchel",
         "src":"1f392.png",
         "dict":[
            "\uD83C\uDF92",
            "\uE43A"
         ]
      },
      {
         "name":"GRADUATION CAP",
         "id":"graduation_cap",
         "src":"1f393.png",
         "dict":[
            "\uD83C\uDF93",
            "\uE439"
         ]
      },
      {
         "name":"CAROUSEL HORSE",
         "id":"carousel_horse",
         "src":"1f3a0.png",
         "dict":[
            "\uD83C\uDFA0"
         ]
      },
      {
         "name":"FERRIS WHEEL",
         "id":"ferris_wheel",
         "src":"1f3a1.png",
         "dict":[
            "\uD83C\uDFA1",
            "\uE124"
         ]
      },
      {
         "name":"ROLLER COASTER",
         "id":"roller_coaster",
         "src":"1f3a2.png",
         "dict":[
            "\uD83C\uDFA2",
            "\uE433"
         ]
      },
      {
         "name":"FISHING POLE AND FISH",
         "id":"fishing_pole_and_fish",
         "src":"1f3a3.png",
         "dict":[
            "\uD83C\uDFA3"
         ]
      },
      {
         "name":"MICROPHONE",
         "id":"microphone",
         "src":"1f3a4.png",
         "dict":[
            "\uD83C\uDFA4",
            "\uE03C"
         ]
      },
      {
         "name":"MOVIE CAMERA",
         "id":"movie_camera",
         "src":"1f3a5.png",
         "dict":[
            "\uD83C\uDFA5",
            "\uE03D"
         ]
      },
      {
         "name":"CINEMA",
         "id":"cinema",
         "src":"1f3a6.png",
         "dict":[
            "\uD83C\uDFA6",
            "\uE507"
         ]
      },
      {
         "name":"HEADPHONE",
         "id":"headphone",
         "src":"1f3a7.png",
         "dict":[
            "\uD83C\uDFA7",
            "\uE30A"
         ]
      },
      {
         "name":"ARTIST PALETTE",
         "id":"artist_palette",
         "src":"1f3a8.png",
         "dict":[
            "\uD83C\uDFA8",
            "\uE502"
         ]
      },
      {
         "name":"TOP HAT",
         "id":"top_hat",
         "src":"1f3a9.png",
         "dict":[
            "\uD83C\uDFA9",
            "\uE503"
         ]
      },
      {
         "name":"CIRCUS TENT",
         "id":"circus_tent",
         "src":"1f3aa.png",
         "dict":[
            "\uD83C\uDFAA"
         ]
      },
      {
         "name":"TICKET",
         "id":"ticket",
         "src":"1f3ab.png",
         "dict":[
            "\uD83C\uDFAB",
            "\uE125"
         ]
      },
      {
         "name":"CLAPPER BOARD",
         "id":"clapper_board",
         "src":"1f3ac.png",
         "dict":[
            "\uD83C\uDFAC",
            "\uE324"
         ]
      },
      {
         "name":"PERFORMING ARTS",
         "id":"performing_arts",
         "src":"1f3ad.png",
         "dict":[
            "\uD83C\uDFAD"
         ]
      },
      {
         "name":"VIDEO GAME",
         "id":"video_game",
         "src":"1f3ae.png",
         "dict":[
            "\uD83C\uDFAE"
         ]
      },
      {
         "name":"DIRECT HIT",
         "id":"direct_hit",
         "src":"1f3af.png",
         "dict":[
            "\uD83C\uDFAF",
            "\uE130"
         ]
      },
      {
         "name":"SLOT MACHINE",
         "id":"slot_machine",
         "src":"1f3b0.png",
         "dict":[
            "\uD83C\uDFB0",
            "\uE133"
         ]
      },
      {
         "name":"BILLIARDS",
         "id":"billiards",
         "src":"1f3b1.png",
         "dict":[
            "\uD83C\uDFB1",
            "\uE42C"
         ]
      },
      {
         "name":"GAME DIE",
         "id":"game_die",
         "src":"1f3b2.png",
         "dict":[
            "\uD83C\uDFB2"
         ]
      },
      {
         "name":"BOWLING",
         "id":"bowling",
         "src":"1f3b3.png",
         "dict":[
            "\uD83C\uDFB3"
         ]
      },
      {
         "name":"FLOWER PLAYING CARDS",
         "id":"flower_playing_cards",
         "src":"1f3b4.png",
         "dict":[
            "\uD83C\uDFB4"
         ]
      },
      {
         "name":"MUSICAL NOTE",
         "id":"musical_note",
         "src":"1f3b5.png",
         "dict":[
            "\uD83C\uDFB5",
            "\uE03E"
         ]
      },
      {
         "name":"MULTIPLE MUSIC NOTES",
         "id":"multiple_music_notes",
         "src":"1f3b6.png",
         "dict":[
            "\uD83C\uDFB6",
            "\uE326"
         ]
      },
      {
         "name":"SAXOPHONE",
         "id":"saxophone",
         "src":"1f3b7.png",
         "dict":[
            "\uD83C\uDFB7",
            "\uE040"
         ]
      },
      {
         "name":"GUITAR",
         "id":"guitar",
         "src":"1f3b8.png",
         "dict":[
            "\uD83C\uDFB8",
            "\uE041"
         ]
      },
      {
         "name":"MUSICAL KEYBOARD",
         "id":"musical_keyboard",
         "src":"1f3b9.png",
         "dict":[
            "\uD83C\uDFB9"
         ]
      },
      {
         "name":"TRUMPET",
         "id":"trumpet",
         "src":"1f3ba.png",
         "dict":[
            "\uD83C\uDFBA",
            "\uE042"
         ]
      },
      {
         "name":"VIOLIN",
         "id":"violin",
         "src":"1f3bb.png",
         "dict":[
            "\uD83C\uDFBB"
         ]
      },
      {
         "name":"MUSICAL SCORE",
         "id":"musical_score",
         "src":"1f3bc.png",
         "dict":[
            "\uD83C\uDFBC"
         ]
      },
      {
         "name":"RUNNING SHIRT WITH SASH",
         "id":"running_shirt_with_sash",
         "src":"1f3bd.png",
         "dict":[
            "\uD83C\uDFBD"
         ]
      },
      {
         "name":"TENNIS RACQUET AND BALL",
         "id":"tennis_racquet_and_ball",
         "src":"1f3be.png",
         "dict":[
            "\uD83C\uDFBE",
            "\uE015"
         ]
      },
      {
         "name":"SKI AND SKI BOOT",
         "id":"ski_and_ski_boot",
         "src":"1f3bf.png",
         "dict":[
            "\uD83C\uDFBF",
            "\uE013"
         ]
      },
      {
         "name":"BASKETBALL AND HOOP",
         "id":"basketball_and_hoop",
         "src":"1f3c0.png",
         "dict":[
            "\uD83C\uDFC0",
            "\uE42A"
         ]
      },
      {
         "name":"CHEQUERED FLAG",
         "id":"chequered_flag",
         "src":"1f3c1.png",
         "dict":[
            "\uD83C\uDFC1",
            "\uE132"
         ]
      },
      {
         "name":"SNOWBOARDER",
         "id":"snowboarder",
         "src":"1f3c2.png",
         "dict":[
            "\uD83C\uDFC2"
         ]
      },
      {
         "name":"RUNNER",
         "id":"runner",
         "src":"1f3c3.png",
         "dict":[
            "\uD83C\uDFC3",
            "\uE115"
         ]
      },
      {
         "name":"SURFER",
         "id":"surfer",
         "src":"1f3c4.png",
         "dict":[
            "\uD83C\uDFC4",
            "\uE017"
         ]
      },
      {
         "name":"TROPHY",
         "id":"trophy",
         "src":"1f3c6.png",
         "dict":[
            "\uD83C\uDFC6",
            "\uE131"
         ]
      },
      {
         "name":"HORSE RACING",
         "id":"horse_racing",
         "src":"1f3c7.png",
         "dict":[
            "\uD83C\uDFC7"
         ]
      },
      {
         "name":"AMERICAN FOOTBALL",
         "id":"american_football",
         "src":"1f3c8.png",
         "dict":[
            "\uD83C\uDFC8",
            "\uE42B"
         ]
      },
      {
         "name":"RUGBY FOOTBALL",
         "id":"rugby_football",
         "src":"1f3c9.png",
         "dict":[
            "\uD83C\uDFC9"
         ]
      },
      {
         "name":"SWIMMER",
         "id":"swimmer",
         "src":"1f3ca.png",
         "dict":[
            "\uD83C\uDFCA",
            "\uE42D"
         ]
      },
      {
         "name":"HOUSE BUILDING",
         "id":"house_building",
         "src":"1f3e0.png",
         "dict":[
            "\uD83C\uDFE0",
            "\uE036"
         ]
      },
      {
         "name":"HOUSE WITH GARDEN",
         "id":"house_with_garden",
         "src":"1f3e1.png",
         "dict":[
            "\uD83C\uDFE1"
         ]
      },
      {
         "name":"OFFICE BUILDING",
         "id":"office_building",
         "src":"1f3e2.png",
         "dict":[
            "\uD83C\uDFE2",
            "\uE038"
         ]
      },
      {
         "name":"JAPANESE POST OFFICE",
         "id":"japanese_post_office",
         "src":"1f3e3.png",
         "dict":[
            "\uD83C\uDFE3",
            "\uE153"
         ]
      },
      {
         "name":"EUROPEAN POST OFFICE",
         "id":"european_post_office",
         "src":"1f3e4.png",
         "dict":[
            "\uD83C\uDFE4"
         ]
      },
      {
         "name":"HOSPITAL",
         "id":"hospital",
         "src":"1f3e5.png",
         "dict":[
            "\uD83C\uDFE5",
            "\uE155"
         ]
      },
      {
         "name":"BANK",
         "id":"bank",
         "src":"1f3e6.png",
         "dict":[
            "\uD83C\uDFE6",
            "\uE14D"
         ]
      },
      {
         "name":"AUTOMATED TELLER MACHINE",
         "id":"automated_teller_machine",
         "src":"1f3e7.png",
         "dict":[
            "\uD83C\uDFE7",
            "\uE154"
         ]
      },
      {
         "name":"HOTEL",
         "id":"hotel",
         "src":"1f3e8.png",
         "dict":[
            "\uD83C\uDFE8",
            "\uE158"
         ]
      },
      {
         "name":"LOVE HOTEL",
         "id":"love_hotel",
         "src":"1f3e9.png",
         "dict":[
            "\uD83C\uDFE9",
            "\uE501"
         ]
      },
      {
         "name":"CONVENIENCE STORE",
         "id":"convenience_store",
         "src":"1f3ea.png",
         "dict":[
            "\uD83C\uDFEA",
            "\uE156"
         ]
      },
      {
         "name":"SCHOOL",
         "id":"school",
         "src":"1f3eb.png",
         "dict":[
            "\uD83C\uDFEB",
            "\uE157"
         ]
      },
      {
         "name":"DEPARTMENT STORE",
         "id":"department_store",
         "src":"1f3ec.png",
         "dict":[
            "\uD83C\uDFEC",
            "\uE504"
         ]
      },
      {
         "name":"FACTORY",
         "id":"factory",
         "src":"1f3ed.png",
         "dict":[
            "\uD83C\uDFED",
            "\uE508"
         ]
      },
      {
         "name":"IZAKAYA LANTERN",
         "id":"izakaya_lantern",
         "src":"1f3ee.png",
         "dict":[
            "\uD83C\uDFEE"
         ]
      },
      {
         "name":"JAPANESE CASTLE",
         "id":"japanese_castle",
         "src":"1f3ef.png",
         "dict":[
            "\uD83C\uDFEF",
            "\uE505"
         ]
      },
      {
         "name":"EUROPEAN CASTLE",
         "id":"european_castle",
         "src":"1f3f0.png",
         "dict":[
            "\uD83C\uDFF0",
            "\uE506"
         ]
      },
      {
         "name":"RAT",
         "id":"rat",
         "src":"1f400.png",
         "dict":[
            "\uD83D\uDC00"
         ]
      },
      {
         "name":"MOUSE",
         "id":"mouse",
         "src":"1f401.png",
         "dict":[
            "\uD83D\uDC01"
         ]
      },
      {
         "name":"OX",
         "id":"ox",
         "src":"1f402.png",
         "dict":[
            "\uD83D\uDC02"
         ]
      },
      {
         "name":"WATER BUFFALO",
         "id":"water_buffalo",
         "src":"1f403.png",
         "dict":[
            "\uD83D\uDC03"
         ]
      },
      {
         "name":"COW",
         "id":"cow",
         "src":"1f404.png",
         "dict":[
            "\uD83D\uDC04"
         ]
      },
      {
         "name":"TIGER",
         "id":"tiger",
         "src":"1f405.png",
         "dict":[
            "\uD83D\uDC05"
         ]
      },
      {
         "name":"LEOPARD",
         "id":"leopard",
         "src":"1f406.png",
         "dict":[
            "\uD83D\uDC06"
         ]
      },
      {
         "name":"RABBIT",
         "id":"rabbit",
         "src":"1f407.png",
         "dict":[
            "\uD83D\uDC07"
         ]
      },
      {
         "name":"CAT",
         "id":"cat",
         "src":"1f408.png",
         "dict":[
            "\uD83D\uDC08"
         ]
      },
      {
         "name":"DRAGON",
         "id":"dragon",
         "src":"1f409.png",
         "dict":[
            "\uD83D\uDC09"
         ]
      },
      {
         "name":"CROCODILE",
         "id":"crocodile",
         "src":"1f40a.png",
         "dict":[
            "\uD83D\uDC0A"
         ]
      },
      {
         "name":"WHALE",
         "id":"whale",
         "src":"1f40b.png",
         "dict":[
            "\uD83D\uDC0B"
         ]
      },
      {
         "name":"SNAIL",
         "id":"snail",
         "src":"1f40c.png",
         "dict":[
            "\uD83D\uDC0C"
         ]
      },
      {
         "name":"SNAKE",
         "id":"snake",
         "src":"1f40d.png",
         "dict":[
            "\uD83D\uDC0D",
            "\uE52D"
         ]
      },
      {
         "name":"HORSE",
         "id":"horse",
         "src":"1f40e.png",
         "dict":[
            "\uD83D\uDC0E",
            "\uE134"
         ]
      },
      {
         "name":"RAM",
         "id":"ram",
         "src":"1f40f.png",
         "dict":[
            "\uD83D\uDC0F"
         ]
      },
      {
         "name":"GOAT",
         "id":"goat",
         "src":"1f410.png",
         "dict":[
            "\uD83D\uDC10"
         ]
      },
      {
         "name":"SHEEP",
         "id":"sheep",
         "src":"1f411.png",
         "dict":[
            "\uD83D\uDC11",
            "\uE529"
         ]
      },
      {
         "name":"MONKEY",
         "id":"monkey",
         "src":"1f412.png",
         "dict":[
            "\uD83D\uDC12",
            "\uE528"
         ]
      },
      {
         "name":"ROOSTER",
         "id":"rooster",
         "src":"1f413.png",
         "dict":[
            "\uD83D\uDC13"
         ]
      },
      {
         "name":"CHICKEN",
         "id":"chicken",
         "src":"1f414.png",
         "dict":[
            "\uD83D\uDC14",
            "\uE52E"
         ]
      },
      {
         "name":"DOG",
         "id":"dog",
         "src":"1f415.png",
         "dict":[
            "\uD83D\uDC15"
         ]
      },
      {
         "name":"PIG",
         "id":"pig",
         "src":"1f416.png",
         "dict":[
            "\uD83D\uDC16"
         ]
      },
      {
         "name":"BOAR",
         "id":"boar",
         "src":"1f417.png",
         "dict":[
            "\uD83D\uDC17",
            "\uE52F"
         ]
      },
      {
         "name":"ELEPHANT",
         "id":"elephant",
         "src":"1f418.png",
         "dict":[
            "\uD83D\uDC18",
            "\uE526"
         ]
      },
      {
         "name":"OCTOPUS",
         "id":"octopus",
         "src":"1f419.png",
         "dict":[
            "\uD83D\uDC19",
            "\uE10A"
         ]
      },
      {
         "name":"SPIRAL SHELL",
         "id":"spiral_shell",
         "src":"1f41a.png",
         "dict":[
            "\uD83D\uDC1A",
            "\uE441"
         ]
      },
      {
         "name":"BUG",
         "id":"bug",
         "src":"1f41b.png",
         "dict":[
            "\uD83D\uDC1B",
            "\uE525"
         ]
      },
      {
         "name":"ANT",
         "id":"ant",
         "src":"1f41c.png",
         "dict":[
            "\uD83D\uDC1C"
         ]
      },
      {
         "name":"HONEYBEE",
         "id":"honeybee",
         "src":"1f41d.png",
         "dict":[
            "\uD83D\uDC1D"
         ]
      },
      {
         "name":"LADY BEETLE",
         "id":"lady_beetle",
         "src":"1f41e.png",
         "dict":[
            "\uD83D\uDC1E"
         ]
      },
      {
         "name":"FISH",
         "id":"fish",
         "src":"1f41f.png",
         "dict":[
            "\uD83D\uDC1F",
            "\uE019"
         ]
      },
      {
         "name":"TROPICAL FISH",
         "id":"tropical_fish",
         "src":"1f420.png",
         "dict":[
            "\uD83D\uDC20",
            "\uE522"
         ]
      },
      {
         "name":"BLOWFISH",
         "id":"blowfish",
         "src":"1f421.png",
         "dict":[
            "\uD83D\uDC21"
         ]
      },
      {
         "name":"TURTLE",
         "id":"turtle",
         "src":"1f422.png",
         "dict":[
            "\uD83D\uDC22"
         ]
      },
      {
         "name":"HATCHING CHICK",
         "id":"hatching_chick",
         "src":"1f423.png",
         "dict":[
            "\uD83D\uDC23"
         ]
      },
      {
         "name":"BABY CHICK",
         "id":"baby_chick",
         "src":"1f424.png",
         "dict":[
            "\uD83D\uDC24",
            "\uE523"
         ]
      },
      {
         "name":"FRONT-FACING BABY CHICK",
         "id":"front-facing_baby_chick",
         "src":"1f425.png",
         "dict":[
            "\uD83D\uDC25"
         ]
      },
      {
         "name":"BIRD",
         "id":"bird",
         "src":"1f426.png",
         "dict":[
            "\uD83D\uDC26",
            "\uE521"
         ]
      },
      {
         "name":"PENGUIN",
         "id":"penguin",
         "src":"1f427.png",
         "dict":[
            "\uD83D\uDC27",
            "\uE055"
         ]
      },
      {
         "name":"KOALA",
         "id":"koala",
         "src":"1f428.png",
         "dict":[
            "\uD83D\uDC28",
            "\uE527"
         ]
      },
      {
         "name":"POODLE",
         "id":"poodle",
         "src":"1f429.png",
         "dict":[
            "\uD83D\uDC29"
         ]
      },
      {
         "name":"DROMEDARY CAMEL",
         "id":"dromedary_camel",
         "src":"1f42a.png",
         "dict":[
            "\uD83D\uDC2A"
         ]
      },
      {
         "name":"BACTRIAN CAMEL",
         "id":"bactrian_camel",
         "src":"1f42b.png",
         "dict":[
            "\uD83D\uDC2B",
            "\uE530"
         ]
      },
      {
         "name":"DOLPHIN",
         "id":"dolphin",
         "src":"1f42c.png",
         "dict":[
            "\uD83D\uDC2C",
            "\uE520"
         ]
      },
      {
         "name":"MOUSE FACE",
         "id":"mouse_face",
         "src":"1f42d.png",
         "dict":[
            "\uD83D\uDC2D",
            "\uE053"
         ]
      },
      {
         "name":"COW FACE",
         "id":"cow_face",
         "src":"1f42e.png",
         "dict":[
            "\uD83D\uDC2E",
            "\uE52B"
         ]
      },
      {
         "name":"TIGER FACE",
         "id":"tiger_face",
         "src":"1f42f.png",
         "dict":[
            "\uD83D\uDC2F",
            "\uE050"
         ]
      },
      {
         "name":"RABBIT FACE",
         "id":"rabbit_face",
         "src":"1f430.png",
         "dict":[
            "\uD83D\uDC30",
            "\uE52C"
         ]
      },
      {
         "name":"CAT FACE",
         "id":"cat_face",
         "src":"1f431.png",
         "dict":[
            "\uD83D\uDC31",
            "\uE04F"
         ]
      },
      {
         "name":"DRAGON FACE",
         "id":"dragon_face",
         "src":"1f432.png",
         "dict":[
            "\uD83D\uDC32"
         ]
      },
      {
         "name":"SPOUTING WHALE",
         "id":"spouting_whale",
         "src":"1f433.png",
         "dict":[
            "\uD83D\uDC33",
            "\uE054"
         ]
      },
      {
         "name":"HORSE FACE",
         "id":"horse_face",
         "src":"1f434.png",
         "dict":[
            "\uD83D\uDC34",
            "\uE01A"
         ]
      },
      {
         "name":"MONKEY FACE",
         "id":"monkey_face",
         "src":"1f435.png",
         "dict":[
            "\uD83D\uDC35",
            "\uE109"
         ]
      },
      {
         "name":"DOG FACE",
         "id":"dog_face",
         "src":"1f436.png",
         "dict":[
            "\uD83D\uDC36",
            "\uE052"
         ]
      },
      {
         "name":"PIG FACE",
         "id":"pig_face",
         "src":"1f437.png",
         "dict":[
            "\uD83D\uDC37",
            "\uE10B"
         ]
      },
      {
         "name":"FROG FACE",
         "id":"frog_face",
         "src":"1f438.png",
         "dict":[
            "\uD83D\uDC38",
            "\uE531"
         ]
      },
      {
         "name":"HAMSTER FACE",
         "id":"hamster_face",
         "src":"1f439.png",
         "dict":[
            "\uD83D\uDC39",
            "\uE524"
         ]
      },
      {
         "name":"WOLF FACE",
         "id":"wolf_face",
         "src":"1f43a.png",
         "dict":[
            "\uD83D\uDC3A",
            "\uE52A"
         ]
      },
      {
         "name":"BEAR FACE",
         "id":"bear_face",
         "src":"1f43b.png",
         "dict":[
            "\uD83D\uDC3B",
            "\uE051"
         ]
      },
      {
         "name":"PANDA FACE",
         "id":"panda_face",
         "src":"1f43c.png",
         "dict":[
            "\uD83D\uDC3C"
         ]
      },
      {
         "name":"PIG NOSE",
         "id":"pig_nose",
         "src":"1f43d.png",
         "dict":[
            "\uD83D\uDC3D"
         ]
      },
      {
         "name":"PAW PRINTS",
         "id":"paw_prints",
         "src":"1f43e.png",
         "dict":[
            "\uD83D\uDC3E"
         ]
      },
      {
         "name":"EYES",
         "id":"eyes",
         "src":"1f440.png",
         "dict":[
            "\uD83D\uDC40",
            "\uE419"
         ]
      },
      {
         "name":"EAR",
         "id":"ear",
         "src":"1f442.png",
         "dict":[
            "\uD83D\uDC42",
            "\uE41B"
         ]
      },
      {
         "name":"NOSE",
         "id":"nose",
         "src":"1f443.png",
         "dict":[
            "\uD83D\uDC43",
            "\uE41A"
         ]
      },
      {
         "name":"MOUTH",
         "id":"mouth",
         "src":"1f444.png",
         "dict":[
            "\uD83D\uDC44",
            "\uE41C"
         ]
      },
      {
         "name":"TONGUE",
         "id":"tongue",
         "src":"1f445.png",
         "dict":[
            "\uD83D\uDC45"
         ]
      },
      {
         "name":"WHITE UP POINTING BACKHAND INDEX",
         "id":"white_up_pointing_backhand_index",
         "src":"1f446.png",
         "dict":[
            "\uD83D\uDC46",
            "\uE22E"
         ]
      },
      {
         "name":"WHITE DOWN POINTING BACKHAND INDEX",
         "id":"white_down_pointing_backhand_index",
         "src":"1f447.png",
         "dict":[
            "\uD83D\uDC47",
            "\uE22F"
         ]
      },
      {
         "name":"WHITE LEFT POINTING BACKHAND INDEX",
         "id":"white_left_pointing_backhand_index",
         "src":"1f448.png",
         "dict":[
            "\uD83D\uDC48",
            "\uE230"
         ]
      },
      {
         "name":"WHITE RIGHT POINTING BACKHAND INDEX",
         "id":"white_right_pointing_backhand_index",
         "src":"1f449.png",
         "dict":[
            "\uD83D\uDC49",
            "\uE231"
         ]
      },
      {
         "name":"FISTED HAND SIGN",
         "id":"fisted_hand_sign",
         "src":"1f44a.png",
         "dict":[
            "\uD83D\uDC4A",
            "\uE00D"
         ]
      },
      {
         "name":"WAVING HAND SIGN",
         "id":"waving_hand_sign",
         "src":"1f44b.png",
         "dict":[
            "\uD83D\uDC4B",
            "\uE41E"
         ]
      },
      {
         "name":"OK HAND SIGN",
         "id":"ok_hand_sign",
         "src":"1f44c.png",
         "dict":[
            "\uD83D\uDC4C",
            "\uE420"
         ]
      },
      {
         "name":"THUMBS UP SIGN",
         "id":"thumbs_up_sign",
         "src":"1f44d.png",
         "dict":[
            "\uD83D\uDC4D",
            "\uE00E"
         ]
      },
      {
         "name":"THUMBS DOWN SIGN",
         "id":"thumbs_down_sign",
         "src":"1f44e.png",
         "dict":[
            "\uD83D\uDC4E",
            "\uE421"
         ]
      },
      {
         "name":"CLAPPING HANDS SIGN",
         "id":"clapping_hands_sign",
         "src":"1f44f.png",
         "dict":[
            "\uD83D\uDC4F",
            "\uE41F"
         ]
      },
      {
         "name":"OPEN HANDS SIGN",
         "id":"open_hands_sign",
         "src":"1f450.png",
         "dict":[
            "\uD83D\uDC50",
            "\uE422"
         ]
      },
      {
         "name":"CROWN",
         "id":"crown",
         "src":"1f451.png",
         "dict":[
            "\uD83D\uDC51",
            "\uE10E"
         ]
      },
      {
         "name":"WOMANS HAT",
         "id":"womans_hat",
         "src":"1f452.png",
         "dict":[
            "\uD83D\uDC52",
            "\uE318"
         ]
      },
      {
         "name":"EYEGLASSES",
         "id":"eyeglasses",
         "src":"1f453.png",
         "dict":[
            "\uD83D\uDC53"
         ]
      },
      {
         "name":"NECKTIE",
         "id":"necktie",
         "src":"1f454.png",
         "dict":[
            "\uD83D\uDC54",
            "\uE302"
         ]
      },
      {
         "name":"T-SHIRT",
         "id":"t-shirt",
         "src":"1f455.png",
         "dict":[
            "\uD83D\uDC55",
            "\uE006"
         ]
      },
      {
         "name":"JEANS",
         "id":"jeans",
         "src":"1f456.png",
         "dict":[
            "\uD83D\uDC56"
         ]
      },
      {
         "name":"DRESS",
         "id":"dress",
         "src":"1f457.png",
         "dict":[
            "\uD83D\uDC57",
            "\uE319"
         ]
      },
      {
         "name":"KIMONO",
         "id":"kimono",
         "src":"1f458.png",
         "dict":[
            "\uD83D\uDC58",
            "\uE321"
         ]
      },
      {
         "name":"BIKINI",
         "id":"bikini",
         "src":"1f459.png",
         "dict":[
            "\uD83D\uDC59",
            "\uE322"
         ]
      },
      {
         "name":"WOMANS CLOTHES",
         "id":"womans_clothes",
         "src":"1f45a.png",
         "dict":[
            "\uD83D\uDC5A"
         ]
      },
      {
         "name":"PURSE",
         "id":"purse",
         "src":"1f45b.png",
         "dict":[
            "\uD83D\uDC5B"
         ]
      },
      {
         "name":"HANDBAG",
         "id":"handbag",
         "src":"1f45c.png",
         "dict":[
            "\uD83D\uDC5C",
            "\uE323"
         ]
      },
      {
         "name":"POUCH",
         "id":"pouch",
         "src":"1f45d.png",
         "dict":[
            "\uD83D\uDC5D"
         ]
      },
      {
         "name":"MANS SHOE",
         "id":"mans_shoe",
         "src":"1f45e.png",
         "dict":[
            "\uD83D\uDC5E"
         ]
      },
      {
         "name":"ATHLETIC SHOE",
         "id":"athletic_shoe",
         "src":"1f45f.png",
         "dict":[
            "\uD83D\uDC5F",
            "\uE007"
         ]
      },
      {
         "name":"HIGH-HEELED SHOE",
         "id":"high-heeled_shoe",
         "src":"1f460.png",
         "dict":[
            "\uD83D\uDC60",
            "\uE13E"
         ]
      },
      {
         "name":"WOMANS SANDAL",
         "id":"womans_sandal",
         "src":"1f461.png",
         "dict":[
            "\uD83D\uDC61",
            "\uE31A"
         ]
      },
      {
         "name":"WOMANS BOOTS",
         "id":"womans_boots",
         "src":"1f462.png",
         "dict":[
            "\uD83D\uDC62",
            "\uE31B"
         ]
      },
      {
         "name":"FOOTPRINTS",
         "id":"footprints",
         "src":"1f463.png",
         "dict":[
            "\uD83D\uDC63",
            "\uE536"
         ]
      },
      {
         "name":"BUST IN SILHOUETTE",
         "id":"bust_in_silhouette",
         "src":"1f464.png",
         "dict":[
            "\uD83D\uDC64"
         ]
      },
      {
         "name":"BUSTS IN SILHOUETTE",
         "id":"busts_in_silhouette",
         "src":"1f465.png",
         "dict":[
            "\uD83D\uDC65"
         ]
      },
      {
         "name":"BOY",
         "id":"boy",
         "src":"1f466.png",
         "dict":[
            "\uD83D\uDC66",
            "\uE001"
         ]
      },
      {
         "name":"GIRL",
         "id":"girl",
         "src":"1f467.png",
         "dict":[
            "\uD83D\uDC67",
            "\uE002"
         ]
      },
      {
         "name":"MAN",
         "id":"man",
         "src":"1f468.png",
         "dict":[
            "\uD83D\uDC68",
            "\uE004"
         ]
      },
      {
         "name":"WOMAN",
         "id":"woman",
         "src":"1f469.png",
         "dict":[
            "\uD83D\uDC69",
            "\uE005"
         ]
      },
      {
         "name":"FAMILY",
         "id":"family",
         "src":"1f46a.png",
         "dict":[
            "\uD83D\uDC6A"
         ]
      },
      {
         "name":"MAN AND WOMAN HOLDING HANDS",
         "id":"man_and_woman_holding_hands",
         "src":"1f46b.png",
         "dict":[
            "\uD83D\uDC6B",
            "\uE428"
         ]
      },
      {
         "name":"TWO MEN HOLDING HANDS",
         "id":"two_men_holding_hands",
         "src":"1f46c.png",
         "dict":[
            "\uD83D\uDC6C"
         ]
      },
      {
         "name":"TWO WOMEN HOLDING HANDS",
         "id":"two_women_holding_hands",
         "src":"1f46d.png",
         "dict":[
            "\uD83D\uDC6D"
         ]
      },
      {
         "name":"POLICE OFFICER",
         "id":"police_officer",
         "src":"1f46e.png",
         "dict":[
            "\uD83D\uDC6E",
            "\uE152"
         ]
      },
      {
         "name":"WOMAN WITH BUNNY EARS",
         "id":"woman_with_bunny_ears",
         "src":"1f46f.png",
         "dict":[
            "\uD83D\uDC6F",
            "\uE429"
         ]
      },
      {
         "name":"BRIDE WITH VEIL",
         "id":"bride_with_veil",
         "src":"1f470.png",
         "dict":[
            "\uD83D\uDC70"
         ]
      },
      {
         "name":"PERSON WITH BOLND HAIR",
         "id":"person_with_bolnd_hair",
         "src":"1f471.png",
         "dict":[
            "\uD83D\uDC71",
            "\uE515"
         ]
      },
      {
         "name":"MAN WITH GUA PI MAO",
         "id":"man_with_gua_pi_mao",
         "src":"1f472.png",
         "dict":[
            "\uD83D\uDC72",
            "\uE516"
         ]
      },
      {
         "name":"MAN WITH TURBAN",
         "id":"man_with_turban",
         "src":"1f473.png",
         "dict":[
            "\uD83D\uDC73",
            "\uE517"
         ]
      },
      {
         "name":"OLDER MAN",
         "id":"older_man",
         "src":"1f474.png",
         "dict":[
            "\uD83D\uDC74",
            "\uE518"
         ]
      },
      {
         "name":"OLDER WOMAN",
         "id":"older_woman",
         "src":"1f475.png",
         "dict":[
            "\uD83D\uDC75",
            "\uE519"
         ]
      },
      {
         "name":"BABY",
         "id":"baby",
         "src":"1f476.png",
         "dict":[
            "\uD83D\uDC76",
            "\uE51A"
         ]
      },
      {
         "name":"CONSTRUCTION WORKER",
         "id":"construction_worker",
         "src":"1f477.png",
         "dict":[
            "\uD83D\uDC77",
            "\uE51B"
         ]
      },
      {
         "name":"PRINCESS",
         "id":"princess",
         "src":"1f478.png",
         "dict":[
            "\uD83D\uDC78",
            "\uE51C"
         ]
      },
      {
         "name":"JAPANESE OGRE",
         "id":"japanese_ogre",
         "src":"1f479.png",
         "dict":[
            "\uD83D\uDC79"
         ]
      },
      {
         "name":"JAPANESE GOBLIN",
         "id":"japanese_goblin",
         "src":"1f47a.png",
         "dict":[
            "\uD83D\uDC7A"
         ]
      },
      {
         "name":"GHOST",
         "id":"ghost",
         "src":"1f47b.png",
         "dict":[
            "\uD83D\uDC7B",
            "\uE11B"
         ]
      },
      {
         "name":"BABY ANGEL",
         "id":"baby_angel",
         "src":"1f47c.png",
         "dict":[
            "\uD83D\uDC7C",
            "\uE04E"
         ]
      },
      {
         "name":"EXTRATERRESTRIAL ALIEN",
         "id":"extraterrestrial_alien",
         "src":"1f47d.png",
         "dict":[
            "\uD83D\uDC7D",
            "\uE10C"
         ]
      },
      {
         "name":"ALIEN MONSTER",
         "id":"alien_monster",
         "src":"1f47e.png",
         "dict":[
            "\uD83D\uDC7E",
            "\uE12B"
         ]
      },
      {
         "name":"IMP",
         "id":"imp",
         "src":"1f47f.png",
         "dict":[
            "\uD83D\uDC7F",
            "\uE11A"
         ]
      },
      {
         "name":"SKULL",
         "id":"skull",
         "src":"1f480.png",
         "dict":[
            "\uD83D\uDC80",
            "\uE11C"
         ]
      },
      {
         "name":"INFORMATION DESK PERSON",
         "id":"information_desk_person",
         "src":"1f481.png",
         "dict":[
            "\uD83D\uDC81",
            "\uE253"
         ]
      },
      {
         "name":"GUARDSMAN",
         "id":"guardsman",
         "src":"1f482.png",
         "dict":[
            "\uD83D\uDC82",
            "\uE51E"
         ]
      },
      {
         "name":"DANCER",
         "id":"dancer",
         "src":"1f483.png",
         "dict":[
            "\uD83D\uDC83",
            "\uE51F"
         ]
      },
      {
         "name":"LIPSTICK",
         "id":"lipstick",
         "src":"1f484.png",
         "dict":[
            "\uD83D\uDC84",
            "\uE31C"
         ]
      },
      {
         "name":"NAIL POLISH",
         "id":"nail_polish",
         "src":"1f485.png",
         "dict":[
            "\uD83D\uDC85",
            "\uE31D"
         ]
      },
      {
         "name":"FACE MASSAGE",
         "id":"face_massage",
         "src":"1f486.png",
         "dict":[
            "\uD83D\uDC86",
            "\uE31E"
         ]
      },
      {
         "name":"HAIRCUT",
         "id":"haircut",
         "src":"1f487.png",
         "dict":[
            "\uD83D\uDC87",
            "\uE31F"
         ]
      },
      {
         "name":"BARBER POLE",
         "id":"barber_pole",
         "src":"1f488.png",
         "dict":[
            "\uD83D\uDC88",
            "\uE320"
         ]
      },
      {
         "name":"SYRINGE",
         "id":"syringe",
         "src":"1f489.png",
         "dict":[
            "\uD83D\uDC89",
            "\uE13B"
         ]
      },
      {
         "name":"PILL",
         "id":"pill",
         "src":"1f48a.png",
         "dict":[
            "\uD83D\uDC8A",
            "\uE30F"
         ]
      },
      {
         "name":"KISS MARK",
         "id":"kiss_mark",
         "src":"1f48b.png",
         "dict":[
            "\uD83D\uDC8B",
            "\uE003"
         ]
      },
      {
         "name":"LOVE LETTER",
         "id":"love_letter",
         "src":"1f48c.png",
         "dict":[
            "\uD83D\uDC8C"
         ]
      },
      {
         "name":"RING",
         "id":"ring",
         "src":"1f48d.png",
         "dict":[
            "\uD83D\uDC8D",
            "\uE034"
         ]
      },
      {
         "name":"GEM STONE",
         "id":"gem_stone",
         "src":"1f48e.png",
         "dict":[
            "\uD83D\uDC8E",
            "\uE035"
         ]
      },
      {
         "name":"KISS",
         "id":"kiss",
         "src":"1f48f.png",
         "dict":[
            "\uD83D\uDC8F",
            "\uE111"
         ]
      },
      {
         "name":"BOUQUET",
         "id":"bouquet",
         "src":"1f490.png",
         "dict":[
            "\uD83D\uDC90",
            "\uE306"
         ]
      },
      {
         "name":"COUPLE WITH HEART",
         "id":"couple_with_heart",
         "src":"1f491.png",
         "dict":[
            "\uD83D\uDC91",
            "\uE425"
         ]
      },
      {
         "name":"WEDDING",
         "id":"wedding",
         "src":"1f492.png",
         "dict":[
            "\uD83D\uDC92",
            "\uE43D"
         ]
      },
      {
         "name":"BEATING HEART",
         "id":"beating_heart",
         "src":"1f493.png",
         "dict":[
            "\uD83D\uDC93",
            "\uE327"
         ]
      },
      {
         "name":"BROKEN HEART",
         "id":"broken_heart",
         "src":"1f494.png",
         "dict":[
            "\uD83D\uDC94",
            "\uE023"
         ]
      },
      {
         "name":"TWO HEARTS",
         "id":"two_hearts",
         "src":"1f495.png",
         "dict":[
            "\uD83D\uDC95"
         ]
      },
      {
         "name":"SPARKLING HEART",
         "id":"sparkling_heart",
         "src":"1f496.png",
         "dict":[
            "\uD83D\uDC96"
         ]
      },
      {
         "name":"GROWING HEART",
         "id":"growing_heart",
         "src":"1f497.png",
         "dict":[
            "\uD83D\uDC97",
            "\uE328"
         ]
      },
      {
         "name":"HEART WITH ARROW",
         "id":"heart_with_arrow",
         "src":"1f498.png",
         "dict":[
            "\uD83D\uDC98",
            "\uE329"
         ]
      },
      {
         "name":"BLUE HEART",
         "id":"blue_heart",
         "src":"1f499.png",
         "dict":[
            "\uD83D\uDC99",
            "\uE32A"
         ]
      },
      {
         "name":"GREEN HEART",
         "id":"green_heart",
         "src":"1f49a.png",
         "dict":[
            "\uD83D\uDC9A",
            "\uE32B"
         ]
      },
      {
         "name":"YELLOW HEART",
         "id":"yellow_heart",
         "src":"1f49b.png",
         "dict":[
            "\uD83D\uDC9B",
            "\uE32C"
         ]
      },
      {
         "name":"PURPLE HEART",
         "id":"purple_heart",
         "src":"1f49c.png",
         "dict":[
            "\uD83D\uDC9C",
            "\uE32D"
         ]
      },
      {
         "name":"HEART WITH RIBBON",
         "id":"heart_with_ribbon",
         "src":"1f49d.png",
         "dict":[
            "\uD83D\uDC9D",
            "\uE437"
         ]
      },
      {
         "name":"REVOLVING HEARTS",
         "id":"revolving_hearts",
         "src":"1f49e.png",
         "dict":[
            "\uD83D\uDC9E"
         ]
      },
      {
         "name":"HEART DECORATION",
         "id":"heart_decoration",
         "src":"1f49f.png",
         "dict":[
            "\uD83D\uDC9F",
            "\uE204"
         ]
      },
      {
         "name":"DIAMOND SHAPE WITH A DOT INSIDE",
         "id":"diamond_shape_with_a_dot_inside",
         "src":"1f4a0.png",
         "dict":[
            "\uD83D\uDCA0"
         ]
      },
      {
         "name":"ELECTRIC LIGHT BULB",
         "id":"electric_light_bulb",
         "src":"1f4a1.png",
         "dict":[
            "\uD83D\uDCA1",
            "\uE10F"
         ]
      },
      {
         "name":"ANGER SYMBOL",
         "id":"anger_symbol",
         "src":"1f4a2.png",
         "dict":[
            "\uD83D\uDCA2",
            "\uE334"
         ]
      },
      {
         "name":"BOMB",
         "id":"bomb",
         "src":"1f4a3.png",
         "dict":[
            "\uD83D\uDCA3",
            "\uE311"
         ]
      },
      {
         "name":"SLEEPING SYMBOL",
         "id":"sleeping_symbol",
         "src":"1f4a4.png",
         "dict":[
            "\uD83D\uDCA4",
            "\uE13C"
         ]
      },
      {
         "name":"COLLISION SYMBOL",
         "id":"collision_symbol",
         "src":"1f4a5.png",
         "dict":[
            "\uD83D\uDCA5"
         ]
      },
      {
         "name":"SPLASHING SWEAT SYMBOL",
         "id":"splashing_sweat_symbol",
         "src":"1f4a6.png",
         "dict":[
            "\uD83D\uDCA6",
            "\uE331"
         ]
      },
      {
         "name":"DROPLET",
         "id":"droplet",
         "src":"1f4a7.png",
         "dict":[
            "\uD83D\uDCA7"
         ]
      },
      {
         "name":"DASH SYMBOL",
         "id":"dash_symbol",
         "src":"1f4a8.png",
         "dict":[
            "\uD83D\uDCA8",
            "\uE330"
         ]
      },
      {
         "name":"PILE OF POO",
         "id":"pile_of_poo",
         "src":"1f4a9.png",
         "dict":[
            "\uD83D\uDCA9",
            "\uE05A"
         ]
      },
      {
         "name":"FLEXED BICEPS",
         "id":"flexed_biceps",
         "src":"1f4aa.png",
         "dict":[
            "\uD83D\uDCAA",
            "\uE14C"
         ]
      },
      {
         "name":"DIZZY SYMBOL",
         "id":"dizzy_symbol",
         "src":"1f4ab.png",
         "dict":[
            "\uD83D\uDCAB"
         ]
      },
      {
         "name":"SPEECH BALLOON",
         "id":"speech_balloon",
         "src":"1f4ac.png",
         "dict":[
            "\uD83D\uDCAC"
         ]
      },
      {
         "name":"THOUGHT BALLOON",
         "id":"thought_balloon",
         "src":"1f4ad.png",
         "dict":[
            "\uD83D\uDCAD"
         ]
      },
      {
         "name":"WHITE FLOWER",
         "id":"white_flower",
         "src":"1f4ae.png",
         "dict":[
            "\uD83D\uDCAE"
         ]
      },
      {
         "name":"HUNDRED POINTS SYMBOL",
         "id":"hundred_points_symbol",
         "src":"1f4af.png",
         "dict":[
            "\uD83D\uDCAF"
         ]
      },
      {
         "name":"MONEY BAG",
         "id":"money_bag",
         "src":"1f4b0.png",
         "dict":[
            "\uD83D\uDCB0",
            "\uE12F"
         ]
      },
      {
         "name":"CURRENCY EXCHANGE",
         "id":"currency_exchange",
         "src":"1f4b1.png",
         "dict":[
            "\uD83D\uDCB1",
            "\uE149"
         ]
      },
      {
         "name":"HEAVY DOLLAR SIGN",
         "id":"heavy_dollar_sign",
         "src":"1f4b2.png",
         "dict":[
            "\uD83D\uDCB2"
         ]
      },
      {
         "name":"CREDIT CARD",
         "id":"credit_card",
         "src":"1f4b3.png",
         "dict":[
            "\uD83D\uDCB3"
         ]
      },
      {
         "name":"BANKNOTE WITH YEN SYMBOL",
         "id":"banknote_with_yen_symbol",
         "src":"1f4b4.png",
         "dict":[
            "\uD83D\uDCB4"
         ]
      },
      {
         "name":"BANKNOTE WITH DOLLAR SIGN",
         "id":"banknote_with_dollar_sign",
         "src":"1f4b5.png",
         "dict":[
            "\uD83D\uDCB5"
         ]
      },
      {
         "name":"BANKNOTE WITH EURO SIGN",
         "id":"banknote_with_euro_sign",
         "src":"1f4b6.png",
         "dict":[
            "\uD83D\uDCB6"
         ]
      },
      {
         "name":"BANKNOTE WITH POUND SIGN",
         "id":"banknote_with_pound_sign",
         "src":"1f4b7.png",
         "dict":[
            "\uD83D\uDCB7"
         ]
      },
      {
         "name":"MONEY WITH WINGS",
         "id":"money_with_wings",
         "src":"1f4b8.png",
         "dict":[
            "\uD83D\uDCB8"
         ]
      },
      {
         "name":"CHART WITH UPWARDS TREND AND YEN SIGN",
         "id":"chart_with_upwards_trend_and_yen_sign",
         "src":"1f4b9.png",
         "dict":[
            "\uD83D\uDCB9",
            "\uE14A"
         ]
      },
      {
         "name":"SEAT",
         "id":"seat",
         "src":"1f4ba.png",
         "dict":[
            "\uD83D\uDCBA",
            "\uE11F"
         ]
      },
      {
         "name":"PERSONAL COMPUTER",
         "id":"personal_computer",
         "src":"1f4bb.png",
         "dict":[
            "\uD83D\uDCBB",
            "\uE00C"
         ]
      },
      {
         "name":"BRIEFCASE",
         "id":"briefcase",
         "src":"1f4bc.png",
         "dict":[
            "\uD83D\uDCBC",
            "\uE11E"
         ]
      },
      {
         "name":"MINIDISC",
         "id":"minidisc",
         "src":"1f4bd.png",
         "dict":[
            "\uD83D\uDCBD",
            "\uE316"
         ]
      },
      {
         "name":"FLOPPY DISK",
         "id":"floppy_disk",
         "src":"1f4be.png",
         "dict":[
            "\uD83D\uDCBE"
         ]
      },
      {
         "name":"OPTICAL DISC",
         "id":"optical_disc",
         "src":"1f4bf.png",
         "dict":[
            "\uD83D\uDCBF",
            "\uE126"
         ]
      },
      {
         "name":"DVD",
         "id":"dvd",
         "src":"1f4c0.png",
         "dict":[
            "\uD83D\uDCC0",
            "\uE127"
         ]
      },
      {
         "name":"FILE FOLDER",
         "id":"file_folder",
         "src":"1f4c1.png",
         "dict":[
            "\uD83D\uDCC1"
         ]
      },
      {
         "name":"OPEN FILE FOLDER",
         "id":"open_file_folder",
         "src":"1f4c2.png",
         "dict":[
            "\uD83D\uDCC2"
         ]
      },
      {
         "name":"PAGE WITH CURL",
         "id":"page_with_curl",
         "src":"1f4c3.png",
         "dict":[
            "\uD83D\uDCC3"
         ]
      },
      {
         "name":"PAGE FACING UP",
         "id":"page_facing_up",
         "src":"1f4c4.png",
         "dict":[
            "\uD83D\uDCC4"
         ]
      },
      {
         "name":"CALENDAR",
         "id":"calendar",
         "src":"1f4c5.png",
         "dict":[
            "\uD83D\uDCC5"
         ]
      },
      {
         "name":"TEAR-OFF CALENDAR",
         "id":"tear-off_calendar",
         "src":"1f4c6.png",
         "dict":[
            "\uD83D\uDCC6"
         ]
      },
      {
         "name":"CARD INDEX",
         "id":"card_index",
         "src":"1f4c7.png",
         "dict":[
            "\uD83D\uDCC7"
         ]
      },
      {
         "name":"CHART WITH UPWARDS TREND",
         "id":"chart_with_upwards_trend",
         "src":"1f4c8.png",
         "dict":[
            "\uD83D\uDCC8"
         ]
      },
      {
         "name":"CHART WITH DOWNWARDS TREND",
         "id":"chart_with_downwards_trend",
         "src":"1f4c9.png",
         "dict":[
            "\uD83D\uDCC9"
         ]
      },
      {
         "name":"BAR CHART",
         "id":"bar_chart",
         "src":"1f4ca.png",
         "dict":[
            "\uD83D\uDCCA"
         ]
      },
      {
         "name":"CLIPBOARD",
         "id":"clipboard",
         "src":"1f4cb.png",
         "dict":[
            "\uD83D\uDCCB"
         ]
      },
      {
         "name":"PUSHPIN",
         "id":"pushpin",
         "src":"1f4cc.png",
         "dict":[
            "\uD83D\uDCCC"
         ]
      },
      {
         "name":"ROUND PUSHPIN",
         "id":"round_pushpin",
         "src":"1f4cd.png",
         "dict":[
            "\uD83D\uDCCD"
         ]
      },
      {
         "name":"PAPERCLIP",
         "id":"paperclip",
         "src":"1f4ce.png",
         "dict":[
            "\uD83D\uDCCE"
         ]
      },
      {
         "name":"STRAIGHT RULER",
         "id":"straight_ruler",
         "src":"1f4cf.png",
         "dict":[
            "\uD83D\uDCCF"
         ]
      },
      {
         "name":"TRIANGULAR RULER",
         "id":"triangular_ruler",
         "src":"1f4d0.png",
         "dict":[
            "\uD83D\uDCD0"
         ]
      },
      {
         "name":"BOOKMARK TABS",
         "id":"bookmark_tabs",
         "src":"1f4d1.png",
         "dict":[
            "\uD83D\uDCD1"
         ]
      },
      {
         "name":"LEDGER",
         "id":"ledger",
         "src":"1f4d2.png",
         "dict":[
            "\uD83D\uDCD2"
         ]
      },
      {
         "name":"NOTEBOOK",
         "id":"notebook",
         "src":"1f4d3.png",
         "dict":[
            "\uD83D\uDCD3"
         ]
      },
      {
         "name":"NOTEBOOK WITH DECORATIVE COVER",
         "id":"notebook_with_decorative_cover",
         "src":"1f4d4.png",
         "dict":[
            "\uD83D\uDCD4"
         ]
      },
      {
         "name":"CLOSED BOOK",
         "id":"closed_book",
         "src":"1f4d5.png",
         "dict":[
            "\uD83D\uDCD5"
         ]
      },
      {
         "name":"OPEN BOOK",
         "id":"open_book",
         "src":"1f4d6.png",
         "dict":[
            "\uD83D\uDCD6",
            "\uE148"
         ]
      },
      {
         "name":"GREEN BOOK",
         "id":"green_book",
         "src":"1f4d7.png",
         "dict":[
            "\uD83D\uDCD7"
         ]
      },
      {
         "name":"BLUE BOOK",
         "id":"blue_book",
         "src":"1f4d8.png",
         "dict":[
            "\uD83D\uDCD8"
         ]
      },
      {
         "name":"ORANGE BOOK",
         "id":"orange_book",
         "src":"1f4d9.png",
         "dict":[
            "\uD83D\uDCD9"
         ]
      },
      {
         "name":"BOOKS",
         "id":"books",
         "src":"1f4da.png",
         "dict":[
            "\uD83D\uDCDA"
         ]
      },
      {
         "name":"NAME BADGE",
         "id":"name_badge",
         "src":"1f4db.png",
         "dict":[
            "\uD83D\uDCDB"
         ]
      },
      {
         "name":"SCROLL",
         "id":"scroll",
         "src":"1f4dc.png",
         "dict":[
            "\uD83D\uDCDC"
         ]
      },
      {
         "name":"MEMO",
         "id":"memo",
         "src":"1f4dd.png",
         "dict":[
            "\uD83D\uDCDD",
            "\uE301"
         ]
      },
      {
         "name":"TELEPHONE RECEIVER",
         "id":"telephone_receiver",
         "src":"1f4de.png",
         "dict":[
            "\uD83D\uDCDE"
         ]
      },
      {
         "name":"PAGER",
         "id":"pager",
         "src":"1f4df.png",
         "dict":[
            "\uD83D\uDCDF"
         ]
      },
      {
         "name":"FAX MACHINE",
         "id":"fax_machine",
         "src":"1f4e0.png",
         "dict":[
            "\uD83D\uDCE0",
            "\uE00B"
         ]
      },
      {
         "name":"SATELLITE ANTENNA",
         "id":"satellite_antenna",
         "src":"1f4e1.png",
         "dict":[
            "\uD83D\uDCE1",
            "\uE14B"
         ]
      },
      {
         "name":"PUBLIC ADDRESS LOUDSPEAKER",
         "id":"public_address_loudspeaker",
         "src":"1f4e2.png",
         "dict":[
            "\uD83D\uDCE2",
            "\uE142"
         ]
      },
      {
         "name":"CHEERING MEGAPHONE",
         "id":"cheering_megaphone",
         "src":"1f4e3.png",
         "dict":[
            "\uD83D\uDCE3",
            "\uE317"
         ]
      },
      {
         "name":"OUTBOX TRAY",
         "id":"outbox_tray",
         "src":"1f4e4.png",
         "dict":[
            "\uD83D\uDCE4"
         ]
      },
      {
         "name":"INBOX TRAY",
         "id":"inbox_tray",
         "src":"1f4e5.png",
         "dict":[
            "\uD83D\uDCE5"
         ]
      },
      {
         "name":"PACKAGE",
         "id":"package",
         "src":"1f4e6.png",
         "dict":[
            "\uD83D\uDCE6"
         ]
      },
      {
         "name":"E-MAIL SYMBOL",
         "id":"e-mail_symbol",
         "src":"1f4e7.png",
         "dict":[
            "\uD83D\uDCE7"
         ]
      },
      {
         "name":"INCOMING ENVELOPE",
         "id":"incoming_envelope",
         "src":"1f4e8.png",
         "dict":[
            "\uD83D\uDCE8"
         ]
      },
      {
         "name":"ENVELOPE WITH DOWNWARDS ARROW ABOVE",
         "id":"envelope_with_downwards_arrow_above",
         "src":"1f4e9.png",
         "dict":[
            "\uD83D\uDCE9",
            "\uE103"
         ]
      },
      {
         "name":"CLOSED MAILBOX WITH LOWERED FLAG",
         "id":"closed_mailbox_with_lowered_flag",
         "src":"1f4ea.png",
         "dict":[
            "\uD83D\uDCEA"
         ]
      },
      {
         "name":"CLOSED MAILBOX WITH RAISED FLAG",
         "id":"closed_mailbox_with_raised_flag",
         "src":"1f4eb.png",
         "dict":[
            "\uD83D\uDCEB",
            "\uE101"
         ]
      },
      {
         "name":"OPEN MAILBOX WITH RAISED FLAG",
         "id":"open_mailbox_with_raised_flag",
         "src":"1f4ec.png",
         "dict":[
            "\uD83D\uDCEC"
         ]
      },
      {
         "name":"OPEN MAILBOX WITH LOWERED FLAG",
         "id":"open_mailbox_with_lowered_flag",
         "src":"1f4ed.png",
         "dict":[
            "\uD83D\uDCED"
         ]
      },
      {
         "name":"POSTBOX",
         "id":"postbox",
         "src":"1f4ee.png",
         "dict":[
            "\uD83D\uDCEE",
            "\uE102"
         ]
      },
      {
         "name":"POSTAL HORN",
         "id":"postal_horn",
         "src":"1f4ef.png",
         "dict":[
            "\uD83D\uDCEF"
         ]
      },
      {
         "name":"NEWSPAPER",
         "id":"newspaper",
         "src":"1f4f0.png",
         "dict":[
            "\uD83D\uDCF0"
         ]
      },
      {
         "name":"MOBILE PHONE",
         "id":"mobile_phone",
         "src":"1f4f1.png",
         "dict":[
            "\uD83D\uDCF1",
            "\uE00A"
         ]
      },
      {
         "name":"MOBILE PHONE WITH RIGHTWARDS ARROW",
         "id":"mobile_phone_with_rightwards_arrow",
         "src":"1f4f2.png",
         "dict":[
            "\uD83D\uDCF2",
            "\uE104"
         ]
      },
      {
         "name":"VIBRATION MODE",
         "id":"vibration_mode",
         "src":"1f4f3.png",
         "dict":[
            "\uD83D\uDCF3",
            "\uE250"
         ]
      },
      {
         "name":"MOBILE PHONE OFF",
         "id":"mobile_phone_off",
         "src":"1f4f4.png",
         "dict":[
            "\uD83D\uDCF4",
            "\uE251"
         ]
      },
      {
         "name":"NO MOBILE PHONES",
         "id":"no_mobile_phones",
         "src":"1f4f5.png",
         "dict":[
            "\uD83D\uDCF5"
         ]
      },
      {
         "name":"ANTENNA WITH BARS",
         "id":"antenna_with_bars",
         "src":"1f4f6.png",
         "dict":[
            "\uD83D\uDCF6",
            "\uE20B"
         ]
      },
      {
         "name":"CAMERA",
         "id":"camera",
         "src":"1f4f7.png",
         "dict":[
            "\uD83D\uDCF7",
            "\uE008"
         ]
      },
      {
         "name":"VIDEO CAMERA",
         "id":"video_camera",
         "src":"1f4f9.png",
         "dict":[
            "\uD83D\uDCF9"
         ]
      },
      {
         "name":"TELEVISION",
         "id":"television",
         "src":"1f4fa.png",
         "dict":[
            "\uD83D\uDCFA",
            "\uE12A"
         ]
      },
      {
         "name":"RADIO",
         "id":"radio",
         "src":"1f4fb.png",
         "dict":[
            "\uD83D\uDCFB",
            "\uE128"
         ]
      },
      {
         "name":"VIDEOCASSETTE",
         "id":"videocassette",
         "src":"1f4fc.png",
         "dict":[
            "\uD83D\uDCFC",
            "\uE129"
         ]
      },
      {
         "name":"TWISTED RIGHTWARDS ARROWS",
         "id":"twisted_rightwards_arrows",
         "src":"1f500.png",
         "dict":[
            "\uD83D\uDD00"
         ]
      },
      {
         "name":"CLOCKWISE RIGHTWARDS AND LEFTWARDS OPEN CIRCLE ARROWS",
         "id":"clockwise_rightwards_and_leftwards_open_circle_arrows",
         "src":"1f501.png",
         "dict":[
            "\uD83D\uDD01"
         ]
      },
      {
         "name":"CLOCKWISE RIGHTWARDS AND LEFTWARDS OPEN CIRCLE ARROWS WITH CIRCLED ONE OVERLAY",
         "id":"clockwise_rightwards_and_leftwards_open_circle_arrows_with_circled_one_overlay",
         "src":"1f502.png",
         "dict":[
            "\uD83D\uDD02"
         ]
      },
      {
         "name":"CLOCKWISE DOWNWARDS AND UPWARDS OPEN CIRCLE ARROWS",
         "id":"clockwise_downwards_and_upwards_open_circle_arrows",
         "src":"1f503.png",
         "dict":[
            "\uD83D\uDD03"
         ]
      },
      {
         "name":"ANTICLOCKWISE DOWNWARDS AND UPWARDS OPEN CIRCLE ARROWS",
         "id":"anticlockwise_downwards_and_upwards_open_circle_arrows",
         "src":"1f504.png",
         "dict":[
            "\uD83D\uDD04"
         ]
      },
      {
         "name":"LOW BRIGHTNESS SYMBOLS",
         "id":"low_brightness_symbols",
         "src":"1f505.png",
         "dict":[
            "\uD83D\uDD05"
         ]
      },
      {
         "name":"HIGH BRIGHTNESS SYMBOLS",
         "id":"high_brightness_symbols",
         "src":"1f506.png",
         "dict":[
            "\uD83D\uDD06"
         ]
      },
      {
         "name":"SPEAKER WITH CANCELLATION STROKE",
         "id":"speaker_with_cancellation_stroke",
         "src":"1f507.png",
         "dict":[
            "\uD83D\uDD07"
         ]
      },
      {
         "name":"SPEAKER",
         "id":"speaker",
         "src":"1f508.png",
         "dict":[
            "\uD83D\uDD08"
         ]
      },
      {
         "name":"SPEAKER WITH ONE SOUND WAVE",
         "id":"speaker_with_one_sound_wave",
         "src":"1f509.png",
         "dict":[
            "\uD83D\uDD09"
         ]
      },
      {
         "name":"SPEAKER WITH THREE SOUND WAVES",
         "id":"speaker_with_three_sound_waves",
         "src":"1f50a.png",
         "dict":[
            "\uD83D\uDD0A",
            "\uE141"
         ]
      },
      {
         "name":"BATTERY",
         "id":"battery",
         "src":"1f50b.png",
         "dict":[
            "\uD83D\uDD0B"
         ]
      },
      {
         "name":"ELECTRIC PLUG",
         "id":"electric_plug",
         "src":"1f50c.png",
         "dict":[
            "\uD83D\uDD0C"
         ]
      },
      {
         "name":"LEFT-POINTING MAGNIFYING GLASS",
         "id":"left-pointing_magnifying_glass",
         "src":"1f50d.png",
         "dict":[
            "\uD83D\uDD0D",
            "\uE114"
         ]
      },
      {
         "name":"RIGHT POINTING MAGNIFYING GLASS",
         "id":"right_pointing_magnifying_glass",
         "src":"1f50e.png",
         "dict":[
            "\uD83D\uDD0E"
         ]
      },
      {
         "name":"LOCK WITH INK PEN",
         "id":"lock_with_ink_pen",
         "src":"1f50f.png",
         "dict":[
            "\uD83D\uDD0F"
         ]
      },
      {
         "name":"CLOSED LOCK WITH KEY",
         "id":"closed_lock_with_key",
         "src":"1f510.png",
         "dict":[
            "\uD83D\uDD10"
         ]
      },
      {
         "name":"KEY",
         "id":"key",
         "src":"1f511.png",
         "dict":[
            "\uD83D\uDD11",
            "\uE03F"
         ]
      },
      {
         "name":"LOCK",
         "id":"lock",
         "src":"1f512.png",
         "dict":[
            "\uD83D\uDD12",
            "\uE144"
         ]
      },
      {
         "name":"OPEN LOCK",
         "id":"open_lock",
         "src":"1f513.png",
         "dict":[
            "\uD83D\uDD13",
            "\uE145"
         ]
      },
      {
         "name":"BELL",
         "id":"bell",
         "src":"1f514.png",
         "dict":[
            "\uD83D\uDD14",
            "\uE325"
         ]
      },
      {
         "name":"BELL WITH CANCELLATION STROKE",
         "id":"bell_with_cancellation_stroke",
         "src":"1f515.png",
         "dict":[
            "\uD83D\uDD15"
         ]
      },
      {
         "name":"BOOKMARK",
         "id":"bookmark",
         "src":"1f516.png",
         "dict":[
            "\uD83D\uDD16"
         ]
      },
      {
         "name":"LINK SYMBOL",
         "id":"link_symbol",
         "src":"1f517.png",
         "dict":[
            "\uD83D\uDD17"
         ]
      },
      {
         "name":"RADIO BUTTON",
         "id":"radio_button",
         "src":"1f518.png",
         "dict":[
            "\uD83D\uDD18"
         ]
      },
      {
         "name":"BACK WITH LEFTWARDS ARROW ABOVE",
         "id":"back_with_leftwards_arrow_above",
         "src":"1f519.png",
         "dict":[
            "\uD83D\uDD19"
         ]
      },
      {
         "name":"END WITH LEFTWARDS ARROW ABOVE",
         "id":"end_with_leftwards_arrow_above",
         "src":"1f51a.png",
         "dict":[
            "\uD83D\uDD1A"
         ]
      },
      {
         "name":"ON WITH EXCLAMATION MARK WITH LEFT RIGHT ARROW ABOVE",
         "id":"on_with_exclamation_mark_with_left_right_arrow_above",
         "src":"1f51b.png",
         "dict":[
            "\uD83D\uDD1B"
         ]
      },
      {
         "name":"SOON WITH RIGHTWARDS ARROW ABOVE",
         "id":"soon_with_rightwards_arrow_above",
         "src":"1f51c.png",
         "dict":[
            "\uD83D\uDD1C"
         ]
      },
      {
         "name":"TOP WITH UPWARDS ARROW ABOVE",
         "id":"top_with_upwards_arrow_above",
         "src":"1f51d.png",
         "dict":[
            "\uD83D\uDD1D",
            "\uE24C"
         ]
      },
      {
         "name":"NO ONE UNDER EIGHTEEN SYMBOL",
         "id":"no_one_under_eighteen_symbol",
         "src":"1f51e.png",
         "dict":[
            "\uD83D\uDD1E",
            "\uE207"
         ]
      },
      {
         "name":"KEYCAP TEN",
         "id":"keycap_ten",
         "src":"1f51f.png",
         "dict":[
            "\uD83D\uDD1F"
         ]
      },
      {
         "name":"INPUT SYMBOL FOR LATIN CAPITAL LETTERS",
         "id":"input_symbol_for_latin_capital_letters",
         "src":"1f520.png",
         "dict":[
            "\uD83D\uDD20"
         ]
      },
      {
         "name":"INPUT SYMBOL FOR LATIN SMALL LETTERS",
         "id":"input_symbol_for_latin_small_letters",
         "src":"1f521.png",
         "dict":[
            "\uD83D\uDD21"
         ]
      },
      {
         "name":"INPUT SYMBOL FOR NUMBERS",
         "id":"input_symbol_for_numbers",
         "src":"1f522.png",
         "dict":[
            "\uD83D\uDD22"
         ]
      },
      {
         "name":"INPUT SYMBOL FOR SYMBOLS",
         "id":"input_symbol_for_symbols",
         "src":"1f523.png",
         "dict":[
            "\uD83D\uDD23"
         ]
      },
      {
         "name":"INPUT SYMBOL FOR LATIN LETTERS",
         "id":"input_symbol_for_latin_letters",
         "src":"1f524.png",
         "dict":[
            "\uD83D\uDD24"
         ]
      },
      {
         "name":"FIRE",
         "id":"fire",
         "src":"1f525.png",
         "dict":[
            "\uD83D\uDD25",
            "\uE11D"
         ]
      },
      {
         "name":"ELECTRIC TORCH",
         "id":"electric_torch",
         "src":"1f526.png",
         "dict":[
            "\uD83D\uDD26"
         ]
      },
      {
         "name":"WRENCH",
         "id":"wrench",
         "src":"1f527.png",
         "dict":[
            "\uD83D\uDD27"
         ]
      },
      {
         "name":"HAMMER",
         "id":"hammer",
         "src":"1f528.png",
         "dict":[
            "\uD83D\uDD28",
            "\uE116"
         ]
      },
      {
         "name":"NUT AND BOLT",
         "id":"nut_and_bolt",
         "src":"1f529.png",
         "dict":[
            "\uD83D\uDD29"
         ]
      },
      {
         "name":"HOCHO",
         "id":"hocho",
         "src":"1f52a.png",
         "dict":[
            "\uD83D\uDD2A"
         ]
      },
      {
         "name":"PISTOL",
         "id":"pistol",
         "src":"1f52b.png",
         "dict":[
            "\uD83D\uDD2B",
            "\uE113"
         ]
      },
      {
         "name":"MICROSCOPE",
         "id":"microscope",
         "src":"1f52c.png",
         "dict":[
            "\uD83D\uDD2C"
         ]
      },
      {
         "name":"TELESCOPE",
         "id":"telescope",
         "src":"1f52d.png",
         "dict":[
            "\uD83D\uDD2D"
         ]
      },
      {
         "name":"CRYSTAL BALL",
         "id":"crystal_ball",
         "src":"1f52e.png",
         "dict":[
            "\uD83D\uDD2E"
         ]
      },
      {
         "name":"SIX POINTED STAR WITH MIDDLE DOT",
         "id":"six_pointed_star_with_middle_dot",
         "src":"1f52f.png",
         "dict":[
            "\uD83D\uDD2F",
            "\uE23E"
         ]
      },
      {
         "name":"JAPANESE SYMBOL FOR BEGINNER",
         "id":"japanese_symbol_for_beginner",
         "src":"1f530.png",
         "dict":[
            "\uD83D\uDD30",
            "\uE209"
         ]
      },
      {
         "name":"TRIDENT EMBLEM",
         "id":"trident_emblem",
         "src":"1f531.png",
         "dict":[
            "\uD83D\uDD31",
            "\uE031"
         ]
      },
      {
         "name":"BLACK SQUARE BUTTON",
         "id":"black_square_button",
         "src":"1f532.png",
         "dict":[
            "\uD83D\uDD32",
            "\uE21A"
         ]
      },
      {
         "name":"WHITE SQUARE BUTTON",
         "id":"white_square_button",
         "src":"1f533.png",
         "dict":[
            "\uD83D\uDD33",
            "\uE21B"
         ]
      },
      {
         "name":"LARGE RED CIRCLE",
         "id":"large_red_circle",
         "src":"1f534.png",
         "dict":[
            "\uD83D\uDD34",
            "\uE219"
         ]
      },
      {
         "name":"LARGE BLUE CIRCLE",
         "id":"large_blue_circle",
         "src":"1f535.png",
         "dict":[
            "\uD83D\uDD35"
         ]
      },
      {
         "name":"LARGE ORANGE DIAMOND",
         "id":"large_orange_diamond",
         "src":"1f536.png",
         "dict":[
            "\uD83D\uDD36"
         ]
      },
      {
         "name":"LARGE BLUE DIAMOND",
         "id":"large_blue_diamond",
         "src":"1f537.png",
         "dict":[
            "\uD83D\uDD37"
         ]
      },
      {
         "name":"SMALL ORANGE DIAMOND",
         "id":"small_orange_diamond",
         "src":"1f538.png",
         "dict":[
            "\uD83D\uDD38"
         ]
      },
      {
         "name":"SMALL BLUE DIAMOND",
         "id":"small_blue_diamond",
         "src":"1f539.png",
         "dict":[
            "\uD83D\uDD39"
         ]
      },
      {
         "name":"UP-POINTING RED TRIANGLE",
         "id":"up-pointing_red_triangle",
         "src":"1f53a.png",
         "dict":[
            "\uD83D\uDD3A"
         ]
      },
      {
         "name":"DOWN-POINTING RED TRIANGLE",
         "id":"down-pointing_red_triangle",
         "src":"1f53b.png",
         "dict":[
            "\uD83D\uDD3B"
         ]
      },
      {
         "name":"UP-POINTING SMALL RED TRIANGLE",
         "id":"up-pointing_small_red_triangle",
         "src":"1f53c.png",
         "dict":[
            "\uD83D\uDD3C"
         ]
      },
      {
         "name":"DOWN-POINTING SMALL RED TRIANGLE",
         "id":"down-pointing_small_red_triangle",
         "src":"1f53d.png",
         "dict":[
            "\uD83D\uDD3D"
         ]
      },
      {
         "name":"CLOCK FACE ONE OCLOCK",
         "id":"clock_face_one_oclock",
         "src":"1f550.png",
         "dict":[
            "\uD83D\uDD50",
            "\uE024"
         ]
      },
      {
         "name":"CLOCK FACE TWO OCLOCK",
         "id":"clock_face_two_oclock",
         "src":"1f551.png",
         "dict":[
            "\uD83D\uDD51",
            "\uE025"
         ]
      },
      {
         "name":"CLOCK FACE THREE OCLOCK",
         "id":"clock_face_three_oclock",
         "src":"1f552.png",
         "dict":[
            "\uD83D\uDD52",
            "\uE026"
         ]
      },
      {
         "name":"CLOCK FACE FOUR OCLOCK",
         "id":"clock_face_four_oclock",
         "src":"1f553.png",
         "dict":[
            "\uD83D\uDD53",
            "\uE027"
         ]
      },
      {
         "name":"CLOCK FACE FIVE OCLOCK",
         "id":"clock_face_five_oclock",
         "src":"1f554.png",
         "dict":[
            "\uD83D\uDD54",
            "\uE028"
         ]
      },
      {
         "name":"CLOCK FACE SIX OCLOCK",
         "id":"clock_face_six_oclock",
         "src":"1f555.png",
         "dict":[
            "\uD83D\uDD55",
            "\uE029"
         ]
      },
      {
         "name":"CLOCK FACE SEVEN OCLOCK",
         "id":"clock_face_seven_oclock",
         "src":"1f556.png",
         "dict":[
            "\uD83D\uDD56",
            "\uE02A"
         ]
      },
      {
         "name":"CLOCK FACE EIGHT OCLOCK",
         "id":"clock_face_eight_oclock",
         "src":"1f557.png",
         "dict":[
            "\uD83D\uDD57",
            "\uE02B"
         ]
      },
      {
         "name":"CLOCK FACE NINE OCLOCK",
         "id":"clock_face_nine_oclock",
         "src":"1f558.png",
         "dict":[
            "\uD83D\uDD58",
            "\uE02C"
         ]
      },
      {
         "name":"CLOCK FACE TEN OCLOCK",
         "id":"clock_face_ten_oclock",
         "src":"1f559.png",
         "dict":[
            "\uD83D\uDD59",
            "\uE02D"
         ]
      },
      {
         "name":"CLOCK FACE ELEVEN OCLOCK",
         "id":"clock_face_eleven_oclock",
         "src":"1f55a.png",
         "dict":[
            "\uD83D\uDD5A",
            "\uE02E"
         ]
      },
      {
         "name":"CLOCK FACE TWELVE OCLOCK",
         "id":"clock_face_twelve_oclock",
         "src":"1f55b.png",
         "dict":[
            "\uD83D\uDD5B",
            "\uE02F"
         ]
      },
      {
         "name":"CLOCK FACE ONE-THIRTY",
         "id":"clock_face_one-thirty",
         "src":"1f55c.png",
         "dict":[
            "\uD83D\uDD5C"
         ]
      },
      {
         "name":"CLOCK FACE TWO-THIRTY",
         "id":"clock_face_two-thirty",
         "src":"1f55d.png",
         "dict":[
            "\uD83D\uDD5D"
         ]
      },
      {
         "name":"CLOCK FACE THREE-THIRTY",
         "id":"clock_face_three-thirty",
         "src":"1f55e.png",
         "dict":[
            "\uD83D\uDD5E"
         ]
      },
      {
         "name":"CLOCK FACE FOUR-THIRTY",
         "id":"clock_face_four-thirty",
         "src":"1f55f.png",
         "dict":[
            "\uD83D\uDD5F"
         ]
      },
      {
         "name":"CLOCK FACE FIVE-THIRTY",
         "id":"clock_face_five-thirty",
         "src":"1f560.png",
         "dict":[
            "\uD83D\uDD60"
         ]
      },
      {
         "name":"CLOCK FACE SIX-THIRTY",
         "id":"clock_face_six-thirty",
         "src":"1f561.png",
         "dict":[
            "\uD83D\uDD61"
         ]
      },
      {
         "name":"CLOCK FACE SEVEN-THIRTY",
         "id":"clock_face_seven-thirty",
         "src":"1f562.png",
         "dict":[
            "\uD83D\uDD62"
         ]
      },
      {
         "name":"CLOCK FACE EIGHT-THIRTY",
         "id":"clock_face_eight-thirty",
         "src":"1f563.png",
         "dict":[
            "\uD83D\uDD63"
         ]
      },
      {
         "name":"CLOCK FACE NINE-THIRTY",
         "id":"clock_face_nine-thirty",
         "src":"1f564.png",
         "dict":[
            "\uD83D\uDD64"
         ]
      },
      {
         "name":"CLOCK FACE TEN-THIRTY",
         "id":"clock_face_ten-thirty",
         "src":"1f565.png",
         "dict":[
            "\uD83D\uDD65"
         ]
      },
      {
         "name":"CLOCK FACE ELEVEN-THIRTY",
         "id":"clock_face_eleven-thirty",
         "src":"1f566.png",
         "dict":[
            "\uD83D\uDD66"
         ]
      },
      {
         "name":"CLOCK FACE TWELVE-THIRTY",
         "id":"clock_face_twelve-thirty",
         "src":"1f567.png",
         "dict":[
            "\uD83D\uDD67"
         ]
      },
      {
         "name":"MOUNT FUJI",
         "id":"mount_fuji",
         "src":"1f5fb.png",
         "dict":[
            "\uD83D\uDDFB",
            "\uE03B"
         ]
      },
      {
         "name":"TOKYO TOWER",
         "id":"tokyo_tower",
         "src":"1f5fc.png",
         "dict":[
            "\uD83D\uDDFC",
            "\uE509"
         ]
      },
      {
         "name":"STATUE OF LIBERTY",
         "id":"statue_of_liberty",
         "src":"1f5fd.png",
         "dict":[
            "\uD83D\uDDFD",
            "\uE51D"
         ]
      },
      {
         "name":"SILHOUETTE OF JAPAN",
         "id":"silhouette_of_japan",
         "src":"1f5fe.png",
         "dict":[
            "\uD83D\uDDFE"
         ]
      },
      {
         "name":"MOYAI",
         "id":"moyai",
         "src":"1f5ff.png",
         "dict":[
            "\uD83D\uDDFF"
         ]
      },
      {
         "name":"GRINNING FACE",
         "id":"grinning_face",
         "src":"1f600.png",
         "dict":[
            "\uD83D\uDE00"
         ]
      },
      {
         "name":"GRINNING FACE WITH SMILING EYES",
         "id":"grinning_face_with_smiling_eyes",
         "src":"1f601.png",
         "dict":[
            "\uD83D\uDE01",
            "\uE404"
         ]
      },
      {
         "name":"FACE WITH TEARS OF JOY",
         "id":"face_with_tears_of_joy",
         "src":"1f602.png",
         "dict":[
            "\uD83D\uDE02",
            "\uE412"
         ]
      },
      {
         "name":"SMILING FACE WITH OPEN MOUTH",
         "id":"smiling_face_with_open_mouth",
         "src":"1f603.png",
         "dict":[
            "\uD83D\uDE03",
            "\uE057"
         ]
      },
      {
         "name":"SMILING FACE WITH OPEN MOUTH AND SMILING EYES",
         "id":"smiling_face_with_open_mouth_and_smiling_eyes",
         "src":"1f604.png",
         "dict":[
            "\uD83D\uDE04",
            "\uE415"
         ]
      },
      {
         "name":"SMILING FACE WITH OPEN MOUTH AND COLD SWEAT",
         "id":"smiling_face_with_open_mouth_and_cold_sweat",
         "src":"1f605.png",
         "dict":[
            "\uD83D\uDE05"
         ]
      },
      {
         "name":"SMILING FACE WITH OPEN MOUTH AND TIGHTLY-CLOSED EYES",
         "id":"smiling_face_with_open_mouth_and_tightly-closed_eyes",
         "src":"1f606.png",
         "dict":[
            "\uD83D\uDE06"
         ]
      },
      {
         "name":"SMILING FACE WITH HALO",
         "id":"smiling_face_with_halo",
         "src":"1f607.png",
         "dict":[
            "\uD83D\uDE07"
         ]
      },
      {
         "name":"SMILING FACE WITH HORNS",
         "id":"smiling_face_with_horns",
         "src":"1f608.png",
         "dict":[
            "\uD83D\uDE08"
         ]
      },
      {
         "name":"WINKING FACE",
         "id":"winking_face",
         "src":"1f609.png",
         "dict":[
            "\uD83D\uDE09",
            "\uE405"
         ]
      },
      {
         "name":"SMILING FACE WITH SMILING EYES",
         "id":"smiling_face_with_smiling_eyes",
         "src":"1f60a.png",
         "dict":[
            "\uD83D\uDE0A",
            "\uE056"
         ]
      },
      {
         "name":"FACE SAVOURING DELICIOUS FOOD",
         "id":"face_savouring_delicious_food",
         "src":"1f60b.png",
         "dict":[
            "\uD83D\uDE0B"
         ]
      },
      {
         "name":"RELIEVED FACE",
         "id":"relieved_face",
         "src":"1f60c.png",
         "dict":[
            "\uD83D\uDE0C",
            "\uE40A"
         ]
      },
      {
         "name":"SMILING FACE WITH HEART-SHAPED EYES",
         "id":"smiling_face_with_heart-shaped_eyes",
         "src":"1f60d.png",
         "dict":[
            "\uD83D\uDE0D",
            "\uE106"
         ]
      },
      {
         "name":"SMILING FACE WITH SUNGLASSES",
         "id":"smiling_face_with_sunglasses",
         "src":"1f60e.png",
         "dict":[
            "\uD83D\uDE0E"
         ]
      },
      {
         "name":"SMIRKING FACE",
         "id":"smirking_face",
         "src":"1f60f.png",
         "dict":[
            "\uD83D\uDE0F",
            "\uE402"
         ]
      },
      {
         "name":"NEUTRAL FACE",
         "id":"neutral_face",
         "src":"1f610.png",
         "dict":[
            "\uD83D\uDE10"
         ]
      },
      {
         "name":"EXPRESSIONLESS FACE",
         "id":"expressionless_face",
         "src":"1f611.png",
         "dict":[
            "\uD83D\uDE11"
         ]
      },
      {
         "name":"UNAMUSED FACE",
         "id":"unamused_face",
         "src":"1f612.png",
         "dict":[
            "\uD83D\uDE12",
            "\uE40E"
         ]
      },
      {
         "name":"FACE WITH COLD SWEAT",
         "id":"face_with_cold_sweat",
         "src":"1f613.png",
         "dict":[
            "\uD83D\uDE13",
            "\uE108"
         ]
      },
      {
         "name":"PENSIVE FACE",
         "id":"pensive_face",
         "src":"1f614.png",
         "dict":[
            "\uD83D\uDE14",
            "\uE403"
         ]
      },
      {
         "name":"CONFUSED FACE",
         "id":"confused_face",
         "src":"1f615.png",
         "dict":[
            "\uD83D\uDE15"
         ]
      },
      {
         "name":"CONFOUNDED FACE",
         "id":"confounded_face",
         "src":"1f616.png",
         "dict":[
            "\uD83D\uDE16",
            "\uE407"
         ]
      },
      {
         "name":"KISSING FACE",
         "id":"kissing_face",
         "src":"1f617.png",
         "dict":[
            "\uD83D\uDE17"
         ]
      },
      {
         "name":"FACE THROWING A KISS",
         "id":"face_throwing_a_kiss",
         "src":"1f618.png",
         "dict":[
            "\uD83D\uDE18",
            "\uE418"
         ]
      },
      {
         "name":"KISSING FACE WITH SMILING EYES",
         "id":"kissing_face_with_smiling_eyes",
         "src":"1f619.png",
         "dict":[
            "\uD83D\uDE19"
         ]
      },
      {
         "name":"KISSING FACE WITH CLOSED EYES",
         "id":"kissing_face_with_closed_eyes",
         "src":"1f61a.png",
         "dict":[
            "\uD83D\uDE1A",
            "\uE417"
         ]
      },
      {
         "name":"FACE WITH STUCK-OUT TONGUE",
         "id":"face_with_stuck-out_tongue",
         "src":"1f61b.png",
         "dict":[
            "\uD83D\uDE1B"
         ]
      },
      {
         "name":"FACE WITH STUCK-OUT TONGUE AND WINKING EYE",
         "id":"face_with_stuck-out_tongue_and_winking_eye",
         "src":"1f61c.png",
         "dict":[
            "\uD83D\uDE1C",
            "\uE105"
         ]
      },
      {
         "name":"FACE WITH STUCK-OUT TONGUE AND TIGHTLY-CLOSED EYES",
         "id":"face_with_stuck-out_tongue_and_tightly-closed_eyes",
         "src":"1f61d.png",
         "dict":[
            "\uD83D\uDE1D",
            "\uE409"
         ]
      },
      {
         "name":"DISAPPOINTED FACE",
         "id":"disappointed_face",
         "src":"1f61e.png",
         "dict":[
            "\uD83D\uDE1E",
            "\uE058"
         ]
      },
      {
         "name":"WORRIED FACE",
         "id":"worried_face",
         "src":"1f61f.png",
         "dict":[
            "\uD83D\uDE1F"
         ]
      },
      {
         "name":"ANGRY FACE",
         "id":"angry_face",
         "src":"1f620.png",
         "dict":[
            "\uD83D\uDE20",
            "\uE059"
         ]
      },
      {
         "name":"POUTING FACE",
         "id":"pouting_face",
         "src":"1f621.png",
         "dict":[
            "\uD83D\uDE21",
            "\uE416"
         ]
      },
      {
         "name":"CRYING FACE",
         "id":"crying_face",
         "src":"1f622.png",
         "dict":[
            "\uD83D\uDE22",
            "\uE413"
         ]
      },
      {
         "name":"PERSEVERING FACE",
         "id":"persevering_face",
         "src":"1f623.png",
         "dict":[
            "\uD83D\uDE23",
            "\uE406"
         ]
      },
      {
         "name":"FACE WITH LOOK OF TRIUMPH",
         "id":"face_with_look_of_triumph",
         "src":"1f624.png",
         "dict":[
            "\uD83D\uDE24"
         ]
      },
      {
         "name":"DISAPPOINTED BUT RELIEVED FACE",
         "id":"disappointed_but_relieved_face",
         "src":"1f625.png",
         "dict":[
            "\uD83D\uDE25",
            "\uE401"
         ]
      },
      {
         "name":"FROWNING FACE WITH OPEN MOUTH",
         "id":"frowning_face_with_open_mouth",
         "src":"1f626.png",
         "dict":[
            "\uD83D\uDE26"
         ]
      },
      {
         "name":"ANGUISHED FACE",
         "id":"anguished_face",
         "src":"1f627.png",
         "dict":[
            "\uD83D\uDE27"
         ]
      },
      {
         "name":"FEARFUL FACE",
         "id":"fearful_face",
         "src":"1f628.png",
         "dict":[
            "\uD83D\uDE28",
            "\uE40B"
         ]
      },
      {
         "name":"WEARY FACE",
         "id":"weary_face",
         "src":"1f629.png",
         "dict":[
            "\uD83D\uDE29"
         ]
      },
      {
         "name":"SLEEPY FACE",
         "id":"sleepy_face",
         "src":"1f62a.png",
         "dict":[
            "\uD83D\uDE2A",
            "\uE408"
         ]
      },
      {
         "name":"TIRED FACE",
         "id":"tired_face",
         "src":"1f62b.png",
         "dict":[
            "\uD83D\uDE2B"
         ]
      },
      {
         "name":"GRIMACING FACE",
         "id":"grimacing_face",
         "src":"1f62c.png",
         "dict":[
            "\uD83D\uDE2C"
         ]
      },
      {
         "name":"LOUDLY CRYING FACE",
         "id":"loudly_crying_face",
         "src":"1f62d.png",
         "dict":[
            "\uD83D\uDE2D",
            "\uE411"
         ]
      },
      {
         "name":"FACE WITH OPEN MOUTH",
         "id":"face_with_open_mouth",
         "src":"1f62e.png",
         "dict":[
            "\uD83D\uDE2E"
         ]
      },
      {
         "name":"HUSHED FACE",
         "id":"hushed_face",
         "src":"1f62f.png",
         "dict":[
            "\uD83D\uDE2F"
         ]
      },
      {
         "name":"FACE WITH OPEN MOUTH AND COLD SWEAT",
         "id":"face_with_open_mouth_and_cold_sweat",
         "src":"1f630.png",
         "dict":[
            "\uD83D\uDE30",
            "\uE40F"
         ]
      },
      {
         "name":"FACE SCREAMING IN FEAR",
         "id":"face_screaming_in_fear",
         "src":"1f631.png",
         "dict":[
            "\uD83D\uDE31",
            "\uE107"
         ]
      },
      {
         "name":"ASTONISHED FACE",
         "id":"astonished_face",
         "src":"1f632.png",
         "dict":[
            "\uD83D\uDE32",
            "\uE410"
         ]
      },
      {
         "name":"FLUSHED FACE",
         "id":"flushed_face",
         "src":"1f633.png",
         "dict":[
            "\uD83D\uDE33",
            "\uE40D"
         ]
      },
      {
         "name":"SLEEPING FACE",
         "id":"sleeping_face",
         "src":"1f634.png",
         "dict":[
            "\uD83D\uDE34"
         ]
      },
      {
         "name":"DIZZY FACE",
         "id":"dizzy_face",
         "src":"1f635.png",
         "dict":[
            "\uD83D\uDE35"
         ]
      },
      {
         "name":"FACE WITHOUT MOUTH",
         "id":"face_without_mouth",
         "src":"1f636.png",
         "dict":[
            "\uD83D\uDE36"
         ]
      },
      {
         "name":"FACE WITH MEDICAL MASK",
         "id":"face_with_medical_mask",
         "src":"1f637.png",
         "dict":[
            "\uD83D\uDE37",
            "\uE40C"
         ]
      },
      {
         "name":"GRINNING CAT FACE WITH SMILING EYES",
         "id":"grinning_cat_face_with_smiling_eyes",
         "src":"1f638.png",
         "dict":[
            "\uD83D\uDE38"
         ]
      },
      {
         "name":"CAT FACE WITH TEARS OF JOY",
         "id":"cat_face_with_tears_of_joy",
         "src":"1f639.png",
         "dict":[
            "\uD83D\uDE39"
         ]
      },
      {
         "name":"SMILING CAT FACE WITH OPEN MOUTH",
         "id":"smiling_cat_face_with_open_mouth",
         "src":"1f63a.png",
         "dict":[
            "\uD83D\uDE3A"
         ]
      },
      {
         "name":"SMILING CAT FACE WITH HEART-SHAPED EYES",
         "id":"smiling_cat_face_with_heart-shaped_eyes",
         "src":"1f63b.png",
         "dict":[
            "\uD83D\uDE3B"
         ]
      },
      {
         "name":"CAT FACE WITH WRY SMILE",
         "id":"cat_face_with_wry_smile",
         "src":"1f63c.png",
         "dict":[
            "\uD83D\uDE3C"
         ]
      },
      {
         "name":"KISSING CAT FACE WITH CLOSED EYES",
         "id":"kissing_cat_face_with_closed_eyes",
         "src":"1f63d.png",
         "dict":[
            "\uD83D\uDE3D"
         ]
      },
      {
         "name":"POUTING CAT FACE",
         "id":"pouting_cat_face",
         "src":"1f63e.png",
         "dict":[
            "\uD83D\uDE3E"
         ]
      },
      {
         "name":"CRYING CAT FACE",
         "id":"crying_cat_face",
         "src":"1f63f.png",
         "dict":[
            "\uD83D\uDE3F"
         ]
      },
      {
         "name":"WEARY CAT FACE",
         "id":"weary_cat_face",
         "src":"1f640.png",
         "dict":[
            "\uD83D\uDE40"
         ]
      },
      {
         "name":"FACE WITH NO GOOD GESTURE",
         "id":"face_with_no_good_gesture",
         "src":"1f645.png",
         "dict":[
            "\uD83D\uDE45",
            "\uE423"
         ]
      },
      {
         "name":"FACE WITH OK GESTURE",
         "id":"face_with_ok_gesture",
         "src":"1f646.png",
         "dict":[
            "\uD83D\uDE46",
            "\uE424"
         ]
      },
      {
         "name":"PERSON BOWING DEEPLY",
         "id":"person_bowing_deeply",
         "src":"1f647.png",
         "dict":[
            "\uD83D\uDE47",
            "\uE426"
         ]
      },
      {
         "name":"SEE-NO-EVIL MONKEY",
         "id":"see-no-evil_monkey",
         "src":"1f648.png",
         "dict":[
            "\uD83D\uDE48"
         ]
      },
      {
         "name":"HEAR-NO-EVIL MONKEY",
         "id":"hear-no-evil_monkey",
         "src":"1f649.png",
         "dict":[
            "\uD83D\uDE49"
         ]
      },
      {
         "name":"SPEAK-NO-EVIL MONKEY",
         "id":"speak-no-evil_monkey",
         "src":"1f64a.png",
         "dict":[
            "\uD83D\uDE4A"
         ]
      },
      {
         "name":"HAPPY PERSON RAISING ONE HAND",
         "id":"happy_person_raising_one_hand",
         "src":"1f64b.png",
         "dict":[
            "\uD83D\uDE4B"
         ]
      },
      {
         "name":"PERSON RAISING BOTH HANDS IN CELEBRATION",
         "id":"person_raising_both_hands_in_celebration",
         "src":"1f64c.png",
         "dict":[
            "\uD83D\uDE4C",
            "\uE427"
         ]
      },
      {
         "name":"PERSON FROWNING",
         "id":"person_frowning",
         "src":"1f64d.png",
         "dict":[
            "\uD83D\uDE4D"
         ]
      },
      {
         "name":"PERSON WITH POUTING FACE",
         "id":"person_with_pouting_face",
         "src":"1f64e.png",
         "dict":[
            "\uD83D\uDE4e"
         ]
      },
      {
         "name":"PERSON WITH FOLDED HANDS",
         "id":"person_with_folded_hands",
         "src":"1f64f.png",
         "dict":[
            "\uD83D\uDE4f",
            "\uE41D"
         ]
      },
      {
         "name":"ROCKET",
         "id":"rocket",
         "src":"1f680.png",
         "dict":[
            "\uD83D\uDE80",
            "\uE10D"
         ]
      },
      {
         "name":"HELICOPTER",
         "id":"helicopter",
         "src":"1f681.png",
         "dict":[
            "\uD83D\uDE81"
         ]
      },
      {
         "name":"STEAM LOCOMOTIVE",
         "id":"steam_locomotive",
         "src":"1f682.png",
         "dict":[
            "\uD83D\uDE82"
         ]
      },
      {
         "name":"RAILWAY CAR",
         "id":"railway_car",
         "src":"1f683.png",
         "dict":[
            "\uD83D\uDE83",
            "\uE01E"
         ]
      },
      {
         "name":"HIGH-SPEED TRAIN",
         "id":"high-speed_train",
         "src":"1f684.png",
         "dict":[
            "\uD83D\uDE84",
            "\uE435"
         ]
      },
      {
         "name":"HIGH-SPEED TRAIN WITH BULLET NOSE",
         "id":"high-speed_train_with_bullet_nose",
         "src":"1f685.png",
         "dict":[
            "\uD83D\uDE85",
            "\uE01F"
         ]
      },
      {
         "name":"TRAIN",
         "id":"train",
         "src":"1f686.png",
         "dict":[
            "\uD83D\uDE86"
         ]
      },
      {
         "name":"METRO",
         "id":"metro",
         "src":"1f687.png",
         "dict":[
            "\uD83D\uDE87",
            "\uE434"
         ]
      },
      {
         "name":"LIGHT RAIL",
         "id":"light_rail",
         "src":"1f688.png",
         "dict":[
            "\uD83D\uDE88"
         ]
      },
      {
         "name":"STATION",
         "id":"station",
         "src":"1f689.png",
         "dict":[
            "\uD83D\uDE89",
            "\uE039"
         ]
      },
      {
         "name":"TRAM",
         "id":"tram",
         "src":"1f68a.png",
         "dict":[
            "\uD83D\uDE8A"
         ]
      },
      {
         "name":"TRAM CAR",
         "id":"tram_car",
         "src":"1f68b.png",
         "dict":[
            "\uD83D\uDE8B"
         ]
      },
      {
         "name":"BUS",
         "id":"bus",
         "src":"1f68c.png",
         "dict":[
            "\uD83D\uDE8C",
            "\uE159"
         ]
      },
      {
         "name":"ONCOMING BUS",
         "id":"oncoming_bus",
         "src":"1f68d.png",
         "dict":[
            "\uD83D\uDE8D"
         ]
      },
      {
         "name":"TROLLEYBUS",
         "id":"trolleybus",
         "src":"1f68e.png",
         "dict":[
            "\uD83D\uDE8E"
         ]
      },
      {
         "name":"BUS STOP",
         "id":"bus_stop",
         "src":"1f68f.png",
         "dict":[
            "\uD83D\uDE8F",
            "\uE150"
         ]
      },
      {
         "name":"MINIBUS",
         "id":"minibus",
         "src":"1f690.png",
         "dict":[
            "\uD83D\uDE90"
         ]
      },
      {
         "name":"AMBULANCE",
         "id":"ambulance",
         "src":"1f691.png",
         "dict":[
            "\uD83D\uDE91",
            "\uE431"
         ]
      },
      {
         "name":"FIRE ENGINE",
         "id":"fire_engine",
         "src":"1f692.png",
         "dict":[
            "\uD83D\uDE92",
            "\uE430"
         ]
      },
      {
         "name":"POLICE CAR",
         "id":"police_car",
         "src":"1f693.png",
         "dict":[
            "\uD83D\uDE93",
            "\uE432"
         ]
      },
      {
         "name":"ONCOMING POLICE CAR",
         "id":"oncoming_police_car",
         "src":"1f694.png",
         "dict":[
            "\uD83D\uDE94"
         ]
      },
      {
         "name":"TAXI",
         "id":"taxi",
         "src":"1f695.png",
         "dict":[
            "\uD83D\uDE95",
            "\uE15A"
         ]
      },
      {
         "name":"ONCOMING TAXI",
         "id":"oncoming_taxi",
         "src":"1f696.png",
         "dict":[
            "\uD83D\uDE96"
         ]
      },
      {
         "name":"AUTOMOBILE",
         "id":"automobile",
         "src":"1f697.png",
         "dict":[
            "\uD83D\uDE97",
            "\uE01B"
         ]
      },
      {
         "name":"ONCOMING AUTOMOBILE",
         "id":"oncoming_automobile",
         "src":"1f698.png",
         "dict":[
            "\uD83D\uDE98"
         ]
      },
      {
         "name":"RECREATIONAL VEHICLE",
         "id":"recreational_vehicle",
         "src":"1f699.png",
         "dict":[
            "\uD83D\uDE99",
            "\uE42E"
         ]
      },
      {
         "name":"DELIVERY TRUCK",
         "id":"delivery_truck",
         "src":"1f69a.png",
         "dict":[
            "\uD83D\uDE9A",
            "\uE42F"
         ]
      },
      {
         "name":"ARTICULATED LORRY",
         "id":"articulated_lorry",
         "src":"1f69b.png",
         "dict":[
            "\uD83D\uDE9B"
         ]
      },
      {
         "name":"TRACTOR",
         "id":"tractor",
         "src":"1f69c.png",
         "dict":[
            "\uD83D\uDE9C"
         ]
      },
      {
         "name":"MONORAIL",
         "id":"monorail",
         "src":"1f69d.png",
         "dict":[
            "\uD83D\uDE9D"
         ]
      },
      {
         "name":"MOUNTAIN RAILWAY",
         "id":"mountain_railway",
         "src":"1f69e.png",
         "dict":[
            "\uD83D\uDE9E"
         ]
      },
      {
         "name":"SUSPENSION RAILWAY",
         "id":"suspension_railway",
         "src":"1f69f.png",
         "dict":[
            "\uD83D\uDE9F"
         ]
      },
      {
         "name":"MOUNTAIN CABLEWAY",
         "id":"mountain_cableway",
         "src":"1f6a0.png",
         "dict":[
            "\uD83D\uDEA0"
         ]
      },
      {
         "name":"AERIAL TRAMWAY",
         "id":"aerial_tramway",
         "src":"1f6a1.png",
         "dict":[
            "\uD83D\uDEA1"
         ]
      },
      {
         "name":"SHIP",
         "id":"ship",
         "src":"1f6a2.png",
         "dict":[
            "\uD83D\uDEA2",
            "\uE202"
         ]
      },
      {
         "name":"ROWBOAT",
         "id":"rowboat",
         "src":"1f6a3.png",
         "dict":[
            "\uD83D\uDEA3"
         ]
      },
      {
         "name":"SPEEDBOAT",
         "id":"speedboat",
         "src":"1f6a4.png",
         "dict":[
            "\uD83D\uDEA4",
            "\uE135"
         ]
      },
      {
         "name":"HORIZONTAL TRAFFIC LIGHT",
         "id":"horizontal_traffic_light",
         "src":"1f6a5.png",
         "dict":[
            "\uD83D\uDEA5",
            "\uE14E"
         ]
      },
      {
         "name":"VERTICAL TRAFFIC LIGHT",
         "id":"vertical_traffic_light",
         "src":"1f6a6.png",
         "dict":[
            "\uD83D\uDEA6"
         ]
      },
      {
         "name":"CONSTRUCTION SIGN",
         "id":"construction_sign",
         "src":"1f6a7.png",
         "dict":[
            "\uD83D\uDEA7",
            "\uE137"
         ]
      },
      {
         "name":"POLICE CARS REVOLVING LIGHT",
         "id":"police_cars_revolving_light",
         "src":"1f6a8.png",
         "dict":[
            "\uD83D\uDEA8"
         ]
      },
      {
         "name":"TRIANGULAR FLAG ON POST",
         "id":"triangular_flag_on_post",
         "src":"1f6a9.png",
         "dict":[
            "\uD83D\uDEA9"
         ]
      },
      {
         "name":"DOOR",
         "id":"door",
         "src":"1f6aa.png",
         "dict":[
            "\uD83D\uDEAA"
         ]
      },
      {
         "name":"NO ENTRY SIGN",
         "id":"no_entry_sign",
         "src":"1f6ab.png",
         "dict":[
            "\uD83D\uDEAB"
         ]
      },
      {
         "name":"SMOKING SYMBOL",
         "id":"smoking_symbol",
         "src":"1f6ac.png",
         "dict":[
            "\uD83D\uDEAC",
            "\uE30E"
         ]
      },
      {
         "name":"NO SMOKING SYMBOL",
         "id":"no_smoking_symbol",
         "src":"1f6ad.png",
         "dict":[
            "\uD83D\uDEAD",
            "\uE208"
         ]
      },
      {
         "name":"PUT LITTER IN ITS PLACE SYMBOL",
         "id":"put_litter_in_its_place_symbol",
         "src":"1f6ae.png",
         "dict":[
            "\uD83D\uDEAE"
         ]
      },
      {
         "name":"DO NOT LITTER SYMBOL",
         "id":"do_not_litter_symbol",
         "src":"1f6af.png",
         "dict":[
            "\uD83D\uDEAF"
         ]
      },
      {
         "name":"POTABLE WATER SYMBOL",
         "id":"potable_water_symbol",
         "src":"1f6b0.png",
         "dict":[
            "\uD83D\uDEB0"
         ]
      },
      {
         "name":"NON-POTABLE WATER SYMBOL",
         "id":"non-potable_water_symbol",
         "src":"1f6b1.png",
         "dict":[
            "\uD83D\uDEB1"
         ]
      },
      {
         "name":"BICYCLE",
         "id":"bicycle",
         "src":"1f6b2.png",
         "dict":[
            "\uD83D\uDEB2",
            "\uE136"
         ]
      },
      {
         "name":"NO BICYCLES",
         "id":"no_bicycles",
         "src":"1f6b3.png",
         "dict":[
            "\uD83D\uDEB3"
         ]
      },
      {
         "name":"BICYCLIST",
         "id":"bicyclist",
         "src":"1f6b4.png",
         "dict":[
            "\uD83D\uDEB4"
         ]
      },
      {
         "name":"MOUNTAIN BICYCLIST",
         "id":"mountain_bicyclist",
         "src":"1f6b5.png",
         "dict":[
            "\uD83D\uDEB5"
         ]
      },
      {
         "name":"PEDESTRIAN",
         "id":"pedestrian",
         "src":"1f6b6.png",
         "dict":[
            "\uD83D\uDEB6",
            "\uE201"
         ]
      },
      {
         "name":"NO PEDESTRIANS",
         "id":"no_pedestrians",
         "src":"1f6b7.png",
         "dict":[
            "\uD83D\uDEB7"
         ]
      },
      {
         "name":"CHILDREN CROSSING",
         "id":"children_crossing",
         "src":"1f6b8.png",
         "dict":[
            "\uD83D\uDEB8"
         ]
      },
      {
         "name":"MENS SYMBOL",
         "id":"mens_symbol",
         "src":"1f6b9.png",
         "dict":[
            "\uD83D\uDEB9",
            "\uE138"
         ]
      },
      {
         "name":"WOMENS SYMBOL",
         "id":"womens_symbol",
         "src":"1f6ba.png",
         "dict":[
            "\uD83D\uDEBA",
            "\uE139"
         ]
      },
      {
         "name":"RESTROOM",
         "id":"restroom",
         "src":"1f6bb.png",
         "dict":[
            "\uD83D\uDEBB",
            "\uE151"
         ]
      },
      {
         "name":"BABY SYMBOL",
         "id":"baby_symbol",
         "src":"1f6bc.png",
         "dict":[
            "\uD83D\uDEBC",
            "\uE13A"
         ]
      },
      {
         "name":"TOILET",
         "id":"toilet",
         "src":"1f6bd.png",
         "dict":[
            "\uD83D\uDEBD",
            "\uE140"
         ]
      },
      {
         "name":"WATER CLOSET",
         "id":"water_closet",
         "src":"1f6be.png",
         "dict":[
            "\uD83D\uDEBE",
            "\uE309"
         ]
      },
      {
         "name":"SHOWER",
         "id":"shower",
         "src":"1f6bf.png",
         "dict":[
            "\uD83D\uDEBf"
         ]
      },
      {
         "name":"BATH",
         "id":"bath",
         "src":"1f6c0.png",
         "dict":[
            "\uD83D\uDEC0",
            "\uE13F"
         ]
      },
      {
         "name":"BATHTUB",
         "id":"bathtub",
         "src":"1f6c1.png",
         "dict":[
            "\uD83D\uDEC1"
         ]
      },
      {
         "name":"PASSPORT CONTROL",
         "id":"passport_control",
         "src":"1f6c2.png",
         "dict":[
            "\uD83D\uDEC2"
         ]
      },
      {
         "name":"CUSTOMS",
         "id":"customs",
         "src":"1f6c3.png",
         "dict":[
            "\uD83D\uDEC3"
         ]
      },
      {
         "name":"BAGGAGE CLAIM",
         "id":"baggage_claim",
         "src":"1f6c4.png",
         "dict":[
            "\uD83D\uDEC4"
         ]
      },
      {
         "name":"LEFT LUGGAGE",
         "id":"left_luggage",
         "src":"1f6c5.png",
         "dict":[
            "\uD83D\uDEC5"
         ]
      },
      {
         "name":"HASH KEY",
         "id":"hash_key",
         "src":"23-20e3.png",
         "dict":[
            "\u0023\u20E3",
            "\uE210"
         ]
      },
      {
         "name":"KEYCAP 0",
         "id":"keycap_0",
         "src":"30-20e3.png",
         "dict":[
            "\u0030\u20E3",
            "\uE225"
         ]
      },
      {
         "name":"KEYCAP 1",
         "id":"keycap_1",
         "src":"31-20e3.png",
         "dict":[
            "\u0031\u20E3",
            "\uE21C"
         ]
      },
      {
         "name":"KEYCAP 2",
         "id":"keycap_2",
         "src":"32-20e3.png",
         "dict":[
            "\u0032\u20E3",
            "\uE21D"
         ]
      },
      {
         "name":"KEYCAP 3",
         "id":"keycap_3",
         "src":"33-20e3.png",
         "dict":[
            "\u0033\u20E3",
            "\uE21E"
         ]
      },
      {
         "name":"KEYCAP 4",
         "id":"keycap_4",
         "src":"34-20e3.png",
         "dict":[
            "\u0034\u20E3",
            "\uE21F"
         ]
      },
      {
         "name":"KEYCAP 5",
         "id":"keycap_5",
         "src":"35-20e3.png",
         "dict":[
            "\u0035\u20E3",
            "\uE220"
         ]
      },
      {
         "name":"KEYCAP 6",
         "id":"keycap_6",
         "src":"36-20e3.png",
         "dict":[
            "\u0036\u20E3",
            "\uE221"
         ]
      },
      {
         "name":"KEYCAP 7",
         "id":"keycap_7",
         "src":"37-20e3.png",
         "dict":[
            "\u0037\u20E3",
            "\uE222"
         ]
      },
      {
         "name":"KEYCAP 8",
         "id":"keycap_8",
         "src":"38-20e3.png",
         "dict":[
            "\u0038\u20E3",
            "\uE223"
         ]
      },
      {
         "name":"KEYCAP 9",
         "id":"keycap_9",
         "src":"39-20e3.png",
         "dict":[
            "\u0039\u20E3",
            "\uE224"
         ]
      },
      {
         "name":"FLAG OF CHINA",
         "id":"flag_of_china",
         "src":"1f1e8-1f1f3.png",
         "dict":[
            "\uD83C\uDDE8\uD83C\uDDF3",
            "\uE513"
         ]
      },
      {
         "name":"FLAG OF GERMANY",
         "id":"flag_of_germany",
         "src":"1f1e9-1f1ea.png",
         "dict":[
            "\uD83C\uDDE9\uD83C\uDDEA",
            "\uE50E"
         ]
      },
      {
         "name":"FLAG OF SPAIN",
         "id":"flag_of_spain",
         "src":"1f1ea-1f1f8.png",
         "dict":[
            "\uD83C\uDDEA\uD83C\uDDF8",
            "\uE511"
         ]
      },
      {
         "name":"FLAG OF FRANCE",
         "id":"flag_of_france",
         "src":"1f1eb-1f1f7.png",
         "dict":[
            "\uD83C\uDDEB\uD83C\uDDF7",
            "\uE50D"
         ]
      },
      {
         "name":"FLAG OF ITALY",
         "id":"flag_of_italy",
         "src":"1f1ee-1f1f9.png",
         "dict":[
            "\uD83C\uDDEE\uD83C\uDDF9",
            "\uE50F"
         ]
      },
      {
         "name":"FLAG OF JAPAN",
         "id":"flag_of_japan",
         "src":"1f1ef-1f1f5.png",
         "dict":[
            "\uD83C\uDDEF\uD83C\uDDF5",
            "\uE50B"
         ]
      },
      {
         "name":"FLAG OF SOUTH KOREA",
         "id":"flag_of_south_korea",
         "src":"1f1f0-1f1f7.png",
         "dict":[
            "\uD83C\uDDF0\uD83C\uDDF7",
            "\uE514"
         ]
      },
      {
         "name":"FLAG OF RUSSIA",
         "id":"flag_of_russia",
         "src":"1f1f7-1f1fa.png",
         "dict":[
            "\uD83C\uDDF7\uD83C\uDDFA",
            "\uE512"
         ]
      },
      {
         "name":"FLAG OF THE UNITED STATES",
         "id":"flag_of_the_united_states",
         "src":"1f1fa-1f1f8.png",
         "dict":[
            "\uD83C\uDDFA\uD83C\uDDF8",
            "\uE50C"
         ]
      },
      {
         "name":"FLAG OF THE UNITED KINGDOM",
         "id":"flag_of_the_united_kingdom",
         "src":"1f1ec-1f1e7.png",
         "dict":[
            "\uD83C\uDDEC\uD83C\uDDE7",
            "\uE510"
         ]
      }
   ],
   "blocks":[
      {
         "name":"Basic Latin",
         "start":"\u0000",
         "end":"\u007F"
      },
      {
         "name":"Latin-1 Supplement",
         "start":"\u0080",
         "end":"\u00FF"
      },
      {
         "name":"Latin Extended-A",
         "start":"\u0100",
         "end":"\u017F"
      },
      {
         "name":"Latin Extended-B",
         "start":"\u0180",
         "end":"\u024F"
      },
      {
         "name":"IPA Extensions",
         "start":"\u0250",
         "end":"\u02AF"
      },
      {
         "name":"Spacing Modifier Letters",
         "start":"\u02B0",
         "end":"\u02FF"
      },
      {
         "name":"Combining Diacritical Marks",
         "start":"\u0300",
         "end":"\u036F"
      },
      {
         "name":"Greek and Coptic",
         "start":"\u0370",
         "end":"\u03FF"
      },
      {
         "name":"Cyrillic",
         "start":"\u0400",
         "end":"\u04FF"
      },
      {
         "name":"Cyrillic Supplement",
         "start":"\u0500",
         "end":"\u052F"
      },
      {
         "name":"Armenian",
         "start":"\u0530",
         "end":"\u058F"
      },
      {
         "name":"Hebrew",
         "start":"\u0590",
         "end":"\u05FF"
      },
      {
         "name":"Arabic",
         "start":"\u0600",
         "end":"\u06FF"
      },
      {
         "name":"Syriac",
         "start":"\u0700",
         "end":"\u074F"
      },
      {
         "name":"Arabic Supplement",
         "start":"\u0750",
         "end":"\u077F"
      },
      {
         "name":"Thaana",
         "start":"\u0780",
         "end":"\u07BF"
      },
      {
         "name":"NKo",
         "start":"\u07C0",
         "end":"\u07FF"
      },
      {
         "name":"Samaritan",
         "start":"\u0800",
         "end":"\u083F"
      },
      {
         "name":"Mandaic",
         "start":"\u0840",
         "end":"\u085F"
      },
      {
         "name":"Arabic Extended-A",
         "start":"\u08A0",
         "end":"\u08FF"
      },
      {
         "name":"Devanagari",
         "start":"\u0900",
         "end":"\u097F"
      },
      {
         "name":"Bengali",
         "start":"\u0980",
         "end":"\u09FF"
      },
      {
         "name":"Gurmukhi",
         "start":"\u0A00",
         "end":"\u0A7F"
      },
      {
         "name":"Gujarati",
         "start":"\u0A80",
         "end":"\u0AFF"
      },
      {
         "name":"Oriya",
         "start":"\u0B00",
         "end":"\u0B7F"
      },
      {
         "name":"Tamil",
         "start":"\u0B80",
         "end":"\u0BFF"
      },
      {
         "name":"Telugu",
         "start":"\u0C00",
         "end":"\u0C7F"
      },
      {
         "name":"Kannada",
         "start":"\u0C80",
         "end":"\u0CFF"
      },
      {
         "name":"Malayalam",
         "start":"\u0D00",
         "end":"\u0D7F"
      },
      {
         "name":"Sinhala",
         "start":"\u0D80",
         "end":"\u0DFF"
      },
      {
         "name":"Thai",
         "start":"\u0E00",
         "end":"\u0E7F"
      },
      {
         "name":"Lao",
         "start":"\u0E80",
         "end":"\u0EFF"
      },
      {
         "name":"Tibetan",
         "start":"\u0F00",
         "end":"\u0FFF"
      },
      {
         "name":"Myanmar",
         "start":"\u1000",
         "end":"\u109F"
      },
      {
         "name":"Georgian",
         "start":"\u10A0",
         "end":"\u10FF"
      },
      {
         "name":"Hangul Jamo",
         "start":"\u1100",
         "end":"\u11FF"
      },
      {
         "name":"Ethiopic",
         "start":"\u1200",
         "end":"\u137F"
      },
      {
         "name":"Ethiopic Supplement",
         "start":"\u1380",
         "end":"\u139F"
      },
      {
         "name":"Cherokee",
         "start":"\u13A0",
         "end":"\u13FF"
      },
      {
         "name":"Unified Canadian Aboriginal Syllabics",
         "start":"\u1400",
         "end":"\u167F"
      },
      {
         "name":"Ogham",
         "start":"\u1680",
         "end":"\u169F"
      },
      {
         "name":"Runic",
         "start":"\u16A0",
         "end":"\u16FF"
      },
      {
         "name":"Tagalog",
         "start":"\u1700",
         "end":"\u171F"
      },
      {
         "name":"Hanunoo",
         "start":"\u1720",
         "end":"\u173F"
      },
      {
         "name":"Buhid",
         "start":"\u1740",
         "end":"\u175F"
      },
      {
         "name":"Tagbanwa",
         "start":"\u1760",
         "end":"\u177F"
      },
      {
         "name":"Khmer",
         "start":"\u1780",
         "end":"\u17FF"
      },
      {
         "name":"Mongolian",
         "start":"\u1800",
         "end":"\u18AF"
      },
      {
         "name":"Unified Canadian Aboriginal Syllabics Extended",
         "start":"\u18B0",
         "end":"\u18FF"
      },
      {
         "name":"Limbu",
         "start":"\u1900",
         "end":"\u194F"
      },
      {
         "name":"Tai Le",
         "start":"\u1950",
         "end":"\u197F"
      },
      {
         "name":"New Tai Lue",
         "start":"\u1980",
         "end":"\u19DF"
      },
      {
         "name":"Khmer Symbols",
         "start":"\u19E0",
         "end":"\u19FF"
      },
      {
         "name":"Buginese",
         "start":"\u1A00",
         "end":"\u1A1F"
      },
      {
         "name":"Tai Tham",
         "start":"\u1A20",
         "end":"\u1AAF"
      },
      {
         "name":"Balinese",
         "start":"\u1B00",
         "end":"\u1B7F"
      },
      {
         "name":"Sundanese",
         "start":"\u1B80",
         "end":"\u1BBF"
      },
      {
         "name":"Batak",
         "start":"\u1BC0",
         "end":"\u1BFF"
      },
      {
         "name":"Lepcha",
         "start":"\u1C00",
         "end":"\u1C4F"
      },
      {
         "name":"Ol Chiki",
         "start":"\u1C50",
         "end":"\u1C7F"
      },
      {
         "name":"Sundanese Supplement",
         "start":"\u1CC0",
         "end":"\u1CCF"
      },
      {
         "name":"Vedic Extensions",
         "start":"\u1CD0",
         "end":"\u1CFF"
      },
      {
         "name":"Phonetic Extensions",
         "start":"\u1D00",
         "end":"\u1D7F"
      },
      {
         "name":"Phonetic Extensions Supplement",
         "start":"\u1D80",
         "end":"\u1DBF"
      },
      {
         "name":"Combining Diacritical Marks Supplement",
         "start":"\u1DC0",
         "end":"\u1DFF"
      },
      {
         "name":"Latin Extended Additional",
         "start":"\u1E00",
         "end":"\u1EFF"
      },
      {
         "name":"Greek Extended",
         "start":"\u1F00",
         "end":"\u1FFF"
      },
      {
         "name":"General Punctuation",
         "start":"\u2000",
         "end":"\u206F"
      },
      {
         "name":"Superscripts and Subscripts",
         "start":"\u2070",
         "end":"\u209F"
      },
      {
         "name":"Currency Symbols",
         "start":"\u20A0",
         "end":"\u20CF"
      },
      {
         "name":"Combining Diacritical Marks for Symbols",
         "start":"\u20D0",
         "end":"\u20FF"
      },
      {
         "name":"Letterlike Symbols",
         "start":"\u2100",
         "end":"\u214F"
      },
      {
         "name":"Number Forms",
         "start":"\u2150",
         "end":"\u218F"
      },
      {
         "name":"Arrows",
         "start":"\u2190",
         "end":"\u21FF"
      },
      {
         "name":"Mathematical Operators",
         "start":"\u2200",
         "end":"\u22FF"
      },
      {
         "name":"Miscellaneous Technical",
         "start":"\u2300",
         "end":"\u23FF"
      },
      {
         "name":"Control Pictures",
         "start":"\u2400",
         "end":"\u243F"
      },
      {
         "name":"Optical Character Recognition",
         "start":"\u2440",
         "end":"\u245F"
      },
      {
         "name":"Enclosed Alphanumerics",
         "start":"\u2460",
         "end":"\u24FF"
      },
      {
         "name":"Box Drawing",
         "start":"\u2500",
         "end":"\u257F"
      },
      {
         "name":"Block Elements",
         "start":"\u2580",
         "end":"\u259F"
      },
      {
         "name":"Geometric Shapes",
         "start":"\u25A0",
         "end":"\u25FF"
      },
      {
         "name":"Miscellaneous Symbols",
         "start":"\u2600",
         "end":"\u26FF"
      },
      {
         "name":"Dingbats",
         "start":"\u2700",
         "end":"\u27BF"
      },
      {
         "name":"Miscellaneous Mathematical Symbols-A",
         "start":"\u27C0",
         "end":"\u27EF"
      },
      {
         "name":"Supplemental Arrows-A",
         "start":"\u27F0",
         "end":"\u27FF"
      },
      {
         "name":"Braille Patterns",
         "start":"\u2800",
         "end":"\u28FF"
      },
      {
         "name":"Supplemental Arrows-B",
         "start":"\u2900",
         "end":"\u297F"
      },
      {
         "name":"Miscellaneous Mathematical Symbols-B",
         "start":"\u2980",
         "end":"\u29FF"
      },
      {
         "name":"Supplemental Mathematical Operators",
         "start":"\u2A00",
         "end":"\u2AFF"
      },
      {
         "name":"Miscellaneous Symbols and Arrows",
         "start":"\u2B00",
         "end":"\u2BFF"
      },
      {
         "name":"Glagolitic",
         "start":"\u2C00",
         "end":"\u2C5F"
      },
      {
         "name":"Latin Extended-C",
         "start":"\u2C60",
         "end":"\u2C7F"
      },
      {
         "name":"Coptic",
         "start":"\u2C80",
         "end":"\u2CFF"
      },
      {
         "name":"Georgian Supplement",
         "start":"\u2D00",
         "end":"\u2D2F"
      },
      {
         "name":"Tifinagh",
         "start":"\u2D30",
         "end":"\u2D7F"
      },
      {
         "name":"Ethiopic Extended",
         "start":"\u2D80",
         "end":"\u2DDF"
      },
      {
         "name":"Cyrillic Extended-A",
         "start":"\u2DE0",
         "end":"\u2DFF"
      },
      {
         "name":"Supplemental Punctuation",
         "start":"\u2E00",
         "end":"\u2E7F"
      },
      {
         "name":"CJK Radicals Supplement",
         "start":"\u2E80",
         "end":"\u2EFF"
      },
      {
         "name":"Kangxi Radicals",
         "start":"\u2F00",
         "end":"\u2FDF"
      },
      {
         "name":"Ideographic Description Characters",
         "start":"\u2FF0",
         "end":"\u2FFF"
      },
      {
         "name":"CJK Symbols and Punctuation",
         "start":"\u3000",
         "end":"\u303F"
      },
      {
         "name":"Hiragana",
         "start":"\u3040",
         "end":"\u309F"
      },
      {
         "name":"Katakana",
         "start":"\u30A0",
         "end":"\u30FF"
      },
      {
         "name":"Bopomofo",
         "start":"\u3100",
         "end":"\u312F"
      },
      {
         "name":"Hangul Compatibility Jamo",
         "start":"\u3130",
         "end":"\u318F"
      },
      {
         "name":"Kanbun",
         "start":"\u3190",
         "end":"\u319F"
      },
      {
         "name":"Bopomofo Extended",
         "start":"\u31A0",
         "end":"\u31BF"
      },
      {
         "name":"CJK Strokes",
         "start":"\u31C0",
         "end":"\u31EF"
      },
      {
         "name":"Katakana Phonetic Extensions",
         "start":"\u31F0",
         "end":"\u31FF"
      },
      {
         "name":"Enclosed CJK Letters and Months",
         "start":"\u3200",
         "end":"\u32FF"
      },
      {
         "name":"CJK Compatibility",
         "start":"\u3300",
         "end":"\u33FF"
      },
      {
         "name":"CJK Unified Ideographs Extension A",
         "start":"\u3400",
         "end":"\u4DBF"
      },
      {
         "name":"Yijing Hexagram Symbols",
         "start":"\u4DC0",
         "end":"\u4DFF"
      },
      {
         "name":"CJK Unified Ideographs",
         "start":"\u4E00",
         "end":"\u9FFF"
      },
      {
         "name":"Yi Syllables",
         "start":"\uA000",
         "end":"\uA48F"
      },
      {
         "name":"Yi Radicals",
         "start":"\uA490",
         "end":"\uA4CF"
      },
      {
         "name":"Lisu",
         "start":"\uA4D0",
         "end":"\uA4FF"
      },
      {
         "name":"Vai",
         "start":"\uA500",
         "end":"\uA63F"
      },
      {
         "name":"Cyrillic Extended-B",
         "start":"\uA640",
         "end":"\uA69F"
      },
      {
         "name":"Bamum",
         "start":"\uA6A0",
         "end":"\uA6FF"
      },
      {
         "name":"Modifier Tone Letters",
         "start":"\uA700",
         "end":"\uA71F"
      },
      {
         "name":"Latin Extended-D",
         "start":"\uA720",
         "end":"\uA7FF"
      },
      {
         "name":"Syloti Nagri",
         "start":"\uA800",
         "end":"\uA82F"
      },
      {
         "name":"Common Indic Number Forms",
         "start":"\uA830",
         "end":"\uA83F"
      },
      {
         "name":"Phags-pa",
         "start":"\uA840",
         "end":"\uA87F"
      },
      {
         "name":"Saurashtra",
         "start":"\uA880",
         "end":"\uA8DF"
      },
      {
         "name":"Devanagari Extended",
         "start":"\uA8E0",
         "end":"\uA8FF"
      },
      {
         "name":"Kayah Li",
         "start":"\uA900",
         "end":"\uA92F"
      },
      {
         "name":"Rejang",
         "start":"\uA930",
         "end":"\uA95F"
      },
      {
         "name":"Hangul Jamo Extended-A",
         "start":"\uA960",
         "end":"\uA97F"
      },
      {
         "name":"Javanese",
         "start":"\uA980",
         "end":"\uA9DF"
      },
      {
         "name":"Cham",
         "start":"\uAA00",
         "end":"\uAA5F"
      },
      {
         "name":"Myanmar Extended-A",
         "start":"\uAA60",
         "end":"\uAA7F"
      },
      {
         "name":"Tai Viet",
         "start":"\uAA80",
         "end":"\uAADF"
      },
      {
         "name":"Meetei Mayek Extensions",
         "start":"\uAAE0",
         "end":"\uAAFF"
      },
      {
         "name":"Ethiopic Extended-A",
         "start":"\uAB00",
         "end":"\uAB2F"
      },
      {
         "name":"Meetei Mayek",
         "start":"\uABC0",
         "end":"\uABFF"
      },
      {
         "name":"Hangul Syllables",
         "start":"\uAC00",
         "end":"\uD7AF"
      },
      {
         "name":"Hangul Jamo Extended-B",
         "start":"\uD7B0",
         "end":"\uD7FF"
      },
      {
         "name":"High Surrogates",
         "start":"\uD800",
         "end":"\uDB7F"
      },
      {
         "name":"High Private Use Surrogates",
         "start":"\uDB80",
         "end":"\uDBFF"
      },
      {
         "name":"Low Surrogates",
         "start":"\uDC00",
         "end":"\uDFFF"
      },
      {
         "name":"Private Use Area",
         "start":"\uE000",
         "end":"\uF8FF"
      },
      {
         "name":"CJK Compatibility Ideographs",
         "start":"\uF900",
         "end":"\uFAFF"
      },
      {
         "name":"Alphabetic Presentation Forms",
         "start":"\uFB00",
         "end":"\uFB4F"
      },
      {
         "name":"Arabic Presentation Forms-A",
         "start":"\uFB50",
         "end":"\uFDFF"
      },
      {
         "name":"Variation Selectors",
         "start":"\uFE00",
         "end":"\uFE0F"
      },
      {
         "name":"Vertical Forms",
         "start":"\uFE10",
         "end":"\uFE1F"
      },
      {
         "name":"Combining Half Marks",
         "start":"\uFE20",
         "end":"\uFE2F"
      },
      {
         "name":"CJK Compatibility Forms",
         "start":"\uFE30",
         "end":"\uFE4F"
      },
      {
         "name":"Small Form Variants",
         "start":"\uFE50",
         "end":"\uFE6F"
      },
      {
         "name":"Arabic Presentation Forms-B",
         "start":"\uFE70",
         "end":"\uFEFF"
      },
      {
         "name":"Halfwidth and Fullwidth Forms",
         "start":"\uFF00",
         "end":"\uFFEF"
      },
      {
         "name":"Specials",
         "start":"\uFFF0",
         "end":"\uFFFF"
      },
      {
         "name":"Linear B Syllabary",
         "start":"\uD800\uDC00",
         "end":"\uD800\uDC7F"
      },
      {
         "name":"Linear B Ideograms",
         "start":"\uD800\uDC80",
         "end":"\uD800\uDCFF"
      },
      {
         "name":"Aegean Numbers",
         "start":"\uD800\uDD00",
         "end":"\uD800\uDD3F"
      },
      {
         "name":"Ancient Greek Numbers",
         "start":"\uD800\uDD40",
         "end":"\uD800\uDD8F"
      },
      {
         "name":"Ancient Symbols",
         "start":"\uD800\uDD90",
         "end":"\uD800\uDDCF"
      },
      {
         "name":"Phaistos Disc",
         "start":"\uD800\uDDD0",
         "end":"\uD800\uDDFF"
      },
      {
         "name":"Lycian",
         "start":"\uD800\uDE80",
         "end":"\uD800\uDE9F"
      },
      {
         "name":"Carian",
         "start":"\uD800\uDEA0",
         "end":"\uD800\uDEDF"
      },
      {
         "name":"Old Italic",
         "start":"\uD800\uDF00",
         "end":"\uD800\uDF2F"
      },
      {
         "name":"Gothic",
         "start":"\uD800\uDF30",
         "end":"\uD800\uDF4F"
      },
      {
         "name":"Ugaritic",
         "start":"\uD800\uDF80",
         "end":"\uD800\uDF9F"
      },
      {
         "name":"Old Persian",
         "start":"\uD800\uDFA0",
         "end":"\uD800\uDFDF"
      },
      {
         "name":"Deseret",
         "start":"\uD801\uDC00",
         "end":"\uD801\uDC4F"
      },
      {
         "name":"Shavian",
         "start":"\uD801\uDC50",
         "end":"\uD801\uDC7F"
      },
      {
         "name":"Osmanya",
         "start":"\uD801\uDC80",
         "end":"\uD801\uDCAF"
      },
      {
         "name":"Cypriot Syllabary",
         "start":"\uD802\uDC00",
         "end":"\uD802\uDC3F"
      },
      {
         "name":"Imperial Aramaic",
         "start":"\uD802\uDC40",
         "end":"\uD802\uDC5F"
      },
      {
         "name":"Phoenician",
         "start":"\uD802\uDD00",
         "end":"\uD802\uDD1F"
      },
      {
         "name":"Lydian",
         "start":"\uD802\uDD20",
         "end":"\uD802\uDD3F"
      },
      {
         "name":"Meroitic Hieroglyphs",
         "start":"\uD802\uDD80",
         "end":"\uD802\uDD9F"
      },
      {
         "name":"Meroitic Cursive",
         "start":"\uD802\uDDA0",
         "end":"\uD802\uDDFF"
      },
      {
         "name":"Kharoshthi",
         "start":"\uD802\uDE00",
         "end":"\uD802\uDE5F"
      },
      {
         "name":"Old South Arabian",
         "start":"\uD802\uDE60",
         "end":"\uD802\uDE7F"
      },
      {
         "name":"Avestan",
         "start":"\uD802\uDF00",
         "end":"\uD802\uDF3F"
      },
      {
         "name":"Inscriptional Parthian",
         "start":"\uD802\uDF40",
         "end":"\uD802\uDF5F"
      },
      {
         "name":"Inscriptional Pahlavi",
         "start":"\uD802\uDF60",
         "end":"\uD802\uDF7F"
      },
      {
         "name":"Old Turkic",
         "start":"\uD803\uDC00",
         "end":"\uD803\uDC4F"
      },
      {
         "name":"Rumi Numeral Symbols",
         "start":"\uD803\uDE60",
         "end":"\uD803\uDE7F"
      },
      {
         "name":"Brahmi",
         "start":"\uD804\uDC00",
         "end":"\uD804\uDC7F"
      },
      {
         "name":"Kaithi",
         "start":"\uD804\uDC80",
         "end":"\uD804\uDCCF"
      },
      {
         "name":"Sora Sompeng",
         "start":"\uD804\uDCD0",
         "end":"\uD804\uDCFF"
      },
      {
         "name":"Chakma",
         "start":"\uD804\uDD00",
         "end":"\uD804\uDD4F"
      },
      {
         "name":"Sharada",
         "start":"\uD804\uDD80",
         "end":"\uD804\uDDDF"
      },
      {
         "name":"Takri",
         "start":"\uD805\uDE80",
         "end":"\uD805\uDECF"
      },
      {
         "name":"Cuneiform",
         "start":"\uD808\uDC00",
         "end":"\uD808\uDFFF"
      },
      {
         "name":"Cuneiform Numbers and Punctuation",
         "start":"\uD809\uDC00",
         "end":"\uD809\uDC7F"
      },
      {
         "name":"Egyptian Hieroglyphs",
         "start":"\uD80C\uDC00",
         "end":"\uD80D\uDC2F"
      },
      {
         "name":"Bamum Supplement",
         "start":"\uD81A\uDC00",
         "end":"\uD81A\uDE3F"
      },
      {
         "name":"Miao",
         "start":"\uD81B\uDF00",
         "end":"\uD81B\uDF9F"
      },
      {
         "name":"Kana Supplement",
         "start":"\uD82C\uDC00",
         "end":"\uD82C\uDCFF"
      },
      {
         "name":"Byzantine Musical Symbols",
         "start":"\uD834\uDC00",
         "end":"\uD834\uDCFF"
      },
      {
         "name":"Musical Symbols",
         "start":"\uD834\uDD00",
         "end":"\uD834\uDDFF"
      },
      {
         "name":"Ancient Greek Musical Notation",
         "start":"\uD834\uDE00",
         "end":"\uD834\uDE4F"
      },
      {
         "name":"Tai Xuan Jing Symbols",
         "start":"\uD834\uDF00",
         "end":"\uD834\uDF5F"
      },
      {
         "name":"Counting Rod Numerals",
         "start":"\uD834\uDF60",
         "end":"\uD834\uDF7F"
      },
      {
         "name":"Mathematical Alphanumeric Symbols",
         "start":"\uD835\uDC00",
         "end":"\uD835\uDFFF"
      },
      {
         "name":"Arabic Mathematical Alphabetic Symbols",
         "start":"\uD83B\uDE00",
         "end":"\uD83B\uDEFF"
      },
      {
         "name":"Mahjong Tiles",
         "start":"\uD83C\uDC00",
         "end":"\uD83C\uDC2F"
      },
      {
         "name":"Domino Tiles",
         "start":"\uD83C\uDC30",
         "end":"\uD83C\uDC9F"
      },
      {
         "name":"Playing Cards",
         "start":"\uD83C\uDCA0",
         "end":"\uD83C\uDCFF"
      },
      {
         "name":"Enclosed Alphanumeric Supplement",
         "start":"\uD83C\uDD00",
         "end":"\uD83C\uDDFF"
      },
      {
         "name":"Enclosed Ideographic Supplement",
         "start":"\uD83C\uDE00",
         "end":"\uD83C\uDEFF"
      },
      {
         "name":"Miscellaneous Symbols And Pictographs",
         "start":"\uD83C\uDF00",
         "end":"\uD83D\uDDFF"
      },
      {
         "name":"Emoticons",
         "start":"\uD83D\uDE00",
         "end":"\uD83D\uDE4F"
      },
      {
         "name":"Transport And Map Symbols",
         "start":"\uD83D\uDE80",
         "end":"\uD83D\uDEFF"
      },
      {
         "name":"Alchemical Symbols",
         "start":"\uD83D\uDF00",
         "end":"\uD83D\uDF7F"
      },
      {
         "name":"CJK Unified Ideographs Extension B",
         "start":"\uD840\uDC00",
         "end":"\uD869\uDEDF"
      },
      {
         "name":"CJK Unified Ideographs Extension C",
         "start":"\uD869\uDF00",
         "end":"\uD86D\uDF3F"
      },
      {
         "name":"CJK Unified Ideographs Extension D",
         "start":"\uD86D\uDF40",
         "end":"\uD86E\uDC1F"
      },
      {
         "name":"CJK Compatibility Ideographs Supplement",
         "start":"\uD87E\uDC00",
         "end":"\uD87E\uDE1F"
      },
      {
         "name":"Tags",
         "start":"\uDB40\uDC00",
         "end":"\uDB40\uDC7F"
      },
      {
         "name":"Variation Selectors Supplement",
         "start":"\uDB40\uDD00",
         "end":"\uDB40\uDDEF"
      },
      {
         "name":"Supplementary Private Use Area-A",
         "start":"\uDB80\uDC00",
         "end":"\uDBBF\uDFFF"
      },
      {
         "name":"Supplementary Private Use Area-B",
         "start":"\uDBC0\uDC00",
         "end":"\uDBFF\uDFFF"
      }
   ],
   "groups":[
      {
         "name":"People",
         "items":[
         ]
      },
      {
         "name":"Nature",
         "items":[
         ]
      },
      {
         "name":"Objects",
         "items":[
         ]
      },
      {
         "name":"Places",
         "items":[
         ]
      },
      {
         "name":"Symbols",
         "items":[
         ]
      }
   ],
   "ioshidden": [
      "\u00A9",
      "\u00AE",
      "\u203C",
      "\u2049",
      "\u2122",
      "\u2139",
      "\u2194",
      "\u2195",
      "\u2196",
      "\u2197",
      "\u2198",
      "\u2199",
      "\u21A9",
      "\u21AA",
      "\u231A",
      "\u231B",
      "\u24C2",
      "\u25AA",
      "\u25AB",
      "\u25B6",
      "\u25C0",
      "\u25FB",
      "\u25FC",
      "\u25FD",
      "\u25FE",
      "\u2600",
      "\u2601",
      "\u260E",
      "\u2611",
      "\u261D",
      "\u263A",
      "\u2648",
      "\u2649",
      "\u264A",
      "\u264B",
      "\u264C",
      "\u264D",
      "\u264E",
      "\u264F",
      "\u2650",
      "\u2651",
      "\u2652",
      "\u2653",
      "\u2660",
      "\u2663",
      "\u2665",
      "\u2666",
      "\u2668",
      "\u267B",
      "\u267F",
      "\u2693",
      "\u26A0",
      "\u26A1",
      "\u26AA",
      "\u26AB",
      "\u2702",
      "\u2708",
      "\u2709",
      "\u270C",
      "\u270F",
      "\u2712",
      "\u2714",
      "\u2716",
      "\u2733",
      "\u2734",
      "\u2744",
      "\u2747",
      "\u2764",
      "\u27A1",
      "\u3030",
      "\u303D",
      "\u3297",
      "\u3299"
   ],
   "machidden": [
      "\uF8FF"
   ]
};
var smileySymbols = ["/::)","/::~","/::B","/::|","/:8-)","/::<","/::$","/::X","/::Z","/::\'(","/::-|","/::@","/::P","/::D","/::O","/::(","/::+","/:--b","/::Q","/::T","/:,@P","/:,@-D","/::d","/:,@o","/::g","/:|-)","/::!","/::L","/::>","/::,@","/:,@f","/::-S","/:?","/:,@x","/:,@@","/::8","/:,@!","/:!!!","/:xx","/:bye","/:wipe","/:dig","/:handclap","/:&-(","/:B-)","/:<@","/:@>","/::-O","/:>-|","/:P-(","/::\'|","/:X-)","/::*","/:@x","/:8*","/:pd","/:<W>","/:beer","/:basketb","/:oo","/:coffee","/:eat","/:pig","/:rose","/:fade","/:showlove","/:heart","/:break","/:cake","/:li","/:bome","/:kn","/:footb","/:ladybug","/:shit","/:moon","/:sun","/:gift","/:hug","/:strong","/:weak","/:share","/:v","/:@)","/:jj","/:@@","/:bad","/:lvu","/:no","/:ok","/:love","/:<L>","/:jump","/:shake","/:<O>","/:circle","/:kotow","/:turn","/:skip","/:oY","/:#-0","/:hiphot","/:kiss","/:<&","/:&>"];

var smileyTags = ["/微笑", "/撇嘴", "/色", "/发呆", "/得意", "/流泪", "/害羞", "/闭嘴", "/睡", "/大哭", "/尴尬", "/发怒", "/调皮", "/呲牙", "/惊讶", "/难过", "/酷", "/冷汗", "/抓狂", "/吐", "/偷笑", "/可爱", "/白眼", "/傲慢", "/饥饿", "/困", "/惊恐", "/流汗", "/憨笑", "/大兵", "/奋斗", "/咒骂", "/疑问", "/嘘", "/晕", "/折磨", "/衰", "/骷髅", "/敲打", "/再见", "/擦汗", "/抠鼻", "/鼓掌", "/糗大了", "/坏笑", "/左哼哼", "/右哼哼", "/哈欠", "/鄙视", "/委屈", "/快哭了", "/阴险", "/亲亲", "/吓", "/可怜", "/菜刀", "/西瓜", "/啤酒", "/篮球", "/乒乓", "/咖啡", "/饭", "/猪头", "/玫瑰", "/凋谢", "/示爱", "/爱心", "/心碎", "/蛋糕", "/闪电", "/炸弹", "/刀", "/足球", "/瓢虫", "/便便", "/月亮", "/太阳", "/礼物", "/拥抱", "/强", "/弱", "/握手", "/胜利", "/抱拳", "/勾引", "/拳头", "/差劲", "/爱你", "/NO", "/OK", "/爱情", "/飞吻", "/跳跳", "/发抖", "/怄火", "/转圈", "/磕头", "/回头", "/跳绳", "/挥手", "/激动", "/街舞", "/献吻", "/左太极", "/右太极"];
var smileyZhCN = ["[微笑]", "[撇嘴]", "[色]", "[发呆]", "[得意]", "[流泪]", "[害羞]", "[闭嘴]", "[睡]", "[大哭]", "[尴尬]", "[发怒]", "[调皮]", "[呲牙]", "[惊讶]", "[难过]", "[酷]", "[冷汗]", "[抓狂]", "[吐]", "[偷笑]", "[愉快]", "[白眼]", "[傲慢]", "[饥饿]", "[困]", "[惊恐]", "[流汗]", "[憨笑]", "[悠闲]", "[奋斗]", "[咒骂]", "[疑问]", "[嘘]", "[晕]", "[疯了]", "[衰]", "[骷髅]", "[敲打]", "[再见]", "[擦汗]", "[抠鼻]", "[鼓掌]", "[糗大了]", "[坏笑]", "[左哼哼]", "[右哼哼]", "[哈欠]", "[鄙视]", "[委屈]", "[快哭了]", "[阴险]", "[亲亲]", "[吓]", "[可怜]", "[菜刀]", "[西瓜]", "[啤酒]", "[篮球]", "[乒乓]", "[咖啡]", "[饭]", "[猪头]", "[玫瑰]", "[凋谢]", "[嘴唇]", "[爱心]", "[心碎]", "[蛋糕]", "[闪电]", "[炸弹]", "[刀]", "[足球]", "[瓢虫]", "[便便]", "[月亮]", "[太阳]", "[礼物]", "[拥抱]", "[强]", "[弱]", "[握手]", "[胜利]", "[抱拳]", "[勾引]", "[拳头]", "[差劲]", "[爱你]", "[NO]", "[OK]", "[爱情]", "[飞吻]", "[跳跳]", "[发抖]", "[怄火]", "[转圈]", "[磕头]", "[回头]", "[跳绳]", "[投降]", "[激动]", "[乱舞]", "[献吻]", "[左太极]", "[右太极]"];
var smileyZhTW = ["[微笑]", "[撇嘴]", "[色]", "[發呆]", "[得意]", "[流淚]", "[害羞]", "[閉嘴]", "[睡]", "[大哭]", "[尷尬]", "[發怒]", "[調皮]", "[呲牙]", "[驚訝]", "[難過]", "[酷]", "[冷汗]", "[抓狂]", "[吐]", "[偷笑]", "[愉快]", "[白眼]", "[傲慢]", "[饑餓]", "[累]", "[驚恐]", "[流汗]", "[大笑]", "[悠閑]", "[奮鬥]", "[咒罵]", "[疑問]", "[噓]", "[暈]", "[瘋了]", "[衰]", "[骷髏頭]", "[敲打]", "[再見]", "[擦汗]", "[摳鼻]", "[鼓掌]", "[羞辱]", "[壞笑]", "[左哼哼]", "[右哼哼]", "[哈欠]", "[鄙視]", "[委屈]", "[快哭了]", "[陰險]", "[親親]", "[嚇]", "[可憐]", "[菜刀]", "[西瓜]", "[啤酒]", "[籃球]", "[乒乓]", "[咖啡]", "[飯]", "[豬頭]", "[玫瑰]", "[枯萎]", "[嘴唇]", "[愛心]", "[心碎]", "[蛋糕]", "[閃電]", "[炸彈]", "[刀]", "[足球]", "[甲蟲]", "[便便]", "[月亮]", "[太陽]", "[禮物]", "[擁抱]", "[強]", "[弱]", "[握手]", "[勝利]", "[抱拳]", "[勾引]", "[拳頭]", "[差勁]", "[愛你]", "[NO]", "[OK]", "[愛情]", "[飛吻]", "[跳跳]", "[發抖]", "[噴火]", "[轉圈]", "[磕頭]", "[回頭]", "[跳繩]", "[投降]", "[激動]", "[亂舞]", "[獻吻]", "[左太極]", "[右太極]"];
var smileyEnUS = ["[Smile]", "[Grimace]", "[Drool]", "[Scowl]", "[CoolGuy]", "[Sob]", "[Shy]", "[Silent]", "[Sleep]", "[Cry]", "[Awkward]", "[Angry]", "[Tongue]", "[Grin]", "[Surprise]", "[Frown]", "[Ruthless]", "[Blush]", "[Scream]", "[Puke]", "[Chuckle]", "[Joyful]", "[Slight]", "[Smug]", "[Hungry]", "[Drowsy]", "[Panic]", "[Sweat]", "[Laugh]", "[Commando]", "[Determined]", "[Scold]", "[Shocked]", "[Shhh]", "[Dizzy]", "[Tormented]", "[Toasted]", "[Skull]", "[Hammer]", "[Wave]", "[Speechless]", "[NosePick]", "[Clap]", "[Shame]", "[Trick]", "[Bah！L]", "[Bah！R]", "[Yawn]", "[Pooh-pooh]", "[Shrunken]", "[TearingUp]", "[Sly]", "[Kiss]", "[Wrath]", "[Whimper]", "[Cleaver]", "[Watermelon]", "[Beer]", "[Basketball]", "[PingPong]", "[Coffee]", "[Rice]", "[Pig]", "[Rose]", "[Wilt]", "[Lips]", "[Heart]", "[BrokenHeart]", "[Cake]", "[Lightning]", "[Bomb]", "[Dagger]", "[Soccer]", "[Ladybug]", "[Poop]", "[Moon]", "[Sun]", "[Gift]", "[Hug]", "[ThumbsUp]", "[ThumbsDown]", "[Shake]", "[Peace]", "[Fight]", "[Beckon]", "[Fist]", "[Pinky]", "[RockOn]", "[Nuh-uh]", "[OK]", "[InLove]", "[Blowkiss]", "[Waddle]", "[Tremble]", "[Aaagh!]", "[Twirl]", "[Kotow]", "[Dramatic]", "[JumpRope]", "[Surrender]", "[Hooray]", "[Meditate]", "[Smooch]", "[TaiChi L]", "[TaiChi R]"];
var smileyTh = ["[ยิ้ม]", "[หน้าบูด]", "[น้ำลายไหล]", "[หน้าบึ้ง]", "[สบาย]", "[ร้องไห้โฮ]", "[อาย]", "[ห้ามพูด]", "[หลับ]", "[ร้องไห้]", "[ลำบากใจ]", "[โกรธสุด]", "[ขยิบตา]", "[ยิ้มกว้าง]", "[ประหลาดใจ]", "[เสียใจ]", "[เจ๋ง]", "[เขินอาย]", "[กรีดร้อง]", "[อาเจียน]", "[หัวเราะหึๆ]", "[พอใจ]", "[สงสัย]", "[หยิ่ง]", "[หิว]", "[ง่วงนอน]", "[ตกใจกลัว]", "[เหงื่อตก]", "[หัวเราะ]", "[ทหาร]", "[มุ่งมั่น]", "[ด่าว่าา]", "[สับสน]", "[จุ๊ๆ]", "[เวียนหัว]", "[ท้อแท้]", "[ชั่วร้าย]", "[หัวกะโหลก]", "[ค้อนทุบ]", "[บายๆ]", "[เช็ดเหงื่อ]", "[แคะจมูก]", "[ตบมือ]", "[อับอาย]", "[กลโกง]", "[เชิดซ้าย]", "[เชิดขวา]", "[หาว]", "[ดูถูก]", "[ข้องใจ]", "[เกือบร้องไห้]", "[ขี้โกง]", "[จุ๊บ]", "[ห๊า]", "[น่าสงสาร]", "[มีด]", "[แตงโม]", "[เบียร์]", "[บาสเกตบอล]", "[ปิงปอง]", "[กาแฟ]", "[ข้าว]", "[หมู]", "[กุหลาบ]", "[ร่วงโรย]", "[ริมฝีปาก]", "[หัวใจ]", "[ใจสลาย]", "[เค้ก]", "[ฟ้าผ่า]", "[ระเบิด]", "[ดาบ]", "[ฟุตบอล]", "[เต่าทอง]", "[อุจจาระ]", "[พระจันทร์]", "[พระอาทิตย์]", "[ของขวัญ]", "[กอด]", "[ยอดเยี่ยม]", "[ยอดแย่]", "[จับมือ]", "[สู้ตาย]", "[คารวะ]", "[เข้ามา]", "[กำหมัด]", "[ดีกัน]", "[ฉันรักคุณ]", "[ไม่]", "[ตกลง]", "[รักกัน]", "[มีรัก]", "[กระโดด]", "[เขย่า]", "[อ้ากส์!]", "[หมุนตัว]", "[คำนับ]", "[เหลียวหลัง]", "[กระโดด]", "[ยอมแพ้]", "[ไชโย]", "[เย้เย้]", "[จูบ]", "[หญิงต่อสู้]", "[ชายต่อสู้]"];

var emojiCodes =    ['\ue415','\ue056','\ue057','\ue414','\ue405','\ue106','\ue418','\ue417','\ue40D','\ue404',
                    '\ue40A','\ue105','\ue409','\ue40E','\ue402','\ue108','\ue403','\ue058','\ue407','\ue401',
                    '\ue40F','\ue40B','\ue406','\ue413','\ue411','\ue412','\ue410','\ue107','\ue059','\ue416',
                    '\ue408','\ue40C','\ue11A','\ue10C','\ue022','\ue023','\ue329','\ue32E','\ue335','\ue337',
                    '\ue336','\ue13C','\ue331','\ue03E','\ue11D','\ue05A','\ue00E','\ue421','\ue00D','\ue011',
                    '\ue22E','\ue22F','\ue231','\ue230','\ue00F','\ue14C','\ue111','\ue425','\ue001','\ue002',
                    '\ue005','\ue004','\ue04E','\ue11C','\ue003','\ue04A','\ue04B','\ue049','\ue048','\ue04C',
                    '\ue13D','\ue43E','\ue04F','\ue052','\ue053','\ue524','\ue52C','\ue52A','\ue531','\ue050',
                    '\ue527','\ue051','\ue10B','\ue52B','\ue52F','\ue109','\ue01A','\ue52D','\ue521','\ue52E',
                    '\ue055','\ue525','\ue10A','\ue522','\ue054','\ue520','\ue032','\ue303','\ue307','\ue308',
                    '\ue437','\ue445','\ue11B','\ue448','\ue033','\ue112','\ue325','\ue312','\ue310','\ue126',
                    '\ue008','\ue03D','\ue00C','\ue12A','\ue009','\ue145','\ue144','\ue03F','\ue116','\ue10F',
                    '\ue101','\ue13F','\ue12F','\ue311','\ue113','\ue30F','\ue42B','\ue42A','\ue018','\ue016',
                    '\ue014','\ue131','\ue12B','\ue03C','\ue041','\ue322','\ue10E','\ue43C','\ue323','\ue31C',
                    '\ue034','\ue035','\ue045','\ue047','\ue30C','\ue044','\ue120','\ue33B','\ue33F','\ue344',
                    '\ue340','\ue147','\ue33A','\ue34B','\ue345','\ue01D','\ue10D','\ue136','\ue435','\ue252',
                    '\ue132','\ue138','\ue139','\ue332','\ue333','\ue24E','\ue24F','\ue537'];

var scale = window.emoScale || 1;
var sz = scale +'em';
var style = document.createElement('style'), head = document.getElementsByTagName('head')[0];
style.type = 'text/css';
var css = '.emojicon-m {min-height: '+sz+' !important; min-width: '+sz+' !important; max-height: '+sz+' !important;max-width: '+sz+' !important;vertical-align: middle !important;float: none !important;background-repeat:no-repeat;background-position:center center; background-size: contain;display: inline-block;}';
if (style.styleSheet){
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}
head && head.appendChild(style);

function emor(m) {
    var src = (window.relEmo || "") +"emoticons/" + m.src;
    return "<img src='" + src + "' class='emojicon-m' />";
}

var items = dict.items, hidden = [], valid = [];
var pattern = "";
function prepare(d) {
    for (var i in d)
    {
        for (var j in d[i])
        {
            var t = 0;
            for (t in hidden)
            {
                if ( hidden[t] == d[i][j])
                {
                    break;
                }
            }
            if(t == hidden.length) {
                var str = d[i][j]+'';str = str.split(',').join('|');
                pattern += (str + "|");
            }
        }
    }

    if (pattern != "") {
        pattern = pattern.substr(0, pattern.length - 1);
    }
}

for (var i in items)
{
    if (items[i].src != '')
    {
        valid.push(items[i]);
    }
}

prepare(valid);
var regexp = new RegExp(pattern, 'g');


window.emojis = function(s) {
    s = s.replace(regexp, function(c) {
        var m = [];

        for (var i in valid)
        {
            if (!!valid[i].dict)
            {
                for (var d in valid[i].dict)
                {
                    if (c == valid[i].dict[d])
                    {
                        m.push(valid[i]);
                    }
                }
            }
        }

        if(m.length > 0) {
            return emor(m[0]);
        }else {
            return c;
        }
    });
    for (var i in emojiFiles)
    {
        var uc = emojiFiles[i];
        var code = unescape('%u' +uc);
        if( s.indexOf(code) > -1 ) {
            s = s.split(code).join(emor({src: uc +'.png'}));
        }
    }

    return s;
}


//pre fix escape html
var escapeMap = {
   "&": "&#38;",
   "<": "&#60;",
   ">": "&#62;",
   '"': "&#34;",
   "'": "&#39;"
};

var mapRexp = /[<>\'\"&]/;
if(true) {
    for(var i = 0, imax = smileySymbols.length; i < imax; i++) {
        var c = smileySymbols[i];
        if(mapRexp.test(smileySymbols[i])) {
            for(var k in escapeMap) {
                c = c.split(k).join(escapeMap[k]);
            };
            smileySymbols[i] = c;
        }
    }
}
//------
//pre fix escape html

var escapeHTML = function (content) {
    return content.replace(/&/g, '&#38;').replace(/</g, '&#60;').replace(/>/g, '&#62;').replace(/\"/g, '&#34;').replace(/\'/g, '&#39;').replace(/\r?\n/g, '<br />');
};

//------

function emopr(c) {
      if( !c ) return c;
      var c = escapeHTML(c); // !!! IMPORTANT

      var iTPL = ['<img src="' + (window.relEmo || '') +'emoticons/', '.png" class="emojicon-m" />'];

      if(!ua.macs&&!navigator.userAgent.match(/Android|iPhone|iPod/i)){
          for(var i=0, imax = emojiCodes.length; i < imax; i++) {
            if( c.indexOf(emojiCodes[i]) > -1 ) {
              c = c.split(emojiCodes[i]).join(iTPL[0] + emojiFiles[i] + iTPL[1]);
            }
          }
      }
      if( c.indexOf('/:') > -1 ) {
        for(var i=0, imax = smileySymbols.length; i<imax; i++) {
          if( c.indexOf(smileySymbols[i]) > -1 ) {
            c = c.split(smileySymbols[i]).join(iTPL[0] + 'qq/' +(i+1) + iTPL[1]);
          }
        }
      }
      if( c.indexOf('/') > -1 ) {
        for(var i=0, imax = smileyTags.length; i<imax; i++) {
          if( c.indexOf(smileyTags[i]) > -1 ) {
            c = c.split(smileyTags[i]).join(iTPL[0] + 'qq/' +(i+1) + iTPL[1]);
          }
        }
      }

      if( c.indexOf('[') > -1 && c.indexOf(']') > -1 ) {
        for(var i=0, imax = smileyTags.length; i<imax; i++) {
          if( smileyZhCN[i] && c.indexOf(smileyZhCN[i]) > -1 ) {
            c = c.split(smileyZhCN[i]).join(iTPL[0] + 'qq/' +(i+1) + iTPL[1]);
          }
          if( smileyZhTW[i] && c.indexOf(smileyZhTW[i]) > -1 ) {
            c = c.split(smileyZhTW[i]).join(iTPL[0] + 'qq/' +(i+1) + iTPL[1]);
          }
          if( smileyEnUS[i] && c.indexOf(smileyEnUS[i]) > -1 ) {
            c = c.split(smileyEnUS[i]).join(iTPL[0] + 'qq/' +(i+1) + iTPL[1]);
          }
          if( smileyTh[i] && c.indexOf(smileyTh[i]) > -1 ) {
            c = c.split(smileyTh[i]).join(iTPL[0] + 'qq/' +(i+1) + iTPL[1]);
          }
        }
      }

      if(!ua.macs&&!navigator.userAgent.match(/Android|iPhone|iPod/i)){
          if(window.emojis) {
              c = window.emojis(c);
          }
      }

  return c;
}
window.emopr = emopr;window.emopr = emopr;window.emoScale = 1;window.relEmo = location.protocol+'//y.gtimg.cn/music/portal/';
})();
