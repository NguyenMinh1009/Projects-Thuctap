package com.example.facebook.repository.Custom;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import com.example.facebook.entity.Question;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class QuestionCriteria {
    private final EntityManager em;
    
    public Map<String, Object> findAll() {
        StringBuilder query = new StringBuilder("SELECT q FROM Question q  WHERE 1=1 ORDER BY q.id DESC");

        // Map<String, Object> params = new HashMap<>();
        // if (filter.getAuthorId() != 0) {
        //     query.append(" and au.id = :id");
        //     params.put("id", filter.getAuthorId());
        // }

        // query.append(" ORDER BY p.id DESC");

        TypedQuery<Question> tQuery = em.createQuery(query.toString(), Question.class);

        // params.forEach((k, v) -> {
        //     tQuery.setParameter(k, v);
        // });

        // tQuery.setFirstResult(filter.getOffset());
        // tQuery.setMaxResults(filter.getLimit());
        List<Question> listQuestion = tQuery.getResultList();

        Map<String, Object> result = new HashMap<>();
        result.put("listQuestion", listQuestion);

        return result;

    }
}
