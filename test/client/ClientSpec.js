var expect = require('chai').expect;

// gamejs > module.exports = testVar;
var testVar = require('../../public/src/game.js');

describe('client tests', function() {
  it('should pass a sanity test', function() {
    expect(true).to.be.true;
  });

  it ('should find defined variables inside client files', function () {
    expect(testVar).to.equal('client var');
  });
});
