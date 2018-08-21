export default class Store {
  constructor({ state = {}, actions = {} }) {
    this.actions = actions;
    this.state = state;
    this.subscribers = [];
  }

  /**
   * Subscribe to the store to listen for when changes occur
   * @param {Function} callback
   */
  subscribe(callback) {
    this.subscribers.push(callback);

    return () => {
      this.subscribers.splice(this.subscribers.indexOf(callback), 1);
    };
  }

  /**
   * Notify all subscribers of changes
   */
  notifySubscribers() {
    const { subscribers } = this;

    for (const subscriber of subscribers) {
      subscriber(this.state, this);
    }
  }

  /**
   * registerActions after creation of the store
   * @param {Object} actions - New actions to register into the store
   * @param {Boolean} override - Flag to indicate you would like to override existing actions
   */
  registerActions(actions, override = false) {
    const currentActionKeys = Object.keys(this.actions);
    const newActionKeys = Object.keys(actions);

    if (override === false) {
      for (const actionType of newActionKeys) {
        if (currentActionKeys.includes(actionType)) {
          throw new Error(
            `Action handler ${actionType} already exists and the override flag is not set. If you intent to overwrite current action handlers set the override flag to true`,
          );
        }
      }
    }

    this.actions = { ...actions, ...this.actions };
  }

  /**
   * Dispatch function provided in order to allow state changes to occur
   * @param {string} actionType - Type of action to be dispatched
   * @param {any} data - Data to be passed to the action handler
   */
  dispatch(actionType, data) {
    const action = this.actions[actionType];

    if (!action) return;
    action(this.state, data, this);
    this.notifySubscribers();
  }
}
