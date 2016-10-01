'use strict';
module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        mangle: true,
        compress: true,
        banner: '/* <%= pkg.name %> | <%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      main: {
        src: 'public/js/main.js',
        dest: 'public/js/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      target: {
        src: 'public/js/main.js'
      }
    },
    sass: {
      main: {
        options: {
          style: 'expanded'
        },
        files: {
          'public/css/<%= pkg.name %>.css': 'public/sass/main.scss'
        }
      }
    },
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({browsers: ['last 2 version']})
        ]
      },
      main: {
        src: 'public/css/<%= pkg.name %>.css'
      }
    },
    csscomb: {
      options: {
        config: 'public/sass/.csscomb.json'
      },
      main: {
        src: 'public/css/<%= pkg.name %>.css',
        dest: 'public/css/<%= pkg.name %>.css'
      }
    },
    cssmin: {
      main: {
        src: 'public/css/<%= pkg.name %>.css',
        dest: 'public/css/<%= pkg.name %>.min.css'
      }
    },
    watch: {
      options: {
        spawn: false,
        livereload: true
      },
      scripts: {
        files: ['public/js/main.js'],
        tasks: ['jshint', 'uglify']
      },
      pug: {
        files: 'templates/**/*.pug'
      },
      sass: {
        files: 'public/sass/*.scss',
        tasks: ['sass', 'postcss', 'csscomb', 'cssmin']
      }
    }
  });

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);

  grunt.registerTask('default', ['concat', 'uglify']);
};
