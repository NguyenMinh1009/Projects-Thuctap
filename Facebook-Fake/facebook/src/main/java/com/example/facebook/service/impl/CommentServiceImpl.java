package com.example.facebook.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.example.facebook.entity.Comment;
import com.example.facebook.entity.Posts;
import com.example.facebook.entity.User;
import com.example.facebook.model.comment.dto.CommentDTOCreate;
import com.example.facebook.model.comment.dto.CommentDTOFilter;
import com.example.facebook.model.comment.dto.CommentDTOResponse;
import com.example.facebook.model.comment.mapper.CommentMapper;
import com.example.facebook.repository.CommentRepository;
import com.example.facebook.repository.PostsRepository;
import com.example.facebook.repository.Custom.CommentCriteria;
import com.example.facebook.service.CommentService;
import com.example.facebook.service.UserService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final PostsRepository postsRepository;
    private final UserService userService;
    private final CommentCriteria commentCriteria;

    @Override
    public Map<String, CommentDTOResponse> createComment(Map<String, CommentDTOCreate> commentDTOCreateMap,
            Integer postsId) {

        CommentDTOCreate commentDTOCreate = commentDTOCreateMap.get("comment");

        Comment comment = CommentMapper.toComment(commentDTOCreate);
        User currentUser = userService.getUserLoggedIn();
        Posts posts = postsRepository.findById(postsId).get();

        comment.setUser(currentUser);
        comment.setPosts(posts);

        comment = commentRepository.save(comment);
        Map<String, CommentDTOResponse> wrapper = new HashMap<>();
        CommentDTOResponse commentDTOResponse = CommentMapper.toCommentDTOResponse(comment, false, 0);
        wrapper.put("comment", commentDTOResponse);
        return wrapper;
    }

    @Override
    public Map<String, Object> getListCommentPagingSortingByPostId(CommentDTOFilter filter) {
        Map<String, Object> results = commentCriteria.findAll(filter);
        int countComment = commentCriteria.getCountCommentInPostId(filter);

        List<Comment> listCommentPagingSortingByPostId = (List<Comment>) results.get("listComment");
        List<CommentDTOResponse> listCommentDTOResponses = new ArrayList<>();
        boolean isFollowing = false;

        try {
            User currentUser = userService.getUserLoggedIn();

            // Xu ly follow
            for (Comment c : listCommentPagingSortingByPostId) {
                isFollowing = false;
                User author = c.getUser();
                Set<User> followers = author.getFollowers();
                for (User u : followers) {
                    if (u.getId() == currentUser.getId()) {
                        isFollowing = true;
                        break;
                    }
                }

                if (currentUser.getId() == c.getUser().getId()) {
                    isFollowing = true;
                }

                // xu ly comment child
                int countCommentChild = commentCriteria.getCountCommentChildInPostId(c.getPosts().getId(), c.getId());
                if (countCommentChild != 0) {
                    listCommentDTOResponses.add(CommentMapper.toCommentDTOResponse(c, isFollowing, countCommentChild));
                }else{
                    listCommentDTOResponses.add(CommentMapper.toCommentDTOResponse(c, isFollowing, 0));
                }

            }
        } catch (Exception e) {
            for (Comment c : listCommentPagingSortingByPostId) {
                int countCommentChild = commentCriteria.getCountCommentChildInPostId(c.getPosts().getId(), c.getId());
                if (countCommentChild != 0) {
                    listCommentDTOResponses.add(CommentMapper.toCommentDTOResponse(c, isFollowing, countCommentChild));
                }else{
                    listCommentDTOResponses.add(CommentMapper.toCommentDTOResponse(c, isFollowing, 0));
                }
            }
        }
        Map<String, Object> wrapper = new HashMap<>();
        wrapper.put("postId", filter.getPostsId());
        wrapper.put("comments", listCommentDTOResponses);
        wrapper.put("commentsCount", countComment);

        return wrapper;
    }

}
