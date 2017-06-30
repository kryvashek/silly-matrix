# silly-matrix #
Simple module for matrix calculations.

## Version ##
Current module version is 1.0.0, and development assumed finished. The version will not change if there are no bug reports.

## License ##
**silly-matrix** is licensed under BSD 3-clause "Revised" License. See [license](./LICENSE) for details.

## Usage ##
### Install ###
Just run command `npm install silly-matrix` to have this module installed for your project. See usage of **npm** tool for details.

### Dependencies ###
Current version of **silly-matrix** has no dependencies.

### Test ###
To test module just run command `nodejs ./test.js` from the folder where module is placed. Long output should appear with arrays, matrices and results of operations under them. Anyone can recalculate these results to check them.

### Run ###
To use **silly-matrix** one should specify vectors and matrices and call appropriate routines from the module. To solve a linear equation some data structures should be specified:

* **A** - matrix of coefficients for unknown variables,
* **b** - vector of the free values (simple array).

Then `solveEquation` routine should be called from the module:

	require('silly-matrix').solveEquation( A, b );

Detailed working example of different routines usage can be found in [test.js](./test.js).

### API ###
Full list of available functions one can find in the [API description](./API.md).