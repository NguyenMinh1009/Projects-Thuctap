package com.example.facebook.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.facebook.model.ports.dto.PostsDTOCreate;
import com.example.facebook.model.ports.dto.PostsDTOFilter;
import com.example.facebook.model.ports.dto.PostsDTOResponse;
import com.example.facebook.service.PostsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:8081/")
public class PostsController {

    private final PostsService postsService;

    @PostMapping("/api/posts")
    public Map<String, PostsDTOResponse> createPosts(@RequestBody Map<String, PostsDTOCreate> postsDTOCreateMap) {
        return postsService.createPosts(postsDTOCreateMap);
    }

    @GetMapping("/api/posts")
    public Map<String, Object> getListPosts(
            @RequestParam(name = "authorId", defaultValue = "0") Integer authorId,
            @RequestParam(name = "limit", defaultValue = "5") Integer limit,
            @RequestParam(name = "offset", defaultValue = "0") Integer offset) {

        PostsDTOFilter filter = PostsDTOFilter.builder().authorId(authorId).limit(limit).offset(offset).build();
        return postsService.getListPosts(filter);
    }
    @GetMapping("/api/postsPersonal")
    public Map<String, Object> getListPostsPersonal(
            @RequestParam(name = "authorId", defaultValue = "0") Integer authorId,
            @RequestParam(name = "limit", defaultValue = "5") Integer limit,
            @RequestParam(name = "offset", defaultValue = "0") Integer offset) {

        PostsDTOFilter filter = PostsDTOFilter.builder().authorId(authorId).limit(limit).offset(offset).build();
        return postsService.getListPosts(filter);
    }

}
