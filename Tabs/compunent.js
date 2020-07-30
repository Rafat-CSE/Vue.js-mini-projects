var Event = new Vue();
Vue.component("tabs", {
  template: `
    <div class="tab">
        <div class="tab-header">
        <ul>
            <li v-for="tab in tabs" :class="{'active' : tab.selectedNow}" @click="makeEvent(tab.name)">
                {{ tab.name }}
            </li>
        </ul>
        </div>
        <div class="tab-body">
          <div class="content">
            <slot></slot>
          </div>
        </div>
    </div>
    `,

  data: function () {
    return {
      tabs: [],
    };
  },
  methods: {
    makeEvent: function (s) {
      Event.$emit("newTab", s);
    },
  },
  created: function () {
    this.tabs = this.$children;
  },
});

Vue.component("tab", {
  template: `
    <div v-if="selectedNow">
      <slot></slot>
    </div>
    `,

  data: function () {
    return {
      selectedNow: false,
    };
  },

  created: function () {
    var $currentTab = this;
    $currentTab.selectedNow = $currentTab.selected;

    Event.$on("newTab", function (s) {
      if (s == $currentTab.name) {
        $currentTab.selectedNow = true;
      } else {
        $currentTab.selectedNow = false;
      }
    });
  },

  props: ["name", "selected"],
});
