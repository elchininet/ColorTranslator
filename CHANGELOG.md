# Changelog

## 2019-08-31

#### Fixes

- Resolve eslint-utils vulnerability forcing the version to be equal or greater than 1.4.1 

## 2019-07-17

#### Changes

- Use SCSS files for the styles of the demo page
- Created mobile styles for better rendering of the demo page in mobile devices

## [1.1.0] - 2019-07-12

#### Addings

- Added the possibility to instantiate the class using any of the inputs
- Added 11 public chainable methods and 25 public readonly properties

#### Changes

- Updated some demo examples to use the new class, methods, and properties
- Changed the CSS CMYK output from `device-cmyk` to `cmyk`

#### Fixes

- Solved a bug with webpack and the clean-webpack-plugin package
- Fixed a bug with RGBA and HSLA CSS output

## [1.0.5] - 2019-07-05

#### Addings

- Created a script to run eslint on source files

#### Changes

- Renamed the library to ColorTranslator
- Renamed the distribution files
- Converted the main object to a class with static methods. This will allow to instantiate the class in the future

#### Deletings

- Removed CMYK colors from the test because they are not used

#### Fixes

- Fixed some bugs and formatting issues

## [1.0.4] - 2019-07-03

#### Addings

- Made it compatible with node
- Created unit tests
- Created a demo page

#### Changes

- Renamed the library to colortranslator
- Rewriten the library in TypeScript

#### Fixes

- Fixed some bugs

## [1.0.0] - 2015-05-01

- Created ColorConverter
