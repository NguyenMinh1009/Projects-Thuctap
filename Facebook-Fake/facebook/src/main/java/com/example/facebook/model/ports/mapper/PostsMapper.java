package com.example.facebook.model.ports.mapper;

import java.time.LocalDateTime;

import com.example.facebook.entity.Posts;
import com.example.facebook.entity.User;
import com.example.facebook.model.ports.dto.AuthorDTOResponse;
import com.example.facebook.model.ports.dto.PostsDTOCreate;
import com.example.facebook.model.ports.dto.PostsDTOResponse;

public class PostsMapper {

    public static Posts toPosts(PostsDTOCreate postsDTOCreate) {

        LocalDateTime timeCurrent = LocalDateTime.now();

        Posts posts = Posts.builder().title(postsDTOCreate.getTitle()).date(timeCurrent)
                .body(postsDTOCreate.getBody()).build();

        return posts;
    }

    public static PostsDTOResponse toPostsDTOResponse(Posts posts, boolean isFollowing) {
        return PostsDTOResponse.builder().id(posts.getId()).title(posts.getTitle()).date(posts.getDate())
                .body(posts.getBody()).author(toAuthorDTOResponse(posts.getAuthor(), isFollowing))
                .build();
    }

    private static AuthorDTOResponse toAuthorDTOResponse(User author, boolean isFollowing) {
        return AuthorDTOResponse.builder().id(author.getId()).username(author.getUsername()).following(isFollowing).build();
    }

}
