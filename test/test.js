var assert = require( 'assert' );
var rollup = require( 'rollup' );
var md = require( '../dist/rollup-plugin-md.js' );
var npm = require( 'rollup-plugin-node-resolve' );

require( 'source-map-support' ).install();

process.chdir( __dirname );

function executeBundle ( bundle ) {
    var generated = bundle.generate();
    var code = generated.code;

    var fn = new Function( 'assert', code );
    fn( assert );
}

describe( 'rollup-plugin-md', function () {
    it( 'converts md', function () {
        return rollup.rollup({
            entry: 'samples/main.js',
            plugins: [ md({
                marked: {
                      gfm: true,
                      tables: true,
                      breaks: false,
                      pedantic: false,
                      sanitize: true,
                      smartLists: true,
                      smartypants: false
                }
            }) ]
        }).then( executeBundle );
    });
});
