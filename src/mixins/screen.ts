import Vue from 'vue'
import { Component, Watch } from "vue-property-decorator";
import { Action } from 'vuex-class';

@Component({
  beforeRouteEnter: beforeRouteEnter
})
export default class ScreenMixin extends Vue {
  @Action('cleanAlertMessage') cleanAlertMessage!: () => void
  @Action("showLoading") showLoading!: () => void;
  @Action("hideLoading") hideLoading!: () => void;

  protected beforeOfCreated: (() => Promise<any>) | Array<(() => Promise<any>)> | undefined;
  protected afterOfCreated: (() => Promise<any>) | Array<(() => Promise<any>)> | undefined;
  protected beforeOfBeforeMount: (() => Promise<any>) | Array<(() => Promise<any>)> | undefined;
  protected afterOfBeforeMount: (() => Promise<any>) | Array<(() => Promise<any>)> | undefined;
  protected beforeOfMounted: (() => Promise<any>) | Array<(() => Promise<any>)> | undefined;
  protected afterOfMounted: (() => Promise<any>) | Array<(() => Promise<any>)> | undefined;
  protected beforeOfDestroyed: (() => Promise<any>) | Array<(() => Promise<any>)> | undefined;
  protected afterOfDestroyed: (() => Promise<any>) | Array<(() => Promise<any>)> | undefined;

  private lifecycleHooksAsync: Promise<any>;
  private lifecycleHooksAsyncRun: Promise<any>;

  constructor() {
    super();
    this.lifecycleHooksAsync = new Promise((resolve) => {
      resolve();
    });
    this.lifecycleHooksAsyncRun = this.lifecycleHooksAsync;
  }

  async created() {
    const self = this;
    self.lifecycleHooksAsyncRun = self.lifecycleHooksAsyncRun.then(function () {
      if (self.beforeOfCreated instanceof Function) {
        return self.beforeOfCreated();
      } else if (self.beforeOfCreated instanceof Array) {
        return Promise.all(self.beforeOfCreated);
      }
    }).then(function () {
      self.showLoading();
    }).then(function () {
      if (self.afterOfCreated instanceof Function) {
        return self.afterOfCreated();
      } else if (self.afterOfCreated instanceof Array) {
        return Promise.all(self.afterOfCreated);
      }
    });
  }

  async beforeMount() {
    const self = this;
    self.lifecycleHooksAsyncRun = self.lifecycleHooksAsyncRun.then(function () {
      if (self.beforeOfBeforeMount instanceof Function) {
        return self.beforeOfBeforeMount();
      } else if (self.beforeOfBeforeMount instanceof Array) {
        return Promise.all(self.beforeOfBeforeMount);
      }
    }).then(function () {
      // do nothing
    }).then(function () {
      if (self.afterOfBeforeMount instanceof Function) {
        return self.afterOfBeforeMount();
      } else if (self.afterOfBeforeMount instanceof Array) {
        return Promise.all(self.afterOfBeforeMount);
      }
    });
  }

  async mounted() {
    const self = this;
    self.lifecycleHooksAsyncRun = self.lifecycleHooksAsyncRun.then(function () {
      if (self.beforeOfMounted instanceof Function) {
        return self.beforeOfMounted();
      } else if (self.beforeOfMounted instanceof Array) {
        return Promise.all(self.beforeOfMounted);
      }
    }).then(function () {
      self.cleanAlertMessage();
      self.hideLoading();
    }).then(function () {
      if (self.afterOfMounted instanceof Function) {
        return self.afterOfMounted();
      } else if (self.afterOfMounted instanceof Array) {
        return Promise.all(self.afterOfMounted);
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
      if (self.beforeOfDestroyed instanceof Function) {
        return self.beforeOfDestroyed();
      } else if (self.beforeOfDestroyed instanceof Array) {
        return Promise.all(self.beforeOfDestroyed);
      }
    }).then(function () {
      // do nothing
    }).then(function () {
      if (self.afterOfDestroyed instanceof Function) {
        return self.afterOfDestroyed();
      } else if (self.afterOfDestroyed instanceof Array) {
        return Promise.all(self.afterOfDestroyed);
      }
    });
  }
}

function beforeRouteEnter(to: any, from: any, next: any) {
  next(true);
}