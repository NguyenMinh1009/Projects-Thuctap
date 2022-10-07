package com.example.facebook.model.ports.dto;

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

public class PostsDTOFilter {
    private int authorId;
    private int limit;
    private int offset;
}
