/*
 * Copyright 2012, Mozilla Foundation and contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define(function(require, exports, module) {

var test = require('test/assert');


exports.testWorking = function() {
  // There are lots of requirement tests that we could be doing here
  // The fact that we can get anything at all working is a testament to
  // require doing what it should - we don't need to test the
  var requireable = require('gclitest/requirable');
  test.is('thing1', requireable.thing1);
  test.is(2, requireable.thing2);
  test.ok(requireable.thing3 === undefined);
};

exports.testDomains = function(options) {
  var requireable = require('gclitest/requirable');
  test.ok(requireable.status === undefined);
  requireable.setStatus(null);
  test.is(null, requireable.getStatus());
  test.ok(requireable.status === undefined);
  requireable.setStatus('42');
  test.is('42', requireable.getStatus());
  test.ok(requireable.status === undefined);

  if (options.isUnamdized) {
    test.log('Running unamdized, Reduced tests');
    return;
  }

  if (define.Domain) {
    var domain = new define.Domain();
    var requireable2 = domain.require('gclitest/requirable');
    test.is(undefined, requireable2.status);
    test.is('initial', requireable2.getStatus());
    requireable2.setStatus(999);
    test.is(999, requireable2.getStatus());
    test.is(undefined, requireable2.status);

    test.is('42', requireable.getStatus());
    test.is(undefined, requireable.status);
  }
};

exports.testLeakage = function() {
  var requireable = require('gclitest/requirable');
  test.ok(requireable.setup === undefined);
  test.ok(requireable.shutdown === undefined);
  test.ok(requireable.testWorking === undefined);
};

exports.testMultiImport = function() {
  var r1 = require('gclitest/requirable');
  var r2 = require('gclitest/requirable');
  test.is(r1, r2);
};

exports.testUncompilable = function() {
  // This test is commented out because it breaks the RequireJS module
  // loader and because it causes console output and because testing failure
  // cases such as this is something of a luxury
  // It's not totally clear how a module loader should perform with unusable
  // modules, however at least it should go into a flat spin ...
  // GCLI mini_require reports an error as it should
  /*
  if (define.Domain) {
    try {
      var unrequireable = require('gclitest/unrequirable');
      t.fail();
    }
    catch (ex) {
      console.error(ex);
    }
  }
  */
};

exports.testRecursive = function() {
  // See Bug 658583
  /*
  var recurse = require('gclitest/recurse');
  */
};


});
