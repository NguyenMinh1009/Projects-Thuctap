package com.example.facebook.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.example.facebook.entity.Posts;
import com.example.facebook.entity.User;
import com.example.facebook.model.ports.dto.PostsDTOCreate;
import com.example.facebook.model.ports.dto.PostsDTOFilter;
import com.example.facebook.model.ports.dto.PostsDTOResponse;
import com.example.facebook.model.ports.mapper.PostsMapper;
import com.example.facebook.repository.PostsRepository;
import com.example.facebook.repository.Custom.PostsCriteria;
import com.example.facebook.service.PostsService;
import com.example.facebook.service.UserService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PostServiceImpl implements PostsService {

    private final PostsRepository postsRepository;
    private final PostsCriteria postsCriteria;
    private final UserService userService;

    @Override
    public Map<String, PostsDTOResponse> createPosts(Map<String, PostsDTOCreate> postsDTOCreateMap) {
        PostsDTOCreate postsDTOCreate = postsDTOCreateMap.get("posts");

        Posts posts = PostsMapper.toPosts(postsDTOCreate);
        User currentUser = userService.getUserLoggedIn();

        posts.setAuthor(currentUser);

        posts = postsRepository.save(posts);

        Map<String, PostsDTOResponse> wrapper = new HashMap<>();
        PostsDTOResponse postsDTOResponse = PostsMapper.toPostsDTOResponse(posts, false);
        wrapper.put("posts", postsDTOResponse);
        return wrapper;
    }

    @Override
    public Map<String, Object> getListPosts(PostsDTOFilter filter) {

        Map<String, Object> results = postsCriteria.findAll(filter);
        int countPosts = 0;

        List<Posts> listPosts = (List<Posts>) results.get("listPosts");

        List<PostsDTOResponse> listPostsDTOResponses = new ArrayList<>();
        boolean isFollowing = false;
        int followedNumber = 0;
        int followingNumber = 0;

        try {
            User currentUser = userService.getUserLoggedIn();

            for (Posts p : listPosts) {
                isFollowing = false;

                User author = p.getAuthor();
                Set<User> followers = author.getFollowers();
                for (User u : followers) {
                    if (u.getId() == currentUser.getId()) {
                        isFollowing = true;
                        break;
                    }
                }
                if (currentUser.getId() == p.getAuthor().getId()) {
                    isFollowing = true;
                }
                listPostsDTOResponses.add(PostsMapper.toPostsDTOResponse(p, isFollowing));
            }
            // -------------------------------------------------------------
            if (filter.getAuthorId() != 0) {
                followedNumber = listPosts.get(0).getAuthor().getFollowers().size();
                followingNumber = listPosts.get(0).getAuthor().getFollowing().size();
                countPosts = postsCriteria.getTotalCountPostsByAuthor(filter);
            }else{
                countPosts = postsCriteria.getTotalCountPosts(filter);
            }
        } catch (Exception e) {
            for (Posts p : listPosts) {
                listPostsDTOResponses.add(PostsMapper.toPostsDTOResponse(p, isFollowing));
            }
            countPosts = postsCriteria.getTotalCountPosts(filter);

        }

        int pageNumber = filter.getOffset() / 5 + 1;

        Map<String, Object> wrapper = new HashMap<>();
        wrapper.put("posts", listPostsDTOResponses);
        wrapper.put("postsCount", countPosts);
        wrapper.put("pageNumber", pageNumber);
        wrapper.put("followedNumber", followedNumber);
        wrapper.put("followingNumber", followingNumber);

        return wrapper;
    }

}
