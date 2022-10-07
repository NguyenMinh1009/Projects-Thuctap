package com.example.facebook.model.comment.dto;


import java.time.LocalDateTime;

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
public class CommentDTOResponse {
    private int commentId;
    private LocalDateTime date;
    private String content;
    private int countCommentChild;

    private AuthorCmtDTOResponse authorCmt;

}
