(function($, document) {
    var pluses = /\+/g;
    function raw(s) {
        return s;
    }
    function decoded(s) {
        return decodeURIComponent(s.replace(pluses, ' '));
    }

    $.cookie = function(key, value, options) {
        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value == null)) {
            options = $.extend({}, $.cookie.defaults, options);

            if (value == null) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || $.cookie.defaults || {};
        var decode = options.raw ? raw : decoded;
        var cookies = document.cookie.split('; ');
        for (var i = 0, parts; (parts = cookies[i] && cookies[i].split('=')); i++) {
            if (decode(parts.shift()) === key) {
                return decode(parts.join('='));
            }
        }
        return null;
    };

    $.cookie.defaults = {};

})(jQuery, document);

(function( $ ) {
    var rStartMiliseconds = ($.cookie('randDate')) ? $.cookie('randDate') : new Date().getTime() - (29 * 24 * 60 * 60 * 1000);

    if (!$.cookie('randDate')) $.cookie('randDate', new Date().getTime() - (29 * 24 * 60 * 60 * 1000), {expires: 1});

    var rStart = new Date(parseInt(rStartMiliseconds));
    var startMonth = rStart.getMonth() + 1;
    if (startMonth < 10) startMonth = '0' + startMonth;

    var methods = {
        init : function(options) {
            return this;
        },
        rstart : function() {
            return this.each(function(i) {
                $(this).html(rStart.getDate() + '/' + startMonth + '/' + rStart.getFullYear());
            });
        },
        rdate : function() {
            return this.each(function(x) {
                var z = (x >= 16) ? 16 : x;
                var nextDate = new Date(rStart.getTime() + (z * (12 + z) * (60 + x) * 60 * (1000 + x)));
                if (x >= 31) nextDate = new Date(parseInt(rStartMiliseconds) + 2494600000 + x * 150000);
                ndate = nextDate.getDate();
                nmonth = nextDate.getMonth() + 1;
                nyear = nextDate.getFullYear();
                nhour = nextDate.getHours();
                if(ndate < 10) ndate = '0' + ndate;
                if(nmonth < 10) nmonth = '0' + nmonth;
                if(nhour < 10) nhour = '0' + nhour;
                nminutes = nextDate.getMinutes();
                if(nminutes < 10) nminutes = '0' + nminutes;
                nsec = nextDate.getSeconds();
                if(nsec < 10) nsec = '0'+nsec;
                $(this).html(ndate + '.' + nmonth + '.' + nyear + ' - ' + nhour + ':' + nminutes);
            });
        },
        ryear : function() {
            return this.each(function(i) {
                $(this).html(new Date().getFullYear());
            });
        }
    };

    $.fn.randDate = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call( arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method ' +  method + ' does not exist for jQuery.randDate');
        }
    };
})(jQuery);

$(function () {
    var obj = $('.rstart, .startdate');
    if (obj.length) {
        obj.randDate('rstart');
    }

    obj = $('.rdate, .ypdate');
    if (obj.length) {
        obj.randDate('rdate');
    }

    obj = $('.ryear, .nowyear');
    if (obj.length) {
        obj.randDate('ryear');
    }
});

months_localized = {
    'ru': ['СЏРЅРІР°СЂСЏ', 'С„РµРІСЂР°Р»СЏ', 'РјР°СЂС‚Р°', 'Р°РїСЂРµР»СЏ', 'РјР°СЏ', 'РёСЋРЅСЏ', 'РёСЋР»СЏ', 'Р°РІРіСѓСЃС‚Р°', 'СЃРµРЅС‚СЏР±СЂСЏ', 'РѕРєС‚СЏР±СЂСЏ', 'РЅРѕСЏР±СЂСЏ', 'РґРµРєР°Р±СЂСЏ'],
    'fr': ['janvier', 'fГ©vrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aoГ»t', 'septembre', 'octobre', 'novembre', 'dГ©cembre'],
    'bg': ['РЇРЅСѓР°СЂРё', 'Р¤РµРІСЂСѓР°СЂРё', 'РњР°СЂС‚', 'РђРїСЂРёР»', 'РњР°Р№', 'Р®РЅРё', 'Р®Р»Рё', 'РђРІРіСѓСЃС‚', 'РЎРµРїС‚РµРјРІСЂРё', 'РћРєС‚РѕРјРІСЂРё', 'РќРѕРµРјРІСЂРё', 'Р”РµРєРµРјРІСЂРё'],
    'nl': ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
    'pt': ['Janeiro', 'Fevereiro', 'MarГ§o', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    'de': ['Januar', 'Februar', 'MГ¤rz', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    'tr': ['Ocak', 'Ећubat', 'Mart', 'Nisan', 'MayД±s', 'Haziran', 'Temmuz', 'AДџustos', 'EylГјl', 'Ekim', 'KasД±m', 'AralД±k'],
    'it': ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
    'hu': ['JanuГЎr', 'FebruГЎr', 'MГЎrcius', 'ГЃprilis', 'MГЎjus', 'JГєnius', 'JГєlius', 'Augusztus', 'Szeptember', 'OktГіber', 'November', 'December'],
    'en': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    'id': ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
    'ms': ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'],
    'hi': ['а¤ња¤Ёа¤µа¤°', 'а¤«а¤°а¤¬а¤°', 'а¤®а¤ѕа¤°аҐЌа¤љ', 'а¤…а¤ЄаҐЌа¤°аҐ€а¤І', 'а¤®а¤€', 'а¤њаҐ‚а¤Ё', 'а¤њаҐЃа¤Іа¤ѕа¤€', 'а¤…а¤—а¤ёаҐЌа¤¤', 'а¤ёа¤їа¤¤а¤®аҐЌа¤¬а¤°', 'а¤…а¤•аҐЌа¤џаҐ‚а¤¬а¤°', 'а¤Ёа¤µа¤‚а¤¬а¤°', 'а¤¦а¤їа¤ёа¤‚а¤¬а¤°'],
    'es': ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    'ro': ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'],
    'pl': ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'wrzeЕ›nia', 'paЕєdziernika', 'listopada', 'grudnia'],
    'sr': ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'],
    'cs': ['ledna', 'Гєnora', 'bЕ™ezna', 'dubna', 'kvД›tna', 'ДЌervna', 'ДЌervence', 'srpna', 'zГЎЕ™Г­', 'Е™Г­jna', 'listopadu', 'prosince'],
    'sk': ['januГЎra', 'februГЎra', 'marca', 'aprГ­la', 'mГЎja', 'jГєna', 'jГєla', 'augusta', 'septembra', 'oktГіbra', 'novembra', 'decembra'],
    'el': ['О™О±ОЅОїП…О¬ПЃО№ОїП‚', 'О¦ОµОІПЃОїП…О¬ПЃО№ОїП‚', 'ОњО¬ПЃП„О№ОїП‚', 'О‘ПЂПЃОЇО»О№ОїП‚', 'ОњО¬О№ОїП‚', 'О™ОїПЌОЅО№ОїП‚', 'О™ОїПЌО»О№ОїП‚', 'О‘ПЌОіОїП…ПѓП„ОїП‚', 'ОЈОµПЂП„О­ОјОІПЃО№ОїП‚', 'ОџОєП„ПЋОІПЃО№ОїП‚', 'ОќОїО­ОјОІПЃО№ОїП‚', 'О”ОµОєО­ОјОІПЃО№ОїП‚'],
    'th': ['аёЎаёЃаёЈаёІаё„аёЎ', 'аёЃаёёаёЎаё аёІаёћаё±аё™аёа№Њ', 'аёЎаёµаё™аёІаё„аёЎ', 'а№ЂаёЎаё©аёІаёўаё™', 'аёћаё¤аё©аё аёІаё„аёЎ', 'аёЎаёґаё–аёёаё™аёІаёўаё™', 'аёЃаёЈаёЃаёЋаёІаё„аёЎ', 'аёЄаёґаё‡аё«аёІаё„аёЎ', 'аёЃаё±аё™аёўаёІаёўаё™', 'аё•аёёаёҐаёІаё„аёЎ', 'аёћаё¤аёЁаё€аёґаёЃаёІаёўаё™', 'аёаё±аё™аё§аёІаё„аёЎ'],
    'vi': ['ThГЎng Mб»™t', 'ThГЎng Hai', 'ThГЎng Ba', 'ThГЎng Bб»‘n', 'ThГЎng NДѓm', 'ThГЎng SГЎu', 'ThГЎng BбєЈy', 'ThГЎng TГЎm'],
    'fil': ['Enero', 'Pebrero', 'Marso', 'Abril', 'Mayo', 'Hunyo', 'Hulyo', 'Agosto', 'Setyembre', 'Oktubre', 'Nobyembre', 'Disyembre'],
    'ar': ['ЩЉЩ†Ш§ЩЉШ±', 'ЩЃШЁШ±Ш§ЩЉШ±', 'Щ…Ш§Ш±Ші', 'ШЈШЁШ±ЩЉЩ„', 'Щ…Ш§ЩЉЩ€', 'ЩЉЩ€Щ†ЩЉЩ€', 'ЩЉЩ€Щ„ЩЉЩ€', 'ШЈШєШіШ·Ші', 'ШіШЁШЄЩ…ШЁШ±', 'ШЈЩѓШЄЩ€ШЁШ±', 'Щ†Щ€ЩЃЩ…ШЁШ±', 'ШЇЩЉШіЩ…ШЁШ±'],
    'ur': ['Ш¬Щ†Щ€Ш±ЫЊ', 'ЩЃШ±Щ€Ш±ЫЊ', 'Щ…Ш§Ш±Ъ†', 'Ш§ЩѕШ±ЫЊЩ„', 'Щ…Ш¦ЫЊ', 'Ш¬Щ€Щ†', 'Ш¬Щ€Щ„Ш§Ш¦ЫЊ', 'Ш§ЪЇШіШЄ', 'ШіШЄЩ…ШЁШ±', 'Ш§Ъ©ШЄЩ€ШЁШ±', 'Щ†Щ€Щ…ШЁШ±', 'ШЇШіЩ…ШЁШ±'],
    'nb': ['Januar', 'Februar', 'Mars ','April ','May ','Juni ','Juli ','August ','September ','Oktober ','November ','Desember '],
    'nn': ['Januar', 'Februar', 'Mars ','April ','May ','Juni ','Juli ','August ','September ','Oktober ','November ','Desember '],
    'no': ['Januar', 'Februar', 'Mars ','April ','May ','Juni ','Juli ','August ','September ','Oktober ','November ','Desember '],
    'nb_NO': ['Januar', 'Februar', 'Mars ','April ','May ','Juni ','Juli ','August ','September ','Oktober ','November ','Desember '],
    'km': ['бћбћЂбћљбћ¶', 'бћЂбћ»бћбџ’бћ—бџ€', 'бћбћ·бћ“бћ¶', 'бћбџЃбћџбћ¶', 'бћ§бћџбћ—бћ¶', 'бћбћ·бћђбћ»бћ“бћ¶', 'бћЂбћЂбџ’бћЂбћЉбћ¶', 'бћџбћёбћ бћ¶', 'бћЂбћ‰бџ’бћ‰бћ¶', 'бћЏбћ»бћ›бћ¶', 'вЂбћњбћ·бћ…бџ’бћ†бћ·бћЂбћ¶', 'бћ’бџ’бћ“бћј'],
    'zh': ['дёЂжњ€', 'дєЊжњ€', 'дё‰жњ€', 'е››жњ€', 'дє”жњ€', 'е…­жњ€', 'дёѓжњ€', 'е…«жњ€', 'д№ќжњ€', 'еЌЃжњ€', 'еЌЃдёЂжњ€', 'еЌЃдєЊжњ€']
};

days_localized = {
    'ru': ['РІРѕСЃРєСЂРµСЃРµРЅСЊРµ', 'РїРѕРЅРµРґРµР»СЊРЅРёРє', 'РІС‚РѕСЂРЅРёРє', 'СЃСЂРµРґР°', 'С‡РµС‚РІРµСЂРі', 'РїСЏС‚РЅРёС†Р°', 'СЃСѓР±Р±РѕС‚Р°'],
    'fr': ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    'bg': ['РќРµРґРµР»СЏ', 'РџРѕРЅРµРґРµР»РЅРёРє', 'Р’С‚РѕСЂРЅРёРє', 'РЎСЂСЏРґР°', 'Р§РµС‚РІСЉСЂС‚СЉРє', 'РџРµС‚СЉРє', 'РЎСЉР±РѕС‚Р°'],
    'nl': ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
    'pt': ['Domingo', 'Segunda Feira', 'TerГ§a Feira', 'Quarta Feira', 'Quinta Feira', 'Sexta Feira', 'SГЎbado'],
    'de': ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    'tr': ['Pazar', 'Pazartesi', 'SalД±', 'Г‡arЕџamba', 'PerЕџembe', 'Cuma', 'Cumartesi'],
    'it': ['Domenica', 'LunedГ¬', 'MartedГ¬', 'MercoledГ¬', 'GiovedГ¬', 'VenerdГ¬', 'Sabato'],
    'hu': ['VasГЎrnap', 'HГ©tfЕ‘', 'Kedd', 'Szerda', 'CsГјtГ¶rtГ¶k', 'PГ©ntek', 'Szombat'],
    'en': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    'hi': ['а¤ёаҐ‹а¤®а¤µа¤ѕа¤°', 'а¤®а¤‚а¤—а¤Іа¤µа¤ѕа¤°', 'а¤¬аҐЃа¤§а¤µа¤ѕа¤°', 'а¤—аҐЃа¤°аҐ‚а¤µа¤ѕа¤°', 'а¤¶аҐЃа¤•аҐЌа¤°а¤µа¤ѕа¤°', 'а¤¶а¤Ёа¤їа¤µа¤ѕа¤°', 'а¤°а¤µа¤їа¤µа¤ѕа¤°'],
    'ms': ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'],
    'id': ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
    'es': ['Domingo', 'Lunes', 'Martes', 'MiГ©rcoles', 'Jueves', 'Viernes', 'SГЎbado'],
    'ro': ['DuminicДѓ', 'Luni', 'MarЕЈi', 'Miercuri', 'Joi', 'Vineri', 'SГўmbДѓtДѓ'],
    'pl': ['niedziela', 'poniedziaЕ‚ek', 'wtorek', 'Е›roda', 'czwartek', 'piД…tek', 'sobota'],
    'sr': ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'ДЊetvrtak', 'Petak', 'Subota'],
    'cs': ['nedД›le', 'pondД›lГ­', 'ГєterГЅ', 'stЕ™eda', 'ДЌtvrtek', 'pГЎtek', 'sobota'],
    'sk': ['nedeДѕa', 'pondelok', 'utorok', 'streda', 'ЕЎtvrtok', 'piatok', 'sobota'],
    'el': ['ОљП…ПЃО№О±ОєО®', 'О”ОµП…П„О­ПЃО±', 'О¤ПЃОЇП„О·', 'О¤ОµП„О¬ПЃП„О·', 'О О­ОјПЂП„О·', 'О О±ПЃО±ПѓОєОµП…О®', 'ОЈО¬ОІОІО±П„Ої'],
    'th': ['аё§аё±аё™аё­аёІаё—аёґаё•аёўа№Њ', 'аё§аё±аё™аё€аё±аё™аё—аёЈа№Њ', 'аё§аё±аё™аё­аё±аё‡аё„аёІаёЈ', 'аё§аё±аё™аёћаёёаё', 'аё§аё±аё™аёћаё¤аё«аё±аёЄаёљаё”аёµ', 'аё§аё±аё™аёЁаёёаёЃаёЈа№Њ', 'аё§аё±аё™а№ЂаёЄаёІаёЈа№Њ'],
    'vi': ['Chб»§ Nhбє­t', 'Thб»© Hai', 'Thб»© Ba', 'Thб»© TЖ°', 'Thб»© NДѓm', 'Thб»© SГЎu', 'Thб»© BбєЈy'],
    'ar': ['Ш§Щ„Ш§Ш­ШЇ', 'Ш§Щ„Ш§Ш«Щ†ЩЉЩ†', 'Ш§Щ„Ш«Щ„Ш§Ш«Ш§ШЎ', 'Ш§Щ„Ш§Ш±ШЁШ№Ш§ШЎ', 'Ш§Щ„Ш®Щ…ЩЉШі', 'Ш§Щ„Ш¬Щ…Ш№Ш©', 'Ш§Щ„ШіШЁШЄ'],
    'fil': ['Linggo', 'Lunes', 'Martes', 'Miyerkoles', 'Huebes', 'Biyernes', 'Sabado'],
    'ur': ['Ш§ШЄЩ€Ш§Ш±', 'ЩѕЫЊШ±', 'Щ…Щ†ЪЇЩ„', 'ШЁШЇЪѕ', 'Ш¬Щ…Ш№Ш±Ш§ШЄ', 'Ш¬Щ…Ш№ЫЃ', 'ЫЃЩЃШЄЫЃ'],
    'nb': ['SГёndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Friday', 'LГёrdag'],
    'nn': ['SГёndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Friday', 'LГёrdag'],
    'no': ['SГёndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Friday', 'LГёrdag'],
    'nb_NO': ['SГёndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Friday', 'LГёrdag'],
    'km': ['бћўбћ¶бћ‘бћ·бћЏбџ’бћ™', 'бћ…бџђбћ“бџ’бћ’', 'бћўбћ„бџ’бћ‚бћ¶бћљбџЌ', 'бћ–бћ»бћ’', 'бћ–бџ’бћљбћ бћџбџ’бћ”бћ·бџЌ', 'бћџбћ»бћЂбџ’бћљ', 'бћџбџ…бћљбџЌ'],
    'zh': ['жџжњџе¤©','жџжњџдёЂ', 'жџжњџдєЊ', 'жџжњџдё‰', 'жџжњџе››', 'жџжњџдє”', 'жџжњџе…­']
};

function dtimes(d) {
    //g is the number of the day [1..7]
    var g = 5;

    if (g == 1 || g == 4 || g == 6) {

        var now = new Date();
        now.setDate(now.getDate() + d + 1);
        document.write((now.getDate()) + " " + months_localized[lang_locale][now.getMonth()]);
    } else if (g == 2 || g == 5 || g == 7) {
        var now = new Date();
        now.setDate(now.getDate() + d + 1 - 1);
        document.write((now.getDate()) + " " + months_localized[lang_locale][now.getMonth()]);
    } else if (g == 3) {
        var now = new Date();
        now.setDate(now.getDate() + d + 1 - 2);
        document.write((now.getDate()) + " " + months_localized[lang_locale][now.getMonth()]);
    }
}

function dtime(d) {
    var now = new Date();
    now.setDate(now.getDate() + d + 1);
    document.write(days_localized[lang_locale][now.getDay()] + " " + (now.getDate()) + ", " + " " + months_localized[lang_locale][now.getMonth()] + " " + now.getFullYear());
}

function dtime_nums(d, like_eu) {
    var now = new Date();
    now.setDate(now.getDate() + d + 1);

    var dayNum = '';
    if (now.getDate() < 10) {
        dayNum = '0';
    }
    dayNum += now.getDate();

    var monthNum = '';
    if (now.getMonth() + 1 < 10) {
        monthNum = '0';
    }
    monthNum += now.getMonth() + 1;

    if (like_eu === true) {
        document.write(dayNum + "." + monthNum + "." + now.getFullYear());
    } else {
        document.write(monthNum + "." + dayNum + "." + now.getFullYear());
    }

}