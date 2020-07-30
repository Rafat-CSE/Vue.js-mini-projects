var home = {
  template: `
        <div class="main">
            <div class="foo">
                <h3>Home</h3>
                <p>This is Home.This is Home.This is Home.</p>
            </div>
        </div>
    `,
};
var about = {
  template: `
          <div class="main">
              <div class="foo">
                <h3>About</h3>
                <p>This is About.This is About.This is About.</p>
              </div>
          </div>
      `,
};
var contact = {
  template: `
          <div class="main">
              <div class="foo">
                <h3>Contact</h3>
                <p>This is Contact.This is Contact.This is Contact</p>
              </div>
          </div>
      `,
};

var routes = [
  { path: "/home", component: home },
  { path: "/about", component: about },
  { path: "/contact", component: contact },
];

var router = new VueRouter({
  routes: routes,
  mode: "history",
  base: "/VuejsRouter",
});

var app = new Vue({
  router: router,
}).$mount("#root");
