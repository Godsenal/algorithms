import { observable, action, runInAction } from "mobx";
import * as tagApi from "../api/tag";
import { ITag } from "../models/tag";

class TagStore {
  @observable tags: ITag[] = [];
  @observable fetchState: State = "INIT";

  @action
  async fetchAllTags() {
    this.tags = [];
    this.fetchState = "FETCHING";
    try {
      const {
        data: { payload }
      } = await tagApi.getTags();
      runInAction(() => {
        this.tags = payload;
        this.fetchState = "SUCCESS";
      });
    } catch (err) {
      runInAction(() => {
        this.fetchState = "FAILURE";
      });
    }
  }
}

export default TagStore;
