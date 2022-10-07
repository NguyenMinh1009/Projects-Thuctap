package com.example.facebook.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.facebook.model.comment.dto.CommentDTOCreate;
import com.example.facebook.model.comment.dto.CommentDTOFilter;
import com.example.facebook.model.comment.dto.CommentDTOResponse;
import com.example.facebook.service.CommentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/{postsId}/comment")
    public Map<String, CommentDTOResponse> createComment(@RequestBody Map<String, CommentDTOCreate> commentDTOCreateMap,
            @PathVariable Integer postsId) {
        return commentService.createComment(commentDTOCreateMap, postsId);
    }

    @GetMapping("/{postsId}/comments")
    public Map<String, Object> getListCommentPaging(@PathVariable Integer postsId,
            @RequestParam(name = "limit", defaultValue = "3") Integer limit,
            @RequestParam(name = "offset", defaultValue = "0") Integer offset,
            @RequestParam(name = "parent", defaultValue = "0") Integer parent_comment_id) {

        CommentDTOFilter filter = CommentDTOFilter.builder().postsId(postsId).limit(limit)
                .offset(offset).parent_comment_id(parent_comment_id).build();
        return commentService.getListCommentPagingSortingByPostId(filter);
    }

}
