var projectHooks;
if (process.env.PROJECTRUNPATH) {
  projectHooks = require(process.env.PROJECTRUNPATH + '/project/support/hooks.js');  
} else {
  projectHooks = null;
}
exports.hooks = {
  beforeFeature: function (uri, feature, scenarios) {
    if (projectHooks) projectHooks.BeforeFeature(feature);
  },

  beforeScenario: function (uri, feature, scenario, sourceLocation) {
    if (projectHooks) projectHooks.BeforeScenario(scenario);
  },

  beforeStep: function ({uri, feature, step}, context) {
    if (projectHooks) projectHooks.BeforeStep(step.step);
  },

  afterStep: function ({uri, feature, step}, context, {error, result, duration, passed}) {
    if (projectHooks) projectHooks.AfterStep(step.step, passed);
  },

  afterScenario: function (uri, feature, scenario, result, sourceLocation) {
    if (projectHooks) projectHooks.AfterScenario(scenario, result);
  },

  afterFeature: function (uri, feature, scenarios) {
    if (projectHooks) projectHooks.AfterFeature(feature);
  }
}