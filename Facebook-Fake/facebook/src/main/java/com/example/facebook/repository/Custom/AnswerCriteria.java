package com.example.facebook.repository.Custom;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import com.example.facebook.entity.Answer;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class AnswerCriteria {
    private final EntityManager em;
    
    public Map<String, Object> findAll(int questionId) {
        StringBuilder query = new StringBuilder("SELECT a FROM Answer a WHERE a.question = "+questionId);
        TypedQuery<Answer> tQuery = em.createQuery(query.toString(), Answer.class);

        List<Answer> listAnswer = tQuery.getResultList();

        Map<String, Object> result = new HashMap<>();
        result.put("listAnswer", listAnswer);

        return result;

    }
}
