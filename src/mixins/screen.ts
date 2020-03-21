import Vue from 'vue'
import { Component, Watch } from "vue-property-decorator";
import { Action } from 'vuex-class';

let count = 0;
@Component({
  beforeRouteEnter: beforeRouteEnter
})
export default class ScreenMixin extends Vue {
  @Action('cleanAlertMessage') cleanAlertMessage!: () => void
  @Action("showLoading") showLoading!: () => void;
  @Action("hideLoading") hideLoading!: () => void;

  protected beforeOfCreated: (() => Promise<any>) | undefined;
  protected afterOfCreated: (() => Promise<any>) | undefined;
  protected beforeOfBeforeMount: (() => Promise<any>) | undefined;
  protected afterOfBeforeMount: (() => Promise<any>) | undefined;
  protected beforeOfMounted: (() => Promise<any>) | undefined;
  protected afterOfMounted: (() => Promise<any>) | undefined;
  protected beforeOfDestroyed: (() => Promise<any>) | undefined;
  protected afterOfDestroyed: (() => Promise<any>) | undefined;

  private lifecycleHooksAsync: Promise<any>;
  private lifecycleHooksAsyncRun: Promise<any>;

  constructor() {
    super();
    this.lifecycleHooksAsync = new Promise((resolve, reject) => {
      resolve();
    });
    this.lifecycleHooksAsyncRun = this.lifecycleHooksAsync;
  }

  async created() {
    const self = this;
    self.lifecycleHooksAsyncRun = self.lifecycleHooksAsyncRun.then(function () {
      if (self.beforeOfCreated) {
        return self.beforeOfCreated();
      }
    }).then(function () {
      self.showLoading();
    }).then(function () {
      if (self.afterOfCreated) {
        return self.afterOfCreated();
      }
    });
  }

  async beforeMount() {
    const self = this;
    self.lifecycleHooksAsyncRun = self.lifecycleHooksAsyncRun.then(function () {
      if (self.beforeOfBeforeMount) {
        return self.beforeOfBeforeMount();
      }
    }).then(function () {
      // do nothing
    }).then(function () {
      if (self.afterOfBeforeMount) {
        return self.afterOfBeforeMount();
      }
    });
  }

  async mounted() {
    const self = this;
    self.lifecycleHooksAsyncRun = self.lifecycleHooksAsyncRun.then(function () {
      if (self.beforeOfMounted) {
        return self.beforeOfMounted();
      }
    }).then(function () {
      self.cleanAlertMessage();
      self.hideLoading();
    }).then(function () {
      if (self.afterOfMounted) {
        return self.afterOfMounted();
      }
    });
  }
  // beforeUpdate
  // updated
  // activated
  // deactivated
  // beforeDestroy
  async destroyed() {
    const self = this;
    self.lifecycleHooksAsyncRun = self.lifecycleHooksAsyncRun.then(function () {
      if (self.beforeOfDestroyed) {
        return self.beforeOfDestroyed();
      }
    }).then(function () {
      // do nothing
    }).then(function () {
      if (self.afterOfDestroyed) {
        return self.afterOfDestroyed();
      }
    });
  }
}

function beforeRouteEnter(to: any, from: any, next: any) {
  next(true);
}