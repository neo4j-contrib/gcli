/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

define(function(require, exports, module) {

  var canon = require('gcli/canon');
  var gcli = require('gcli/index');
  var util = require('gcli/util');
  var display = require('gcli/ui/display');

  var datatableHtml = require('text!neo4j/commands/datatable.html');
  /**
   * Registration and de-registration.
   */
  exports.startup = function() {
    gcli.addCommand(datatableCommandSpec);
  };

  exports.shutdown = function() {
    gcli.removeCommand(datatableCommandSpec);
  };

  /**
   * 'create' command.
   */
  var datatableCommandSpec = {
    name: 'datatable',
    returnType: 'html',
    description: 'Create a datatable',
    exec: function(args, context) {
      // return cypher.query("CREATE " + args.spec, context);
     //  return context.createView({
     //   html: '<div save="${myroot}" id="table"/><div>${activate()}</div>',
     //   options: { allowEval: true },
     //   data: {
     //     activate: function() {
     //        this.myroot.innerHTML = 'hello';
     //        console.log($('#table').val());
     //        $('#table').dataTable();
     //      }
     //   }
     // });
      return context.createView({
   html: '<div onDOMNodeRemoved="${customLoad}"/>',
   data: {
     customLoad: function() {
       $(this.myroot).text = 'hello2';
     }
   }
 });
    }
  };
});
