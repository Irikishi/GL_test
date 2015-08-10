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


    //получаем поля с сервера
    var getForm = function(){
        $.ajax({
            type: 'POST',
            url: 'form.php',
            dataType: 'JSON',
            success: function(data){
                var formAreas = data;
                if (formAreas.length > 0) {
                    renderForm(formAreas);
                    $('#popup form').validate({
                        rules: {
                            "name-0": {
                                required: true
                            },
                            "email-2": {
                                email: true,
                                require_from_group: [1, ".phone-email"]
                            },
                            "tel-1":{
                                require_from_group: [1, ".phone-email"]
                            }
                        },
                        submitHandler: function(form) {

                            sendFormData($(form).serialize());

                            return false;
                            // then:
                            //$(form).submit();
                        }
                    });
                }
            }
        });
    };


    // отправляем данные из формы на сервер
    var sendFormData = function(dataForm){
        $.ajax({
            type: 'POST',
            url: 'check_form.php',
            dataType: 'JSON',
            data: dataForm,
            success: function(data){
                $('#popup .wrapper').html('<p>' + data[0].msg + '</p>');
            }
        });
    };


    // создаем форму
    var renderForm = function(formAreas){
        $('body').append('<div id="popup"><div class="wrapper"><form action=""></form></div></div>');
        delForm();
        for (var i=0; i < formAreas.length; i++) {

            var attrRequired;
            if (formAreas[i].required === "true"){
                attrRequired = 'required="required"';
            } else {
                attrRequired = ' ';
            }
            console.log(attrRequired);

            if (formAreas[i].type === "textarea") {
                $('#popup form').append('<div class="area"><label for="text-' + i + '">' +
                    formAreas[i].title +
                    '</label>' +
                    '<textarea ' +
                    attrRequired +
                    ' id="text-' + i + '">' +
                    '<\/textarea></div>');
            } else if (formAreas[i].type === "submit") {
                $('#popup form').append('<div class="area">' +
                    '<input class="btn' +
                    ' id="' + formAreas[i].type + '-' + i + '"' +
                    ' type="' + formAreas[i].type + '"' +
                    ' ></div>');
            } else {
                var groupClass = ' ';
                if (formAreas[i].type === "email" || formAreas[i].type === "tel"){
                    groupClass = 'phone-email';
                } else {
                    groupClass = ' ';
                }

                $('#popup form').append('<div class="area"><label for="' + formAreas[i].type + '-' + i +'">' +
                    formAreas[i].title +
                    '</label>' +
                    '<input ' +
                    attrRequired +
                    ' name="' + formAreas[i].type + '-' + i + '"' +
                    ' id="' + formAreas[i].type + '-' + i + '"' +
                    ' class="' + groupClass + '"' +
                    ' type="' + formAreas[i].type + '"' +
                    ' ></div>');
            }
        }

        $('#popup input[type="submit"]').on('click', function(){
            //return false;
        });

    };

    var delForm = function(){
        $(document).click(function(event) {
            if ($(event.target).closest("#popup .wrapper").length) return;
            $("#popup").remove();
            event.stopPropagation();
        });
    };

    $('#btn-feedback').on('click', function(){
        getForm();
    });


    var timeout,
        asideOffset = $('#right-side').offset().top - 26;
    $(window).scroll(function(){
        if (timeout) clearTimeout(timeout);
            timeout = setTimeout(function(){
            console.log(asideOffset);
            if ($(window).scrollTop() > asideOffset) {
                $('#right-side').css('top', $(window).scrollTop() - asideOffset + 'px');
            } else {
                $('#right-side').css('top', $(window).scrollTop() + 'px');
            }

        }, 200);
    });



    $('#right-side .aside-btn').on('click', function () {
        if ($('#right-side').hasClass('open')) {
            $('#right-side').removeClass('open');
        } else {
            $('#right-side').addClass('open')
        }
    });



});
