package com.example.facebook.repository.Custom;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import com.example.facebook.entity.Posts;
import com.example.facebook.model.ports.dto.PostsDTOFilter;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class PostsCriteria {
    private final EntityManager em;

    public Map<String, Object> findAll(PostsDTOFilter filter) {
        StringBuilder query = new StringBuilder("SELECT p FROM Posts p left join p.author au WHERE 1=1");

        Map<String, Object> params = new HashMap<>();
        if (filter.getAuthorId() != 0) {
            query.append(" and au.id = :id");
            params.put("id", filter.getAuthorId());
        }

        query.append(" ORDER BY p.id DESC");

        TypedQuery<Posts> tQuery = em.createQuery(query.toString(), Posts.class);

        params.forEach((k, v) -> {
            tQuery.setParameter(k, v);
        });

        tQuery.setFirstResult(filter.getOffset());
        tQuery.setMaxResults(filter.getLimit());
        List<Posts> listPosts = tQuery.getResultList();

        Map<String, Object> result = new HashMap<>();
        result.put("listPosts", listPosts);

        return result;

    }

    public int getTotalCountPosts(PostsDTOFilter filter) {

        StringBuilder query = new StringBuilder("SELECT p FROM Posts p left join p.author au WHERE 1=1");

        TypedQuery<Posts> tQuery = em.createQuery(query.toString(), Posts.class);

        List<Posts> listPosts = tQuery.getResultList();

        return listPosts.size();
    }

    public int getTotalCountPostsByAuthor(PostsDTOFilter filter) {

        StringBuilder query = new StringBuilder("SELECT p FROM Posts p left join p.author au WHERE 1=1");

        Map<String, Object> params = new HashMap<>();
        query.append(" and au.id = :id");
        params.put("id", filter.getAuthorId());

        TypedQuery<Posts> tQuery = em.createQuery(query.toString(), Posts.class);
        params.forEach((k, v) -> {
            tQuery.setParameter(k, v);
        });
        List<Posts> listPosts = tQuery.getResultList();
        return listPosts.size();
    }

}
