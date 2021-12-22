# Changelog

## [1.9.2] - 2021-12-22

- Removed comments from the bundle

## [1.9.1] - 2021-12-09

- Updated the Travis URL in the README

## [1.9.0] - 2021-12-06

- Added support for color keywords

## [1.8.0] - 2021-10-27

- Created a EMS version of the package allowing backward compatibility for CJS
- Replaced webpack by rollup to build the packages

## [1.7.1] - 2021-04-27

- Small improvements to the additive color mix feature

## [1.7.0] - 2021-04-05

- Implemented two static methods to get shades and tints of a color

## [1.6.1] - 2021-04-05

- Fix a bug that was returning HEXA values without alpha if the alpha value was 0

## [1.6.0] - 2021-04-03

- Support for subtractive color harmonies generation

## [1.5.2] - 2021-04-02

- Fix the RGB harmonies

## [1.5.1] - 2021-03-23

- Fix final alpha value of color mixes with alpha

## [1.5.0] - 2021-03-23

- Support for subtractive mixing of colors

## [1.4.0] - 2021-03-22

- Implemented static methods to mix colors in additive mode
    * getMixHEX
    * getMixHEXA
    * getMixRGB
    * getMixRGBA
    * getMixHSL
    * getMixHSLA

## [1.3.6] - 2021-03-20

- Fix a bug in the getHarmony method when the input is a hex object without alpha
- Refactor the code to remove unused lines
- Improved the test coverage

## [1.3.5] - 2020-12-17

- Updated packages, solved vulnerabilities

## [1.3.4] - 2020-05-17

- Improve the definition types of the method getHarmony
- Fix a bug in the getHarmony method that was returning RGBObject colors when a HEXObject color was provided

## [1.3.2 - 1.3.3] - 2020-05-16

- Fix type definitions bugs
- Increase coverage with more tests

## [1.3.1] - 2020-03-09

- Fix a bug to normalize the hue of HSL colors for negative values
- Normalize the hue of the HSL inputs
- Round the values of the blends

## [1.3.0] - 2020-02-22

- Created a new static method to build color harmonies

## [1.2.1] - 2020-02-22

- Renamed the blend static methods to make them more descriptive

## [1.2.0] - 2020-02-19

#### Addings

- Added static methods to return an array of blends between two colors

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
