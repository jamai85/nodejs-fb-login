module.exports = function(grunt) {

    //Initializing the configuration object
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),


        uglify: {
            js: {
                files: {
                    './public/js/main.min.js': ['./publc/js/main.js']
                }
            }
        }

    });

    // Plugin loading
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Task definition
    grunt.registerTask('default', ['uglify']);
};
