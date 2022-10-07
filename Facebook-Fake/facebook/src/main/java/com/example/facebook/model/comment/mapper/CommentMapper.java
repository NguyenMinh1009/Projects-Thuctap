package com.example.facebook.model.comment.mapper;

import java.time.LocalDateTime;

import com.example.facebook.entity.Comment;
import com.example.facebook.entity.User;
import com.example.facebook.model.comment.dto.AuthorCmtDTOResponse;
import com.example.facebook.model.comment.dto.CommentDTOCreate;
import com.example.facebook.model.comment.dto.CommentDTOResponse;

public class CommentMapper {

    public static CommentDTOResponse toCommentDTOResponse(Comment comment, boolean isFollowing, int countCommentChild) {
        return CommentDTOResponse.builder().commentId(comment.getId()).date(comment.getDate()).content(comment.getContent())
        .authorCmt(toAuthorCmtDTOResponse(comment.getUser(), isFollowing)).countCommentChild(countCommentChild).build();
    }

    private static AuthorCmtDTOResponse toAuthorCmtDTOResponse(User author, boolean isFollowing) {
        return AuthorCmtDTOResponse.builder().id(author.getId()).username(author.getUsername()).following(isFollowing).build();
    }

    public static Comment toComment(CommentDTOCreate commentDTOCreate) {
        LocalDateTime timeCurrent = LocalDateTime.now();
       
        Comment comment = Comment.builder().content(commentDTOCreate.getContent()).date(timeCurrent).parent_comment_id((commentDTOCreate.getParent_comment_id())).build();
        return comment;

    }
    
 }
