import PostStore from "./postStore";
import TagStore from "./tagStore";

const createStore = () => {
  return {
    tagStore: new TagStore(),
    postStore: new PostStore()
  };
};
export default createStore;
