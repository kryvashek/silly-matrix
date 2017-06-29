matrixTests = {
    tests: {
        checkCopyArray: function(api) {
            var ar = [1,2,3,5,7,9],
                bar = api.arrayCopy( ar );

            console.log( 'ar and bar are both\n', ar );
            ar[3] = 128;
            console.log( 'updated ar is \n', ar );
            console.log( 'bar is\n', bar );
        },

        checkExcludeArray: function(api) {
            var ar = [1,2,3,5,7,9];

            console.log( 'array is \n', ar );
            ar = api.arrayExclude( ar, 3 );
            ar = api.arrayExclude( ar, 3 );
            console.log( 'new ar is \n', ar );
        },

        checkCopyMatrix: function(api) {
            var A = [[1,2,4],[1,3,9]],
                B = api.matrixCopy( A );

            console.log( 'A and B are both\n', A );
            A[0][2] = 256;
            console.log( 'updated A is\n', A );
            console.log( 'B is\n', B );
        },

        checkExcludeMatrix: function(api) {
            var A = [[1,2,4],[1,3,9],[4,2,19]];

            console.log( 'A is\n', A );
            console.log( 'A without center row and column is\n', api.matrixExcludeRowCol( A, 1, 1 ) );
        },

        checkAdjugate: function(api) {
            var A = [[1,2,4],[1,3,9],[4,2,19]];

            console.log( 'A is\n', A );
            console.log( 'A\'s adjugate is\n', api.adjugate( A ) );
        },

        checkInverse: function(api) {
            var A = [[1,2,4],[1,3,9],[4,2,6]];

            console.log( 'A is\n', A );
            console.log( 'inversed A is\n', api.inverse( A ) );
        },

        checkTranspose: function(api) {
            var A = [[1,2,4],[1,3,9]],
                B = [[1,2],[1,3],[4,2]];

            console.log( 'A is\n', A );
            console.log( 'transposed A is\n', api.transpose( A ) );
            console.log( 'B is\n', B );
            console.log( 'transposed B is\n', api.transpose( B ) );
        },

        checkFromMatrixColumn: function(api) {
            var A = [[1,2,4],[1,3,9]],
                B = [[1,2],[1,3],[4,2]];

            console.log( 'A is\n', A );
            console.log( 'A[:][1] is\n', api.fromMatrixColumn(A,1) );
        },

        checkDeterminant: function(api) {
            var A = [[1,2,4],[1,3,9],[4,2,6]];

            console.log( 'A is\n', A );
            console.log( 'determinant A is\n', api.determinant( A ) );
        },

        checkProduce: function(api) {
            var A = [[1,2,4],[1,3,9]],
                B = [[1,2],[1,3],[4,2]],
                ar = [1,2,3];
            
            console.log( 'A is\n', A );
            console.log( 'B is\n', B );
            console.log( 'ar is\n', ar );
            console.log( 'AB is\n', api.produce( A, B ) );
            console.log( 'A*ar is\n', api.produce( A, api.matrixFromArrayColumn(ar) ) );
            console.log( 'ar*B is\n', api.produce( api.matrixFromArrayRow(ar), B ) );
        }
    },

    checkAll: function(api) {
        for(var i in this.tests) {
            console.log( 'Trying', i );
            this.tests[i](api);
            console.log( '\n' );
        }
    }
};

matrixTests.checkAll( require('./index.js') );