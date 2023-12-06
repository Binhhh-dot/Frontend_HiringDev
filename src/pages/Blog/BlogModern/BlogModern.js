import React from "react";
import Section from "../../Blog/BlogModern/Section";
import BlogModernContent from "../../Blog/BlogModern/BlogModernContent";

const BlogModern = () => {
  document.title = "Blog Modern | WeHire - Job Listing Template | Themesdesign";
  return (
    <React.Fragment>
      <Section />
      <BlogModernContent />
    </React.Fragment>
  );
};

export default BlogModern;
