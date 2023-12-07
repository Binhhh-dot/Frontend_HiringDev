import React from "react";
import Section from "../../Blog/Blog/Section";
import BlogContent from "../../Blog/Blog/BlogContent";

const Blog = () => {
  document.title = "Blog | WeHire - Job Listing Template | Themesdesign";

  return (
    <React.Fragment>
      <Section />
      <BlogContent />
    </React.Fragment>
  );
};

export default Blog;
