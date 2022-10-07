package com.example.facebook.service;

import java.util.Map;

import com.example.facebook.model.ports.dto.PostsDTOCreate;
import com.example.facebook.model.ports.dto.PostsDTOFilter;
import com.example.facebook.model.ports.dto.PostsDTOResponse;

public interface PostsService {


    public Map<String, PostsDTOResponse> createPosts(Map<String, PostsDTOCreate> postsDTOCreateMap);


    public Map<String, Object> getListPosts(PostsDTOFilter filter);
    
}
