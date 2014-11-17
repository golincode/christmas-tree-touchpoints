module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// Clean build directories
		clean: {
			// Only need to clean the JS folder in the theme
			src: ['js','css']
		},
		// JS linting
		jshint: {
			// 'build/js/lib/*.js',
			// Only JSHint custom source files, libraries can be hinted too if required
			files: ['gruntfile.js', 'assets/js/src/*.js'],
			options: {
				// options here to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		},
		// JS concatenation
		concat: {
			options: {
			},
			dist: {
				src: ['assets/js/modules/*.js', 'assets/js/src/*.js'],
				dest: 'js/<%= pkg.name %>.js'
			}
		},
		// JS minification
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},

		// Sass
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/xmas.css': 'assets/scss/xmas.scss'
				}
			}
		},

		// Watch command
		watch: {
			jshint_dev: {
				files: ['<%= jshint.files %>'],
				tasks: ['jshint', 'concat']
			}
		}
	});

	// Load tasks
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-clean');

	// Set 2 basic tasks:
	// - dev for development (no cleaning of directories and uncompressed CSS and JS)
	// - default for production (cleans directories first and replaces with compressed CSS and JS)
	grunt.registerTask('dev', ['jshint', 'concat', 'sass']);
	grunt.registerTask('default', ['clean', 'jshint', 'concat', 'uglify', 'sass']);

};
