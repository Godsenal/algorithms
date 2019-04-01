import { observable, action, runInAction } from "mobx";
import { ITag } from "../models/tag";

const fakeFetching = () => new Promise(res => setTimeout(res, 2000));
class TagStore {
  @observable tags: ITag[] = [];
  @observable fetchState: State = "INIT";

  @action
  async fetchAllTags() {
    this.tags = [];
    this.fetchState = "FETCHING";
    try {
      await fakeFetching();
      runInAction(() => {
        this.fetchState = "SUCCESS";
        this.tags = [...Array(5)].map((_, i) => ({
          _id: i.toString(10),
          name: `tag${i}`
        }));
      });
    } catch (err) {
      runInAction(() => {
        this.fetchState = "FAILURE";
      });
    }
  }
}

export default TagStore;
