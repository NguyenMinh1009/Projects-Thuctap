package com.example.facebook.service;

import java.util.Map;

import com.example.facebook.model.comment.dto.CommentDTOCreate;
import com.example.facebook.model.comment.dto.CommentDTOFilter;
import com.example.facebook.model.comment.dto.CommentDTOResponse;

public interface CommentService {

    public Map<String, CommentDTOResponse> createComment(Map<String, CommentDTOCreate> commentDTOCreateMap,
            Integer postsId);

    //public Map<String, Object> getListComment(CommentDTOFilter filter);

    public Map<String, Object> getListCommentPagingSortingByPostId(CommentDTOFilter filter);

}
