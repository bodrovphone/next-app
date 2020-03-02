const Blog = require("../models/blog");

exports.createBlog = (req, res) => {
  const blogData = req.body;
  // const userId = req.user.sub;
  const blog = new Blog(blogData);

  if (req.user) {
    blog.userId = req.user.sub;
    blog.author = req.user.name;
  }
  blog.save((err, createdBlog) => {
    if (err) {
      return res.status(422).send(err);
    }
    return res.json(createdBlog);
  });
};

// exports.getBlogs = (req, res) => {
//   Blog.find({})
//     .sort({ startDate: 1 })
//     .exec((err, allBlogs) => {
//       if (err) {
//         return res.status(422).send(err);
//       }
//       return res.json(allBlogs);
//     });
// };

// exports.getBlogById = (req, res) => {
//   const BlogId = req.params.id;

//   Blog.findById(BlogId)
//     .select("-__v")
//     .exec((error, foundBlog) => {
//       if (error) {
//         return res.status(422).send(error);
//       }
//       return res.json(foundBlog);
//     });
// };

// exports.updateBlog = (req, res) => {
//   const blogId = req.params.id;
//   const blogData = req.body;

//   Blog.findById(blogId, (err, foundBlog) => {
//     if (err) {
//       return res.status(422).send(err);
//     }

//     foundBlog.set(BlogData);
//     foundBlog.save((err, savedBlog) => {
//       if (err) {
//         return res.status(422).send(err);
//       }

//       return res.json(savedBlog);
//     });
//   });
// };
// exports.deleteBlog = (req, res) => {
//   const blogId = req.params.id;
//   console.log(blogId);

//   Blog.deleteOne({ _id: blogoId }, err => {
//     if (err) {
//       return res.status(422).send(err);
//     }

//     return res.json({ status: "DELETED" });
//   });
// };
