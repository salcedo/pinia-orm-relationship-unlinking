import { Model } from "pinia-orm";

export class User extends Model {
  static fields() {
    return {
      id: this.uid(),
      username: this.string(""),
    };
  }
}
User.entity = "users";

export class Post extends Model {
  static fields() {
    return {
      id: this.uid(),
      userId: this.attr(null),
      user: this.belongsTo(User, "userId"),
      body: this.string(""),
      comments: this.hasMany(Comment, "postId"),
    };
  }
}
Post.entity = "posts";

export class Comment extends Model {
  static fields() {
    return {
      id: this.uid(),
      userId: this.attr(null),
      user: this.belongsTo(User, "userId"),
      postId: this.attr(null),
      post: this.belongsTo(Post, "postId"),
    };
  }
}
Comment.entity = "comments";
