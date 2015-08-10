$(document).ready(function(){

    var resiveNews;

    var getNews = function(lastNews){
        $.ajax({
            type: 'POST',
            url: 'news.php',
            dataType: 'JSON',
            data: 'countNews='+lastNews,
            success: function(data){
                //получаем массив новостей
                resiveNews = data;
                //проверить на наличие новостей
                if (resiveNews.length > 0) {
                    renderNews();
                }
          }
        });
    };

    var renderNews = function(){
        // вывести 5 новостей
        for (var i = 0; i < resiveNews.length; i++) {
            if(typeof(resiveNews[i].image) != 'undefined'){
                var img = '<img src="' + resiveNews[i].image + '" alt="' + i + '">';
            } else {
                var img = '';
            }

            $('#news ul').append('<li class="single">'+
            img +
            '<span class="date">' + resiveNews[i].date + '</span>'+
            '<a href="' + resiveNews[i].url + '" class="h3">' + resiveNews[i].title + '</a>'+
            '<p>' + resiveNews[i].preview + '</p>'+
            '</li>')
        }
    };

    $('#add-news').on('click', function(){
        // вывожу одни и те же новости так как на сервере не делал проверку и вывожу одни и те же новости
        var countNews = 0;
        getNews(countNews);
    });

});
