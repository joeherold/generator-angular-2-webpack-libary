'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
  prompting: function () {
    var done = this.async();
    this.prompt([
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
        name: 'author',
        message: 'Your author name',
        store: true,
        //Defaults to the project's folder name if the input is skipped
        default: this.author
      },
      {
        type: 'input',
        name: 'email',
        message: 'Your email',
        store: true,
        //Defaults to the project's folder name if the input is skipped
        default: this.email
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
        name: 'gitURL',
        message: 'Your project gitURL',
        //Defaults to the project's folder name if the input is skipped
        default: this.gitURL
      },
      {
        type: 'input',
        name: 'issuesUrl',
        message: 'Your project issuesUrl',
        //Defaults to the project's folder name if the input is skipped
        default: this.issuesUrl
      }
    ]).then((answers) => {
      this.log('app name', answers.name);
      this.props = answers
    });


  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'), {
        name: this.props.name,
        description: this.props.description,
        author: this.props.author,
        email: this.props.email,
        homepage: this.props.homepage,
        gitURL: this.props.gitURL,
        issuesUrl: this.props.issuesUrl
      }
    );
    this.fs.copyTpl(
      this.templatePath('_tsconfig.json'),
      this.destinationPath('tsconfig.json'), {
        name: this.props.name
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
    this.fs.copy(
      this.templatePath('LICENSE'),
      this.destinationPath('LICENSE', {
        name: this.props.name,
        description: this.props.description,
        author: this.props.author,
        email: this.props.email,
        homepage: this.props.homepage,
        gitURL: this.props.gitURL,
        issuesUrl: this.props.issuesUrl
      })
    );
    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('README.md', {
        name: this.props.name,
        description: this.props.description,
        author: this.props.author,
        email: this.props.email,
        homepage: this.props.homepage,
        gitURL: this.props.gitURL,
        issuesUrl: this.props.issuesUrl
      })
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


  },

  //Install Dependencies
  install: function () {

    this.installDependencies();

  }
});
