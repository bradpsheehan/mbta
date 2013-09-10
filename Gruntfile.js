module.exports = function (grunt) {
  var javascripts = [],
      stylesheets = 'app/stylesheets/styles.scss',
      images = [
        '!app/images/sprites/*',
        'app/images/**/*.png',
        'app/images/**/*.jpg',
        'app/images/**/*.gif'
      ],
      icons = 'app/svg/*.svg';

  javascripts = [
    'app/javascripts/vendor/**/*.js',
    'app/javascripts/modules/**/*.js',
    'app/javascripts/app.js'
  ];
  grunt.initConfig({

    // Javascript Tasks
    // ---------------------------------------------

    concat: {
      dev: {
        src: [
          javascripts,
          '!app/javascripts/fallback/**/*.js'
        ],
        dest: 'public/javascripts/scripts.js',
        separator: ';'
      }
    },

    jshint: {
      dev: [javascripts, '!app/javascripts/vendor/**/*.js']
    },

    uglify: {
      dist: {
        src: [
          javascripts,
          '!app/javascripts/fallback/**/*.js'
        ],
        dest: 'public/javascripts/scripts.min.js',
        separator: ';'
      }
    },


    // CSS Tasks
    // ---------------------------------------------

    sass: {
      dev: {
        options: {
          lineNumbers: true,
          style: 'expanded'
        },
        files: [
          'public/stylesheets/styles.css': stylesheets
        ]
      },
      dist: {
        options: {
          style: 'compressed',
          quiet: true
        },
        files: [
          'public/stylesheets/styles.css': stylesheets
        ]
      }
    },


    // Image Tasks
    // ---------------------------------------------

    smushit: {
      dev: {
        src: images,
        dest: 'public/images'
      }
    },

    sprite: {
      all: {
        algorithm: 'left-right',
        src: 'app/images/sprites/*.png',
        destImg: 'public/images/sprite.png',
        destCSS: 'app/stylesheets/generated/sprite.scss',
        imgPath: '../images/sprite.png'
      }
    },


    // Font Tasks
    // ---------------------------------------------

    webfont: {
      icons: {
        src: icons,
        dest: 'public/fonts',
        destCss: 'app/stylesheets/generated/',
        options: {
          htmlDemo: false,
          relativeFontPath: '../fonts/',
          stylesheet: 'scss',
          syntax: 'bootstrap'
        }
      }
    },


    // Misc Tasks
    // ---------------------------------------------

    copy: {
      jekyll: {
        files: [
          {
            'expand': true,
            'cwd': 'app/jekyll/_site',
            'src': ['**/*.html'],
            'dest': 'public/'
          }
        ]
      }
    },


    jekyll: {
      dev: {
        src: 'app/jekyll',
        dest: 'app/jekyll/_site'
      }
    },

    watch: {
      scripts: {
        files: javascripts,
        tasks: [
          'concat',
          'jshint',
          'uglify'
        ],
        spawn: true
      },
      sass: {
        files: 'app/stylesheets/**/*{.scss, .sass}',
        tasks: ['sass'],
        spawn: true
      },
      webfont: {
        files: icons,
        tasks: 'webfont'
      },
      images: {
        files: images,
        tasks: [
          'smushit'
        ]
      },
      sprites: {
        files: 'app/images/sprites/*.png',
        tasks: ['sprite']
      },
      jekyll: {
        files: [
          'app/jekyll/**/*.html',
          '!app/jekyll/_site/**/*.html'
        ],
        tasks: ['jekyll', 'copy:jekyll']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-smushit');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-webfont');

  grunt.registerTask('default', [
    'watch'
  ]);

  grunt.registerTask('dev', [
    'jshint',
    'concat',
    'sass:dev',
    'jekyll',
    'copy:jekyll'
  ]);

  grunt.registerTask('dist', [
    'uglify',
    'sass:dist'
  ]);
};
