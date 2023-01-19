import store from '../store';

const routes_campaign = ["Details", "Mission", "Task", "Learning", "SocialShare", "Kpis", "Badges", "Awards", "Notification"];
const routes_onboarding = ["Details", "Task", "Learning", "Badges", "Awards", "Notification"];

function nextRoute(idCampaign, type, currentRoute) {
  let routes= [];
  if (type=="campaign") routes= routes_campaign;
  if (type=="onboarding") routes= routes_onboarding;
  if (routes.length == 0) return null;

  const index = routes.indexOf(currentRoute);
  if (index == -1) {
    return null;
  }
  if (index == routes.length - 1) {
    return null;
  }
  const subArray = routes.slice(index + 1);
  for (let i = 0; i < subArray.length; i++) {
    const state = getModuleState(subArray[i]);
    if (state) {
      return "/" + type + "/" + idCampaign + "/"+ subArray[i].toLowerCase();
    }
  }
  return null;
}

const getModuleState = (module) => {
  if (!Object.prototype.hasOwnProperty.call(store.getters.modules, module)) {
    return false;
  } else {
    return store.getters.modules[module];
  }
};

const toNextRoute = (self, module, id_param = null) => {
  const id = id_param || self.$route.params.campaignId;
  const type = self.$route.path.split("/")[1];
  if (hasNextRoute(self, module)) {
    self.$router.push(
      nextRoute(id, type, module)
    );
  }

};

const hasNextRoute = (self, module) => {
  const type = self.$route.path.split("/")[1];
  return nextRoute(0, type, module) ? true : false;
};

export { toNextRoute, hasNextRoute };