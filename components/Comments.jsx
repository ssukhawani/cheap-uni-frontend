import React, { useState, useEffect } from "react";

import moment from "moment";
import parse from "html-react-parser";
import { fetchBlogCommentsBySlug } from "../services";
import { comment } from "postcss";
import postStyles from "./post-styles.module.css";
import CommentForm from "./CommentForm";

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]);
  const [childComments, setChildComments] = useState({});
  const [commentsWithNoChild, setCommentsWithNoChild] = useState({});

  useEffect(() => {
    let obj = {};
    let noCommentObj = {};
    let parentNullComment = [];
    let notParentNullComment = [];

    fetchBlogCommentsBySlug(slug).then((result) => {
      setComments(result);
      result.filter((comment) => {
        if (!!comment.parent) {
          notParentNullComment.push(comment);
        } else {
          parentNullComment.push(comment);
        }
      });
      notParentNullComment.forEach((comment) => {
        if (comment.parent in obj) {
          obj[comment.parent].childData.push(comment);
        } else {
          obj[comment.parent] = { isVisible: false, childData: [comment] };
        }
      });
      setChildComments({ ...obj });
      parentNullComment.filter((comment) => {
        if (!obj[comment.id]) {
          noCommentObj[comment.id] = { isVisible: false };
        }
      });
      setCommentsWithNoChild(noCommentObj);
    });
  }, [slug]);

  const handelNewReplies = (parentCommentId, flag) => {
    childComments[parentCommentId].isVisible = flag;
    setChildComments({ ...childComments });
  };

  const handelNewCommentReply = (parentCommentId, flag) => {
    commentsWithNoChild[parentCommentId].isVisible = flag;
    setCommentsWithNoChild({ ...commentsWithNoChild });
  };
  // console.log(commentsWithNoChild, "commentsWithNoChild", childComments);
  return (
    <>
      {comment.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 mb-8 pb-12 text-sm sm:text-base">
          <h3 className="text-center text-sm sm:text-xl mb-4 sm:mb-8  font-semibold border-b border-blue-300 pb-4">
            {comments.length}
            {`${comments.length > 1 ? " Comments" : " Comment"}`}
          </h3>
          {comments.map((comment) => (
            <>
              {!comment.parent && (
                <div key={comment.created_on} className="mb-6 break-all">
                  <blockquote
                    before="\201C"
                    className={`otroBlockquote ${postStyles.otroBlockquote} ${
                      comment.role === "A" && "border-l-8 border-purple-700"
                    }`}
                  >
                    {parse(comment.body)}
                    <span>
                      - {comment.user} on{" "}
                      {moment(comment.created_on).format("MMM DD, YYYY")}
                    </span>
                  </blockquote>
                  {childComments && !childComments[comment.id]?.isVisible ? (
                    <>
                      {childComments[comment.id]?.childData.length ? (
                        <button
                          onClick={() => handelNewReplies(comment.id, true)}
                          className="text-blue-800 font-bold text-xs outline-none float-right"
                        >
                          View newer replies
                        </button>
                      ) : (
                        <>
                          {commentsWithNoChild &&
                          !commentsWithNoChild[comment.id]?.isVisible ? (
                            <button
                              onClick={() =>
                                handelNewCommentReply(comment.id, true)
                              }
                              className="text-blue-800 font-bold text-xs outline-none float-right"
                            >
                              Reply
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                handelNewCommentReply(comment.id, false)
                              }
                              className="text-blue-800 font-bold text-xs outline-none float-right"
                            >
                              Hide
                            </button>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => handelNewReplies(comment.id, false)}
                      className="text-blue-800 font-bold text-xs outline-none float-right"
                    >
                      Hide
                    </button>
                  )}
                  {childComments && childComments[comment.id]?.isVisible && (
                    <>
                      {childComments[comment.id].childData.map((child) => (
                        <>
                          <div
                            key={child.created_on}
                            className="my-4 ml-4 md:ml-10 break-all"
                          >
                            <blockquote
                              className={`otroBlockquote ${
                                postStyles.otroBlockquote
                              } ${
                                child.role === "A" &&
                                "border-l-8 border-purple-700"
                              }`}
                            >
                              {parse(child.body)}
                              <span>
                                - {child.user} on{" "}
                                {moment(child.created_on).format(
                                  "MMM DD, YYYY"
                                )}
                              </span>
                            </blockquote>
                          </div>
                        </>
                      ))}
                      <CommentForm
                        slug={slug}
                        parentComment={comment.id}
                        classOverRide={"ml-4 md:ml-10"}
                      />
                    </>
                  )}

                  {commentsWithNoChild &&
                    commentsWithNoChild[comment.id]?.isVisible && (
                      <>
                        <CommentForm slug={slug} parentComment={comment.id} />
                      </>
                    )}
                </div>
              )}
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
