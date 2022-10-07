package com.example.facebook.model.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTOFilter {
    private int limit;
    private int offset;
    private int postsId;
    private int parent_comment_id;
}
