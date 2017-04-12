# silly-matrix #
Simple module for (some) matrix calculations.

## Version ##
Current module version is 0.9.0.

## License ##
**silly-matrix** is licensed under BSD 3-clause "Revised" License. See [license](./LICENSE) for details.

## Usage ##
### Install ###
Just run command `npm install silly-matrix` to have this module installed for your project. See usage of **npm** tool for details.

### Dependencies ###
Current version of **silly-matrix** has no dependencies.

### Run ###
To use **silly-matrix** one should specify vectors and matrices and call appropriate routines from the module. To solve an equation some data structures should be specified:

	* **A** - matrix of coefficients for unknown veriables,
	* **b** - vector of the free values.

Then `solveEquation` routine should be called from the module:

	require('silly-matrix').solveEquation( A, b );
