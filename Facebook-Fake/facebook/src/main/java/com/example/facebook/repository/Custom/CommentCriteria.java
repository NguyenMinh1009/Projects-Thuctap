package com.example.facebook.repository.Custom;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import com.example.facebook.entity.Comment;
import com.example.facebook.model.comment.dto.CommentDTOFilter;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class CommentCriteria {
    private final EntityManager em;

    public Map<String, Object> findAll(CommentDTOFilter filter) {
        int parentId = filter.getParent_comment_id();
        int postsId = filter.getPostsId();
        StringBuilder query = new StringBuilder(
                "SELECT c FROM Comment c WHERE c.posts = " + postsId + " and c.parent_comment_id = "
                        + parentId + " ORDER BY c.id DESC");

        Map<String, Object> params = new HashMap<>();

        TypedQuery<Comment> tQuery = em.createQuery(query.toString(), Comment.class);

        params.forEach((k, v) -> {
            tQuery.setParameter(k, v);
        });

        tQuery.setFirstResult(filter.getOffset());
        tQuery.setMaxResults(filter.getLimit());
        List<Comment> listComment = tQuery.getResultList();
        Map<String, Object> result = new HashMap<>();
        result.put("listComment", listComment);

        return result;

    }

    // public Map<String, Object> findAllChild(CommentDTOFilter filter) {

    // int postsId = filter.getPostsId();
    // StringBuilder query = new StringBuilder(
    // "SELECT c FROM Comment c WHERE c.posts = " + postsId + " and
    // c.parent_comment_id = "
    // + filter.getParent_comment_id() + " ORDER BY c.id DESC");

    // Map<String, Object> params = new HashMap<>();

    // TypedQuery<Comment> tQuery = em.createQuery(query.toString(), Comment.class);

    // params.forEach((k, v) -> {
    // tQuery.setParameter(k, v);
    // });

    // tQuery.setFirstResult(filter.getOffset());
    // tQuery.setMaxResults(filter.getLimit());
    // List<Comment> listComment = tQuery.getResultList();

    // Map<String, Object> result = new HashMap<>();
    // result.put("listComment", listComment);

    // return result;

    // }

    public int getCountCommentChildInPostId(int postsId, int commentId) {

    StringBuilder query = new StringBuilder(
    "SELECT c FROM Comment c WHERE c.posts = " + postsId + " and c.parent_comment_id = "
    + commentId);

    TypedQuery<Comment> tQuery = em.createQuery(query.toString(), Comment.class);

    List<Comment> listComment = tQuery.getResultList();

    return listComment.size();
    }

    public int getCountCommentInPostId(CommentDTOFilter filter) {

        int postsId = filter.getPostsId();
        StringBuilder query = new StringBuilder("SELECT c FROM Comment c WHERE c.posts = " + postsId + "and c.parent_comment_id = 0");

        TypedQuery<Comment> tQuery = em.createQuery(query.toString(), Comment.class);

        List<Comment> listComment = tQuery.getResultList();

        return listComment.size();
    }
}
