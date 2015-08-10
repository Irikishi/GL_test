module.exports = function(grunt) {

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            development: {
                files: {
                  "css/main.css": "less/main.less"
                }
            }
        },

        concat: {
            basic: {
                src: ['css/normalize.css', 'css/main.css'],
                dest: 'dist/build_main.css'
            },
            extras: {
                src: ['js/jquery-1.11.3.min.js',
                    'js/jquery.validate.min.js',
                    'js/additional-methods.min.js',
                    'js/main.js'],
                dest: 'dist/build_main.js'
            }
        },

        cssmin: {
            build: {
                src: 'dist/build_main.css',
                dest: 'dist/build_main.min.css'
            }
        },

        uglify: {
            build: {
                src: 'dist/build_main.js',
                dest: 'dist/build_main.min.js'
            }
        }

    });

    // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', ['less'], ['concat'], ['cssmin'], ['uglify']);

};
