var weight = 0.0;
chrome.storage.sync.get({'weight': 70}, function(items)
{
    weight = items.weight;
});

$("#modal-root").bind("DOMSubtreeModified", function() {
    splitChangeClick();
    setupRE();
});

$(document).ready(function() {
    splitChangeClick();
    setupRE();
});

function waitForElement(elementPath, callBack){
    window.setTimeout(function(){
      if($(elementPath).length){
        callBack(elementPath, $(elementPath));
      }else{
        waitForElement(elementPath, callBack);
      }
    },500)
}

waitForElement("#menu-container",function(){
    splitChangeClick();
    setupRE();
});

function splitChangeClick() {
    $("#menu-container li").click(function() {
        $('.LapDisplayTable__Table-t3tg80-1.dVeZVW > tr').each(function() {
            var $ths = $(this).find('th');
            if($ths.length==10)
            {
                $(this).find('th:last-child').remove();
            }
        });
        $('.LapDisplayTable__Table-t3tg80-1.dVeZVW > tbody > tr').each(function() {
            var $tds = $(this).find('td');
            if($tds.length==10)
            {
                $(this).find('td:last-child').remove();
            }
        });
    });
}

function setupRE() {
    setTimeout(function(){
        $('.LapDisplayTable__Table-t3tg80-1.dVeZVW > tr').each(function() {
            var $ths = $(this).find('th');
            if($ths.length==9)
            {
                $(this).append($('<th />', {'class' : 'LapDisplayTable__HeaderCell-t3tg80-3 iGCydt', 'text' : 'RE'}));
            }
        });
        $('.LapDisplayTable__Table-t3tg80-1.dVeZVW > tbody > tr').each(function() {
            var $tds = $(this).find('td');
            if($tds.length==9)
            {
                var distance = 0.0;
                var time = 0.0;
                var watts = 0.0;
                timeText = $tds.eq(1).text(),
                distanceText = $tds.eq(2).text(),
                powerText = $tds.eq(3).text();
                if(distanceText.indexOf("km") !== -1)
                {
                    distance = parseFloat(distanceText.replace(" km", "")) * 1000;
                }
                else if(distanceText.indexOf("mi") !== -1)
                {
                    distance = parseFloat(distanceText.replace(" mi", "")) * 1609.34;
                }
                else if(distanceText.indexOf(" m") !== -1)
                {
                    distance = parseFloat(distanceText.replace(" m", ""));
                }
                watts = parseFloat(powerText.replace(" W", ""));
                var split = timeText.split(":");
                if(split.length==3)
                {
                    time = (+split[0]) * 60 * 60 + (+split[1]) * 60 + (+split[2]);
                }
                else if(split.length==2)
                {
                    time = (+split[0]) * 60 + (+split[1]);
                }
                else
                {
                    time = (+split[0]);
                }
                var RE = (distance/time)/(watts/weight);
                if(RE>0)
                {
                    flag=1;
                    $(this).append($('<td>', {'class' : 'LapDisplayTable__Cell-t3tg80-4 lpcVYV', 'text' : RE.toFixed(3)}));
                }
            }
        });
    }, 3000);
    waitForElement("#menu-container",function(){
        splitChangeClick();
        setupRE();
    });
}