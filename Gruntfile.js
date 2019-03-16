const sass = require('node-sass');

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // grunt-contrib-clean
    clean: {
      build: {
        src: ['css/dist', 'js/dist']
      }
    },

    // grunt-contrib-concat
    concat: {
      js: {
        src: [
          'lib/jquery/dist/jquery.js',
          'lib/bootstrap/dist/js/bootstrap.js',
          'js/*.js'
        ],
        dest: 'js/dist/home.js',
      }
    },

    // grunt-contrib-uglify
    uglify: {
      build: {
        src: 'js/dist/home.js',
        dest: 'js/dist/home.min.js'
      }
    },

    // grunt-sass
    sass: {
      options: {
        implementation: sass,
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/dist/home.css': 'css/home.scss'
        }
      }
    },

    // grunt-autoprefixer
    autoprefixer: {
      dist: {
        files: {
          'css/dist/home.css': 'css/dist/home.css'
        }
      }
    },

    // grunt-contrib-watch
    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: ['js/**/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        },
      },
      sass: {
        files: ['css/**/*.scss', 'sass/_partials/**/*.scss'],
        tasks: ['sass']
      },
      autoprefixer: {
        files: ['css/**/*.scss'],
        tasks: ['autoprefixer:dist']
      },
    }

  });

  // Load up grunt modules
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // What to kick off when 'grunt' is run
  grunt.registerTask('default', ['clean', 'concat', 'uglify', 'sass', 'autoprefixer', 'watch']);

};
