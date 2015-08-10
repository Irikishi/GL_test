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
            dist: {
                src: [
                    'css/normalize.css',
                    'css/main.css'
                ],
                dest: 'dist/build_main.css',
            }
        },

        cssmin: {
            build: {
                src: 'dist/build_main.css',
                dest: 'dist/build_main.min.css'
            }
        }

    });

    // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', ['less'], ['concat'], ['cssmin']);

};
