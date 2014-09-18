module.exports = function(grunt) {

    //Initializing the configuration object
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        watch: {
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    './views/*.jade',
                    './public/css/*.css',
                    './public/js/*.js'
                ]
            }
        },

        uglify: {
            js: {
                files: {
                    './public/js/fb.login.min.js': ['./publc/js/fb.login.js']
                }
            }
        }

    });

    // Plugin loading
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Task definition
    grunt.registerTask('default', ['uglify']);
};
