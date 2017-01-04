'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var path = require('path');
var yeoman = require('yeoman-generator');

module.exports = class extends Generator {




  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
    //yeoman.Base.apply(this, arguments);
    // add option to skip install
    //this.option('skip-install');
    this.argument('appname', {
      type: String,
      required: false
    });
    var appName = this.appname || path.basename(process.cwd());
    this.appname = _.kebabCase(appName);
    this.modulename = _.snakeCase(appName);
    this.classname = _.capitalize(_.camelCase(appName));
  }


  prompting() {
    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        //Defaults to the project's folder name if the input is skipped
        default: this.appname
      },

      {
        type: 'input',
        name: 'description',
        message: 'Your project description',
        //Defaults to the project's folder name if the input is skipped
        default: this.description
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'Your full name:',
        validate: function (input) {
          if (/.+/.test(input)) {
            return true;
          }
          return 'Please enter your full name';
        },
        default: this.user.git.name
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'Your email address:',
        validate: function (input) {
          if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input)) {
            return true;
          }
          return 'Please enter a valid email address';
        },
        default: this.user.git.email
      },
      {
        type: 'input',
        name: 'libraryName',
        message: 'Your library name (kebab-case)',
        default: this.appname,
        store: true
      },
      {
        type: 'input',
        name: 'homepage',
        message: 'Your project homepage',
        //Defaults to the project's folder name if the input is skipped
        default: this.homepage
      },
      {
        type: 'input',
        name: 'gitRepositoryUrl',
        message: 'Git repository url',
        default: 'https://github.com/username/repo',
        store: true
      },

      {
        type: 'input',
        name: 'gitIssuesUrl',
        message: 'Your project gitIssuesUrl',
        default: 'https://github.com/username/repo#issues',
        //Defaults to the project's folder name if the input is skipped

      }
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));


  }

  writing() {
    //this.destinationRoot()
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name,
        description: this.props.description,
        authorName: this.props.authorName,
        authorEmail: this.props.authorEmail,
        homepage: this.props.homepage,
        gitRepositoryUrl: this.props.gitRepositoryUrl,
        gitIssuesUrl: this.props.gitIssuesUrl,
        libraryName: this.props.libraryName
      }
    );
    this.fs.copyTpl(
      this.templatePath('_tsconfig.json'),
      this.destinationPath('tsconfig.json'),
      {
        name: this.props.name,
        description: this.props.description,
        authorName: this.props.authorName,
        email: this.props.email,
        homepage: this.props.homepage,
        gitRepositoryUrl: this.props.gitRepositoryUrl,
        gitIssuesUrl: this.props.gitIssuesUrl,
        libraryName: this.props.libraryName
      }
    );


    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('.npmignore'),
      this.destinationPath('.npmignore')
    );
    this.fs.copyTpl(
      this.templatePath('LICENSE'),
      this.destinationPath('LICENSE'),
      {
        name: this.props.name,
        description: this.props.description,
        authorName: this.props.authorName,
        email: this.props.email,
        homepage: this.props.homepage,
        gitRepositoryUrl: this.props.gitRepositoryUrl,
        gitIssuesUrl: this.props.gitIssuesUrl,
        libraryName: this.props.libraryName
      }
    );
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        name: this.props.name,
        description: this.props.description,
        authorName: this.props.authorName,
        email: this.props.email,
        homepage: this.props.homepage,
        gitRepositoryUrl: this.props.gitRepositoryUrl,
        gitIssuesUrl: this.props.gitIssuesUrl,
        libraryName: this.props.libraryName
      }
    );

    this.fs.copy(
      this.templatePath('index.ts'),
      this.destinationPath('index.ts')
    );
    this.fs.copy(
      this.templatePath('lib/sample.module.ts'),
      this.destinationPath('lib/sample.module.ts')
    );
    this.fs.copy(
      this.templatePath('lib/sample.service.ts'),
      this.destinationPath('lib/sample.service.ts')
    );


  }

  //Install Dependencies
  install() {

    this.installDependencies({
      //skipInstall: this.options['skip-install'],
      bower: false,
    });

  }
};
