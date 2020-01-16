import Vue from "vue";
import VueRouter from "vue-router";
import BlankComp from "../components/layout/Blank.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/dashboard"
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/dashboard.vue")
  },
  {
    path: "/workspace",
    name: "Workspace",
    component: BlankComp,
    children: [
      {
        path: "product",
        name: "WorkspaceProduct",
        component: () => import("../views/workspace/product.vue")
      },
      {
        path: "rules",
        name: "WorkspaceRules",
        component: () => import("../views/workspace/rules.vue")
      }
    ]
  },
  {
    path: "/catalog",
    name: "catalog",
    component: BlankComp,
    children: [
      {
        path: "varible-wizard",
        name: "VaribleWizardCatalog",
        component: () => import("../views/catalog/variableWizard.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
